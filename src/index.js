import { MongoClient } from "mongodb";

/* ---------- 1. Hard-coded connection details ---------- */
const MONGODB_URI =
  "mongodb+srv://nehal969797:nehalsingh969797@cluster0.b2r41qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DB_NAME         = "projectS";        // <-- change if your DB name differs
const COLLECTION_NAME = "premium_users";   // should match your collection

/* ---------- 2. Lazy, cached Mongo client ---------- */
let cachedClient;
let cachedCollection;

async function getCollection() {
  if (cachedCollection) return cachedCollection;

  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5_000
    });
    await cachedClient.connect();
  }
  cachedCollection = cachedClient.db(DB_NAME).collection(COLLECTION_NAME);
  return cachedCollection;
}

/* ---------- 3. Utility for consistent JSON responses ---------- */
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

/* ---------- 4. Worker entry-point ---------- */
export default {
  async fetch(request) {
    const { pathname, searchParams } = new URL(request.url);

    /* CORS pre-flight */
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    /* Only one route:  /check  */
    if (pathname !== "/check") {
      return json({ ok: false, message: "Not found" }, 404);
    }

    /* Accept either GET ?email=... or POST { email: ... } */
    let email =
      request.method === "GET"
        ? searchParams.get("email")
        : (await request.json().catch(() => ({}))).email;

    if (!email) {
      return json({ ok: false, message: "`email` is required" }, 400);
    }

    try {
      const col  = await getCollection();
      const user = await col.findOne({ email });

      if (!user) {
        return json({ ok: false, message: "Email not found" }, 404);
      }

      return json({ ok: true, data: user });
    } catch (err) {
      return json({ ok: false, message: err.message }, 500);
    }
  }
};

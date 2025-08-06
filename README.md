# Premium User Email Check API

A Cloudflare Worker that checks whether an email exists in the **`premium_users`** collection of your MongoDB Atlas cluster and returns the full document (including the `expiry_date`).

> ⚠️ **Security notice**  
> The connection string is embedded directly in `src/index.js`. Do **not** deploy this code unmodified to any public repository or production account.

---

## Deploy in one click

[![Deploy to Cloudflare Workers](https://deploy.cloudflare.com/button.svg)](https://deploy.cloudflare.com/?url=https://github.com/Mrblackgodd/Premiumcloudflare)

Fork this repository, replace `YOUR_GITHUB_USERNAME` in the link above with your user/org name, then press the button to deploy.

---

## Manual development


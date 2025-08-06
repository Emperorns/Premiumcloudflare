# Cloudflare Worker: Firebase + Turnstile Auth Proxy

This Cloudflare Worker validates Cloudflare Turnstile CAPTCHA and authenticates users with Firebase's REST API.

## How to deploy

1. Install Wrangler:  
   `npm install -g wrangler`

2. Login:  
   `npx wrangler login`

3. Deploy:
   `npx wrangler deploy`

4. Your endpoint will be at:  
   `https://my-login-worker.<yourname>.workers.dev/`

## Frontend Integration

- Set your frontend env variable:
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button?url=[https://github.com/Mrblackgodd/Premiumcloudflare](https://github.com/Mrblackgodd/Cloudflare-auth))](https://deploy.workers.cloudflare.com/?url=https://github.com/Mrblackgodd/Cloudflare-auth)

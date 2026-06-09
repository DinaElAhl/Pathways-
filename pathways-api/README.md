# pathways-api

Standalone backend API for the **Pathways** learning platform.

> This is the dedicated Express/Mongoose backend service. It is **separate** from
> the Vercel serverless `api/` folder at the repository root — that folder hosts
> serverless functions, while this is a long-running standalone server.

## ⚠️ Status: scaffold / placeholder

**Only `package.json` exists in this folder right now.** The `server.js` entry
point and all source code referenced below are **not committed yet**, so the
backend **cannot run** until that code is added. Treat this as a placeholder.

## Stack

- **Express** — HTTP server / routing
- **Mongoose** — MongoDB ODM
- **bcryptjs** + **jsonwebtoken** — password hashing & JWT auth
- **validator** / **express-validator** — input validation
- **multer** — file uploads
- **stripe** — payments
- **nodemailer** — email
- **cors**, **dotenv** — middleware & config
- **nodemon** (dev) — auto-reload

Project type: ES modules (`"type": "module"`), entry point `server.js`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm start` | Start with node |
| `npm test` | Not implemented yet |

## Environment

This service needs its own `.env` file (not shared with the root project). Expected values include:

```
MONGO_URI=          # MongoDB connection string
JWT_SECRET=         # secret for signing JWTs
STRIPE_SECRET_KEY=  # Stripe API key
SMTP_HOST=          # nodemailer / email credentials
SMTP_USER=
SMTP_PASS=
```

## Getting started

```bash
npm install
# add server.js + source code (currently missing)
# create a .env file (see above)
npm run dev
```

## License

MIT © DinaElAhl

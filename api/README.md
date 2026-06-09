# Pathways API (Vercel Serverless Functions)

These are [Vercel serverless functions](https://vercel.com/docs/functions). Each file in this
directory default-exports an `async function handler(req, res)` and is exposed at `/api/<filename>`.
They connect to MongoDB using the `mongodb` driver and a connection string from
`process.env.MONGODB_URI`, and they set permissive (`*`) CORS headers.

> **Note:** This `api/` directory is **separate** from the standalone Express backend in
> `pathways-api/`. These functions are deployed by Vercel, not run as a long-lived Express server.

## Endpoints

| File          | Path            | Methods         | Description |
|---------------|-----------------|-----------------|-------------|
| `auth.js`     | `/api/auth`     | GET, POST       | User auth on db `pathways`, collection `users`. `POST {action:'register'}` hashes a password (bcryptjs) and creates a user; `POST {action:'login'}` verifies credentials; `GET ?userId=` fetches a user. |
| `pathways.js` | `/api/pathways` | GET, POST       | Learning pathways on db `Pathway`, collection `pathways`. `GET` lists all (or one via `?id=`); `POST` creates a pathway from `{title, description, category, courses}`. |
| `progress.js` | `/api/progress` | GET, POST       | User progress on db `Pathway`, collection `progress`. `POST` upserts `{userId, pathwayId, courseId, progress, status}` (clamped 0-100); `GET ?userId=&pathwayId=` returns saved progress. |
| `reviews.js`  | `/api/reviews`  | GET, POST       | Reviews on db `Pathway`, collection `reviews`. `POST` inserts `{userId, pathwayId, rating(1-5), comment}`; `GET ?pathwayId=` returns reviews plus computed average rating. |
| `search.js`   | `/api/search`   | GET             | Searches db `Pathway`, collection `pathways`. `GET` filters by `?q=` (regex on title/description), `?category=`, `?trending`, `?limit=` (default 10). |

All endpoints also handle the CORS preflight `OPTIONS` request (returns `200`).

## Required environment variables

| Variable      | Description |
|---------------|-------------|
| `MONGODB_URI` | MongoDB connection string. Required by every function. |

## Handler pattern

Each function follows the same shape: set CORS headers, short-circuit `OPTIONS`, check the
HTTP method, then connect/query/close inside a `try/catch/finally`.

```js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    await client.connect();
    const collection = client.db('Pathway').collection('pathways');
    // ...handle req.method (GET / POST)...
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error: ' + error.message });
  } finally {
    await client.close();
  }
}
```

> `auth.js` is slightly different: it does not call `client.connect()`/`close()` explicitly and
> uses the `pathways` database rather than `Pathway`.

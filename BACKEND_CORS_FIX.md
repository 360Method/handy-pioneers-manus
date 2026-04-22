# BACKEND CORS — HP Pro API (pro.handypioneers.com)

## Problem

The `/membership` checkout on the Handy Pioneers marketing site (`handypioneers.com`
and Railway preview) posts to `https://pro.handypioneers.com/api/360/checkout`.
The browser blocks the response with a CORS error and the user sees
"Failed to fetch". No payment session is created; leads are lost unless the
frontend captures them via the temporary fallback described below.

This change lives in the **HP Pro API** backend repo (Stripe + Express owner).
That repo's `main` branch is currently in a broken git state (only 9 files
tracked). Do not attempt to push changes until the tree is repaired — they
will never reach production.

## What needs to change on the backend

The CORS allow-list must include the three origins below (in addition to
whatever is already there — do not remove existing entries):

- `https://handypioneers.com`
- `https://www.handypioneers.com`
- `https://handy-pioneers-www-v2-production.up.railway.app`

## Where the change goes

The HP Estimator Express server mounts CORS middleware once during app setup.
The canonical location in that repo is the main server entry file — typically
`server/index.ts`, `server/app.ts`, or `src/server/index.ts` — wherever
`app.use(cors(...))` is called. Grep for `cors(` to find the call site.

### Expected current pattern (approximate)

```ts
import cors from "cors";

const allowedOrigins = [
  "https://360.handypioneers.com",
  "http://localhost:5173",
  // ...other existing origins
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin ${origin} not allowed`));
    },
    credentials: true,
  })
);
```

### Required change

Append the three Handy Pioneers marketing origins to `allowedOrigins`:

```ts
const allowedOrigins = [
  "https://360.handypioneers.com",
  "http://localhost:5173",
  // ...other existing origins
  "https://handypioneers.com",
  "https://www.handypioneers.com",
  "https://handy-pioneers-www-v2-production.up.railway.app",
];
```

If the backend uses a wildcard list, a regex, or a `CORS_ALLOWED_ORIGINS` env
var instead, apply the same three additions in that format.

### Affected routes

Both of these are called from the `/membership` checkout flow and must accept
the three origins above:

- `POST /api/360/checkout` — creates the Stripe checkout session (blocking).
- `POST /api/360/event` — analytics beacon (currently fire-and-forget but still
  blocked by CORS preflight in the browser console).

## Verification after deploy

From a browser on `https://handypioneers.com/membership/checkout`, submit the
form. Expected: redirect to a Stripe-hosted checkout page. If it still fails,
check the HP Estimator Railway logs for the `Origin ... not allowed` error and
confirm the deploy shipped the updated allow-list.

## Remove the frontend bridge once this ships

Once the backend CORS change is live, the temporary bridge on the marketing site
can be retired in a follow-up PR:

- `server/index.ts` — remove the `/api/fallback-lead` endpoint.
- `client/src/pages/MembershipCheckout.tsx` — remove the `fallbackCaptured`
  state, the network/CORS detection branch in the submit handler, and the
  fallback render block. Revert error handling to the original "Something went
  wrong" inline message.

Leads captured during the outage can be pulled from Railway logs by grepping
for `[FALLBACK_LEAD]` and contacted manually.

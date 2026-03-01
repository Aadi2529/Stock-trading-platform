🚀 Stock Trading Platform – Complete Deployment Documentation
📌 Project Architecture

This project consists of 3 separate services:

Backend API → Deployed on Render

Frontend (Landing + Auth) → Deployed on Vercel

Dashboard (Trading UI) → Deployed on Vercel

All three are connected using environment variables and secure CORS configuration.

🏗 Step 1 – Backend Deployment (Render)
1️⃣ Prepared Backend for Production

Added .env file with:

MONGO_URL

PORT

JWT secret

Ensured process.env usage everywhere

Removed hardcoded localhost URLs

2️⃣ MongoDB Setup

Used MongoDB Atlas

Whitelisted:

Render IP

0.0.0.0/0 (for testing)

Verified DB connection:

mongoose.connect(process.env.MONGO_URL)
3️⃣ CORS Configuration (Critical Fix)

Initial Error:

Access-Control-Allow-Origin header missing
Blocked by CORS policy

Cause:

Frontend domain not allowed in backend CORS

Fix:

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

Why this works:

Dynamically allows deployed frontend origin

Prevents strict string mismatch errors

Solves trailing slash issue

4️⃣ Cookie Configuration Fix

Problem:

Login worked locally

Failed in production

Cause:

Cross-domain cookie restrictions

Fix:

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

Explanation:

secure: true → required for HTTPS

sameSite: none → required for cross-site (Vercel ↔ Render)

5️⃣ Route Debugging

Issue:

404 /signup

Cause:

Route prefix mismatch

Solution:
Verified:

app.use("/", authRoute);

Final working endpoints:

/signup
/login
/trade/*
🌐 Step 2 – Frontend Deployment (Vercel)
1️⃣ Environment Variables

Added in Vercel:

VITE_BACKEND_URL=https://your-render-backend-url.onrender.com
VITE_DASHBOARD_URL=https://trade-nova-dashboard.vercel.app

Important:

Must include https://

Must redeploy after adding

2️⃣ Redirect Bug (Major Issue)

Error:

https://trade-nova-eight.vercel.app/trade-nova-dashboard.vercel.app

Cause:

Dashboard URL treated as relative path

Fix:
Used safe redirect logic:

const redirectUrl = new URL(DASHBOARD_URL);
redirectUrl.searchParams.set("token", token);

window.location.href = redirectUrl.toString();

Final behavior:

Signup/Login → Redirects correctly to dashboard

📊 Step 3 – Dashboard Deployment (Vercel)
1️⃣ Token Handling

Dashboard receives:

?token=xxx&userId=xxx&username=xxx

Logic:

localStorage.setItem("token", token);
window.history.replaceState({}, document.title, window.location.pathname);

Removes token from URL after storing.

2️⃣ 404 Error on Refresh (Major SPA Issue)

Problem:

https://trade-nova-dashboard.vercel.app/login → 404

Cause:

React Router needs SPA rewrite rule

Vercel tried to find real /login file

Fix:
Created vercel.json in dashboard root:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

This tells Vercel:

Always serve index.html, let React Router handle routing.

After redeploy → 404 issue solved.

🔐 Logout Flow Implementation

Goal:

Logout from dashboard

Redirect to frontend landing page

Same tab redirect

Added environment variable in dashboard:

VITE_FRONTEND_URL=https://trade-nova-eight.vercel.app

Logout logic:

localStorage.clear();
window.location.href = FRONTEND_URL;

Now logout properly returns to landing page.

🧠 All Major Deployment Issues Faced & Resolved
Issue	Cause	Solution
CORS Blocked	Origin mismatch	origin: true
Cookie not working	secure/sameSite issue	secure: true, sameSite: "none"
404 on dashboard routes	No SPA rewrite	Added vercel.json
Wrong redirect URL	Relative path behavior	Used new URL()
Token visible in URL	Not cleaned	Used replaceState()
Backend 404	Route mismatch	Verified app.use()
🏁 Final Working Production Flow

User signs up on Frontend

Backend creates account

Token returned

Redirect to Dashboard with token

Dashboard stores token

URL cleaned

User trades

Logout clears storage

Redirect back to landing page

Everything fully deployed and working across domains.

💼 Deployment Summary

Fully working multi-service architecture

Secure cross-domain authentication

Proper CORS handling

SPA routing fix

Environment-based configuration

Production-ready setup

🎯 Project Status

✔ Backend (Render)
✔ Frontend (Vercel)
✔ Dashboard (Vercel)
✔ MongoDB Atlas
✔ Auth + Token Flow
✔ Wallet + Holdings + Orders
✔ Logout Redirect
✔ Production Deployment

If you want, next I can:

Convert this into a polished README.md

Add architecture diagram

Add production flow diagram

Or help you prepare interview explanation version

You just completed real-world deployment troubleshooting — not tutorial-level stuff.


























🚀 Stock Trading Platform – Complete Deployment Documentation
📌 Project Architecture

This project consists of 3 separate services:

Backend API → Deployed on Render

Frontend (Landing + Auth) → Deployed on Vercel

Dashboard (Trading UI) → Deployed on Vercel

All three are connected using environment variables and secure CORS configuration.

🏗 Step 1 – Backend Deployment (Render)
1️⃣ Prepared Backend for Production

Added .env file with:

MONGO_URL

PORT

JWT secret

Ensured process.env usage everywhere

Removed hardcoded localhost URLs

2️⃣ MongoDB Setup

Used MongoDB Atlas

Whitelisted:

Render IP

0.0.0.0/0 (for testing)

Verified DB connection:

mongoose.connect(process.env.MONGO_URL)
3️⃣ CORS Configuration (Critical Fix)

Initial Error:

Access-Control-Allow-Origin header missing
Blocked by CORS policy

Cause:

Frontend domain not allowed in backend CORS

Fix:

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

Why this works:

Dynamically allows deployed frontend origin

Prevents strict string mismatch errors

Solves trailing slash issue

4️⃣ Cookie Configuration Fix

Problem:

Login worked locally

Failed in production

Cause:

Cross-domain cookie restrictions

Fix:

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

Explanation:

secure: true → required for HTTPS

sameSite: none → required for cross-site (Vercel ↔ Render)

5️⃣ Route Debugging

Issue:

404 /signup

Cause:

Route prefix mismatch

Solution:
Verified:

app.use("/", authRoute);

Final working endpoints:

/signup
/login
/trade/*
🌐 Step 2 – Frontend Deployment (Vercel)
1️⃣ Environment Variables

Added in Vercel:

VITE_BACKEND_URL=https://your-render-backend-url.onrender.com
VITE_DASHBOARD_URL=https://trade-nova-dashboard.vercel.app

Important:

Must include https://

Must redeploy after adding

2️⃣ Redirect Bug (Major Issue)

Error:

https://trade-nova-eight.vercel.app/trade-nova-dashboard.vercel.app

Cause:

Dashboard URL treated as relative path

Fix:
Used safe redirect logic:

const redirectUrl = new URL(DASHBOARD_URL);
redirectUrl.searchParams.set("token", token);

window.location.href = redirectUrl.toString();

Final behavior:

Signup/Login → Redirects correctly to dashboard

📊 Step 3 – Dashboard Deployment (Vercel)
1️⃣ Token Handling

Dashboard receives:

?token=xxx&userId=xxx&username=xxx

Logic:

localStorage.setItem("token", token);
window.history.replaceState({}, document.title, window.location.pathname);

Removes token from URL after storing.

2️⃣ 404 Error on Refresh (Major SPA Issue)

Problem:

https://trade-nova-dashboard.vercel.app/login → 404

Cause:

React Router needs SPA rewrite rule

Vercel tried to find real /login file

Fix:
Created vercel.json in dashboard root:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

This tells Vercel:

Always serve index.html, let React Router handle routing.

After redeploy → 404 issue solved.

🔐 Logout Flow Implementation

Goal:

Logout from dashboard

Redirect to frontend landing page

Same tab redirect

Added environment variable in dashboard:

VITE_FRONTEND_URL=https://trade-nova-eight.vercel.app

Logout logic:

localStorage.clear();
window.location.href = FRONTEND_URL;

Now logout properly returns to landing page.

🧠 All Major Deployment Issues Faced & Resolved
Issue	Cause	Solution
CORS Blocked	Origin mismatch	origin: true
Cookie not working	secure/sameSite issue	secure: true, sameSite: "none"
404 on dashboard routes	No SPA rewrite	Added vercel.json
Wrong redirect URL	Relative path behavior	Used new URL()
Token visible in URL	Not cleaned	Used replaceState()
Backend 404	Route mismatch	Verified app.use()
🏁 Final Working Production Flow

User signs up on Frontend

Backend creates account

Token returned

Redirect to Dashboard with token

Dashboard stores token

URL cleaned

User trades

Logout clears storage

Redirect back to landing page

Everything fully deployed and working across domains.

💼 Deployment Summary

Fully working multi-service architecture

Secure cross-domain authentication

Proper CORS handling

SPA routing fix

Environment-based configuration

Production-ready setup

🎯 Project Status

✔ Backend (Render)
✔ Frontend (Vercel)
✔ Dashboard (Vercel)
✔ MongoDB Atlas
✔ Auth + Token Flow
✔ Wallet + Holdings + Orders
✔ Logout Redirect
✔ Production Deployment

If you want, next I can:

Convert this into a polished README.md

Add architecture diagram

Add production flow diagram

Or help you prepare interview explanation version

You just completed real-world deployment troubleshooting — not tutorial-level stuff.






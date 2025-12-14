# 🏦 Zerodha Clone - Complete Project Documentation

**Project Type:** Full Stack Trading Platform  
**Status:** In Development  
**Date:** December 3, 2025

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Authentication Flow](#authentication-flow)
5. [Module Breakdown](#module-breakdown)
6. [File Structure & Tracking](#file-structure--tracking)
7. [API Endpoints](#api-endpoints)
8. [Database Models](#database-models)
9. [Data Flow Diagrams](#data-flow-diagrams)
10. [Setup & Running Instructions](#setup--running-instructions)

---

## 🎯 Project Overview

**Zerodha Clone** is a full-stack stock trading application inspired by Zerodha, India's leading fintech platform. It includes:

- **User Authentication** with OTP verification
- **Trading Dashboard** with buy/sell orders, holdings, and positions
- **Responsive UI** across multiple apps (frontend landing page + separate dashboard)
- **JWT-based Security** with bcrypt password hashing
- **MongoDB Database** for persistent data storage

### Key Features
✅ User Signup/Login with OTP verification  
✅ JWT authentication with 7-day token expiry  
✅ Buy/Sell order placement  
✅ View Holdings, Positions, and Orders  
✅ Responsive design with Bootstrap & Material-UI  
✅ Cross-app authentication (Frontend → Dashboard redirect)  

---

## 🏗️ Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Frontend)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ React Landing Page (localhost:3000)                   │   │
│  │ - HomePage, SignUp, Login, Pricing, Products         │   │
│  │ - AuthContext (state management)                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  API LAYER (Backend/Express)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Express Server (localhost:3002)                       │   │
│  │ - Auth Routes (/register, /login, /sendOtp, etc)    │   │
│  │ - Trading Routes (/newOrder, /allOrders, etc)        │   │
│  │ - OTP Service (in-memory store)                       │   │
│  │ - JWT Token Generation & Validation                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 DATA LAYER (MongoDB Atlas)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Collections:                                         │   │
│  │ - users (email, mobile, password, firstName, ...)   │   │
│  │ - orders (name, qty, price, mode: buy/sell)         │   │
│  │ - holdings (stock, qty, avg, price, P&L)            │   │
│  │ - positions (stock, net, sell, buy, qty)            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

                     Dashboard (localhost:3001)
                    ┌──────────────────────────┐
                    │ React Dashboard App      │
                    │ - Separate React App     │
                    │ - Receives user data via │
                    │   encoded query param    │
                    │ - Shows holdings, trades │
                    └──────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19.2.0
- **Routing:** React Router v7.9.6
- **HTTP Client:** Axios
- **Styling:** Bootstrap 5.3.8
- **State Management:** React Context API
- **Dev Server:** Port 3000

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **ODM:** Mongoose 9.0.0
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcryptjs 3.0.3
- **Environment:** dotenv
- **Port:** 3002

### Dashboard
- **Framework:** React 18.2.0
- **UI Library:** Material-UI (@mui/material)
- **Charting:** Chart.js + react-chartjs-2
- **Port:** 3001

### DevOps
- **Package Manager:** npm
- **Watch Mode:** nodemon

---

## 🔐 Authentication Flow

### Signup → OTP → Register → Login → Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                    SIGNUP FLOW (2-STEP)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ STEP 1: User Enters Details                                    │
│  ├─ firstName, lastName, email, mobile, password               │
│  ├─ Frontend validates (min 6 chars, 10-digit mobile)         │
│  └─ POST /sendOtp { mobile }                                   │
│                    ↓                                            │
│  Backend:                                                       │
│  ├─ Generates 6-digit OTP (random)                             │
│  ├─ Stores in memory: otpStore[mobile] = {otp, expiry}        │
│  ├─ Logs to console: "📱 OTP Generated for 8446090974: 123456" │
│  ├─ 5-minute expiry                                            │
│  └─ Returns: {message, mobile}                                 │
│                    ↓                                            │
│  Frontend:                                                      │
│  ├─ Fetches GET /testLastOtp (shows OTP for testing)           │
│  ├─ Displays success: "✅ OTP sent! (TEST: 123456)"           │
│  └─ Moves to STEP 2                                            │
│                                                                  │
│ STEP 2: OTP Verification → User Registration                  │
│  ├─ User enters OTP from SMS (or test display)                │
│  ├─ POST /verifyOtp { mobile, otp }                            │
│  │   └─ Backend validates & deletes from otpStore             │
│  │   └─ Returns: {message, verified: true}                    │
│  │                                                              │
│  ├─ POST /register { email, mobile, password, firstName, ... } │
│  │   ├─ Backend:                                               │
│  │   │  ├─ Checks if user exists (email/mobile unique)        │
│  │   │  ├─ Creates new UserModel                              │
│  │   │  ├─ Pre-save middleware: hash password with bcrypt     │
│  │   │  ├─ Saves to MongoDB                                   │
│  │   │  ├─ Generates JWT: sign({userId, email}, secret, 7d)  │
│  │   │  └─ Returns: {message, token, user}                    │
│  │   │                                                          │
│  │   └─ Frontend:                                              │
│  │      ├─ Calls login(token, user) → AuthContext updates     │
│  │      ├─ localStorage.setItem("token", token)               │
│  │      ├─ localStorage.setItem("user", JSON.stringify(...))  │
│  │      ├─ Encodes user payload to base64                     │
│  │      └─ Redirects: window.location.href =                  │
│  │         "http://localhost:3001/?u={encoded}"               │
│  │                                                              │
│  └─ Dashboard:                                                 │
│     ├─ Startup decodes u param                                 │
│     ├─ localStorage.setItem("user", decoded)                   │
│     ├─ localStorage.setItem("token", decoded.token)            │
│     ├─ Removes u param from URL                                │
│     └─ Menu reads username from localStorage                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      LOGIN FLOW                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ 1. User enters email/mobile + password                         │
│ 2. POST /login { emailOrMobile, password }                     │
│    ├─ Backend finds user by email OR mobile                    │
│    ├─ Compares password: bcryptjs.compare(input, hashed)      │
│    ├─ If match: Generates JWT                                  │
│    └─ Returns: {token, user}                                   │
│ 3. Frontend: login(token, user) → AuthContext                 │
│ 4. Frontend redirects to dashboard with encoded user payload   │
│ 5. Dashboard decodes and displays user info                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Token Structure
```
JWT Token Format:
{
  "userId": "507f1f77bcf86cd799439011",  // MongoDB _id
  "email": "user@example.com",
  "iat": 1733215000,
  "exp": 1733820000  // 7 days from issue
}

Stored in:
- localStorage.getItem("token")  // Frontend & Dashboard
- Authorization: Bearer {token}   // API requests
```

---

## 📦 Module Breakdown

### Frontend (Port 3000)

#### 1. **Landing Pages** (`frontend/src/landing_page/`)
```
landing_page/
├── home/
│   ├── HomePage.js          → Main landing page
│   ├── Hero.js              → Hero section
│   ├── Awards.js            → Awards showcase
│   ├── Education.js         → Educational content
│   ├── Stats.js             → Statistics
│   └── Pricing.js           → Pricing plans
├── about/
│   ├── AboutPage.js         → About us page
│   ├── Hero.js              → About hero
│   └── Team.js              → Team section
├── pricing/
│   ├── PricingPage.js       → Pricing page
│   ├── Hero.js              → Pricing hero
│   └── Brokerage.js         → Brokerage details
├── products/
│   ├── ProductPage.js       → Products listing
│   ├── Hero.js              → Products hero
│   ├── LeftSection.js       → Product info (left)
│   ├── RightSection.js      → Product info (right)
│   └── Universe.js          → Product universe
├── support/
│   ├── SupportPage.js       → Support page
│   ├── Hero.js              → Support hero
│   ├── CreateTicket.js      → Ticket creation
│   └── pages/
│       └── SupportTopic.js  → Topic details
├── signup/
│   ├── SignUp.js            → 2-step signup (form + OTP)
│   └── SignUp.css           → Signup styling
├── login/
│   ├── Login.js             → Login (email/mobile toggle)
│   └── Login.css            → Login styling
├── Navbar.js                → Navigation bar
├── Footer.js                → Footer component
├── NotFound.js              → 404 page
└── [CSS files for each page]
```

#### 2. **Authentication System** (`frontend/src/context/`)
```
context/
└── AuthContext.js
    ├── State: { user, token, loading, isAuthenticated }
    ├── Methods:
    │   ├── login(token, user)  → Sets auth state + localStorage
    │   └── logout()            → Clears auth state + localStorage
    ├── useAuth() hook          → Custom hook for consuming context
    └── Auto-loads from localStorage on mount
```

#### 3. **Protected Routes** (`frontend/src/components/`)
```
components/
└── PrivateRoute.js
    ├── Checks: isAuthenticated via useAuth()
    ├── If false: Redirects to /login
    └── If true: Renders children (protected page)
```

#### 4. **Main App Router** (`frontend/src/index.js`)
```
Routes:
├── / → HomePage
├── /signup → SignUp (2-step with OTP)
├── /login → Login (email/mobile toggle)
├── /about → AboutPage
├── /pricing → PricingPage
├── /product → ProductPage
├── /support → SupportPage
├── /support/topic/:catId/:topicSlug → SupportTopic
├── /dashboard → PrivateRoute (placeholder for external redirect)
└── * → NotFound

Wrapped with:
├── AuthProvider (Context API)
└── BrowserRouter (React Router v7)
```

---

### Backend (Port 3002)

#### **Main Server** (`backend/index.js`)
```javascript
Imports:
├── express, mongoose, cors
├── JWT, bcryptjs
├── Models: UserModel, OrdersModel, HoldingsModel, PositionsModel
└── Utils: OTP Service

Middleware:
├── cors()           → Allow cross-origin requests
├── bodyParser.json() → Parse JSON bodies

Routes:
├── Auth Routes (✓ Implemented)
│   ├── POST /register          → Create user + return JWT
│   ├── POST /login             → Validate & return JWT
│   ├── POST /sendOtp           → Generate & store OTP
│   ├── POST /verifyOtp         → Validate OTP
│   ├── GET /testLastOtp        → Return last generated OTP (dev)
│   └── GET /verifyToken        → Validate JWT token
│
├── Trading Routes (✓ Implemented)
│   ├── POST /newOrder          → Create buy/sell order
│   ├── GET /allOrders          → Fetch all orders
│   ├── GET /allHoldings        → Fetch user holdings
│   └── GET /allPositions       → Fetch user positions
│
└── Database:
    └── MongoDB Atlas (MONGO_URL)
```

#### **Models** (`backend/model/` & `backend/schemas/`)

**1. UserModel.js**
```javascript
Schema:
├── email (String, unique, required)
├── mobile (String, unique, required)
├── password (String, required, hashed)
├── firstName (String, optional)
├── lastName (String, optional)
└── createdAt (Date, auto)

Pre-save Middleware:
└── Hash password with bcryptjs (salt rounds: 10)
    if password.isModified()

Methods:
└── comparePassword(enteredPassword)
    → bcryptjs.compare(input, hashed)
```

**2. OrdersModel.js**
```javascript
Schema:
├── name (String) → Stock name
├── qty (Number)  → Quantity
├── price (Number) → Order price
├── mode (String) → 'BUY' or 'SELL'
└── createdAt (Date, auto)
```

**3. HoldingsModel.js**
```javascript
Schema:
├── name (String)       → Stock name
├── qty (Number)        → Quantity held
├── avg (Number)        → Average price
├── price (Number)      → Current price
├── net (String)        → Net % change
├── day (String)        → Daily % change
└── isLoss (Boolean)    → Is position at loss
```

**4. PositionsModel.js**
```javascript
Schema:
├── product (String)    → Intraday/Delivery
├── name (String)       → Stock name
├── net (String)        → Net %
├── sell (Number)       → Sell quantity
├── buy (Number)        → Buy quantity
└── qty (Number)        → Total quantity
```

#### **OTP Service** (`backend/utils/otpService.js`)
```javascript
In-Memory Storage:
├── otpStore = { mobile: {otp, expiresAt} }
└── lastOtp = { mobile, otp, timestamp }

Functions:
├── generateOTP()
│   └── Returns random 6-digit string
│
├── storeOTP(mobile)
│   ├── Generates OTP
│   ├── Stores with 5-min expiry
│   ├── Logs: "📱 OTP Generated for 8446090974: 123456"
│   └── Returns OTP string
│
├── verifyOTP(mobile, otp)
│   ├── Checks if OTP exists & not expired
│   ├── Compares provided OTP
│   ├── Deletes on success
│   └── Returns boolean
│
└── getLastOTP()
    └── Returns { mobile, otp, timestamp }
```

---

### Dashboard (Port 3001)

#### **Main App** (`dashboard/src/index.js`)
```javascript
Startup Handler:
├── Detects 'u' query parameter
├── Decodes base64: JSON.parse(atob(u))
├── Stores in localStorage:
│   ├── localStorage.setItem("user", decoded)
│   └── localStorage.setItem("token", decoded.token)
├── Removes 'u' param from URL
└── Renders React app

BrowserRouter → Home component
```

#### **Components** (`dashboard/src/components/`)

**1. Home.js**
```javascript
Renders:
├── TopBar       → Market indices + Menu
└── Dashboard    → Routes to different pages
```

**2. TopBar.js**
```javascript
Displays:
├── NIFTY 50 index
├── SENSEX index
└── Menu (with user profile)
```

**3. Menu.js**
```javascript
Features:
├── Navigation links (Dashboard, Orders, Holdings, Positions, Funds, Apps)
├── useUsername hook → reads from localStorage
├── Avatar: First letter of username
└── Username display

Styling:
├── Active menu highlighting
└── Profile dropdown (placeholder)
```

**4. Dashboard.js**
```javascript
Routes (nested):
├── / → Summary
├── /orders → Orders page
├── /holdings → Holdings page
├── /positions → Positions page
├── /funds → Funds page
└── /apps → Apps page

Context:
├── GeneralContextProvider
└── WatchList component
```

**5. Summary.js**
```javascript
Displays:
├── Greeting: "Hi, {FirstLetter}!"
├── Equity section
│   ├── Margin available
│   └── Opening balance
├── Holdings (13)
│   ├── P&L (profit shown in green)
│   └── Current Value vs Investment
└── Uses useUsername hook to show greeting
```

**6. Other Pages** (Orders, Holdings, Positions, etc.)
```
Fetch from backend:
├── GET /allOrders → Display order table
├── GET /allHoldings → Display holdings list
├── GET /allPositions → Display positions
└── Each page styled with MUI + custom CSS
```

#### **Custom Hook** (`dashboard/src/hooks/useUsername.js`)
```javascript
export const useUsername = () => {
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      const name = [u.firstName, u.lastName]
        .filter(Boolean)
        .join(" ") || u.email || u.mobile;
      setUsername(name);
    }
  }, []);
  
  return username;
};
```

---

## 📊 File Structure & Tracking

### Complete Project Tree

```
07_ZERODHA-CLONE/
├── backend/                          # Node.js Express API
│   ├── index.js                      # Main server (✓ 427 lines)
│   ├── .env                          # Config (MONGO_URL, JWT_SECRET)
│   ├── package.json                  # Dependencies
│   ├── package-lock.json
│   │
│   ├── model/
│   │   ├── UserModel.js              # User schema + pre-save middleware
│   │   ├── OrdersModel.js            # Orders schema
│   │   ├── HoldingsModel.js          # Holdings schema
│   │   └── PositionsModel.js         # Positions schema
│   │
│   ├── schemas/
│   │   └── UserSchema.js             # User schema definition
│   │
│   ├── utils/
│   │   └── otpService.js             # OTP generation, storage, validation
│   │
│   ├── node_modules/                 # Dependencies
│   └── test-register.js              # Test script for registration
│
├── frontend/                         # React Landing Page
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── media/images/             # Logo, icons, etc.
│   │
│   ├── src/
│   │   ├── index.js                  # Main router + AuthProvider
│   │   ├── index.css                 # Global styles
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js        # Auth state management
│   │   │
│   │   ├── components/
│   │   │   └── PrivateRoute.js       # Protected route wrapper
│   │   │
│   │   ├── landing_page/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── NotFound.js
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── HomePage.js
│   │   │   │   ├── Hero.js
│   │   │   │   ├── Awards.js
│   │   │   │   ├── Education.js
│   │   │   │   ├── Stats.js
│   │   │   │   └── Pricing.js
│   │   │   │
│   │   │   ├── about/
│   │   │   │   ├── AboutPage.js
│   │   │   │   ├── Hero.js
│   │   │   │   └── Team.js
│   │   │   │
│   │   │   ├── pricing/
│   │   │   │   ├── PricingPage.js
│   │   │   │   ├── Hero.js
│   │   │   │   └── Brokerage.js
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── ProductPage.js
│   │   │   │   ├── Hero.js
│   │   │   │   ├── LeftSection.js
│   │   │   │   ├── RightSection.js
│   │   │   │   └── Universe.js
│   │   │   │
│   │   │   ├── signup/
│   │   │   │   ├── SignUp.js         # 2-step signup (form + OTP)
│   │   │   │   └── SignUp.css
│   │   │   │
│   │   │   ├── login/
│   │   │   │   ├── Login.js          # Email/mobile toggle login
│   │   │   │   └── Login.css
│   │   │   │
│   │   │   └── support/
│   │   │       ├── SupportPage.js
│   │   │       ├── Hero.js
│   │   │       ├── CreateTicket.js
│   │   │       └── pages/
│   │   │           └── SupportTopic.js
│   │   │
│   │   └── [CSS files for each page]
│   │
│   ├── .env                          # REACT_APP_DASHBOARD_URL
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
│
├── dashboard/                        # React Trading Dashboard
│   ├── public/
│   │   └── logo.png
│   │
│   ├── src/
│   │   ├── index.js                  # Startup OTP/token decoder
│   │   ├── index.css                 # Global styles
│   │   │
│   │   ├── hooks/
│   │   │   └── useUsername.js        # Custom hook for username
│   │   │
│   │   ├── components/
│   │   │   ├── Home.js               # Main layout
│   │   │   ├── TopBar.js             # Header with indices
│   │   │   ├── Menu.js               # Sidebar navigation
│   │   │   ├── Dashboard.js          # Router for pages
│   │   │   ├── Summary.js            # Equity/Holdings summary
│   │   │   ├── Orders.js             # Orders table
│   │   │   ├── Holdings.js           # Holdings list
│   │   │   ├── Positions.js          # Positions list
│   │   │   ├── Funds.js              # Funds page
│   │   │   ├── Apps.js               # Apps page
│   │   │   ├── WatchList.js          # Watch list (with buy/sell)
│   │   │   ├── BuyActionWindow.js    # Buy order form
│   │   │   ├── SellActionWindow.js   # Sell order form
│   │   │   ├── GeneralContext.js     # Context for buy/sell state
│   │   │   └── [CSS files]
│   │   │
│   │   └── node_modules/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
│
└── PROJECT_DOCUMENTATION.md          # This file

```

### File Count Summary
| Module | Files | Purpose |
|--------|-------|---------|
| **Backend** | ~8 | Server, models, OTP service |
| **Frontend** | ~30 | Landing pages, auth, routing |
| **Dashboard** | ~15 | Trading UI, components |
| **Total** | ~53 | Full-stack application |

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Request | Response | Status |
|--------|----------|---------|----------|--------|
| POST | `/register` | `{email, mobile, password, firstName, lastName}` | `{token, user}` | ✅ |
| POST | `/login` | `{emailOrMobile, password}` | `{token, user}` | ✅ |
| POST | `/sendOtp` | `{mobile}` | `{message, mobile}` | ✅ |
| POST | `/verifyOtp` | `{mobile, otp}` | `{message, verified}` | ✅ |
| GET | `/testLastOtp` | - | `{mobile, otp, timestamp}` | ✅ |
| GET | `/verifyToken` | `Authorization: Bearer <token>` | `{message, userId, email}` | ✅ |

### Trading Endpoints

| Method | Endpoint | Request | Response | Status |
|--------|----------|---------|----------|--------|
| POST | `/newOrder` | `{name, qty, price, mode}` | `"Order Saved!!!"` | ✅ |
| GET | `/allOrders` | - | `[{...order}]` | ✅ |
| GET | `/allHoldings` | - | `[{...holding}]` | ✅ |
| GET | `/allPositions` | - | `[{...position}]` | ✅ |

### Response Format

**Success Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "mobile": "9876543210",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Response:**
```json
{
  "message": "Email or mobile already registered",
  "error": "Duplicate key error"
}
```

---

## 💾 Database Models

### MongoDB Collections

#### 1. **users**
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  mobile: String (unique, required),
  password: String (hashed, required),
  firstName: String,
  lastName: String,
  createdAt: Date (auto)
}

Example:
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "$2a$10$sG...hashed...",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": ISODate("2024-12-03")
}
```

#### 2. **orders**
```javascript
{
  _id: ObjectId,
  name: String,
  qty: Number,
  price: Number,
  mode: String ('BUY' | 'SELL'),
  createdAt: Date
}

Example:
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "name": "RELIANCE",
  "qty": 10,
  "price": 2500,
  "mode": "BUY",
  "createdAt": ISODate("2024-12-03")
}
```

#### 3. **holdings**
```javascript
{
  _id: ObjectId,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String ("%"),
  day: String ("%"),
  isLoss: Boolean
}
```

#### 4. **positions**
```javascript
{
  _id: ObjectId,
  product: String,
  name: String,
  net: String,
  sell: Number,
  buy: Number,
  qty: Number
}
```

---

## 🔄 Data Flow Diagrams

### Complete Signup Flow

```
User fills form (Step 1)
        ↓
[Frontend] Validates inputs
        ↓
POST /sendOtp {mobile}
        ↓
[Backend] generateOTP() → 6-digit
        ↓
[Backend] otpStore[mobile] = {otp, expiry}
        ↓
[Backend] Console log: "📱 OTP Generated for 9876543210: 123456"
        ↓
Response: {message: "OTP sent"}
        ↓
[Frontend] GET /testLastOtp (for testing)
        ↓
Display success: "✅ OTP sent! (TEST: 123456)"
        ↓
User enters OTP (Step 2)
        ↓
POST /verifyOtp {mobile, otp}
        ↓
[Backend] verifyOTP() checks otpStore[mobile]
        ↓
[Backend] Compares otp & expiry
        ↓
If valid: DELETE otpStore[mobile]
        ↓
Response: {verified: true}
        ↓
POST /register {email, mobile, password, ...}
        ↓
[Backend] UserModel.create()
        ↓
Pre-save middleware: BCRYPT hash password
        ↓
MongoDB insert
        ↓
JWT sign({userId, email}, secret, 7d)
        ↓
Response: {token, user}
        ↓
[Frontend] AuthContext.login(token, user)
        ↓
localStorage.setItem("token", ...)
localStorage.setItem("user", ...)
        ↓
Encode to base64: btoa({...user, token})
        ↓
window.location.href = "http://localhost:3001/?u=<encoded>"
        ↓
[Dashboard] Detects u param
        ↓
atob() decode → JSON.parse()
        ↓
localStorage.setItem("user", decoded)
localStorage.setItem("token", decoded.token)
        ↓
useUsername hook reads from localStorage
        ↓
Menu displays: "Hi, J!" + "John Doe"
```

### Login Flow

```
User enters email/mobile + password
        ↓
POST /login {emailOrMobile, password}
        ↓
[Backend] Find user by email OR mobile
        ↓
bcryptjs.compare(input, hashed)
        ↓
If match: JWT sign() → token
        ↓
Response: {token, user}
        ↓
[Frontend] login(token, user) → AuthContext
        ↓
Encode & redirect to dashboard
        ↓
Dashboard shows user info
```

---

## 🚀 Setup & Running Instructions

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (free tier)
- npm or yarn

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/zerodha
JWT_SECRET=your_super_secret_key_change_in_production
PORT=3002
EOF

# Start server
npm start
# Output: ✅ App started on port 3002
#         ✅ DB Connected
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_DASHBOARD_URL=http://localhost:3001" > .env

# Start dev server
npm start
# Opens: http://localhost:3000
```

### 3. Dashboard Setup

```bash
cd dashboard

# Install dependencies
npm install

# Start dev server (port 3001)
PORT=3001 npm start
# Or: npm start (if pre-configured)
# Opens: http://localhost:3001
```

### 4. Test the Full Flow

1. **Signup:**
   - Navigate to http://localhost:3000/signup
   - Fill form: email, mobile (10 digits), password
   - Submit → OTP appears in console
   - Enter OTP → Register
   - Auto-redirects to dashboard with user info

2. **Login:**
   - Navigate to http://localhost:3000/login
   - Use email or mobile + password
   - Submit → Redirects to dashboard

3. **Dashboard:**
   - View holdings, orders, positions
   - User name appears in top-right menu
   - Place buy/sell orders

### Environment Variables

**Backend (.env)**
```
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/zerodha
JWT_SECRET=your_secret_key_here_change_this
PORT=3002
```

**Frontend (.env)**
```
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

---

## 🐛 Debugging Tips

### Common Issues

| Issue | Solution |
|-------|----------|
| "MONGO_URL not configured" | Check `.env` file, verify Atlas connection string |
| "CORS error" | Backend has `cors()` middleware, check port numbers |
| "OTP not showing" | Backend logs to console, check terminal output |
| "JWT token invalid" | Regenerate token, check `JWT_SECRET` consistency |
| "Username not showing in dashboard" | Check localStorage in DevTools, verify user data |
| "Dashboard not loading user" | Verify query param `?u=` is being passed, check browser console |

### Debug Commands

```bash
# Check MongoDB connection
curl -X GET http://localhost:3002/allOrders

# Generate test OTP
curl -X POST http://localhost:3002/sendOtp \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9876543210"}'

# Get last OTP
curl http://localhost:3002/testLastOtp

# Verify JWT
curl -H "Authorization: Bearer <token>" http://localhost:3002/verifyToken
```

---

## 📱 Frontend to Dashboard Link

### How the Two Apps Communicate

```
Frontend (Port 3000)
    ↓
User logs in
    ↓
Frontend encodes user + token to base64
    ↓
window.location.href = "http://localhost:3001/?u=<base64>"
    ↓
Dashboard (Port 3001)
    ↓
Startup decodes query param
    ↓
Stores in localStorage
    ↓
Displays user info
```

### Security Notes

⚠️ **Development only:** Passing JWT in query string is insecure for production.

✅ **For production, use:**
1. **Same-origin apps:** Both apps on same domain → localStorage shared
2. **Secure cookie:** Set HttpOnly cookie on dashboard domain
3. **Server-side exchange:** Frontend requests one-time token, dashboard exchanges for session

---

## 🎓 Learning Path

To understand this project, follow this sequence:

1. **Day 1:** Understand the architecture (3-tier model)
2. **Day 2:** Learn authentication flow (signup → OTP → JWT)
3. **Day 3:** Study frontend components and routing
4. **Day 4:** Study backend API and database models
5. **Day 5:** Learn how frontend & dashboard communicate
6. **Day 6:** Test end-to-end flow (signup → login → dashboard)
7. **Day 7:** Extend features (add more orders, positions, etc.)

---

## 📞 Support & Next Steps

### Recommended Enhancements

- [ ] Email verification (in addition to OTP)
- [ ] Forgot password flow
- [ ] User profile page
- [ ] Order history with filtering
- [ ] Real stock prices (integrate external API)
- [ ] WebSocket for live order updates
- [ ] Unit & integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

### Contact/Questions
Refer to each component's comments for specific implementation details.

---

**Document Version:** 1.0  
**Last Updated:** December 3, 2025  
**Status:** Complete & Documented

---

## 🔔 Recent Enhancements (Real-time Trading)

- **Socket.IO** added to backend to emit realtime events: `orderCreated`, `orderUpdated`, `holdingsUpdated`, `priceUpdate`.
- **Dashboard** now consumes those events via `socket.io-client` to show live order/holding/price updates.
- **Order lifecycle simulation**: Orders are saved with `status: PENDING` and simulated to `EXECUTED` after a short delay; holdings are updated accordingly.

### Details (what changed)

- **Optimistic UI** — when a user places a buy/sell order the dashboard immediately shows the new order row (via `localOrderCreated` event) so the UI feels instantaneous even before the server confirms execution.
- **Per-user scoping** — `Orders` now contain a `userId` (attached from JWT on request). The backend emits events to a user-specific socket room (`user:<userId>`), and the dashboard joins it when a valid JWT is available on socket connect. `GET /allOrders` also returns only the requesting user's orders when Authorization header is present.
- **Graceful fallback** — backend will not crash if `socket.io` is not installed; it logs a warning and real-time features are disabled until `socket.io` is installed. The dashboard will attempt to load `socket.io-client` dynamically and fallback to a CDN script if the package isn't installed locally so the app can still compile.
- **Price simulation** — backend simulates market price moves every 5s and emits `priceUpdate` events for holdings; holdings and charts update in real-time on the dashboard.

### How to enable & verify realtime locally

1. Install backend Socket.IO and dashboard client (if you haven't yet):

```powershell
cd backend
npm install socket.io@^4.8.1

cd ..\dashboard
npm install socket.io-client@^4.8.1
```

2. Restart both servers (backend & dashboard). Backend logs should show the HTTP server started and Socket.IO ready. Dashboard console should show `Socket connected -> <socket-id>` when connected.

3. Quick smoke tests:

- Create an order in the dashboard → it should appear instantly in Orders table (optimistic UI).  
- After ~1.5–3.5s the order should update to `Executed` and holdings should reflect the trade.  
- Holding prices should drift every ~5s and update the holdings table.

If any of the above steps fail, check terminal logs for `⚠️ socket.io not found` (backend) or `socket.io-client not installed` (dashboard), run the `npm install` commands above and restart.

### Developer notes & caveats

- The order matching and execution here is a lightweight simulation intended for development and UX. It is not a financial-grade matching engine.  
- Holdings are updated in a naive way (increase/decrease qty, recalc avg). No margin/settlement/accounting is implemented.  
- In production you should lock down socket auth (verify token on connect and reject unauthenticated sockets) and remove any dev-only endpoints (e.g., `/testLastOtp`).

### Suggested next improvements

- Order book and matching engine (limit orders, partial fills, order depth).  
- Order cancel and modification flow (allow cancelling PENDING orders and reflecting changes in holdings).  
- WebSocket authentication hardening (reject invalid tokens on connect and require JWT handshake).  
- Notifications and confirmations (toasts, webhook-style trade confirmations).  
- Replace simulated prices with a real market-data feed / websocket (for realistic LTP).

### How to run after changes

```powershell
# Backend
cd backend
npm install
npm start

# Dashboard
cd dashboard
npm install
npm start
```

This will ensure `socket.io` and `socket.io-client` are installed and the realtime features work locally.

---

If you'd like, next I can:

- Add per-user order scoping (so each user sees only their orders/holdings).
- Add a proper matching engine simulation (partial fills, order book).
- Add WebSocket authentication (verify JWT on socket connect).

Tell me which of the next steps you'd like me to implement first and I'll proceed.

# 💸 Subscription Tracker

A smart and secure Node.js application for tracking and managing recurring subscriptions.
Built with **Express**, **Arcjet Security Middleware**, and a clean, modular architecture.

---

## 🚀 Features

-   🔐 **Security Middleware (Arcjet)** — rate limiting, bot detection, and fingerprint-based protection.
-   📦 **RESTful API** — clean and structured endpoints for managing subscriptions.
-   🧠 **Smart Categorization** — easily group and filter active or canceled subscriptions.
-   ⚙️ **Environment-based Config** — flexible `.env` configuration for local and production.
-   🧾 **Logging & Error Handling** — detailed request logging and structured error reporting.

---

## 🧰 Tech Stack

| Category  | Technology                     |
| --------- | ------------------------------ |
| Backend   | Node.js, Express               |
| Security  | Arcjet                         |
| Database  | MongoDB (or your preferred DB) |
| Runtime   | Node.js v22+                   |
| Dev Tools | Nodemon, ESLint, Prettier      |

---

## 📁 Project Structure

```
subscription-tracker/
│
├── config/
│   ├── arcjet.js              # Arcjet setup and configuration
│   └── env.js                 # Environment-based config
│
├── controllers/
│   └── auth.controller.js     # Auth controller for user login and registration
│   └── user.controller.js     # User controller for managing user profiles
│   └── subscription.controller.js  # Subscription controller for managing subscriptions
│
├── database/
│   └── mongo.js               # MongoDB setup and configuration
│
├── middlewares/
│   ├── arcjet.middleware.js   # Request protection middleware
│   └── auth.middleware.js     # Auth middleware for user login and registration
│   └── error.middleware.js    # Error handling middleware
│   └── roles.middleware.js    # Role-based access control middleware
│
├── models/
│   └── subscription.model.js  # Subscription schema
│   └── user.model.js          # User schema
│
├── routes/
│   └── auth.route.js          # Auth routes for user login and registration
│   └── user.route.js          # User routes for managing user profiles
│   └── subscription.route.js  # Subscription routes for managing subscriptions
│
├── app.js                     # Main Express app
├── .env.development.local     # Environment variables for local development
└── .env.production.local      # Environment variables for production
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/pouria-drd/subscription-tracker.git
cd subscription-tracker
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment

Create a `.env.development.local` file in the root folder:

```env
# PORT
PORT="5500"

# ENVIRONMENT
NODE_ENV="development"

# DATABASE
DB_URI="your-mongo-uri"

# JWT AUTH
JWT_SECRET="any-secret-key"
JWT_EXPIRES_IN="1d"

# Arcjet
ARCJET_ENV="development"
ARCJET_KEY="your-arcjet-key"
```

### 4️⃣ Run the app

```bash
npm run dev
```

Your app should now be live at:

```
http://localhost:5500
```

---

## 🧩 Future Plans

-   ✅ Email notifications for upcoming renewals
-   ✅ Payment analytics dashboard
-   🔜 Telegram bot integration
-   🔜 Subscription insights & recommendations

---

## 📜 License

MIT © [Pouria Darandi](https://github.com/pouria-drd)

---

### 💬 Feedback

Got suggestions or feature requests?  
Open an [issue](https://github.com/pouria-drd/subscription-tracker/issues) — contributions are welcome!

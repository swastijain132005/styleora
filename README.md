# 👗 Styleora – AI Fashion Recommendation Platform

Styleora is a full-stack AI-powered fashion recommendation web application that suggests personalized clothing based on user preferences such as gender, category, color, budget, and style. Users can securely sign in, explore curated recommendations, and save their favorite products to a wishlist.

## 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 🔑 Google Sign-In using Firebase Authentication
- 🤖 AI-powered personalized fashion recommendations
- ❤️ Wishlist management (Add/Remove products)
- 👤 Protected routes using JWT authentication
- 🔄 Access & Refresh Token authentication
- 📱 Responsive UI
- ☁️ Deployed on Vercel (Frontend) and Render (Backend)

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS Modules
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Firebase Admin SDK

### Deployment
- Vercel
- Render

---

## 📂 Project Structure
Styleora
│
├── frontend
│ ├── src
│ ├── components
│ ├── pages
│ └── firebase.js
│
├── backend
│ ├── controllers
│ ├── routes
│ ├── middlewares
│ ├── models
│ └── server.js
│
└── README.md



## 🔐 Authentication

- Email & Password Authentication
- Google OAuth using Firebase
- JWT Access Token
- Refresh Token using HttpOnly Cookies
- Protected API Routes


## 🎯 Workflow

1. User signs up or logs in.
2. User selects fashion preferences.
3. Backend processes preferences.
4. AI generates personalized recommendations.
5. Products are displayed.
6. Users can save products to their wishlist.


# ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd Styleora


cd backend
npm install
nodemon server.js



cd frontend
npm install
npm run dev


Author

Swasti Jain

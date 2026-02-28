# 📸 Cohort 2.0 -- Instagram Clone Backend API

A structured RESTful backend built using **Node.js, Express, MongoDB,
JWT Authentication, and ImageKit**.

This backend handles: - User Authentication - Post Creation &
Retrieval - Like System - Follow System - Cloud Image Upload

------------------------------------------------------------------------

## 🚀 Tech Stack

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   JWT (Cookie-Based Authentication)
-   bcryptjs (Password Hashing)
-   Multer (File Upload Handling)
-   ImageKit (Cloud Storage)

------------------------------------------------------------------------

## 📂 Project Structure

    src/
    │
    ├── config/
    │   └── database.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── post.controller.js
    │   └── user.controller.js
    │
    ├── middlewares/
    │   └── auth.middleware.js
    │
    ├── models/
    │   ├── user.model.js
    │   ├── post.model.js
    │   ├── like.model.js
    │   └── follow.model.js
    │
    ├── routes/
    │   ├── auth.route.js
    │   ├── post.route.js
    │   └── user.route.js
    │
    └── app.js

    server.js

------------------------------------------------------------------------

## 🔐 Authentication

-   JWT-based authentication
-   Token stored in HTTP-only cookies
-   Middleware verifies token for protected routes
-   Passwords securely hashed using bcrypt

------------------------------------------------------------------------

## 📌 API Endpoints

### 🔑 Auth Routes

  Method   Endpoint               Description
  -------- ---------------------- -------------------
  POST     `/api/auth/register`   Register new user
  POST     `/api/auth/login`      Login user

------------------------------------------------------------------------

### 📝 Post Routes (Protected)

  Method   Endpoint                       Description
  -------- ------------------------------ ----------------------------------
  POST     `/api/posts/create`            Create a new post (image upload)
  GET      `/api/posts`                   Get all posts of logged-in user
  GET      `/api/posts/details/:postId`   Get detailed post info
  POST     `/api/posts/like/:postId`      Like a post

------------------------------------------------------------------------

### 👥 User Routes (Protected)

  --------------------------------------------------------------------------------------
  Method             Endpoint                               Description
  ------------------ -------------------------------------- ----------------------------
  POST               `/api/users/follow/:username`          Follow a user

  POST               `/api/users/unfollow/:username`        Unfollow a user

  PATCH              `/api/users/follow/status/:username`   Accept or reject follow
                                                            request
  --------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 🗄️ Database Models

### User

-   user (unique)
-   email (unique)
-   password (hashed)
-   bio
-   profileImage

### Post

-   caption
-   imgUrl
-   userId (ObjectId reference)
-   timestamps

### Like

-   postId (ObjectId reference)
-   userId
-   unique compound index (postId + userId)

### Follow

-   followers
-   following
-   status (pending, accepted, rejected)
-   unique compound index

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

------------------------------------------------------------------------

## 🏁 Run Locally

Install dependencies:

    npm install

Start server:

    npm run dev

or

    node server.js

Server runs at:

    http://localhost:3000

------------------------------------------------------------------------

## 📌 Status

Backend complete and ready for frontend integration.

# SwiftCart - E-Commerce Store

![SwiftCart Hero Placeholder](screenshots/hero-placeholder.png)

This project is submitted as **Task 1** for the **CodeAlpha Internship**.

SwiftCart is a modern, responsive, and full-stack E-Commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). It features a premium user interface designed with Tailwind CSS and Framer Motion, offering users a seamless shopping experience.

## 🌟 Features

*   **Premium UI/UX:** Modern, clean design with smooth animations and responsive layout.
*   **User Authentication:** Secure login and registration using JWT (JSON Web Tokens).
*   **Product Catalog:** Browse, search, and filter products across various categories.
*   **Shopping Cart:** Add, remove, and adjust product quantities with real-time total calculation.
*   **Secure Checkout:** Streamlined checkout process with shipping details and order summary.
*   **Order History:** Users can track their past orders and order status.
*   **Admin Dashboard:** Dedicated admin panel to manage products (add/delete), view user accounts, and update order statuses.
*   **State Management:** Context API utilized for robust global state management (Auth and Cart).

## 📸 Screenshots

| Home Page | Product Details |
|---|---|
| ![Home Page Placeholder](screenshots/home-placeholder.png) | ![Product Details Placeholder](screenshots/product-placeholder.png) |

| Shopping Cart | Admin Dashboard |
|---|---|
| ![Cart Placeholder](screenshots/cart-placeholder.png) | ![Admin Placeholder](screenshots/admin-placeholder.png) |

## 🛠️ Tech Stack

**Frontend:**
*   React.js
*   React Router DOM
*   Tailwind CSS
*   Framer Motion (Animations)
*   Lucide React (Icons)
*   Vite

**Backend:**
*   Node.js
*   Express.js
*   MongoDB & Mongoose
*   JWT (JSON Web Tokens)
*   Bcryptjs (Password Hashing)
*   Cors & Dotenv

## 🚀 Installation & Setup

Follow these steps to run the project locally on your machine.

### Prerequisites
*   Node.js installed
*   MongoDB database (Local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd CodeAlpha_Task1_SwiftCart
```

### 2. Backend Setup
```bash
cd backend
npm install
```
*   Create a `.env` file based on the `.env.example`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
*   Start the backend server:
```bash
npm start
```
*(The server will run on `http://localhost:5000`)*

### 3. Frontend Setup
Open a new terminal window/tab:
```bash
cd frontend
npm install
```
*   Start the development server:
```bash
npm run dev
```
*(The app will open on `http://localhost:5173`)*

## 🌍 Deployment

### Deploying the Frontend (Vercel)
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Set the Root Directory to `frontend`.
5. Ensure the Build Command is `npm run build` and Output Directory is `dist`.
6. Add the environment variable `VITE_API_URL` pointing to your deployed backend URL.
7. Click **Deploy**.

### Deploying the Backend (Render)
1. Go to [Render](https://render.com/) and create a new Web Service.
2. Connect your GitHub repository.
3. Set the Root Directory to `backend`.
4. Set the Build Command to `npm install` and Start Command to `npm start`.
5. Add your `.env` variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
6. Click **Create Web Service**.

## 📂 Project Structure

```text
CodeAlpha_Task1_SwiftCart/
├── backend/               # Express server, routes, models, controllers
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env.example
├── frontend/              # React frontend, pages, components, context
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
├── screenshots/           # UI Previews
├── .gitignore
└── README.md
```

---
*Developed by Syed Nazeer for CodeAlpha Internship Task 1.*

📒 Notes App (MERN Stack)
A full-stack Notes application built using the MERN stack. Users can register, log in, and manage personal notes securely.

🚀 Live Demo
🌐 Frontend: https://new-notes-app-beta.vercel.app

⚙️ Backend: https://new-notes-app-i7oo.onrender.com




🧠 Features
✅ User Authentication (Register & Login)
✅ Secure password hashing with bcrypt
✅ JWT-based authentication
✅ Create, Read, Delete notes
✅ Protected routes (only logged-in users can access notes)
✅ Responsive UI with Tailwind CSS
✅ Full deployment (Vercel + Render)
🏗️ Tech Stack
Frontend
React (Vite)

Tailwind CSS

React Router DOM

Backend
Node.js

Express.js

MongoDB (Mongoose)

Authentication
JWT (JSON Web Token)

bcrypt

Deployment
Vercel (Frontend)

Render (Backend)

📁 Project Structure
Blog-App/
│
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│   └── vercel.json
│
├── server/                # Backend (Express)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
🔐 Authentication Flow (Important)
1. User registers → password is hashed using bcrypt
2. User logs in → server returns JWT token
3. Token stored in localStorage
4. Token sent in headers:
   Authorization: Bearer <token>
5. Backend verifies token using middleware
6. User accesses protected routes (notes)
📡 API Endpoints
Auth Routes
POST /api/auth/register
POST /api/auth/login
Notes Routes (Protected)
GET    /api/notes
POST   /api/notes
DELETE /api/notes/:id
⚙️ Environment Variables
Backend (.env)
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
Frontend (Vercel)
VITE_API_URL=https://your-backend-url.onrender.com
🧪 Running Locally
1. Clone the repo
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. Backend setup
cd server
npm install
npm run dev
3. Frontend setup
cd client
npm install
npm run dev
🚀 Deployment
Frontend (Vercel)
Set root directory → client

Add environment variable:

VITE_API_URL=your-backend-url
Backend (Render)
Add environment variables:

MONGO_URI
JWT_SECRET
⚠️ Common Issues (Solved in this project)
❌ 401 Unauthorized → Missing token in headers
❌ 500 Error → Wrong database query (find vs findById)
❌ Unexpected token '<' → Wrong API URL
❌ 404 on refresh → Missing vercel.json rewrite
📚 What I Learned
✔ Full MERN stack development
✔ Authentication with JWT
✔ Secure backend practices
✔ API integration (frontend ↔ backend)
✔ Deployment (Render + Vercel)
✔ Debugging real-world errors
🙌 Author
Naptile Peter

⭐ Future Improvements
🔹 Edit notes
🔹 Add timestamps
🔹 Dark mode
🔹 User profile
🔹 Image upload (Cloudinary)
🔹 Better state management (Context API / Redux)

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require("./config/db");
dotenv.config();
connectDB();

const app =express();
app.use(cors({
  origin: "https://new-notes-app-beta.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use("/api/auth",require("./Routes/authRoutes"))
app.use("/api/notes",require("./Routes/notesRoutes"));

app.get("/",(req,res)=>{
    res.send("Auth Api running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server running on http://localhost:${PORT}`));

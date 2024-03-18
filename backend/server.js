const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const emojiRouter = require('./routes/emoji');

require('dotenv').config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/emoji", emojiRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connection Success! ✅");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// Start the server
const PORT = process.env.PORT || 3040;
app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port number : ${PORT}`);
});

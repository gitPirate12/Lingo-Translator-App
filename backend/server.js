require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PostRoutes = require('./routes/posts');
const ReplyRoutes = require('./routes/replies');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const emojiRouter = require('./routes/emoji');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/posts', PostRoutes);
app.use('/api/replies', ReplyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/emoji', emojiRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB ✅');
    // Start server
    const PORT = process.env.PORT || 3040;
    app.listen(PORT, () => {
      console.log(`🚀 Server is up and running on port number : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

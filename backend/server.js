const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const emojiRouter = require('./routes/emoji');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3040;
const URL = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/emoji', emojiRouter);

// Connect to MongoDB
mongoose.connect(URL, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('✅ MongoDB Connection Success! ✅');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port number: ${PORT}`);
});

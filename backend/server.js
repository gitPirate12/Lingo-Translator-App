const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const emojiRouter = require('./routes/emoji');

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const PostRoutes = require('./routes/posts')
const ReplyRoutes = require('./routes/replies')
// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/posts',PostRoutes)
app.use('/api/replies',ReplyRoutes)

// connect to db
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 


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
    console.log(`🚀 Server is up and running on port number : ${PORT}`);
})

//emoji to text translater

const emojiRouter = require("./routes/emoji");

app.use("/emoji",emojiRouter)
    console.log(`🚀 Server is up and running on port number: ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 3040;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreateIndex: true,
    //useNewUrlParser: true,
    //useUnifieldTopology: true,
    //useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("✅ Mongodb Connection Success! ✅");
})


app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port number : ${PORT}`);
})

//emoji to text translater

const emojiRouter = require("./routes/emoji");
app.use("/emoji",emojiRouter)
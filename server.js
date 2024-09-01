
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts")
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(bodyParser.json());

// connect db
mongoose.connect("mongodb://localhost:27017/blog").then(() => console.log("db connected successfully")).catch((err) => {
    console.log("db not connected :", err)
})

// use routes  
app.use('/api/blog', postRoutes)

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
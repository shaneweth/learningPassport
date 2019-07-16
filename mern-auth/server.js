const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// bodyParser

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })

    .then(() => console.log("MONGO CONNECT!"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000; // process.env.port is for Heroku, later

app.listen(port, () => console.log(`Server serve serve serving on port ${port}!?!!`));
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

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

// Passport MW
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);


const port = process.env.PORT || 5000; // process.env.port is for Heroku, later

app.listen(port, () => console.log(`Server serve serve serving on port ${port}!?!!`));
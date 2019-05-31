// npm middleware
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// PORT
var PORT = process.env.PORT || 3000;
var db = require("./models");

// Creating express app - configuring middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// Calling to use "express-session"
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//
// require routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// 

// port listener
app.listen(PORT, function() {
    console.log("eye in the sky. looking at youuuuu - on port " + PORT);
});

// listen to and show all activities 
// sync db and log message to the user on success
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("==> listening on port %s", PORT, PORT);
    });
});
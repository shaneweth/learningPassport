// npm middleware
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// PORT
var PORT = process.env.PORT || 3000;

// Creating express app - configuring middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//GET to test server 
app.get("/", function(req, res) {
    res.send("passport test");
})

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
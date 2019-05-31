// requiring models and passport
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
    // using passport with local strategy
    // if user logs in correctly, redirect to members page
    // ELSE user sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        // doing a POST route with js
        // sending the user back to the route
        res.json("/members");
    });

    // route for signing up user
    app.post("/api/signup", function(req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });
    // Route for logout
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            res.json({});
        }
        else {
            // else send back the user's email and id
            // do not send password
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
}
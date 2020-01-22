// ====================
// REQUIRE ALL PACKAGES
// ====================
const express = require('express'),
app           = express(),
bodyParser    = require("body-parser");

// =================
// APP CONFIGURATION
// =================
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

// ==================
// APPLICATION ROUTES
// ==================
app.get('/', function(req, res) {
    res.render("home");
});

app.post("/newsletter", function(req, res) {
    var email = req.body.email;
    console.log(email);
    res.redirect('/');
});

// ==============
// SERVER STARTUP
// ==============
app.listen(3000, function() {
    console.log("server is running...");
});
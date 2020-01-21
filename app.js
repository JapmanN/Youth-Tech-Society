// ====================
// REQUIRE ALL PACKAGES
// ====================
const express = require('express'),
app           = express();

// =================
// APP CONFIGURATION
// =================
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ==================
// APPLICATION ROUTES
// ==================
app.get('/', function(req, res) {
    res.render("home");
});

// ==============
// SERVER STARTUP
// ==============
app.listen(3000, function() {
    console.log("server is running");
});
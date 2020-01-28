// ====================
// REQUIRE ALL PACKAGES
// ====================
const express = require('express'),
app           = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose");

// ==================
// REQUIRE ALL MODELS
// ==================
const Article = require("./models/article");

// =================
// APP CONFIGURATION
// =================
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/yts', {useNewUrlParser: true});

// ==================
// APPLICATION ROUTES
// ==================

// HOME PAGE
app.get('/', function(req, res) {
    res.render("home");
});

// ARTICLES PAGE
app.get('/articles', (req, res) => {
    Article.find({}, function(err, articles) {
        if(err) {
            console.log(err);
        } else {
            res.render("articles", {articles: articles});
        }
    });
});

// READ ARTICLE PAGE
app.get('/articles/:id', (req, res) => {
    Article.findById(req.params.id, function(err, foundArticle) {
        if(err) {
            console.log(err)
        } else {
            res.render("show", {article: foundArticle});
        }
    });
});

// POSTING A NEW ARTICLE ROUTE
app.post("/post_article", (req, res) => {
    var newArticle = {title: req.body.title, description: req.body.description, image: req.body.image, content: req.body.content};
    Article.create(newArticle, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/articles");
        }
    });
});

// NEWSLETTER SIGNUP ROUTE
app.post("/newsletter", function(req, res) {
    var email = req.body.email;
    console.log(email);
    res.redirect('back');
});

// CONTACT --YTS STAFF-- ROUTE


// ==============
// SERVER STARTUP
// ==============
app.listen(3000, function() {
    console.log("server is running...");
});
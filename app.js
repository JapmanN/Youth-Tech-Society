// ====================
// REQUIRE ALL PACKAGES
// ====================
const express  = require('express'),
app            = express(),
bodyParser     = require("body-parser"),
mongoose       = require("mongoose"),
methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

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

// APPLY PAGE
app.get('/apply', (req, res) => {
    res.render("apply");
});

app.get('/new_article', (req, res) => { res.render("new_article"); });

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
    var newArticle = {title: req.body.title, description: req.body.description, image: req.body.image, content: req.body.content, author: req.body.author};
    Article.create(newArticle, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/articles");
        }
    });
});

// EDIT AN EXISTING ARTICLE
app.get("/articles/:id/edit", function(req, res){
    Article.findById(req.params.id, function(err, foundArticle){
        if(err) {
            console.log(err)
        } else {
            res.render("edit", {article: foundArticle});
        }
    });
});

// UPDATE THE ARTICLE
app.put("/articles/:id", function(req, res){
    Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updatedArticle){
       if(err){
           res.redirect("/articles");
       } else {
           res.redirect("/articles/" + req.params.id);
       }
    });
});

// DELETE AN EXISTING ARTICLE
app.delete("/articles/:id", function(req, res){
    Article.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/articles");
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
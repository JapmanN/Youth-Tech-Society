var mongoose = require("mongoose");

var articleSchema = new mongoose.Schema ({
    title: String,
    description: String,
    image: String,
    content: String,
    author: String
});

module.exports = mongoose.model("Article", articleSchema);
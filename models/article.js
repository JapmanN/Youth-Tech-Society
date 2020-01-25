var mongoose = require("mongoose");

var articleSchema = new mongoose.Schema ({
    title: String,
    description: String,
    content: String
});

module.exports = mongoose.model("Article", articleSchema);
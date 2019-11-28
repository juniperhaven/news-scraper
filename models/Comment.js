var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    // `title` is of type String
    title: String,
    // `body` is of type String
    body: String
});

var Comment = mongoose.model("Note", CommentSchema);

module.exports = Comment;
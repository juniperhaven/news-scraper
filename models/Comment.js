// again, require mongoose
var mongoose = require("mongoose");

// and the schema thing
var Schema = mongoose.Schema;

// make new schema for the comments
var CommentSchema = new Schema({
    title: String,
    body: String
});

// variable for exporting thing
var Comment = mongoose.model("Comment", CommentSchema);

// export
module.exports = Comment;
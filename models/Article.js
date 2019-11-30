// require mongoose
var mongoose = require("mongoose");

// get schema stuff
var Schema = mongoose.Schema;

// make new schema! called the article schema.
// it requires a title, summary, and link.
// I ordered them in the order they're fetched by the scraper.
// I don't know if that matters but it looks nice.
// it also includes the comment
// that's not required, because that would be a problem
// since comments don't always exist
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// variable for exporting the model schema thing
var Article = mongoose.model("Article", ArticleSchema);

// export
module.exports = Article;
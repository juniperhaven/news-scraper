var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req, res) {
    axios.get("LINK GOES HERE").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article").each(function(i, element) {
            var result = {};

            result.title = $(this).children("h2").text();
            result.title = $(this).children("p").text();
            result.link = $(this).children("a").attr("href");

            console.log(result);

            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) {
                console.log(err);
            });
        });

        res.send("<a href='/articles'><button>Display Articles<button></a>");
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id }).populate("comment").then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
// so here we require express, mongoose, axios, and cheerio
// and the homework 20, which was honestly my entire guideline for all of this since I missed three classes' worth of information and practice relevant to this homework, included morgan
// so I did too
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// require models for mongoose
var db = require("./models");

// port and app variables
var PORT = 8080;
var app = express();

// something to do with the logger that I don't understand
// get express set up
// use the public thing for it
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// set up mongo for what database it's using
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// connect
mongoose.connect(MONGODB_URI);

// scrape articles from the nytimes
// I don't super understand this part either but I basically used one of the scrapers provided
app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article").each(function(i, element) {
            var result = {};

            // the only things I changed are how the results are saved, because I needed an object for mongoose, I think
            // and how things are found, because I needed a separate title and summary
            // so I used find for all of these so I could find the header (all h2), the actual summary of the article (all p), and the link
            // I also put a link to the nytimes page in front of each 'find href' thing because otherwise it was more like half a link than a full link
            result.title = $(element).find("h2").text();
            result.summary = $(element).find("p").text();
            result.link = "https://www.nytimes.com"+$(element).find("a").attr("href");

            // create the new article object wth mongoose
            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) { //error handling
                console.log(err);
            });
        });

        // tell the user the scrape is complete
        // give them a button to click to send them home
        // for some reason this always loads in a very small secondary button next to the primary button
        // it does nothing and goes nowhere and I have no idea why this happens
        // but right now I honestly don't care enough to find out
        res.send("Scrape complete; click the following button to return to the homepage:<br><a href='/'><button>Home Page<button></a>");
    });
});

// this returns the articles in JSON format
app.get("/articles", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

// this returns a single article in JSON format
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id }).populate("comment").then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

// this appears to flat-out do nothing.
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
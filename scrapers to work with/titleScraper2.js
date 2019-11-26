var axios = require("axios");
var cheerio = require("cheerio");

axios.get("https://news.ycombinator.com/").then(function(response) {
  var $ = cheerio.load(response.data);
  var results = [];
  $(".title").each(function(i, element) {
    var title = $(element).children("a").text();
    var link = $(element).children("a").attr("href");
    if (title && link) {
      results.push({
        title: title,
        link: link
      });
    }
  });
  console.log(results);
});
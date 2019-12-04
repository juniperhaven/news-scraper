# news-scraper
This is a program that scrapes news articles from the NY Times and displays their MongoDB id, title, brief description, and a link to the article on the page, where you can click on an article to be able to add a comment, and input the article id in the URL to be able to see all comments on an article.

## Installation
Using Git Bash or Terminal, clone the code on to your computer using ```https://github.com/juniperhaven/news-scraper.git```. Navigate to the folder the program is in, and then type ```npm install```. Next, start the program by typing ```node server.js``` and open "http://localhost:8080" in your web browser.

## Usage
On first loading the page, click the button marked 'Scrape Articles'. Once the scrape is complete, you will be presented with a page telling you the scrape is complete and a button to return you to the homepage. Clicking it should take you back to the homepage, where the articles scraped should now be displayed. If you click on one of the articles, a comment box will appear, and you can add a comment. Clicking on the 'List Articles' button will take you to a page with the JSON of all the articles on it, and putting "articles/(id of the article as displayed on the homepage)" will take you to only that article, where you can see comments that have been made on that article.

## Heroku Link
https://morning-temple-72271.herokuapp.com/

## Technologies Used
MongoDB
mongoose
morgan
cheerio
express
axios
express-handlebars
Heroku
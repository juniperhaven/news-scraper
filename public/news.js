// gets the article and appends it to the page
// so you can see and click on the articles to comment on them
// I made it so the id for each article shows up on the page too
// because I thought that was nice
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i]._id + "<br/>" + data[i].title + "<br/>" + data[i].summary + "<br/>" + data[i].link + "</p>");
    }
});

// this makes it so that if you click on an article, a comment box pops up and you can, y'know, enter a comment
// it saves the comment if a comment exists to be saved
// I think
$(document).on("click", "p", function() {
    $("#comments").empty();
    var id = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + id
    }).then(function(data) {
        console.log(data);
        $("#comments").append("<h2>" + data.title + "</h2>");
        $("#comments").append("<input id='title' name='title' >");
        $("#comments").append("<textarea id='comment' name='body'></textarea>");
        $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

        if (data.comment) {
            $("#title").val(data.comment.title);
            $("#comment").val(data.comment.body);
        }
    });
});

// when you hit the whole 'save comment' button, this goes
// it gets the value of the title of the comment and the body of the comment
// then it empties the comments box
// so you could theoretically comment repeatedly on the same article
// I just thought it seemed stupid to delete the entire comment box every time you entered a comment
// I mean what if you WANT to put multiple comments on the same article
// having to click the same article over and over again seems bothersome
$(document).on("click", "#savecomment", function() {
    var id = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            title: $("#title").val(),
            body: $("#comment").val()
        }
    }).then(function(data) {
        console.log(data);
        $("#title").val("");
        $("#comment").val("");
    });
});  
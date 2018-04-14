

$(document).ready(initializeApp);

var peopleInSpace = [];

function initializeApp(){
    getPeopleInSpace();
    getWikiInfo();
}


function getWikiInfo() {
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Scott_Tingle&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);

            // remove links as they will not work
            blurb.find('a').each(function () {
                $(this).replaceWith($(this).html());
            });

            // remove any references
            blurb.find('sup').remove();

            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            var article_text = $('#article').html($(blurb).find('p'));
            $('body').append(article_text);

            console.log(data);

        },
        error: function (errorMessage) {
        }
    });
}


    //     $.ajax({
    //     type: "GET",
    //     url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Scott_Tinglex&callback=?",
    //     contentType: "application/json; charset=utf-8",
    //     async: false,
    //     dataType: "json",
    //     success: function (data, textStatus, jqXHR) {
    //
    //         var markup = data.parse.text["*"];
    //         var blurb = $('<div></div>').html(markup);
    //
    //         // remove links as they will not work
    //         blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
    //
    //         // remove any references
    //         blurb.find('sup').remove();
    //
    //         // remove cite error
    //         blurb.find('.mw-ext-cite-error').remove();
    //         var article_text=$('#article').html($(blurb).find('p'));
    //         $('body').append(article_text);
    //
    //         console.log(data);
    //
    //     },
    //     error: function (errorMessage) {
    //     }
    // });


function getPeopleInSpace() {

    var ajaxConfig = {
        'dataType': 'json',
        'url': 'http://api.open-notify.org/astros.json',
        'method': 'GET',
        success: function (result) {
            peopleInSpace.push(result.people);
            console.log(result)
        },
        error: function () {
            console.log('Error')
        }
    };
    $.ajax(ajaxConfig);
}

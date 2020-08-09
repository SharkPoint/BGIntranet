;$(document).ready(function () {

    displayPage(qs("pageURL"));

});

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        $(".loadingSpinner").fadeOut(50);
    }
}

function displayPage(selectedPageURL) {

    if (selectedPageURL == undefined) {
        
        $("#newsPage").html('<h2 style="text-align:center;color:#000" width=100% height=1400px>Page Could Not Be Found</h2>');
    } else {
        $('#spNewsPage').on('load', function () {
            $('#spNewsPage').attr('height', '85%');
        })
        $('#spNewsPage').attr('src', selectedPageURL)
    }
}

function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
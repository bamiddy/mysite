// collapsable button
$(function () { // same as document.addeventlistener("DOMContentLoaded",........)
    
    $("#navbarToggle").blur(// same as document.querySelector("#navbarToggle").addeventlistener("blur".......)
        function () {
            var screenWidth = window.innerWidth;
            if (screenWidth < 768){
                $("#collapsable-nav").collapse("hide")
            }
       
        });
});

// Dynamic page for menu-content
(function (global) {
var bc = {};
var homeHtml = "snippet/home-snipper.html"

var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML= html;
};

// show loading icon element identified by 'selector'.
var showloading = function (selector) {
    var html = "<div class='text-center >";
    html += "<img src= 'images/ajax-loader.gif'> </div>";
    insertHtml(selector, html);
}; 
// On page load before image and Css;
document.addEventListener("DOMContentLoaded",
function (event) {
    // on firstload show home view
    showloading("#main-content");
    $ajaxUtils.sendGetRequest(homeHtml, 
        function (responseText) {
            document.querySelector("#main-content")
            .innerHTML= responseText;
        },
        false);
});




// Convenience function for inserting innerHtml for 'select
global.$bc = bc;
})(window);
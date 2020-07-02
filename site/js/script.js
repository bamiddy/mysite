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
var dc = {}; // it has no function for now  until categories-menu

var homeHtml = "snippet/home-snippet.html"
var allCategories = "http://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippet/categories-title-snippet.html";
var categoriesHtml = "snippet/categories-snippet.html";

// Convenience function for inserting innerHtml for 'select
var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML= html;
};

// show loading icon element identified by 'selector'.
var showloading = function (selector) {
    var html = "<div class='text-center' >";
    html += "<img src= 'images/ajax-loader.gif'> </div>";
    insertHtml(selector, html);
}; 


var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue)
    return string
}
// On page load before image and Css;
document.addEventListener("DOMContentLoaded",
function (event) {
    // on firstload show home view
    showloading("#main-content");
    $ajaxUtils.sendGetRequest(homeHtml, 
        function (res) {// This is the request handler
            document.querySelector("#main-content")
            .innerHTML= res; 
        },
        false);
});

// load the menu categories view
dc.loadMenuCategories = function (){
showloading("menu-content");
$ajaxUtils.sendGetRequest(allCategories, buildAndShowCategoriesHTML);
};

// build HTML for the categories page based on the data
// from the server

function buildAndShowCategoriesHTML(categories) { 
// Load title off categories page
$ajaxUtils.sendGetRequest(categoriesTitleHtml,
    function (categoriesTitleHtml) {
        // Retrieve single categoriy snippet
        $ajaxUtils.sendGetRequest(categoriesHtml,
            function (categoriesHtml) {
                var categoriesViewHtml =
                buildCategoriesViewHtml(categories,
                                        categoriesTitleHtml,
                                        categoriesHtml);
                insertHtml("#main-content", categoriesViewHtml);
            }, false);
    
    }, false);
}


    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoriesHtml){
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class= 'row'>";

        // loop over categories
        for (var i=0; i < categories.length; i++){
            // insert category values
            var html = categoriesHtml;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html =
               insertProperty(html, "name", name);
               html += 
               insertProperty(html, "short_name", short_name);
            
               finalHtml += html;
            }

            finalHtml += "</section>";
            return finalHtml
    
    }
     



global.$dc = dc;
})(window);

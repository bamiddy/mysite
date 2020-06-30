(function(global){
    var ajaxUtils = {};
    function getRequestObject () {
        if (window.XMLHttpRequest) {
            return(new XMLHttpRequest());
        }
        else if (window.ActiveXObject) {
        // for very old browser(optional, may not include it)
            return( new ActiveXObject("Microsoft.XMLHttp"));
        }
        else { 
            // if the browser dosent support ajax
            global.alert("Ajax is not supported!")
            return(null);
        } 
    }
    ajaxUtils.sendGetRequest = 
    function(homeHtml, responseHandler) {
        var request = getRequestObject(); // first is to get the request obj "new XMLHttpRequest()" and saving it in var request
        request.onreadystatechange =
            function () {  // This function call handleResponse nd also everytime there is a change in the
                handleResponse(request, responseHandler);
            };
        request.open("GET", homeHtml, true);
        request.send(null); // for POST only
    };
    function handleResponse(request, responseHandler) {
        if ((request.readyState == 4) && (request.status == 200)) {
                responseHandler(request);
        }
    }

global.$ajaxUtils = ajaxUtils;

    


})(window);
(function(global) {

// Set up name space for our utility
var ajaxUtils = {};

// Return an HTTP request object... What wwll b replied back
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
// Makes an Ajax GET request to "requestUrl"
ajaxUtils.sendGetRequest = 
    function(requestUrl, responseHandler) {
        var request = getRequestObject(); // first is to get the request obj "new XMLHttpRequest()" and saving it in var request
        request.onreadystatechange =
            function () {  // This function call handleResponse nd also everytime there is a change in the
                handleResponse(request, responseHandler);
            };
        request.open("GET", requestUrl, true);
        request.send(null); // for POST only
    };

// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error

    function handleResponse(request, 
                            responseHandler) {
        if ((request.readyState == 4) && 
           (request.status == 200)) {
            responseHandler(request);
        }
    }

// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;

})(window);




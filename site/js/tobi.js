(function(global){

    var ajaxUtils = {};
 
 
    function getRequestObject() {
        if (window.XMLHttpRequest){
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject){
            return(new ActiveXObject("Microsoft.XMLHttpRequest"));
        }
        else {
             global.alert("ajax is not supported")  
             return (null);  
        }
        
    }
 
    ajaxUtils.sendGetRequest = 
        function(homeHtml, responseHandler, isJsonResponse) {
            var request = getRequestObject(); // first is to get the request obj "new XMLHttpRequest()" and saving it in var request
            request.onreadystatechange =
                function () {  // This function call handleResponse nd also everytime there is a change in the
                    handleResponse(request, responseHandler,
                     isJsonResponse);
                };
            request.open("GET", homeHtml, true);
            request.send(null); // for POST only
        };
         
        
        
        
        function handleResponse(request, 
                             responseHandler,
                             isJsonResponse) {
         if ((request.readyState == 4) && 
            (request.status == 200)) {
         
         if(isJsonResponse == undefined){
             isJsonResponse = true;
         }
         
         if (isJsonResponse){
             responseHandler(JSON.parse(request.responseText));
         }
         else{
             responseHandler(request.responseText);
         }
     
     }
     }
 
 // Expose utility to the global object
 global.$ajaxUtils = ajaxUtils;
 
 })(window);
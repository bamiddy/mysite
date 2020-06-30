(function (global) {
    ajaxUtils = {};
    var GetResponseobject = function () {
        if (window.XMLHttpRequest){
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject){
            return (new ActiveXObject("microsoft.XMLHttpRequest"));
        }
        else{
            global.alert("Ajax is not supported")
        return null
        }
    }    


        ajaxUtils.sendgetRequest = function () {
            var request = GetResponseobject();
            request.onreadystatechange = function () {
                handleResponse(request, responseHandler);
            }
            

        }


})(window);

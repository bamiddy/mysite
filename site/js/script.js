$(function () {
    
    $("#navbarToggle").blur(
        function () {
            var screenWidth = window.innerWidth;
            if (screenWidth < 768){
                $("#collapsable-nav").collapse("hide")
            }
       
        }
    )

        
   


});
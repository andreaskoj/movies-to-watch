$(document).ready(function (){
//tasks
//1. read more about sessions 
//2. design results from searching
//3. design dispying results 
//4. style elements
//5. handle errors    

//key should be hidden 
        
function searchMovies(querry) { 
    var responseObj;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?include_adult=true&page=1&query="+querry+"&language=en-US&api_key=3bfda1c9ae9408dc2473f92708ca7cc3",
        "method": "GET",
        "headers": {},
        "data": "{}"}

    $.ajax(settings).done(function (response) {       
    responseObj = response;    
    console.log(responseObj);
        $(".items-list-result").append("<li>"+ responseObj.results[0].title +"</li>");
        $(".items-list-result").append("<li>"+ responseObj.results[1].title +"</li>");
        $(".items-list-result").append("<li>"+ responseObj.results[2].title +"</li>");
     });   
     

    //showing results here
        
    }    

    
    // controllers
    $("#addButton").click(function (){
        var inputBoxValue = $('#searchMovies').val(); 
        searchMovies(inputBoxValue); 
        });
   
});
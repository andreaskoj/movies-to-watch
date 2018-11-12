$(document).ready(function (){
/*
tasks
1. read more about sessions 
2. design results from searching
3. design dispying results 
4. style elements
5. handle errors  
6. Enter runs searching
---------------------------------
display movies from webstorage -> add movie -> save in ws -> update list
*/
        
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
        
        var titleItem, posterItem, yearItem, descriptionItem;
        titleItem = responseObj.results[0].title;
        posterItem = "http://image.tmdb.org/t/p/w92/"+responseObj.results[0].poster_path;
        yearItem = responseObj.results[0].release_date;
        descriptionItem = responseObj.results[0].overview;
        
        $(".items-list-result").append("<li class='liElement'><img class='poster' src=" +posterItem+"><div class='titleItem'>"+ titleItem +"</div><div class='yearItem'>" +yearItem+"</div><div>"+descriptionItem+"</div><img src=/assets/baseline-add-24px.svg></li>");
        $(".items-list-result").append("<li>"+ responseObj.results[1].title +"</li>");
        $(".items-list-result").append("<li>"+ responseObj.results[2].title +"</li>");
        console.log(responseObj.results[2]);
     });   
    //showing results here
    }    
    // controllers
     $("#addButton").on("click" , function (){
        var inputBoxValue = $('#searchMovies').val(); 
        searchMovies(inputBoxValue); 
        });
});
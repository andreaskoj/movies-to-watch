$(document).ready(function (){
    
    //Variables 
    var typingInterval = 800;
    var timeoutRef;    
        
    function searchMovies(querry) {
        var url ="https://api.themoviedb.org/3/search/movie?include_adult=true&page=1&query=" + querry + "&language=en-US&api_key=3bfda1c9ae9408dc2473f92708ca7cc3" 

        $.get(url, function(responseObj){

            $("#dropdown").show();

            createResponse(responseObj.results[0]);
            createResponse(responseObj.results[1]);
            createResponse(responseObj.results[2]);
        })
    } 
    
    // create a li element and append it to results     
    function createResponse(movieObject){
        var title = movieObject.title;
        var poster = "http://image.tmdb.org/t/p/w92/" + movieObject.poster_path;
        var year = movieObject.release_date;
        year = year.slice(0,4);
        var desciption = movieObject.overview; 
        
        $("#dropdown").append("<li class='dropdown-elem'><img class='posterSearch' src=" +poster+"><div class='desBlock'><div class='titleSearch'>"+ title +"</div><div class='yearSearch'>" + year +"</div><div class='descriptionSearch'>"+desciption+"</div></div>");        
    }
    
    // event handlers 
    $("#addButton").on("click" , function (){
        searchMovies($('#searchMoviesInput').val()); 
    });
    
    $("#searchMoviesInput").on('keyup', function(){
        clearTimeout(timeoutRef);
        
            if($("#searchMoviesInput").val()) {
                timeoutRef = setTimeout(() => searchMovies($('#searchMoviesInput').val()), typingInterval);
            }
    })

    $("#searchMoviesInput").focusout(() => {        
//        $("#dropdown").hide();
//        $("#searchMoviesInput").val('');
//        $("#dropdown").empty();
        
    });    
});
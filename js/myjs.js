$(document).ready(function (){
        
    //Variables
    const SEARCH_RESULTS = 3
    
    var typingInterval = 800;
    var timeoutRef;
    
    // sets number of movies found in local storage
    var moviesInLocalStorage = loadLocalStorage();
    
    // debugging 
//    console.log("INIT: MOVIES IN LOCAL STORAGE -> " + moviesInLocalStorage);
    
    //Propagate from webstorage 
            
    function searchMovies(querry) {
        var url ="https://api.themoviedb.org/3/search/movie?include_adult=true&page=1&query=" + querry + "&language=en-US&api_key=3bfda1c9ae9408dc2473f92708ca7cc3" 

        $.get(url, function(responseObj){

            $("#dropdown").show();
            
            // display search results 
            for(i=0; i<SEARCH_RESULTS; ++i){
                createResponse(responseObj.results[i]);        
            }
        });
    } 
    
    // create a li element and append it to results     
    function createResponse(movieObject){   
        var title = movieObject.title;
        var poster = "http://image.tmdb.org/t/p/w92/" + movieObject.poster_path;
        var year = movieObject.release_date.slice(0,4);
        var desciption = movieObject.overview; 
        
        $("#dropdown").append("<li class='dropdown-elem'><img class='posterSearch' src=" +poster+"><div class='desBlock'><div class='titleSearch'>"+ title +"</div><div class='yearSearch'>" + year +"</div><div class='descriptionSearch'>"+desciption+"</div></div>");        
    }
    
    function loadLocalStorage(){
        
        var foundFlag = true;
        var movieCounter = 0;
        
        do {
            var item = localStorage.getItem("m" + movieCounter)
            if(item === null) {
                foundFlag = false;
            }
            else {
                appendMovieJSON(JSON.parse(item));
                movieCounter++;
            }
            
        } while(foundFlag);
        
        return movieCounter;
    } 
    
    function saveLocalStorage(movie){
        localStorage.setItem('m'+moviesInLocalStorage , JSON.stringify(movie)); 
        moviesInLocalStorage++;
    }
    
    function appendMovieJSON(movieJSON){
        var htmlConstruction = "<li class='dropdown-elem'><img class='posterSearch' src=" +movieJSON.posterURL+"><div class='desBlock'><div class='titleSearch'>"+ movieJSON.title +"</div><div class='yearSearch'>" + movieJSON.year +"</div><div class='descriptionSearch'>"+movieJSON.description+"</div></div>";
        
        $(".my-movies").append(htmlConstruction);
        $("#dropdown").hide();
        $("#searchMoviesInput").val('');
        $("#dropdown").empty(); 
    }
    
/*----------- EVENTS -----------*/     
    
    // click event - when movie from dropdown is clicked 
    $("#dropdown").on("click" , "li",  function (){

        // create movie object
        var movie = {
            posterURL : $(this).find(".posterSearch")[0].currentSrc,
            title : $(this).find(".titleSearch")[0].innerHTML,
            year : $(this).find(".yearSearch")[0].innerHTML,
            description : $(this).find(".descriptionSearch")[0].innerHTML                
        };
        
        //save object 
        saveLocalStorage(movie);
        
        //append to movies list
        appendMovieJSON(movie);
          
    });
    
    $("#searchMoviesInput").on('keyup', function(){
        clearTimeout(timeoutRef);
        
            if($("#searchMoviesInput").val()) {
                timeoutRef = setTimeout(() => searchMovies($('#searchMoviesInput').val()), typingInterval);
            }
    })

});

$(document).ready(function(){
    console.log("Page Ready");

    //=================================
   



    //===================================
       
    $("#subSearch").click(function(event){
    
    event.preventDefault();

    var selectChoice = $("#ent").val();

   if(selectChoice == "1"){
    
    weatherForcast();
    $("#ent").css("border", "");
    
   }
   else if(selectChoice == "2"){
    $("#error").hide();
    moviesSearch();
    $("#ent").css("border", "");
   }
   else{
       $("#ent").css("border", "1px solid red");
       $("#error").hide();
   }
    
    
    function moviesSearch(){
      
    var search = $("#searchMovie").val();
    
    console.log("search: " +search);
    
    var queryURL = "https://www.omdbapi.com/?&apikey=trilogy &t=" +search +"&y=&plot=short";
    $.ajax({url:queryURL,method:"GET"}).then(function(response){
    
    console.log(response);
    
    var tBody = $("tbody");
    var tRow = $("<tr>");
    
    
    var titleTd = $("<td>").text(response.Title);
    console.log(titleTd);
    
    var yearTd = $("<td>").text(response.Year);
    console.log(yearTd);
    
    var actorsTd = $("<td>").text(response.Actors);
    console.log(actorsTd);
    
    tRow.append(titleTd,yearTd,actorsTd);
    tBody.append(tRow);
    
    
    
    //$("#display").append("<img src=" +gifs[i].images.original.url+"></img>");
    
    });

    }

    function weatherForcast(){

        $("#error").text("Weather Forcast Coming Soon...!");

        
        
    }
        
    });

    
    });

$(document).ready(function(){
    console.log("Page Ready");
       
    $("#subMovie").click(function(event){
    
    event.preventDefault();
    console.log("Form submitted")
    
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
    
    
    });
    
    });
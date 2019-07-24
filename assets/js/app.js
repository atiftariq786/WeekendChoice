
$(document).ready(function(){
    console.log("Page Ready");

    //=================================

    $('select').on('change', function() {
        if(this.value=="3"){
        $("#error").hide();
            $("#table1").hide();
            $("#searchMovie").hide();
            $("#subSearch").hide();
          
           window.location.href = "pages/nyt.html";
        }
      });
     



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
    
    //===========Movies Search============================
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
    //===========NewYork Time News Search=================

    
// User on search
$("#searchNyt").click(function(event){

    event.preventDefault();

    var nytSearch = $("#inpSearch").val().trim();    
    var retRecords = parseInt($("#retRecords").val());
    var startYear = parseInt($("#startYear").val().trim()); 
    var endYear = parseInt($("#endYear").val().trim());   
    
    // Query setup and ajax call to NYT api
    var apiKey = "api-key=3NYM77KW72ndmEaRDzr2cjaOcabhAIRW";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&q="+ nytSearch +"&begin_date="+ startYear +"0101&end_date="+endYear+"0101&"+apiKey;

    $.ajax({
    url : queryURL,
    method : "GET"
    }).then(function(response){

    console.log(response); 
    console.log(response.response);        

    // Retrieve record from api as user input limit
    for(var i =0; i<retRecords;i++){    
    
    var resRetrieve = response.response.docs;   
    var resHeadline = resRetrieve[i].headline.main;
      
    //Retrieve response sending to html   
    $("#result").append("<strong><ul></ul>"+resHeadline+"</strong><ul>");
    
    var resByline = resRetrieve[i].byline.original;
    $("#result").append("<ul>"+resByline+"</strong><ul>");
       
    var resPubDate = resRetrieve[i].pub_date;
    $("#result").append("<ul>Section: "+resPubDate+"</strong><ul>")

    var resWebUrl = resRetrieve[i].web_url;
    $("#result").append("<ul><a href='"+resWebUrl+"'>"+resWebUrl+"</a></strong><ul>")

    $("#result").append("<hr>") 

    }//Retrieve records limit through itteration

    })//Ajax call to api

    })//on search
    // Clear all retrieve result--------
    $("#clearResult").click(function(){

        $("#result").empty();
        location.reload();
    })




    //===========Weather Forecast Search==================
    function weatherForcast(){

        $("#error").text("Weather Forcast Coming Soon...!");

        
        
    }  
        
    });// On user search

    
    
    });//document eady
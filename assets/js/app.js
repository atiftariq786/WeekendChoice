
$(document).ready(function(){
    console.log("Page Ready");
    //Default show and hide when document ready
        $("#goSection1").hide();
        $("#section1").hide();
        $("#section2").hide();
        $("#section3").hide();

    //====On event:page navigation===============
    $("#dashboard").click(function(){
        $("#section0").show();
        $("#section1").hide();
        $("#section2").hide();
        $("#section3").hide();        
    })
    $("#news").click(function(){
        $("#section0").hide();
        $("#section1").show();
        $("#section2").hide();
        $("#section3").hide();        
    })
    $("#gamesPage").click(function(){
        $("#section0").hide();
        $("#section1").hide();
        $("#section2").show();
        $("#section3").hide();        
    })
    $("#contactPage").click(function(){
        $("#section0").hide();
        $("#section1").hide();
        $("#section2").hide();
        $("#section3").show();        
    })

    //==================Drop Down List=====================
    $('select').on('change', function(event) {
        event.preventDefault();

        if(this.value=="3"){
            //Dashboard elements hide/show
            $("#error").hide();
            $("#table1").hide();
            $("#searchMovie").hide();
            $("#subSearch").hide();
            $("#goSection1").show();
            //Page section hide/show
            $("#section1").hide();
            $("#section2").hide();
            $("#section3").hide();            
       }        
    });
     
    //=============Dashboard Elements Settings===============
    $("#goSection1").click(function(){
            //Dashboard elements hide/show
            $("#goSection1").hide();
            $("#table1").show();
            $("#searchMovie").show();
            $("#subSearch").show();
            //Page section hide/show
            $("#section0").hide();
            $("#section1").show();
            $("#section2").hide();
            $("#section3").hide();       
    });
     
    //======Drop down selection and search result============       
    $("#subSearch").click(function(event){
        event.preventDefault();
        var selectChoice = $("#ent").val();
        //Drop down list selection-1
        if(selectChoice == "1"){    
            $("#error").text("Weather Forcast Coming Soon...!");
            $("#ent").css("border", "");
            $("#goSection1").hide();
            $("#table1").show();
            $("#searchMovie").show();
            $("#subSearch").show();
        }
        //Drop down list selection-2
        else if(selectChoice == "2"){
            $("#error").hide();
            moviesSearch();
            $("#ent").css("border", "");
            $("#goSection1").hide();   
        }   
        else{
            $("#ent").css("border", "2px solid red");
            $("#error").hide();  
            $("#goSection1").hide();     
        }
    
    //================Movies Search=========================
    function moviesSearch(){      
        var search = $("#searchMovie").val();    
        console.log("search: " +search);
    
        var queryURL = "https://www.omdbapi.com/?&apikey=trilogy &t=" +search +"&y=&plot=short";
        $.ajax({url:queryURL,
        method:"GET"
        }).then(function(response){

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
    });//ajax end

    }//function end
    
    //===========Weather Forecast Search==================
    function weatherForcast(){

        $("#error").text("Weather Forcast Coming Soon...!");       
        
    }  
        
    });// On user search

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
        
        $("#section1").show();
        

    })  
    
    });//document eady
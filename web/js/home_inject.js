/* global stTime, endTime, currentTime */
var eKey = 0;
var hometable = document.createElement('table');
hometable.id = "home_table";

//This function waits for the home_inject container to render on the screen before
//appending any text boxes
var observer = new MutationObserver(function (mutations, me) {
    var homediv = document.getElementById('home_inject');
    if (homediv) {
        homediv.appendChild(hometable);
        me.disconnect(); // stop observing
        return;
    }
});

const months = "JanFebMarAprMayJunJulAugSepOctNovDec";

// start observing
observer.observe(document, {
    childList: true,
    subtree: true
});

function APIresponse(jsonarray) {
    
    var responseDiv = document.createElement('div');
    
    responseDiv.classList.add('speech-bubble-response');
    
    for (var x = 0; x < 5; x++) {
        //jsonarray[x]
        /*{"name":"Glory Beer Bar \u0026 Kitchen",
        "rating":4.5,
        "url":"https://www.yelp.com/biz/glory-beer-bar-and-kitchen-philadelphia-3?adjust_creative\u003dXgcX8QniwDlOzgIfRXFT7w\u0026utm_campaign\u003dyelp_api_v3\u0026utm_medium\u003dapi_v3_business_search\u0026utm_source\u003dXgcX8QniwDlOzgIfRXFT7w",
        "imageURL":"https://s3-media3.fl.yelpcdn.com/bphoto/Sb5DACyE3moScBknxUmRBg/o.jpg",
        "categories":["Beer Bar","American (New)","Gastropubs"],
        "address":["126 Chestnut St, Philadelphia, PA 19106"],"
        distance":2438.725931717776,"lat":39.94815,"lon":-75.14337}, */

        var resultsTable = document.createElement('table');

        //Location Name
        var nameRow = document.createElement('tr');
        var nameTd = document.createElement('th');
        var name = document.createTextNode(jsonarray[x].name);

        nameTd.appendChild(name);
        nameRow.appendChild(nameTd);
        resultsTable.appendChild(nameRow);

        //Location Website
        var urlRow = document.createElement('tr');
        var urlTd = document.createElement('td');
        var url = document.createElement('a');
        url.setAttribute('href', jsonarray[x].url);
        url.setAttribute('target', "_blank");
        var urlText = document.createTextNode(jsonarray[x].name + " Website");

        url.appendChild(urlText);
        urlTd.appendChild(url);
        urlRow.appendChild(urlTd);
        resultsTable.appendChild(urlRow);

        //Location Image
        var imgRow = document.createElement('tr');
        var imgTd = document.createElement('td');
        var img = document.createElement('img');
        url.setAttribute('src', jsonarray[x].imageURL);
        
        imgTd.appendChild(img);
        imgRow.appendChild(imgTd);
        resultsTable.appendChild(imgRow);

        //Location Address
        var addressRow = document.createElement('tr');
        var addressTd = document.createElement('td');
        var address = document.createTextNode(jsonarray[x].address);

        addressTd.appendChild(address);
        addressRow.appendChild(addressTd);
        resultsTable.appendChild(addressRow);

        //Location Rating
        var ratingRow = document.createElement('tr');
        var ratingTd = document.createElement('td');
        var rating = document.createTextNode(jsonarray[x].rating);

        ratingTd.appendChild(rating);
        ratingRow.appendChild(ratingTd);
        resultsTable.appendChild(ratingRow);

        //add to returned div
        responseDiv.appendChild(resultsTable);
    }

    hometable.appendChild(responseDiv);
}

function buildResponse(assistantResponse) {
    var responserow = document.createElement('tr');
    var bufferTD = document.createElement('td');
    var responseHolder = document.createElement('td');

    var response = document.createElement('div');
    response.classList.add('speech-bubble-response');

    var replyText = document.createTextNode(assistantResponse);

    response.appendChild(replyText);

    responseHolder.appendChild(response);
    responserow.appendChild(bufferTD);
    responserow.appendChild(responseHolder);

    hometable.appendChild(responserow);
}


function buildQuery(userQuery) {
    var queryrow = document.createElement('tr');
    var bufferTD = document.createElement('td');
    var queryHolder = document.createElement('td');

    var query = document.createElement('div');
    query.classList.add('speech-bubble-query');

    var queryText = document.createTextNode(userQuery);

    query.appendChild(queryText);

    queryHolder.appendChild(query);
    queryrow.appendChild(queryHolder);
    queryrow.appendChild(bufferTD);

    hometable.appendChild(queryrow);
}

//Cycles through the phases of conversation and performs actions accordingly.
function convoCheck(response) {
    switch (convoPhase) {
        case 0:
            buildResponse("Welcome to Planner Assistant!");
            buildResponse("Please tell me the general location of your destination. (e.g. Philadelphia PA, zip code)");
            if (response != null){
                convoPhase +=1;
            }
            break;
        case 1:
            buildResponse("What would you like to do?");
            destination = response;
            if (response != null){
                convoPhase +=1;
            }
            console.log(destination);
            break;
        case 2:
            categoryString = response;
            console.log(categoryString);
            sendQuery(destination, categoryString); //sends Location and Event type
            buildResponse("Please pick an item from list below");
            break;
        case 3:
            if (response != null){
                convoPhase +=1;
            }
            eventType = response;
            console.log(eventType);
            setItem(eventType);
            console.log(pickedItem);
            buildResponse("Please provide a start time for the event. (e.g. April 15 12 pm)");
            break;
        case 4:
            eKey = setStartTime(response);
            if (eKey > 0) {
                badInput(eKey);
                break;
            }
            convoPhase +=1;
            buildResponse("Start Time is: \n"+stTime);
            buildResponse("Please specify the duration of the event in hours and minutes (e.g. 2 hour 30 min)");
            break;
        case 5:
            //buildResponse(endTime);
            eKey = setEndTime(response);
            if (eKey > 0) {
                badInput(eKey);
                break;
            }
            convoPhase +=1;
            buildResponse("End Time is: \n"+endTime);
            buildResponse("The event has been scheduled, thank you!");
            buildResponse("Would you like to schedule another event?");
            break;
        case 6:
            console.log(response);
            if(response == "yes"){
                console.log(response);
                convoPhase = 0;
            } else {
                console.log(response);
                convoPhase = 7;
            }
            break;
        case 7:
            buildResponse("Thank you for using Planner Assistant");
            break;
    }

}

function setStartTime(response) {
    console.log(currentTime); //test
    var parsed = response.split(" ");
    var yearT = currentTime.getFullYear();
    var monthT, dayT;
    var hourT = 0;
    var minT = 0;
    
    //handles months
    var monthIn = parsed[0].substring(0,3);
    if(months.includes(monthIn)){
        var monthT = months.indexOf(monthIn) / 3 ;
        //stTime.setMonth(monthT);
    } else {
        return 1;
    }
    //handles date
    if(parsed[1].includes("th")){
        parsed[1] = parsed[1].replace("th", "");
    }
    if(Number.isInteger(parseInt(parsed[1]))){
        dayT = parseInt(parsed[1]);
        //stTime.setDate(dayT);
    } else {
        return 2;
    }
    
    //handles hours and minutes
    console.log(parsed[2]); //test
    if (parsed[2].includes(":")){
        var tempH = parsed[2].split(":");
        console.log(tempH[0],tempH[1]); //test
        if(Number.isInteger(parseInt(tempH[0]))){
            hourT += parseInt(tempH[0]);
            if(Number.isInteger(parseInt(tempH[1]))){
                minT += parseInt(tempH[1]);
            } else {
                return 4;
            }
        } else {
            return 3;
        }
        //stTime.setHours(hourT, minT);
    } else {
        console.log(parsed[2]); //test
        if (Number.isInteger(parseInt(parsed[2]))){
            hourT += parseInt(parsed[2]);
        } else {
            return 3;
        }
        //stTime.setHours(hourT);
    }
    console.log(yearT, monthT, dayT, hourT, minT); //test
    stTime =  new Date(yearT, monthT, dayT, hourT, minT);
    endTime =  new Date(yearT, monthT, dayT, hourT, minT);
    console.log(stTime); //test
    return 0;
};

function setEndTime(response) {
    var parsed = response.split(" ");
    var hourT = stTime.getHours();
    var minT = stTime.getMinutes();
    console.log(endTime); //test
    
    if (response.includes("hour")) {
        hourT += parseInt(parsed[0]);
    } else {
        return 1;
    }
    if (response.includes("min")) {
        minT += parseInt(parsed[2]);
    } 
    
    if (hourT != stTime.getHours()){
        if (minT != stTime.getMinutes()){
            endTime.setHours(hourT, minT);
        } else {
            endTime.setHours(hourT);
        }
    }
    console.log(endTime); //test
    return 0;
};

function badInput(key) {
    switch (convoPhase){
        case 0:
            buildResponse("Sorry, lets try again");
            break;
        case 1:
            buildResponse("Sorry, location provided is wrong.");
            break;
        case 2:
            buildResponse("Sorry, I can't identify that type of event.");
            break;
        case 3:
            switch (key){
                case 1:
                    buildResponse("Sorry, please provide a valid start month");
                    break;
                case 2:
                    buildResponse("Sorry, please provide a valid start day");
                    break;
                case 3:
                    buildResponse("Sorry, please provide a valid start hour");
                    break;
                case 4:
                    buildResponse("Sorry, please provide a valid start minute");
                    break;
            }
            break;
        case 4:
            switch (key){
                case 1:
                    buildResponse("Sorry, please provide a valid hour");
                    break;
            }
            break;
        case 5:
            buildResponse("Sorry, I can't identify that type of event.");
            break;
        
    }
    //convoPhase -= 1;
}

function setItem(key){
    key -= 1;
    var data = JSON.parse(localStorage.getItem('jsonObj'));
    pickedItem = data[key].name;

}
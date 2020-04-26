/* global startTime, stTime */

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

var months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec";

// start observing
observer.observe(document, {
    childList: true,
    subtree: true
});

function APIresponse(jsonarray) {
    
    var responseDiv = document.createElement('div');

    for (var x = 0; x < jsonarray.length; x++) {
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
        var nameTd = document.createElement('td');
        var name = document.createTextNode(jsonarray[x].name);

        nameTd.appendChild(name);
        nameRow.appendChild(nameTd);
        resultsTable.appendChild(nameRow);

        //Location Website
        var urlRow = document.createElement('tr');
        var urlTd = document.createElement('td');
        var url = document.createElement('a');
        url.setAttribute('href', jsonarray[x].url);
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
            buildResponse("Please tell me the general location of your destination. (e.g. Philadelphia PA, zip code)");
            destination = response;
            break;
        case 1:
            buildResponse("What would you like to do?");
            categoryString = response;
            sendQuery(destination, categoryString); //sends Location and Event type
            break;
        case 2:
            buildResponse("Please provide a start time for the event. (e.g. April 15 12 pm)");
            break;
        case 3:
            buildResponse("Please specify the duration of the event in hours and minutes (e.g. 2 hour 30 min)");
            break;
        case 4:
            buildResponse(stTime);
            if (setEndTime(response) == -1) {
                convoPhase -= 1;
                buildResponse("Sorry, please provide a valid duration.");
                break;
            }
            buildResponse("The event has been scheduled, thank you!");
            buildResponse("Would you like to schedule another event?");
            convoPhase = 0;
            break;
        case 5:
            buildResponse("Thank you for using Planner Assistant");
            convoPhase = 0;
            break;
    }

}

function setStartTime(response) {
    var parsed = response.split(" ");
    var len = parsed.length;
    var monthT, dayT, hourT, minT;
    var monthInput
    //handles months
    if (response.includes("")) {
        if (response.includes("p.m.")) {
            minT += 12;
        }
        for (i = 1; i < len; i++) {
            if (parsed[i].includes("hour"))
                hourT += parsed[i - 1];
        }
    }

    //handles hours
    if (response.includes("hour")) {
        if (response.includes("p.m.")) {
            minT += 12;
        }
        for (i = 1; i < len; i++) {
            if (parsed[i].includes("hour"))
                hourT += parsed[i - 1];
        }
    }

    //handles minutes
    if (response.includes("min")) {
        for (i = 1; i < len; i++) {
            if (parsed[i].includes("min"))
                minT += parsed[i - 1];
        }
    }
    if (Number.isInteger(parseInt(hourT))) {
        if (Number.isInteger(parseInt(minT))) {
            stTime.setHours(parseInt(hourT), parseInt(minT));
        } else {
            stTime.setHours(parseInt(hourT));
        }
    } else {
        return -1;
    }
};

function setEndTime(response) {
    var parsed = response.split(" ");
    var len = parsed.length;
    var hourT;
    var minT;
    if (response.includes("hour")) {
        for (i = 1; i < len; i++) {
            if (parsed[i].includes("hour"))
                hourT = parsed[i - 1];
        }
    }

    if (response.includes("min")) {
        for (i = 1; i < len; i++) {
            if (parsed[i].includes("min"))
                minT = parsed[i - 1];
        }
    }
    if (Number.isInteger(parseInt(hourT))) {
        if (Number.isInteger(parseInt(minT))) {
            stTime.setHours(parseInt(hourT), parseInt(minT));
        } else {
            stTime.setHours(parseInt(hourT));
        }
    } else {
        return -1;
    }
};
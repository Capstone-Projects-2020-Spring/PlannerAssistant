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

function buildResponse(assistantResponse)
{
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


function buildQuery(userQuery)
{
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
function convoCheck(response)
{
    switch (convoPhase){
        case 0:
            buildResponse("Please tell me the general location of your destination. (e.g. Philadelphia PA, zip code)");
            destination = response;
            break;
        case 1:
            buildResponse("What would you like to do?");
            sendQuery(response); //sends Location and Event type
            break;
        case 2:
            buildResponse("Please provide a start time for the event. (e.g. April 15 12 pm)");
            break;
        case 3:
            buildResponse("Please specify the duration of the event in hours and minutes (e.g. 2 hour 30 min)");
            break;
        case 4:
            buildResponse(stTime);
            if(setEndTime(response) == -1){
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

function setStartTime(response)
{
    var parsed = response.split(" ");
    var len = parsed.length;
    var monthT, dayT, hourT, minT;
    var monthInput
    //handles months
    if(response.includes("")){
        if (response.includes("p.m.")){
            minT += 12;
        }
        for (i=1;i<len;i++){
            if (parsed[i].includes("hour"))
                hourT += parsed[i-1];
        }
    }
    
    //handles hours
    if(response.includes("hour")){
        if (response.includes("p.m.")){
            minT += 12;
        }
        for (i=1;i<len;i++){
            if (parsed[i].includes("hour"))
                hourT += parsed[i-1];
        }
    }
    
    //handles minutes
    if(response.includes("min")){
        for (i=1;i<len;i++){
            if (parsed[i].includes("min"))
                minT += parsed[i-1];
        }
    }
    if (Number.isInteger(parseInt(hourT))){
        if(Number.isInteger(parseInt(minT))){
            stTime.setHours(parseInt(hourT), parseInt(minT));
        } else {
            stTime.setHours(parseInt(hourT));
        }
    } else {
        return -1;
    }
};

function setEndTime(response)
{
    var parsed = response.split(" ");
    var len = parsed.length;
    var hourT;
    var minT;
    if(response.includes("hour")){
        for (i=1;i<len;i++){
            if (parsed[i].includes("hour"))
                hourT = parsed[i-1];
        }
    }
    
    if(response.includes("min")){
        for (i=1;i<len;i++){
            if (parsed[i].includes("min"))
                minT = parsed[i-1];
        }
    }
    if (Number.isInteger(parseInt(hourT))){
        if(Number.isInteger(parseInt(minT))){
            stTime.setHours(parseInt(hourT), parseInt(minT));
        } else {
            stTime.setHours(parseInt(hourT));
        }
    } else {
        return -1;
    }
};
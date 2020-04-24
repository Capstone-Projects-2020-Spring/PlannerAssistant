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

function convoCheck(phase)
{
    switch (phase){
        case 0:
            buildResponse("Please tell me the general location of your destination. (e.g. Philadelphia PA, zip code)");
            break;
        case 1:
            buildResponse("What would you like to do?");
            break;
        case 2:
            buildResponse("Please provide a start time for the event. (e.g. April 15 12 pm)");
            break;
        case 3:
            buildResponse("Please specify the duration of the event in hours.");
            break;
        case 4:
            buildResponse("The event has been scheduled, thank you!");
            convoPhase = 0;
            break;
    }
    
}


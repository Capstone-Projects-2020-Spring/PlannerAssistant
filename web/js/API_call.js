function sendQuery(destination, categoryString)
{
    //******* DUMMY URL THIS CODE WILL NOT WORK
    //awaiting legitimate GCP URL
    //var requestURL = "www.___.com/?query=" + query;
    var requestURL = "https://assignment04-274007.uk.r.appspot.com/query?"+
    "location=" + destination
    +"&categoryString=" + categoryString;

    //send API call of the user (query)
    var sendRequest = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    console.log("Before Open"+requestURL);
    try {
        sendRequest.open('GET', requestURL, true);
        console.log("Opened");
    } catch (e)
    {
        console.log(e);
    }

    console.log("Before On Load");
    sendRequest.onload = function () {
        console.log("On Load");

        if (sendRequest.status >= 200 && sendRequest.status < 400)
        {
            var backResponse = JSON.parse(this.response);
            localStorage.setItem('jsonObj', this.response);
            console.log(backResponse);
            APIresponse(backResponse);
            respondTag == true;
            convoPhase +=1;
            
        } else {
            respondTag == false;
            console.log("Request Error: API_call.js, SENDQUERY");
        }

    };
    sendRequest.send();
}

function outputResponse(response)
{
    buildResponse(response);
}
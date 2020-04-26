function sendQuery(query)
{
    //******* DUMMY URL THIS CODE WILL NOT WORK
    //awaiting legitimate GCP URL
    //var requestURL = "www.___.com/?query=" + query;
    var requestURL = "Planner-assistant-2020.appspot.com/?query=" + query;

    //send API call of the user (query)
    var sendRequest = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    console.log("Before Open");
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
            var backResponse = JSON.parse(this.response); //is it going to be in JSON?????????
            console.log(backResponse);
            
            respondTag == true;
            outputResponse(backResponse);
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
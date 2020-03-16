var homediv = document.getElementById('home_inject');
var hometable = document.createElement('table');

function buildResponse(assistantResponse)
{
  var responserow = document.createElement('tr');
  var bufferTD = document.createElement('td');
  var response = document.createElement('td');

  var replyText = document.createTextNode(assistantResponse);

  responserow.appendChild(bufferTD);
  responserow.appendChild(response);
  homediv.appendChild(responserow);
}

function buildQuery(userQuery)
{
  var queryrow = document.createElement('tr');
  var bufferTD = document.createElement('td');
  var query = document.createElement('td');

  var queryText = document.createTextNode(userQuery);

  queryrow.appendChild(bufferTD);
  queryrow.appendChild(query);
  homediv.appendChild(queryrow);
}

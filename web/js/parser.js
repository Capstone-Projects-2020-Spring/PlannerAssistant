/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var genRes = [ //general conversation responses
    "Hello, what would you like me to do?", 
    "Searching for ", //concat() with item that user wants searched
    "Here are a list of 5 items based on your search (numbered 1 to 5)", 
    "The Item will be scheduled with the following data: ", 
    "These are the items that was scheduled in this session: ", 
    "Thank you for using Planner Assistant."
];
    
var queRes = [ //question responses
    "Which item would you like scheduled?", 
    "Searching for ", //concat() with item that user wants searched
    "Here are a list of 5 items based on your search", //concat() with item that web scrapper retreived
    "What time would you like this to be scheduled?", 
    "I see that you have scheduled an item at night, would you like to schedule a meal before that?", 
];
function idtoSearch() {
      var keyWords = ["bar", "movie", "restaurant"];
      var inStr = document.getElementById("inText").value; //read the text of user's words
      var arr1 = inStr.split(" "); //break user's words into an array to be searched for keyword
      var reply1 = "Is it ";
      for (var i = 0; i < arr1.length; i++) { //finds if a keyword exists. 
      	if (arr1.includes(keyWords[i])){ 
        	var reply = reply1.concat(keyWords[i]);
      	}
      }
      if (reply == undefined) { //check if any keyWord is found
      	document.getElementById("myText").value  = "Sorry, I didn't catch that";
      } else { //checks if the item that the user wants searched is correct. 
	  	document.getElementById("myText").value  = reply;
      }
}

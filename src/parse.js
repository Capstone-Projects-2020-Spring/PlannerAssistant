//While user hasn't issued a confirmed voice command


//Checks to see if the function that parses the user's text functions correctly
//To test, pass in parameters; sentence, mealkeym itemNum
//sentence is a string the contains the one of the following items: Breakfast, lunch, dinner, Brunch, Supper, Dessert
//mealKey is the array that contains one of the items listed above
//itemNum is the number of the item in the mealKey (COUNT STARTING FROM 1), itemNum ensures we're choosing the keyword that
//  resides in the sentence
function testMealType(sentence, mealKey, itemNum){
  let desired = mealKey[itemNum - 1];
  let actual = obtainMealType(sentence, mealKey)
  if(desired == actual){
    console.log("Desired functionality as desired = " + desired + ", actual = " + actual);
  }
  else if(desired != actual){
    console.log("Undesired functionality as desired = " + desired + ", actual = " + actual);
  }
}

//Function that parses the user's text to locate the type of meal they are planning for
//Parameters: sentence - a text string that contains one of the follwing keywords (Breakfast, Lunch, Dinner, Brunch, Supper, Dessert) ,
//    mealKey - an array full of list type items (breakfast, lunch, dinner, etc)
//    note mealKey is already defined, but sentence can be created and passed in (must fit criteria above)
function MealType(sentence, mealKey){
  let truthTable = new Array(mealKey.length);
  //console.log(mealKey.length);
  for(let i = 0; i < mealKey.length; i++){
      let regExpress = new RegExp(mealKey[i]);
      truthTable[i] = regExpress.test(sentence);
  }
  console.log(truthTable);
  //console.log(truthTable[0]);

  //console.log("meal event is " + mealKey[1]);
  let mealType;
  for(let k = 0; k < truthTable.length; k++){
      if(truthTable[k] == true){
        mealType = mealKey[k];
      }
  }
  //console.log("meal type is " + mealType);
  return mealType;
}


//This function tests the correctness of the function that isolates an event specified by the user
//This function takes in 3 parameters: sentence - the input string that containd the keyword, miscEventKey - the defined
//  array of possible keyword choices, itemNum - the position of the keyword in the keyword array
function testEventType(sentence, miscEventKey, itemNum){

let desired = miscEventKey[itemNum - 1];
let actual = obtainEventType(sentence, miscEventKey);
if(desired == actual){
  console.log("Desired functionality as desired = " + desired + ", actual = " + actual);
}
else if(desired != actual){
  console.log("Undesired functionality as desired = " + desired + ", actual = " + actual);
}
else{
  console.log("Broken");
}
}

//This function parses a user string, finds the event the user is referring to, isolates it, and returns it
//Parameters: sentence - user string , miscEventKey - defined array of possible key word choices
function obtainEventType(sentence, miscEventKey){

let truthTable = new Array(miscEventKey.length);
let eventType;

for(let i = 0; i < miscEventKey.length; i++){
    let regExpr = new RegExp(miscEventKey[i]);
    truthTable[i] = regExpr.test(sentence);
    if(truthTable[i] == true){
        eventType = miscEventKey[i];
        break;
    }
}


return eventType;
}


function testObtainEventTime(sentence, timeKey, itemNum){
    let desired = "noon";
    let actual = obtainEventTime(sentence, timeKey);
    if(desired == actual){
        console.log("Desired functionality as desired = " + desired + ", actual = " + actual);
    }
    else if(desired != actual){
        console.log("Undesired functionality as desired = " + desired + ", actual = " + actual);
    }
    else{
        console.log("broken");
    }

}

function obtainEventTime(sentence, timeKey){
let eventTime;
//go through each item in time key array, use them with search to find an item that doesn't return -1
//const regExx = /am/g;
//const regExxx = new RegExp("am");
let regEx1 = new RegExp("noon");
if(regEx1.test(sentence) == true){
    eventTime = "noon";
}

let isThere = new Array(timeKey.length);
for(let i = 0; i < timeKey.length; i++){
    const regExxp = new RegExp(timeKey[i]);
    isThere[i] = sentence.search(regExxp);
}

let keyword;
for(let k = 0; k < timeKey.length;k++){
    if(isThere[k] != -1){
        keyword = timeKey[k];
    }
}

//console.log(amMove.search(regExx));

//Turn the sentence into an array
let text2Array = sentence.split(' ');
console.log(text2Array);
//find where in the array form sentence the time key item lies using test, build an array and fill it with bool vals
let table = new Array(text2Array.length);
for(let k = 0; k < text2Array.length; k++){
    //table[k] = regExxx.test(amMove);
    if(text2Array[k] == keyword){
      table[k] = true;
      eventTime = text2Array[k-1];
      break;
    }
    else{
      table[k] = false;
    }
}
console.log(table);
//grab the preceeding element
console.log(eventTime);



return eventTime;
}


//
//
function findIndex(arr){
  for(let i = 0; i < wurds.length; i++){
    if(wurds[i] == "at"){
      return i;
    }
  }
  return -1;
}

//a function to populate the event object
function Event(Dinner){
    this.dinner = dinner;

    //method to check if fields are full
    //checkFields()
    //I'm sorry I have not detected a time. What time would you like this event for
}

const mealKey = ["Breakfast", "Lunch", "Brunch", "Dinner", "Supper", "Dessert"];
const miscEventKey = ["Bar", "Bowl", "Restaurant", "Movie", "Coffee", "Skate", "Pizza", "Diner"];
let locationKey = ["at", "near", "around", "close"];
let timeKey = ["pm","am"];

let dinnerPlan = "Dinner at Olive Garden";
let lunchPlan = "Lunch near South Street";

let barMove = "Bar near somewhere around South Street";
let bowlingMove = "Hey is there anywhere to Bowl in Center City"
let skatingMove = "Hey uh I'm looking for somewhere to take my kids to Skate tonight. Anywhere to do that near"

let amMove = "I'd like to find a breakfast spot in Center City around 10 am"
let pmMove = "I'd like to go to the Movies around 9 pm"
let noonMove = "Hey I gotta go pick up my kid at noon is there an ice cream spot around Bryn Mawr"

//testMealType(dinnerPlan, mealKey, 4);
//testEventType(bowlingMove, miscEventKey, 2);
testObtainEventTime(noonMove, timeKey, 3)


const regE = new RegExp('at');
//console.log(dinnerPlan.match(regE));                        //use to match target words that often surround keywords
//console.log(dinnerPlan[dinnerPlan.search(regE) + 3]);         //grabs the word after at
















//NOTES:
//need to use exec to find pieces of words i.e foo to find football
//let wurds = dinnerPlan.split(' ');                        //converts our string into an array of words
//let index = findIndex(wurds);

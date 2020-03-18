//While user hasn't issued a confirmed voice command


//Checks to see if the function that parses the user's text functions correctly
//To test, pass in parameters; sentence, mealkeym itemNum
//sentence is a string the contains the one of the following items: Breakfast, lunch, dinner, Brunch, Supper, Dessert
//mealKey is the array that contains one of the items listed above
//itemNum is the number of the item in the mealKey (COUNT STARTING FROM 1), itemNum ensures we're choosing the keyword that
//  resides in the sentence
function checkMealType(sentence, mealKey, itemNum){
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
function obtainMealType(sentence, mealKey){
  //Code to find what meal a user is planning for (breakfast, lunch, dinner, etc)
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
let locationKey = ["at", "near", "around", "close"];
let timeKey = ["pm","am"];

let dinnerPlan = "Dinner at Olive Garden";
let lunchPlan = "Lunch near South Street";

checkMealType(dinnerPlan, mealKey, 4);


//test is case sensitive, but will return a bool indicating if the string is present.
//Try to check using array
/*
const reglExp = new RegExp("Lunch");
console.log(reglExp.test(lunchPlan));
*/

//Code to find what meal a user is planning for (breakfast, lunch, dinner, etc)
/*
let truthTable = new Array(mealKey.length);
//console.log(mealKey.length);
for(let i = 0; i < mealKey.length; i++){
    let regExpress = new RegExp(mealKey[i]);
    truthTable[i] = regExpress.test(lunchPlan);
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
console.log("meal type is " + mealType);
*/





const regE = new RegExp('at');
console.log(dinnerPlan.match(regE));                        //use to match target words that often surround keywords
console.log(dinnerPlan[dinnerPlan.search(regE) + 3]);         //grabs the word after at

let wurds = dinnerPlan.split(' ');                        //converts our string into an array of words
let index = findIndex(wurds);

console.log(wurds);


console.log("index is " , index);

let locatn = wurds[index + 1];

console.log(locatn);

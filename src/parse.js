//While user hasn't issued a confirmed voice command

function checkMealType(){

  return boolean;
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

const mealKey = ["Breakfast", "Lunch", "Brunch", "Dinner", "Supper"];
let locationKey = ["at", "near", "around", "close"];
let timeKey = ["pm","am"];

let dinnerPlan = "Dinner at Olive Garden";
let lunchPlan = "Lunch near South Street";


//test is case sensitive, but will return a bool indicating if the string is present.
//Try to check using array
/*
const reglExp = new RegExp("Lunch");
console.log(reglExp.test(lunchPlan));
*/

//Code to find what meal a user is planning for (breakfast, lunch, dinner, etc)
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




const regE = new RegExp('at');
console.log(dinnerPlan.match(regE));                        //use to match target words that often surround keywords
console.log(dinnerPlan[dinnerPlan.search(regE) + 3]);         //grabs the word after at

let wurds = dinnerPlan.split(' ');                        //converts our string into an array of words
let index = findIndex(wurds);

console.log(wurds);


console.log("index is " , index);

let locatn = wurds[index + 1];

console.log(locatn);

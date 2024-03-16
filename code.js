//Declares empty lists to stored each favororited drinks' info
var favSugarList = [];
var favTypeList = [];
var favCalorieList = [];
var favNameList = [];
//Declares varaibels that store the drinks name, calories, its type, and if it has sugar
//also stores the starting index value for the favorite lists
var sugar = false;
var type = "juice";
var calorie = 0;
var index = 0;
var drink = "";
//When the sugar dropdown menu is changed, the varaibel sugar will be set the the text of teh user's choice
//If the text is yes, sugar will be set to true, otherwise it will be set to false
onEvent("Sugardropdown", "change", function( ) {
  sugar = getText("Sugardropdown");
  if (sugar == "Yes"){
    sugar = true;
  }else{
    sugar = false;
  }
});
//When the type dropdown menu is changed, type will be set to the text of the user's choice
onEvent("typeDropdown", "change", function( ) {
  type = getText("typeDropdown");
});
//When the user inputs a number in calInput, calorie will be set to that number
onEvent("calInput", "input", function( ) {
  calorie = getNumber("calInput");
});
//When the "Generate Drink!" button is clicked, the filter function is called
//The name of the generated drink is also displayed as the title of the screen
onEvent("ranGenButton", "click", function( ) {
  filter();
  setText("title2", drink);
});
//When the "Drinks!" button is clicked, the screen will change to teh customize drinks screen
onEvent("drinkButton", "click", function( ) {
  setScreen("CustomizeScreen");
});
//When the "favButton" button is clicked the current value of the type, sugar, drink, and calorie variables will be stored
//Each to their respective favorite lists
//A brief sound will also play to alert the user their input has been received
onEvent("favButton", "click", function( ) {
  playSound("assets/category_alerts/airy_bell_notification.mp3");
  appendItem(favNameList, drink);
  appendItem(favSugarList, sugar);
  appendItem(favCalorieList, calorie);
  appendItem(favTypeList, type);
});
//The function updateScreen will be called when the "favoritesButton" button is clicked
onEvent("favoritesButton", "click", function( ) {
  updateScreen();
});
//When the home icon is clicked, the screen will change back into the homescreen
onEvent("homeFav", "click", function( ) {
  setScreen("homeScreen");
});
//The same output will be returned for this home icon
onEvent("homeCustButton", "click", function( ) {
  setScreen("homeScreen");
});
//The right arrow button will shift index 1 to the right and display the next item on each favorite list
//As long as the index is shorter than or equal to the length of the favNameList
//the function update Screen is then called
onEvent("rightButton", "click", function( ) {
  if (index<=favNameList.length){
    index = index+1;
//If the index is equal to the length of the favNameList, index will be reset to 0
    if (index == favNameList.length){
      index = 0;
    }
  }
  updateScreen();
});
//The left arrow button will shift index 1 to the left and display the previous item on each favorite list
//As long as the index is >0
//the function update Screen is then called
onEvent("leftButton", "click", function( ) {
  if (index > 0){
    index = index -1;
  }
  updateScreen();
});
//The function filter takes the current values of type, sugar, and calorie, then returns a string value for drink
function filter(){
  if (sugar == true&&type == "Juice" && calorie >=100){
    drink = "Pineapple and Mango Juice";
  }else if (sugar == true&&type == "Juice" && calorie <100){
    drink = "Apple Juice";
  } else if (sugar == false&&type == "Juice"){
    drink = "There is no drink that matches your needs";
  }
  
  if (sugar == true&&type == "Soda" && calorie >=100){
    drink = "Zero Sugar Pepsi";
  }else if (sugar == true&&type == "Soda" && calorie <100){
    drink = "Zero Sugar Melon Soda";
  }else if (sugar == false&&type == "Soda" && calorie >=100){
    drink = "Coca Cola";
  }else if (sugar == false&&type == "Soda" && calorie <100){
    drink = "Passionfruit Soda";
  }
  
  if (sugar == true&&type == "Tea" && calorie >=100){
    drink = "There is no drink that matches your needs";
  } else if (sugar == true&&type == "Tea" && calorie <100){
    drink = "Unsweetened Green Tea";
  }else if (sugar == false&&type == "Tea" && calorie >=100){
    drink = "Sweetened Lemon Tea";
  }else if (sugar == false&&type == "Tea" && calorie <100){
    drink = "Sweetened Green Tea";
  }
}
//The function updateScreen only allows the screen to display the favorites screen if the list favNameList is >0
//It then displays the item of each favorite list at the value [index]
//Except the index label, which is set to index+1 to show which item the user is currently viewing (1st, 2nd, etc.)
function updateScreen(){
  if (favNameList.length>0){
    setScreen("favoritesScreen");
  }
  setProperty("drinkNameLabel", "text", favNameList[index]);
  setProperty("calFavLabel", "text", "Calories: " + favCalorieList[index]);
  setProperty("sugarFavLabel", "text", "Sugar Free?: " + favSugarList[index]);
  setProperty("typefavLabel", "text", "Type: " + favTypeList[index]);
  setProperty("index", "text", index+1);
}

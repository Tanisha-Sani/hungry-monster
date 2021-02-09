// Random Food For At The beginning Function
let foodList = document.getElementsByClassName("meal-items-chart");
for (let i = 0; i < foodList.length; i++) {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            let { meals } = data;
            let [mealList] = meals;
            let { idMeal, strMeal, strMealThumb } = mealList;

            // Food Image
            let foodImage = document.querySelectorAll('.food-image img');
            foodImage[i].src = strMealThumb;

            // Food Name 
            let foodNameList = document.querySelectorAll("#singleFoodName");
            foodNameList[i].innerText = strMeal;


            // Adding idMeal in Class
            foodImage[i].classList.add(idMeal);
            foodNameList[i].classList.add(idMeal);
        })
}


// Clicked And Show Food Ingredient Function
let ingredient = (event) => {
    let eventFood = this.event.target;
    let foodId = eventFood.attributes[1].value;
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + foodId)
        .then(res => res.json())
        .then(data => {
            let { meals } = data;
            let [mealList] = meals;
            let { strMeal, strMealThumb, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7 } = mealList;

            document.getElementById("foodItemsId").style.display = "none";
            document.getElementById("ingredientCart").style.display = "block";
            document.getElementById("ingredientImage").src = strMealThumb;
            document.getElementById("foodIngredientTitle").innerText = strMeal;

            let icon = `
             <i class="fas fa-check-square food-icon"></i>
             `;

            document.getElementById("strIngredient1").innerHTML = icon + strIngredient1;
            document.getElementById("strIngredient2").innerHTML = icon + strIngredient2;
            document.getElementById("strIngredient3").innerHTML = icon + strIngredient3;
            document.getElementById("strIngredient4").innerHTML = icon + strIngredient4;
            document.getElementById("strIngredient5").innerHTML = icon + strIngredient5;
            document.getElementById("strIngredient6").innerHTML = icon + strIngredient6;
            document.getElementById("strIngredient7").innerHTML = icon + strIngredient7;

            
            document.getElementById("foodSearchContent").style.display = "none";
        })
}


// starting foodSearchFunction 
const foodSearchfunction = () => {
    let foodInput = document.getElementById("foodInput").value;
    if (foodInput.length == 0) {
        alert("Please Write Meal Name in SearchBox Before Searching")
    }
    else{
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + foodInput)
        .then(res => res.json())
        .then(data => {
            let { meals } = data;
            let [mealList] = meals;
            let { idMeal, strMeal, strMealThumb } = mealList;
         
            searchFoodUpdate(0, idMeal, strMeal, strMealThumb);
            document.querySelector(".decorated-meal-chart").style.gridTemplateRows = "repeat(3,250px)";
            document.querySelector(".first-food-item").style.display = "block";
        })
        .catch(() => {
            alert("Please Search Valid Meal Name");
            document.getElementById("foodInput").value = "";
        })

    let firstLetter = foodInput.substr(0, 1);
    let secondLetter = foodInput.substr(1, 1);
    let thirdLetter = foodInput.substr(2, 1);
    let fourthLetter = foodInput.substr(3, 1);

    searchFoodLetter(1, 2, firstLetter);
    searchFoodLetter(3, 4, secondLetter);

  
    for (let i = 5; i < foodList.length; i++) {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(data => {
                let { meals } = data;
                let [mealList] = meals;
                let { idMeal, strMeal, strMealThumb } = mealList;
                searchFoodUpdate(i, idMeal, strMeal, strMealThumb);
            }
            )
    }
}
}


let searchFoodLetter = (num1, num2 = 7, letter) => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=' + letter)
        .then(res => res.json())
        .then(data => {
            let { meals } = data;
            let [mealList1, mealList2] = meals;
            searchFoodUpdate(num1, mealList1.idMeal, mealList1.strMeal, mealList1.strMealThumb);
            searchFoodUpdate(num2, mealList2.idMeal, mealList2.strMeal, mealList2.strMealThumb);
        })
}



let searchFoodUpdate = (i, idMeal, strMeal, strMealThumb) => {

    let foodImage = document.querySelectorAll('.food-image img');
    foodImage[i].src = strMealThumb;
    let foodNameList = document.querySelectorAll("#singleFoodName");
    foodNameList[i].innerText = strMeal;

    let deleteFoodId = foodImage[i].attributes[1].value;

    foodImage[i].classList.remove(deleteFoodId);
    foodNameList[i].classList.remove(deleteFoodId);
    foodImage[i].classList.add(idMeal);
    foodNameList[i].classList.add(idMeal);
}



let closeIngredientFunction = () => {
    document.getElementById("ingredientCart").style.display = "none";
    document.getElementById("foodItemsId").style.display = "grid";
    document.getElementById("foodSearchContent").style.display = "block";
}



let closeResultMealFunction = () => {
    document.querySelector(".first-food-item").style.display = "none";
    document.querySelector(".decorated-meal-chart").style.gridTemplateRows = "repeat(2,250px)";
}
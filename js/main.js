//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('.cktlName button').addEventListener('click', getDrink);
document.querySelector('.cktlIngred .select-ingred').addEventListener('change', getIngredientList);
preLoadIngredients();

function preLoadIngredients() {
    ingListURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    const ingDropdown = document.querySelector('.cktlIngred .select-ingred');

    fetch(ingListURL)
      .then(res => res.json())
      .then(data => {
        const listOfIngredients = data.drinks;

        for(ingred of listOfIngredients) {
          const option = document.createElement('option');

          option.value = ingred.strIngredient1;
          option.textContent = ingred.strIngredient1;
          ingDropdown.appendChild(option);
        }
      })
}

function getDrink() {
  resetScreens();
  let drink = document.querySelector('.choices .cktlName input').value

  let url = new URL('/api/json/v1/1/search.php','https://www.thecocktaildb.com');

  url.searchParams.append('s', drink);

  runDrinkFetch(url);
}

function runDrinkFetch(url) {
  console.log(url.toString());

  fetch(url.toString())
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.querySelector('.cktlName h2').innerText = data.drinks[0].strDrink;
      document.querySelector('.cktlName img').src = data.drinks[0].strDrinkThumb;
      document.querySelector('.cktlName h3').innerText = data.drinks[0].strInstructions;})
    .catch(err => console.log(`Failed to fetch ${err}`));
}

function getIngredientList() {
  resetScreens();
  const getIngredient = document.querySelector('.cktlIngred .select-ingred').value

  let url = new URL('/api/json/v1/1/filter.php','https://www.thecocktaildb.com');
  url.searchParams.append('i',getIngredient);

  runIngredientFetch(url);
}

function runIngredientFetch(url) {
  const ingredients = document.querySelector('.cktlIngred')
  fetch(url.toString())
    .then(res => res.json())
    .then(data => {
      const drinksArr = data.drinks;
      let ul = document.createElement('ul');

      for(drink of drinksArr) {
          let listItem = document.createElement('li');
          listItem.innerText = drink.strDrink;

          ul.appendChild(listItem);
          console.log(drink.strDrink);
      }

      ingredients.appendChild(ul);
    })
    .catch(err => console.log(`Failed to fetch ${err}`));
}

//Removes anything that was last ran to make room for the next selectable.
function resetScreens() {
  let cktlNamex2 = document.querySelector('.cktlName h2');
  let cktlNameImg = document.querySelector('.cktlName img');
  let cktlNameInstruct = document.querySelector('.cktlName h3');

  let cktlIngredList = document.querySelector('.cktlIngred ul');

  cktlNamex2.innerText = "Name";
  cktlNameImg.src = "";
  cktlNameInstruct.innerText = "Instructions";

  if (cktlIngredList != null) {
    document.querySelector('.cktlIngred').removeChild(cktlIngredList);
  }
}

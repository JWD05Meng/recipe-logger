import './App.css'
import CardDisplay from './CardDisplay'
import CreateRecipe from './CreateRecipe'
import { randInt, randElem, counter } from './utils'
import { useState, useEffect } from 'react'

export class Recipe {
  constructor(title, ingredients, id=counter()) {
    this.title = title;
    this.ingredients = ingredients;
    this.id = id;
  }
}

class Ingredient {
  constructor(name, quantity=1, unit='') {
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
  }
}

const randomIngredient = () => {
  const foods = ['Carrots', 'Tomatoes', 'Peppers', 'Bok choy', 'Onions', 'Mushrooms', 'Cabbage', 'Chicken', 'Pork', 'Beef'];
  return new Ingredient(randElem(foods), randInt(80, 10) * 10, 'g');
}

const randomRecipe = () => {
  const methods = ['Boiled', 'Baked', 'Grilled', 'Steamed'];
  const ingredient1 = randomIngredient();
  const ingredient2 = randomIngredient();
  const additionalIngredients = [];

  let additions = randInt(8, 2);
  while (additions-- > 0) additionalIngredients.push(randomIngredient());

  const title = `${randElem(methods)} ${ingredient1.name} with ${randElem(methods)} ${ingredient2.name}`;
  return new Recipe(title, [ingredient1, ingredient2, ...additionalIngredients]);
}


function App() {
  const loadedRecipes = JSON.parse(window.localStorage.getItem('stored recipes'));
  const [recipes, setRecipes] = useState(loadedRecipes || []);

  useEffect(() => {
    window.localStorage.setItem('stored recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    // generate random recipes
    // for (let i=0; i<5; i++) setRecipes(prev => [...prev, randomRecipe()]);

  }, []);

  const [creating, setCreating] = useState(false);

  useEffect(() => setCreating(false), [recipes]);

  const createRecipe = (newRecipe) => {
    console.log(`adding recipe:`);
    console.table(newRecipe);
    setRecipes(prev => [...prev, newRecipe]);
  }

  const deleteRecipe = (id) => {
    console.table(recipes);
    console.log(`attempting to delete recipe: ${id}`);
    setRecipes(prev => recipes.filter(recipe => recipe.id !== id));
  }

  const updateRecipe = (id, updatedRecipe) => {
    console.log(`attempting to update recipe: ${id}`);
    setRecipes(prev => {
      const index = prev.findIndex(recipe => recipe.id === id);
      prev.splice(index, 1, updatedRecipe);
      return prev;
    });
  }

  const cancelCreate = () => {
    setCreating(false);
  }
  
  return (
    <div className="App" onDoubleClick={() => setCreating(true)}>
      <CardDisplay recipes={recipes} updateRecipe={updateRecipe} deleteRecipe={deleteRecipe} />
      {creating && <CreateRecipe createRecipe={createRecipe} cancelCreate={cancelCreate} />}
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import Ingredient from './Ingredient'
import './RecipeCard.css'
import { counter } from './utils'
import { Recipe } from './App'

function RecipeCard(props) {
  const [selected, setSelected] = useState(props.creating || false);
  const [editing, setEditing] = useState(props.creating || false);
  const [ingredients, setIngredients] = useState(props.ingredients.map(ing => { return { ...ing, id: counter() } }));

  const toggleSelected = evt => {
    evt.stopPropagation();
    !editing && setSelected(prev => !prev);
  };

  const toggleEditing = evt => setEditing(prev => !prev);

  const doneHandler = () => {
    const ingredientDivs = document.querySelectorAll('.ingredient-edit');
    const ingredients = [...ingredientDivs].map(div => {
      return {
        name: div.querySelector('input[name="name"]').value,
        quantity: div.querySelector('input[name="quantity"]').value,
        unit: div.querySelector('input[name="unit"]').value,
        id: counter()
      }
    });
    console.table(ingredients);
    toggleEditing();
    setIngredients(ingredients);

    const recipe = new Recipe(props.title, ingredients, props.id);

    if (props.creating)
      props.createRecipe(recipe);
    else
      props.updateRecipe(props.id, recipe);
  }

  const removeIngredient = (id) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  }

  const addIngredient = () => {
    const newIngredient = {
      id: counter(), name: '', quantity: '', unit: ''
    };
    setIngredients(prev => [...prev, newIngredient]);
  }

  const buttonsDisplay = () => {
    if (selected) {
      return (
        <div className='buttons-div'>
          {!editing && (
            <button className='button delete-button' onClick={() => props.deleteRecipe(props.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
          )}
          {!editing && <button className='button' onClick={toggleEditing}>Edit</button>}
          {!editing && <button className='button' onClick={toggleSelected}>Close</button>}
          {editing && <button className='button' onClick={addIngredient}>Add Ingredient</button>}
          {editing && <button className='button' onClick={doneHandler}>Done</button>}
        </div>
      )
    }
  }

  return (
    <div className={`recipe-card-backdrop ${selected ? 'selected' : ''}`}>
      <div className={`recipe-card ${selected ? 'selected' : ''}`} onDoubleClick={toggleSelected}>
        <div className='title'>
          {props.title}
        </div>
        {ingredients.map(item => <Ingredient
          ingredient={item}
          key={item.id}
          recipeSelected={selected}
          isEditing={editing}
          removeIngredient={removeIngredient}
        />)}
        {buttonsDisplay()}
      </div>
    </div>
  )
}

export default RecipeCard

import React, { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import { Recipe } from './App'
import './RecipeCard.css'

function CreateRecipe(props) {
  const [recipe, setRecipe] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!name) {
      document.querySelector('input').focus();
    }
  }, []);

  const keyHandler = evt => {
    if (evt.key === 'Enter') {
      const rec = new Recipe(name, []);
      console.log(rec);
      setRecipe(rec);
    } 
    else if (evt.key === 'Escape') {
      props.cancelCreate();
    }
  }

  const changeHandler = evt => {
    setName(evt.target.value);
  }

  let display;

  if (recipe) {
    display = <RecipeCard
      title={recipe.title}
      ingredients={recipe.ingredients}
      id={recipe.id}
      createRecipe={props.createRecipe}
      creating={true}
    />
  } else {
    display = (
      <div className={'recipe-card-backdrop selected'}>
        <div className='recipe-card selected'>
          <input type='text' name='name' placeholder='Recipe Name' onChange={changeHandler} onKeyDown={keyHandler} />
        </div>
      </div>
    );
  }

  return display;

}

export default CreateRecipe

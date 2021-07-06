import React from 'react'
import RecipeCard from './RecipeCard'
import './CardDisplay.css'

function CardDisplay(props) {

  return (
    <div className='card-display'>
      {props.recipes.map(recipe => <RecipeCard
        title={recipe.title}
        ingredients={recipe.ingredients}
        key={recipe.id}
        id={recipe.id}
        updateRecipe={props.updateRecipe}
        deleteRecipe={props.deleteRecipe}
      />)}
    </div>
  )
}

export default CardDisplay

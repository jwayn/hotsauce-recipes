import React from 'react'

import Ingredient from './Ingredient';
import './IngredientsList.css'

export default function IngredientsList(props) {

    return (
        <div className="ingredientsList">
            {props.ingredients.map(ingredient => {
                return(
                    <Ingredient key={ingredient._id} ingredient={ingredient} />
                )
            })}
        </div>
    )
}

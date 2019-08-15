import React, { useState } from 'react'
import './IngredientsList.css'

export default function IngredientsList(props) {

    const [showDelete, setShowDelete] = useState(false);

    const deleteIngredient = async function(e, ingredientId) {
        e.preventDefault();
        await fetch(`/api/recipes/id=${props.recipeId}/ingredient/id=${ingredientId}`, {method: 'DELETE'});
        props.updateData();
    }

    return (
        <div className="ingredientsList">
            {props.ingredients.map(ingredient => {
                return(
                    <div key={ingredient._id} className="ingredientsList__item" onClick={() => setShowDelete(!showDelete)}>
                        <div className="ingredientsList__item__container">
                            <div>{ingredient.name}</div>
                            <div>{ingredient.weight}</div>
                        </div>
                        {showDelete && 
                            <div className="ingredientsList__item__delete" onClick={(e) => deleteIngredient(e, ingredient._id)}>
                                Delete
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}
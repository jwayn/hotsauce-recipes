import React, { useState } from 'react'

export default function Ingredient(props) {

    const [showDelete, setShowDelete] = useState(false);

    const deleteIngredient = async function(e, ingredientId) {
        e.preventDefault();
        await fetch(`/api/recipes/id=${props.recipeId}/ingredient/id=${ingredientId}`, {method: 'DELETE'});
        props.updateData();
    }
    
    return (
        <div key={props.ingredient._id} className="ingredientsList__item" onClick={() => setShowDelete(!showDelete)}>
            <div className="ingredientsList__item__container">
                <div>{props.ingredient.name}</div>
                <div>{props.ingredient.weight}</div>
            </div>
            {showDelete && 
                <div className="ingredientsList__item__delete" onClick={(e) => deleteIngredient(e, props.ingredient._id)}>
                    Delete
                </div>
            }
        </div>
    )
}

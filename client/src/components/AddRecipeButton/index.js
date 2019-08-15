import React from 'react'
import './AddRecipeButton.css';

export default function AddRecipeButton(props) {
    const addRecipe = async function() {
        await fetch('/api/recipes', {method: 'Post'});
        props.reloadRecipes();
    }

    return (
        <div className="addRecipeButton" onClick={addRecipe}>
            +
        </div>
    )
}

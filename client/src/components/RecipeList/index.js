import React from 'react';

import RecipeCard from '../RecipeCard';

function RecipeList(props) {

    return (
        <div className="recipeCardList">
            {props.recipes.map(recipe => {
                return <RecipeCard key={recipe._id} recipe={recipe} clickRecipe={props.clickRecipe} />
            })}
        </div>
    );
}

export default RecipeList;
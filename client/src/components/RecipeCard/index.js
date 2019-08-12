import React from 'react'
import moment from 'moment';

import './RecipeCard.css';

import SpiceLevel from '../SpiceLevel';
import Rating from '../Rating';

export default function RecipeCard(props) {

    const clickRecipe = function() {
        props.clickRecipe(props.recipe._id);
    }

    return (
        <div className="recipeCard" onClick={clickRecipe}>
            <div className="recipeCard__title">
                <span>
                    {props.recipe.name}
                </span>
                {moment(props.recipe.created).format('MM/YY/DD')}
            </div>
            <div className="recipeCard__body">
                <SpiceLevel spice={props.recipe.spice} />
                <Rating rating={props.recipe.rating} />
            </div> 
        </div>
    )
}

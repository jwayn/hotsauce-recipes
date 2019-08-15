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
                {moment(props.recipe.created).format('MM/DD/YYYY')}
            </div>
            <div className="recipeCard__body">
                <Rating rating={props.recipe.rating} />
                <SpiceLevel spice={props.recipe.spice} />
            </div> 
        </div>
    )
}

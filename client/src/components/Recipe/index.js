import React from 'react'
import moment from 'moment';

export default function Recipe(props) {
    console.log(props);
    const recipe = props.recipe[0];
    return (
        <div className="recipe">
            <header className="recipe__title">
                {recipe.name}
                {moment(recipe.created).format('DD/MM/YYYY')}
            </header>
            Recipe is active!
        </div>
    )
}

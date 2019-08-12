import React, { useState } from 'react'
import moment from 'moment';

import './Recipe.css';

import EditableName from './EditableName';
import EditableRating from './EditableRating';
import EditableSpice from './EditableSpice';
import IngredientsList from './IngredientsList';
import Notes from './Notes';

export default function Recipe(props) {

    const recipe = props.recipe[0];

    const [addIngredientActive, setAddIngredientActive] = useState(false);

    const ingredientInput = React.createRef();
    const weightInput = React.createRef();
    
    const deleteRecipe = async function(e) {
        e.preventDefault();
        await fetch(`/api/recipes/id=${recipe._id}`, {method: 'DELETE'});
        props.updateData();
        props.setActiveRecipe(null);
    };

    const addIngredient = async function(e) {
        e.preventDefault();
        await fetch(`/api/recipes/id=${recipe._id}`, {
            method: 'PATCH',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify([
                {
                    property: "ingredient",
                    value: ingredientInput.current.value
                },
                {
                    property: "weight",
                    value: weightInput.current.value
                }
            ])
        })

        ingredientInput.current.value = '';
        weightInput.current.value = '';
        props.updateData();
        setAddIngredientActive(false);
    }

    const deactivateAddIngredient = function(e) {
        e.preventDefault();
    }

    return (
        <div className="container--full">
            <div className="recipe">
                <header className="recipe__title">
                    <EditableName updateData={props.updateData} id={recipe._id} name={recipe.name} />
                    <span className="recipe__title__created">
                        {moment(recipe.created).format('DD/MM/YYYY')}
                    </span>
                </header>
                {!addIngredientActive &&
                    <main className="recipe__main">
                        <section>
                            <h3 className="sectionLabel">Rating</h3>
                            <EditableRating rating={recipe.rating} />
                        </section>

                        <section>
                            <h3 className="sectionLabel">Spice</h3>
                            <EditableSpice level={recipe.spice}/>
                        </section>

                        <section>
                            <h3 className="sectionLabel">Ingredients</h3>
                            <button onClick={() => setAddIngredientActive(true)}>add</button>
                            <IngredientsList ingredients={recipe.ingredients} />
                        </section>

                        <section>
                            <h3 className="sectionLabel">Notes</h3>
                            <Notes notes={recipe.notes} />
                        </section>

                        <button className="btn--delete" onClick={deleteRecipe}>Delete</button>
                    </main>
                }

                {addIngredientActive &&
                    <main>
                        <form className="recipe__ingredientAdd">
                            <label>Ingredient</label>
                            <input ref={ingredientInput}></input>
                            <label>Weight</label>
                            <input ref={weightInput}></input>
                            <button onClick={addIngredient}>Add</button>
                            <span onClick={deactivateAddIngredient}>>Cancel</span>
                        </form>
                    </main>
                }
            </div>
        </div>
    )
}

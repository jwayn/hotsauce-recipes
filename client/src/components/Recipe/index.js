import React, { useState } from 'react'
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';

import './Recipe.css';

import EditableName from './EditableName';
import IngredientsList from './IngredientsList';
import Notes from './Notes';

export default function Recipe(props) {

    const recipe = props.recipe[0];

    const [addIngredientActive, setAddIngredientActive] = useState(false);
    const [addNoteActive, setAddNoteActive] = useState(false);

    const ingredientInput = React.createRef();
    const weightInput = React.createRef();
    const notesInput = React.createRef();
    
    const deleteRecipe = async function(e) {
        e.preventDefault();
        await fetch(`/api/recipes/id=${recipe._id}`, {method: 'DELETE'});
        props.updateData();
        props.setActiveRecipe(null);
    };

    const addNote = async function(e) {
        e.preventDefault();

        let note = {note: notesInput.current.value};
        console.log(note);

        await fetch(`/api/recipes/id=${recipe._id}/notes`, {
            method: 'PATCH',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({note})
        });

        notesInput.current.value = '';
        props.updateData();
        setAddNoteActive(false);
    }

    const addIngredient = async function(e) {
        e.preventDefault();
        await fetch(`/api/recipes/id=${recipe._id}/ingredient`, {
            method: 'PATCH',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify([
                {
                    property: "name",
                    value: ingredientInput.current.value
                },
                {
                    property: "weight",
                    value: weightInput.current.value
                }
            ])
        });

        ingredientInput.current.value = '';
        weightInput.current.value = '';
        props.updateData();
        setAddIngredientActive(false);
    }

    const deactivateAddIngredient = function(e) {
        e.preventDefault();
        setAddIngredientActive(false);
    }

    const deactivateAddNote = function(e) {
        e.preventDefault();
        setAddNoteActive(false);
    }

    const handleRatingChange = async function(nextValue, prevValue, name) {
        await fetch(`/api/recipes/id=${recipe._id}`, {
            method: 'PATCH',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({rating: nextValue})
        });

        props.updateData();
    }

    const handleSpiceChange = async function(nextValue, prevValue, name) {
        await fetch(`/api/recipes/id=${recipe._id}`, {
            method: 'PATCH',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({spice: nextValue})
        });

        props.updateData();
    }

    return (
        <div className="container--full">
            <div className="recipe">
                <header className="recipe__title">
                    {!addNoteActive && !addIngredientActive && 
                        <span className="back-button" onClick={() => props.setActiveRecipe(null)}>➜</span>
                    }
                    <EditableName updateData={props.updateData} id={recipe._id} name={recipe.name} />
                    <span className="recipe__title__created">
                        {moment(recipe.created).format('MM/DD/YYYY')}
                    </span>
                </header>
                {!addIngredientActive && !addNoteActive &&
                    <main className="recipe__main">
                        <section>
                            <div className="container--padded">
                                <h3 className="sectionLabel">Rating</h3>
                                <div className="rating--interactive">
                                    <StarRatingComponent 
                                        name={'rating'}
                                        value={recipe.rating}
                                        starCount={5}
                                        starColor={'#E84241'}
                                        emptyStarColor={'#777777'}
                                        onStarClick={handleRatingChange}
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="container--padded">
                                <h3 className="sectionLabel">Spice</h3>
                                <div className="rating--interactive">
                                    <StarRatingComponent 
                                        name={'rating'}
                                        value={recipe.spice}
                                        starCount={5}
                                        starColor={'#E84241'}
                                        emptyStarColor={'#777777'}
                                        onStarClick={handleSpiceChange}
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="container--padded">
                                <h3 className="sectionLabel">Ingredients</h3>
                            </div>
                            <IngredientsList updateData={props.updateData} recipeId={recipe._id} ingredients={recipe.ingredients} />
                            <div className="container--padded">
                                <button onClick={() => setAddIngredientActive(true)}>add ingredient</button>
                            </div>
                        </section>

                        <section>
                            <div className="container--padded">
                                <h3 className="sectionLabel">Notes</h3>
                                <Notes updateData={props.updateData} recipeId={recipe._id} notes={recipe.notes} />
                                <button onClick={() => setAddNoteActive(true)}>add note</button>
                            </div>
                        </section>

                        <div className="container--padded">
                            <button className="btn--delete" onClick={deleteRecipe}>Delete Sauce</button>
                        </div>

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
                            <span onClick={deactivateAddIngredient}>Cancel</span>
                        </form>
                    </main>
                }

                {addNoteActive &&
                    <main>
                        <form className="recipe__ingredientAdd">
                            <label>Note</label>
                            <textarea ref={notesInput}></textarea>
                            <button onClick={addNote}>Add</button>
                            <span onClick={deactivateAddNote}>Cancel</span>
                        </form>
                    </main>
                }
            </div>
        </div>
    )
}

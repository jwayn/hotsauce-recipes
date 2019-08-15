import React, { useState } from 'react'

export default function Note(props) {

    const [showDelete, setShowDelete] = useState(false);

    const deleteNote = async function(id) {
        await fetch(`/api/recipes/id=${props.recipeId}/notes/id=${id}`, {method: 'DELETE'});
        props.updateData();
    }

    return (
        <li key={props.note._id} className="notes__item" onClick={() => setShowDelete(!showDelete)}>
            {props.note.note}
            {showDelete && 
                <button className="notes__item__delete" onClick={() => deleteNote(props.note._id)}>Delete</button>
            }
        </li>
    )
}

import React from 'react';

import Note from './Note';

import './Notes.css';

export default function Notes(props) {

    return (
        <div>
            <ul className="notes">
                {props.notes.map(note => {
                    return(
                        <Note updateData={props.updateData} recipeId={props.recipeId} key={note._id} note={note} />
                    )
                })}
            </ul>
        </div>
    )
}

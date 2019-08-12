import React, { useState } from 'react';

import './EditableName.css';

export default function EditableName(props) {
    
    const [editable, setEditable] = useState(false);
    const nameInput = React.createRef();

    const updateName = async function(event) {
        event.preventDefault();

        await fetch(`/api/recipes/id=${props.id}`,
            {
                method: 'PUT',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    "name": nameInput.current.value
                }),
            }
        );
        
        props.updateData();
        setEditable(false);
    }

    return (
        <div className="editableName">
            {!editable ? 
                (
                    <h1 className="title__name" onClick={() => setEditable(true)}>{props.name}</h1>
                )
                :
                (  
                    <form onSubmit={updateName}>
                        <input ref={nameInput} className="title__name--editable" defaultValue={props.name} />
                    </form>
                )
            }
        </div>
    )
}

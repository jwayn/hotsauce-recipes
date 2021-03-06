import React, { useState } from 'react'

import './EditableSpice.css';
export default function EditableSpice(props) {

    const [rating, setRating] = useState(props.spice);

    const flame = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="flame--editable">
                        <g>
                            <path fill="#E84241" d="M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23z"/>
                        </g>
                    </svg>);

    const flameSelected = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="flame--editable">
                            <g>
                                <path fill="#E84241" d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-.866-.23-1.697-.5-2.47-1.667 1.647-2.933 2.47-3.8 2.47 3.995-7 1.8-10-4.2-14 .5 5-2.796 7.274-4.138 8.537A7.5 7.5 0 0 0 12 23zm.71-17.765c3.241 2.75 3.257 4.887.753 9.274-.761 1.333.202 2.991 1.737 2.991.688 0 1.384-.2 2.119-.595a5.5 5.5 0 1 1-9.087-5.412c.126-.118.765-.685.793-.71.424-.38.773-.717 1.118-1.086 1.23-1.318 2.114-2.78 2.566-4.462z"/>
                            </g>
                        </svg>);
    return (
        <div className="editableSpice">
            {rating > 0 ? flame : flameSelected}

            {rating > 1 ? flame : flameSelected}

            {rating > 2 ? flame : flameSelected}

            {rating > 3 ? flame : flameSelected}

            {rating > 4 ? flame : flameSelected}
        </div>
    )
}

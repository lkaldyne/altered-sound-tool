import React from 'react'
import './styles/Button.css'

export function Button(props) {
    return (
        <div
            style={{ width: props.width, height: props.height }}
            className="buttongeneral"
            onClick={() => props.clicked(props.clickedarg)}
        >
            {props.children}
        </div>
    );
}

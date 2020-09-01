import React from 'react'
import Loader from 'react-loader-spinner'
import './styles/Button.css'

export function Button(props) {
    return (
        <div
            style={{ width: props.width, height: props.height }}
            className={props.disabled ? "buttondisabled" : props.loading ? "buttonloading" : "buttongeneral"}
            onClick={() => {
                if (!props.disabled) {
                    if (props.clickedarg) {
                        props.clicked(props.clickedarg);
                    }
                    else {
                        props.clicked();
                    }
                }
            }}
        >
            {
                props.loading ?
                    <Loader
                        type="ThreeDots"
                        color="black"
                        height={50}
                        width={40}
                    />
                    :
                    props.children
            }
        </div>
    );
}

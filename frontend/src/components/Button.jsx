import React from 'react'
import Loader from 'react-loader-spinner'
import './styles/Button.css'

export function Button(props) {
    return (
        <div
            style={{
                width: props.width,
                height: props.height,
                background: props.bckg ? props.bckg : "rgba(0,0,0,0)",
                margin: props.margin ? props.margin : "0 0 0 0",
                color: props.textcolor ? props.textcolor : "white"
            }}
            className="buttonwrapper"
        >
            <div
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
        </div>
    );
}

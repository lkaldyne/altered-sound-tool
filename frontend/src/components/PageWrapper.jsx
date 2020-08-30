import React from 'react'
import './styles/PageWrapper.css'

export function PageWrapper(props) {
    return (
        <div className={`pagewrapper_div ${props.navOpen ? "pagewrapper_navOpen" : ""}`}>
            {props.children}
        </div>
    );
}

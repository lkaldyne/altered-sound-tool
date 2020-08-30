import React from 'react'

export function Divider() {
    return (
        <div className="divider_wrapper" style={wrapperStyle}>
            <div className="divider_line" style={dividerStyle}></div>
        </div>
    );
}

const wrapperStyle = {
    display: "flex",
    width: "100%",
    height: "2px",
    alignItems: "center",
    justifyContent: "center"
}
const dividerStyle = {
    width: "95%",
    height: "100%",
    background: "white"
}

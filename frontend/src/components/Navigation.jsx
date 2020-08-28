import React from 'react'
import './styles/Navigation.css'

export class Navigation extends React.Component {
    render() {
        return (
            <div className="nav_div">
                <ul className="nav_menu">
                    <li className="nav_menuItem">
                        <a href="/" className="nav_menuItemText">HOME</a>
                        <a href="/" className="nav_menuItemTextShadow">HOME</a>
                    </li>
                    <li className="nav_menuItem">
                        <a href="/" className="nav_menuItemText">ABOUT</a>
                        <a href="/" className="nav_menuItemTextShadow">ABOUT</a>
                    </li>
                    <li className="nav_menuItem">
                        <a href="/" className="nav_menuItemText">AUDIO TOOL</a>
                        <a href="/" className="nav_menuItemTextShadow">AUDIO TOOL</a>
                    </li>

                </ul>
            </div>
        );
    }
}
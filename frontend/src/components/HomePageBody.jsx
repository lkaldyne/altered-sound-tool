import React from 'react'
import { Logo } from './Logo';
import './styles/HomePageBody.css'

export class HomePageBody extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="homepage_div">
                <div className="homepage_logowrapper">
                    <Logo />
                </div>
            </div>
        );
    }
}

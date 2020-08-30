import React from 'react'
import { Header } from '../components/Header';
import { AboutPageBody } from '../components/AboutPageBody';
import { Divider } from '../components/Divider'
import './styles/AboutPage.css'

export class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment >
                <div className={"about_maindiv"} >
                    <Header isHomePage={false} toggleNav={this.props.toggleNav} />
                    <Divider />
                    <AboutPageBody />
                </div>
            </React.Fragment>
        )
    }
}
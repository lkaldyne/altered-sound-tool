import React from 'react'
import { Header } from '../components/Header';
import { HomePageBody } from '../components/HomePageBody'
import './styles/HomePage.css'
// import { Redirect } from 'react-router-dom'
// import axios from 'axios';

export class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount = () => {
    //     axios.defaults.withCredentials = true;
    //     axios('/api/profiles/user', {
    //         method: 'get'
    //     })
    //         .then((response) => this.setState({ loggedIn: true }))
    //         .catch((err) => this.setState({ loggedIn: false }))
    // }

    render() {
        return (
            // <Redirect push to="/dashboard" />
            <React.Fragment >
                <div className={"home_maindiv"} >
                    <img
                        src="\bckg.jpg"
                        alt="StudioBackground"
                        className="home_bckgimg"
                    />
                    <Header isHomePage={true} toggleNav={this.props.toggleNav} />
                    <HomePageBody />
                </div>
            </React.Fragment>
        )
    }
}
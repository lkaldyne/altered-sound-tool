import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ToolPage } from '../pages/ToolPage';
import { PageWrapper } from '../components/PageWrapper'

export class Routes extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <PageWrapper navOpen={this.props.navOpen} children={<HomePage toggleNav={this.props.toggleNav} />} />
                )} />
                <Route exact path="/about" render={() => (
                    <PageWrapper navOpen={this.props.navOpen} children={<AboutPage toggleNav={this.props.toggleNav} />} />
                )} />
                <Route exact path="/tool" render={() => (
                    <PageWrapper navOpen={this.props.navOpen} children={<ToolPage toggleNav={this.props.toggleNav} />} />
                )} />
            </BrowserRouter>
        )
    }
}
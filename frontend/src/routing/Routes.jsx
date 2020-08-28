import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ToolPage } from '../pages/ToolPage';

export class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <HomePage />
                )} />
                <Route exact path="/about" render={() => (
                    <AboutPage />
                )} />
                <Route exact path="/tool" render={() => (
                    <ToolPage />
                )} />
            </BrowserRouter>
        )
    }
}
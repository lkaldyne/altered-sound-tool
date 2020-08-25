import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage';
import { Dashboard } from '../pages/Dashboard';

export class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <HomePage />
                )} />
                <Route exact path="/board" render={() => (
                    <Dashboard />
                )} />
            </BrowserRouter>
        )
    }
}
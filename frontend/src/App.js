import React from 'react';
import { Routes } from './routing/Routes';
import { Navigation } from './components/Navigation'

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navigation id="nav" />
        <Routes id="main" />
      </React.Fragment>
    )
  }
}
import React from 'react';
import { Routes } from './routing/Routes';
import { Navigation } from './components/Navigation'

export default class App extends React.Component {
  state = {
    navOpen: false
  }

  toggleNav = () => {
    this.setState(prevState => ({
      navOpen: !prevState.navOpen
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Navigation navOpen={this.state.navOpen} />
        <Routes id="main" toggleNav={this.toggleNav} navOpen={this.state.navOpen} />
      </React.Fragment>
    )
  }
}
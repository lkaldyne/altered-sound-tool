import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Icon } from '@iconify/react'
import { Logo } from './Logo';
import hamburgerMenu from '@iconify/icons-cil/hamburger-menu'
import './styles/Header.css'

export class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            navOpen: !prevState.navOpen
        }));
        this.props.toggleNav();
    }

    render() {
        let titleElement = this.props.isHomePage ? (<div></div>) : (
            <div style={{ margin: '15px 15px 15px 35px' }}>
                <Logo />
            </div>
        )

        return (
            <div className="header_div">
                {titleElement}
                <div className="header_userInfoHead">
                    <a href="https://github.com/lkaldyne" id="header_gitforge" className="header_userInfoSectionElem">
                        <FaGithub size="30" />
                    </a>

                    <div
                        id="header_navbutton"
                        className={`header_userInfoSectionElem ${this.state.navOpen ? "header_navrotated" : ""}`}
                        onClick={this.toggle}
                    >
                        <Icon
                            icon={hamburgerMenu}
                            width="59px"
                            height="42px"
                        />
                    </div>

                </div>

            </div>
        );
    }
}

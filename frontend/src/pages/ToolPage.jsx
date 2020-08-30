import React from 'react'
import { Header } from '../components/Header';
import { ToolPageBody } from '../components/ToolPageBody';
import './styles/ToolPage.css'
import { Divider } from '../components/Divider';

export class ToolPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment >
                <div className={"tool_maindiv"} >
                    <Header isHomePage={false} toggleNav={this.props.toggleNav} />
                    <Divider />
                    <ToolPageBody />
                </div>
            </React.Fragment>
        )
    }
}
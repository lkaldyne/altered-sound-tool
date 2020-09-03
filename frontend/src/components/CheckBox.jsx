import React from 'react'
import './styles/CheckBox.css'
import { Icon } from '@iconify/react';
import checkmarkIcon from '@iconify/icons-carbon/checkmark';


export class CheckBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }
    }

    toggle = () => {
        this.setState({ checked: !this.state.checked })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.checked ?
                        <div className="checkbox_box" onClick={this.toggle}>
                            <Icon icon={checkmarkIcon} width="50px" height="50px" />
                        </div>
                        :
                        <div className="checkbox_box" onClick={this.toggle}></div>
                }
            </React.Fragment>
        );
    }
}

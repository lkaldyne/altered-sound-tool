import React from 'react'
import './styles/CheckBox.css'
import { Icon } from '@iconify/react';
import { modDeltas } from './tool/ToolModify'
import checkmarkIcon from '@iconify/icons-carbon/checkmark';


export class CheckBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.settings["default"]
        }
    }

    toggle = () => {
        let newVal = !this.state.checked;
        if (newVal !== this.props.settings["default"]) {
            this.props.onChange(modDeltas.INCREASE, this.props.settingName, newVal);
        }
        else {
            this.props.onChange(modDeltas.DECREASE, this.props.settingName, newVal);
        }
        this.setState({ checked: newVal });
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

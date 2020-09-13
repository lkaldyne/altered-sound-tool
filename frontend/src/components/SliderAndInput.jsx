import React from 'react'
import { modDeltas } from './tool/ToolModify'
import './styles/SliderAndInput.css'

export class SliderAndInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.settings["default"],
            display: `${this.props.settings["default"]}${this.props.settings["suffix"]}`
        }
    }

    updateStateForSetting = (newVal, suffix, onlyDisplay = false) => {
        let newstate = this.state;
        if (!onlyDisplay) {
            let def = this.props.settings["default"]
            if (newVal !== def && this.state.value === def) {
                this.props.onChange(modDeltas.INCREASE, this.props.settingName, newVal);
            }
            else if (newVal === def && this.state.value !== def) {
                this.props.onChange(modDeltas.DECREASE, this.props.settingName, newVal);
            }
            else {
                this.props.onChange(modDeltas.NEUTRAL, this.props.settingName, newVal);
            }

            newstate.value = newVal;
            newstate.display = `${newVal}${suffix}`;
        }
        else {
            newstate.display = newVal;
        }

        this.setState(newstate);
    }

    finalizeinput = (setting) => {
        let sanitized = this.state.display.replace(setting["suffix"], '');
        if (sanitized.length > 0 && !isNaN(sanitized)) {
            if (sanitized > setting["max"]) {
                this.updateStateForSetting(setting["max"], setting["suffix"])
            }
            else if (sanitized < setting["min"]) {
                this.updateStateForSetting(setting["min"], setting["suffix"])
            }
            else {
                this.updateStateForSetting(parseFloat(sanitized), setting["suffix"])
            }
        }
        else {
            this.updateStateForSetting(setting["default"], setting["suffix"])
        }
    }

    render() {
        return (
            <div className="sliderandinput_maindiv">
                <div className="sliderandinput_slidercontainer">
                    <input
                        type="range"
                        min={this.props.settings["min"]}
                        max={this.props.settings["max"]}
                        value={this.state.value}
                        onChange={
                            (e) => this.updateStateForSetting(
                                parseFloat(e.target.value),
                                this.props.settings["suffix"]
                            )
                        }
                        step={this.props.step}
                        className="sliderandinput_slider"
                    />
                </div>
                <div className="sliderandinput_slidervalue">
                    <input
                        type="text"
                        maxLength={this.props.maxLength}
                        value={this.state.display}
                        onChange={
                            (e) => this.updateStateForSetting(
                                e.target.value,
                                this.props.settings["suffix"],
                                true
                            )
                        }
                        onBlur={() => this.finalizeinput(this.props.settings)}
                    />
                </div>
            </div>
        );
    }
}

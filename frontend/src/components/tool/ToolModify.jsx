import React from 'react'
import './styles/ToolModify.css'
import { audiosettings } from './ToolSettingDefaults'

export class ToolModify extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settingvalues: {
                "audiospeed": {
                    "value": audiosettings["default"],
                    "display": `${audiosettings["default"]}${audiosettings["suffix"]}`,
                }
            }
        }
    }

    updateStateForSetting = (settingkey, newVal, suffix, onlyDisplay = false) => {
        let newstate = this.state;
        if (!onlyDisplay) {
            newstate.settingvalues[settingkey]["value"] = newVal;
            newstate.settingvalues[settingkey]["display"] = `${newVal}${suffix}`;
        }
        else {
            newstate.settingvalues[settingkey]["display"] = newVal;
        }

        this.setState(newstate);
    }

    finalizeinput = (settingkey, setting) => {
        let sanitized = this.state.settingvalues[settingkey]["display"].replace(setting["suffix"], '');
        if (sanitized.length > 0 && !isNaN(sanitized)) {
            if (sanitized > setting["max"]) {
                this.updateStateForSetting(settingkey, setting["max"], setting["suffix"])
            }
            else if (sanitized < setting["min"]) {
                this.updateStateForSetting(settingkey, setting["min"], setting["suffix"])
            }
            else {
                this.updateStateForSetting(settingkey, parseFloat(sanitized), setting["suffix"])
            }
        }
        else {
            this.updateStateForSetting(settingkey, setting["default"], setting["suffix"])
        }
    }

    render() {
        return (
            <div className="toolmodify_maindiv">
                <div className="toolmodify_header">
                    <div className="toolmodify_title">
                        <p className="toolmodify_titletext">Your Audio File:</p>
                    </div>
                    <div className="toolmodify_title">
                        <p className="toolmodify_filenametext">example1.wav</p>
                    </div>
                </div>
                <div className="toolmodify_modbox">
                    <div className="toolmodify_settingwrapper">
                        <div className="toolmodify_settingtitle">
                            <p className="toolmodify_settingtitletext">Audio Speed:</p>
                        </div>
                        <div className="toolmodify_settingslidercontainer">
                            <input
                                type="range"
                                min={audiosettings["min"]}
                                max={audiosettings["max"]}
                                value={this.state.settingvalues["audiospeed"]["value"]}
                                onChange={(e) => this.updateStateForSetting("audiospeed", parseFloat(e.target.value), audiosettings["suffix"])}
                                step={0.1}
                                className="toolmodify_settingslider" />
                        </div>
                        <div className="toolmodify_settingslidervalue">
                            <input
                                type="text"
                                maxLength="4"
                                value={this.state.settingvalues["audiospeed"]["display"]}
                                onChange={(e) => this.updateStateForSetting("audiospeed", e.target.value, audiosettings["suffix"], true)}
                                onBlur={() => this.finalizeinput("audiospeed", audiosettings)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

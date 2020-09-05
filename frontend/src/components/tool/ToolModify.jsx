import React from 'react'
import axios from 'axios'
import './styles/ToolModify.css'
import { ToolProcessing } from './ToolProcessing'
import { SliderAndInput } from '../SliderAndInput'

import {
    audiospeedsettings,
    pitchshiftsettings,
    sizereductionsettings,
    deepfrysettings,
    distortionsettings
} from './ToolSettingDefaults'

import { CheckBox } from '../CheckBox';
import { Button } from '../Button';

const TOTAL_SETTINGS_COUNT = 6

export const modDeltas = {
    NEUTRAL: 0,
    INCREASE: 1,
    DECREASE: 2
}

export class ToolModify extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isUploading: false,
            uploadError: false,
            settings: {
                "audiospeed": audiospeedsettings['default'],
                "pitchshift": pitchshiftsettings['default'],
                "sizereduction": sizereductionsettings['default'],
                "deepfry": deepfrysettings['default'],
                "distortion": distortionsettings['default'],
                "chordify": false
            },
            changedSettings: 0
        }
    }

    childChanged = (delta, key, value) => {
        let newstate = this.state;
        if (delta === modDeltas.INCREASE) {
            newstate.changedSettings += 1;
        }
        else if (delta === modDeltas.DECREASE) {
            newstate.changedSettings -= 1;
        }

        newstate.settings[key] = value;
        this.setState(newstate);

    }

    finalize = () => {
        this.setState({ isUploading: true });
        // axios api post logic
        axios.post('http://0.0.0.0:3000/mod', {
            'key': this.props.apiKey,
            'settings': this.state.settings
        })
            .then(res => {
                // this.props.notifyParent(generatedKey, this.state.currentFile.name);
                this.props.invokeNextStage(false)
            })
            .catch((e) => {
                this.setState(prevState => ({
                    uploadError: true,
                    isUploading: false,
                }));
            });
        this.props.invokeNextStage(false);
    }

    render() {
        let mainpage =
            <div className="toolmodify_maindiv">
                <div className="toolmodify_header">
                    <div className="toolmodify_title">
                        <p className="toolmodify_titletext">Your Audio File:</p>
                    </div>
                    <div className="toolmodify_title">
                        <p className="toolmodify_filenametext">{this.props.filename}</p>
                    </div>
                </div>
                <div className="toolmodify_modbox">
                    <div className="toolmodify_settingwrapper">
                        <div className="toolmodify_settingtitle" onClick={() => console.log(this.state.settings)}>
                            <p className="toolmodify_settingtext">Audio Speed:</p>
                        </div>
                        <SliderAndInput
                            settingName={"audiospeed"}
                            onChange={this.childChanged}
                            settings={audiospeedsettings}
                            maxLength={4}
                            step={0.1}
                        />
                    </div>
                    <div className="toolmodify_settingwrapper">
                        <div className="toolmodify_settingtitle">
                            <p className="toolmodify_settingtext">Pitch Shift:</p>
                        </div>
                        <SliderAndInput
                            settingName={"pitchshift"}
                            onChange={this.childChanged}
                            settings={pitchshiftsettings}
                            maxLength={3}
                            step={1}
                        />
                        <div className="toolmodify_settingcomment">
                            <p className="toolmodify_settingtext">(Semitones)</p>
                        </div>
                    </div>
                    <div className="toolmodify_settingwrapper">
                        <div className="toolmodify_settingtitle">
                            <p className="toolmodify_settingtext">Reduce Size:</p>
                        </div>
                        <SliderAndInput
                            settingName={"sizereduction"}
                            onChange={this.childChanged}
                            settings={sizereductionsettings}
                            maxLength={3}
                            step={1}
                        />
                        <div className="toolmodify_settingcomment">
                            <p className="toolmodify_settingtext">(100% = Original Size)</p>
                        </div>
                    </div>
                    <div className="toolmodify_settingwrapper">
                        <div className="toolmodify_settingtitle">
                            <p className="toolmodify_settingtext">Deep Fry:</p>
                        </div>
                        <SliderAndInput
                            settingName={"deepfry"}
                            onChange={this.childChanged}
                            settings={deepfrysettings}
                            maxLength={3}
                            step={1}
                        />
                        <div className="toolmodify_settingcomment">
                            <p className="toolmodify_settingtext">(0% = None, 100% = Maximum Fry)</p>
                        </div>
                    </div>
                    <div className="toolmodify_settingwrapper">
                        <div className="toolmodify_settingtitle">
                            <p className="toolmodify_settingtext">Distortion:</p>
                        </div>
                        <SliderAndInput
                            settingName={"distortion"}
                            onChange={this.childChanged}
                            settings={distortionsettings}
                            maxLength={3}
                            step={1}
                        />
                        <div className="toolmodify_settingcomment">
                            <p className="toolmodify_settingtext">(0% = None, 100% = Maximum Distortion)</p>
                        </div>
                    </div>
                    <div className="toolmodify_settingwrapper">
                        <div className="toolmodify_settingtitle">
                            <p className="toolmodify_settingtext">Chordify:</p>
                        </div>
                        <div className="toolmodify_checkboxwrapper">
                            <CheckBox
                                settingName={"chordify"}
                                onChange={this.childChanged}
                            />
                        </div>
                        <div className="toolmodify_settingcomment">
                            <p className="toolmodify_settingtext">(The harmonies are otherworldly!)</p>
                        </div>
                    </div>
                </div>
                <div className="toolmodify_footer">
                    <Button
                        width="200px"
                        height="50px"
                        clicked={() => this.props.invokeNextStage(true)}
                    >
                        <p className="toolmodify_buttontext">Cancel</p>
                    </Button>
                    <Button
                        width="200px"
                        height="50px"
                        disabled={!this.state.changedSettings}
                        clicked={this.finalize}
                        bckg="#57D6F1"
                        margin="0 0 0 15px"
                        textcolor="black"
                    >
                        <p className="toolmodify_buttontext">Finish</p>
                    </Button>
                </div>
            </div>

        // --------------------------------------------------------------------------

        return (
            <React.Fragment>
                {
                    this.state.isUploading ?
                        <ToolProcessing />
                        :
                        mainpage
                }
            </React.Fragment>

        );
    }
}

import React from 'react'
import { ToolProcessing } from './ToolProcessing'
import './styles/ToolModify.css'
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

export class ToolModify extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isUploading: false
        }
    }

    statechanged = () => {
        return true;
    }

    finalize = () => {
        // this.setState({ isUploading: true });
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
                        <p className="toolmodify_filenametext">example1.wav</p>
                    </div>
                </div>
                <div className="toolmodify_modbox">
                    <div className="toolmodify_settingwrapper">
                        <div className="toolmodify_settingtitle">
                            <p className="toolmodify_settingtext">Audio Speed:</p>
                        </div>
                        <SliderAndInput
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
                            <CheckBox />
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
                        disabled={!this.statechanged()}
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

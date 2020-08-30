import React from 'react'
import { Icon } from '@iconify/react';
import uploadOutlined from '@iconify/icons-ant-design/upload-outlined';
import downloadOutlined from '@iconify/icons-ant-design/download-outlined';
import settingsAdjust from '@iconify/icons-carbon/settings-adjust';
import './styles/ToolInit.css'

export class ToolInit extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="toolinit_maindiv">
                <div className="toolinit_header">
                    <div className="toolinit_title">
                        <p className="toolinit_titletext">Audio Editor</p>
                    </div>
                    <div className="toolinit_subtitle">
                        <p className="toolinit_subtitletext">[ Upload and modify your audio files ]</p>
                    </div>
                </div>

                <div className="toolinit_instructionswrapper">
                    <div className="toolinit_instruction">
                        <div className="toolinit_instructioncount">
                            <p className="toolinit_instructioncounttext">1.</p>
                        </div>
                        <div className="toolinit_instructionbox">
                            <div className="toolinit_instructionboxrow">
                                <p className="toolinit_instructionboxtext">Upload Audio File</p>
                            </div>
                            <div className="toolinit_instructionboxrow">
                                <Icon icon={uploadOutlined} width="37px" height="33px" />
                            </div>
                        </div>
                    </div>
                    <div className="toolinit_instruction">
                        <div className="toolinit_instructioncount">
                            <p className="toolinit_instructioncounttext">2.</p>
                        </div>
                        <div className="toolinit_instructionbox">
                            <div className="toolinit_instructionboxrow">
                                <p className="toolinit_instructionboxtext">Modify</p>
                            </div>
                            <div className="toolinit_instructionboxrow">
                                <Icon icon={settingsAdjust} width="37px" height="33px" />
                            </div>
                        </div>
                    </div>
                    <div className="toolinit_instruction">
                        <div className="toolinit_instructioncount">
                            <p className="toolinit_instructioncounttext">3.</p>
                        </div>
                        <div className="toolinit_instructionbox">
                            <div className="toolinit_instructionboxrow">
                                <p className="toolinit_instructionboxtext">Download</p>
                            </div>
                            <div className="toolinit_instructionboxrow">
                                <Icon icon={downloadOutlined} width="37px" height="33px" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="toolinit_startbutton" onClick={() => this.props.invokeNextStage(false)}>

                </div>
            </div>
        );
    }
}

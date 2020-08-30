import React from 'react'
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
                            <p>Upload Audio File</p>
                            {/* icon */}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

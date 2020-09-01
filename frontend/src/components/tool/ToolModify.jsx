import React from 'react'
import './styles/ToolModify.css'

export class ToolModify extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

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
                    </div>
                </div>
            </div>
        );
    }
}

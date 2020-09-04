import React from 'react'
import { Icon } from '@iconify/react';
import { Button } from '../Button';
import cloudDownloadOutlined from '@iconify/icons-ant-design/cloud-download-outlined';

import './styles/ToolComplete.css'

export class ToolComplete extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="toolcomplete_maindiv">
                <div className="toolcomplete_header">
                    <div className="toolcomplete_title">
                        <p className="toolcomplete_titletext">Your File is Ready!</p>
                    </div>
                </div>
                <div className="toolcomplete_downloadwrapper">
                    <div className="toolcomplete_downloadbutton">
                        <div className="toolcomplete_downloadbuttoncontent">
                            <Icon icon={cloudDownloadOutlined} width="100px" height="95px" />
                        </div>
                        <div className="toolcomplete_downloadbuttoncontent">
                            <p>test123-modified.wav</p>
                        </div>
                    </div>
                </div>

                <div className="toolcomplete_buttonwrapper">
                    <Button
                        width="200px"
                        height="50px"
                        clicked={() => this.props.invokeNextStage(true)}
                    >
                        <p className="toolcomplete_buttontext">Start Over</p>
                    </Button>
                </div>
            </div >
        );
    }
}

import React from 'react'
import { ToolInit } from '../components/tool/ToolInit'
import { ToolUpload } from '../components/tool/ToolUpload'
import { ToolModify } from '../components/tool/ToolModify'
import { ToolComplete } from '../components/tool/ToolComplete'
import './styles/ToolPageBody.css'

const tool_stages = {
    INIT: 0,
    UPLOAD: 1,
    MODIFY: 2,
    COMPLETE: 3
}

export class ToolPageBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cur_stage: tool_stages.INIT,
            apiKey: "",
            filename: ""
        }
    }

    nextStage = (restart) => {
        let nextstage = restart ? tool_stages.INIT : this.state.cur_stage + 1;
        this.setState(prevState => ({
            cur_stage: nextstage
        }));
    }

    updateFileData = (apiKey, filename) => {
        this.setState(prevState => ({
            apiKey: apiKey,
            filename: filename
        }));
    }

    render() {
        let page;
        switch (this.state.cur_stage) {
            case tool_stages.INIT:
                page = <ToolInit invokeNextStage={this.nextStage} />
                break;
            case tool_stages.UPLOAD:
                page = <ToolUpload invokeNextStage={this.nextStage} notifyParent={this.updateFileData} />
                break;
            case tool_stages.MODIFY:
                page = <ToolModify
                    invokeNextStage={this.nextStage}
                    apiKey={this.state.apiKey}
                    filename={this.state.filename}
                />
                break;
            case tool_stages.COMPLETE:
                page = <ToolComplete
                    invokeNextStage={this.nextStage}
                    apiKey={this.state.apiKey}
                    filename={this.state.filename}
                />
                break;
        }
        return (
            <div className="toolpage_div">
                {page}
            </div>
        );
    }
}

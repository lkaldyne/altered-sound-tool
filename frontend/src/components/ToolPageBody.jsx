import React from 'react'
import { ToolInit } from '../components/tool/ToolInit'
import { ToolUpload } from '../components/tool/ToolUpload'
import { ToolModify } from '../components/tool/ToolModify'
import { ToolProcessing } from '../components/tool/ToolProcessing'
import { ToolComplete } from '../components/tool/ToolComplete'
import './styles/ToolPageBody.css'

const tool_stages = {
    INIT: 0,
    UPLOAD: 1,
    MODIFY: 2,
    PROCESSING: 3,
    COMPLETE: 4
}

export class ToolPageBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cur_stage: tool_stages.INIT
        }
    }

    nextStage = (restart) => {
        let nextstage = restart ? tool_stages.INIT : this.state.cur_stage + 1;
        this.setState(prevState => ({
            cur_stage: nextstage
        }));
    }

    render() {
        let page;
        switch (this.state.cur_stage) {
            case tool_stages.INIT:
                page = <ToolInit invokeNextStage={this.nextStage} />
                break;
            case tool_stages.UPLOAD:
                page = <ToolUpload invokeNextStage={this.nextStage} />
                break;
            case tool_stages.MODIFY:
                page = <ToolModify invokeNextStage={this.nextStage} />
                break;
            case tool_stages.PROCESSING:
                page = <ToolProcessing invokeNextStage={this.nextStage} />
                break;
            case tool_stages.COMPLETE:
                page = <ToolComplete invokeNextStage={this.nextStage} />
                break;
        }
        return (
            <div className="toolpage_div">
                {page}
            </div>
        );
    }
}

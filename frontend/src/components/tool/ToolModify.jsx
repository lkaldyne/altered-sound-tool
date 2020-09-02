import React from 'react'
import './styles/ToolModify.css'

export class ToolModify extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            audiospeed: 1,
            audiospeedinput: "1x"
        }
    }

    finalizeinput = () => {
        // to do: make this function generic, should not be specific to audiospeed, 'x', etc.
        // Maybe the state var to be modified can be passed in as an arg (doubt it),
        // or maybe the state itself can be reshaped to be more modular (perhaps hashmap with str keys?)
        let sanitized = this.state.audiospeedinput.replace('x', '');
        if (sanitized.length > 0 && !isNaN(sanitized)) {
            if (sanitized > 10) {
                this.setState({
                    audiospeed: 10,
                    audiospeedinput: "10x"
                });
            }
            else {
                this.setState({
                    audiospeed: parseFloat(sanitized),
                    audiospeedinput: `${sanitized}x`
                });
            }
        }
        else {
            this.setState({
                audiospeed: 1,
                audiospeedinput: "1x"
            })
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
                        <div className="toolmodify_settingtitle" onClick={() => console.log(this.state.audiospeed)}>
                            <p className="toolmodify_settingtitletext">Audio Speed:</p>
                        </div>
                        <div className="toolmodify_settingslidercontainer">
                            <input
                                type="range"
                                min={0.1}
                                max={10}
                                value={this.state.audiospeed}
                                // the below code should be handled by a generic function, same as above comment
                                onChange={(e) => this.setState({
                                    audiospeed: parseFloat(e.target.value),
                                    audiospeedinput: `${e.target.value}x`
                                })}
                                step={0.1}
                                className="toolmodify_settingslider" />
                        </div>
                        <div className="toolmodify_settingslidervalue">
                            <input
                                type="text"
                                maxLength="4"
                                value={this.state.audiospeedinput}
                                // same here
                                onChange={(e) => this.setState({ audiospeedinput: e.target.value })}
                                onBlur={this.finalizeinput}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React from 'react'
import './styles/ToolProcessing.css'
import Loader from 'react-loader-spinner'

export function ToolProcessing() {
    return (
        <div className="toolprocessing_maindiv">
            <div className="toolprocessing_loadingwrapper">
                <div className="toolprocessing_loadingcontent">
                    <div className="toolprocessing_loadingitem">
                        <Loader
                            type="Circles"
                            color="white"
                            height={60}
                            width={60}
                        />
                    </div>
                    <div className="toolprocessing_loadingitem">
                        <p>Processing...</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

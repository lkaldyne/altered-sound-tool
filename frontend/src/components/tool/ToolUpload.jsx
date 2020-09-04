import React from 'react'
import axios from 'axios'
import { Icon } from '@iconify/react';
import { Button } from '../Button';
import folderMusic from '@iconify/icons-entypo/folder-music';
import uploadOutlined from '@iconify/icons-ant-design/upload-outlined';
import deleteFilled from '@iconify/icons-ant-design/delete-filled';
import fileExclamationFilled from '@iconify/icons-ant-design/file-exclamation-filled';
import './styles/ToolUpload.css'

export class ToolUpload extends React.Component {

    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();

        this.state = {
            currentFile: null,
            fileValid: true,
            isUploading: false
        }
    }

    clearFile = () => {
        this.setState(prevState => ({
            currentFile: null,
            isUploading: false
        }));
    }

    validateFile = (file) => {
        const validTypes = ['audio/wav', 'audio/mpeg'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    handleFiles = (files) => {
        this.setState(prevState => ({
            currentFile: files[0]
        }));
        if (this.validateFile(files[0])) {
            this.setState(prevState => ({
                fileValid: true
            }));
        }
        else {
            this.setState(prevState => ({
                fileValid: false
            }));
        }
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    dragEnter = (e) => {
        e.preventDefault();
    }

    dragLeave = (e) => {
        e.preventDefault();
    }

    fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log(files[0])
        if (files.length) {
            this.handleFiles(files);
        }
    }

    fileInputClicked = () => {
        this.fileInputRef.current.click();
    }

    filesSelected = () => {
        if (this.fileInputRef.current.files.length) {
            this.handleFiles(this.fileInputRef.current.files);
        }
    }

    uploadFile = () => {
        // axios api post logic
        // this.setState(prevState => ({
        //     isUploading: true
        // }));
        this.props.invokeNextStage(false);
    }

    render() {
        return (
            <div className="toolupload_maindiv">
                <div className="toolupload_header">
                    <div className="toolupload_title">
                        <p className="toolupload_titletext">Upload Audio File</p>
                    </div>
                </div>

                <div className="toolupload_itemwrapper">
                    <div className="toolupload_uploadbox"
                        onDragOver={this.dragOver}
                        onDragEnter={this.dragEnter}
                        onDragLeave={this.dragLeave}
                        onDrop={this.fileDrop}
                        onClick={this.fileInputClicked}
                    >
                        <div className="toolupload_uploadboxchild">
                            <p className="toolupload_uploadinstructionstext">
                                Drag files here or click anywhere in this box
                            </p>
                        </div>

                        <div className="toolupload_uploadboxchild">
                            <Icon icon={uploadOutlined} width="50px" height="44px" />

                        </div>

                        <input
                            ref={this.fileInputRef}
                            className="toolupload_fileinputelem"
                            type="file"
                            onChange={this.filesSelected}
                        />

                    </div>
                </div>

                {
                    this.state.currentFile ?
                        <div className="toolupload_itemwrapper">
                            <div
                                className={`toolupload_dropzonedata ${this.state.fileValid ? "toolupload_dropzonedatavalid" : "toolupload_dropzonedatainvalid"}`}
                            >
                                <div className="toolupload_fileinfo">
                                    <div className="toolupload_musicicon">
                                        <Icon
                                            icon={this.state.fileValid ? folderMusic : fileExclamationFilled}
                                            width="40px"
                                            height="30px"
                                        />
                                    </div>
                                    <div className="toolupload_filname">
                                        <p className="toolupload_filenametext">
                                            {`${this.state.currentFile.name} ${this.state.fileValid ? "" : "(Invalid file format)"}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="toolupload_filedelete" onClick={this.clearFile}>
                                    <Icon icon={deleteFilled} width="20px" height="30px" />
                                </div>
                            </div>
                        </div>
                        :
                        ""
                }

                <div className="toolupload_itemwrapper">
                    <div className="toolupload_finalize">
                        <Button
                            width="200px"
                            height="50px"
                            disabled={!(this.state.fileValid && this.state.currentFile)}
                            loading={this.state.isUploading}
                            clicked={this.uploadFile}
                        >
                            <p className="toolupload_filenametext">Upload</p>
                        </Button>
                    </div>
                </div>
            </div >
        );
    }
}

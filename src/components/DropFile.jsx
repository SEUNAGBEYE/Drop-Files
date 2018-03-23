import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';


import fileUploader from '../helpers/fileUploader';

/**
 * @description Drop File Component
 * 
 * @class DropFile
 * @extends {Component}
 */
class DropFile extends Component{
  /**
   * @description Creates an instance of DropFile.
   *
   * @method constructor
   * 
   * @param {Object} props
   *
   * @memberof DropFile
   */
  constructor(props){
    super(props);
    this.state = {
      files: [],
      showFilePreviewer: false,
    }
  }

  uploadToCloudinary = async (event) => {
    event.preventDefault()
    this.setState({ fileUploading: true })
    const { files } = this.state;
    const uploadedFiles = await fileUploader(files);
    this.setState({ fileUploading: false, files: [], uploadedFiles })
  }

  /**
   * @description change state
   * 
   * @method onChange
   * 
   * @param {Object} event
   * 
   * @memberof DropFile
   */
  onChange = (event) => {
    const { name } = event.target;
    const { files } = event.target;
    const arrayOfFiles = Array.from(files);
    
    this.setState(
      { [name]: [...this.state.files, ...arrayOfFiles], showFilePreviewer: true }
    )
  }
  /**
   * @description remove file from state
   * 
   * @method removeFile
   * 
   * @param {Object} event
   * 
   * @memberof DropFile
   */
  removeFile = (event) => {
    event.preventDefault();
    const fileIndex = Number(event.target.dataset.id);
    const files = this.state.files.filter((files, index) => index !== fileIndex);
    this.setState({ files });
  }
    
  /**
   * @description display or hide file previewer
   * 
   * @method toggleFilePreviewer
   * 
   * @returns {void}
   * @memberof DropFile
   */
  toggleFilePreviewer = () => {
      this.setState({
        showFilePreviewer: !showFilePreviewer
      })
    }

  /**
   * @description render file previewer
   * 
   * @method render
   * 
   * @returns {Jsx} Jsx
   * @memberof DropFile
   */
  renderFilePreviewer = () => {
    window.URL = window.URL || window.webkitURL;
      return (
        this.state.files.length > 0 ?
        <div id="filePreviewer"
        display="showPreviewer"
      >
        { 
          this.state.showFilePreviewer &&
          this.state.files.map((file, index) =>
            /image/.test(file.type) ?
            <a href={window.URL.createObjectURL(file)}
            className="imageThumbnails"
            key={uuid()}
            >
             <img src={window.URL.createObjectURL(file)} data-id={index}
             />
            <span className="fa fa-trash" data-id={index}
             onClick={this.removeFile}
            />
             </a>
            : 
            <div className="fileThumbnails"
            key={uuid()}>
              <object data={window.URL.createObjectURL(file)}
              type={file.type}
              >Not Supported</object>
              <span className="fa fa-trash" data-id={index} 
                onClick={this.removeFile}
              />
            </div>
            
          )
        }
      </div>
      : ''
      )
  };

  /**
   * 
   * 
   * @returns {Jsx} Jsx
   * @memberof DropFile
   */
  render(){
      return (
      <main>
        <div>
          <form>
            { this.renderFilePreviewer() }
            <label className="selectFileContainer" htmlFor='file'>
              <div>
              <span className="fa fa-camera"></span>
              </div>
            </label>
            <input type="file" style={{display:"none"}} name='files'
              multiple
              id="file" onChange={this.onChange}
            />
            <button className = {
               this.state.fileUploading ? 'fa fa-spinner' : '' 
              }
              disabled = {this.state.fileUploading}
            onClick= {this.uploadToCloudinary}
            >
              Upload
            </button>
          </form>
        </div>
      </main>
      );
    }
}


export default DropFile;
import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import './styles/styles.scss';
import './font-awesome-4.7.0/scss/font-awesome.scss';

/**
 * @description Drop File Component
 * 
 * @class DropFile
 * @extends {Component}
 */
class DropFile extends Component{
  constructor(props){
    super(props);
    this.state = {
      fileExtensionsRegex: /\.dmg|\.apk|\.docx|\.m4a/,
      supportedFormats: {
        video: /video/,
        image: /image/,
        audio: /audio/
      }
    }
    this.onChange = this.onChange.bind(this);
    this.dragAndDropFile = this.dragAndDropFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.renderFilePreviewer = this.renderFilePreviewer.bind(this);
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
  onChange(event){
    event.preventDefault();
    const { that } = this.props;
    const { fileExtensionsRegex } = this.state
    const { name } = event.target;
    const { files } = event.target;
    let arrayOfFiles = Array.from(files);
    arrayOfFiles = arrayOfFiles
    .filter(file => !fileExtensionsRegex.test(file.name))
    that.setState(
      { [name]: [...that.state.files, ...arrayOfFiles], showFilePreviewer: true }
    )
  }

  dragAndDropFile(event){
    event.preventDefault();
    event.stopPropagation();
    const { that } = this.props;
    const data = event.dataTransfer;
    const { fileExtensionsRegex } = this.state
    const { files } = data
    if(files.length > 0){
      let arrayOfFiles = Array.from(files);
      arrayOfFiles = arrayOfFiles.filter(file => {
        return !fileExtensionsRegex.test(file.name)
      })  
      that.setState(
        { files: [...that.state.files, ...arrayOfFiles], showFilePreviewer: true }
      )
    }


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
  removeFile(event){
    event.preventDefault();
    const { that } = this.props;
    const fileIndex = Number(event.target.dataset.id);
    const files = that.state.files.filter((files, index) => index !== fileIndex);
    that.setState({ files });
  }
    

  /**
   * @description render file previewer
   * 
   * @method render
   * 
   * @returns {Jsx} Jsx
   * @memberof DropFile
   */
  renderFilePreviewer(){
    const { that } = this.props;
    const { 
      fileExtensionsRegex,
      supportedFormats: { image, video, audio }
    } = this.state
    window.URL = window.URL || window.webkitURL;
      return (
        that.state.files.length > 0 ?
        <div id="filePreviewer"
        display="showPreviewer"
      >
        { 
          that.state.files.map((file, index) =>
            {
            if(image.test(file.type)){
              return (
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
              )
            } else if(audio.test(file.type)){
              return (
                <audio controls key={uuid()}>
                  <source src={window.URL.createObjectURL(file)}/>
                </audio>
              )
            } else if(video.test(file.type)){
              return (
                <video className="imageThumbnails" key={uuid()}
                  preload controls
                >
                  <source src={window.URL.createObjectURL(file)} />
                </video>
              )
            }
              return(
                <div className="fileThumbnails"
                  key={uuid()}
                >
                  <object data={window.URL.createObjectURL(file)}
                  type={file.type}
                  >Not Supported</object>
                  <span className="fa fa-trash" data-id={index} 
                    onClick={this.removeFile}
                  />
                </div>
              )
        })
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
            { this.renderFilePreviewer() }
            <label id="selectFileContainer" htmlFor='file'
              onDragEnter={this.dragAndDropFile}
              onDragOver={this.dragAndDropFile}
              onDrop={this.dragAndDropFile}
            >
                <span>Drag & Drop files</span>
                <span className="fa fa-camera"></span>
                <span>Or Click</span>
            </label>
            <input type="file" style={{display:"none"}} name='files'
              multiple
              id="file" onChange={this.onChange}
            />
        </div>
      </main>
      );
    }
}

const propTypes = {
  that: PropTypes.object.isRequired
}

DropFile.propTypes = propTypes;

export default DropFile;
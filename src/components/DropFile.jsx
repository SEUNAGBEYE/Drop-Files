import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import camera from '../../public/images/camera.png'
import trash from '../../public/images/trash.jpeg'
import '../../public/styles/styles.scss';

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
        audio: /audio/,
        urls: /https?/
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
      supportedFormats: { image, video, audio, urls }
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
                className="image-thumbnails"
                key={uuid()}
                >
                <img src={window.URL.createObjectURL(file)} 
                className="image-types" data-id={index}
                />
                <img className="trash" data-id={index}
                onClick={this.removeFile}
                src={trash}
                />
                </a>
              )
            } else if(audio.test(file.type)){
              return (
                <div className="audio-lists">
                <audio controls key={uuid()} className="audio-types">
                  <source src={window.URL.createObjectURL(file)}/>
                </audio>
                <img className="trash" data-id={index} 
                  onClick={this.removeFile}
                  src={trash}
                />
                </div>
              )
            } else if(video.test(file.type)){
              return (
                <div className="file-thumbnails">
                <video key={uuid()}
                  className="video-types"
                  preload controls
                >
                  <source src={window.URL.createObjectURL(file)} />
                </video>
                <img className="trash" data-id={index} 
                  onClick={this.removeFile}
                  src={trash}
                />
                </div>
              )
            } else if(urls.test(file)){
              return (
                <div className="file-thumbnails"
                key={uuid()}
              >
                <object data={file}
                className="object-types"
                >Not Supported</object>
                <img className="trash" data-id={index} 
                  onClick={this.removeFile}
                  src={trash}
                />
              </div>
              )
            }
              return(
                <div className="file-thumbnails"
                  key={uuid()}
                >
                  <object data={window.URL.createObjectURL(file)}
                  type={file.type}
                  className="object-types"
                  >Not Supported</object>
                  <img className="trash" data-id={index} 
                    onClick={this.removeFile}
                    src={trash}
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
                <img className="camera" src={camera}/>
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
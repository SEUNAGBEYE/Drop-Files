import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import DropFile, { uploadToCloudinary } from '../index';
import '../public/styles/example.scss';
import '../public/font-awesome-4.7.0/scss/font-awesome.scss'


/**
 * @description Example Component
 * 
 * @className DropFile
 * @extends {Component}
 */
class Example extends Component{
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
    }
  }

  uploadToCloudinary = async (event) => {
    event.preventDefault()
    this.setState({ fileUploading: true })
    const { files } = this.state;
    const uploadedFiles = await uploadToCloudinary(files);
    this.setState({ fileUploading: false, files: [], uploadedFiles })
  }

  /**
   * 
   * 
   * @returns {Jsx} Jsx
   * @memberof DropFile
   */
  render(){
      return (
        <div>
          <button type="button" className="btn btn-primary" 
          data-toggle="modal" data-target="#exampleModalCenter"
        >
          Launch demo modal
        </button>

        <div className="modal fade"
          id="exampleModalCenter" tabIndex="-1" role="dialog" 
          aria-labelledby="exampleModalCenterTitle" aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Upload Files
                </h5>
                <button type="button" className="close" data-dismiss="modal" 
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <DropFile that={this}/>
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
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                 data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary"
                id="uploadButton"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
}


export default Example;
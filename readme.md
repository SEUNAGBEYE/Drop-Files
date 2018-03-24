[![Maintainability](https://api.codeclimate.com/v1/badges/f476de1c543cb436c232/maintainability)](https://codeclimate.com/github/SEUNAGBEYE/Drop-Files/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f476de1c543cb436c232/test_coverage)](https://codeclimate.com/github/SEUNAGBEYE/Drop-Files/test_coverage)
[![Build Status](https://travis-ci.org/SEUNAGBEYE/Drop-Files.svg?branch=master)](https://travis-ci.org/SEUNAGBEYE/Drop-Files)
## Drop Files

Drop File is a simple react component that allows you select files from your computer.

With Drop File you can select multiple files from your computer or simply drag and drop them, and you also get an instant preview of the files selected from your computer.

## Cloudinary Support

The awesome thing about this library is that developers who uses cloudinary for files upload can also upload their files to cloudinary stress-free. 

## Media Support
List of media files supported at the moment are :

* jpg
* jpeg
* png
* pdf
* mp3
* mp4
* audio/video


 ## Installation

- npm i dropfiles

  create ```.env file```,  add your ```CLOUDINARY_UPLOAD_PRESET = your cloudinary preset``` and ```CLOUDINARY_UPLOAD_URL= your cloudinary upload url```.
 

 


## Usage
  ```
  import React, Component from 'react'
  import DropFile, { uploadToCloudinary } from dropfiles

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
      showFilePreviewer: false,
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

  ```  

The ```Example Component is your own component```, all you need to do is instantiate the Drop File Component and pass in the props ```that``` which is the ```this``` of the your own component and you're good to go. i.e  ```<DropFile that={this} />```

## Uploading files to Cloudinary
To upload your files to cloudinary all you have to do is import the ```uploadToCloudinary``` function and have a state name ```files``` which should be an array, and call the ```uploadToCloudinary``` function and pass in the ```files``` as an argument. The ```uploadToCloudinary``` function returns a promise and the data from the promise contains an array called ```uploadedFiles``` which is an array of urls for the files uploaded to cloudinary.
# FAQ

* Who can contribute ?

  `Anyone`

* How do I contribute?

  Check the [CONTRIBUTING.md](https://github.com/SEUNAGBEYE/Drop-Files/blob/master/CONTRIBUTING.md) file to see how to contribute. Thank you


## Author 
____

Seun Agbeye [SEUNAGBEYE](https://github.com/SEUNAGBEYE/)

## License 
____

This is licensed for your use, modification and distribution under the [MIT LICENSE](https://github.com/SEUNAGBEYE/Drop-Files/blob/master/LICENSE)

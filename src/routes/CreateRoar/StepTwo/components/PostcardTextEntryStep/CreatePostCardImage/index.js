import React from 'react';
import PropTypes from 'prop-types';
import Desktop_User from '../../../../../../assets/images/userpic/desktop.svg';
import Mobile_User from '../../../../../../assets/images/userpic/mobile.svg';
import Icon from '../../../../../../common/components/Icon';
import Dropzone from 'react-dropzone';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import _ from 'lodash';
import './index.css';

export default class CreatePostCardImage extends React.Component {

  static propTypes = {
    uploadPhoto: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      file: {},
      isCropMode: false,
      crop: {
        x: 0,
        y: 0,
      },
      pixelCrop: {}
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentWillUnmount () {
    const {preview} = this.state;
    if(preview) {
      window.URL.revokeObjectURL(preview);
    }
  }



  handleFileUpload = (files) => {
    // const { uploadPhoto } = this.props;
    // const filePreview = _.get(files, '0.preview', false);
    const self = this;

    window.loadImage.parseMetaData(files[0], function(data) {
      let orientation = 0;
      if (data.exif) {
        orientation = data.exif.get('Orientation');
      }

      window.loadImage(
        files[0],
        (canvas) => {
          // const base64data = canvas.toDataURL('image/jpeg');
          // const imgSrc = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
          canvas.toBlob((blob)=> {
            const url = URL.createObjectURL(blob);
            self.setState({
              preview: url, //filePreview,
              isCropMode: true,
              file: blob //base64data //files[0]
            });
          },
          'image/jpeg');
        }, {
          //should be set to canvas : true to activate auto fix orientation
          canvas: true,
          orientation: orientation
        }
      );
    });



    // files.forEach(file => {
    //   uploadPhoto({photo: file}); //fileAsBinaryString
    //   NOTE KEEPING THE BELOW FOR INSURANCE IN CASE THE FIX IS A FLUKE
    //   console.log('file is', file);
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     const fileAsBinaryString = reader.result;
    //     console.log('file has been read baby', fileAsBinaryString)
    //     if(fileAsBinaryString) {
    //
    //     }
    //   };
    //   reader.onabort = () => console.log('file reading was aborted');
    //   reader.onerror = () => console.log('file reading has failed');
    //
    //   reader.readAsBinaryString(file);
    // });
  };

  onImageLoaded = (image) => {
    this.setState({
      crop: makeAspectCrop({
        x: 0,
        y: 0,
        aspect: 1
      }, image.width / image.height),
      image,
    });
  };

  onCropComplete = (crop, pixelCrop) => {
    // console.log('crop is', crop);
    // console.log('onCropComplete, pixelCrop:', pixelCrop);
    this.setState({pixelCrop});
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  turnOnCropMode = () => {
    this.setState({
      isCropMode: true
    });
  };

  saveCrop = () => {
    const {
      uploadPhoto
    } = this.props;

    uploadPhoto({
      photo: this.state.file,
      pixelCrop: !_.isEmpty(this.state.pixelCrop) ? this.state.pixelCrop : false
    });

    this.setState({
      isCropMode: false
    });
  };

  formatImagePreview = () => {
    const {
      personalImageUrl
    } = this.props;
    if(this.state.preview || personalImageUrl) {
      return {
        background: `url(${personalImageUrl ? personalImageUrl : this.state.preview}) no-repeat center center fixed`,
        backgroundSize: '300px',
      };
    } else {
      return {};
    }
  }
  //style={this.formatImagePreview()}
  removeImageHandler = () => {
    const {
      removeImage
    } = this.props;

    this.setState({
      preview: false
    });

    removeImage({destination: 'roar'});

    if(this.state.preview){
      window.URL.revokeObjectURL(this.state.preview);
    }
  };

  render(){
    let dropzoneRef;
    // const {preview} = this.state;
    const { personalImageIsLoading, personalImageUrl } = this.props;

    return(
      <div>
        <div className="imagepart">
          {
            <React.Fragment>
              {personalImageUrl && !this.state.isCropMode && !personalImageIsLoading &&
                <div className={'avatar_user'}>
                  <img alt='preview avi' className='image-preview' src={`${personalImageUrl ? personalImageUrl : this.state.preview}`} />
                </div>
              }
              {!personalImageUrl && !this.state.isCropMode && !personalImageIsLoading &&
                  <div className={'avatar_user'}>
                    <img src={Desktop_User} alt='User Avatar' className='desktop avatar-icon'/>
                    <img src={Mobile_User} alt='User Avatar' className='mobile avatar-icon'/>
                  </div>
              }

              {this.state.isCropMode &&
                  <React.Fragment>
                    <h4>Crop your image by clicking on it, holding down
                      your mouse, and then dragging / expanding the
                      square to frame the area you want to feature on
                      your card.</h4>
                    <ReactCrop
                      {...this.state}
                      src={this.state.preview}
                      onImageLoaded={this.onImageLoaded}
                      onComplete={this.onCropComplete}
                      onChange={this.onCropChange}
                    />
                  </React.Fragment>
              }
              {personalImageIsLoading &&
                  <div className="loading-container">
                    <Icon className="spin" name="spinner spin fa-2x"/>
                  </div>
              }
            </React.Fragment>
          }

          <div className="buttons">
            {!this.state.isCropMode && !personalImageIsLoading &&
              <React.Fragment>
                <button
                  onClick={() => {
                    dropzoneRef.open();
                  }}
                  type='button'
                >Choose image…
                </button>
                <button
                  onClick={() => {
                    this.removeImageHandler();
                  }}
                  type='button'
                >Remove image
                </button>
                {personalImageUrl && !this.state.isCropMode &&
                  <button
                    onClick={() => {
                      this.turnOnCropMode();
                    }}
                    type='button'
                  >Crop image
                  </button>
                }
              </React.Fragment>
            }
            {this.state.isCropMode &&
              <button
                onClick={() => {
                  this.saveCrop();
                }}
                type='button'
              >Save Crop
              </button>
            }
          </div>
          <div className='hide'>
            <Dropzone
              ref={(node) => {
                dropzoneRef = node;
              }}
              onDrop={(accepted, rejected) => {
                this.handleFileUpload(accepted);
              }}
              accept="image/jpeg, image/png"
            />
          </div>
          <div className="clear"></div>
        </div>
        {!this.state.isCropMode && !personalImageIsLoading &&
          <div className = "instruction">
            <h3>If you'd like to add an image...</h3>
            <p>It’s easy! Just click “CHOOSE IMAGE” above to
              upload from your computer or phone, and then
              crop it to feature the section you want displayed.</p>
          </div>
        }
      </div>
    );
  }
}

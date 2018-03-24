'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../../public/styles/styles.scss');

require('../../public/font-awesome-4.7.0/scss/font-awesome.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @description Drop File Component
 * 
 * @class DropFile
 * @extends {Component}
 */
var DropFile = function (_Component) {
  _inherits(DropFile, _Component);

  function DropFile(props) {
    _classCallCheck(this, DropFile);

    var _this = _possibleConstructorReturn(this, (DropFile.__proto__ || Object.getPrototypeOf(DropFile)).call(this, props));

    _this.state = {
      fileExtensionsRegex: /\.dmg|\.apk|\.docx|\.m4a/,
      supportedFormats: {
        video: /video/,
        image: /image/,
        audio: /audio/
      }
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.dragAndDropFile = _this.dragAndDropFile.bind(_this);
    _this.removeFile = _this.removeFile.bind(_this);
    _this.renderFilePreviewer = _this.renderFilePreviewer.bind(_this);
    return _this;
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


  _createClass(DropFile, [{
    key: 'onChange',
    value: function onChange(event) {
      var _that$setState;

      event.preventDefault();
      var that = this.props.that;
      var fileExtensionsRegex = this.state.fileExtensionsRegex;
      var name = event.target.name;
      var files = event.target.files;

      var arrayOfFiles = Array.from(files);
      arrayOfFiles = arrayOfFiles.filter(function (file) {
        return !fileExtensionsRegex.test(file.name);
      });
      that.setState((_that$setState = {}, _defineProperty(_that$setState, name, [].concat(_toConsumableArray(that.state.files), _toConsumableArray(arrayOfFiles))), _defineProperty(_that$setState, 'showFilePreviewer', true), _that$setState));
    }
  }, {
    key: 'dragAndDropFile',
    value: function dragAndDropFile(event) {
      event.preventDefault();
      event.stopPropagation();
      var that = this.props.that;

      var data = event.dataTransfer;
      var fileExtensionsRegex = this.state.fileExtensionsRegex;
      var files = data.files;

      if (files.length > 0) {
        var arrayOfFiles = Array.from(files);
        arrayOfFiles = arrayOfFiles.filter(function (file) {
          return !fileExtensionsRegex.test(file.name);
        });
        that.setState({ files: [].concat(_toConsumableArray(that.state.files), _toConsumableArray(arrayOfFiles)), showFilePreviewer: true });
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

  }, {
    key: 'removeFile',
    value: function removeFile(event) {
      event.preventDefault();
      var that = this.props.that;

      var fileIndex = Number(event.target.dataset.id);
      var files = that.state.files.filter(function (files, index) {
        return index !== fileIndex;
      });
      that.setState({ files: files });
    }

    /**
     * @description render file previewer
     * 
     * @method render
     * 
     * @returns {Jsx} Jsx
     * @memberof DropFile
     */

  }, {
    key: 'renderFilePreviewer',
    value: function renderFilePreviewer() {
      var _this2 = this;

      var that = this.props.that;
      var _state = this.state,
          fileExtensionsRegex = _state.fileExtensionsRegex,
          _state$supportedForma = _state.supportedFormats,
          image = _state$supportedForma.image,
          video = _state$supportedForma.video,
          audio = _state$supportedForma.audio;

      window.URL = window.URL || window.webkitURL;
      return that.state.files.length > 0 ? _react2.default.createElement(
        'div',
        { id: 'filePreviewer',
          display: 'showPreviewer'
        },
        that.state.files.map(function (file, index) {
          if (image.test(file.type)) {
            return _react2.default.createElement(
              'a',
              { href: window.URL.createObjectURL(file),
                className: 'imageThumbnails',
                key: (0, _uuid2.default)()
              },
              _react2.default.createElement('img', { src: window.URL.createObjectURL(file), 'data-id': index
              }),
              _react2.default.createElement('span', { className: 'fa fa-trash', 'data-id': index,
                onClick: _this2.removeFile
              })
            );
          } else if (audio.test(file.type)) {
            return _react2.default.createElement(
              'audio',
              { controls: true, key: (0, _uuid2.default)() },
              _react2.default.createElement('source', { src: window.URL.createObjectURL(file) })
            );
          } else if (video.test(file.type)) {
            return _react2.default.createElement(
              'video',
              { className: 'imageThumbnails', key: (0, _uuid2.default)(),
                preload: true, controls: true
              },
              _react2.default.createElement('source', { src: window.URL.createObjectURL(file) })
            );
          }
          return _react2.default.createElement(
            'div',
            { className: 'fileThumbnails',
              key: (0, _uuid2.default)()
            },
            _react2.default.createElement(
              'object',
              { data: window.URL.createObjectURL(file),
                type: file.type
              },
              'Not Supported'
            ),
            _react2.default.createElement('span', { className: 'fa fa-trash', 'data-id': index,
              onClick: _this2.removeFile
            })
          );
        })
      ) : '';
    }
  }, {
    key: 'render',


    /**
     * 
     * 
     * @returns {Jsx} Jsx
     * @memberof DropFile
     */
    value: function render() {
      return _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(
          'div',
          null,
          this.renderFilePreviewer(),
          _react2.default.createElement(
            'label',
            { id: 'selectFileContainer', htmlFor: 'file',
              onDragEnter: this.dragAndDropFile,
              onDragOver: this.dragAndDropFile,
              onDrop: this.dragAndDropFile
            },
            _react2.default.createElement(
              'span',
              null,
              'Drag & Drop files'
            ),
            _react2.default.createElement('span', { className: 'fa fa-camera' }),
            _react2.default.createElement(
              'span',
              null,
              'Or Click'
            )
          ),
          _react2.default.createElement('input', { type: 'file', style: { display: "none" }, name: 'files',
            multiple: true,
            id: 'file', onChange: this.onChange
          })
        )
      );
    }
  }]);

  return DropFile;
}(_react.Component);

var propTypes = {
  that: _propTypes2.default.object.isRequired
};

DropFile.propTypes = propTypes;

exports.default = DropFile;
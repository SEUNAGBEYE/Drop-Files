'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cloudinaryUploadUrl = _config2.default.cloudinaryUploadUrl,
    cloudinaryUploadPreset = _config2.default.cloudinaryUploadPreset;

/**
 * @description - Upload Media
 *
 * @param {Object} files
 * @returns {Promise} Promise
 */

var uploadToCloudinary = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(files) {
    var imageData, imageUrls;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imageData = new FormData();
            imageUrls = [];
            return _context2.abrupt('return', new Promise(function (resolve, reject) {
              files.map(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
                  var imageUrl;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          imageData.append('file', file);
                          imageData.append('upload_preset', cloudinaryUploadPreset);

                          _context.prev = 2;
                          _context.next = 5;
                          return (0, _axios2.default)({
                            url: cloudinaryUploadUrl,
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/x-www-form.urlencoded',
                              'X-Requested-With': 'XMLHttpRequest'
                            },
                            data: imageData,
                            return_delete_token: 1
                          });

                        case 5:
                          imageUrl = _context.sent;

                          imageUrls.push(imageUrl.data.secure_url);

                          if (!(files.length === imageUrls.length)) {
                            _context.next = 9;
                            break;
                          }

                          return _context.abrupt('return', resolve(imageUrls));

                        case 9:
                          _context.next = 14;
                          break;

                        case 11:
                          _context.prev = 11;
                          _context.t0 = _context['catch'](2);
                          return _context.abrupt('return', reject(_context.t0));

                        case 14:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined, [[2, 11]]);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }));

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function uploadToCloudinary(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = uploadToCloudinary;
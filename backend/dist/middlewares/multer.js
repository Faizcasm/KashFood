"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = exports.upload = (0, _multer["default"])({
  storage: storage
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delivered = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var deliverySchema = new _mongoose["default"].Schema({
  name: String,
  email: String,
  address: String,
  pincode: String,
  phone: String
}, {
  timestamps: true
});
var delivered = exports.delivered = _mongoose["default"].model('delivery', deliverySchema);
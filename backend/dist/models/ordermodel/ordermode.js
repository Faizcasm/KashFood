"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orders = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var orderschema = new _mongoose["default"].Schema({
  data: Array
});
var orders = exports.orders = _mongoose["default"].model('orders', orderschema);
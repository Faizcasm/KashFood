"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoodItems = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var foodSchema = new _mongoose["default"].Schema({
  foodImg: String,
  foodName: String,
  foodDescription: String,
  foodCategory: String,
  foodPrice: Number
}, {
  timestamps: true
});
var FoodItems = exports.FoodItems = _mongoose["default"].model('fooditems', foodSchema);
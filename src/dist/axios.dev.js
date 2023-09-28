"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _TokenContext = require("./TokenContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// src/axios.js (Create a new file for Axios configuration)
// Create a new Axios instance with default headers
var instance = _axios["default"].create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
}); // Add an interceptor to include the token in the header


instance.interceptors.request.use(function (config) {
  var _useToken = (0, _TokenContext.useToken)(),
      token = _useToken.token; // Access the token within a functional component


  if (token) {
    config.headers.Authorization = "Bearer ".concat(token);
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
var _default = instance;
exports["default"] = _default;
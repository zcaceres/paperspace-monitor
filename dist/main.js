/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack:///./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\nvar btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ \"./node_modules/axios/lib/helpers/btoa.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n    var loadEvent = 'onreadystatechange';\n    var xDomain = false;\n\n    // For IE 8/9 CORS support\n    // Only supports POST and GET calls and doesn't returns the response headers.\n    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.\n    if (\"development\" !== 'test' &&\n        typeof window !== 'undefined' &&\n        window.XDomainRequest && !('withCredentials' in request) &&\n        !isURLSameOrigin(config.url)) {\n      request = new window.XDomainRequest();\n      loadEvent = 'onload';\n      xDomain = true;\n      request.onprogress = function handleProgress() {};\n      request.ontimeout = function handleTimeout() {};\n    }\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request[loadEvent] = function handleLoad() {\n      if (!request || (request.readyState !== 4 && !xDomain)) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)\n        status: request.status === 1223 ? 204 : request.status,\n        statusText: request.status === 1223 ? 'No Content' : request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?\n          cookies.read(config.xsrfCookieName) :\n          undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (config.withCredentials) {\n      request.withCredentials = true;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(utils.merge(defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = utils.merge({\n      url: arguments[0]\n    }, arguments[1]);\n  }\n\n  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);\n  config.method = config.method.toLowerCase();\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Support baseURL config\n  if (config.baseURL && !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  }\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers || {}\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n  error.request = request;\n  error.response = response;\n  return error;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  // Note: status is not exposed by XDomainRequest\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction E() {\n  this.message = 'String contains an invalid character';\n}\nE.prototype = new Error;\nE.prototype.code = 5;\nE.prototype.name = 'InvalidCharacterError';\n\nfunction btoa(input) {\n  var str = String(input);\n  var output = '';\n  for (\n    // initialize result and counter\n    var block, charCode, idx = 0, map = chars;\n    // if the next str index does not exist:\n    //   change the mapping table to \"=\"\n    //   check if d has no fractional digits\n    str.charAt(idx | 0) || (map = '=', idx % 1);\n    // \"8 - idx % 1 * 8\" generates the sequence 2, 4, 6, 8\n    output += map.charAt(63 & block >> 8 - idx % 1 * 8)\n  ) {\n    charCode = str.charCodeAt(idx += 3 / 4);\n    if (charCode > 0xFF) {\n      throw new E();\n    }\n    block = block << 8 | charCode;\n  }\n  return output;\n}\n\nmodule.exports = btoa;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/btoa.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%40/gi, '@').\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n  (function standardBrowserEnv() {\n    return {\n      write: function write(name, value, expires, path, domain, secure) {\n        var cookie = [];\n        cookie.push(name + '=' + encodeURIComponent(value));\n\n        if (utils.isNumber(expires)) {\n          cookie.push('expires=' + new Date(expires).toGMTString());\n        }\n\n        if (utils.isString(path)) {\n          cookie.push('path=' + path);\n        }\n\n        if (utils.isString(domain)) {\n          cookie.push('domain=' + domain);\n        }\n\n        if (secure === true) {\n          cookie.push('secure');\n        }\n\n        document.cookie = cookie.join('; ');\n      },\n\n      read: function read(name) {\n        var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n        return (match ? decodeURIComponent(match[3]) : null);\n      },\n\n      remove: function remove(name) {\n        this.write(name, '', Date.now() - 86400000);\n      }\n    };\n  })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return {\n      write: function write() {},\n      read: function read() { return null; },\n      remove: function remove() {}\n    };\n  })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n  (function standardBrowserEnv() {\n    var msie = /(msie|trident)/i.test(navigator.userAgent);\n    var urlParsingNode = document.createElement('a');\n    var originURL;\n\n    /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n    function resolveURL(url) {\n      var href = url;\n\n      if (msie) {\n        // IE needs attribute set twice to normalize properties\n        urlParsingNode.setAttribute('href', href);\n        href = urlParsingNode.href;\n      }\n\n      urlParsingNode.setAttribute('href', href);\n\n      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n      return {\n        href: urlParsingNode.href,\n        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n        host: urlParsingNode.host,\n        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n        hostname: urlParsingNode.hostname,\n        port: urlParsingNode.port,\n        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n                  urlParsingNode.pathname :\n                  '/' + urlParsingNode.pathname\n      };\n    }\n\n    originURL = resolveURL(window.location.href);\n\n    /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n    return function isURLSameOrigin(requestURL) {\n      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n      return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n    };\n  })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return function isURLSameOrigin() {\n      return true;\n    };\n  })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/alarms/index.js":
/*!************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/alarms/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global chrome browser */\n\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Creates a new alarm.\n * @see [Firefox Alarms](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/alarms/create) or [Chrome Alarms](https://developer.chrome.com/extensions/alarms#method-create)\n * @memberof alarms\n * @param  {?String} name           Optional name to identify alarm.\n * @param  {?Object} optionalParams Object of shape { when: {Number}, delayInMinutes: {Number}, periodInMinutes: {Number} }. Describes when the alarm should fire. The initial time must be specified by either when or delayInMinutes (but not both). If periodInMinutes is set, the alarm will repeat every periodInMinutes minutes after the initial event. If neither when or delayInMinutes is set for a repeating alarm, periodInMinutes is used as the default for delayInMinutes.\n * @return {Promise<undefined>}     Promise resolved with undefined or rejected with an error.\n */\nfunction create(name, optionalParams) {\n  return (0, _utils2.default)(chrome.alarms.create, browser.alarms.create, name, _extends({}, optionalParams));\n}\n\n/**\n * Gets an alarm, given its name.\n * @memberof alarms\n * @param  {?String} name        Optional. The name of the alarm to get. Defaults to the empty string.\n * @return {Promise<Alarm>}      A Promise resolved with an Alarm object or rejected with an error. If resolved, value represents the alarm whose name matches name. If no alarms match, this will be undefined.\n */\nfunction get(name) {\n  return (0, _utils2.default)(chrome.alarms.get, browser.alarms.get, name);\n}\n\n/**\n * Gets all active alarms for the extension.\n * @memberof alarms\n * @return {Promise<Array<Alarm>>} Promise resolved with an array of Alarm objects or rejected with an error. Resolves with empty array if no alarms are active.\n */\nfunction getAll() {\n  return (0, _utils2.default)(chrome.alarms.getAll, browser.alarms.getAll);\n}\n\n/**\n * Clears the alarm with the given name.\n * @memberof alarms\n * @param  {String} name           Name of the alarm to cancel. Default is empty string.\n * @return {Promise<Boolean>}      Promise resolved with true if alarm was cleared or false if not cleared, or rejected with an error.\n */\nfunction clear(name) {\n  return (0, _utils2.default)(chrome.alarms.clear, browser.alarms.clear, name);\n}\n\n/**\n * Cancels all active alarms.\n * @memberof alarms\n * @see [MDN on clearAll](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/alarms/clearAll)\n * @return {Promise<Boolean>} Promise resolved with true if any alarms were cleared or false otherwise. Or, rejected with an error.\n */\nfunction clearAll() {\n  return (0, _utils2.default)(chrome.alarms.clearAll, browser.alarms.clearAll);\n}\n\nexports.default = {\n  clear: clear,\n  clearAll: clearAll,\n  create: create,\n  get: get,\n  getAll: getAll\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/alarms/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/badge/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/extension-helpers/lib/badge/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * A BadgeManager object for controlling the badges on your extension's Browser Action toolbar icon.\n * Should be used as a singleton, since it tracks the state of your extension's badges.\n * @param {String} badgeColor The hex code of the color for your badge\n */\nvar BadgeManager = function () {\n  function BadgeManager(badgeColor) {\n    _classCallCheck(this, BadgeManager);\n\n    this.badgeNum = 0;\n    window.browser.browserAction.setBadgeBackgroundColor({ color: badgeColor || '#E77171' });\n  }\n\n  /**\n   * Add a number to your badge's current value\n   * @param {Number} num The number to add to your badge\n   * @return {undefined} nothing\n   */\n\n\n  _createClass(BadgeManager, [{\n    key: 'add',\n    value: function add(num) {\n      var numToAdd = Number(num) || 1;\n      this.badgeNum += numToAdd;\n      window.browser.browserAction.setBadgeText({ text: this.badgeNum.toString() });\n    }\n\n    /**\n     * Subtract a number from your badge's current value\n     * @param  {Number} num The number to subtract\n     * @return {undefined}  nothing\n     */\n\n  }, {\n    key: 'subtract',\n    value: function subtract(num) {\n      var numToAdd = Number(num) || 1;\n      this.badgeNum -= numToAdd;\n      window.browser.browserAction.setBadgeText({ text: this.badgeNum.toString() });\n    }\n\n    /**\n     * Clear your badge\n     * @return {undefined} nothing\n     */\n\n  }, {\n    key: 'clear',\n    value: function clear() {\n      window.browser.browserAction.setBadgeText({ text: '' });\n      this.badgeNum = 0;\n    }\n  }]);\n\n  return BadgeManager;\n}();\n\nexports.default = BadgeManager;\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/badge/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/cookie/index.js":
/*!************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/cookie/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global chrome browser */\n\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Get a cookie by name for a given url.\n * @see [How Chrome handles](https://developer.chrome.com/extensions/cookies#method-get) cookies with the same name\n * @memberof cookie\n * @param  {String} url             URL of site to get cookie from\n * @param  {String} name            Name of cookie to get\n * @param  {?String} storeId The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used.\n * @return {Promise<Cookie>}        Promise resolved with Cookie object or rejected with error\n */\nfunction get(url, name, storeId) {\n  return (0, _utils2.default)(chrome.cookies.get, browser.cookies.get, { url: url, name: name, storeId: storeId });\n}\n\n/**\n * Set a cookie by name for a given url.\n * @memberof cookie\n * @see [How Chrome handles](https://developer.chrome.com/extensions/cookies#method-set) cookies with the same name\n * @param  {String} url             URL of site to get cookie from\n * @param  {String} name            Name of cookie to get\n * @param  {String} value           Value of cookie\n * @param  {?Object} optionalParamsObj See [Chrome docs](https://developer.chrome.com/extensions/cookies#method-set) for details of this object\n * @return {Promise<Cookie>}        Promise resolved with Cookie object or rejected with error\n */\nfunction set(url, name, value, optionalParamsObj) {\n  var params = _extends({ url: url, name: name, value: value }, optionalParamsObj);\n  return (0, _utils2.default)(chrome.cookies.set, browser.cookies.set, params);\n}\n\n/**\n * Get all cookies by name for a given url\n * @memberof cookie\n * @param  {?String} url               Optional url to get cookies from\n * @param  {?String} name              Optional name of cookie to get from url\n * @param  {?Object} optionalParamsObj Optional parameters, see [Chrome docs](https://developer.chrome.com/extensions/cookies#method-getAll) for specifics of other params\n * @return {Promise<Array<Cookie>>}   Promise resolved with array of Cookie objects or rejected with an error\n */\nfunction getAll(url, name, optionalParamsObj) {\n  var params = _extends({ url: url, name: name }, optionalParamsObj);\n  return (0, _utils2.default)(chrome.getAll, browser.getAll, params);\n}\n\n/**\n * Remove a cookie by name for a given url\n * @param  {String} url             URL of site to remove cookie from\n * @memberof cookie\n * @param  {String} name            Name of cookie to remove\n * @param  {?String} storeId The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used.\n * @return {Promise<Object>}        Promise resolved with details of cookie that has been removed or rejected with error\n */\nfunction remove(url, name, storeId) {\n  var params = { url: url, name: name, storeId: storeId };\n  return (0, _utils2.default)(chrome.cookies.remove, browser.cookies.remove, params);\n}\n\n/**\n * Lists all existing cookie stores.\n * @memberof cookie\n * @return {Promise<Array<CookieStore>>} Promise resolved with an array of CookieStore objects or rejected with an error.\n */\nfunction getAllCookieStores() {\n  return (0, _utils2.default)(chrome.cookies.getAllCookieStores, browser.cookies.getAllCookieStores);\n}\n\nexports.default = {\n  get: get,\n  getAll: getAll,\n  getAllCookieStores: getAllCookieStores,\n  set: set,\n  remove: remove\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/cookie/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/extensions/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/extensions/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Get information about the calling extension\n * @memberof extension\n * @return {Promise<ExtensionInfo>} Object with info about the extension\n */\nfunction self() {\n  return (0, _utils2.default)(chrome.management.getSelf, browser.management.getSelf);\n}\n\n/**\n * Get a list of permission warnings for the given extension id\n * @memberof extension\n * @param  {String} id                 The browser-assigned id of the extension\n * @return {Promise<Array<String>>}    Promised resolved with array of permission warnings or rejected with error\n */\n/* global browser chrome */\nfunction permissionWarningsById(id) {\n  return (0, _utils2.default)(chrome.management.getPermissionWarningsById, browser.management.getPermissionWarningsById, id);\n}\n\n/**\n * Get a list of permission warnings for the given extension manifest string\n * @memberof extension\n * @param  {String} manifestStr         Extension manifest JSON string.\n * @return {Promise<Array<String>>}     Promised resolved with array of permission warnings or rejected with error\n */\nfunction permissionWarningsByManifest(manifestStr) {\n  return (0, _utils2.default)(chrome.management.getPermissionWarningsByManifest, browser.management.getPermissionWarningsByManifest, manifestStr);\n}\n\n/**\n * Enable (activate) a browser extension\n * @memberof extension\n * @param  {String} id The browser-assigned id of the extension\n * @return {Promise<Boolean>} Promise resolved with true if successful or rejected with error\n */\nfunction enable(id) {\n  return (0, _utils2.default)(chrome.management.setEnabled, browser.management.setEnabled, id, true);\n}\n\n/**\n * Disable (deactivate) a browser extension\n * @memberof extension\n * @param  {String} id The Browser-assigned id of the extension\n * @return {Promise<Boolean>} Promise resolved with false if successful or rejected with error\n */\nfunction disable(id) {\n  return (0, _utils2.default)(chrome.management.setEnabled, browser.management.setEnabled, id, false);\n}\n\n/**\n * Get all currently installed browser extension\n * @memberof extension\n * @return {Promise<Array<ExtensionInfo>>} Promise resolved with array of browser extension information objects, or rejected with error\n */\nfunction getAll() {\n  return (0, _utils2.default)(chrome.management.getAll, browser.management.getAll);\n}\n\n/**\n * Get a browser by extension id\n * @memberof extension\n * @param  {String} id Browser-assigned extension id\n * @return {Promise<ExtensionInfo>} Promise resolved with browser extension information object or rejected with an error\n */\nfunction get(id) {\n  return (0, _utils2.default)(chrome.management.get, browser.management.get, id);\n}\n\nexports.default = {\n  get: get,\n  getAll: getAll,\n  disable: disable,\n  enable: enable,\n  self: self,\n  permissionWarningsById: permissionWarningsById,\n  permissionWarningsByManifest: permissionWarningsByManifest\n  // uninstall,\n  // launch\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/extensions/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/history/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/history/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global browser chrome: */\n\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Search the browser history for last visit time of each page matching the query\n * @memberof history\n * @param  {String} text       A free-text query to the history service. Leave empty to retrieve all pages.\n * @param  {Number} optionalStartTime  Double. Limit results to those visited after this date, represented in milliseconds since the epoch. If not specified, this defaults to 24 hours in the past.\n * @param  {Number} optionalEndTime    Double. Limit results to those visited before this date, represented in milliseconds since the epoch.\n * @param  {Number} optionalMaxResults Integer. The maximum number of results to retrieve. Defaults to 100.\n * @return {Promise<Array<HistoryItem>>}            Promise that resolves with array of HistoryItem objects or rejects with error\n */\nfunction search(text, optionalStartTime, optionalEndTime, optionalMaxResults) {\n  var queryObj = { text: text, startTime: optionalStartTime, endTime: optionalEndTime, maxResults: optionalMaxResults };\n  return (0, _utils2.default)(chrome.history.search, browser.history.search, queryObj);\n}\n\n/**\n * Gets information about visits to a url\n * @memberof history\n * @param  {String} url                 Must be fully qualified url including protocol\n * @return {Promise<Array<VisitItem>>}  Promise that resolves with array of VisitItems or rejects with an error\n */\nfunction getVisits(url) {\n  return (0, _utils2.default)(chrome.history.getVisits, browser.history.getVisits, { url: url });\n}\n\n/**\n * Chrome: Adds a URL to the history at the current time with a transition type of \"link\".\n * Firefox: Adds a record to the browser's history of a visit to the given URL. The visit's time is recorded as the time of the call, and the TransitionType is recorded as \"link\".\n * @memberof history\n * @param {String} url                 The URL to add\n * @param {Object} optionalParams      Firefox only. Object with shape { title: {String}, transition: {TransitionType}, visitTime: {Number | String | Object} }. All optional.\n * @return {Promise<undefined>}        Promise resolved with undefined or rejected with an error.\n */\nfunction addUrl(url, optionalParams) {\n  return (0, _utils2.default)(chrome.history.addUrl, browser.history.addUrl, _extends({ url: url }, optionalParams));\n}\n\n/**\n * Removes all visits to the given URL from the browser history.\n * @memberof history\n * @param  {String} url The URL whose visits should be removed.\n * @return {Promise<undefined>}     Promise resolved with undefined or rejected with an error;\n */\nfunction deleteUrl(url) {\n  return (0, _utils2.default)(chrome.history.deleteUrl, browser.history.deleteUrl, { url: url });\n}\n\n/**\n * Sanitizes dates to numbers. String Object or Number.\n * @private\n */\nfunction sanitizeDate(date) {\n  return Number(date);\n}\n\n/**\n * Removes all items within the specified date range from the history. Pages will not be removed from the history unless all visits fall within the range.\n * @memberof history\n * @param  {Number | String | Date} startTime Items added to history after this date, represented in milliseconds since the epoch.\n * @param  {Number | String | Date} endTime   Items added to history before this date, represented in milliseconds since the epoch.\n * @return {Promise<undefined>}           Promise resolved with undefined or rejected with an error.\n */\nfunction deleteRange(startTime, endTime) {\n  // Must sanitize for Chrome because only Number (double) are supported but Firefox accepts String and Date objects as well.\n  var sanitizedStart = sanitizeDate(startTime);\n  var sanitizedEnd = sanitizeDate(endTime);\n  return (0, _utils2.default)(chrome.history.deleteRange, browser.history.deleteRange, { startTime: sanitizedStart, endTime: sanitizedEnd });\n}\n\n/**\n * Deletes all items from the history.\n * @memberof history\n * @return {Promise<undefined>} Promise resolved with undefined or rejected with an error.\n */\nfunction deleteAll() {\n  return (0, _utils2.default)(chrome.history.deleteAll, browser.history.deleteAll);\n}\n\nexports.default = {\n  addUrl: addUrl,\n  deleteUrl: deleteUrl,\n  deleteRange: deleteRange,\n  deleteAll: deleteAll,\n  getVisits: getVisits,\n  search: search\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/history/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/extension-helpers/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _cookie = __webpack_require__(/*! ./cookie */ \"./node_modules/extension-helpers/lib/cookie/index.js\");\n\nvar _cookie2 = _interopRequireDefault(_cookie);\n\nvar _badge = __webpack_require__(/*! ./badge */ \"./node_modules/extension-helpers/lib/badge/index.js\");\n\nvar _badge2 = _interopRequireDefault(_badge);\n\nvar _tabs = __webpack_require__(/*! ./tabs */ \"./node_modules/extension-helpers/lib/tabs/index.js\");\n\nvar _tabs2 = _interopRequireDefault(_tabs);\n\nvar _message = __webpack_require__(/*! ./message */ \"./node_modules/extension-helpers/lib/message/index.js\");\n\nvar _message2 = _interopRequireDefault(_message);\n\nvar _history = __webpack_require__(/*! ./history */ \"./node_modules/extension-helpers/lib/history/index.js\");\n\nvar _history2 = _interopRequireDefault(_history);\n\nvar _alarms = __webpack_require__(/*! ./alarms */ \"./node_modules/extension-helpers/lib/alarms/index.js\");\n\nvar _alarms2 = _interopRequireDefault(_alarms);\n\nvar _localStorage = __webpack_require__(/*! ./localStorage */ \"./node_modules/extension-helpers/lib/localStorage/index.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _runtime = __webpack_require__(/*! ./runtime */ \"./node_modules/extension-helpers/lib/runtime/index.js\");\n\nvar _runtime2 = _interopRequireDefault(_runtime);\n\nvar _notifications = __webpack_require__(/*! ./notifications */ \"./node_modules/extension-helpers/lib/notifications/index.js\");\n\nvar _notifications2 = _interopRequireDefault(_notifications);\n\nvar _extensions = __webpack_require__(/*! ./extensions */ \"./node_modules/extension-helpers/lib/extensions/index.js\");\n\nvar _extensions2 = _interopRequireDefault(_extensions);\n\nvar _wallpaper = __webpack_require__(/*! ./wallpaper */ \"./node_modules/extension-helpers/lib/wallpaper/index.js\");\n\nvar _wallpaper2 = _interopRequireDefault(_wallpaper);\n\nvar _windows = __webpack_require__(/*! ./windows */ \"./node_modules/extension-helpers/lib/windows/index.js\");\n\nvar _windows2 = _interopRequireDefault(_windows);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Prefix for Edge/Firefox/Chrome to access browser apis\n\n// import bookmarks from './bookmarks';\nfunction prefixBrowser() {\n  window.browser = function () {\n    return window.msBrowser || window.browser || window.chrome;\n  }();\n}\n\nprefixBrowser();\n\n// /**\n//  * Manage bookmarks\n//  * @module bookmarks\n//  */\n\n/**\n * Manage cookies in the browser\n * @module cookie\n */\n\n/**\n * Manage runtime tasks like messaging extensions\n * @module runtime\n */\n\n/**\n * Manage wallpapers\n * @module wallpaper\n */\n\n/**\n * Manage browser windows\n * @module windows\n */\n\n/**\n * Open, close, focus, blur and manage tabs.\n * @module tabs\n */\n\n/**\n  * Send messages to tabs\n  * @module message\n  */\n\n/**\n  * Manage the local storage of your browser extension\n  * @module localStorage\n  */\n\n/**\n  * Enable, disable, and manage other browser extensions\n  * @module extension\n  */\n\n/**\n  * Search and manage browser history\n  * @module history\n  */\n\n/**\n  * Send and manage browser notifications\n  * @module notifications\n  */\n\n/**\n * Schedule code to run at a specific time.\n * @module alarms\n */\n\nexports.default = {\n  alarms: _alarms2.default,\n  badgeManager: _badge2.default,\n  // bookmarks,\n  cookie: _cookie2.default,\n  extensions: _extensions2.default,\n  history: _history2.default,\n  localStorage: _localStorage2.default,\n  message: _message2.default,\n  notifications: _notifications2.default,\n  tabs: _tabs2.default,\n  runtime: _runtime2.default,\n  wallpaper: _wallpaper2.default,\n  windows: _windows2.default\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/localStorage/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/localStorage/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* global browser chrome */\n\n\n/**\n * Set a value at a given key in the extension's local storage\n * @memberof localStorage\n * @param {String} key   Key for the set value\n * @param {Any} value    Value to serialize to local storage. Objects and functions serialized to {}. Arrays, Regex, and primitives serialize correctly.\n * @return {Promise<undefined>} Promise resolved with nothing, or rejected with error\n */\nfunction set(key, value) {\n  return (0, _utils2.default)(chrome.storage.local.set, browser.storage.local.set, _defineProperty({}, key, value));\n}\n\n/**\n * Get the value for a given key in local storage\n * @memberof localStorage\n * @param  {String | Array<String> | null} key Single key to get, array of keys to get, or null to get entire contents\n * @return {Promise<Object>}     Promise resolved with object with key-value mappings or rejected with an error\n */\nfunction get(key) {\n  return (0, _utils2.default)(chrome.storage.local.get, browser.storage.local.get, key);\n}\n\nexports.default = {\n  set: set,\n  get: get\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/localStorage/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/message/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/message/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _tabs = __webpack_require__(/*! ../tabs */ \"./node_modules/extension-helpers/lib/tabs/index.js\");\n\nvar _tabs2 = _interopRequireDefault(_tabs);\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Send a message directly to tab by id\n * @memberof message\n * @param  {Number} tabId   Browser-assigned id of target tab\n * @param  {Object} message Any valid JSON-ifiable object\n * @return {Promise<Object>} Promise resolved with response or rejected with error\n */\n/* global chrome browser */\nfunction tab(tabId, message) {\n  return sendMessage(tabId, message);\n}\n\n/**\n * Sends a message to all tabs in any window\n * @memberof message\n * @param  {Object} message Any valid JSON-ifiable object\n * @return {Promise<Array<Tab>>} Promise resolved with array of responses from tabs that were sent a message or rejected with an error\n */\nfunction allTabs(message) {\n  return _tabs2.default.getAll().then(function (tabs) {\n    return manyTabs(tabs, message);\n  });\n}\n\n/**\n * Sends a message to tabs that are considered 'active' (focused) for all open browser windows\n * @memberof message\n * @param  {Object} message Any valid JSON-ifiable object\n * @return {Promise<Array<Tab>>} Promise resolved with array of responses from tabs that were sent a message rejected with an error\n */\nfunction activeTabs(message) {\n  return _tabs2.default.getAllActive().then(function (tabs) {\n    return manyTabs(tabs, message);\n  });\n}\n\n/**\n * Send a message to an array of tabs\n * @memberof message\n * @param  {Array<Tab>} tabArr                Array of Tab objects to send message to\n * @param  {Object} message                   Any valid JSON-ifiable object\n * @return {Promise<Array<Object>>}           Promise resolved with array of responses from messages or rejected with an error\n */\nfunction manyTabs(tabArr, message) {\n  return Promise.all(tabArr.map(function (tab) {\n    return sendMessage(tab.id, message);\n  }));\n}\n\n/**\n * Send message to active (focused) tab in the current window.\n * @memberof message\n * @param  {Object} message Any valid JSON-ifiable object\n * @return {Promise<Object>} Promise resolved with response from tab or rejected with an error\n */\nfunction activeTab(message) {\n  return _tabs2.default.getActive().then(function (tab) {\n    return sendMessage(tab.id, message);\n  });\n}\n\n/**\n * Helper for sending message to a tab by id\n * @private\n * @memberof message\n * @param  {String} tabId   Browser-assigned id of target tab\n * @param  {Object} message Any valid JSON-ifiable object\n * @return {Promise<Object>} Promise resolved with response from tab or rejected with an error\n */\nfunction sendMessage(tabId, message) {\n  return (0, _utils2.default)(chrome.tabs.sendMessage, browser.tabs.sendMessage, tabId, message);\n}\n\nexports.default = {\n  tab: tab,\n  activeTab: activeTab,\n  allTabs: allTabs,\n  manyTabs: manyTabs,\n  activeTabs: activeTabs\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/message/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/notifications/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/notifications/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Create and display a new notification\n * @see [NotificationsOptions](https://developer.chrome.com/extensions/notifications#type-NotificationOptions)\n * @memberof notifications\n * @param  {String?} notificationId optional id to assign notification. If empty will be automatically generated\n * @param  {Object} options         NotificationsOptions object\n * @return {Prromise<String>}       id of created notification\n */\nfunction create(notificationId, options) {\n  return (0, _utils2.default)(chrome.notifications.create, browser.notifications.create, notificationId, options);\n}\n\n/**\n * Update existing notification\n * @see [NotificationsOptions](https://developer.chrome.com/extensions/notifications#type-NotificationOptions)\n * @memberof notifications\n * @param  {String} notificationId id of notification to update\n * @param  {Object} options        NotificationOptions object\n * @return {Promise<Boolean>}      Boolean wasUpdated indicating whether notification was updated\n */\n/* global browser chrome */\nfunction update(notificationId, options) {\n  return (0, _utils2.default)(chrome.notifications.update, browser.notifications.update, notificationId, options);\n}\n\n/**\n * Clear specified notification\n * @see [NotificationsOptions](https://developer.chrome.com/extensions/notifications#type-NotificationOptions)\n * @memberof notifications\n * @param  {String} notificationId id of notification to clear\n * @return {Promise<Boolean>}      Boolean wasCleared specifying whether the matching notification existed\n */\nfunction clear(notificationId) {\n  return (0, _utils2.default)(chrome.notifications.clear, browser.notifications.clear);\n}\n\n/**\n * Get all notifications\n * @memberof notifications\n * @return {Promise<Object>>} Promise resolved with an object containing notification ids in the system or rejected with an error.\n */\nfunction getAll() {\n  return (0, _utils2.default)(chrome.notifications.getAll, browser.notifications.getAll);\n}\n\n/**\n * Retrieves whether the user has enabled notifications from the app/extension\n * @return {} [description]\n */\n// Not yet supported in FF\n// function getPermissionLevel() {\n//   return PromiseFactory(chrome.notifications.getAll, browser.notifications.getAll);\n// }\n\nexports.default = {\n  create: create,\n  update: update,\n  clear: clear,\n  getAll: getAll\n  // getPermissionLevel\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/notifications/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/runtime/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/runtime/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Sends a message to an extension identified by its id\n * @see https://developer.chrome.com/extensions/runtime#method-sendMessage\n * @memberof runtime\n * @param  {?String} extensionId optional extension id\n * @param  {String} msg         Any JSON-ifiable object\n * @param  {[type]} options     options\n * @return {Promise<Object>}    Promise resolved with response from tab or rejected with an error\n */\nfunction sendMessage(extensionId, msg) {\n  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n  return (0, _utils2.default)(chrome.runtime.sendMessage, browser.runtime.sendMessage, extensionId, msg, options);\n} /* global chrome browser */\nexports.default = {\n  sendMessage: sendMessage\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/runtime/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/tabs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/extension-helpers/lib/tabs/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }(); /* global browser chrome */\n\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * Forces browser focus on given tab\n * @memberof tabs\n * @param {number | Array<number>} tabId id of chrome tab\n * @returns {Promise<Object>} resolved with tabDetails object or rejected with error\n */\nfunction focus(tabId) {\n  return (0, _utils2.default)(chrome.tabs.update, browser.tabs.update, tabId, { active: true });\n}\n\n/**\n * Closes a tab by tab id\n * @memberof tabs\n * @param  {number}  tabIds an array\n * @return {Promise<undefined>} Promise resolved with undefined or rejected with error\n */\nfunction close(tabIds) {\n  return (0, _utils2.default)(chrome.tabs.remove, browser.tabs.remove, tabIds);\n}\n\n/**\n * Gets currently active tab (the tab focused in current browser window)\n * @memberof tabs\n * @return {Promise<Object>} tab object\n */\nfunction getActive() {\n  return (0, _utils2.default)(chrome.tabs.query, browser.tabs.query, { active: true, currentWindow: true }).then(function (tabs) {\n    var _tabs = _slicedToArray(tabs, 1),\n        tab = _tabs[0];\n\n    return tab;\n  });\n}\n\n/**\n * Execute a file or code on a given tab\n * @memberof tabs\n * @param  {String} toInject file name or raw code to execute\n * @param  {String} typeToInject valid params are \"code\" or \"file\"\n * @return {Promise<Object>} any results of the injected code's execution\n */\nfunction executeOnActive(toInject, typeToInject) {\n  return getActive().then(function (tab) {\n    return executeScript(tab.id, toInject, typeToInject);\n  });\n}\n\n/**\n * Open a new tab optionally blurred or focused, and return the new tab's id.\n * @memberof tabs\n * @param  {String} url the url you want the new tab to show\n * @param  {Boolean} active should browser focus on the new tab\n * @return {Promise<Object>} resolved with the newly opened tab or rejected with error\n */\nfunction open(url, active) {\n  return (0, _utils2.default)(chrome.tabs.create, browser.tabs.create, { url: url, active: active });\n}\n\n/**\n * Get active tabs in all browser windows\n * @memberof tabs\n * @return {Promise<Array<Object>>} Promise resolved with an array of all active tab objects or rejected with an error\n */\nfunction getAllActive() {\n  return (0, _utils2.default)(chrome.tabs.query, browser.tabs.query, { active: true });\n}\n\n/**\n * Get all tabs\n * @memberof tabs\n * @return {Promise<Array<Object>>} Promise resolved with all tabs or rejected with an error\n */\nfunction getAll() {\n  return (0, _utils2.default)(chrome.tabs.query, browser.tabs.query, {});\n}\n\n/**\n * Execute raw js or a script by filename on all tabs\n * @memberof tabs\n * @param  {String} toInject file name or raw code to execute\n * @param  {String} typeToInject valid params are \"code\" or \"file\"\n * @return {Array<Promise<Object>>} Array Promises resolved with any results of the injected code's execution or rejected with an error\n */\nfunction executeOnAll(toInject, typeToInject) {\n  return getAll().then(function (tabs) {\n    var tabIds = tabs.map(function (tab) {\n      return tab.id;\n    });\n    var results = [];\n    tabIds.forEach(function (tabId) {\n      results.push(executeScript(tabId, toInject, typeToInject));\n    });\n    return results;\n  });\n}\n\n/**\n * Executes a file or inline code as a string on all the active tabs of all windows.\n * @memberof tabs\n * @param  {String} toInject file name or raw code to execute\n * @param  {String} typeToInject valid params are \"code\" or \"file\"\n * @return {Array<Promise<Object>>} Array of Promises resolved with any results of the injected code's execution or rejected with an error\n */\nfunction executeOnAllActive(toInject, typeToInject) {\n  return getAllActive().then(function (tabs) {\n    var tabIds = tabs.map(function (tab) {\n      return tab.id;\n    });\n    var results = [];\n    tabIds.forEach(function (tabId) {\n      results.push(executeScript(tabId, toInject, typeToInject));\n    });\n    return results;\n  });\n}\n\n/**\n * Get tab that the script call is being made from\n * @memberof tabs\n * @return {Promise<Tab>} Promise that resolves with Tab or rejects with error\n */\nfunction getCurrent() {\n  return (0, _utils2.default)(chrome.tabs.getCurrent, browser.tabs.getCurrent);\n}\n\n/**\n * Reloads a tab by id. Optionally bypasses cache.\n * @memberof tabs\n * @param  {String} tabId        Id of tab to reload\n * @param  {Boolean} bypassCache Bypass local web cache\n * @return {Promise<undefined>}  Bypass\n */\nfunction reload(tabId, bypassCache) {\n  return (0, _utils2.default)(chrome.tabs.reload, browser.tabs.reload, { bypassCache: bypassCache });\n}\n\n/**\n * Executes a script.\n * @private\n * @memberof tabs\n * @param  {Number} tabId id of tab to execute script\n * @param  {String} toInject file name or raw code to execute\n * @param  {String} typeToInject valid params are \"code\" or \"file\"\n * @return {Promise<Object>} Promise resolved with results of code's execution or rejected with an error\n */\nfunction executeScript(tabId, toInject, typeToInject) {\n  var executionObj = _defineProperty({}, typeToInject, toInject);\n  return (0, _utils2.default)(chrome.tabs.executeScript, browser.tabs.executeScript, tabId, executionObj);\n}\n\nexports.default = {\n  open: open,\n  close: close,\n  focus: focus,\n  reload: reload,\n  getAll: getAll,\n  getActive: getActive,\n  getCurrent: getCurrent,\n  getAllActive: getAllActive,\n  executeOnAll: executeOnAll,\n  executeOnAllActive: executeOnAllActive,\n  executeOnActive: executeOnActive\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/tabs/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/utils/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/extension-helpers/lib/utils/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/* global chrome */\n\nfunction PromiseFactory(chromeFunc, browserFunc) {\n  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    args[_key - 2] = arguments[_key];\n  }\n\n  if (chrome) {\n    return new Promise(function (resolve, reject) {\n      chromeFunc.apply(undefined, args.concat([function (callbackValue) {\n        var err = chrome.runtime.lastError;\n        if (err) return reject(err);\n        resolve(callbackValue);\n      }]));\n    });\n  } else {\n    return browserFunc.apply(undefined, args);\n  }\n}\n\nexports.default = PromiseFactory;\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/utils/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/wallpaper/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/wallpaper/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global chrome browser */\n\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * CHROME ONLY. Sets wallpaper to an image (url) or Array buffer (data).\n * @see [WallpaperLayout enum from Chrome](https://developer.chrome.com/extensions/wallpaper#type-WallpaperLayout)\n * @memberof wallpaper\n * @param {String} filename          File name of saved wallpaper\n * @param {WallpaperLayout} layout   A WallpaperLayout Enum value\n * @param {?Object} params           Optional thumbnail, binary image source and url. See Chrome API docs for options(https://developer.chrome.com/extensions/wallpaper)\n */\nfunction set(filename, layout, params) {\n  return (0, _utils2.default)(chrome.wallpaper.setWallpaper, browser.wallpaper.setWallpaper, _extends({ filename: filename, layout: layout }, params));\n}\n\nexports.default = {\n  set: set\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/wallpaper/index.js?");

/***/ }),

/***/ "./node_modules/extension-helpers/lib/windows/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/extension-helpers/lib/windows/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global browser chrome */\n\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/extension-helpers/lib/utils/index.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Get a window by id\n * @memberof windows\n * @see [Chrome filter defaults](https://developer.chrome.com/extensions/windows#method-get) for this API\n * @see [Firefox filter defaults](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/windows/get) for this API\n * @param  {Number} windowId         Integer Id of window\n * @param  {?Boolean} includeTabs    Include array of window's associated Tab objects. Default false.\n * @param  {?Array<WindowTypes>} filterWindowTypes Array to filter window by WindowType. Chrome and Firefox support different WindowTypes.\n * @return {Promise<Window>}         Promise resolved with a Window object or rejected with an error.\n */\nfunction getById(windowId, includeTabs, filterWindowTypes) {\n  var getInfo = { populate: includeTabs, windowTypes: filterWindowTypes };\n  return (0, _utils2.default)(chrome.windows.get, browser.windows.get, windowId, getInfo);\n}\n\n/**\n * Get the current browser window\n * @memberof windows\n * @param  {?Boolean} includeTabs    Include array of window's associated Tab objects. Default false.\n * @param  {?Array<WindowTypes>} filterWindowTypes Array to filter window by WindowType. Chrome and Firefox support different WindowTypes.\n * @return {Promise<Window>}         Promise resolved with a Window object or rejected with an error.\n */\nfunction getCurrent(includeTabs, filterWindowTypes) {\n  var getInfo = { populate: includeTabs, windowTypes: filterWindowTypes };\n  return (0, _utils2.default)(chrome.windows.getCurrent, browser.windows.getCurrent, getInfo);\n}\n\n/**\n * Get the most recently focused window. Usually the window 'on top'.\n * @memberof windows\n * @param  {?Boolean} includeTabs    Include array of window's associated Tab objects. Default false.\n * @param  {?Array<WindowTypes>} filterWindowTypes Array to filter window by WindowType. Chrome and Firefox support different WindowTypes.\n * @return {Promise<Window>}         Promise resolved with a Window object or rejected with an error.\n */\nfunction getLastFocused(includeTabs, filterWindowTypes) {\n  var getInfo = { populate: includeTabs, windowTypes: filterWindowTypes };\n  return (0, _utils2.default)(chrome.windows.getLastFocused, browser.windows.getLastFocused, getInfo);\n}\n\n/**\n * Get all open windows\n * @memberof windows\n * @param  {?Boolean} includeTabs    Include array of window's associated Tab objects. Default false.\n * @param  {?Array<WindowTypes>} filterWindowTypes Array to filter window by WindowType. Chrome and Firefox support different WindowTypes.\n * @return {Promise<Window>}         Promise resolved with a Window object or rejected with an error.\n */\nfunction getAll(includeTabs, filterWindowTypes) {\n  var getInfo = { populate: includeTabs, windowTypes: filterWindowTypes };\n  return (0, _utils2.default)(chrome.windows.getAll, browser.windows.getAll, getInfo);\n}\n\n/**\n * Opens a new browser window with optional parameters.\n * @see [Full list of parameters](https://developer.chrome.com/extensions/windows#method-create)\n * @memberof windows\n * @param  {?String} url            Fully qualified url to open in new window\n * @param  {Object} params          Optional parameters like incognito, focused, positioning, and tabid. See Chrome and Firefox docs for complete list.\n * @return {Promise<Window>}        Promise resolved with a Window object or rejected with an error.\n */\nfunction create(url, params) {\n  return (0, _utils2.default)(chrome.windows.create, browser.windows.create, _extends({ url: url }, params));\n}\n\n/**\n * Update a Window's state\n * @see [Full list of parameters](https://developer.chrome.com/extensions/windows#method-update)\n * @memberof windows\n * @param  {Number} windowId  Integer Id of window to update\n * @param  {?Object} params   Optional parameters like height, width, and state.\n * @return {Promise<Window>}  Promise resolved with a Window object or rejected with an error.\n */\nfunction update(windowId, params) {\n  return (0, _utils2.default)(chrome.windows.update, browser.windows.update, _extends({}, params));\n}\n\n/**\n * Focus on a given window\n * @memberof windows\n * @param  {Number} windowId  Integer Id of window to focus\n * @return {Promise<Window>}  Promise resolved with a Window object or rejected with an error.\n */\nfunction focus(windowId) {\n  return update(windowId, { focused: true });\n}\n\n/**\n * Draw attention to a given window\n * @memberof windows\n * @param  {Number} windowId  Integer Id of window to focus\n * @return {Promise<Window>}  Promise resolved with a Window object or rejected with an error.\n */\nfunction drawAttention(windowId) {\n  return update(windowId, { drawAttention: true });\n}\n\nexports.default = {\n  create: create,\n  drawAttention: drawAttention,\n  getAll: getAll,\n  getById: getById,\n  getCurrent: getCurrent,\n  getLastFocused: getLastFocused,\n  focus: focus,\n  update: update\n};\n\n//# sourceURL=webpack:///./node_modules/extension-helpers/lib/windows/index.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)\n}\n\nfunction isBuffer (obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer (obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))\n}\n\n\n//# sourceURL=webpack:///./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\nconst { notifications } = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\nconst extensionHelpers = __webpack_require__(/*! extension-helpers */ \"./node_modules/extension-helpers/lib/index.js\").default\n\nfunction getCookie(key) {\n  return new Promise((resolve, reject) => {\n    chrome.cookies.get({ url: 'https://www.paperspace.com', name: key }, (cookie) => {\n      if (chrome.runtime.lastError || !cookie) return reject(chrome.runtime.lastError || new Error('Could not access Paperspace'))\n      return resolve(cookie.value);\n    })\n  });\n}\n\nfunction checkMachines(userId, jwt) {\n  return axios.get(`https://api.paperspace.io/notebooks/getNotebooks?access_token=${jwt}&&modelId=${userId}&modelName=user&filter=%7B%22filter%22%3A%7B%22limit%22%3A11%2C%22offset%22%3A0%2C%22where%22%3A%7B%22dtDeleted%22%3Anull%7D%7D%7D&clusterId=`, { withCredentials: true })\n    .then(res => res.data);\n}\n\nfunction checkNotebooks(userId, jwt) {\n  return axios.get(`https://api.paperspace.io/accounts/user/${userId}/getMachineList?access_token=${jwt}`, { withCredentials: true })\n    .then(res => res.data);\n}\n\nfunction checkForInstances() {\n  Promise.all([getCookie('jwt'), getCookie('userid')])\n  .then(cookies => {\n    const [jwt, userId] = cookies;\n    return Promise.all([checkMachines(userId, jwt), checkNotebooks(userId, jwt)])\n  })\n  .then(results => {\n    const [machines, notebooks] = results;\n    if (machines.runningTotal >= 1 || notebooks.runningTotal >= 1) return notifications('A Paperspace Instance is running!');\n  })\n  .catch(err => console.error(err));\n}\n\nconst ALARM_NAME = 'paperspace';\nchrome.alarms.onAlarm.addListener((alarm) => {\n  if (alarm.name === ALARM_NAME) checkForInstances();\n})\n\nfunction every60Minutes() {\n  extensionHelpers.alarms.get(ALARM_NAME)\n    .then(existingAlarm => {\n      if (existingAlarm) return;\n      chrome.alarms.create(ALARM_NAME, { when: Date.now(), periodInMinutes: 60 })\n    });\n}\n\nevery60Minutes()\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/assets.js":
/*!*****************************!*\
  !*** ./src/utils/assets.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* global chrome */\n\nfunction getBundledResource (url) {\n  return chrome.runtime.getURL(url)\n}\n\nmodule.exports = getBundledResource\n\n\n//# sourceURL=webpack:///./src/utils/assets.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n  notifications: __webpack_require__(/*! ./notification */ \"./src/utils/notification.js\"),\n  assets: __webpack_require__(/*! ./assets */ \"./src/utils/assets.js\")\n};\n\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ }),

/***/ "./src/utils/notification.js":
/*!***********************************!*\
  !*** ./src/utils/notification.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* global chrome */\n\nconst extensionHelpers = __webpack_require__(/*! extension-helpers */ \"./node_modules/extension-helpers/lib/index.js\").default\nconst getBundledResource = __webpack_require__(/*! ./assets */ \"./src/utils/assets.js\")\n\nconst ICON_URL = getBundledResource('assets/paperspace.png')\nconst show = (message, contextMessage, shouldPersist = true) => {\n  return extensionHelpers.notifications.create(null, {\n    type: 'basic',\n    iconUrl: ICON_URL,\n    title: 'Paperspace Alert',\n    message,\n    contextMessage,\n    requireInteraction: shouldPersist\n  })\n}\n\nchrome.notifications.onButtonClicked.addListener((notifId, buttonIndex) => {\n  extensionHelpers.tabs.open('https://www.paperspace.com')\n})\n\nmodule.exports = show\n\n\n//# sourceURL=webpack:///./src/utils/notification.js?");

/***/ })

/******/ });
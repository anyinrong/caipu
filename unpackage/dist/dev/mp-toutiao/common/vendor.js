(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _tt$getSystemInfoSync =




  tt.getSystemInfoSync(),platform = _tt$getSystemInfoSync.platform,pixelRatio = _tt$getSystemInfoSync.pixelRatio,windowWidth = _tt$getSystemInfoSync.windowWidth; // uni=>tt runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// 不支持的 API 列表
var todos = [
  // 'createCameraContext',
  // 'createLivePlayerContext',
  // 'getSavedFileInfo',
  // 'createMapContext',
  // 'onMemoryWarning',
  // 'onGyroscopeChange',
  // 'startGyroscope',
  // 'stopGyroscope',
  // 'setScreenBrightness',
  // 'getScreenBrightness',
  // 'addPhoneContact',
  // 'openBluetoothAdapter',
  // 'startBluetoothDevicesDiscovery',
  // 'onBluetoothDeviceFound',
  // 'stopBluetoothDevicesDiscovery',
  // 'onBluetoothAdapterStateChange',
  // 'getConnectedBluetoothDevices',
  // 'getBluetoothDevices',
  // 'getBluetoothAdapterState',
  // 'closeBluetoothAdapter',
  // 'writeBLECharacteristicValue',
  // 'readBLECharacteristicValue',
  // 'onBLEConnectionStateChange',
  // 'onBLECharacteristicValueChange',
  // 'notifyBLECharacteristicValueChange',
  // 'getBLEDeviceServices',
  // 'getBLEDeviceCharacteristics',
  // 'createBLEConnection',
  // 'closeBLEConnection',
  // 'onBeaconServiceChange',
  // 'onBeaconUpdate',
  // 'getBeacons',
  // 'startBeaconDiscovery',
  // 'stopBeaconDiscovery',
  // 'showNavigationBarLoading',
  // 'hideNavigationBarLoading',
  // 'setTabBarItem',
  // 'setTabBarStyle',
  // 'hideTabBar',
  // 'showTabBar',
  // 'setTabBarBadge',
  // 'removeTabBarBadge',
  // 'showTabBarRedDot',
  // 'hideTabBarRedDot',
  // 'setBackgroundColor',
  // 'setBackgroundTextStyle',
  // 'chooseInvoiceTitle',
  // 'addTemplate',
  // 'deleteTemplate',
  // 'getTemplateLibraryById',
  // 'getTemplateLibraryList',
  // 'getTemplateList',
  // 'sendTemplateMessage',
  // 'setEnableDebug',
  // 'onWindowResize',
  // 'offWindowResize',
  // 'createOffscreenCanvas',
  // 'vibrate'
];

// 存在兼容性的 API 列表
// 头条小程序自1.35.0+支持canIUses
var canIUses = [
  // 'createIntersectionObserver',
  // 'getSavedFileList',
  // 'removeSavedFile',
  // 'hideKeyboard',
  // 'getImageInfo',
  // 'createVideoContext',
  // 'onSocketOpen',
  // 'onSocketError',
  // 'sendSocketMessage',
  // 'onSocketMessage',
  // 'closeSocket',
  // 'onSocketClose',
  // 'getExtConfig',
  // 'getExtConfigSync',
  // 'navigateToMiniProgram',
  // 'navigateBackMiniProgram',
  // 'compressImage',
  // 'chooseLocation',
  // 'openDocument',
  // 'onUserCaptureScreen',
  // 'getBackgroundAudioManager',
  // 'setNavigationBarColor',
];

// 需要做转换的 API 列表
var protocols = {
  chooseImage: {
    args: {
      sizeType: false } },


  previewImage: previewImage,
  connectSocket: {
    args: {
      method: false } },


  chooseVideo: {
    args: {
      camera: false } },


  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false } },


  startAccelerometer: {
    args: {
      interval: false } },


  showToast: {
    args: {
      image: false,
      mask: false } },


  showLoading: {
    args: {
      mask: false } },


  showModal: {
    args: {
      cancelColor: false,
      confirmColor: false } },


  showActionSheet: {
    args: {
      itemColor: false } },


  login: {
    args: {
      scopes: false,
      timeout: false } },


  getUserInfo: {
    args: {
      lang: false,
      timeout: false } },


  requestPayment: {
    name: tt.pay ? 'pay' : 'requestPayment',
    args: {
      orderInfo: tt.pay ? 'orderInfo' : 'data' } },


  getFileInfo: {
    args: {
      digestAlgorithm: false } } };




var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5934\u6761\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5934\u6761\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = tt[options.name || methodName].apply(tt, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['toutiao'],
  share: ['toutiao'],
  payment: ['toutiao'],
  push: ['toutiao'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "tt".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-toutiao";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

var mocks = ['__route__', '__webviewId__', '__nodeid__', '__nodeId__'];

function isPage() {
  return this.__nodeid__ === 0 || this.__nodeId__ === 0;
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  /* eslint-disable no-undef */
  var minorVersion = parseInt(tt.getSystemInfoSync().SDKVersion.split('.')[1]);
  if (minorVersion > 16) {
    Object.defineProperty(vm, '$refs', {
      get: function get() {
        var $refs = {};
        var components = mpInstance.selectAllComponents('.vue-ref');
        components.forEach(function (component) {
          var ref = component.dataset.ref;
          $refs[ref] = component.$vm || component;
        });
        var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
        forComponents.forEach(function (component) {
          var ref = component.dataset.ref;
          if (!$refs[ref]) {
            $refs[ref] = [];
          }
          $refs[ref].push(component.$vm || component);
        });
        return $refs;
      } });

  } else {
    mpInstance.selectAllComponents('.vue-ref', function (components) {
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        vm.$refs[ref] = component.$vm || component;
      });
    });
    mpInstance.selectAllComponents('.vue-ref-in-for', function (forComponents) {
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!vm.$refs[ref]) {
          vm.$refs[ref] = [];
        }
        vm.$refs[ref].push(component.$vm || component);
      });
    });
  }
}

var instances = Object.create(null);

function initRelation(_ref5)


{var vuePid = _ref5.vuePid,mpInstance = _ref5.mpInstance;
  // 头条 triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  var nodeId = (mpInstance.__nodeId__ || mpInstance.__nodeid__) + '';
  var webviewId = mpInstance.__webviewId__ + '';

  instances[webviewId + '_' + nodeId] = mpInstance.$vm;

  this.triggerEvent('__l', {
    vuePid: vuePid,
    nodeId: nodeId,
    webviewId: webviewId });

}

function handleLink$1(_ref6)





{var _ref6$detail = _ref6.detail,vuePid = _ref6$detail.vuePid,nodeId = _ref6$detail.nodeId,webviewId = _ref6$detail.webviewId;
  var vm = instances[webviewId + '_' + nodeId];
  if (!vm) {
    return;
  }

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vm.$parent = parentVm;
  vm.$root = parentVm.$root;
  parentVm.$children.push(vm);

  vm.__call_hook('created');
  vm.__call_hook('beforeMount');
  vm._isMounted = true;
  vm.__call_hook('mounted');
  vm.__call_hook('onReady');
}

function parseApp(vm) {
  _vue.default.prototype._$fallback = true; // 降级（调整原 vue 的部分生命周期，如 created，beforeMount,inject,provide）

  _vue.default.mixin({
    created: function created() {// 处理 injections,头条 triggerEvent 是异步，且触发时机很慢，故延迟 relation 设置
      if (this.mpType !== 'app') {
        if (
        this.mpType === 'page' &&
        !this.$scope.route &&
        this.$scope.__route__)
        {
          this.$scope.route = this.$scope.__route__;
        }

        initRefs(this);

        this.__init_injections(this);
        this.__init_provide(this);
      }
    } });


  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: function initRefs() {} // attached 时，可能查询不到
  });
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref7.isPage,initRelation = _ref7.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueOptions) {var _parseBaseComponent =
  parseBaseComponent(vueOptions),_parseBaseComponent2 = _slicedToArray(_parseBaseComponent, 2),componentOptions = _parseBaseComponent2[0],VueComponent = _parseBaseComponent2[1];

  componentOptions.lifetimes.attached = function attached() {
    var properties = this.properties;

    var options = {
      mpType: isPage.call(this) ? 'page' : 'component',
      mpInstance: this,
      propsData: properties };


    initVueIds(properties.vueId, this);

    // 初始化 vue 实例
    this.$vm = new VueComponent(options);

    // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
    initSlots(this.$vm, properties.vueSlots);

    // 处理父子关系
    initRelation.call(this, {
      vuePid: this._$vuePid,
      mpInstance: this });


    // 触发首次 setData
    this.$vm.$mount();
  };

  // ready 比 handleLink 还早，初始化逻辑放到 handleLink 中
  delete componentOptions.lifetimes.ready;

  componentOptions.methods.__l = handleLink$1;

  return componentOptions;
}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref8)


{var isPage = _ref8.isPage,initRelation = _ref8.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  var pageOptions = parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

  // 页面需要在 ready 中触发，其他组件是在 handleLink 中触发
  pageOptions.lifetimes.ready = function ready() {
    if (this.$vm && this.$vm.mpType === 'page') {
      this.$vm.__call_hook('created');
      this.$vm.__call_hook('beforeMount');
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    } else {
      this.is && console.warn(this.is + ' is not ready');
    }
  };

  return pageOptions;
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!tt.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-toutiao" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(tt, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, tt[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(tt).forEach(function (name) {
    if (hasOwn(tt, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, tt[name]));
    }
  });
}

tt.createApp = createApp;
tt.createPage = createPage;
tt.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 15:
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/common/iconfont.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/pages.json ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-toutiao"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 56:
/*!*******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/static/banner.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/banner.png";

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-261120200409001","_inBundle":false,"_integrity":"sha512-iM1vsCzUEg80lCM7rSAkh+28ahjS9zQgiGsEoHxawCD9s7rTFnSRIaOuc7WHeQt6EclGUUIrMccYHXsLsNAXZg==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-261120200409001.tgz","_shasum":"e9daeef120f133bf3d4ca0505f5b2abed0e874a7","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"ff0877f516c1cc986cf2d7eae2bf5030c58050f9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-261120200409001"};

/***/ }),

/***/ 64:
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/static/jiachang.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAIAAAAJerXgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAw9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzQxOTAwQUI4MTI3MTFFQUExRUNFNTQ0NjI2QTUyMkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzQxOTAwQUE4MTI3MTFFQUExRUNFNTQ0NjI2QTUyMkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iQTIyNjE1NEI4RjU4RTRDM0U0Q0Y3MzQ4QzdFQ0UyOTkiIHN0UmVmOmRvY3VtZW50SUQ9IkEyMjYxNTRCOEY1OEU0QzNFNENGNzM0OEM3RUNFMjk5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iqi30gAAS7ZJREFUeNosuweUXHd9/v27vU7vszuzs71od9V7by6S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"

/***/ }),

/***/ 65:
/*!*******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/static/xiafan.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAIAAAAJerXgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAw9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzJDQTFDMzQ4MTI3MTFFQTlCNDVGMTFCOTQ5NDJBNTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzJDQTFDMzM4MTI3MTFFQTlCNDVGMTFCOTQ5NDJBNTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iNTRDMERFNTc4OTYxRUM5RDY5RjBBOTg1M0YyQTVBNjkiIHN0UmVmOmRvY3VtZW50SUQ9IjU0QzBERTU3ODk2MUVDOUQ2OUYwQTk4NTNGMkE1QTY5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hRsErwAAR9RJREFUeNqMvAecXFd5Nn7uPbdOLzu7s7331UqyerFk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"

/***/ }),

/***/ 66:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/static/hongbei.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,R0lGODlhZABLAPcAAP73BthmE+vl5KqDdHJPTP/+/u7k25JEE/CNMJh0bEoQBu/Lr8mDWfuqUOlzD3A3Ksq5ta13ZuIJBNTCutzV1TAGBbpjN7ysqvr0849USdKJV/3RjVMtKeq2itWWavrYCMZ8VOaWa8daFsdrNKhXKMl2SZFkVXFCOud8KrhlQ/Ls68yKYa00BGlYY+XUyrRZJvzHe6pWNplFJ4g6I9h1NQoBAtqjdfnz68lkJOTb28WZh/S5hcZVCbVJCI4GEdhrH1YeD/OFF/fy8WcWBrxVGNaccse0rLZZNfm4BKBIFNi5qP7ikLp2W+HW0/qwN4Y7FKdECVtITmQiBcWlmt5yJKNJJMRoRaSKh/Hr48Orpv36+Py6dIc3BnRkbdrMxMVbKPiXPtrOzNSMYeepc7RKFdTFwbOdl9mnieTc09V7Rc7Fxb1yR3YkBHo0HeqjZ9K9tayUlLijn3k1CJg3BbaUh97SzueaW/21ZsxyOtdUBaldRJg7GplKMWInFqpmSePe4phWO+zd09eES7thKsZDAtbLyoglA6pRGaRqVzgnKIlBJeOJWamSi65hN4VHN/Tv8NuSW+a4m+LNw+Osg9R9WJ1SJ/z3+PqsX8GIctKIJM+QY3MqFOjf3tTJxPidUJqDgrpQC+aGO4YuE813Ye6zfKVOMu2VSpknBFk8O82BTdiYFOns8vWodbUBGv7vpbVrUOzBMvTWv9Gqls2+vduyms9eEsigjqRkFtjb3/bx+9VtQtnO0WYvIKdxX/X5/OO+pdOuFtRLAvnu7uJgCfru4rWLpc+Ue5p7efHl4oJPQeR5PjAYF85wK7BNJtZlLveLPN+4idrGvu/1+PWOVZFqHqqNjUkbGdONcrxsPH9cV/qshW0uBeLY2LONe6l0O4dlZPDo6cGztNJFF8NPFdGwotXGx6VOEJExHO++j9jIx/XizhsQFD0dGLA9GYxdQsZxUfj79t+OT7JySePL3cnR1fCxa8PDyOjYz7eLDuOrkEIxOWJQWreBlePl59nRFp1hJyH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNDgwOEMyMjgxMjcxMUVBQTM1OUU0NDQwNTAyMUExRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNDgwOEMyMTgxMjcxMUVBQTM1OUU0NDQwNTAyMUExRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSI2OEUwQTRGMDlBNERGMTQ1QUREODlDRDU4MEYzMTlCRiIgc3RSZWY6ZG9jdW1lbnRJRD0iNjhFMEE0RjA5QTRERjE0NUFERDg5Q0Q1ODBGMzE5QkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4N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"

/***/ }),

/***/ 67:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/static/qingdan.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAIAAAAJerXgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNCBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJBNkVGRDUxODEyNzExRUFCQjc4QjFBMDc5QzdBNDQ4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJBNkVGRDUyODEyNzExRUFCQjc4QjFBMDc5QzdBNDQ4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkE2RUZENEY4MTI3MTFFQUJCNzhCMUEwNzlDN0E0NDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkE2RUZENTA4MTI3MTFFQUJCNzhCMUEwNzlDN0E0NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Hfwx6AABGqUlEQVR42ky8B3hd13Um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"

/***/ }),

/***/ 7:
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/pages.json?{"type":"style"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "印记菜谱", "enablePullDownRefresh": true }, "pages/classify/classify": { "navigationBarTitleText": "分类", "enablePullDownRefresh": true }, "pages/search/search": { "navigationBarTitleText": "搜索", "enablePullDownRefresh": true }, "pages/detail/detail": { "navigationBarTitleText": "详情", "enablePullDownRefresh": true } }, "globalStyle": { "navigationBarTextStyle": "white", "navigationBarTitleText": "看图", "navigationBarBackgroundColor": "#333333", "backgroundColor": "#EFEFEF" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/HBuilderProjects/caipu/pages.json?{"type":"stat"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3VuaS1tcC10b3V0aWFvL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvSEJ1aWxkZXJQcm9qZWN0cy9jYWlwdS9jb21tb24vaWNvbmZvbnQuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL21wLXZ1ZS9kaXN0L21wLnJ1bnRpbWUuZXNtLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkY2xvdWRpby91bmktc3RhdC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvSEJ1aWxkZXJQcm9qZWN0cy9jYWlwdS9zdGF0aWMvYmFubmVyLnBuZyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL0hCdWlsZGVyUHJvamVjdHMvY2FpcHUvc3RhdGljL2ppYWNoYW5nLnBuZyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL0hCdWlsZGVyUHJvamVjdHMvY2FpcHUvc3RhdGljL3hpYWZhbi5wbmciLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9IQnVpbGRlclByb2plY3RzL2NhaXB1L3N0YXRpYy9ob25nYmVpLnBuZyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL0hCdWlsZGVyUHJvamVjdHMvY2FpcHUvc3RhdGljL3FpbmdkYW4ucG5nIiwid2VicGFjazovLy9DOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvSEJ1aWxkZXJQcm9qZWN0cy9jYWlwdS9wYWdlcy5qc29uIl0sIm5hbWVzIjpbIl90b1N0cmluZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaGFzT3duUHJvcGVydHkiLCJpc0ZuIiwiZm4iLCJpc1N0ciIsInN0ciIsImlzUGxhaW5PYmplY3QiLCJvYmoiLCJjYWxsIiwiaGFzT3duIiwia2V5Iiwibm9vcCIsImNhY2hlZCIsImNhY2hlIiwiY3JlYXRlIiwiY2FjaGVkRm4iLCJoaXQiLCJjYW1lbGl6ZVJFIiwiY2FtZWxpemUiLCJyZXBsYWNlIiwiXyIsImMiLCJ0b1VwcGVyQ2FzZSIsIkhPT0tTIiwiZ2xvYmFsSW50ZXJjZXB0b3JzIiwic2NvcGVkSW50ZXJjZXB0b3JzIiwibWVyZ2VIb29rIiwicGFyZW50VmFsIiwiY2hpbGRWYWwiLCJyZXMiLCJjb25jYXQiLCJBcnJheSIsImlzQXJyYXkiLCJkZWR1cGVIb29rcyIsImhvb2tzIiwiaSIsImxlbmd0aCIsImluZGV4T2YiLCJwdXNoIiwicmVtb3ZlSG9vayIsImhvb2siLCJpbmRleCIsInNwbGljZSIsIm1lcmdlSW50ZXJjZXB0b3JIb29rIiwiaW50ZXJjZXB0b3IiLCJvcHRpb24iLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUludGVyY2VwdG9ySG9vayIsImFkZEludGVyY2VwdG9yIiwibWV0aG9kIiwicmVtb3ZlSW50ZXJjZXB0b3IiLCJ3cmFwcGVySG9vayIsImRhdGEiLCJpc1Byb21pc2UiLCJ0aGVuIiwicXVldWUiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjYWxsYmFjayIsIndyYXBwZXJPcHRpb25zIiwib3B0aW9ucyIsIm5hbWUiLCJvbGRDYWxsYmFjayIsImNhbGxiYWNrSW50ZXJjZXB0b3IiLCJ3cmFwcGVyUmV0dXJuVmFsdWUiLCJyZXR1cm5WYWx1ZSIsInJldHVyblZhbHVlSG9va3MiLCJnZXRBcGlJbnRlcmNlcHRvckhvb2tzIiwic2xpY2UiLCJzY29wZWRJbnRlcmNlcHRvciIsImludm9rZUFwaSIsImFwaSIsInBhcmFtcyIsImludm9rZSIsInByb21pc2VJbnRlcmNlcHRvciIsImNhdGNoIiwiU1lOQ19BUElfUkUiLCJDT05URVhUX0FQSV9SRSIsIkFTWU5DX0FQSSIsIkNBTExCQUNLX0FQSV9SRSIsImlzQ29udGV4dEFwaSIsInRlc3QiLCJpc1N5bmNBcGkiLCJpc0NhbGxiYWNrQXBpIiwiaGFuZGxlUHJvbWlzZSIsImVyciIsInNob3VsZFByb21pc2UiLCJmaW5hbGx5IiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsInJlYXNvbiIsInByb21pc2lmeSIsInByb21pc2VBcGkiLCJzdWNjZXNzIiwiZmFpbCIsImNvbXBsZXRlIiwicmVqZWN0IiwiYXNzaWduIiwiRVBTIiwiQkFTRV9ERVZJQ0VfV0lEVEgiLCJpc0lPUyIsImRldmljZVdpZHRoIiwiZGV2aWNlRFBSIiwiY2hlY2tEZXZpY2VXaWR0aCIsInR0IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJwbGF0Zm9ybSIsInBpeGVsUmF0aW8iLCJ3aW5kb3dXaWR0aCIsInVweDJweCIsIm51bWJlciIsIm5ld0RldmljZVdpZHRoIiwiTnVtYmVyIiwicmVzdWx0IiwiTWF0aCIsImZsb29yIiwiaW50ZXJjZXB0b3JzIiwiYmFzZUFwaSIsImZyZWV6ZSIsIl9fcHJvdG9fXyIsInByZXZpZXdJbWFnZSIsImFyZ3MiLCJmcm9tQXJncyIsImN1cnJlbnRJbmRleCIsInBhcnNlSW50IiwiY3VycmVudCIsImlzTmFOIiwidXJscyIsImxlbiIsImZpbHRlciIsIml0ZW0iLCJpbmRpY2F0b3IiLCJsb29wIiwidG9kb3MiLCJjYW5JVXNlcyIsInByb3RvY29scyIsImNob29zZUltYWdlIiwic2l6ZVR5cGUiLCJjb25uZWN0U29ja2V0IiwiY2hvb3NlVmlkZW8iLCJjYW1lcmEiLCJzY2FuQ29kZSIsIm9ubHlGcm9tQ2FtZXJhIiwic2NhblR5cGUiLCJzdGFydEFjY2VsZXJvbWV0ZXIiLCJpbnRlcnZhbCIsInNob3dUb2FzdCIsImltYWdlIiwibWFzayIsInNob3dMb2FkaW5nIiwic2hvd01vZGFsIiwiY2FuY2VsQ29sb3IiLCJjb25maXJtQ29sb3IiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtQ29sb3IiLCJsb2dpbiIsInNjb3BlcyIsInRpbWVvdXQiLCJnZXRVc2VySW5mbyIsImxhbmciLCJyZXF1ZXN0UGF5bWVudCIsInBheSIsIm9yZGVySW5mbyIsImdldEZpbGVJbmZvIiwiZGlnZXN0QWxnb3JpdGhtIiwiQ0FMTEJBQ0tTIiwicHJvY2Vzc0NhbGxiYWNrIiwibWV0aG9kTmFtZSIsInByb2Nlc3NSZXR1cm5WYWx1ZSIsInByb2Nlc3NBcmdzIiwiYXJnc09wdGlvbiIsImtlZXBGcm9tQXJncyIsInRvQXJncyIsImtleU9wdGlvbiIsImNvbnNvbGUiLCJ3YXJuIiwia2VlcFJldHVyblZhbHVlIiwid3JhcHBlciIsInByb3RvY29sIiwiZXJyb3IiLCJhcmcxIiwiYXJnMiIsImFwcGx5IiwidG9kb0FwaXMiLCJUT0RPUyIsImNyZWF0ZVRvZG9BcGkiLCJ0b2RvQXBpIiwiZXJyTXNnIiwicHJvdmlkZXJzIiwib2F1dGgiLCJzaGFyZSIsInBheW1lbnQiLCJnZXRQcm92aWRlciIsInNlcnZpY2UiLCJwcm92aWRlciIsImV4dHJhQXBpIiwiZ2V0RW1pdHRlciIsImdldFVuaUVtaXR0ZXIiLCJFbWl0dGVyIiwiVnVlIiwiY3R4IiwiJG9uIiwiYXJndW1lbnRzIiwiJG9mZiIsIiRvbmNlIiwiJGVtaXQiLCJldmVudEFwaSIsIk1QUGFnZSIsIlBhZ2UiLCJNUENvbXBvbmVudCIsIkNvbXBvbmVudCIsImN1c3RvbWl6ZVJFIiwiY3VzdG9taXplIiwiaW5pdFRyaWdnZXJFdmVudCIsIm1wSW5zdGFuY2UiLCJvbGRUcmlnZ2VyRXZlbnQiLCJ0cmlnZ2VyRXZlbnQiLCJldmVudCIsImluaXRIb29rIiwib2xkSG9vayIsIlBBR0VfRVZFTlRfSE9PS1MiLCJpbml0TW9ja3MiLCJ2bSIsIm1vY2tzIiwiJG1wIiwibXBUeXBlIiwibW9jayIsImhhc0hvb2siLCJ2dWVPcHRpb25zIiwiZGVmYXVsdCIsImV4dGVuZE9wdGlvbnMiLCJzdXBlciIsIm1peGlucyIsImZpbmQiLCJtaXhpbiIsImluaXRIb29rcyIsIm1wT3B0aW9ucyIsIiR2bSIsIl9fY2FsbF9ob29rIiwiaW5pdFZ1ZUNvbXBvbmVudCIsIlZ1ZUNvbXBvbmVudCIsImV4dGVuZCIsImluaXRTbG90cyIsInZ1ZVNsb3RzIiwiJHNsb3RzIiwic2xvdE5hbWUiLCIkc2NvcGVkU2xvdHMiLCJpbml0VnVlSWRzIiwidnVlSWRzIiwic3BsaXQiLCJfJHZ1ZUlkIiwiXyR2dWVQaWQiLCJpbml0RGF0YSIsImNvbnRleHQiLCJtZXRob2RzIiwiZSIsInByb2Nlc3MiLCJWVUVfQVBQX0RFQlVHIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiX19saWZlY3ljbGVfaG9va3NfXyIsIlBST1BfVFlQRVMiLCJTdHJpbmciLCJCb29sZWFuIiwiY3JlYXRlT2JzZXJ2ZXIiLCJvYnNlcnZlciIsIm5ld1ZhbCIsIm9sZFZhbCIsImluaXRCZWhhdmlvcnMiLCJpbml0QmVoYXZpb3IiLCJ2dWVCZWhhdmlvcnMiLCJ2dWVFeHRlbmRzIiwidnVlTWl4aW5zIiwidnVlUHJvcHMiLCJiZWhhdmlvcnMiLCJiZWhhdmlvciIsInR5cGUiLCJEYXRlIiwicHJvcHMiLCJwcm9wZXJ0aWVzIiwiaW5pdFByb3BlcnRpZXMiLCJ2dWVNaXhpbiIsInBhcnNlUHJvcFR5cGUiLCJkZWZhdWx0VmFsdWUiLCJmaWxlIiwiaXNCZWhhdmlvciIsInZ1ZUlkIiwic2V0RGF0YSIsIm9wdHMiLCJ3cmFwcGVyJDEiLCJtcCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiZGV0YWlsIiwiZ2V0RXh0cmFWYWx1ZSIsImRhdGFQYXRoc0FycmF5IiwiZGF0YVBhdGhBcnJheSIsImRhdGFQYXRoIiwicHJvcFBhdGgiLCJ2YWx1ZVBhdGgiLCJ2Rm9yIiwiX19nZXRfdmFsdWUiLCJpc0ludGVnZXIiLCJ2Rm9ySXRlbSIsInZGb3JLZXkiLCJwcm9jZXNzRXZlbnRFeHRyYSIsImV4dHJhIiwiZXh0cmFPYmoiLCJnZXRPYmpCeUFycmF5IiwiYXJyIiwiZWxlbWVudCIsInByb2Nlc3NFdmVudEFyZ3MiLCJpc0N1c3RvbSIsImlzQ3VzdG9tTVBFdmVudCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY29tVHlwZSIsIl9fYXJnc19fIiwicmV0IiwiYXJnIiwiT05DRSIsIkNVU1RPTSIsImlzTWF0Y2hFdmVudFR5cGUiLCJldmVudFR5cGUiLCJvcHRUeXBlIiwiaGFuZGxlRXZlbnQiLCJldmVudE9wdHMiLCJldmVudE9wdCIsImV2ZW50c0FycmF5IiwiY2hhckF0IiwiaXNPbmNlIiwiZXZlbnRBcnJheSIsImhhbmRsZXJDdHgiLCIkb3B0aW9ucyIsImdlbmVyaWMiLCIkcGFyZW50IiwiaGFuZGxlciIsIkVycm9yIiwib25jZSIsInBhcnNlQmFzZUFwcCIsImluaXRSZWZzIiwic3RvcmUiLCIkc3RvcmUiLCJtcEhvc3QiLCJiZWZvcmVDcmVhdGUiLCIkc2NvcGUiLCJhcHBPcHRpb25zIiwib25MYXVuY2giLCJhcHAiLCJnbG9iYWxEYXRhIiwiX2lzTW91bnRlZCIsImZpbmRWbUJ5VnVlSWQiLCJ2dWVQaWQiLCIkY2hpbGRyZW4iLCJjaGlsZFZtIiwicGFyZW50Vm0iLCJCZWhhdmlvciIsImhhbmRsZUxpbmsiLCJwYXJlbnQiLCJpc1BhZ2UiLCJfX25vZGVpZF9fIiwiX19ub2RlSWRfXyIsIm1pbm9yVmVyc2lvbiIsIlNES1ZlcnNpb24iLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsIiRyZWZzIiwiY29tcG9uZW50cyIsInNlbGVjdEFsbENvbXBvbmVudHMiLCJjb21wb25lbnQiLCJyZWYiLCJmb3JDb21wb25lbnRzIiwiaW5zdGFuY2VzIiwiaW5pdFJlbGF0aW9uIiwibm9kZUlkIiwid2Vidmlld0lkIiwiX193ZWJ2aWV3SWRfXyIsImhhbmRsZUxpbmskMSIsIiRyb290IiwicGFyc2VBcHAiLCJfJGZhbGxiYWNrIiwiY3JlYXRlZCIsInJvdXRlIiwiX19yb3V0ZV9fIiwiX19pbml0X2luamVjdGlvbnMiLCJfX2luaXRfcHJvdmlkZSIsImNyZWF0ZUFwcCIsIkFwcCIsInBhcnNlQmFzZUNvbXBvbmVudCIsInZ1ZUNvbXBvbmVudE9wdGlvbnMiLCJtdWx0aXBsZVNsb3RzIiwiYWRkR2xvYmFsQ2xhc3MiLCJjb21wb25lbnRPcHRpb25zIiwiX19maWxlIiwibGlmZXRpbWVzIiwiYXR0YWNoZWQiLCJwcm9wc0RhdGEiLCIkbW91bnQiLCJyZWFkeSIsImRldGFjaGVkIiwiJGRlc3Ryb3kiLCJwYWdlTGlmZXRpbWVzIiwic2hvdyIsImhpZGUiLCJyZXNpemUiLCJzaXplIiwiX19sIiwiX19lIiwid3hzQ2FsbE1ldGhvZHMiLCJjYWxsTWV0aG9kIiwicGFyc2VDb21wb25lbnQiLCJob29rcyQxIiwicGFyc2VCYXNlUGFnZSIsInZ1ZVBhZ2VPcHRpb25zIiwicGFnZU9wdGlvbnMiLCJvbkxvYWQiLCJxdWVyeSIsInBhcnNlUGFnZSIsImlzIiwiY3JlYXRlUGFnZSIsImNyZWF0ZUNvbXBvbmVudCIsImNhbklVc2VBcGkiLCJhcGlOYW1lIiwiY2FuSVVzZSIsInVuaSIsIlByb3h5Iiwic2V0IiwidW5pJDEiLCJTVEFUX1ZFUlNJT04iLCJ2ZXJzaW9uIiwiU1RBVF9VUkwiLCJTVEFUX0g1X1VSTCIsIlBBR0VfUFZFUl9USU1FIiwiQVBQX1BWRVJfVElNRSIsIk9QRVJBVElOR19USU1FIiwiVVVJRF9LRVkiLCJVVUlEX1ZBTFVFIiwiZ2V0VXVpZCIsInV1aWQiLCJnZXRQbGF0Zm9ybU5hbWUiLCJwbHVzIiwicnVudGltZSIsImdldERDbG91ZElkIiwiZ2V0U3RvcmFnZVN5bmMiLCJub3ciLCJyYW5kb20iLCJzZXRTdG9yYWdlU3luYyIsImdldFNnaW4iLCJzdGF0RGF0YSIsInNvcnRBcnIiLCJzb3J0Iiwic2dpbiIsInNnaW5TdHIiLCJzaWduIiwic3Vic3RyIiwiZ2V0U3BsaWNpbmciLCJnZXRUaW1lIiwicGxhdGZvcm1MaXN0IiwiZ2V0UGFja05hbWUiLCJwYWNrTmFtZSIsImdldEFjY291bnRJbmZvU3luYyIsIm1pbmlQcm9ncmFtIiwiYXBwSWQiLCJnZXRWZXJzaW9uIiwiZ2V0Q2hhbm5lbCIsInBsYXRmb3JtTmFtZSIsImNoYW5uZWwiLCJnZXRTY2VuZSIsInNjZW5lIiwiZ2V0TGF1bmNoT3B0aW9uc1N5bmMiLCJGaXJzdF9fVmlzaXRfX1RpbWVfX0tFWSIsIkxhc3RfX1Zpc2l0X19UaW1lX19LRVkiLCJnZXRGaXJzdFZpc2l0VGltZSIsInRpbWVTdG9yZ2UiLCJ0aW1lIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJnZXRMYXN0VmlzaXRUaW1lIiwiUEFHRV9SRVNJREVOQ0VfVElNRSIsIkZpcnN0X1BhZ2VfcmVzaWRlbmNlX3RpbWUiLCJMYXN0X1BhZ2VfcmVzaWRlbmNlX3RpbWUiLCJzZXRQYWdlUmVzaWRlbmNlVGltZSIsImdldFBhZ2VSZXNpZGVuY2VUaW1lIiwiVE9UQUxfX1ZJU0lUX19DT1VOVCIsImdldFRvdGFsVmlzaXRDb3VudCIsImNvdW50IiwiR2V0RW5jb2RlVVJJQ29tcG9uZW50T3B0aW9ucyIsInByb3AiLCJlbmNvZGVVUklDb21wb25lbnQiLCJTZXRfX0ZpcnN0X19UaW1lIiwiU2V0X19MYXN0X19UaW1lIiwiZ2V0Rmlyc3RUaW1lIiwiZ2V0TGFzdFRpbWUiLCJnZXRSZXNpZGVuY2VUaW1lIiwicmVzaWRlbmNlVGltZSIsIm92ZXJ0aW1lIiwiZ2V0Um91dGUiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInBhZ2UiLCJfc2VsZiIsImdldFBhZ2VSb3V0ZSIsInNlbGYiLCJfcXVlcnkiLCJnZXRQYWdlVHlwZXMiLCJjYWxpYnJhdGlvbiIsImV2ZW50TmFtZSIsIlBhZ2VzSnNvbiIsInJlcXVpcmUiLCJzdGF0Q29uZmlnIiwicmVzdWx0T3B0aW9ucyIsIlV0aWwiLCJfcmV0cnkiLCJfcGxhdGZvcm0iLCJfbmF2aWdhdGlvbkJhclRpdGxlIiwiY29uZmlnIiwicmVwb3J0IiwibHQiLCJfb3BlcmF0aW5nVGltZSIsIl9yZXBvcnRpbmdSZXF1ZXN0RGF0YSIsIl9fcHJldmVudF90cmlnZ2VyaW5nIiwiX19saWNhdGlvbkhpZGUiLCJfX2xpY2F0aW9uU2hvdyIsIl9sYXN0UGFnZVJvdXRlIiwidXQiLCJtcG4iLCJhayIsImFwcGlkIiwidXN2IiwidiIsImNoIiwiY24iLCJwbiIsImN0IiwidCIsInAiLCJicmFuZCIsIm1kIiwibW9kZWwiLCJzdiIsInN5c3RlbSIsIm1wc2RrIiwibXB2IiwibGFuZ3VhZ2UiLCJwciIsInd3Iiwid2giLCJ3aW5kb3dIZWlnaHQiLCJzdyIsInNjcmVlbldpZHRoIiwic2giLCJzY3JlZW5IZWlnaHQiLCJwYXRoIiwic2MiLCJfc2VuZFJlcG9ydFJlcXVlc3QiLCJfc2VuZEhpZGVSZXF1ZXN0IiwidXJscmVmIiwidXJscmVmX3RzIiwicm91dGVwYXRoIiwidGl0bGVOVmlldyIsInRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJfc2VuZFBhZ2VSZXF1ZXN0IiwidXJsIiwiX3NlbmRFdmVudFJlcXVlc3QiLCJmdnRzIiwibHZ0cyIsInR2YyIsImdldFByb3BlcnR5IiwiZ2V0TmV0d29ya0luZm8iLCJvcHQiLCJyZXF1ZXN0IiwiZV9uIiwiZV92IiwiZ2V0TmV0d29ya1R5cGUiLCJuZXQiLCJuZXR3b3JrVHlwZSIsImdldExvY2F0aW9uIiwid2d0aW5mbyIsImdlb2NvZGUiLCJhZGRyZXNzIiwiY291bnRyeSIsInByb3ZpbmNlIiwiY2l0eSIsImxhdCIsImxhdGl0dWRlIiwibG5nIiwibG9uZ2l0dWRlIiwidGl0bGUiLCJ0dG4iLCJ0dHBqIiwidHRjIiwicmVxdWVzdERhdGEiLCJ1bmlTdGF0RGF0YSIsImZpcnN0QXJyIiwiY29udGVudEFyciIsImxhc3RBcnIiLCJyZCIsImVsbSIsIm5ld0RhdGEiLCJvcHRpb25zRGF0YSIsInJlcXVlc3RzIiwiaW1hZ2VSZXF1ZXN0Iiwic2V0VGltZW91dCIsIl9zZW5kUmVxdWVzdCIsIkltYWdlIiwic3JjIiwiU3RhdCIsImluc3RhbmNlIiwiYWRkSW50ZXJjZXB0b3JJbml0IiwiaW50ZXJjZXB0TG9naW4iLCJpbnRlcmNlcHRTaGFyZSIsImludGVyY2VwdFJlcXVlc3RQYXltZW50IiwiX2xvZ2luIiwiX3NoYXJlIiwiX3BheW1lbnQiLCJfcGFnZVNob3ciLCJfYXBwbGljYXRpb25TaG93IiwiX3BhZ2VIaWRlIiwiX2FwcGxpY2F0aW9uSGlkZSIsImVtIiwiaW5mbyIsImVtVmFsIiwibWVzc2FnZSIsInN0YWNrIiwic3RhdCIsImdldEluc3RhbmNlIiwiaXNIaWRlIiwibGlmZWN5Y2xlIiwib25SZWFkeSIsImxvYWQiLCJvblNoYXJlQXBwTWVzc2FnZSIsIm9sZFNoYXJlQXBwTWVzc2FnZSIsIm9uU2hvdyIsIm9uSGlkZSIsIm9uVW5sb2FkIiwib25FcnJvciIsIm1haW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7K0xBQUEscUU7O0FBRUEsSUFBTUEsU0FBUyxHQUFHQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFFBQW5DO0FBQ0EsSUFBTUMsY0FBYyxHQUFHSCxNQUFNLENBQUNDLFNBQVAsQ0FBaUJFLGNBQXhDOztBQUVBLFNBQVNDLElBQVQsQ0FBZUMsRUFBZixFQUFtQjtBQUNqQixTQUFPLE9BQU9BLEVBQVAsS0FBYyxVQUFyQjtBQUNEOztBQUVELFNBQVNDLEtBQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCO0FBQ25CLFNBQU8sT0FBT0EsR0FBUCxLQUFlLFFBQXRCO0FBQ0Q7O0FBRUQsU0FBU0MsYUFBVCxDQUF3QkMsR0FBeEIsRUFBNkI7QUFDM0IsU0FBT1YsU0FBUyxDQUFDVyxJQUFWLENBQWVELEdBQWYsTUFBd0IsaUJBQS9CO0FBQ0Q7O0FBRUQsU0FBU0UsTUFBVCxDQUFpQkYsR0FBakIsRUFBc0JHLEdBQXRCLEVBQTJCO0FBQ3pCLFNBQU9ULGNBQWMsQ0FBQ08sSUFBZixDQUFvQkQsR0FBcEIsRUFBeUJHLEdBQXpCLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxJQUFULEdBQWlCLENB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QTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQyxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGFBQW9COztBQUVyQztBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQW9COztBQUVoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEtBQXFDO0FBQ3pDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1QkFBdUI7QUFDekQsaUNBQWlDLHNCQUFzQjtBQUN2RDtBQUNBLGtCQUFrQjtBQUNsQixNQUFNLElBQXFDO0FBQzNDO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsYUFBb0I7QUFDdEM7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsT0FBTyxVQUFVLElBQXFDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsR0FBRyxVQUFVLElBQXFDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QywrQkFBK0I7QUFDL0I7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUIsV0FBVztBQUNYO0FBQ0EsR0FBRyxVQUFVLElBQXFDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUFxQztBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE9BQU87QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLG9DQUFvQztBQUNwQztBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsTUFBTSxLQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBRVE7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxTQUFTO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZDQUE2QyxxQ0FBcUMsRUFBRTtBQUNwRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLHlDQUF5QyxFQUFFO0FBQy9FOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sS0FBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxJQUFxQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFD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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLE9BQU87QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBcUM7QUFDekQ7QUFDQSxNQUFNLFNBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUMscUJBQXFCLCtCQUErQjtBQUNwRDtBQUNBO0FBQ0EsR0FBRztBQUNILHlCQUF5QjtBQUN6QjtBQUNBLHNCQUFzQixpQ0FBaUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSyxNQUFNLEVBRU47QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEtBQXFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sS0FBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsS0FBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssVUFBVSxJQUFxQztBQUNwRDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sS0FBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsOEJBQThCO0FBQzlCLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLEtBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQSxLQUFLLE1BQU0sRUFFTjtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBLGtEQUFrRDtBQUNsRCwwRDs7QUFFQTtBQUNBLFFBQVEsS0FBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGVBQWU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sS0FBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsS0FBcUM7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLFlBQVksS0FBcUM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQywyQkFBMkIsRUFBRTtBQUN2RSxLQUFLO0FBQ0w7QUFDQSwwQ0FBMEMsNEJBQTRCLEVBQUU7QUFDeEUsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixlQUFlO0FBQzlDLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QTJWLGVBQWMsRUFBQywwQkFBeUIsT0FBMUIsRUFBa0MsMEJBQXlCLElBQTNELEVBQWdFLGdDQUErQixTQUEvRixFQUF5RyxtQkFBa0IsU0FBM0gsRUFBelcsRTs7Ozs7Ozs7Ozs7O3NHQUFBLEVBQUMsU0FBUSxFQUFULEUiLCJmaWxlIjoiY29tbW9uL3ZlbmRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuXHJcbmNvbnN0IF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuXHJcbmZ1bmN0aW9uIGlzRm4gKGZuKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1N0ciAoc3RyKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xyXG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYXNPd24gKG9iaiwga2V5KSB7XHJcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vb3AgKCkge31cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBjYWNoZWQgKGZuKSB7XHJcbiAgY29uc3QgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIHJldHVybiBmdW5jdGlvbiBjYWNoZWRGbiAoc3RyKSB7XHJcbiAgICBjb25zdCBoaXQgPSBjYWNoZVtzdHJdO1xyXG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ2FtZWxpemUgYSBoeXBoZW4tZGVsaW1pdGVkIHN0cmluZy5cclxuICovXHJcbmNvbnN0IGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XHJcbmNvbnN0IGNhbWVsaXplID0gY2FjaGVkKChzdHIpID0+IHtcclxuICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxpemVSRSwgKF8sIGMpID0+IGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJylcclxufSk7XHJcblxyXG5jb25zdCBIT09LUyA9IFtcclxuICAnaW52b2tlJyxcclxuICAnc3VjY2VzcycsXHJcbiAgJ2ZhaWwnLFxyXG4gICdjb21wbGV0ZScsXHJcbiAgJ3JldHVyblZhbHVlJ1xyXG5dO1xyXG5cclxuY29uc3QgZ2xvYmFsSW50ZXJjZXB0b3JzID0ge307XHJcbmNvbnN0IHNjb3BlZEludGVyY2VwdG9ycyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWVyZ2VIb29rIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XHJcbiAgY29uc3QgcmVzID0gY2hpbGRWYWxcclxuICAgID8gcGFyZW50VmFsXHJcbiAgICAgID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbClcclxuICAgICAgOiBBcnJheS5pc0FycmF5KGNoaWxkVmFsKVxyXG4gICAgICAgID8gY2hpbGRWYWwgOiBbY2hpbGRWYWxdXHJcbiAgICA6IHBhcmVudFZhbDtcclxuICByZXR1cm4gcmVzXHJcbiAgICA/IGRlZHVwZUhvb2tzKHJlcylcclxuICAgIDogcmVzXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlZHVwZUhvb2tzIChob29rcykge1xyXG4gIGNvbnN0IHJlcyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChyZXMuaW5kZXhPZihob29rc1tpXSkgPT09IC0xKSB7XHJcbiAgICAgIHJlcy5wdXNoKGhvb2tzW2ldKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVIb29rIChob29rcywgaG9vaykge1xyXG4gIGNvbnN0IGluZGV4ID0gaG9va3MuaW5kZXhPZihob29rKTtcclxuICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICBob29rcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbWVyZ2VJbnRlcmNlcHRvckhvb2sgKGludGVyY2VwdG9yLCBvcHRpb24pIHtcclxuICBPYmplY3Qua2V5cyhvcHRpb24pLmZvckVhY2goaG9vayA9PiB7XHJcbiAgICBpZiAoSE9PS1MuaW5kZXhPZihob29rKSAhPT0gLTEgJiYgaXNGbihvcHRpb25baG9va10pKSB7XHJcbiAgICAgIGludGVyY2VwdG9yW2hvb2tdID0gbWVyZ2VIb29rKGludGVyY2VwdG9yW2hvb2tdLCBvcHRpb25baG9va10pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVJbnRlcmNlcHRvckhvb2sgKGludGVyY2VwdG9yLCBvcHRpb24pIHtcclxuICBpZiAoIWludGVyY2VwdG9yIHx8ICFvcHRpb24pIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBPYmplY3Qua2V5cyhvcHRpb24pLmZvckVhY2goaG9vayA9PiB7XHJcbiAgICBpZiAoSE9PS1MuaW5kZXhPZihob29rKSAhPT0gLTEgJiYgaXNGbihvcHRpb25baG9va10pKSB7XHJcbiAgICAgIHJlbW92ZUhvb2soaW50ZXJjZXB0b3JbaG9va10sIG9wdGlvbltob29rXSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEludGVyY2VwdG9yIChtZXRob2QsIG9wdGlvbikge1xyXG4gIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJyAmJiBpc1BsYWluT2JqZWN0KG9wdGlvbikpIHtcclxuICAgIG1lcmdlSW50ZXJjZXB0b3JIb29rKHNjb3BlZEludGVyY2VwdG9yc1ttZXRob2RdIHx8IChzY29wZWRJbnRlcmNlcHRvcnNbbWV0aG9kXSA9IHt9KSwgb3B0aW9uKTtcclxuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QobWV0aG9kKSkge1xyXG4gICAgbWVyZ2VJbnRlcmNlcHRvckhvb2soZ2xvYmFsSW50ZXJjZXB0b3JzLCBtZXRob2QpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlSW50ZXJjZXB0b3IgKG1ldGhvZCwgb3B0aW9uKSB7XHJcbiAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb24pKSB7XHJcbiAgICAgIHJlbW92ZUludGVyY2VwdG9ySG9vayhzY29wZWRJbnRlcmNlcHRvcnNbbWV0aG9kXSwgb3B0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlbGV0ZSBzY29wZWRJbnRlcmNlcHRvcnNbbWV0aG9kXTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QobWV0aG9kKSkge1xyXG4gICAgcmVtb3ZlSW50ZXJjZXB0b3JIb29rKGdsb2JhbEludGVyY2VwdG9ycywgbWV0aG9kKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyYXBwZXJIb29rIChob29rKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICByZXR1cm4gaG9vayhkYXRhKSB8fCBkYXRhXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1Byb21pc2UgKG9iaikge1xyXG4gIHJldHVybiAhIW9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHF1ZXVlIChob29rcywgZGF0YSkge1xyXG4gIGxldCBwcm9taXNlID0gZmFsc2U7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgaG9vayA9IGhvb2tzW2ldO1xyXG4gICAgaWYgKHByb21pc2UpIHtcclxuICAgICAgcHJvbWlzZSA9IFByb21pc2UudGhlbih3cmFwcGVySG9vayhob29rKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCByZXMgPSBob29rKGRhdGEpO1xyXG4gICAgICBpZiAoaXNQcm9taXNlKHJlcykpIHtcclxuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGhlbiAoKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcHJvbWlzZSB8fCB7XHJcbiAgICB0aGVuIChjYWxsYmFjaykge1xyXG4gICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyYXBwZXJPcHRpb25zIChpbnRlcmNlcHRvciwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgWydzdWNjZXNzJywgJ2ZhaWwnLCAnY29tcGxldGUnXS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW50ZXJjZXB0b3JbbmFtZV0pKSB7XHJcbiAgICAgIGNvbnN0IG9sZENhbGxiYWNrID0gb3B0aW9uc1tuYW1lXTtcclxuICAgICAgb3B0aW9uc1tuYW1lXSA9IGZ1bmN0aW9uIGNhbGxiYWNrSW50ZXJjZXB0b3IgKHJlcykge1xyXG4gICAgICAgIHF1ZXVlKGludGVyY2VwdG9yW25hbWVdLCByZXMpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tbWl4ZWQtb3BlcmF0b3JzICovXHJcbiAgICAgICAgICByZXR1cm4gaXNGbihvbGRDYWxsYmFjaykgJiYgb2xkQ2FsbGJhY2socmVzKSB8fCByZXNcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gb3B0aW9uc1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cmFwcGVyUmV0dXJuVmFsdWUgKG1ldGhvZCwgcmV0dXJuVmFsdWUpIHtcclxuICBjb25zdCByZXR1cm5WYWx1ZUhvb2tzID0gW107XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZ2xvYmFsSW50ZXJjZXB0b3JzLnJldHVyblZhbHVlKSkge1xyXG4gICAgcmV0dXJuVmFsdWVIb29rcy5wdXNoKC4uLmdsb2JhbEludGVyY2VwdG9ycy5yZXR1cm5WYWx1ZSk7XHJcbiAgfVxyXG4gIGNvbnN0IGludGVyY2VwdG9yID0gc2NvcGVkSW50ZXJjZXB0b3JzW21ldGhvZF07XHJcbiAgaWYgKGludGVyY2VwdG9yICYmIEFycmF5LmlzQXJyYXkoaW50ZXJjZXB0b3IucmV0dXJuVmFsdWUpKSB7XHJcbiAgICByZXR1cm5WYWx1ZUhvb2tzLnB1c2goLi4uaW50ZXJjZXB0b3IucmV0dXJuVmFsdWUpO1xyXG4gIH1cclxuICByZXR1cm5WYWx1ZUhvb2tzLmZvckVhY2goaG9vayA9PiB7XHJcbiAgICByZXR1cm5WYWx1ZSA9IGhvb2socmV0dXJuVmFsdWUpIHx8IHJldHVyblZhbHVlO1xyXG4gIH0pO1xyXG4gIHJldHVybiByZXR1cm5WYWx1ZVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcGlJbnRlcmNlcHRvckhvb2tzIChtZXRob2QpIHtcclxuICBjb25zdCBpbnRlcmNlcHRvciA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgT2JqZWN0LmtleXMoZ2xvYmFsSW50ZXJjZXB0b3JzKS5mb3JFYWNoKGhvb2sgPT4ge1xyXG4gICAgaWYgKGhvb2sgIT09ICdyZXR1cm5WYWx1ZScpIHtcclxuICAgICAgaW50ZXJjZXB0b3JbaG9va10gPSBnbG9iYWxJbnRlcmNlcHRvcnNbaG9va10uc2xpY2UoKTtcclxuICAgIH1cclxuICB9KTtcclxuICBjb25zdCBzY29wZWRJbnRlcmNlcHRvciA9IHNjb3BlZEludGVyY2VwdG9yc1ttZXRob2RdO1xyXG4gIGlmIChzY29wZWRJbnRlcmNlcHRvcikge1xyXG4gICAgT2JqZWN0LmtleXMoc2NvcGVkSW50ZXJjZXB0b3IpLmZvckVhY2goaG9vayA9PiB7XHJcbiAgICAgIGlmIChob29rICE9PSAncmV0dXJuVmFsdWUnKSB7XHJcbiAgICAgICAgaW50ZXJjZXB0b3JbaG9va10gPSAoaW50ZXJjZXB0b3JbaG9va10gfHwgW10pLmNvbmNhdChzY29wZWRJbnRlcmNlcHRvcltob29rXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gaW50ZXJjZXB0b3JcclxufVxyXG5cclxuZnVuY3Rpb24gaW52b2tlQXBpIChtZXRob2QsIGFwaSwgb3B0aW9ucywgLi4ucGFyYW1zKSB7XHJcbiAgY29uc3QgaW50ZXJjZXB0b3IgPSBnZXRBcGlJbnRlcmNlcHRvckhvb2tzKG1ldGhvZCk7XHJcbiAgaWYgKGludGVyY2VwdG9yICYmIE9iamVjdC5rZXlzKGludGVyY2VwdG9yKS5sZW5ndGgpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGludGVyY2VwdG9yLmludm9rZSkpIHtcclxuICAgICAgY29uc3QgcmVzID0gcXVldWUoaW50ZXJjZXB0b3IuaW52b2tlLCBvcHRpb25zKTtcclxuICAgICAgcmV0dXJuIHJlcy50aGVuKChvcHRpb25zKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGFwaSh3cmFwcGVyT3B0aW9ucyhpbnRlcmNlcHRvciwgb3B0aW9ucyksIC4uLnBhcmFtcylcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhcGkod3JhcHBlck9wdGlvbnMoaW50ZXJjZXB0b3IsIG9wdGlvbnMpLCAuLi5wYXJhbXMpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBhcGkob3B0aW9ucywgLi4ucGFyYW1zKVxyXG59XHJcblxyXG5jb25zdCBwcm9taXNlSW50ZXJjZXB0b3IgPSB7XHJcbiAgcmV0dXJuVmFsdWUgKHJlcykge1xyXG4gICAgaWYgKCFpc1Byb21pc2UocmVzKSkge1xyXG4gICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmV0dXJuIHJlc1sxXVxyXG4gICAgfSkuY2F0Y2gocmVzID0+IHtcclxuICAgICAgcmV0dXJuIHJlc1swXVxyXG4gICAgfSlcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBTWU5DX0FQSV9SRSA9XHJcbiAgL15cXCR8c2VuZE5hdGl2ZUV2ZW50fHJlc3RvcmVHbG9iYWx8Z2V0Q3VycmVudFN1Yk5WdWV8Z2V0TWVudUJ1dHRvbkJvdW5kaW5nQ2xpZW50UmVjdHxecmVwb3J0fGludGVyY2VwdG9yc3xJbnRlcmNlcHRvciR8Z2V0U3ViTlZ1ZUJ5SWR8cmVxdWlyZU5hdGl2ZVBsdWdpbnx1cHgycHh8aGlkZUtleWJvYXJkfGNhbklVc2V8XmNyZWF0ZXxTeW5jJHxNYW5hZ2VyJHxiYXNlNjRUb0FycmF5QnVmZmVyfGFycmF5QnVmZmVyVG9CYXNlNjQvO1xyXG5cclxuY29uc3QgQ09OVEVYVF9BUElfUkUgPSAvXmNyZWF0ZXxNYW5hZ2VyJC87XHJcblxyXG5jb25zdCBBU1lOQ19BUEkgPSBbJ2NyZWF0ZUJMRUNvbm5lY3Rpb24nXTtcclxuXHJcbmNvbnN0IENBTExCQUNLX0FQSV9SRSA9IC9eb258Xm9mZi87XHJcblxyXG5mdW5jdGlvbiBpc0NvbnRleHRBcGkgKG5hbWUpIHtcclxuICByZXR1cm4gQ09OVEVYVF9BUElfUkUudGVzdChuYW1lKVxyXG59XHJcbmZ1bmN0aW9uIGlzU3luY0FwaSAobmFtZSkge1xyXG4gIHJldHVybiBTWU5DX0FQSV9SRS50ZXN0KG5hbWUpICYmIEFTWU5DX0FQSS5pbmRleE9mKG5hbWUpID09PSAtMVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0NhbGxiYWNrQXBpIChuYW1lKSB7XHJcbiAgcmV0dXJuIENBTExCQUNLX0FQSV9SRS50ZXN0KG5hbWUpICYmIG5hbWUgIT09ICdvblB1c2gnXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVByb21pc2UgKHByb21pc2UpIHtcclxuICByZXR1cm4gcHJvbWlzZS50aGVuKGRhdGEgPT4ge1xyXG4gICAgcmV0dXJuIFtudWxsLCBkYXRhXVxyXG4gIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IFtlcnJdKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG91bGRQcm9taXNlIChuYW1lKSB7XHJcbiAgaWYgKFxyXG4gICAgaXNDb250ZXh0QXBpKG5hbWUpIHx8XHJcbiAgICBpc1N5bmNBcGkobmFtZSkgfHxcclxuICAgIGlzQ2FsbGJhY2tBcGkobmFtZSlcclxuICApIHtcclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuICByZXR1cm4gdHJ1ZVxyXG59XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1leHRlbmQtbmF0aXZlICovXHJcbmlmICghUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSkge1xyXG4gIFByb21pc2UucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmNvbnN0cnVjdG9yO1xyXG4gICAgcmV0dXJuIHRoaXMudGhlbihcclxuICAgICAgdmFsdWUgPT4gcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oKCkgPT4gdmFsdWUpLFxyXG4gICAgICByZWFzb24gPT4gcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRocm93IHJlYXNvblxyXG4gICAgICB9KVxyXG4gICAgKVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb21pc2lmeSAobmFtZSwgYXBpKSB7XHJcbiAgaWYgKCFzaG91bGRQcm9taXNlKG5hbWUpKSB7XHJcbiAgICByZXR1cm4gYXBpXHJcbiAgfVxyXG4gIHJldHVybiBmdW5jdGlvbiBwcm9taXNlQXBpIChvcHRpb25zID0ge30sIC4uLnBhcmFtcykge1xyXG4gICAgaWYgKGlzRm4ob3B0aW9ucy5zdWNjZXNzKSB8fCBpc0ZuKG9wdGlvbnMuZmFpbCkgfHwgaXNGbihvcHRpb25zLmNvbXBsZXRlKSkge1xyXG4gICAgICByZXR1cm4gd3JhcHBlclJldHVyblZhbHVlKG5hbWUsIGludm9rZUFwaShuYW1lLCBhcGksIG9wdGlvbnMsIC4uLnBhcmFtcykpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gd3JhcHBlclJldHVyblZhbHVlKG5hbWUsIGhhbmRsZVByb21pc2UobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpbnZva2VBcGkobmFtZSwgYXBpLCBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XHJcbiAgICAgICAgc3VjY2VzczogcmVzb2x2ZSxcclxuICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgfSksIC4uLnBhcmFtcyk7XHJcbiAgICB9KSkpXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBFUFMgPSAxZS00O1xyXG5jb25zdCBCQVNFX0RFVklDRV9XSURUSCA9IDc1MDtcclxubGV0IGlzSU9TID0gZmFsc2U7XHJcbmxldCBkZXZpY2VXaWR0aCA9IDA7XHJcbmxldCBkZXZpY2VEUFIgPSAwO1xyXG5cclxuZnVuY3Rpb24gY2hlY2tEZXZpY2VXaWR0aCAoKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgcGxhdGZvcm0sXHJcbiAgICBwaXhlbFJhdGlvLFxyXG4gICAgd2luZG93V2lkdGhcclxuICB9ID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTsgLy8gdW5pPT50dCBydW50aW1lIOe8luivkeebruagh+aYryB1bmkg5a+56LGh77yM5YaF6YOo5LiN5YWB6K6455u05o6l5L2/55SoIHVuaVxyXG5cclxuICBkZXZpY2VXaWR0aCA9IHdpbmRvd1dpZHRoO1xyXG4gIGRldmljZURQUiA9IHBpeGVsUmF0aW87XHJcbiAgaXNJT1MgPSBwbGF0Zm9ybSA9PT0gJ2lvcyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVweDJweCAobnVtYmVyLCBuZXdEZXZpY2VXaWR0aCkge1xyXG4gIGlmIChkZXZpY2VXaWR0aCA9PT0gMCkge1xyXG4gICAgY2hlY2tEZXZpY2VXaWR0aCgpO1xyXG4gIH1cclxuXHJcbiAgbnVtYmVyID0gTnVtYmVyKG51bWJlcik7XHJcbiAgaWYgKG51bWJlciA9PT0gMCkge1xyXG4gICAgcmV0dXJuIDBcclxuICB9XHJcbiAgbGV0IHJlc3VsdCA9IChudW1iZXIgLyBCQVNFX0RFVklDRV9XSURUSCkgKiAobmV3RGV2aWNlV2lkdGggfHwgZGV2aWNlV2lkdGgpO1xyXG4gIGlmIChyZXN1bHQgPCAwKSB7XHJcbiAgICByZXN1bHQgPSAtcmVzdWx0O1xyXG4gIH1cclxuICByZXN1bHQgPSBNYXRoLmZsb29yKHJlc3VsdCArIEVQUyk7XHJcbiAgaWYgKHJlc3VsdCA9PT0gMCkge1xyXG4gICAgaWYgKGRldmljZURQUiA9PT0gMSB8fCAhaXNJT1MpIHtcclxuICAgICAgcmV0dXJuIDFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAwLjVcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG51bWJlciA8IDAgPyAtcmVzdWx0IDogcmVzdWx0XHJcbn1cclxuXHJcbmNvbnN0IGludGVyY2VwdG9ycyA9IHtcclxuICBwcm9taXNlSW50ZXJjZXB0b3JcclxufTtcclxuXHJcblxyXG5cclxudmFyIGJhc2VBcGkgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XHJcbiAgX19wcm90b19fOiBudWxsLFxyXG4gIHVweDJweDogdXB4MnB4LFxyXG4gIGludGVyY2VwdG9yczogaW50ZXJjZXB0b3JzLFxyXG4gIGFkZEludGVyY2VwdG9yOiBhZGRJbnRlcmNlcHRvcixcclxuICByZW1vdmVJbnRlcmNlcHRvcjogcmVtb3ZlSW50ZXJjZXB0b3JcclxufSk7XHJcblxyXG52YXIgcHJldmlld0ltYWdlID0ge1xyXG4gIGFyZ3MgKGZyb21BcmdzKSB7XHJcbiAgICBsZXQgY3VycmVudEluZGV4ID0gcGFyc2VJbnQoZnJvbUFyZ3MuY3VycmVudCk7XHJcbiAgICBpZiAoaXNOYU4oY3VycmVudEluZGV4KSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHVybHMgPSBmcm9tQXJncy51cmxzO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHVybHMpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgbGVuID0gdXJscy5sZW5ndGg7XHJcbiAgICBpZiAoIWxlbikge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmIChjdXJyZW50SW5kZXggPCAwKSB7XHJcbiAgICAgIGN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRJbmRleCA+PSBsZW4pIHtcclxuICAgICAgY3VycmVudEluZGV4ID0gbGVuIC0gMTtcclxuICAgIH1cclxuICAgIGlmIChjdXJyZW50SW5kZXggPiAwKSB7XHJcbiAgICAgIGZyb21BcmdzLmN1cnJlbnQgPSB1cmxzW2N1cnJlbnRJbmRleF07XHJcbiAgICAgIGZyb21BcmdzLnVybHMgPSB1cmxzLmZpbHRlcihcclxuICAgICAgICAoaXRlbSwgaW5kZXgpID0+IGluZGV4IDwgY3VycmVudEluZGV4ID8gaXRlbSAhPT0gdXJsc1tjdXJyZW50SW5kZXhdIDogdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZnJvbUFyZ3MuY3VycmVudCA9IHVybHNbMF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbmRpY2F0b3I6IGZhbHNlLFxyXG4gICAgICBsb29wOiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIOS4jeaUr+aMgeeahCBBUEkg5YiX6KGoXHJcbmNvbnN0IHRvZG9zID0gW1xyXG4gIC8vICdjcmVhdGVDYW1lcmFDb250ZXh0JyxcclxuICAvLyAnY3JlYXRlTGl2ZVBsYXllckNvbnRleHQnLFxyXG4gIC8vICdnZXRTYXZlZEZpbGVJbmZvJyxcclxuICAvLyAnY3JlYXRlTWFwQ29udGV4dCcsXHJcbiAgLy8gJ29uTWVtb3J5V2FybmluZycsXHJcbiAgLy8gJ29uR3lyb3Njb3BlQ2hhbmdlJyxcclxuICAvLyAnc3RhcnRHeXJvc2NvcGUnLFxyXG4gIC8vICdzdG9wR3lyb3Njb3BlJyxcclxuICAvLyAnc2V0U2NyZWVuQnJpZ2h0bmVzcycsXHJcbiAgLy8gJ2dldFNjcmVlbkJyaWdodG5lc3MnLFxyXG4gIC8vICdhZGRQaG9uZUNvbnRhY3QnLFxyXG4gIC8vICdvcGVuQmx1ZXRvb3RoQWRhcHRlcicsXHJcbiAgLy8gJ3N0YXJ0Qmx1ZXRvb3RoRGV2aWNlc0Rpc2NvdmVyeScsXHJcbiAgLy8gJ29uQmx1ZXRvb3RoRGV2aWNlRm91bmQnLFxyXG4gIC8vICdzdG9wQmx1ZXRvb3RoRGV2aWNlc0Rpc2NvdmVyeScsXHJcbiAgLy8gJ29uQmx1ZXRvb3RoQWRhcHRlclN0YXRlQ2hhbmdlJyxcclxuICAvLyAnZ2V0Q29ubmVjdGVkQmx1ZXRvb3RoRGV2aWNlcycsXHJcbiAgLy8gJ2dldEJsdWV0b290aERldmljZXMnLFxyXG4gIC8vICdnZXRCbHVldG9vdGhBZGFwdGVyU3RhdGUnLFxyXG4gIC8vICdjbG9zZUJsdWV0b290aEFkYXB0ZXInLFxyXG4gIC8vICd3cml0ZUJMRUNoYXJhY3RlcmlzdGljVmFsdWUnLFxyXG4gIC8vICdyZWFkQkxFQ2hhcmFjdGVyaXN0aWNWYWx1ZScsXHJcbiAgLy8gJ29uQkxFQ29ubmVjdGlvblN0YXRlQ2hhbmdlJyxcclxuICAvLyAnb25CTEVDaGFyYWN0ZXJpc3RpY1ZhbHVlQ2hhbmdlJyxcclxuICAvLyAnbm90aWZ5QkxFQ2hhcmFjdGVyaXN0aWNWYWx1ZUNoYW5nZScsXHJcbiAgLy8gJ2dldEJMRURldmljZVNlcnZpY2VzJyxcclxuICAvLyAnZ2V0QkxFRGV2aWNlQ2hhcmFjdGVyaXN0aWNzJyxcclxuICAvLyAnY3JlYXRlQkxFQ29ubmVjdGlvbicsXHJcbiAgLy8gJ2Nsb3NlQkxFQ29ubmVjdGlvbicsXHJcbiAgLy8gJ29uQmVhY29uU2VydmljZUNoYW5nZScsXHJcbiAgLy8gJ29uQmVhY29uVXBkYXRlJyxcclxuICAvLyAnZ2V0QmVhY29ucycsXHJcbiAgLy8gJ3N0YXJ0QmVhY29uRGlzY292ZXJ5JyxcclxuICAvLyAnc3RvcEJlYWNvbkRpc2NvdmVyeScsXHJcbiAgLy8gJ3Nob3dOYXZpZ2F0aW9uQmFyTG9hZGluZycsXHJcbiAgLy8gJ2hpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZycsXHJcbiAgLy8gJ3NldFRhYkJhckl0ZW0nLFxyXG4gIC8vICdzZXRUYWJCYXJTdHlsZScsXHJcbiAgLy8gJ2hpZGVUYWJCYXInLFxyXG4gIC8vICdzaG93VGFiQmFyJyxcclxuICAvLyAnc2V0VGFiQmFyQmFkZ2UnLFxyXG4gIC8vICdyZW1vdmVUYWJCYXJCYWRnZScsXHJcbiAgLy8gJ3Nob3dUYWJCYXJSZWREb3QnLFxyXG4gIC8vICdoaWRlVGFiQmFyUmVkRG90JyxcclxuICAvLyAnc2V0QmFja2dyb3VuZENvbG9yJyxcclxuICAvLyAnc2V0QmFja2dyb3VuZFRleHRTdHlsZScsXHJcbiAgLy8gJ2Nob29zZUludm9pY2VUaXRsZScsXHJcbiAgLy8gJ2FkZFRlbXBsYXRlJyxcclxuICAvLyAnZGVsZXRlVGVtcGxhdGUnLFxyXG4gIC8vICdnZXRUZW1wbGF0ZUxpYnJhcnlCeUlkJyxcclxuICAvLyAnZ2V0VGVtcGxhdGVMaWJyYXJ5TGlzdCcsXHJcbiAgLy8gJ2dldFRlbXBsYXRlTGlzdCcsXHJcbiAgLy8gJ3NlbmRUZW1wbGF0ZU1lc3NhZ2UnLFxyXG4gIC8vICdzZXRFbmFibGVEZWJ1ZycsXHJcbiAgLy8gJ29uV2luZG93UmVzaXplJyxcclxuICAvLyAnb2ZmV2luZG93UmVzaXplJyxcclxuICAvLyAnY3JlYXRlT2Zmc2NyZWVuQ2FudmFzJyxcclxuICAvLyAndmlicmF0ZSdcclxuXTtcclxuXHJcbi8vIOWtmOWcqOWFvOWuueaAp+eahCBBUEkg5YiX6KGoXHJcbi8vIOWktOadoeWwj+eoi+W6j+iHqjEuMzUuMCvmlK/mjIFjYW5JVXNlc1xyXG5jb25zdCBjYW5JVXNlcyA9IFtcclxuICAvLyAnY3JlYXRlSW50ZXJzZWN0aW9uT2JzZXJ2ZXInLFxyXG4gIC8vICdnZXRTYXZlZEZpbGVMaXN0JyxcclxuICAvLyAncmVtb3ZlU2F2ZWRGaWxlJyxcclxuICAvLyAnaGlkZUtleWJvYXJkJyxcclxuICAvLyAnZ2V0SW1hZ2VJbmZvJyxcclxuICAvLyAnY3JlYXRlVmlkZW9Db250ZXh0JyxcclxuICAvLyAnb25Tb2NrZXRPcGVuJyxcclxuICAvLyAnb25Tb2NrZXRFcnJvcicsXHJcbiAgLy8gJ3NlbmRTb2NrZXRNZXNzYWdlJyxcclxuICAvLyAnb25Tb2NrZXRNZXNzYWdlJyxcclxuICAvLyAnY2xvc2VTb2NrZXQnLFxyXG4gIC8vICdvblNvY2tldENsb3NlJyxcclxuICAvLyAnZ2V0RXh0Q29uZmlnJyxcclxuICAvLyAnZ2V0RXh0Q29uZmlnU3luYycsXHJcbiAgLy8gJ25hdmlnYXRlVG9NaW5pUHJvZ3JhbScsXHJcbiAgLy8gJ25hdmlnYXRlQmFja01pbmlQcm9ncmFtJyxcclxuICAvLyAnY29tcHJlc3NJbWFnZScsXHJcbiAgLy8gJ2Nob29zZUxvY2F0aW9uJyxcclxuICAvLyAnb3BlbkRvY3VtZW50JyxcclxuICAvLyAnb25Vc2VyQ2FwdHVyZVNjcmVlbicsXHJcbiAgLy8gJ2dldEJhY2tncm91bmRBdWRpb01hbmFnZXInLFxyXG4gIC8vICdzZXROYXZpZ2F0aW9uQmFyQ29sb3InLFxyXG5dO1xyXG5cclxuLy8g6ZyA6KaB5YGa6L2s5o2i55qEIEFQSSDliJfooahcclxuY29uc3QgcHJvdG9jb2xzID0ge1xyXG4gIGNob29zZUltYWdlOiB7XHJcbiAgICBhcmdzOiB7XHJcbiAgICAgIHNpemVUeXBlOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcHJldmlld0ltYWdlLFxyXG4gIGNvbm5lY3RTb2NrZXQ6IHtcclxuICAgIGFyZ3M6IHtcclxuICAgICAgbWV0aG9kOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2hvb3NlVmlkZW86IHtcclxuICAgIGFyZ3M6IHtcclxuICAgICAgY2FtZXJhOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2NhbkNvZGU6IHtcclxuICAgIGFyZ3M6IHtcclxuICAgICAgb25seUZyb21DYW1lcmE6IGZhbHNlLFxyXG4gICAgICBzY2FuVHlwZTogZmFsc2VcclxuICAgIH1cclxuICB9LFxyXG4gIHN0YXJ0QWNjZWxlcm9tZXRlcjoge1xyXG4gICAgYXJnczoge1xyXG4gICAgICBpbnRlcnZhbDogZmFsc2VcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dUb2FzdDoge1xyXG4gICAgYXJnczoge1xyXG4gICAgICBpbWFnZTogZmFsc2UsXHJcbiAgICAgIG1hc2s6IGZhbHNlXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93TG9hZGluZzoge1xyXG4gICAgYXJnczoge1xyXG4gICAgICBtYXNrOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd01vZGFsOiB7XHJcbiAgICBhcmdzOiB7XHJcbiAgICAgIGNhbmNlbENvbG9yOiBmYWxzZSxcclxuICAgICAgY29uZmlybUNvbG9yOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd0FjdGlvblNoZWV0OiB7XHJcbiAgICBhcmdzOiB7XHJcbiAgICAgIGl0ZW1Db2xvcjogZmFsc2VcclxuICAgIH1cclxuICB9LFxyXG4gIGxvZ2luOiB7XHJcbiAgICBhcmdzOiB7XHJcbiAgICAgIHNjb3BlczogZmFsc2UsXHJcbiAgICAgIHRpbWVvdXQ6IGZhbHNlXHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRVc2VySW5mbzoge1xyXG4gICAgYXJnczoge1xyXG4gICAgICBsYW5nOiBmYWxzZSxcclxuICAgICAgdGltZW91dDogZmFsc2VcclxuICAgIH1cclxuICB9LFxyXG4gIHJlcXVlc3RQYXltZW50OiB7XHJcbiAgICBuYW1lOiB0dC5wYXkgPyAncGF5JyA6ICdyZXF1ZXN0UGF5bWVudCcsXHJcbiAgICBhcmdzOiB7XHJcbiAgICAgIG9yZGVySW5mbzogdHQucGF5ID8gJ29yZGVySW5mbycgOiAnZGF0YSdcclxuICAgIH1cclxuICB9LFxyXG4gIGdldEZpbGVJbmZvOiB7XHJcbiAgICBhcmdzOiB7XHJcbiAgICAgIGRpZ2VzdEFsZ29yaXRobTogZmFsc2VcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBDQUxMQkFDS1MgPSBbJ3N1Y2Nlc3MnLCAnZmFpbCcsICdjYW5jZWwnLCAnY29tcGxldGUnXTtcclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NDYWxsYmFjayAobWV0aG9kTmFtZSwgbWV0aG9kLCByZXR1cm5WYWx1ZSkge1xyXG4gIHJldHVybiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICByZXR1cm4gbWV0aG9kKHByb2Nlc3NSZXR1cm5WYWx1ZShtZXRob2ROYW1lLCByZXMsIHJldHVyblZhbHVlKSlcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NBcmdzIChtZXRob2ROYW1lLCBmcm9tQXJncywgYXJnc09wdGlvbiA9IHt9LCByZXR1cm5WYWx1ZSA9IHt9LCBrZWVwRnJvbUFyZ3MgPSBmYWxzZSkge1xyXG4gIGlmIChpc1BsYWluT2JqZWN0KGZyb21BcmdzKSkgeyAvLyDkuIDoiKwgYXBpIOeahOWPguaVsOino+aekFxyXG4gICAgY29uc3QgdG9BcmdzID0ga2VlcEZyb21BcmdzID09PSB0cnVlID8gZnJvbUFyZ3MgOiB7fTsgLy8gcmV0dXJuVmFsdWUg5Li6IGZhbHNlIOaXtu+8jOivtOaYjuaYr+agvOW8j+WMlui/lOWbnuWAvO+8jOebtOaOpeWcqOi/lOWbnuWAvOWvueixoeS4iuS/ruaUuei1i+WAvFxyXG4gICAgaWYgKGlzRm4oYXJnc09wdGlvbikpIHtcclxuICAgICAgYXJnc09wdGlvbiA9IGFyZ3NPcHRpb24oZnJvbUFyZ3MsIHRvQXJncykgfHwge307XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZnJvbUFyZ3MpIHtcclxuICAgICAgaWYgKGhhc093bihhcmdzT3B0aW9uLCBrZXkpKSB7XHJcbiAgICAgICAgbGV0IGtleU9wdGlvbiA9IGFyZ3NPcHRpb25ba2V5XTtcclxuICAgICAgICBpZiAoaXNGbihrZXlPcHRpb24pKSB7XHJcbiAgICAgICAgICBrZXlPcHRpb24gPSBrZXlPcHRpb24oZnJvbUFyZ3Nba2V5XSwgZnJvbUFyZ3MsIHRvQXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgha2V5T3B0aW9uKSB7IC8vIOS4jeaUr+aMgeeahOWPguaVsFxyXG4gICAgICAgICAgY29uc29sZS53YXJuKGDlpLTmnaHlsI/nqIvluo8gJHttZXRob2ROYW1lfeaaguS4jeaUr+aMgSR7a2V5fWApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHIoa2V5T3B0aW9uKSkgeyAvLyDph43lhpnlj4LmlbAga2V5XHJcbiAgICAgICAgICB0b0FyZ3Nba2V5T3B0aW9uXSA9IGZyb21BcmdzW2tleV07XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGtleU9wdGlvbikpIHsgLy8ge25hbWU6bmV3TmFtZSx2YWx1ZTp2YWx1ZX3lj6/ph43mlrDmjIflrprlj4LmlbAga2V5OnZhbHVlXHJcbiAgICAgICAgICB0b0FyZ3Nba2V5T3B0aW9uLm5hbWUgPyBrZXlPcHRpb24ubmFtZSA6IGtleV0gPSBrZXlPcHRpb24udmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKENBTExCQUNLUy5pbmRleE9mKGtleSkgIT09IC0xKSB7XHJcbiAgICAgICAgdG9BcmdzW2tleV0gPSBwcm9jZXNzQ2FsbGJhY2sobWV0aG9kTmFtZSwgZnJvbUFyZ3Nba2V5XSwgcmV0dXJuVmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICgha2VlcEZyb21BcmdzKSB7XHJcbiAgICAgICAgICB0b0FyZ3Nba2V5XSA9IGZyb21BcmdzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9BcmdzXHJcbiAgfSBlbHNlIGlmIChpc0ZuKGZyb21BcmdzKSkge1xyXG4gICAgZnJvbUFyZ3MgPSBwcm9jZXNzQ2FsbGJhY2sobWV0aG9kTmFtZSwgZnJvbUFyZ3MsIHJldHVyblZhbHVlKTtcclxuICB9XHJcbiAgcmV0dXJuIGZyb21BcmdzXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NSZXR1cm5WYWx1ZSAobWV0aG9kTmFtZSwgcmVzLCByZXR1cm5WYWx1ZSwga2VlcFJldHVyblZhbHVlID0gZmFsc2UpIHtcclxuICBpZiAoaXNGbihwcm90b2NvbHMucmV0dXJuVmFsdWUpKSB7IC8vIOWkhOeQhumAmueUqCByZXR1cm5WYWx1ZVxyXG4gICAgcmVzID0gcHJvdG9jb2xzLnJldHVyblZhbHVlKG1ldGhvZE5hbWUsIHJlcyk7XHJcbiAgfVxyXG4gIHJldHVybiBwcm9jZXNzQXJncyhtZXRob2ROYW1lLCByZXMsIHJldHVyblZhbHVlLCB7fSwga2VlcFJldHVyblZhbHVlKVxyXG59XHJcblxyXG5mdW5jdGlvbiB3cmFwcGVyIChtZXRob2ROYW1lLCBtZXRob2QpIHtcclxuICBpZiAoaGFzT3duKHByb3RvY29scywgbWV0aG9kTmFtZSkpIHtcclxuICAgIGNvbnN0IHByb3RvY29sID0gcHJvdG9jb2xzW21ldGhvZE5hbWVdO1xyXG4gICAgaWYgKCFwcm90b2NvbCkgeyAvLyDmmoLkuI3mlK/mjIHnmoQgYXBpXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihg5aS05p2h5bCP56iL5bqPIOaaguS4jeaUr+aMgSR7bWV0aG9kTmFtZX1gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcxLCBhcmcyKSB7IC8vIOebruWJjSBhcGkg5pyA5aSa5Lik5Liq5Y+C5pWwXHJcbiAgICAgIGxldCBvcHRpb25zID0gcHJvdG9jb2w7XHJcbiAgICAgIGlmIChpc0ZuKHByb3RvY29sKSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBwcm90b2NvbChhcmcxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXJnMSA9IHByb2Nlc3NBcmdzKG1ldGhvZE5hbWUsIGFyZzEsIG9wdGlvbnMuYXJncywgb3B0aW9ucy5yZXR1cm5WYWx1ZSk7XHJcblxyXG4gICAgICBjb25zdCBhcmdzID0gW2FyZzFdO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgYXJncy5wdXNoKGFyZzIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gdHRbb3B0aW9ucy5uYW1lIHx8IG1ldGhvZE5hbWVdLmFwcGx5KHR0LCBhcmdzKTtcclxuICAgICAgaWYgKGlzU3luY0FwaShtZXRob2ROYW1lKSkgeyAvLyDlkIzmraUgYXBpXHJcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NSZXR1cm5WYWx1ZShtZXRob2ROYW1lLCByZXR1cm5WYWx1ZSwgb3B0aW9ucy5yZXR1cm5WYWx1ZSwgaXNDb250ZXh0QXBpKG1ldGhvZE5hbWUpKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXR1cm5WYWx1ZVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWV0aG9kXHJcbn1cclxuXHJcbmNvbnN0IHRvZG9BcGlzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbmNvbnN0IFRPRE9TID0gW1xyXG4gICdvblRhYkJhck1pZEJ1dHRvblRhcCcsXHJcbiAgJ3N1YnNjcmliZVB1c2gnLFxyXG4gICd1bnN1YnNjcmliZVB1c2gnLFxyXG4gICdvblB1c2gnLFxyXG4gICdvZmZQdXNoJyxcclxuICAnc2hhcmUnXHJcbl07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb2RvQXBpIChuYW1lKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHRvZG9BcGkgKHtcclxuICAgIGZhaWwsXHJcbiAgICBjb21wbGV0ZVxyXG4gIH0pIHtcclxuICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgZXJyTXNnOiBgJHtuYW1lfTpmYWlsOuaaguS4jeaUr+aMgSAke25hbWV9IOaWueazlWBcclxuICAgIH07XHJcbiAgICBpc0ZuKGZhaWwpICYmIGZhaWwocmVzKTtcclxuICAgIGlzRm4oY29tcGxldGUpICYmIGNvbXBsZXRlKHJlcyk7XHJcbiAgfVxyXG59XHJcblxyXG5UT0RPUy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgdG9kb0FwaXNbbmFtZV0gPSBjcmVhdGVUb2RvQXBpKG5hbWUpO1xyXG59KTtcclxuXHJcbnZhciBwcm92aWRlcnMgPSB7XHJcbiAgb2F1dGg6IFsndG91dGlhbyddLFxyXG4gIHNoYXJlOiBbJ3RvdXRpYW8nXSxcclxuICBwYXltZW50OiBbJ3RvdXRpYW8nXSxcclxuICBwdXNoOiBbJ3RvdXRpYW8nXVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0UHJvdmlkZXIgKHtcclxuICBzZXJ2aWNlLFxyXG4gIHN1Y2Nlc3MsXHJcbiAgZmFpbCxcclxuICBjb21wbGV0ZVxyXG59KSB7XHJcbiAgbGV0IHJlcyA9IGZhbHNlO1xyXG4gIGlmIChwcm92aWRlcnNbc2VydmljZV0pIHtcclxuICAgIHJlcyA9IHtcclxuICAgICAgZXJyTXNnOiAnZ2V0UHJvdmlkZXI6b2snLFxyXG4gICAgICBzZXJ2aWNlLFxyXG4gICAgICBwcm92aWRlcjogcHJvdmlkZXJzW3NlcnZpY2VdXHJcbiAgICB9O1xyXG4gICAgaXNGbihzdWNjZXNzKSAmJiBzdWNjZXNzKHJlcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlcyA9IHtcclxuICAgICAgZXJyTXNnOiAnZ2V0UHJvdmlkZXI6ZmFpbDrmnI3liqFbJyArIHNlcnZpY2UgKyAnXeS4jeWtmOWcqCdcclxuICAgIH07XHJcbiAgICBpc0ZuKGZhaWwpICYmIGZhaWwocmVzKTtcclxuICB9XHJcbiAgaXNGbihjb21wbGV0ZSkgJiYgY29tcGxldGUocmVzKTtcclxufVxyXG5cclxudmFyIGV4dHJhQXBpID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xyXG4gIF9fcHJvdG9fXzogbnVsbCxcclxuICBnZXRQcm92aWRlcjogZ2V0UHJvdmlkZXJcclxufSk7XHJcblxyXG5jb25zdCBnZXRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICBpZiAodHlwZW9mIGdldFVuaUVtaXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbiAgICByZXR1cm4gZ2V0VW5pRW1pdHRlclxyXG4gIH1cclxuICBsZXQgRW1pdHRlcjtcclxuICByZXR1cm4gZnVuY3Rpb24gZ2V0VW5pRW1pdHRlciAoKSB7XHJcbiAgICBpZiAoIUVtaXR0ZXIpIHtcclxuICAgICAgRW1pdHRlciA9IG5ldyBWdWUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbWl0dGVyXHJcbiAgfVxyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHkgKGN0eCwgbWV0aG9kLCBhcmdzKSB7XHJcbiAgcmV0dXJuIGN0eFttZXRob2RdLmFwcGx5KGN0eCwgYXJncylcclxufVxyXG5cclxuZnVuY3Rpb24gJG9uICgpIHtcclxuICByZXR1cm4gYXBwbHkoZ2V0RW1pdHRlcigpLCAnJG9uJywgWy4uLmFyZ3VtZW50c10pXHJcbn1cclxuZnVuY3Rpb24gJG9mZiAoKSB7XHJcbiAgcmV0dXJuIGFwcGx5KGdldEVtaXR0ZXIoKSwgJyRvZmYnLCBbLi4uYXJndW1lbnRzXSlcclxufVxyXG5mdW5jdGlvbiAkb25jZSAoKSB7XHJcbiAgcmV0dXJuIGFwcGx5KGdldEVtaXR0ZXIoKSwgJyRvbmNlJywgWy4uLmFyZ3VtZW50c10pXHJcbn1cclxuZnVuY3Rpb24gJGVtaXQgKCkge1xyXG4gIHJldHVybiBhcHBseShnZXRFbWl0dGVyKCksICckZW1pdCcsIFsuLi5hcmd1bWVudHNdKVxyXG59XHJcblxyXG52YXIgZXZlbnRBcGkgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XHJcbiAgX19wcm90b19fOiBudWxsLFxyXG4gICRvbjogJG9uLFxyXG4gICRvZmY6ICRvZmYsXHJcbiAgJG9uY2U6ICRvbmNlLFxyXG4gICRlbWl0OiAkZW1pdFxyXG59KTtcclxuXHJcblxyXG5cclxudmFyIGFwaSA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcclxuICBfX3Byb3RvX186IG51bGxcclxufSk7XHJcblxyXG5jb25zdCBNUFBhZ2UgPSBQYWdlO1xyXG5jb25zdCBNUENvbXBvbmVudCA9IENvbXBvbmVudDtcclxuXHJcbmNvbnN0IGN1c3RvbWl6ZVJFID0gLzovZztcclxuXHJcbmNvbnN0IGN1c3RvbWl6ZSA9IGNhY2hlZCgoc3RyKSA9PiB7XHJcbiAgcmV0dXJuIGNhbWVsaXplKHN0ci5yZXBsYWNlKGN1c3RvbWl6ZVJFLCAnLScpKVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGluaXRUcmlnZ2VyRXZlbnQgKG1wSW5zdGFuY2UpIHtcclxuICBjb25zdCBvbGRUcmlnZ2VyRXZlbnQgPSBtcEluc3RhbmNlLnRyaWdnZXJFdmVudDtcclxuICBtcEluc3RhbmNlLnRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uIChldmVudCwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIG9sZFRyaWdnZXJFdmVudC5hcHBseShtcEluc3RhbmNlLCBbY3VzdG9taXplKGV2ZW50KSwgLi4uYXJnc10pXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEhvb2sgKG5hbWUsIG9wdGlvbnMpIHtcclxuICBjb25zdCBvbGRIb29rID0gb3B0aW9uc1tuYW1lXTtcclxuICBpZiAoIW9sZEhvb2spIHtcclxuICAgIG9wdGlvbnNbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGluaXRUcmlnZ2VyRXZlbnQodGhpcyk7XHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBvcHRpb25zW25hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgaW5pdFRyaWdnZXJFdmVudCh0aGlzKTtcclxuICAgICAgcmV0dXJuIG9sZEhvb2suYXBwbHkodGhpcywgYXJncylcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5QYWdlID0gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xyXG4gIGluaXRIb29rKCdvbkxvYWQnLCBvcHRpb25zKTtcclxuICByZXR1cm4gTVBQYWdlKG9wdGlvbnMpXHJcbn07XHJcblxyXG5Db21wb25lbnQgPSBmdW5jdGlvbiAob3B0aW9ucyA9IHt9KSB7XHJcbiAgaW5pdEhvb2soJ2NyZWF0ZWQnLCBvcHRpb25zKTtcclxuICByZXR1cm4gTVBDb21wb25lbnQob3B0aW9ucylcclxufTtcclxuXHJcbmNvbnN0IFBBR0VfRVZFTlRfSE9PS1MgPSBbXHJcbiAgJ29uUHVsbERvd25SZWZyZXNoJyxcclxuICAnb25SZWFjaEJvdHRvbScsXHJcbiAgJ29uU2hhcmVBcHBNZXNzYWdlJyxcclxuICAnb25QYWdlU2Nyb2xsJyxcclxuICAnb25SZXNpemUnLFxyXG4gICdvblRhYkl0ZW1UYXAnXHJcbl07XHJcblxyXG5mdW5jdGlvbiBpbml0TW9ja3MgKHZtLCBtb2Nrcykge1xyXG4gIGNvbnN0IG1wSW5zdGFuY2UgPSB2bS4kbXBbdm0ubXBUeXBlXTtcclxuICBtb2Nrcy5mb3JFYWNoKG1vY2sgPT4ge1xyXG4gICAgaWYgKGhhc093bihtcEluc3RhbmNlLCBtb2NrKSkge1xyXG4gICAgICB2bVttb2NrXSA9IG1wSW5zdGFuY2VbbW9ja107XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhc0hvb2sgKGhvb2ssIHZ1ZU9wdGlvbnMpIHtcclxuICBpZiAoIXZ1ZU9wdGlvbnMpIHtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBpZiAoVnVlLm9wdGlvbnMgJiYgQXJyYXkuaXNBcnJheShWdWUub3B0aW9uc1tob29rXSkpIHtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICB2dWVPcHRpb25zID0gdnVlT3B0aW9ucy5kZWZhdWx0IHx8IHZ1ZU9wdGlvbnM7XHJcblxyXG4gIGlmIChpc0ZuKHZ1ZU9wdGlvbnMpKSB7XHJcbiAgICBpZiAoaXNGbih2dWVPcHRpb25zLmV4dGVuZE9wdGlvbnNbaG9va10pKSB7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICBpZiAodnVlT3B0aW9ucy5zdXBlciAmJlxyXG4gICAgICB2dWVPcHRpb25zLnN1cGVyLm9wdGlvbnMgJiZcclxuICAgICAgQXJyYXkuaXNBcnJheSh2dWVPcHRpb25zLnN1cGVyLm9wdGlvbnNbaG9va10pKSB7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIGlmIChpc0ZuKHZ1ZU9wdGlvbnNbaG9va10pKSB7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBjb25zdCBtaXhpbnMgPSB2dWVPcHRpb25zLm1peGlucztcclxuICBpZiAoQXJyYXkuaXNBcnJheShtaXhpbnMpKSB7XHJcbiAgICByZXR1cm4gISFtaXhpbnMuZmluZChtaXhpbiA9PiBoYXNIb29rKGhvb2ssIG1peGluKSlcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRIb29rcyAobXBPcHRpb25zLCBob29rcywgdnVlT3B0aW9ucykge1xyXG4gIGhvb2tzLmZvckVhY2goaG9vayA9PiB7XHJcbiAgICBpZiAoaGFzSG9vayhob29rLCB2dWVPcHRpb25zKSkge1xyXG4gICAgICBtcE9wdGlvbnNbaG9va10gPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiR2bSAmJiB0aGlzLiR2bS5fX2NhbGxfaG9vayhob29rLCBhcmdzKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0VnVlQ29tcG9uZW50IChWdWUsIHZ1ZU9wdGlvbnMpIHtcclxuICB2dWVPcHRpb25zID0gdnVlT3B0aW9ucy5kZWZhdWx0IHx8IHZ1ZU9wdGlvbnM7XHJcbiAgbGV0IFZ1ZUNvbXBvbmVudDtcclxuICBpZiAoaXNGbih2dWVPcHRpb25zKSkge1xyXG4gICAgVnVlQ29tcG9uZW50ID0gdnVlT3B0aW9ucztcclxuICAgIHZ1ZU9wdGlvbnMgPSBWdWVDb21wb25lbnQuZXh0ZW5kT3B0aW9ucztcclxuICB9IGVsc2Uge1xyXG4gICAgVnVlQ29tcG9uZW50ID0gVnVlLmV4dGVuZCh2dWVPcHRpb25zKTtcclxuICB9XHJcbiAgcmV0dXJuIFtWdWVDb21wb25lbnQsIHZ1ZU9wdGlvbnNdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRTbG90cyAodm0sIHZ1ZVNsb3RzKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodnVlU2xvdHMpICYmIHZ1ZVNsb3RzLmxlbmd0aCkge1xyXG4gICAgY29uc3QgJHNsb3RzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIHZ1ZVNsb3RzLmZvckVhY2goc2xvdE5hbWUgPT4ge1xyXG4gICAgICAkc2xvdHNbc2xvdE5hbWVdID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgdm0uJHNjb3BlZFNsb3RzID0gdm0uJHNsb3RzID0gJHNsb3RzO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFZ1ZUlkcyAodnVlSWRzLCBtcEluc3RhbmNlKSB7XHJcbiAgdnVlSWRzID0gKHZ1ZUlkcyB8fCAnJykuc3BsaXQoJywnKTtcclxuICBjb25zdCBsZW4gPSB2dWVJZHMubGVuZ3RoO1xyXG5cclxuICBpZiAobGVuID09PSAxKSB7XHJcbiAgICBtcEluc3RhbmNlLl8kdnVlSWQgPSB2dWVJZHNbMF07XHJcbiAgfSBlbHNlIGlmIChsZW4gPT09IDIpIHtcclxuICAgIG1wSW5zdGFuY2UuXyR2dWVJZCA9IHZ1ZUlkc1swXTtcclxuICAgIG1wSW5zdGFuY2UuXyR2dWVQaWQgPSB2dWVJZHNbMV07XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0RGF0YSAodnVlT3B0aW9ucywgY29udGV4dCkge1xyXG4gIGxldCBkYXRhID0gdnVlT3B0aW9ucy5kYXRhIHx8IHt9O1xyXG4gIGNvbnN0IG1ldGhvZHMgPSB2dWVPcHRpb25zLm1ldGhvZHMgfHwge307XHJcblxyXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGF0YSA9IGRhdGEuY2FsbChjb250ZXh0KTsgLy8g5pSv5oyBIFZ1ZS5wcm90b3R5cGUg5LiK5oyC55qE5pWw5o2uXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmIChwcm9jZXNzLmVudi5WVUVfQVBQX0RFQlVHKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCfmoLnmja4gVnVlIOeahCBkYXRhIOWHveaVsOWIneWni+WMluWwj+eoi+W6jyBkYXRhIOWksei0pe+8jOivt+WwvemHj+ehruS/nSBkYXRhIOWHveaVsOS4reS4jeiuv+mXriB2bSDlr7nosaHvvIzlkKbliJnlj6/og73lvbHlk43pppbmrKHmlbDmja7muLLmn5PpgJ/luqbjgIInLCBkYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyDlr7kgZGF0YSDmoLzlvI/ljJZcclxuICAgICAgZGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfSBjYXRjaCAoZSkge31cclxuICB9XHJcblxyXG4gIGlmICghaXNQbGFpbk9iamVjdChkYXRhKSkge1xyXG4gICAgZGF0YSA9IHt9O1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmtleXMobWV0aG9kcykuZm9yRWFjaChtZXRob2ROYW1lID0+IHtcclxuICAgIGlmIChjb250ZXh0Ll9fbGlmZWN5Y2xlX2hvb2tzX18uaW5kZXhPZihtZXRob2ROYW1lKSA9PT0gLTEgJiYgIWhhc093bihkYXRhLCBtZXRob2ROYW1lKSkge1xyXG4gICAgICBkYXRhW21ldGhvZE5hbWVdID0gbWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGRhdGFcclxufVxyXG5cclxuY29uc3QgUFJPUF9UWVBFUyA9IFtTdHJpbmcsIE51bWJlciwgQm9vbGVhbiwgT2JqZWN0LCBBcnJheSwgbnVsbF07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZlciAobmFtZSkge1xyXG4gIHJldHVybiBmdW5jdGlvbiBvYnNlcnZlciAobmV3VmFsLCBvbGRWYWwpIHtcclxuICAgIGlmICh0aGlzLiR2bSkge1xyXG4gICAgICB0aGlzLiR2bVtuYW1lXSA9IG5ld1ZhbDsgLy8g5Li65LqG6Kem5Y+R5YW25LuW6Z2eIHJlbmRlciB3YXRjaGVyXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0QmVoYXZpb3JzICh2dWVPcHRpb25zLCBpbml0QmVoYXZpb3IpIHtcclxuICBjb25zdCB2dWVCZWhhdmlvcnMgPSB2dWVPcHRpb25zWydiZWhhdmlvcnMnXTtcclxuICBjb25zdCB2dWVFeHRlbmRzID0gdnVlT3B0aW9uc1snZXh0ZW5kcyddO1xyXG4gIGNvbnN0IHZ1ZU1peGlucyA9IHZ1ZU9wdGlvbnNbJ21peGlucyddO1xyXG5cclxuICBsZXQgdnVlUHJvcHMgPSB2dWVPcHRpb25zWydwcm9wcyddO1xyXG5cclxuICBpZiAoIXZ1ZVByb3BzKSB7XHJcbiAgICB2dWVPcHRpb25zWydwcm9wcyddID0gdnVlUHJvcHMgPSBbXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGJlaGF2aW9ycyA9IFtdO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHZ1ZUJlaGF2aW9ycykpIHtcclxuICAgIHZ1ZUJlaGF2aW9ycy5mb3JFYWNoKGJlaGF2aW9yID0+IHtcclxuICAgICAgYmVoYXZpb3JzLnB1c2goYmVoYXZpb3IucmVwbGFjZSgndW5pOi8vJywgYCR7XCJ0dFwifTovL2ApKTtcclxuICAgICAgaWYgKGJlaGF2aW9yID09PSAndW5pOi8vZm9ybS1maWVsZCcpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2dWVQcm9wcykpIHtcclxuICAgICAgICAgIHZ1ZVByb3BzLnB1c2goJ25hbWUnKTtcclxuICAgICAgICAgIHZ1ZVByb3BzLnB1c2goJ3ZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZ1ZVByb3BzWyduYW1lJ10gPSB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgZGVmYXVsdDogJydcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB2dWVQcm9wc1sndmFsdWUnXSA9IHtcclxuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyLCBCb29sZWFuLCBBcnJheSwgT2JqZWN0LCBEYXRlXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogJydcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgaWYgKGlzUGxhaW5PYmplY3QodnVlRXh0ZW5kcykgJiYgdnVlRXh0ZW5kcy5wcm9wcykge1xyXG4gICAgYmVoYXZpb3JzLnB1c2goXHJcbiAgICAgIGluaXRCZWhhdmlvcih7XHJcbiAgICAgICAgcHJvcGVydGllczogaW5pdFByb3BlcnRpZXModnVlRXh0ZW5kcy5wcm9wcywgdHJ1ZSlcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGlmIChBcnJheS5pc0FycmF5KHZ1ZU1peGlucykpIHtcclxuICAgIHZ1ZU1peGlucy5mb3JFYWNoKHZ1ZU1peGluID0+IHtcclxuICAgICAgaWYgKGlzUGxhaW5PYmplY3QodnVlTWl4aW4pICYmIHZ1ZU1peGluLnByb3BzKSB7XHJcbiAgICAgICAgYmVoYXZpb3JzLnB1c2goXHJcbiAgICAgICAgICBpbml0QmVoYXZpb3Ioe1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBpbml0UHJvcGVydGllcyh2dWVNaXhpbi5wcm9wcywgdHJ1ZSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBiZWhhdmlvcnNcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VQcm9wVHlwZSAoa2V5LCB0eXBlLCBkZWZhdWx0VmFsdWUsIGZpbGUpIHtcclxuICAvLyBbU3RyaW5nXT0+U3RyaW5nXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkgJiYgdHlwZS5sZW5ndGggPT09IDEpIHtcclxuICAgIHJldHVybiB0eXBlWzBdXHJcbiAgfVxyXG4gIHJldHVybiB0eXBlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQcm9wZXJ0aWVzIChwcm9wcywgaXNCZWhhdmlvciA9IGZhbHNlLCBmaWxlID0gJycpIHtcclxuICBjb25zdCBwcm9wZXJ0aWVzID0ge307XHJcbiAgaWYgKCFpc0JlaGF2aW9yKSB7XHJcbiAgICBwcm9wZXJ0aWVzLnZ1ZUlkID0ge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHZhbHVlOiAnJ1xyXG4gICAgfTtcclxuICAgIHByb3BlcnRpZXMudnVlU2xvdHMgPSB7IC8vIOWwj+eoi+W6j+S4jeiDveebtOaOpeWumuS5iSAkc2xvdHMg55qEIHByb3Bz77yM5omA5Lul6YCa6L+HIHZ1ZVNsb3RzIOi9rOaNouWIsCAkc2xvdHNcclxuICAgICAgdHlwZTogbnVsbCxcclxuICAgICAgdmFsdWU6IFtdLFxyXG4gICAgICBvYnNlcnZlcjogZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAgICAgY29uc3QgJHNsb3RzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICBuZXdWYWwuZm9yRWFjaChzbG90TmFtZSA9PiB7XHJcbiAgICAgICAgICAkc2xvdHNbc2xvdE5hbWVdID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgJHNsb3RzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzKSkgeyAvLyBbJ3RpdGxlJ11cclxuICAgIHByb3BzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgcHJvcGVydGllc1trZXldID0ge1xyXG4gICAgICAgIHR5cGU6IG51bGwsXHJcbiAgICAgICAgb2JzZXJ2ZXI6IGNyZWF0ZU9ic2VydmVyKGtleSlcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChwcm9wcykpIHsgLy8ge3RpdGxlOnt0eXBlOlN0cmluZyxkZWZhdWx0OicnfSxjb250ZW50OlN0cmluZ31cclxuICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wdHMgPSBwcm9wc1trZXldO1xyXG4gICAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRzKSkgeyAvLyB0aXRsZTp7dHlwZTpTdHJpbmcsZGVmYXVsdDonJ31cclxuICAgICAgICBsZXQgdmFsdWUgPSBvcHRzWydkZWZhdWx0J107XHJcbiAgICAgICAgaWYgKGlzRm4odmFsdWUpKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRzLnR5cGUgPSBwYXJzZVByb3BUeXBlKGtleSwgb3B0cy50eXBlKTtcclxuXHJcbiAgICAgICAgcHJvcGVydGllc1trZXldID0ge1xyXG4gICAgICAgICAgdHlwZTogUFJPUF9UWVBFUy5pbmRleE9mKG9wdHMudHlwZSkgIT09IC0xID8gb3B0cy50eXBlIDogbnVsbCxcclxuICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgb2JzZXJ2ZXI6IGNyZWF0ZU9ic2VydmVyKGtleSlcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2UgeyAvLyBjb250ZW50OlN0cmluZ1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBwYXJzZVByb3BUeXBlKGtleSwgb3B0cyk7XHJcbiAgICAgICAgcHJvcGVydGllc1trZXldID0ge1xyXG4gICAgICAgICAgdHlwZTogUFJPUF9UWVBFUy5pbmRleE9mKHR5cGUpICE9PSAtMSA/IHR5cGUgOiBudWxsLFxyXG4gICAgICAgICAgb2JzZXJ2ZXI6IGNyZWF0ZU9ic2VydmVyKGtleSlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIHByb3BlcnRpZXNcclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcHBlciQxIChldmVudCkge1xyXG4gIC8vIFRPRE8g5Y+I5b6X5YW85a65IG1wdnVlIOeahCBtcCDlr7nosaFcclxuICB0cnkge1xyXG4gICAgZXZlbnQubXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGV2ZW50KSk7XHJcbiAgfSBjYXRjaCAoZSkge31cclxuXHJcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uID0gbm9vcDtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCA9IG5vb3A7XHJcblxyXG4gIGV2ZW50LnRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCB7fTtcclxuXHJcbiAgaWYgKCFoYXNPd24oZXZlbnQsICdkZXRhaWwnKSkge1xyXG4gICAgZXZlbnQuZGV0YWlsID0ge307XHJcbiAgfVxyXG5cclxuICBpZiAoaXNQbGFpbk9iamVjdChldmVudC5kZXRhaWwpKSB7XHJcbiAgICBldmVudC50YXJnZXQgPSBPYmplY3QuYXNzaWduKHt9LCBldmVudC50YXJnZXQsIGV2ZW50LmRldGFpbCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXZlbnRcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RXh0cmFWYWx1ZSAodm0sIGRhdGFQYXRoc0FycmF5KSB7XHJcbiAgbGV0IGNvbnRleHQgPSB2bTtcclxuICBkYXRhUGF0aHNBcnJheS5mb3JFYWNoKGRhdGFQYXRoQXJyYXkgPT4ge1xyXG4gICAgY29uc3QgZGF0YVBhdGggPSBkYXRhUGF0aEFycmF5WzBdO1xyXG4gICAgY29uc3QgdmFsdWUgPSBkYXRhUGF0aEFycmF5WzJdO1xyXG4gICAgaWYgKGRhdGFQYXRoIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gWycnLCcnLGluZGV4LCdkaXNhYmxlJ11cclxuICAgICAgY29uc3QgcHJvcFBhdGggPSBkYXRhUGF0aEFycmF5WzFdO1xyXG4gICAgICBjb25zdCB2YWx1ZVBhdGggPSBkYXRhUGF0aEFycmF5WzNdO1xyXG5cclxuICAgICAgY29uc3QgdkZvciA9IGRhdGFQYXRoID8gdm0uX19nZXRfdmFsdWUoZGF0YVBhdGgsIGNvbnRleHQpIDogY29udGV4dDtcclxuXHJcbiAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHZGb3IpKSB7XHJcbiAgICAgICAgY29udGV4dCA9IHZhbHVlO1xyXG4gICAgICB9IGVsc2UgaWYgKCFwcm9wUGF0aCkge1xyXG4gICAgICAgIGNvbnRleHQgPSB2Rm9yW3ZhbHVlXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2Rm9yKSkge1xyXG4gICAgICAgICAgY29udGV4dCA9IHZGb3IuZmluZCh2Rm9ySXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS5fX2dldF92YWx1ZShwcm9wUGF0aCwgdkZvckl0ZW0pID09PSB2YWx1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZGb3IpKSB7XHJcbiAgICAgICAgICBjb250ZXh0ID0gT2JqZWN0LmtleXModkZvcikuZmluZCh2Rm9yS2V5ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZtLl9fZ2V0X3ZhbHVlKHByb3BQYXRoLCB2Rm9yW3ZGb3JLZXldKSA9PT0gdmFsdWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCd2LWZvciDmmoLkuI3mlK/mjIHlvqrnjq/mlbDmja7vvJonLCB2Rm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh2YWx1ZVBhdGgpIHtcclxuICAgICAgICBjb250ZXh0ID0gdm0uX19nZXRfdmFsdWUodmFsdWVQYXRoLCBjb250ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBjb250ZXh0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NFdmVudEV4dHJhICh2bSwgZXh0cmEsIGV2ZW50KSB7XHJcbiAgY29uc3QgZXh0cmFPYmogPSB7fTtcclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXh0cmEpICYmIGV4dHJhLmxlbmd0aCkge1xyXG4gICAgLyoqXHJcbiAgICAgKltcclxuICAgICAqICAgIFsnZGF0YS5pdGVtcycsICdkYXRhLmlkJywgaXRlbS5kYXRhLmlkXSxcclxuICAgICAqICAgIFsnbWV0YXMnLCAnaWQnLCBtZXRhLmlkXVxyXG4gICAgICpdLFxyXG4gICAgICpbXHJcbiAgICAgKiAgICBbJ2RhdGEuaXRlbXMnLCAnZGF0YS5pZCcsIGl0ZW0uZGF0YS5pZF0sXHJcbiAgICAgKiAgICBbJ21ldGFzJywgJ2lkJywgbWV0YS5pZF1cclxuICAgICAqXSxcclxuICAgICAqJ3Rlc3QnXHJcbiAgICAgKi9cclxuICAgIGV4dHJhLmZvckVhY2goKGRhdGFQYXRoLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIGRhdGFQYXRoID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmICghZGF0YVBhdGgpIHsgLy8gbW9kZWwscHJvcC5zeW5jXHJcbiAgICAgICAgICBleHRyYU9ialsnJCcgKyBpbmRleF0gPSB2bTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKGRhdGFQYXRoID09PSAnJGV2ZW50JykgeyAvLyAkZXZlbnRcclxuICAgICAgICAgICAgZXh0cmFPYmpbJyQnICsgaW5kZXhdID0gZXZlbnQ7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFQYXRoLmluZGV4T2YoJyRldmVudC4nKSA9PT0gMCkgeyAvLyAkZXZlbnQudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgICAgIGV4dHJhT2JqWyckJyArIGluZGV4XSA9IHZtLl9fZ2V0X3ZhbHVlKGRhdGFQYXRoLnJlcGxhY2UoJyRldmVudC4nLCAnJyksIGV2ZW50KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV4dHJhT2JqWyckJyArIGluZGV4XSA9IHZtLl9fZ2V0X3ZhbHVlKGRhdGFQYXRoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXh0cmFPYmpbJyQnICsgaW5kZXhdID0gZ2V0RXh0cmFWYWx1ZSh2bSwgZGF0YVBhdGgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBleHRyYU9ialxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRPYmpCeUFycmF5IChhcnIpIHtcclxuICBjb25zdCBvYmogPSB7fTtcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGFycltpXTtcclxuICAgIG9ialtlbGVtZW50WzBdXSA9IGVsZW1lbnRbMV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmpcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0V2ZW50QXJncyAodm0sIGV2ZW50LCBhcmdzID0gW10sIGV4dHJhID0gW10sIGlzQ3VzdG9tLCBtZXRob2ROYW1lKSB7XHJcbiAgbGV0IGlzQ3VzdG9tTVBFdmVudCA9IGZhbHNlOyAvLyB3eGNvbXBvbmVudCDnu4Tku7bvvIzkvKDpgJLljp/lp4sgZXZlbnQg5a+56LGhXHJcbiAgaWYgKGlzQ3VzdG9tKSB7IC8vIOiHquWumuS5ieS6i+S7tlxyXG4gICAgaXNDdXN0b21NUEV2ZW50ID0gZXZlbnQuY3VycmVudFRhcmdldCAmJlxyXG4gICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQgJiZcclxuICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbVR5cGUgPT09ICd3eCc7XHJcbiAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7IC8vIOaXoOWPguaVsO+8jOebtOaOpeS8oOWFpSBldmVudCDmiJYgZGV0YWlsIOaVsOe7hFxyXG4gICAgICBpZiAoaXNDdXN0b21NUEV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIFtldmVudF1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZXZlbnQuZGV0YWlsLl9fYXJnc19fIHx8IGV2ZW50LmRldGFpbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZXh0cmFPYmogPSBwcm9jZXNzRXZlbnRFeHRyYSh2bSwgZXh0cmEsIGV2ZW50KTtcclxuXHJcbiAgY29uc3QgcmV0ID0gW107XHJcbiAgYXJncy5mb3JFYWNoKGFyZyA9PiB7XHJcbiAgICBpZiAoYXJnID09PSAnJGV2ZW50Jykge1xyXG4gICAgICBpZiAobWV0aG9kTmFtZSA9PT0gJ19fc2V0X21vZGVsJyAmJiAhaXNDdXN0b20pIHsgLy8gaW5wdXQgdi1tb2RlbCB2YWx1ZVxyXG4gICAgICAgIHJldC5wdXNoKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGlzQ3VzdG9tICYmICFpc0N1c3RvbU1QRXZlbnQpIHtcclxuICAgICAgICAgIHJldC5wdXNoKGV2ZW50LmRldGFpbC5fX2FyZ3NfX1swXSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gd3hjb21wb25lbnQg57uE5Lu25oiW5YaF572u57uE5Lu2XHJcbiAgICAgICAgICByZXQucHVzaChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZ1swXSA9PT0gJ28nKSB7XHJcbiAgICAgICAgcmV0LnB1c2goZ2V0T2JqQnlBcnJheShhcmcpKTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyAmJiBoYXNPd24oZXh0cmFPYmosIGFyZykpIHtcclxuICAgICAgICByZXQucHVzaChleHRyYU9ialthcmddKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXQucHVzaChhcmcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiByZXRcclxufVxyXG5cclxuY29uc3QgT05DRSA9ICd+JztcclxuY29uc3QgQ1VTVE9NID0gJ14nO1xyXG5cclxuZnVuY3Rpb24gaXNNYXRjaEV2ZW50VHlwZSAoZXZlbnRUeXBlLCBvcHRUeXBlKSB7XHJcbiAgcmV0dXJuIChldmVudFR5cGUgPT09IG9wdFR5cGUpIHx8XHJcbiAgICAoXHJcbiAgICAgIG9wdFR5cGUgPT09ICdyZWdpb25jaGFuZ2UnICYmXHJcbiAgICAgIChcclxuICAgICAgICBldmVudFR5cGUgPT09ICdiZWdpbicgfHxcclxuICAgICAgICBldmVudFR5cGUgPT09ICdlbmQnXHJcbiAgICAgIClcclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRXZlbnQgKGV2ZW50KSB7XHJcbiAgZXZlbnQgPSB3cmFwcGVyJDEoZXZlbnQpO1xyXG5cclxuICAvLyBbWyd0YXAnLFtbJ2hhbmRsZScsWzEsMixhXV0sWydoYW5kbGUxJyxbMSwyLGFdXV1dXVxyXG4gIGNvbnN0IGRhdGFzZXQgPSAoZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQpLmRhdGFzZXQ7XHJcbiAgaWYgKCFkYXRhc2V0KSB7XHJcbiAgICByZXR1cm4gY29uc29sZS53YXJuKGDkuovku7bkv6Hmga/kuI3lrZjlnKhgKVxyXG4gIH1cclxuICBjb25zdCBldmVudE9wdHMgPSBkYXRhc2V0LmV2ZW50T3B0cyB8fCBkYXRhc2V0WydldmVudC1vcHRzJ107IC8vIOaUr+S7mOWunSB3ZWItdmlldyDnu4Tku7YgZGF0YXNldCDpnZ7pqbzls7BcclxuICBpZiAoIWV2ZW50T3B0cykge1xyXG4gICAgcmV0dXJuIGNvbnNvbGUud2Fybihg5LqL5Lu25L+h5oGv5LiN5a2Y5ZyoYClcclxuICB9XHJcblxyXG4gIC8vIFtbJ2hhbmRsZScsWzEsMixhXV0sWydoYW5kbGUxJyxbMSwyLGFdXV1cclxuICBjb25zdCBldmVudFR5cGUgPSBldmVudC50eXBlO1xyXG5cclxuICBjb25zdCByZXQgPSBbXTtcclxuXHJcbiAgZXZlbnRPcHRzLmZvckVhY2goZXZlbnRPcHQgPT4ge1xyXG4gICAgbGV0IHR5cGUgPSBldmVudE9wdFswXTtcclxuICAgIGNvbnN0IGV2ZW50c0FycmF5ID0gZXZlbnRPcHRbMV07XHJcblxyXG4gICAgY29uc3QgaXNDdXN0b20gPSB0eXBlLmNoYXJBdCgwKSA9PT0gQ1VTVE9NO1xyXG4gICAgdHlwZSA9IGlzQ3VzdG9tID8gdHlwZS5zbGljZSgxKSA6IHR5cGU7XHJcbiAgICBjb25zdCBpc09uY2UgPSB0eXBlLmNoYXJBdCgwKSA9PT0gT05DRTtcclxuICAgIHR5cGUgPSBpc09uY2UgPyB0eXBlLnNsaWNlKDEpIDogdHlwZTtcclxuXHJcbiAgICBpZiAoZXZlbnRzQXJyYXkgJiYgaXNNYXRjaEV2ZW50VHlwZShldmVudFR5cGUsIHR5cGUpKSB7XHJcbiAgICAgIGV2ZW50c0FycmF5LmZvckVhY2goZXZlbnRBcnJheSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IGV2ZW50QXJyYXlbMF07XHJcbiAgICAgICAgaWYgKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgIGxldCBoYW5kbGVyQ3R4ID0gdGhpcy4kdm07XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGhhbmRsZXJDdHguJG9wdGlvbnMuZ2VuZXJpYyAmJlxyXG4gICAgICAgICAgICBoYW5kbGVyQ3R4LiRwYXJlbnQgJiZcclxuICAgICAgICAgICAgaGFuZGxlckN0eC4kcGFyZW50LiRwYXJlbnRcclxuICAgICAgICAgICkgeyAvLyBtcC13ZWl4aW4sbXAtdG91dGlhbyDmir3osaHoioLngrnmqKHmi58gc2NvcGVkIHNsb3RzXHJcbiAgICAgICAgICAgIGhhbmRsZXJDdHggPSBoYW5kbGVyQ3R4LiRwYXJlbnQuJHBhcmVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChtZXRob2ROYW1lID09PSAnJGVtaXQnKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJDdHguJGVtaXQuYXBwbHkoaGFuZGxlckN0eCxcclxuICAgICAgICAgICAgICBwcm9jZXNzRXZlbnRBcmdzKFxyXG4gICAgICAgICAgICAgICAgdGhpcy4kdm0sXHJcbiAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgIGV2ZW50QXJyYXlbMV0sXHJcbiAgICAgICAgICAgICAgICBldmVudEFycmF5WzJdLFxyXG4gICAgICAgICAgICAgICAgaXNDdXN0b20sXHJcbiAgICAgICAgICAgICAgICBtZXRob2ROYW1lXHJcbiAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJDdHhbbWV0aG9kTmFtZV07XHJcbiAgICAgICAgICBpZiAoIWlzRm4oaGFuZGxlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAgX3ZtLiR7bWV0aG9kTmFtZX0gaXMgbm90IGEgZnVuY3Rpb25gKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGlzT25jZSkge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlci5vbmNlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaGFuZGxlci5vbmNlID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldC5wdXNoKGhhbmRsZXIuYXBwbHkoaGFuZGxlckN0eCwgcHJvY2Vzc0V2ZW50QXJncyhcclxuICAgICAgICAgICAgdGhpcy4kdm0sXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBldmVudEFycmF5WzFdLFxyXG4gICAgICAgICAgICBldmVudEFycmF5WzJdLFxyXG4gICAgICAgICAgICBpc0N1c3RvbSxcclxuICAgICAgICAgICAgbWV0aG9kTmFtZVxyXG4gICAgICAgICAgKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGlmIChcclxuICAgIGV2ZW50VHlwZSA9PT0gJ2lucHV0JyAmJlxyXG4gICAgcmV0Lmxlbmd0aCA9PT0gMSAmJlxyXG4gICAgdHlwZW9mIHJldFswXSAhPT0gJ3VuZGVmaW5lZCdcclxuICApIHtcclxuICAgIHJldHVybiByZXRbMF1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGhvb2tzID0gW1xyXG4gICdvblNob3cnLFxyXG4gICdvbkhpZGUnLFxyXG4gICdvbkVycm9yJyxcclxuICAnb25QYWdlTm90Rm91bmQnXHJcbl07XHJcblxyXG5mdW5jdGlvbiBwYXJzZUJhc2VBcHAgKHZtLCB7XHJcbiAgbW9ja3MsXHJcbiAgaW5pdFJlZnNcclxufSkge1xyXG4gIGlmICh2bS4kb3B0aW9ucy5zdG9yZSkge1xyXG4gICAgVnVlLnByb3RvdHlwZS4kc3RvcmUgPSB2bS4kb3B0aW9ucy5zdG9yZTtcclxuICB9XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUubXBIb3N0ID0gXCJtcC10b3V0aWFvXCI7XHJcblxyXG4gIFZ1ZS5taXhpbih7XHJcbiAgICBiZWZvcmVDcmVhdGUgKCkge1xyXG4gICAgICBpZiAoIXRoaXMuJG9wdGlvbnMubXBUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubXBUeXBlID0gdGhpcy4kb3B0aW9ucy5tcFR5cGU7XHJcblxyXG4gICAgICB0aGlzLiRtcCA9IHtcclxuICAgICAgICBkYXRhOiB7fSxcclxuICAgICAgICBbdGhpcy5tcFR5cGVdOiB0aGlzLiRvcHRpb25zLm1wSW5zdGFuY2VcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuJHNjb3BlID0gdGhpcy4kb3B0aW9ucy5tcEluc3RhbmNlO1xyXG5cclxuICAgICAgZGVsZXRlIHRoaXMuJG9wdGlvbnMubXBUeXBlO1xyXG4gICAgICBkZWxldGUgdGhpcy4kb3B0aW9ucy5tcEluc3RhbmNlO1xyXG5cclxuICAgICAgaWYgKHRoaXMubXBUeXBlICE9PSAnYXBwJykge1xyXG4gICAgICAgIGluaXRSZWZzKHRoaXMpO1xyXG4gICAgICAgIGluaXRNb2Nrcyh0aGlzLCBtb2Nrcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgY29uc3QgYXBwT3B0aW9ucyA9IHtcclxuICAgIG9uTGF1bmNoIChhcmdzKSB7XHJcbiAgICAgIGlmICh0aGlzLiR2bSkgeyAvLyDlt7Lnu4/liJ3lp4vljJbov4fkuobvvIzkuLvopoHmmK/kuLrkuobnmb7luqbvvIznmb7luqYgb25TaG93IOWcqCBvbkxhdW5jaCDkuYvliY1cclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kdm0gPSB2bTtcclxuXHJcbiAgICAgIHRoaXMuJHZtLiRtcCA9IHtcclxuICAgICAgICBhcHA6IHRoaXNcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuJHZtLiRzY29wZSA9IHRoaXM7XHJcbiAgICAgIC8vIHZtIOS4iuS5n+aMgui9vSBnbG9iYWxEYXRhXHJcbiAgICAgIHRoaXMuJHZtLmdsb2JhbERhdGEgPSB0aGlzLmdsb2JhbERhdGE7XHJcblxyXG4gICAgICB0aGlzLiR2bS5faXNNb3VudGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy4kdm0uX19jYWxsX2hvb2soJ21vdW50ZWQnLCBhcmdzKTtcclxuXHJcbiAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvbkxhdW5jaCcsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIOWFvOWuueaXp+eJiOacrCBnbG9iYWxEYXRhXHJcbiAgYXBwT3B0aW9ucy5nbG9iYWxEYXRhID0gdm0uJG9wdGlvbnMuZ2xvYmFsRGF0YSB8fCB7fTtcclxuICAvLyDlsIYgbWV0aG9kcyDkuK3nmoTmlrnms5XmjILlnKggZ2V0QXBwKCkg5LitXHJcbiAgY29uc3QgbWV0aG9kcyA9IHZtLiRvcHRpb25zLm1ldGhvZHM7XHJcbiAgaWYgKG1ldGhvZHMpIHtcclxuICAgIE9iamVjdC5rZXlzKG1ldGhvZHMpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIGFwcE9wdGlvbnNbbmFtZV0gPSBtZXRob2RzW25hbWVdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0SG9va3MoYXBwT3B0aW9ucywgaG9va3MpO1xyXG5cclxuICByZXR1cm4gYXBwT3B0aW9uc1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kVm1CeVZ1ZUlkICh2bSwgdnVlUGlkKSB7XHJcbiAgY29uc3QgJGNoaWxkcmVuID0gdm0uJGNoaWxkcmVuO1xyXG4gIC8vIOS8mOWFiOafpeaJvuebtOWxnijlj43lkJHmn6Xmib46aHR0cHM6Ly9naXRodWIuY29tL2RjbG91ZGlvL3VuaS1hcHAvaXNzdWVzLzEyMDApXHJcbiAgZm9yIChsZXQgaSA9ICRjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgY29uc3QgY2hpbGRWbSA9ICRjaGlsZHJlbltpXTtcclxuICAgIGlmIChjaGlsZFZtLiRzY29wZS5fJHZ1ZUlkID09PSB2dWVQaWQpIHtcclxuICAgICAgcmV0dXJuIGNoaWxkVm1cclxuICAgIH1cclxuICB9XHJcbiAgLy8g5Y+N5ZCR6YCS5b2S5p+l5om+XHJcbiAgbGV0IHBhcmVudFZtO1xyXG4gIGZvciAobGV0IGkgPSAkY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIHBhcmVudFZtID0gZmluZFZtQnlWdWVJZCgkY2hpbGRyZW5baV0sIHZ1ZVBpZCk7XHJcbiAgICBpZiAocGFyZW50Vm0pIHtcclxuICAgICAgcmV0dXJuIHBhcmVudFZtXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0QmVoYXZpb3IgKG9wdGlvbnMpIHtcclxuICByZXR1cm4gQmVoYXZpb3Iob3B0aW9ucylcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlTGluayAoZXZlbnQpIHtcclxuICBjb25zdCB7XHJcbiAgICB2dWVQaWQsXHJcbiAgICB2dWVPcHRpb25zXHJcbiAgfSA9IGV2ZW50LmRldGFpbCB8fCBldmVudC52YWx1ZTsgLy8gZGV0YWlsIOaYr+W+ruS/oSx2YWx1ZSDmmK/nmb7luqYoZGlwYXRjaClcclxuXHJcbiAgbGV0IHBhcmVudFZtO1xyXG5cclxuICBpZiAodnVlUGlkKSB7XHJcbiAgICBwYXJlbnRWbSA9IGZpbmRWbUJ5VnVlSWQodGhpcy4kdm0sIHZ1ZVBpZCk7XHJcbiAgfVxyXG5cclxuICBpZiAoIXBhcmVudFZtKSB7XHJcbiAgICBwYXJlbnRWbSA9IHRoaXMuJHZtO1xyXG4gIH1cclxuXHJcbiAgdnVlT3B0aW9ucy5wYXJlbnQgPSBwYXJlbnRWbTtcclxufVxyXG5cclxuY29uc3QgbW9ja3MgPSBbJ19fcm91dGVfXycsICdfX3dlYnZpZXdJZF9fJywgJ19fbm9kZWlkX18nLCAnX19ub2RlSWRfXyddO1xyXG5cclxuZnVuY3Rpb24gaXNQYWdlICgpIHtcclxuICByZXR1cm4gdGhpcy5fX25vZGVpZF9fID09PSAwIHx8IHRoaXMuX19ub2RlSWRfXyA9PT0gMFxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UmVmcyAodm0pIHtcclxuICBjb25zdCBtcEluc3RhbmNlID0gdm0uJHNjb3BlO1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbiAgY29uc3QgbWlub3JWZXJzaW9uID0gcGFyc2VJbnQodHQuZ2V0U3lzdGVtSW5mb1N5bmMoKS5TREtWZXJzaW9uLnNwbGl0KCcuJylbMV0pO1xyXG4gIGlmIChtaW5vclZlcnNpb24gPiAxNikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZtLCAnJHJlZnMnLCB7XHJcbiAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgY29uc3QgJHJlZnMgPSB7fTtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRzID0gbXBJbnN0YW5jZS5zZWxlY3RBbGxDb21wb25lbnRzKCcudnVlLXJlZicpO1xyXG4gICAgICAgIGNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcmVmID0gY29tcG9uZW50LmRhdGFzZXQucmVmO1xyXG4gICAgICAgICAgJHJlZnNbcmVmXSA9IGNvbXBvbmVudC4kdm0gfHwgY29tcG9uZW50O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGZvckNvbXBvbmVudHMgPSBtcEluc3RhbmNlLnNlbGVjdEFsbENvbXBvbmVudHMoJy52dWUtcmVmLWluLWZvcicpO1xyXG4gICAgICAgIGZvckNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcmVmID0gY29tcG9uZW50LmRhdGFzZXQucmVmO1xyXG4gICAgICAgICAgaWYgKCEkcmVmc1tyZWZdKSB7XHJcbiAgICAgICAgICAgICRyZWZzW3JlZl0gPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICRyZWZzW3JlZl0ucHVzaChjb21wb25lbnQuJHZtIHx8IGNvbXBvbmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuICRyZWZzXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtcEluc3RhbmNlLnNlbGVjdEFsbENvbXBvbmVudHMoJy52dWUtcmVmJywgKGNvbXBvbmVudHMpID0+IHtcclxuICAgICAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVmID0gY29tcG9uZW50LmRhdGFzZXQucmVmO1xyXG4gICAgICAgIHZtLiRyZWZzW3JlZl0gPSBjb21wb25lbnQuJHZtIHx8IGNvbXBvbmVudDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIG1wSW5zdGFuY2Uuc2VsZWN0QWxsQ29tcG9uZW50cygnLnZ1ZS1yZWYtaW4tZm9yJywgKGZvckNvbXBvbmVudHMpID0+IHtcclxuICAgICAgZm9yQ29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVmID0gY29tcG9uZW50LmRhdGFzZXQucmVmO1xyXG4gICAgICAgIGlmICghdm0uJHJlZnNbcmVmXSkge1xyXG4gICAgICAgICAgdm0uJHJlZnNbcmVmXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2bS4kcmVmc1tyZWZdLnB1c2goY29tcG9uZW50LiR2bSB8fCBjb21wb25lbnQpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaW5zdGFuY2VzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbmZ1bmN0aW9uIGluaXRSZWxhdGlvbiAoe1xyXG4gIHZ1ZVBpZCxcclxuICBtcEluc3RhbmNlXHJcbn0pIHtcclxuICAvLyDlpLTmnaEgdHJpZ2dlckV2ZW50IOWQju+8jOaOpeaUtuS6i+S7tuaXtuacuueJueWIq+aZmu+8jOW3sue7j+WIsOS6hiByZWFkeSDkuYvlkI5cclxuICBjb25zdCBub2RlSWQgPSAobXBJbnN0YW5jZS5fX25vZGVJZF9fIHx8IG1wSW5zdGFuY2UuX19ub2RlaWRfXykgKyAnJztcclxuICBjb25zdCB3ZWJ2aWV3SWQgPSBtcEluc3RhbmNlLl9fd2Vidmlld0lkX18gKyAnJztcclxuXHJcbiAgaW5zdGFuY2VzW3dlYnZpZXdJZCArICdfJyArIG5vZGVJZF0gPSBtcEluc3RhbmNlLiR2bTtcclxuXHJcbiAgdGhpcy50cmlnZ2VyRXZlbnQoJ19fbCcsIHtcclxuICAgIHZ1ZVBpZCxcclxuICAgIG5vZGVJZCxcclxuICAgIHdlYnZpZXdJZFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVMaW5rJDEgKHtcclxuICBkZXRhaWw6IHtcclxuICAgIHZ1ZVBpZCxcclxuICAgIG5vZGVJZCxcclxuICAgIHdlYnZpZXdJZFxyXG4gIH1cclxufSkge1xyXG4gIGNvbnN0IHZtID0gaW5zdGFuY2VzW3dlYnZpZXdJZCArICdfJyArIG5vZGVJZF07XHJcbiAgaWYgKCF2bSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICBsZXQgcGFyZW50Vm07XHJcblxyXG4gIGlmICh2dWVQaWQpIHtcclxuICAgIHBhcmVudFZtID0gZmluZFZtQnlWdWVJZCh0aGlzLiR2bSwgdnVlUGlkKTtcclxuICB9XHJcblxyXG4gIGlmICghcGFyZW50Vm0pIHtcclxuICAgIHBhcmVudFZtID0gdGhpcy4kdm07XHJcbiAgfVxyXG5cclxuICB2bS4kcGFyZW50ID0gcGFyZW50Vm07XHJcbiAgdm0uJHJvb3QgPSBwYXJlbnRWbS4kcm9vdDtcclxuICBwYXJlbnRWbS4kY2hpbGRyZW4ucHVzaCh2bSk7XHJcblxyXG4gIHZtLl9fY2FsbF9ob29rKCdjcmVhdGVkJyk7XHJcbiAgdm0uX19jYWxsX2hvb2soJ2JlZm9yZU1vdW50Jyk7XHJcbiAgdm0uX2lzTW91bnRlZCA9IHRydWU7XHJcbiAgdm0uX19jYWxsX2hvb2soJ21vdW50ZWQnKTtcclxuICB2bS5fX2NhbGxfaG9vaygnb25SZWFkeScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUFwcCAodm0pIHtcclxuICBWdWUucHJvdG90eXBlLl8kZmFsbGJhY2sgPSB0cnVlOyAvLyDpmY3nuqfvvIjosIPmlbTljp8gdnVlIOeahOmDqOWIhueUn+WRveWRqOacn++8jOWmgiBjcmVhdGVk77yMYmVmb3JlTW91bnQsaW5qZWN0LHByb3ZpZGXvvIlcclxuXHJcbiAgVnVlLm1peGluKHtcclxuICAgIGNyZWF0ZWQgKCkgeyAvLyDlpITnkIYgaW5qZWN0aW9ucyzlpLTmnaEgdHJpZ2dlckV2ZW50IOaYr+W8guatpe+8jOS4lOinpuWPkeaXtuacuuW+iOaFou+8jOaVheW7tui/nyByZWxhdGlvbiDorr7nva5cclxuICAgICAgaWYgKHRoaXMubXBUeXBlICE9PSAnYXBwJykge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMubXBUeXBlID09PSAncGFnZScgJiZcclxuICAgICAgICAgICAgICAgICAgICAhdGhpcy4kc2NvcGUucm91dGUgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5fX3JvdXRlX19cclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMuJHNjb3BlLnJvdXRlID0gdGhpcy4kc2NvcGUuX19yb3V0ZV9fO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdFJlZnModGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX19pbml0X2luamVjdGlvbnModGhpcyk7XHJcbiAgICAgICAgdGhpcy5fX2luaXRfcHJvdmlkZSh0aGlzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcGFyc2VCYXNlQXBwKHZtLCB7XHJcbiAgICBtb2NrcyxcclxuICAgIGluaXRSZWZzOiBmdW5jdGlvbiAoKSB7fSAvLyBhdHRhY2hlZCDml7bvvIzlj6/og73mn6Xor6LkuI3liLBcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVBcHAgKHZtKSB7XHJcbiAgQXBwKHBhcnNlQXBwKHZtKSk7XHJcbiAgcmV0dXJuIHZtXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQmFzZUNvbXBvbmVudCAodnVlQ29tcG9uZW50T3B0aW9ucywge1xyXG4gIGlzUGFnZSxcclxuICBpbml0UmVsYXRpb25cclxufSA9IHt9KSB7XHJcbiAgbGV0IFtWdWVDb21wb25lbnQsIHZ1ZU9wdGlvbnNdID0gaW5pdFZ1ZUNvbXBvbmVudChWdWUsIHZ1ZUNvbXBvbmVudE9wdGlvbnMpO1xyXG5cclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgbXVsdGlwbGVTbG90czogdHJ1ZSxcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gICAgLi4uKHZ1ZU9wdGlvbnMub3B0aW9ucyB8fCB7fSlcclxuICB9O1xyXG5cclxuICBjb25zdCBjb21wb25lbnRPcHRpb25zID0ge1xyXG4gICAgb3B0aW9ucyxcclxuICAgIGRhdGE6IGluaXREYXRhKHZ1ZU9wdGlvbnMsIFZ1ZS5wcm90b3R5cGUpLFxyXG4gICAgYmVoYXZpb3JzOiBpbml0QmVoYXZpb3JzKHZ1ZU9wdGlvbnMsIGluaXRCZWhhdmlvciksXHJcbiAgICBwcm9wZXJ0aWVzOiBpbml0UHJvcGVydGllcyh2dWVPcHRpb25zLnByb3BzLCBmYWxzZSwgdnVlT3B0aW9ucy5fX2ZpbGUpLFxyXG4gICAgbGlmZXRpbWVzOiB7XHJcbiAgICAgIGF0dGFjaGVkICgpIHtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzO1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgbXBUeXBlOiBpc1BhZ2UuY2FsbCh0aGlzKSA/ICdwYWdlJyA6ICdjb21wb25lbnQnLFxyXG4gICAgICAgICAgbXBJbnN0YW5jZTogdGhpcyxcclxuICAgICAgICAgIHByb3BzRGF0YTogcHJvcGVydGllc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluaXRWdWVJZHMocHJvcGVydGllcy52dWVJZCwgdGhpcyk7XHJcblxyXG4gICAgICAgIC8vIOWkhOeQhueItuWtkOWFs+ezu1xyXG4gICAgICAgIGluaXRSZWxhdGlvbi5jYWxsKHRoaXMsIHtcclxuICAgICAgICAgIHZ1ZVBpZDogdGhpcy5fJHZ1ZVBpZCxcclxuICAgICAgICAgIHZ1ZU9wdGlvbnM6IG9wdGlvbnNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyWIHZ1ZSDlrp7kvotcclxuICAgICAgICB0aGlzLiR2bSA9IG5ldyBWdWVDb21wb25lbnQob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIOWkhOeQhiRzbG90cywkc2NvcGVkU2xvdHPvvIjmmoLkuI3mlK/mjIHliqjmgIHlj5jljJYkc2xvdHPvvIlcclxuICAgICAgICBpbml0U2xvdHModGhpcy4kdm0sIHByb3BlcnRpZXMudnVlU2xvdHMpO1xyXG5cclxuICAgICAgICAvLyDop6blj5HpppbmrKEgc2V0RGF0YVxyXG4gICAgICAgIHRoaXMuJHZtLiRtb3VudCgpO1xyXG4gICAgICB9LFxyXG4gICAgICByZWFkeSAoKSB7XHJcbiAgICAgICAgLy8g5b2T57uE5Lu2IHByb3BzIOm7mOiupOWAvOS4uiB0cnVl77yM5Yid5aeL5YyW5pe25Lyg5YWlIGZhbHNlIOS8muWvvOiHtCBjcmVhdGVkLHJlYWR5IOinpuWPkSwg5L2GIGF0dGFjaGVkIOS4jeinpuWPkVxyXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy53ZWl4aW4ucXEuY29tL2NvbW11bml0eS9kZXZlbG9wL2RvYy8wMDA2NmFlMjg0NGNjMGY4ZWI4ODNlMmE1NTc4MDBcclxuICAgICAgICBpZiAodGhpcy4kdm0pIHtcclxuICAgICAgICAgIHRoaXMuJHZtLl9pc01vdW50ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy4kdm0uX19jYWxsX2hvb2soJ21vdW50ZWQnKTtcclxuICAgICAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblJlYWR5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkZXRhY2hlZCAoKSB7XHJcbiAgICAgICAgdGhpcy4kdm0gJiYgdGhpcy4kdm0uJGRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhZ2VMaWZldGltZXM6IHtcclxuICAgICAgc2hvdyAoYXJncykge1xyXG4gICAgICAgIHRoaXMuJHZtICYmIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblBhZ2VTaG93JywgYXJncyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGhpZGUgKCkge1xyXG4gICAgICAgIHRoaXMuJHZtICYmIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblBhZ2VIaWRlJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlc2l6ZSAoc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuJHZtICYmIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblBhZ2VSZXNpemUnLCBzaXplKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgX19sOiBoYW5kbGVMaW5rLFxyXG4gICAgICBfX2U6IGhhbmRsZUV2ZW50XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodnVlT3B0aW9ucy53eHNDYWxsTWV0aG9kcykpIHtcclxuICAgIHZ1ZU9wdGlvbnMud3hzQ2FsbE1ldGhvZHMuZm9yRWFjaChjYWxsTWV0aG9kID0+IHtcclxuICAgICAgY29tcG9uZW50T3B0aW9ucy5tZXRob2RzW2NhbGxNZXRob2RdID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kdm1bY2FsbE1ldGhvZF0oYXJncylcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGlzUGFnZSkge1xyXG4gICAgcmV0dXJuIGNvbXBvbmVudE9wdGlvbnNcclxuICB9XHJcbiAgcmV0dXJuIFtjb21wb25lbnRPcHRpb25zLCBWdWVDb21wb25lbnRdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQ29tcG9uZW50ICh2dWVPcHRpb25zKSB7XHJcbiAgY29uc3QgW2NvbXBvbmVudE9wdGlvbnMsIFZ1ZUNvbXBvbmVudF0gPSBwYXJzZUJhc2VDb21wb25lbnQodnVlT3B0aW9ucyk7XHJcblxyXG4gIGNvbXBvbmVudE9wdGlvbnMubGlmZXRpbWVzLmF0dGFjaGVkID0gZnVuY3Rpb24gYXR0YWNoZWQgKCkge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBtcFR5cGU6IGlzUGFnZS5jYWxsKHRoaXMpID8gJ3BhZ2UnIDogJ2NvbXBvbmVudCcsXHJcbiAgICAgIG1wSW5zdGFuY2U6IHRoaXMsXHJcbiAgICAgIHByb3BzRGF0YTogcHJvcGVydGllc1xyXG4gICAgfTtcclxuXHJcbiAgICBpbml0VnVlSWRzKHByb3BlcnRpZXMudnVlSWQsIHRoaXMpO1xyXG5cclxuICAgIC8vIOWIneWni+WMliB2dWUg5a6e5L6LXHJcbiAgICB0aGlzLiR2bSA9IG5ldyBWdWVDb21wb25lbnQob3B0aW9ucyk7XHJcblxyXG4gICAgLy8g5aSE55CGJHNsb3RzLCRzY29wZWRTbG90c++8iOaaguS4jeaUr+aMgeWKqOaAgeWPmOWMliRzbG90c++8iVxyXG4gICAgaW5pdFNsb3RzKHRoaXMuJHZtLCBwcm9wZXJ0aWVzLnZ1ZVNsb3RzKTtcclxuXHJcbiAgICAvLyDlpITnkIbniLblrZDlhbPns7tcclxuICAgIGluaXRSZWxhdGlvbi5jYWxsKHRoaXMsIHtcclxuICAgICAgdnVlUGlkOiB0aGlzLl8kdnVlUGlkLFxyXG4gICAgICBtcEluc3RhbmNlOiB0aGlzXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDop6blj5HpppbmrKEgc2V0RGF0YVxyXG4gICAgdGhpcy4kdm0uJG1vdW50KCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gcmVhZHkg5q+UIGhhbmRsZUxpbmsg6L+Y5pep77yM5Yid5aeL5YyW6YC76L6R5pS+5YiwIGhhbmRsZUxpbmsg5LitXHJcbiAgZGVsZXRlIGNvbXBvbmVudE9wdGlvbnMubGlmZXRpbWVzLnJlYWR5O1xyXG5cclxuICBjb21wb25lbnRPcHRpb25zLm1ldGhvZHMuX19sID0gaGFuZGxlTGluayQxO1xyXG5cclxuICByZXR1cm4gY29tcG9uZW50T3B0aW9uc1xyXG59XHJcblxyXG5jb25zdCBob29rcyQxID0gW1xyXG4gICdvblNob3cnLFxyXG4gICdvbkhpZGUnLFxyXG4gICdvblVubG9hZCdcclxuXTtcclxuXHJcbmhvb2tzJDEucHVzaCguLi5QQUdFX0VWRU5UX0hPT0tTKTtcclxuXHJcbmZ1bmN0aW9uIHBhcnNlQmFzZVBhZ2UgKHZ1ZVBhZ2VPcHRpb25zLCB7XHJcbiAgaXNQYWdlLFxyXG4gIGluaXRSZWxhdGlvblxyXG59KSB7XHJcbiAgY29uc3QgcGFnZU9wdGlvbnMgPSBwYXJzZUNvbXBvbmVudCh2dWVQYWdlT3B0aW9ucyk7XHJcblxyXG4gIGluaXRIb29rcyhwYWdlT3B0aW9ucy5tZXRob2RzLCBob29rcyQxLCB2dWVQYWdlT3B0aW9ucyk7XHJcblxyXG4gIHBhZ2VPcHRpb25zLm1ldGhvZHMub25Mb2FkID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgIHRoaXMuJHZtLiRtcC5xdWVyeSA9IGFyZ3M7IC8vIOWFvOWuuSBtcHZ1ZVxyXG4gICAgdGhpcy4kdm0uX19jYWxsX2hvb2soJ29uTG9hZCcsIGFyZ3MpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBwYWdlT3B0aW9uc1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVBhZ2UgKHZ1ZVBhZ2VPcHRpb25zKSB7XHJcbiAgY29uc3QgcGFnZU9wdGlvbnMgPSBwYXJzZUJhc2VQYWdlKHZ1ZVBhZ2VPcHRpb25zLCB7XHJcbiAgICBpc1BhZ2UsXHJcbiAgICBpbml0UmVsYXRpb25cclxuICB9KTtcclxuICAvLyDpobXpnaLpnIDopoHlnKggcmVhZHkg5Lit6Kem5Y+R77yM5YW25LuW57uE5Lu25piv5ZyoIGhhbmRsZUxpbmsg5Lit6Kem5Y+RXHJcbiAgcGFnZU9wdGlvbnMubGlmZXRpbWVzLnJlYWR5ID0gZnVuY3Rpb24gcmVhZHkgKCkge1xyXG4gICAgaWYgKHRoaXMuJHZtICYmIHRoaXMuJHZtLm1wVHlwZSA9PT0gJ3BhZ2UnKSB7XHJcbiAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdjcmVhdGVkJyk7XHJcbiAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdiZWZvcmVNb3VudCcpO1xyXG4gICAgICB0aGlzLiR2bS5faXNNb3VudGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy4kdm0uX19jYWxsX2hvb2soJ21vdW50ZWQnKTtcclxuICAgICAgdGhpcy4kdm0uX19jYWxsX2hvb2soJ29uUmVhZHknKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXMgJiYgY29uc29sZS53YXJuKHRoaXMuaXMgKyAnIGlzIG5vdCByZWFkeScpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBwYWdlT3B0aW9uc1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYWdlICh2dWVQYWdlT3B0aW9ucykge1xyXG4gIHtcclxuICAgIHJldHVybiBDb21wb25lbnQocGFyc2VQYWdlKHZ1ZVBhZ2VPcHRpb25zKSlcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCAodnVlT3B0aW9ucykge1xyXG4gIHtcclxuICAgIHJldHVybiBDb21wb25lbnQocGFyc2VDb21wb25lbnQodnVlT3B0aW9ucykpXHJcbiAgfVxyXG59XHJcblxyXG50b2Rvcy5mb3JFYWNoKHRvZG9BcGkgPT4ge1xyXG4gIHByb3RvY29sc1t0b2RvQXBpXSA9IGZhbHNlO1xyXG59KTtcclxuXHJcbmNhbklVc2VzLmZvckVhY2goY2FuSVVzZUFwaSA9PiB7XHJcbiAgY29uc3QgYXBpTmFtZSA9IHByb3RvY29sc1tjYW5JVXNlQXBpXSAmJiBwcm90b2NvbHNbY2FuSVVzZUFwaV0ubmFtZSA/IHByb3RvY29sc1tjYW5JVXNlQXBpXS5uYW1lXHJcbiAgICA6IGNhbklVc2VBcGk7XHJcbiAgaWYgKCF0dC5jYW5JVXNlKGFwaU5hbWUpKSB7XHJcbiAgICBwcm90b2NvbHNbY2FuSVVzZUFwaV0gPSBmYWxzZTtcclxuICB9XHJcbn0pO1xyXG5cclxubGV0IHVuaSA9IHt9O1xyXG5cclxuaWYgKHR5cGVvZiBQcm94eSAhPT0gJ3VuZGVmaW5lZCcgJiYgXCJtcC10b3V0aWFvXCIgIT09ICdhcHAtcGx1cycpIHtcclxuICB1bmkgPSBuZXcgUHJveHkoe30sIHtcclxuICAgIGdldCAodGFyZ2V0LCBuYW1lKSB7XHJcbiAgICAgIGlmICh0YXJnZXRbbmFtZV0pIHtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0W25hbWVdXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGJhc2VBcGlbbmFtZV0pIHtcclxuICAgICAgICByZXR1cm4gYmFzZUFwaVtuYW1lXVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChhcGlbbmFtZV0pIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5KG5hbWUsIGFwaVtuYW1lXSlcclxuICAgICAgfVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKGV4dHJhQXBpW25hbWVdKSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5KG5hbWUsIGV4dHJhQXBpW25hbWVdKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9kb0FwaXNbbmFtZV0pIHtcclxuICAgICAgICAgIHJldHVybiBwcm9taXNpZnkobmFtZSwgdG9kb0FwaXNbbmFtZV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChldmVudEFwaVtuYW1lXSkge1xyXG4gICAgICAgIHJldHVybiBldmVudEFwaVtuYW1lXVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghaGFzT3duKHR0LCBuYW1lKSAmJiAhaGFzT3duKHByb3RvY29scywgbmFtZSkpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcHJvbWlzaWZ5KG5hbWUsIHdyYXBwZXIobmFtZSwgdHRbbmFtZV0pKVxyXG4gICAgfSxcclxuICAgIHNldCAodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICB9KTtcclxufSBlbHNlIHtcclxuICBPYmplY3Qua2V5cyhiYXNlQXBpKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgdW5pW25hbWVdID0gYmFzZUFwaVtuYW1lXTtcclxuICB9KTtcclxuXHJcbiAge1xyXG4gICAgT2JqZWN0LmtleXModG9kb0FwaXMpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHVuaVtuYW1lXSA9IHByb21pc2lmeShuYW1lLCB0b2RvQXBpc1tuYW1lXSk7XHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5rZXlzKGV4dHJhQXBpKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB1bmlbbmFtZV0gPSBwcm9taXNpZnkobmFtZSwgdG9kb0FwaXNbbmFtZV0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBPYmplY3Qua2V5cyhldmVudEFwaSkuZm9yRWFjaChuYW1lID0+IHtcclxuICAgIHVuaVtuYW1lXSA9IGV2ZW50QXBpW25hbWVdO1xyXG4gIH0pO1xyXG5cclxuICBPYmplY3Qua2V5cyhhcGkpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICB1bmlbbmFtZV0gPSBwcm9taXNpZnkobmFtZSwgYXBpW25hbWVdKTtcclxuICB9KTtcclxuXHJcbiAgT2JqZWN0LmtleXModHQpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICBpZiAoaGFzT3duKHR0LCBuYW1lKSB8fCBoYXNPd24ocHJvdG9jb2xzLCBuYW1lKSkge1xyXG4gICAgICB1bmlbbmFtZV0gPSBwcm9taXNpZnkobmFtZSwgd3JhcHBlcihuYW1lLCB0dFtuYW1lXSkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG50dC5jcmVhdGVBcHAgPSBjcmVhdGVBcHA7XHJcbnR0LmNyZWF0ZVBhZ2UgPSBjcmVhdGVQYWdlO1xyXG50dC5jcmVhdGVDb21wb25lbnQgPSBjcmVhdGVDb21wb25lbnQ7XHJcblxyXG52YXIgdW5pJDEgPSB1bmk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1bmkkMTtcclxuZXhwb3J0IHsgY3JlYXRlQXBwLCBjcmVhdGVDb21wb25lbnQsIGNyZWF0ZVBhZ2UgfTtcclxuIiwiLyogZ2xvYmFscyBfX1ZVRV9TU1JfQ09OVEVYVF9fICovXG5cbi8vIElNUE9SVEFOVDogRG8gTk9UIHVzZSBFUzIwMTUgZmVhdHVyZXMgaW4gdGhpcyBmaWxlIChleGNlcHQgZm9yIG1vZHVsZXMpLlxuLy8gVGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlLlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICBzY3JpcHRFeHBvcnRzLFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZnVuY3Rpb25hbFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIsIC8qIHNlcnZlciBvbmx5ICovXG4gIHNoYWRvd01vZGUsIC8qIHZ1ZS1jbGkgb25seSAqL1xuICBjb21wb25lbnRzLCAvLyBmaXhlZCBieSB4eHh4eHggYXV0byBjb21wb25lbnRzXG4gIHJlbmRlcmpzIC8vIGZpeGVkIGJ5IHh4eHh4eCByZW5kZXJqc1xuKSB7XG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gZml4ZWQgYnkgeHh4eHh4IGF1dG8gY29tcG9uZW50c1xuICBpZiAoY29tcG9uZW50cykge1xuICAgIGlmICghb3B0aW9ucy5jb21wb25lbnRzKSB7XG4gICAgICBvcHRpb25zLmNvbXBvbmVudHMgPSB7fVxuICAgIH1cbiAgICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAgIGZvciAodmFyIG5hbWUgaW4gY29tcG9uZW50cykge1xuICAgICAgaWYgKGhhc093bi5jYWxsKGNvbXBvbmVudHMsIG5hbWUpICYmICFoYXNPd24uY2FsbChvcHRpb25zLmNvbXBvbmVudHMsIG5hbWUpKSB7XG4gICAgICAgIG9wdGlvbnMuY29tcG9uZW50c1tuYW1lXSA9IGNvbXBvbmVudHNbbmFtZV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gZml4ZWQgYnkgeHh4eHh4IHJlbmRlcmpzXG4gIGlmIChyZW5kZXJqcykge1xuICAgIChyZW5kZXJqcy5iZWZvcmVDcmVhdGUgfHwgKHJlbmRlcmpzLmJlZm9yZUNyZWF0ZSA9IFtdKSkudW5zaGlmdChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXNbcmVuZGVyanMuX19tb2R1bGVdID0gdGhpc1xuICAgIH0pO1xuICAgIChvcHRpb25zLm1peGlucyB8fCAob3B0aW9ucy5taXhpbnMgPSBbXSkpLnB1c2gocmVuZGVyanMpXG4gIH1cblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChyZW5kZXIpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IHJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gc3RhdGljUmVuZGVyRm5zXG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlXG4gIH1cblxuICAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG4gIGlmIChmdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSAnZGF0YS12LScgKyBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IHNoYWRvd01vZGVcbiAgICAgID8gZnVuY3Rpb24gKCkgeyBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCB0aGlzLiRyb290LiRvcHRpb25zLnNoYWRvd1Jvb3QpIH1cbiAgICAgIDogaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIGlmIChvcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIGZvciB0ZW1wbGF0ZS1vbmx5IGhvdC1yZWxvYWQgYmVjYXVzZSBpbiB0aGF0IGNhc2UgdGhlIHJlbmRlciBmbiBkb2Vzbid0XG4gICAgICAvLyBnbyB0aHJvdWdoIHRoZSBub3JtYWxpemVyXG4gICAgICBvcHRpb25zLl9pbmplY3RTdHlsZXMgPSBob29rXG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgdmFyIG9yaWdpbmFsUmVuZGVyID0gb3B0aW9ucy5yZW5kZXJcbiAgICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyV2l0aFN0eWxlSW5qZWN0aW9uIChoLCBjb250ZXh0KSB7XG4gICAgICAgIGhvb2suY2FsbChjb250ZXh0KVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxSZW5kZXIoaCwgY29udGV4dClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIHZhciBleGlzdGluZyA9IG9wdGlvbnMuYmVmb3JlQ3JlYXRlXG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nXG4gICAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgICA6IFtob29rXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1ODcyMTAyODM3MjRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiRDovSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJobXJcIjp0cnVlLFwicHVibGljUGF0aFwiOlwiLi4vLi4vXCIsXCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvKiFcbiAqIFZ1ZS5qcyB2Mi42LjExXG4gKiAoYykgMjAxNC0yMDIwIEV2YW4gWW91XG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cbi8qICAqL1xuXG52YXIgZW1wdHlPYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcblxuLy8gVGhlc2UgaGVscGVycyBwcm9kdWNlIGJldHRlciBWTSBjb2RlIGluIEpTIGVuZ2luZXMgZHVlIHRvIHRoZWlyXG4vLyBleHBsaWNpdG5lc3MgYW5kIGZ1bmN0aW9uIGlubGluaW5nLlxuZnVuY3Rpb24gaXNVbmRlZiAodikge1xuICByZXR1cm4gdiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IG51bGxcbn1cblxuZnVuY3Rpb24gaXNEZWYgKHYpIHtcbiAgcmV0dXJuIHYgIT09IHVuZGVmaW5lZCAmJiB2ICE9PSBudWxsXG59XG5cbmZ1bmN0aW9uIGlzVHJ1ZSAodikge1xuICByZXR1cm4gdiA9PT0gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpc0ZhbHNlICh2KSB7XG4gIHJldHVybiB2ID09PSBmYWxzZVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGlzIHByaW1pdGl2ZS5cbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUgKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHxcbiAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnIHx8XG4gICAgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcbiAgKVxufVxuXG4vKipcbiAqIFF1aWNrIG9iamVjdCBjaGVjayAtIHRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgdG8gdGVsbFxuICogT2JqZWN0cyBmcm9tIHByaW1pdGl2ZSB2YWx1ZXMgd2hlbiB3ZSBrbm93IHRoZSB2YWx1ZVxuICogaXMgYSBKU09OLWNvbXBsaWFudCB0eXBlLlxuICovXG5mdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHJhdyB0eXBlIHN0cmluZyBvZiBhIHZhbHVlLCBlLmcuLCBbb2JqZWN0IE9iamVjdF0uXG4gKi9cbnZhciBfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5mdW5jdGlvbiB0b1Jhd1R5cGUgKHZhbHVlKSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbCh2YWx1ZSkuc2xpY2UoOCwgLTEpXG59XG5cbi8qKlxuICogU3RyaWN0IG9iamVjdCB0eXBlIGNoZWNrLiBPbmx5IHJldHVybnMgdHJ1ZVxuICogZm9yIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0cy5cbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCAob2JqKSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJ1xufVxuXG5mdW5jdGlvbiBpc1JlZ0V4cCAodikge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwodikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsIGlzIGEgdmFsaWQgYXJyYXkgaW5kZXguXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRBcnJheUluZGV4ICh2YWwpIHtcbiAgdmFyIG4gPSBwYXJzZUZsb2F0KFN0cmluZyh2YWwpKTtcbiAgcmV0dXJuIG4gPj0gMCAmJiBNYXRoLmZsb29yKG4pID09PSBuICYmIGlzRmluaXRlKHZhbClcbn1cblxuZnVuY3Rpb24gaXNQcm9taXNlICh2YWwpIHtcbiAgcmV0dXJuIChcbiAgICBpc0RlZih2YWwpICYmXG4gICAgdHlwZW9mIHZhbC50aGVuID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHZhbC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJ1xuICApXG59XG5cbi8qKlxuICogQ29udmVydCBhIHZhbHVlIHRvIGEgc3RyaW5nIHRoYXQgaXMgYWN0dWFsbHkgcmVuZGVyZWQuXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PSBudWxsXG4gICAgPyAnJ1xuICAgIDogQXJyYXkuaXNBcnJheSh2YWwpIHx8IChpc1BsYWluT2JqZWN0KHZhbCkgJiYgdmFsLnRvU3RyaW5nID09PSBfdG9TdHJpbmcpXG4gICAgICA/IEpTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMilcbiAgICAgIDogU3RyaW5nKHZhbClcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGlucHV0IHZhbHVlIHRvIGEgbnVtYmVyIGZvciBwZXJzaXN0ZW5jZS5cbiAqIElmIHRoZSBjb252ZXJzaW9uIGZhaWxzLCByZXR1cm4gb3JpZ2luYWwgc3RyaW5nLlxuICovXG5mdW5jdGlvbiB0b051bWJlciAodmFsKSB7XG4gIHZhciBuID0gcGFyc2VGbG9hdCh2YWwpO1xuICByZXR1cm4gaXNOYU4obikgPyB2YWwgOiBuXG59XG5cbi8qKlxuICogTWFrZSBhIG1hcCBhbmQgcmV0dXJuIGEgZnVuY3Rpb24gZm9yIGNoZWNraW5nIGlmIGEga2V5XG4gKiBpcyBpbiB0aGF0IG1hcC5cbiAqL1xuZnVuY3Rpb24gbWFrZU1hcCAoXG4gIHN0cixcbiAgZXhwZWN0c0xvd2VyQ2FzZVxuKSB7XG4gIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgbGlzdCA9IHN0ci5zcGxpdCgnLCcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBtYXBbbGlzdFtpXV0gPSB0cnVlO1xuICB9XG4gIHJldHVybiBleHBlY3RzTG93ZXJDYXNlXG4gICAgPyBmdW5jdGlvbiAodmFsKSB7IHJldHVybiBtYXBbdmFsLnRvTG93ZXJDYXNlKCldOyB9XG4gICAgOiBmdW5jdGlvbiAodmFsKSB7IHJldHVybiBtYXBbdmFsXTsgfVxufVxuXG4vKipcbiAqIENoZWNrIGlmIGEgdGFnIGlzIGEgYnVpbHQtaW4gdGFnLlxuICovXG52YXIgaXNCdWlsdEluVGFnID0gbWFrZU1hcCgnc2xvdCxjb21wb25lbnQnLCB0cnVlKTtcblxuLyoqXG4gKiBDaGVjayBpZiBhbiBhdHRyaWJ1dGUgaXMgYSByZXNlcnZlZCBhdHRyaWJ1dGUuXG4gKi9cbnZhciBpc1Jlc2VydmVkQXR0cmlidXRlID0gbWFrZU1hcCgna2V5LHJlZixzbG90LHNsb3Qtc2NvcGUsaXMnKTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaXRlbSBmcm9tIGFuIGFycmF5LlxuICovXG5mdW5jdGlvbiByZW1vdmUgKGFyciwgaXRlbSkge1xuICBpZiAoYXJyLmxlbmd0aCkge1xuICAgIHZhciBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIG9iamVjdCBoYXMgdGhlIHByb3BlcnR5LlxuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuZnVuY3Rpb24gaGFzT3duIChvYmosIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNhY2hlZCAoZm4pIHtcbiAgdmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgcmV0dXJuIChmdW5jdGlvbiBjYWNoZWRGbiAoc3RyKSB7XG4gICAgdmFyIGhpdCA9IGNhY2hlW3N0cl07XG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpXG4gIH0pXG59XG5cbi8qKlxuICogQ2FtZWxpemUgYSBoeXBoZW4tZGVsaW1pdGVkIHN0cmluZy5cbiAqL1xudmFyIGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XG52YXIgY2FtZWxpemUgPSBjYWNoZWQoZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxpemVSRSwgZnVuY3Rpb24gKF8sIGMpIHsgcmV0dXJuIGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJzsgfSlcbn0pO1xuXG4vKipcbiAqIENhcGl0YWxpemUgYSBzdHJpbmcuXG4gKi9cbnZhciBjYXBpdGFsaXplID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufSk7XG5cbi8qKlxuICogSHlwaGVuYXRlIGEgY2FtZWxDYXNlIHN0cmluZy5cbiAqL1xudmFyIGh5cGhlbmF0ZVJFID0gL1xcQihbQS1aXSkvZztcbnZhciBoeXBoZW5hdGUgPSBjYWNoZWQoZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoaHlwaGVuYXRlUkUsICctJDEnKS50b0xvd2VyQ2FzZSgpXG59KTtcblxuLyoqXG4gKiBTaW1wbGUgYmluZCBwb2x5ZmlsbCBmb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IHN1cHBvcnQgaXQsXG4gKiBlLmcuLCBQaGFudG9tSlMgMS54LiBUZWNobmljYWxseSwgd2UgZG9uJ3QgbmVlZCB0aGlzIGFueW1vcmVcbiAqIHNpbmNlIG5hdGl2ZSBiaW5kIGlzIG5vdyBwZXJmb3JtYW50IGVub3VnaCBpbiBtb3N0IGJyb3dzZXJzLlxuICogQnV0IHJlbW92aW5nIGl0IHdvdWxkIG1lYW4gYnJlYWtpbmcgY29kZSB0aGF0IHdhcyBhYmxlIHRvIHJ1biBpblxuICogUGhhbnRvbUpTIDEueCwgc28gdGhpcyBtdXN0IGJlIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuXG4gKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIHBvbHlmaWxsQmluZCAoZm4sIGN0eCkge1xuICBmdW5jdGlvbiBib3VuZEZuIChhKSB7XG4gICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHJldHVybiBsXG4gICAgICA/IGwgPiAxXG4gICAgICAgID8gZm4uYXBwbHkoY3R4LCBhcmd1bWVudHMpXG4gICAgICAgIDogZm4uY2FsbChjdHgsIGEpXG4gICAgICA6IGZuLmNhbGwoY3R4KVxuICB9XG5cbiAgYm91bmRGbi5fbGVuZ3RoID0gZm4ubGVuZ3RoO1xuICByZXR1cm4gYm91bmRGblxufVxuXG5mdW5jdGlvbiBuYXRpdmVCaW5kIChmbiwgY3R4KSB7XG4gIHJldHVybiBmbi5iaW5kKGN0eClcbn1cblxudmFyIGJpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuICA/IG5hdGl2ZUJpbmRcbiAgOiBwb2x5ZmlsbEJpbmQ7XG5cbi8qKlxuICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkgKGxpc3QsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0O1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCAodG8sIF9mcm9tKSB7XG4gIGZvciAodmFyIGtleSBpbiBfZnJvbSkge1xuICAgIHRvW2tleV0gPSBfZnJvbVtrZXldO1xuICB9XG4gIHJldHVybiB0b1xufVxuXG4vKipcbiAqIE1lcmdlIGFuIEFycmF5IG9mIE9iamVjdHMgaW50byBhIHNpbmdsZSBPYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0IChhcnIpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0pIHtcbiAgICAgIGV4dGVuZChyZXMsIGFycltpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBQZXJmb3JtIG5vIG9wZXJhdGlvbi5cbiAqIFN0dWJiaW5nIGFyZ3MgdG8gbWFrZSBGbG93IGhhcHB5IHdpdGhvdXQgbGVhdmluZyB1c2VsZXNzIHRyYW5zcGlsZWQgY29kZVxuICogd2l0aCAuLi5yZXN0IChodHRwczovL2Zsb3cub3JnL2Jsb2cvMjAxNy8wNS8wNy9TdHJpY3QtRnVuY3Rpb24tQ2FsbC1Bcml0eS8pLlxuICovXG5mdW5jdGlvbiBub29wIChhLCBiLCBjKSB7fVxuXG4vKipcbiAqIEFsd2F5cyByZXR1cm4gZmFsc2UuXG4gKi9cbnZhciBubyA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7IHJldHVybiBmYWxzZTsgfTtcblxuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4vKipcbiAqIFJldHVybiB0aGUgc2FtZSB2YWx1ZS5cbiAqL1xudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24gKF8pIHsgcmV0dXJuIF87IH07XG5cbi8qKlxuICogQ2hlY2sgaWYgdHdvIHZhbHVlcyBhcmUgbG9vc2VseSBlcXVhbCAtIHRoYXQgaXMsXG4gKiBpZiB0aGV5IGFyZSBwbGFpbiBvYmplY3RzLCBkbyB0aGV5IGhhdmUgdGhlIHNhbWUgc2hhcGU/XG4gKi9cbmZ1bmN0aW9uIGxvb3NlRXF1YWwgKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHsgcmV0dXJuIHRydWUgfVxuICB2YXIgaXNPYmplY3RBID0gaXNPYmplY3QoYSk7XG4gIHZhciBpc09iamVjdEIgPSBpc09iamVjdChiKTtcbiAgaWYgKGlzT2JqZWN0QSAmJiBpc09iamVjdEIpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGlzQXJyYXlBID0gQXJyYXkuaXNBcnJheShhKTtcbiAgICAgIHZhciBpc0FycmF5QiA9IEFycmF5LmlzQXJyYXkoYik7XG4gICAgICBpZiAoaXNBcnJheUEgJiYgaXNBcnJheUIpIHtcbiAgICAgICAgcmV0dXJuIGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJiBhLmV2ZXJ5KGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIGxvb3NlRXF1YWwoZSwgYltpXSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIERhdGUgJiYgYiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKVxuICAgICAgfSBlbHNlIGlmICghaXNBcnJheUEgJiYgIWlzQXJyYXlCKSB7XG4gICAgICAgIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKGEpO1xuICAgICAgICB2YXIga2V5c0IgPSBPYmplY3Qua2V5cyhiKTtcbiAgICAgICAgcmV0dXJuIGtleXNBLmxlbmd0aCA9PT0ga2V5c0IubGVuZ3RoICYmIGtleXNBLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gbG9vc2VFcXVhbChhW2tleV0sIGJba2V5XSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH0gZWxzZSBpZiAoIWlzT2JqZWN0QSAmJiAhaXNPYmplY3RCKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKSA9PT0gU3RyaW5nKGIpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGZpcnN0IGluZGV4IGF0IHdoaWNoIGEgbG9vc2VseSBlcXVhbCB2YWx1ZSBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBhcnJheSAoaWYgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QsIHRoZSBhcnJheSBtdXN0XG4gKiBjb250YWluIGFuIG9iamVjdCBvZiB0aGUgc2FtZSBzaGFwZSksIG9yIC0xIGlmIGl0IGlzIG5vdCBwcmVzZW50LlxuICovXG5mdW5jdGlvbiBsb29zZUluZGV4T2YgKGFyciwgdmFsKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGxvb3NlRXF1YWwoYXJyW2ldLCB2YWwpKSB7IHJldHVybiBpIH1cbiAgfVxuICByZXR1cm4gLTFcbn1cblxuLyoqXG4gKiBFbnN1cmUgYSBmdW5jdGlvbiBpcyBjYWxsZWQgb25seSBvbmNlLlxuICovXG5mdW5jdGlvbiBvbmNlIChmbikge1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgQVNTRVRfVFlQRVMgPSBbXG4gICdjb21wb25lbnQnLFxuICAnZGlyZWN0aXZlJyxcbiAgJ2ZpbHRlcidcbl07XG5cbnZhciBMSUZFQ1lDTEVfSE9PS1MgPSBbXG4gICdiZWZvcmVDcmVhdGUnLFxuICAnY3JlYXRlZCcsXG4gICdiZWZvcmVNb3VudCcsXG4gICdtb3VudGVkJyxcbiAgJ2JlZm9yZVVwZGF0ZScsXG4gICd1cGRhdGVkJyxcbiAgJ2JlZm9yZURlc3Ryb3knLFxuICAnZGVzdHJveWVkJyxcbiAgJ2FjdGl2YXRlZCcsXG4gICdkZWFjdGl2YXRlZCcsXG4gICdlcnJvckNhcHR1cmVkJyxcbiAgJ3NlcnZlclByZWZldGNoJ1xuXTtcblxuLyogICovXG5cblxuXG52YXIgY29uZmlnID0gKHtcbiAgLyoqXG4gICAqIE9wdGlvbiBtZXJnZSBzdHJhdGVnaWVzICh1c2VkIGluIGNvcmUvdXRpbC9vcHRpb25zKVxuICAgKi9cbiAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gIG9wdGlvbk1lcmdlU3RyYXRlZ2llczogT2JqZWN0LmNyZWF0ZShudWxsKSxcblxuICAvKipcbiAgICogV2hldGhlciB0byBzdXBwcmVzcyB3YXJuaW5ncy5cbiAgICovXG4gIHNpbGVudDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIFNob3cgcHJvZHVjdGlvbiBtb2RlIHRpcCBtZXNzYWdlIG9uIGJvb3Q/XG4gICAqL1xuICBwcm9kdWN0aW9uVGlwOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGVuYWJsZSBkZXZ0b29sc1xuICAgKi9cbiAgZGV2dG9vbHM6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVjb3JkIHBlcmZcbiAgICovXG4gIHBlcmZvcm1hbmNlOiBmYWxzZSxcblxuICAvKipcbiAgICogRXJyb3IgaGFuZGxlciBmb3Igd2F0Y2hlciBlcnJvcnNcbiAgICovXG4gIGVycm9ySGFuZGxlcjogbnVsbCxcblxuICAvKipcbiAgICogV2FybiBoYW5kbGVyIGZvciB3YXRjaGVyIHdhcm5zXG4gICAqL1xuICB3YXJuSGFuZGxlcjogbnVsbCxcblxuICAvKipcbiAgICogSWdub3JlIGNlcnRhaW4gY3VzdG9tIGVsZW1lbnRzXG4gICAqL1xuICBpZ25vcmVkRWxlbWVudHM6IFtdLFxuXG4gIC8qKlxuICAgKiBDdXN0b20gdXNlciBrZXkgYWxpYXNlcyBmb3Igdi1vblxuICAgKi9cbiAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gIGtleUNvZGVzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHRhZyBpcyByZXNlcnZlZCBzbyB0aGF0IGl0IGNhbm5vdCBiZSByZWdpc3RlcmVkIGFzIGFcbiAgICogY29tcG9uZW50LiBUaGlzIGlzIHBsYXRmb3JtLWRlcGVuZGVudCBhbmQgbWF5IGJlIG92ZXJ3cml0dGVuLlxuICAgKi9cbiAgaXNSZXNlcnZlZFRhZzogbm8sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGF0dHJpYnV0ZSBpcyByZXNlcnZlZCBzbyB0aGF0IGl0IGNhbm5vdCBiZSB1c2VkIGFzIGEgY29tcG9uZW50XG4gICAqIHByb3AuIFRoaXMgaXMgcGxhdGZvcm0tZGVwZW5kZW50IGFuZCBtYXkgYmUgb3ZlcndyaXR0ZW4uXG4gICAqL1xuICBpc1Jlc2VydmVkQXR0cjogbm8sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGFnIGlzIGFuIHVua25vd24gZWxlbWVudC5cbiAgICogUGxhdGZvcm0tZGVwZW5kZW50LlxuICAgKi9cbiAgaXNVbmtub3duRWxlbWVudDogbm8sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbmFtZXNwYWNlIG9mIGFuIGVsZW1lbnRcbiAgICovXG4gIGdldFRhZ05hbWVzcGFjZTogbm9vcCxcblxuICAvKipcbiAgICogUGFyc2UgdGhlIHJlYWwgdGFnIG5hbWUgZm9yIHRoZSBzcGVjaWZpYyBwbGF0Zm9ybS5cbiAgICovXG4gIHBhcnNlUGxhdGZvcm1UYWdOYW1lOiBpZGVudGl0eSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gYXR0cmlidXRlIG11c3QgYmUgYm91bmQgdXNpbmcgcHJvcGVydHksIGUuZy4gdmFsdWVcbiAgICogUGxhdGZvcm0tZGVwZW5kZW50LlxuICAgKi9cbiAgbXVzdFVzZVByb3A6IG5vLFxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIHVwZGF0ZXMgYXN5bmNocm9ub3VzbHkuIEludGVuZGVkIHRvIGJlIHVzZWQgYnkgVnVlIFRlc3QgVXRpbHNcbiAgICogVGhpcyB3aWxsIHNpZ25pZmljYW50bHkgcmVkdWNlIHBlcmZvcm1hbmNlIGlmIHNldCB0byBmYWxzZS5cbiAgICovXG4gIGFzeW5jOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBFeHBvc2VkIGZvciBsZWdhY3kgcmVhc29uc1xuICAgKi9cbiAgX2xpZmVjeWNsZUhvb2tzOiBMSUZFQ1lDTEVfSE9PS1Ncbn0pO1xuXG4vKiAgKi9cblxuLyoqXG4gKiB1bmljb2RlIGxldHRlcnMgdXNlZCBmb3IgcGFyc2luZyBodG1sIHRhZ3MsIGNvbXBvbmVudCBuYW1lcyBhbmQgcHJvcGVydHkgcGF0aHMuXG4gKiB1c2luZyBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUzL3NlbWFudGljcy1zY3JpcHRpbmcuaHRtbCNwb3RlbnRpYWxjdXN0b21lbGVtZW50bmFtZVxuICogc2tpcHBpbmcgXFx1MTAwMDAtXFx1RUZGRkYgZHVlIHRvIGl0IGZyZWV6aW5nIHVwIFBoYW50b21KU1xuICovXG52YXIgdW5pY29kZVJlZ0V4cCA9IC9hLXpBLVpcXHUwMEI3XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMzdEXFx1MDM3Ri1cXHUxRkZGXFx1MjAwQy1cXHUyMDBEXFx1MjAzRi1cXHUyMDQwXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZELztcblxuLyoqXG4gKiBDaGVjayBpZiBhIHN0cmluZyBzdGFydHMgd2l0aCAkIG9yIF9cbiAqL1xuZnVuY3Rpb24gaXNSZXNlcnZlZCAoc3RyKSB7XG4gIHZhciBjID0gKHN0ciArICcnKS5jaGFyQ29kZUF0KDApO1xuICByZXR1cm4gYyA9PT0gMHgyNCB8fCBjID09PSAweDVGXG59XG5cbi8qKlxuICogRGVmaW5lIGEgcHJvcGVydHkuXG4gKi9cbmZ1bmN0aW9uIGRlZiAob2JqLCBrZXksIHZhbCwgZW51bWVyYWJsZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICB2YWx1ZTogdmFsLFxuICAgIGVudW1lcmFibGU6ICEhZW51bWVyYWJsZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogUGFyc2Ugc2ltcGxlIHBhdGguXG4gKi9cbnZhciBiYWlsUkUgPSBuZXcgUmVnRXhwKChcIlteXCIgKyAodW5pY29kZVJlZ0V4cC5zb3VyY2UpICsgXCIuJF9cXFxcZF1cIikpO1xuZnVuY3Rpb24gcGFyc2VQYXRoIChwYXRoKSB7XG4gIGlmIChiYWlsUkUudGVzdChwYXRoKSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBzZWdtZW50cyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIW9iaikgeyByZXR1cm4gfVxuICAgICAgb2JqID0gb2JqW3NlZ21lbnRzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIG9ialxuICB9XG59XG5cbi8qICAqL1xuXG4vLyBjYW4gd2UgdXNlIF9fcHJvdG9fXz9cbnZhciBoYXNQcm90byA9ICdfX3Byb3RvX18nIGluIHt9O1xuXG4vLyBCcm93c2VyIGVudmlyb25tZW50IHNuaWZmaW5nXG52YXIgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgaW5XZWV4ID0gdHlwZW9mIFdYRW52aXJvbm1lbnQgIT09ICd1bmRlZmluZWQnICYmICEhV1hFbnZpcm9ubWVudC5wbGF0Zm9ybTtcbnZhciB3ZWV4UGxhdGZvcm0gPSBpbldlZXggJiYgV1hFbnZpcm9ubWVudC5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpO1xudmFyIFVBID0gaW5Ccm93c2VyICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG52YXIgaXNJRSA9IFVBICYmIC9tc2llfHRyaWRlbnQvLnRlc3QoVUEpO1xudmFyIGlzSUU5ID0gVUEgJiYgVUEuaW5kZXhPZignbXNpZSA5LjAnKSA+IDA7XG52YXIgaXNFZGdlID0gVUEgJiYgVUEuaW5kZXhPZignZWRnZS8nKSA+IDA7XG52YXIgaXNBbmRyb2lkID0gKFVBICYmIFVBLmluZGV4T2YoJ2FuZHJvaWQnKSA+IDApIHx8ICh3ZWV4UGxhdGZvcm0gPT09ICdhbmRyb2lkJyk7XG52YXIgaXNJT1MgPSAoVUEgJiYgL2lwaG9uZXxpcGFkfGlwb2R8aW9zLy50ZXN0KFVBKSkgfHwgKHdlZXhQbGF0Zm9ybSA9PT0gJ2lvcycpO1xudmFyIGlzQ2hyb21lID0gVUEgJiYgL2Nocm9tZVxcL1xcZCsvLnRlc3QoVUEpICYmICFpc0VkZ2U7XG52YXIgaXNQaGFudG9tSlMgPSBVQSAmJiAvcGhhbnRvbWpzLy50ZXN0KFVBKTtcbnZhciBpc0ZGID0gVUEgJiYgVUEubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKTtcblxuLy8gRmlyZWZveCBoYXMgYSBcIndhdGNoXCIgZnVuY3Rpb24gb24gT2JqZWN0LnByb3RvdHlwZS4uLlxudmFyIG5hdGl2ZVdhdGNoID0gKHt9KS53YXRjaDtcbmlmIChpbkJyb3dzZXIpIHtcbiAgdHJ5IHtcbiAgICB2YXIgb3B0cyA9IHt9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvcHRzLCAncGFzc2l2ZScsICh7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCAoKSB7XG4gICAgICB9XG4gICAgfSkpOyAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMjg1XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QtcGFzc2l2ZScsIG51bGwsIG9wdHMpO1xuICB9IGNhdGNoIChlKSB7fVxufVxuXG4vLyB0aGlzIG5lZWRzIHRvIGJlIGxhenktZXZhbGVkIGJlY2F1c2UgdnVlIG1heSBiZSByZXF1aXJlZCBiZWZvcmVcbi8vIHZ1ZS1zZXJ2ZXItcmVuZGVyZXIgY2FuIHNldCBWVUVfRU5WXG52YXIgX2lzU2VydmVyO1xudmFyIGlzU2VydmVyUmVuZGVyaW5nID0gZnVuY3Rpb24gKCkge1xuICBpZiAoX2lzU2VydmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIWluQnJvd3NlciAmJiAhaW5XZWV4ICYmIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBkZXRlY3QgcHJlc2VuY2Ugb2YgdnVlLXNlcnZlci1yZW5kZXJlciBhbmQgYXZvaWRcbiAgICAgIC8vIFdlYnBhY2sgc2hpbW1pbmcgdGhlIHByb2Nlc3NcbiAgICAgIF9pc1NlcnZlciA9IGdsb2JhbFsncHJvY2VzcyddICYmIGdsb2JhbFsncHJvY2VzcyddLmVudi5WVUVfRU5WID09PSAnc2VydmVyJztcbiAgICB9IGVsc2Uge1xuICAgICAgX2lzU2VydmVyID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBfaXNTZXJ2ZXJcbn07XG5cbi8vIGRldGVjdCBkZXZ0b29sc1xudmFyIGRldnRvb2xzID0gaW5Ccm93c2VyICYmIHdpbmRvdy5fX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gaXNOYXRpdmUgKEN0b3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChDdG9yLnRvU3RyaW5nKCkpXG59XG5cbnZhciBoYXNTeW1ib2wgPVxuICB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTeW1ib2wpICYmXG4gIHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShSZWZsZWN0Lm93bktleXMpO1xuXG52YXIgX1NldDtcbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqLyAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbmlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTZXQpKSB7XG4gIC8vIHVzZSBuYXRpdmUgU2V0IHdoZW4gYXZhaWxhYmxlLlxuICBfU2V0ID0gU2V0O1xufSBlbHNlIHtcbiAgLy8gYSBub24tc3RhbmRhcmQgU2V0IHBvbHlmaWxsIHRoYXQgb25seSB3b3JrcyB3aXRoIHByaW1pdGl2ZSBrZXlzLlxuICBfU2V0ID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2V0ICgpIHtcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0W2tleV0gPT09IHRydWVcbiAgICB9O1xuICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkIChrZXkpIHtcbiAgICAgIHRoaXMuc2V0W2tleV0gPSB0cnVlO1xuICAgIH07XG4gICAgU2V0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNldDtcbiAgfSgpKTtcbn1cblxuLyogICovXG5cbnZhciB3YXJuID0gbm9vcDtcbnZhciB0aXAgPSBub29wO1xudmFyIGdlbmVyYXRlQ29tcG9uZW50VHJhY2UgPSAobm9vcCk7IC8vIHdvcmsgYXJvdW5kIGZsb3cgY2hlY2tcbnZhciBmb3JtYXRDb21wb25lbnROYW1lID0gKG5vb3ApO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaGFzQ29uc29sZSA9IHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJztcbiAgdmFyIGNsYXNzaWZ5UkUgPSAvKD86XnxbLV9dKShcXHcpL2c7XG4gIHZhciBjbGFzc2lmeSA9IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0clxuICAgIC5yZXBsYWNlKGNsYXNzaWZ5UkUsIGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnRvVXBwZXJDYXNlKCk7IH0pXG4gICAgLnJlcGxhY2UoL1stX10vZywgJycpOyB9O1xuXG4gIHdhcm4gPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgIHZhciB0cmFjZSA9IHZtID8gZ2VuZXJhdGVDb21wb25lbnRUcmFjZSh2bSkgOiAnJztcblxuICAgIGlmIChjb25maWcud2FybkhhbmRsZXIpIHtcbiAgICAgIGNvbmZpZy53YXJuSGFuZGxlci5jYWxsKG51bGwsIG1zZywgdm0sIHRyYWNlKTtcbiAgICB9IGVsc2UgaWYgKGhhc0NvbnNvbGUgJiYgKCFjb25maWcuc2lsZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcigoXCJbVnVlIHdhcm5dOiBcIiArIG1zZyArIHRyYWNlKSk7XG4gICAgfVxuICB9O1xuXG4gIHRpcCA9IGZ1bmN0aW9uIChtc2csIHZtKSB7XG4gICAgaWYgKGhhc0NvbnNvbGUgJiYgKCFjb25maWcuc2lsZW50KSkge1xuICAgICAgY29uc29sZS53YXJuKFwiW1Z1ZSB0aXBdOiBcIiArIG1zZyArIChcbiAgICAgICAgdm0gPyBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlKHZtKSA6ICcnXG4gICAgICApKTtcbiAgICB9XG4gIH07XG5cbiAgZm9ybWF0Q29tcG9uZW50TmFtZSA9IGZ1bmN0aW9uICh2bSwgaW5jbHVkZUZpbGUpIHtcbiAgICB7XG4gICAgICBpZih2bS4kc2NvcGUgJiYgdm0uJHNjb3BlLmlzKXtcbiAgICAgICAgcmV0dXJuIHZtLiRzY29wZS5pc1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodm0uJHJvb3QgPT09IHZtKSB7XG4gICAgICByZXR1cm4gJzxSb290PidcbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygdm0gPT09ICdmdW5jdGlvbicgJiYgdm0uY2lkICE9IG51bGxcbiAgICAgID8gdm0ub3B0aW9uc1xuICAgICAgOiB2bS5faXNWdWVcbiAgICAgICAgPyB2bS4kb3B0aW9ucyB8fCB2bS5jb25zdHJ1Y3Rvci5vcHRpb25zXG4gICAgICAgIDogdm07XG4gICAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5fY29tcG9uZW50VGFnO1xuICAgIHZhciBmaWxlID0gb3B0aW9ucy5fX2ZpbGU7XG4gICAgaWYgKCFuYW1lICYmIGZpbGUpIHtcbiAgICAgIHZhciBtYXRjaCA9IGZpbGUubWF0Y2goLyhbXi9cXFxcXSspXFwudnVlJC8pO1xuICAgICAgbmFtZSA9IG1hdGNoICYmIG1hdGNoWzFdO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAobmFtZSA/IChcIjxcIiArIChjbGFzc2lmeShuYW1lKSkgKyBcIj5cIikgOiBcIjxBbm9ueW1vdXM+XCIpICtcbiAgICAgIChmaWxlICYmIGluY2x1ZGVGaWxlICE9PSBmYWxzZSA/IChcIiBhdCBcIiArIGZpbGUpIDogJycpXG4gICAgKVxuICB9O1xuXG4gIHZhciByZXBlYXQgPSBmdW5jdGlvbiAoc3RyLCBuKSB7XG4gICAgdmFyIHJlcyA9ICcnO1xuICAgIHdoaWxlIChuKSB7XG4gICAgICBpZiAobiAlIDIgPT09IDEpIHsgcmVzICs9IHN0cjsgfVxuICAgICAgaWYgKG4gPiAxKSB7IHN0ciArPSBzdHI7IH1cbiAgICAgIG4gPj49IDE7XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfTtcblxuICBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlID0gZnVuY3Rpb24gKHZtKSB7XG4gICAgaWYgKHZtLl9pc1Z1ZSAmJiB2bS4kcGFyZW50KSB7XG4gICAgICB2YXIgdHJlZSA9IFtdO1xuICAgICAgdmFyIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSA9IDA7XG4gICAgICB3aGlsZSAodm0pIHtcbiAgICAgICAgaWYgKHRyZWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBsYXN0ID0gdHJlZVt0cmVlLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIGlmIChsYXN0LmNvbnN0cnVjdG9yID09PSB2bS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlKys7XG4gICAgICAgICAgICB2bSA9IHZtLiRwYXJlbnQ7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlID4gMCkge1xuICAgICAgICAgICAgdHJlZVt0cmVlLmxlbmd0aCAtIDFdID0gW2xhc3QsIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZV07XG4gICAgICAgICAgICBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmVlLnB1c2godm0pO1xuICAgICAgICB2bSA9IHZtLiRwYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gJ1xcblxcbmZvdW5kIGluXFxuXFxuJyArIHRyZWVcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodm0sIGkpIHsgcmV0dXJuIChcIlwiICsgKGkgPT09IDAgPyAnLS0tPiAnIDogcmVwZWF0KCcgJywgNSArIGkgKiAyKSkgKyAoQXJyYXkuaXNBcnJheSh2bSlcbiAgICAgICAgICAgID8gKChmb3JtYXRDb21wb25lbnROYW1lKHZtWzBdKSkgKyBcIi4uLiAoXCIgKyAodm1bMV0pICsgXCIgcmVjdXJzaXZlIGNhbGxzKVwiKVxuICAgICAgICAgICAgOiBmb3JtYXRDb21wb25lbnROYW1lKHZtKSkpOyB9KVxuICAgICAgICAuam9pbignXFxuJylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcIlxcblxcbihmb3VuZCBpbiBcIiArIChmb3JtYXRDb21wb25lbnROYW1lKHZtKSkgKyBcIilcIilcbiAgICB9XG4gIH07XG59XG5cbi8qICAqL1xuXG52YXIgdWlkID0gMDtcblxuLyoqXG4gKiBBIGRlcCBpcyBhbiBvYnNlcnZhYmxlIHRoYXQgY2FuIGhhdmUgbXVsdGlwbGVcbiAqIGRpcmVjdGl2ZXMgc3Vic2NyaWJpbmcgdG8gaXQuXG4gKi9cbnZhciBEZXAgPSBmdW5jdGlvbiBEZXAgKCkge1xuICAvLyBmaXhlZCBieSB4eHh4eHggKG52dWUgdnVleClcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgaWYodHlwZW9mIFNoYXJlZE9iamVjdCAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgIHRoaXMuaWQgPSBTaGFyZWRPYmplY3QudWlkKys7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pZCA9IHVpZCsrO1xuICB9XG4gIHRoaXMuc3VicyA9IFtdO1xufTtcblxuRGVwLnByb3RvdHlwZS5hZGRTdWIgPSBmdW5jdGlvbiBhZGRTdWIgKHN1Yikge1xuICB0aGlzLnN1YnMucHVzaChzdWIpO1xufTtcblxuRGVwLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbiByZW1vdmVTdWIgKHN1Yikge1xuICByZW1vdmUodGhpcy5zdWJzLCBzdWIpO1xufTtcblxuRGVwLnByb3RvdHlwZS5kZXBlbmQgPSBmdW5jdGlvbiBkZXBlbmQgKCkge1xuICBpZiAoRGVwLlNoYXJlZE9iamVjdC50YXJnZXQpIHtcbiAgICBEZXAuU2hhcmVkT2JqZWN0LnRhcmdldC5hZGREZXAodGhpcyk7XG4gIH1cbn07XG5cbkRlcC5wcm90b3R5cGUubm90aWZ5ID0gZnVuY3Rpb24gbm90aWZ5ICgpIHtcbiAgLy8gc3RhYmlsaXplIHRoZSBzdWJzY3JpYmVyIGxpc3QgZmlyc3RcbiAgdmFyIHN1YnMgPSB0aGlzLnN1YnMuc2xpY2UoKTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIWNvbmZpZy5hc3luYykge1xuICAgIC8vIHN1YnMgYXJlbid0IHNvcnRlZCBpbiBzY2hlZHVsZXIgaWYgbm90IHJ1bm5pbmcgYXN5bmNcbiAgICAvLyB3ZSBuZWVkIHRvIHNvcnQgdGhlbSBub3cgdG8gbWFrZSBzdXJlIHRoZXkgZmlyZSBpbiBjb3JyZWN0XG4gICAgLy8gb3JkZXJcbiAgICBzdWJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuaWQgLSBiLmlkOyB9KTtcbiAgfVxuICBmb3IgKHZhciBpID0gMCwgbCA9IHN1YnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgc3Vic1tpXS51cGRhdGUoKTtcbiAgfVxufTtcblxuLy8gVGhlIGN1cnJlbnQgdGFyZ2V0IHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkLlxuLy8gVGhpcyBpcyBnbG9iYWxseSB1bmlxdWUgYmVjYXVzZSBvbmx5IG9uZSB3YXRjaGVyXG4vLyBjYW4gYmUgZXZhbHVhdGVkIGF0IGEgdGltZS5cbi8vIGZpeGVkIGJ5IHh4eHh4eCAobnZ1ZSBzaGFyZWQgdnVleClcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5EZXAuU2hhcmVkT2JqZWN0ID0gdHlwZW9mIFNoYXJlZE9iamVjdCAhPT0gJ3VuZGVmaW5lZCcgPyBTaGFyZWRPYmplY3QgOiB7fTtcbkRlcC5TaGFyZWRPYmplY3QudGFyZ2V0ID0gbnVsbDtcbkRlcC5TaGFyZWRPYmplY3QudGFyZ2V0U3RhY2sgPSBbXTtcblxuZnVuY3Rpb24gcHVzaFRhcmdldCAodGFyZ2V0KSB7XG4gIERlcC5TaGFyZWRPYmplY3QudGFyZ2V0U3RhY2sucHVzaCh0YXJnZXQpO1xuICBEZXAuU2hhcmVkT2JqZWN0LnRhcmdldCA9IHRhcmdldDtcbn1cblxuZnVuY3Rpb24gcG9wVGFyZ2V0ICgpIHtcbiAgRGVwLlNoYXJlZE9iamVjdC50YXJnZXRTdGFjay5wb3AoKTtcbiAgRGVwLlNoYXJlZE9iamVjdC50YXJnZXQgPSBEZXAuU2hhcmVkT2JqZWN0LnRhcmdldFN0YWNrW0RlcC5TaGFyZWRPYmplY3QudGFyZ2V0U3RhY2subGVuZ3RoIC0gMV07XG59XG5cbi8qICAqL1xuXG52YXIgVk5vZGUgPSBmdW5jdGlvbiBWTm9kZSAoXG4gIHRhZyxcbiAgZGF0YSxcbiAgY2hpbGRyZW4sXG4gIHRleHQsXG4gIGVsbSxcbiAgY29udGV4dCxcbiAgY29tcG9uZW50T3B0aW9ucyxcbiAgYXN5bmNGYWN0b3J5XG4pIHtcbiAgdGhpcy50YWcgPSB0YWc7XG4gIHRoaXMuZGF0YSA9IGRhdGE7XG4gIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgdGhpcy5lbG0gPSBlbG07XG4gIHRoaXMubnMgPSB1bmRlZmluZWQ7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMuZm5Db250ZXh0ID0gdW5kZWZpbmVkO1xuICB0aGlzLmZuT3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgdGhpcy5mblNjb3BlSWQgPSB1bmRlZmluZWQ7XG4gIHRoaXMua2V5ID0gZGF0YSAmJiBkYXRhLmtleTtcbiAgdGhpcy5jb21wb25lbnRPcHRpb25zID0gY29tcG9uZW50T3B0aW9ucztcbiAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5wYXJlbnQgPSB1bmRlZmluZWQ7XG4gIHRoaXMucmF3ID0gZmFsc2U7XG4gIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgdGhpcy5pc1Jvb3RJbnNlcnQgPSB0cnVlO1xuICB0aGlzLmlzQ29tbWVudCA9IGZhbHNlO1xuICB0aGlzLmlzQ2xvbmVkID0gZmFsc2U7XG4gIHRoaXMuaXNPbmNlID0gZmFsc2U7XG4gIHRoaXMuYXN5bmNGYWN0b3J5ID0gYXN5bmNGYWN0b3J5O1xuICB0aGlzLmFzeW5jTWV0YSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5pc0FzeW5jUGxhY2Vob2xkZXIgPSBmYWxzZTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMgPSB7IGNoaWxkOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XG5cbi8vIERFUFJFQ0FURUQ6IGFsaWFzIGZvciBjb21wb25lbnRJbnN0YW5jZSBmb3IgYmFja3dhcmRzIGNvbXBhdC5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5wcm90b3R5cGVBY2Nlc3NvcnMuY2hpbGQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5jb21wb25lbnRJbnN0YW5jZVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFZOb2RlLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbnZhciBjcmVhdGVFbXB0eVZOb2RlID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgaWYgKCB0ZXh0ID09PSB2b2lkIDAgKSB0ZXh0ID0gJyc7XG5cbiAgdmFyIG5vZGUgPSBuZXcgVk5vZGUoKTtcbiAgbm9kZS50ZXh0ID0gdGV4dDtcbiAgbm9kZS5pc0NvbW1lbnQgPSB0cnVlO1xuICByZXR1cm4gbm9kZVxufTtcblxuZnVuY3Rpb24gY3JlYXRlVGV4dFZOb2RlICh2YWwpIHtcbiAgcmV0dXJuIG5ldyBWTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBTdHJpbmcodmFsKSlcbn1cblxuLy8gb3B0aW1pemVkIHNoYWxsb3cgY2xvbmVcbi8vIHVzZWQgZm9yIHN0YXRpYyBub2RlcyBhbmQgc2xvdCBub2RlcyBiZWNhdXNlIHRoZXkgbWF5IGJlIHJldXNlZCBhY3Jvc3Ncbi8vIG11bHRpcGxlIHJlbmRlcnMsIGNsb25pbmcgdGhlbSBhdm9pZHMgZXJyb3JzIHdoZW4gRE9NIG1hbmlwdWxhdGlvbnMgcmVseVxuLy8gb24gdGhlaXIgZWxtIHJlZmVyZW5jZS5cbmZ1bmN0aW9uIGNsb25lVk5vZGUgKHZub2RlKSB7XG4gIHZhciBjbG9uZWQgPSBuZXcgVk5vZGUoXG4gICAgdm5vZGUudGFnLFxuICAgIHZub2RlLmRhdGEsXG4gICAgLy8gIzc5NzVcbiAgICAvLyBjbG9uZSBjaGlsZHJlbiBhcnJheSB0byBhdm9pZCBtdXRhdGluZyBvcmlnaW5hbCBpbiBjYXNlIG9mIGNsb25pbmdcbiAgICAvLyBhIGNoaWxkLlxuICAgIHZub2RlLmNoaWxkcmVuICYmIHZub2RlLmNoaWxkcmVuLnNsaWNlKCksXG4gICAgdm5vZGUudGV4dCxcbiAgICB2bm9kZS5lbG0sXG4gICAgdm5vZGUuY29udGV4dCxcbiAgICB2bm9kZS5jb21wb25lbnRPcHRpb25zLFxuICAgIHZub2RlLmFzeW5jRmFjdG9yeVxuICApO1xuICBjbG9uZWQubnMgPSB2bm9kZS5ucztcbiAgY2xvbmVkLmlzU3RhdGljID0gdm5vZGUuaXNTdGF0aWM7XG4gIGNsb25lZC5rZXkgPSB2bm9kZS5rZXk7XG4gIGNsb25lZC5pc0NvbW1lbnQgPSB2bm9kZS5pc0NvbW1lbnQ7XG4gIGNsb25lZC5mbkNvbnRleHQgPSB2bm9kZS5mbkNvbnRleHQ7XG4gIGNsb25lZC5mbk9wdGlvbnMgPSB2bm9kZS5mbk9wdGlvbnM7XG4gIGNsb25lZC5mblNjb3BlSWQgPSB2bm9kZS5mblNjb3BlSWQ7XG4gIGNsb25lZC5hc3luY01ldGEgPSB2bm9kZS5hc3luY01ldGE7XG4gIGNsb25lZC5pc0Nsb25lZCA9IHRydWU7XG4gIHJldHVybiBjbG9uZWRcbn1cblxuLypcbiAqIG5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBwbGF5IHdlbGwgd2l0aFxuICogZHluYW1pY2FsbHkgYWNjZXNzaW5nIG1ldGhvZHMgb24gQXJyYXkgcHJvdG90eXBlXG4gKi9cblxudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG52YXIgYXJyYXlNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShhcnJheVByb3RvKTtcblxudmFyIG1ldGhvZHNUb1BhdGNoID0gW1xuICAncHVzaCcsXG4gICdwb3AnLFxuICAnc2hpZnQnLFxuICAndW5zaGlmdCcsXG4gICdzcGxpY2UnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJ1xuXTtcblxuLyoqXG4gKiBJbnRlcmNlcHQgbXV0YXRpbmcgbWV0aG9kcyBhbmQgZW1pdCBldmVudHNcbiAqL1xubWV0aG9kc1RvUGF0Y2guZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gIC8vIGNhY2hlIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgb3JpZ2luYWwgPSBhcnJheVByb3RvW21ldGhvZF07XG4gIGRlZihhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvciAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgdmFyIHJlc3VsdCA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIHZhciBvYiA9IHRoaXMuX19vYl9fO1xuICAgIHZhciBpbnNlcnRlZDtcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgY2FzZSAncHVzaCc6XG4gICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzLnNsaWNlKDIpO1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICBpZiAoaW5zZXJ0ZWQpIHsgb2Iub2JzZXJ2ZUFycmF5KGluc2VydGVkKTsgfVxuICAgIC8vIG5vdGlmeSBjaGFuZ2VcbiAgICBvYi5kZXAubm90aWZ5KCk7XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KTtcbn0pO1xuXG4vKiAgKi9cblxudmFyIGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcyk7XG5cbi8qKlxuICogSW4gc29tZSBjYXNlcyB3ZSBtYXkgd2FudCB0byBkaXNhYmxlIG9ic2VydmF0aW9uIGluc2lkZSBhIGNvbXBvbmVudCdzXG4gKiB1cGRhdGUgY29tcHV0YXRpb24uXG4gKi9cbnZhciBzaG91bGRPYnNlcnZlID0gdHJ1ZTtcblxuZnVuY3Rpb24gdG9nZ2xlT2JzZXJ2aW5nICh2YWx1ZSkge1xuICBzaG91bGRPYnNlcnZlID0gdmFsdWU7XG59XG5cbi8qKlxuICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBpcyBhdHRhY2hlZCB0byBlYWNoIG9ic2VydmVkXG4gKiBvYmplY3QuIE9uY2UgYXR0YWNoZWQsIHRoZSBvYnNlcnZlciBjb252ZXJ0cyB0aGUgdGFyZ2V0XG4gKiBvYmplY3QncyBwcm9wZXJ0eSBrZXlzIGludG8gZ2V0dGVyL3NldHRlcnMgdGhhdFxuICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoIHVwZGF0ZXMuXG4gKi9cbnZhciBPYnNlcnZlciA9IGZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSkge1xuICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIHRoaXMuZGVwID0gbmV3IERlcCgpO1xuICB0aGlzLnZtQ291bnQgPSAwO1xuICBkZWYodmFsdWUsICdfX29iX18nLCB0aGlzKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgaWYgKGhhc1Byb3RvKSB7XG4gICAgICB7Ly8gZml4ZWQgYnkgeHh4eHh4IOW+ruS/oeWwj+eoi+W6j+S9v+eUqCBwbHVnaW5zIOS5i+WQju+8jOaVsOe7hOaWueazleiiq+ebtOaOpeaMgui9veWIsOS6huaVsOe7hOWvueixoeS4iu+8jOmcgOimgeaJp+ihjCBjb3B5QXVnbWVudCDpgLvovpFcbiAgICAgICAgaWYodmFsdWUucHVzaCAhPT0gdmFsdWUuX19wcm90b19fLnB1c2gpe1xuICAgICAgICAgIGNvcHlBdWdtZW50KHZhbHVlLCBhcnJheU1ldGhvZHMsIGFycmF5S2V5cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvdG9BdWdtZW50KHZhbHVlLCBhcnJheU1ldGhvZHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvcHlBdWdtZW50KHZhbHVlLCBhcnJheU1ldGhvZHMsIGFycmF5S2V5cyk7XG4gICAgfVxuICAgIHRoaXMub2JzZXJ2ZUFycmF5KHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhbGsodmFsdWUpO1xuICB9XG59O1xuXG4vKipcbiAqIFdhbGsgdGhyb3VnaCBhbGwgcHJvcGVydGllcyBhbmQgY29udmVydCB0aGVtIGludG9cbiAqIGdldHRlci9zZXR0ZXJzLiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgd2hlblxuICogdmFsdWUgdHlwZSBpcyBPYmplY3QuXG4gKi9cbk9ic2VydmVyLnByb3RvdHlwZS53YWxrID0gZnVuY3Rpb24gd2FsayAob2JqKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVmaW5lUmVhY3RpdmUkJDEob2JqLCBrZXlzW2ldKTtcbiAgfVxufTtcblxuLyoqXG4gKiBPYnNlcnZlIGEgbGlzdCBvZiBBcnJheSBpdGVtcy5cbiAqL1xuT2JzZXJ2ZXIucHJvdG90eXBlLm9ic2VydmVBcnJheSA9IGZ1bmN0aW9uIG9ic2VydmVBcnJheSAoaXRlbXMpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBpdGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBvYnNlcnZlKGl0ZW1zW2ldKTtcbiAgfVxufTtcblxuLy8gaGVscGVyc1xuXG4vKipcbiAqIEF1Z21lbnQgYSB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGludGVyY2VwdGluZ1xuICogdGhlIHByb3RvdHlwZSBjaGFpbiB1c2luZyBfX3Byb3RvX19cbiAqL1xuZnVuY3Rpb24gcHJvdG9BdWdtZW50ICh0YXJnZXQsIHNyYykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuICB0YXJnZXQuX19wcm90b19fID0gc3JjO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXByb3RvICovXG59XG5cbi8qKlxuICogQXVnbWVudCBhIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcbiAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxuICovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gY29weUF1Z21lbnQgKHRhcmdldCwgc3JjLCBrZXlzKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBkZWYodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfVxufVxuXG4vKipcbiAqIEF0dGVtcHQgdG8gY3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlIGZvciBhIHZhbHVlLFxuICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcbiAqIG9yIHRoZSBleGlzdGluZyBvYnNlcnZlciBpZiB0aGUgdmFsdWUgYWxyZWFkeSBoYXMgb25lLlxuICovXG5mdW5jdGlvbiBvYnNlcnZlICh2YWx1ZSwgYXNSb290RGF0YSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCB2YWx1ZSBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9iO1xuICBpZiAoaGFzT3duKHZhbHVlLCAnX19vYl9fJykgJiYgdmFsdWUuX19vYl9fIGluc3RhbmNlb2YgT2JzZXJ2ZXIpIHtcbiAgICBvYiA9IHZhbHVlLl9fb2JfXztcbiAgfSBlbHNlIGlmIChcbiAgICBzaG91bGRPYnNlcnZlICYmXG4gICAgIWlzU2VydmVyUmVuZGVyaW5nKCkgJiZcbiAgICAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgaXNQbGFpbk9iamVjdCh2YWx1ZSkpICYmXG4gICAgT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkgJiZcbiAgICAhdmFsdWUuX2lzVnVlXG4gICkge1xuICAgIG9iID0gbmV3IE9ic2VydmVyKHZhbHVlKTtcbiAgfVxuICBpZiAoYXNSb290RGF0YSAmJiBvYikge1xuICAgIG9iLnZtQ291bnQrKztcbiAgfVxuICByZXR1cm4gb2Jcbn1cblxuLyoqXG4gKiBEZWZpbmUgYSByZWFjdGl2ZSBwcm9wZXJ0eSBvbiBhbiBPYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGRlZmluZVJlYWN0aXZlJCQxIChcbiAgb2JqLFxuICBrZXksXG4gIHZhbCxcbiAgY3VzdG9tU2V0dGVyLFxuICBzaGFsbG93XG4pIHtcbiAgdmFyIGRlcCA9IG5ldyBEZXAoKTtcblxuICB2YXIgcHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgaWYgKHByb3BlcnR5ICYmIHByb3BlcnR5LmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIGNhdGVyIGZvciBwcmUtZGVmaW5lZCBnZXR0ZXIvc2V0dGVyc1xuICB2YXIgZ2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuZ2V0O1xuICB2YXIgc2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuc2V0O1xuICBpZiAoKCFnZXR0ZXIgfHwgc2V0dGVyKSAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgdmFsID0gb2JqW2tleV07XG4gIH1cblxuICB2YXIgY2hpbGRPYiA9ICFzaGFsbG93ICYmIG9ic2VydmUodmFsKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiByZWFjdGl2ZUdldHRlciAoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsO1xuICAgICAgaWYgKERlcC5TaGFyZWRPYmplY3QudGFyZ2V0KSB7IC8vIGZpeGVkIGJ5IHh4eHh4eFxuICAgICAgICBkZXAuZGVwZW5kKCk7XG4gICAgICAgIGlmIChjaGlsZE9iKSB7XG4gICAgICAgICAgY2hpbGRPYi5kZXAuZGVwZW5kKCk7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBkZXBlbmRBcnJheSh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gcmVhY3RpdmVTZXR0ZXIgKG5ld1ZhbCkge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsdWUgfHwgKG5ld1ZhbCAhPT0gbmV3VmFsICYmIHZhbHVlICE9PSB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY3VzdG9tU2V0dGVyKSB7XG4gICAgICAgIGN1c3RvbVNldHRlcigpO1xuICAgICAgfVxuICAgICAgLy8gIzc5ODE6IGZvciBhY2Nlc3NvciBwcm9wZXJ0aWVzIHdpdGhvdXQgc2V0dGVyXG4gICAgICBpZiAoZ2V0dGVyICYmICFzZXR0ZXIpIHsgcmV0dXJuIH1cbiAgICAgIGlmIChzZXR0ZXIpIHtcbiAgICAgICAgc2V0dGVyLmNhbGwob2JqLCBuZXdWYWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gbmV3VmFsO1xuICAgICAgfVxuICAgICAgY2hpbGRPYiA9ICFzaGFsbG93ICYmIG9ic2VydmUobmV3VmFsKTtcbiAgICAgIGRlcC5ub3RpZnkoKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFNldCBhIHByb3BlcnR5IG9uIGFuIG9iamVjdC4gQWRkcyB0aGUgbmV3IHByb3BlcnR5IGFuZFxuICogdHJpZ2dlcnMgY2hhbmdlIG5vdGlmaWNhdGlvbiBpZiB0aGUgcHJvcGVydHkgZG9lc24ndFxuICogYWxyZWFkeSBleGlzdC5cbiAqL1xuZnVuY3Rpb24gc2V0ICh0YXJnZXQsIGtleSwgdmFsKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgKGlzVW5kZWYodGFyZ2V0KSB8fCBpc1ByaW1pdGl2ZSh0YXJnZXQpKVxuICApIHtcbiAgICB3YXJuKChcIkNhbm5vdCBzZXQgcmVhY3RpdmUgcHJvcGVydHkgb24gdW5kZWZpbmVkLCBudWxsLCBvciBwcmltaXRpdmUgdmFsdWU6IFwiICsgKCh0YXJnZXQpKSkpO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgaXNWYWxpZEFycmF5SW5kZXgoa2V5KSkge1xuICAgIHRhcmdldC5sZW5ndGggPSBNYXRoLm1heCh0YXJnZXQubGVuZ3RoLCBrZXkpO1xuICAgIHRhcmdldC5zcGxpY2Uoa2V5LCAxLCB2YWwpO1xuICAgIHJldHVybiB2YWxcbiAgfVxuICBpZiAoa2V5IGluIHRhcmdldCAmJiAhKGtleSBpbiBPYmplY3QucHJvdG90eXBlKSkge1xuICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgIHJldHVybiB2YWxcbiAgfVxuICB2YXIgb2IgPSAodGFyZ2V0KS5fX29iX187XG4gIGlmICh0YXJnZXQuX2lzVnVlIHx8IChvYiAmJiBvYi52bUNvdW50KSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdBdm9pZCBhZGRpbmcgcmVhY3RpdmUgcHJvcGVydGllcyB0byBhIFZ1ZSBpbnN0YW5jZSBvciBpdHMgcm9vdCAkZGF0YSAnICtcbiAgICAgICdhdCBydW50aW1lIC0gZGVjbGFyZSBpdCB1cGZyb250IGluIHRoZSBkYXRhIG9wdGlvbi4nXG4gICAgKTtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgaWYgKCFvYikge1xuICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgIHJldHVybiB2YWxcbiAgfVxuICBkZWZpbmVSZWFjdGl2ZSQkMShvYi52YWx1ZSwga2V5LCB2YWwpO1xuICBvYi5kZXAubm90aWZ5KCk7XG4gIHJldHVybiB2YWxcbn1cblxuLyoqXG4gKiBEZWxldGUgYSBwcm9wZXJ0eSBhbmQgdHJpZ2dlciBjaGFuZ2UgaWYgbmVjZXNzYXJ5LlxuICovXG5mdW5jdGlvbiBkZWwgKHRhcmdldCwga2V5KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgKGlzVW5kZWYodGFyZ2V0KSB8fCBpc1ByaW1pdGl2ZSh0YXJnZXQpKVxuICApIHtcbiAgICB3YXJuKChcIkNhbm5vdCBkZWxldGUgcmVhY3RpdmUgcHJvcGVydHkgb24gdW5kZWZpbmVkLCBudWxsLCBvciBwcmltaXRpdmUgdmFsdWU6IFwiICsgKCh0YXJnZXQpKSkpO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgaXNWYWxpZEFycmF5SW5kZXgoa2V5KSkge1xuICAgIHRhcmdldC5zcGxpY2Uoa2V5LCAxKTtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgb2IgPSAodGFyZ2V0KS5fX29iX187XG4gIGlmICh0YXJnZXQuX2lzVnVlIHx8IChvYiAmJiBvYi52bUNvdW50KSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdBdm9pZCBkZWxldGluZyBwcm9wZXJ0aWVzIG9uIGEgVnVlIGluc3RhbmNlIG9yIGl0cyByb290ICRkYXRhICcgK1xuICAgICAgJy0ganVzdCBzZXQgaXQgdG8gbnVsbC4nXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoIWhhc093bih0YXJnZXQsIGtleSkpIHtcbiAgICByZXR1cm5cbiAgfVxuICBkZWxldGUgdGFyZ2V0W2tleV07XG4gIGlmICghb2IpIHtcbiAgICByZXR1cm5cbiAgfVxuICBvYi5kZXAubm90aWZ5KCk7XG59XG5cbi8qKlxuICogQ29sbGVjdCBkZXBlbmRlbmNpZXMgb24gYXJyYXkgZWxlbWVudHMgd2hlbiB0aGUgYXJyYXkgaXMgdG91Y2hlZCwgc2luY2VcbiAqIHdlIGNhbm5vdCBpbnRlcmNlcHQgYXJyYXkgZWxlbWVudCBhY2Nlc3MgbGlrZSBwcm9wZXJ0eSBnZXR0ZXJzLlxuICovXG5mdW5jdGlvbiBkZXBlbmRBcnJheSAodmFsdWUpIHtcbiAgZm9yICh2YXIgZSA9ICh2b2lkIDApLCBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGUgPSB2YWx1ZVtpXTtcbiAgICBlICYmIGUuX19vYl9fICYmIGUuX19vYl9fLmRlcC5kZXBlbmQoKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlKSkge1xuICAgICAgZGVwZW5kQXJyYXkoZSk7XG4gICAgfVxuICB9XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIE9wdGlvbiBvdmVyd3JpdGluZyBzdHJhdGVnaWVzIGFyZSBmdW5jdGlvbnMgdGhhdCBoYW5kbGVcbiAqIGhvdyB0byBtZXJnZSBhIHBhcmVudCBvcHRpb24gdmFsdWUgYW5kIGEgY2hpbGQgb3B0aW9uXG4gKiB2YWx1ZSBpbnRvIHRoZSBmaW5hbCB2YWx1ZS5cbiAqL1xudmFyIHN0cmF0cyA9IGNvbmZpZy5vcHRpb25NZXJnZVN0cmF0ZWdpZXM7XG5cbi8qKlxuICogT3B0aW9ucyB3aXRoIHJlc3RyaWN0aW9uc1xuICovXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBzdHJhdHMuZWwgPSBzdHJhdHMucHJvcHNEYXRhID0gZnVuY3Rpb24gKHBhcmVudCwgY2hpbGQsIHZtLCBrZXkpIHtcbiAgICBpZiAoIXZtKSB7XG4gICAgICB3YXJuKFxuICAgICAgICBcIm9wdGlvbiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgY2FuIG9ubHkgYmUgdXNlZCBkdXJpbmcgaW5zdGFuY2UgXCIgK1xuICAgICAgICAnY3JlYXRpb24gd2l0aCB0aGUgYG5ld2Aga2V5d29yZC4nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFN0cmF0KHBhcmVudCwgY2hpbGQpXG4gIH07XG59XG5cbi8qKlxuICogSGVscGVyIHRoYXQgcmVjdXJzaXZlbHkgbWVyZ2VzIHR3byBkYXRhIG9iamVjdHMgdG9nZXRoZXIuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlRGF0YSAodG8sIGZyb20pIHtcbiAgaWYgKCFmcm9tKSB7IHJldHVybiB0byB9XG4gIHZhciBrZXksIHRvVmFsLCBmcm9tVmFsO1xuXG4gIHZhciBrZXlzID0gaGFzU3ltYm9sXG4gICAgPyBSZWZsZWN0Lm93bktleXMoZnJvbSlcbiAgICA6IE9iamVjdC5rZXlzKGZyb20pO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgLy8gaW4gY2FzZSB0aGUgb2JqZWN0IGlzIGFscmVhZHkgb2JzZXJ2ZWQuLi5cbiAgICBpZiAoa2V5ID09PSAnX19vYl9fJykgeyBjb250aW51ZSB9XG4gICAgdG9WYWwgPSB0b1trZXldO1xuICAgIGZyb21WYWwgPSBmcm9tW2tleV07XG4gICAgaWYgKCFoYXNPd24odG8sIGtleSkpIHtcbiAgICAgIHNldCh0bywga2V5LCBmcm9tVmFsKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdG9WYWwgIT09IGZyb21WYWwgJiZcbiAgICAgIGlzUGxhaW5PYmplY3QodG9WYWwpICYmXG4gICAgICBpc1BsYWluT2JqZWN0KGZyb21WYWwpXG4gICAgKSB7XG4gICAgICBtZXJnZURhdGEodG9WYWwsIGZyb21WYWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdG9cbn1cblxuLyoqXG4gKiBEYXRhXG4gKi9cbmZ1bmN0aW9uIG1lcmdlRGF0YU9yRm4gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bVxuKSB7XG4gIGlmICghdm0pIHtcbiAgICAvLyBpbiBhIFZ1ZS5leHRlbmQgbWVyZ2UsIGJvdGggc2hvdWxkIGJlIGZ1bmN0aW9uc1xuICAgIGlmICghY2hpbGRWYWwpIHtcbiAgICAgIHJldHVybiBwYXJlbnRWYWxcbiAgICB9XG4gICAgaWYgKCFwYXJlbnRWYWwpIHtcbiAgICAgIHJldHVybiBjaGlsZFZhbFxuICAgIH1cbiAgICAvLyB3aGVuIHBhcmVudFZhbCAmIGNoaWxkVmFsIGFyZSBib3RoIHByZXNlbnQsXG4gICAgLy8gd2UgbmVlZCB0byByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlXG4gICAgLy8gbWVyZ2VkIHJlc3VsdCBvZiBib3RoIGZ1bmN0aW9ucy4uLiBubyBuZWVkIHRvXG4gICAgLy8gY2hlY2sgaWYgcGFyZW50VmFsIGlzIGEgZnVuY3Rpb24gaGVyZSBiZWNhdXNlXG4gICAgLy8gaXQgaGFzIHRvIGJlIGEgZnVuY3Rpb24gdG8gcGFzcyBwcmV2aW91cyBtZXJnZXMuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZERhdGFGbiAoKSB7XG4gICAgICByZXR1cm4gbWVyZ2VEYXRhKFxuICAgICAgICB0eXBlb2YgY2hpbGRWYWwgPT09ICdmdW5jdGlvbicgPyBjaGlsZFZhbC5jYWxsKHRoaXMsIHRoaXMpIDogY2hpbGRWYWwsXG4gICAgICAgIHR5cGVvZiBwYXJlbnRWYWwgPT09ICdmdW5jdGlvbicgPyBwYXJlbnRWYWwuY2FsbCh0aGlzLCB0aGlzKSA6IHBhcmVudFZhbFxuICAgICAgKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkSW5zdGFuY2VEYXRhRm4gKCkge1xuICAgICAgLy8gaW5zdGFuY2UgbWVyZ2VcbiAgICAgIHZhciBpbnN0YW5jZURhdGEgPSB0eXBlb2YgY2hpbGRWYWwgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBjaGlsZFZhbC5jYWxsKHZtLCB2bSlcbiAgICAgICAgOiBjaGlsZFZhbDtcbiAgICAgIHZhciBkZWZhdWx0RGF0YSA9IHR5cGVvZiBwYXJlbnRWYWwgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBwYXJlbnRWYWwuY2FsbCh2bSwgdm0pXG4gICAgICAgIDogcGFyZW50VmFsO1xuICAgICAgaWYgKGluc3RhbmNlRGF0YSkge1xuICAgICAgICByZXR1cm4gbWVyZ2VEYXRhKGluc3RhbmNlRGF0YSwgZGVmYXVsdERhdGEpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVmYXVsdERhdGFcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuc3RyYXRzLmRhdGEgPSBmdW5jdGlvbiAoXG4gIHBhcmVudFZhbCxcbiAgY2hpbGRWYWwsXG4gIHZtXG4pIHtcbiAgaWYgKCF2bSkge1xuICAgIGlmIChjaGlsZFZhbCAmJiB0eXBlb2YgY2hpbGRWYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ1RoZSBcImRhdGFcIiBvcHRpb24gc2hvdWxkIGJlIGEgZnVuY3Rpb24gJyArXG4gICAgICAgICd0aGF0IHJldHVybnMgYSBwZXItaW5zdGFuY2UgdmFsdWUgaW4gY29tcG9uZW50ICcgK1xuICAgICAgICAnZGVmaW5pdGlvbnMuJyxcbiAgICAgICAgdm1cbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBwYXJlbnRWYWxcbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlRGF0YU9yRm4ocGFyZW50VmFsLCBjaGlsZFZhbClcbiAgfVxuXG4gIHJldHVybiBtZXJnZURhdGFPckZuKHBhcmVudFZhbCwgY2hpbGRWYWwsIHZtKVxufTtcblxuLyoqXG4gKiBIb29rcyBhbmQgcHJvcHMgYXJlIG1lcmdlZCBhcyBhcnJheXMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlSG9vayAoXG4gIHBhcmVudFZhbCxcbiAgY2hpbGRWYWxcbikge1xuICB2YXIgcmVzID0gY2hpbGRWYWxcbiAgICA/IHBhcmVudFZhbFxuICAgICAgPyBwYXJlbnRWYWwuY29uY2F0KGNoaWxkVmFsKVxuICAgICAgOiBBcnJheS5pc0FycmF5KGNoaWxkVmFsKVxuICAgICAgICA/IGNoaWxkVmFsXG4gICAgICAgIDogW2NoaWxkVmFsXVxuICAgIDogcGFyZW50VmFsO1xuICByZXR1cm4gcmVzXG4gICAgPyBkZWR1cGVIb29rcyhyZXMpXG4gICAgOiByZXNcbn1cblxuZnVuY3Rpb24gZGVkdXBlSG9va3MgKGhvb2tzKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChyZXMuaW5kZXhPZihob29rc1tpXSkgPT09IC0xKSB7XG4gICAgICByZXMucHVzaChob29rc1tpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuTElGRUNZQ0xFX0hPT0tTLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcbiAgc3RyYXRzW2hvb2tdID0gbWVyZ2VIb29rO1xufSk7XG5cbi8qKlxuICogQXNzZXRzXG4gKlxuICogV2hlbiBhIHZtIGlzIHByZXNlbnQgKGluc3RhbmNlIGNyZWF0aW9uKSwgd2UgbmVlZCB0byBkb1xuICogYSB0aHJlZS13YXkgbWVyZ2UgYmV0d2VlbiBjb25zdHJ1Y3RvciBvcHRpb25zLCBpbnN0YW5jZVxuICogb3B0aW9ucyBhbmQgcGFyZW50IG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXNzZXRzIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm0sXG4gIGtleVxuKSB7XG4gIHZhciByZXMgPSBPYmplY3QuY3JlYXRlKHBhcmVudFZhbCB8fCBudWxsKTtcbiAgaWYgKGNoaWxkVmFsKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBhc3NlcnRPYmplY3RUeXBlKGtleSwgY2hpbGRWYWwsIHZtKTtcbiAgICByZXR1cm4gZXh0ZW5kKHJlcywgY2hpbGRWYWwpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlc1xuICB9XG59XG5cbkFTU0VUX1RZUEVTLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgc3RyYXRzW3R5cGUgKyAncyddID0gbWVyZ2VBc3NldHM7XG59KTtcblxuLyoqXG4gKiBXYXRjaGVycy5cbiAqXG4gKiBXYXRjaGVycyBoYXNoZXMgc2hvdWxkIG5vdCBvdmVyd3JpdGUgb25lXG4gKiBhbm90aGVyLCBzbyB3ZSBtZXJnZSB0aGVtIGFzIGFycmF5cy5cbiAqL1xuc3RyYXRzLndhdGNoID0gZnVuY3Rpb24gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bSxcbiAga2V5XG4pIHtcbiAgLy8gd29yayBhcm91bmQgRmlyZWZveCdzIE9iamVjdC5wcm90b3R5cGUud2F0Y2guLi5cbiAgaWYgKHBhcmVudFZhbCA9PT0gbmF0aXZlV2F0Y2gpIHsgcGFyZW50VmFsID0gdW5kZWZpbmVkOyB9XG4gIGlmIChjaGlsZFZhbCA9PT0gbmF0aXZlV2F0Y2gpIHsgY2hpbGRWYWwgPSB1bmRlZmluZWQ7IH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICghY2hpbGRWYWwpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRPYmplY3RUeXBlKGtleSwgY2hpbGRWYWwsIHZtKTtcbiAgfVxuICBpZiAoIXBhcmVudFZhbCkgeyByZXR1cm4gY2hpbGRWYWwgfVxuICB2YXIgcmV0ID0ge307XG4gIGV4dGVuZChyZXQsIHBhcmVudFZhbCk7XG4gIGZvciAodmFyIGtleSQxIGluIGNoaWxkVmFsKSB7XG4gICAgdmFyIHBhcmVudCA9IHJldFtrZXkkMV07XG4gICAgdmFyIGNoaWxkID0gY2hpbGRWYWxba2V5JDFdO1xuICAgIGlmIChwYXJlbnQgJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkge1xuICAgICAgcGFyZW50ID0gW3BhcmVudF07XG4gICAgfVxuICAgIHJldFtrZXkkMV0gPSBwYXJlbnRcbiAgICAgID8gcGFyZW50LmNvbmNhdChjaGlsZClcbiAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZCkgPyBjaGlsZCA6IFtjaGlsZF07XG4gIH1cbiAgcmV0dXJuIHJldFxufTtcblxuLyoqXG4gKiBPdGhlciBvYmplY3QgaGFzaGVzLlxuICovXG5zdHJhdHMucHJvcHMgPVxuc3RyYXRzLm1ldGhvZHMgPVxuc3RyYXRzLmluamVjdCA9XG5zdHJhdHMuY29tcHV0ZWQgPSBmdW5jdGlvbiAoXG4gIHBhcmVudFZhbCxcbiAgY2hpbGRWYWwsXG4gIHZtLFxuICBrZXlcbikge1xuICBpZiAoY2hpbGRWYWwgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydE9iamVjdFR5cGUoa2V5LCBjaGlsZFZhbCwgdm0pO1xuICB9XG4gIGlmICghcGFyZW50VmFsKSB7IHJldHVybiBjaGlsZFZhbCB9XG4gIHZhciByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICBpZiAoY2hpbGRWYWwpIHsgZXh0ZW5kKHJldCwgY2hpbGRWYWwpOyB9XG4gIHJldHVybiByZXRcbn07XG5zdHJhdHMucHJvdmlkZSA9IG1lcmdlRGF0YU9yRm47XG5cbi8qKlxuICogRGVmYXVsdCBzdHJhdGVneS5cbiAqL1xudmFyIGRlZmF1bHRTdHJhdCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gIHJldHVybiBjaGlsZFZhbCA9PT0gdW5kZWZpbmVkXG4gICAgPyBwYXJlbnRWYWxcbiAgICA6IGNoaWxkVmFsXG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIGNvbXBvbmVudCBuYW1lc1xuICovXG5mdW5jdGlvbiBjaGVja0NvbXBvbmVudHMgKG9wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMuY29tcG9uZW50cykge1xuICAgIHZhbGlkYXRlQ29tcG9uZW50TmFtZShrZXkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29tcG9uZW50TmFtZSAobmFtZSkge1xuICBpZiAoIW5ldyBSZWdFeHAoKFwiXlthLXpBLVpdW1xcXFwtXFxcXC4wLTlfXCIgKyAodW5pY29kZVJlZ0V4cC5zb3VyY2UpICsgXCJdKiRcIikpLnRlc3QobmFtZSkpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ludmFsaWQgY29tcG9uZW50IG5hbWU6IFwiJyArIG5hbWUgKyAnXCIuIENvbXBvbmVudCBuYW1lcyAnICtcbiAgICAgICdzaG91bGQgY29uZm9ybSB0byB2YWxpZCBjdXN0b20gZWxlbWVudCBuYW1lIGluIGh0bWw1IHNwZWNpZmljYXRpb24uJ1xuICAgICk7XG4gIH1cbiAgaWYgKGlzQnVpbHRJblRhZyhuYW1lKSB8fCBjb25maWcuaXNSZXNlcnZlZFRhZyhuYW1lKSkge1xuICAgIHdhcm4oXG4gICAgICAnRG8gbm90IHVzZSBidWlsdC1pbiBvciByZXNlcnZlZCBIVE1MIGVsZW1lbnRzIGFzIGNvbXBvbmVudCAnICtcbiAgICAgICdpZDogJyArIG5hbWVcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogRW5zdXJlIGFsbCBwcm9wcyBvcHRpb24gc3ludGF4IGFyZSBub3JtYWxpemVkIGludG8gdGhlXG4gKiBPYmplY3QtYmFzZWQgZm9ybWF0LlxuICovXG5mdW5jdGlvbiBub3JtYWxpemVQcm9wcyAob3B0aW9ucywgdm0pIHtcbiAgdmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcbiAgaWYgKCFwcm9wcykgeyByZXR1cm4gfVxuICB2YXIgcmVzID0ge307XG4gIHZhciBpLCB2YWwsIG5hbWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzKSkge1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFsID0gcHJvcHNbaV07XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmFtZSA9IGNhbWVsaXplKHZhbCk7XG4gICAgICAgIHJlc1tuYW1lXSA9IHsgdHlwZTogbnVsbCB9O1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHdhcm4oJ3Byb3BzIG11c3QgYmUgc3RyaW5ncyB3aGVuIHVzaW5nIGFycmF5IHN5bnRheC4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChwcm9wcykpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIHZhbCA9IHByb3BzW2tleV07XG4gICAgICBuYW1lID0gY2FtZWxpemUoa2V5KTtcbiAgICAgIHJlc1tuYW1lXSA9IGlzUGxhaW5PYmplY3QodmFsKVxuICAgICAgICA/IHZhbFxuICAgICAgICA6IHsgdHlwZTogdmFsIH07XG4gICAgfVxuICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB3YXJuKFxuICAgICAgXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcInByb3BzXFxcIjogZXhwZWN0ZWQgYW4gQXJyYXkgb3IgYW4gT2JqZWN0LCBcIiArXG4gICAgICBcImJ1dCBnb3QgXCIgKyAodG9SYXdUeXBlKHByb3BzKSkgKyBcIi5cIixcbiAgICAgIHZtXG4gICAgKTtcbiAgfVxuICBvcHRpb25zLnByb3BzID0gcmVzO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhbGwgaW5qZWN0aW9ucyBpbnRvIE9iamVjdC1iYXNlZCBmb3JtYXRcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplSW5qZWN0IChvcHRpb25zLCB2bSkge1xuICB2YXIgaW5qZWN0ID0gb3B0aW9ucy5pbmplY3Q7XG4gIGlmICghaW5qZWN0KSB7IHJldHVybiB9XG4gIHZhciBub3JtYWxpemVkID0gb3B0aW9ucy5pbmplY3QgPSB7fTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoaW5qZWN0KSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5qZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBub3JtYWxpemVkW2luamVjdFtpXV0gPSB7IGZyb206IGluamVjdFtpXSB9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGluamVjdCkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gaW5qZWN0KSB7XG4gICAgICB2YXIgdmFsID0gaW5qZWN0W2tleV07XG4gICAgICBub3JtYWxpemVkW2tleV0gPSBpc1BsYWluT2JqZWN0KHZhbClcbiAgICAgICAgPyBleHRlbmQoeyBmcm9tOiBrZXkgfSwgdmFsKVxuICAgICAgICA6IHsgZnJvbTogdmFsIH07XG4gICAgfVxuICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB3YXJuKFxuICAgICAgXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcImluamVjdFxcXCI6IGV4cGVjdGVkIGFuIEFycmF5IG9yIGFuIE9iamVjdCwgXCIgK1xuICAgICAgXCJidXQgZ290IFwiICsgKHRvUmF3VHlwZShpbmplY3QpKSArIFwiLlwiLFxuICAgICAgdm1cbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogTm9ybWFsaXplIHJhdyBmdW5jdGlvbiBkaXJlY3RpdmVzIGludG8gb2JqZWN0IGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyAob3B0aW9ucykge1xuICB2YXIgZGlycyA9IG9wdGlvbnMuZGlyZWN0aXZlcztcbiAgaWYgKGRpcnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGlycykge1xuICAgICAgdmFyIGRlZiQkMSA9IGRpcnNba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgZGVmJCQxID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRpcnNba2V5XSA9IHsgYmluZDogZGVmJCQxLCB1cGRhdGU6IGRlZiQkMSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRPYmplY3RUeXBlIChuYW1lLCB2YWx1ZSwgdm0pIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHdhcm4oXG4gICAgICBcIkludmFsaWQgdmFsdWUgZm9yIG9wdGlvbiBcXFwiXCIgKyBuYW1lICsgXCJcXFwiOiBleHBlY3RlZCBhbiBPYmplY3QsIFwiICtcbiAgICAgIFwiYnV0IGdvdCBcIiArICh0b1Jhd1R5cGUodmFsdWUpKSArIFwiLlwiLFxuICAgICAgdm1cbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogTWVyZ2UgdHdvIG9wdGlvbiBvYmplY3RzIGludG8gYSBuZXcgb25lLlxuICogQ29yZSB1dGlsaXR5IHVzZWQgaW4gYm90aCBpbnN0YW50aWF0aW9uIGFuZCBpbmhlcml0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VPcHRpb25zIChcbiAgcGFyZW50LFxuICBjaGlsZCxcbiAgdm1cbikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNoZWNrQ29tcG9uZW50cyhjaGlsZCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGNoaWxkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2hpbGQgPSBjaGlsZC5vcHRpb25zO1xuICB9XG5cbiAgbm9ybWFsaXplUHJvcHMoY2hpbGQsIHZtKTtcbiAgbm9ybWFsaXplSW5qZWN0KGNoaWxkLCB2bSk7XG4gIG5vcm1hbGl6ZURpcmVjdGl2ZXMoY2hpbGQpO1xuXG4gIC8vIEFwcGx5IGV4dGVuZHMgYW5kIG1peGlucyBvbiB0aGUgY2hpbGQgb3B0aW9ucyxcbiAgLy8gYnV0IG9ubHkgaWYgaXQgaXMgYSByYXcgb3B0aW9ucyBvYmplY3QgdGhhdCBpc24ndFxuICAvLyB0aGUgcmVzdWx0IG9mIGFub3RoZXIgbWVyZ2VPcHRpb25zIGNhbGwuXG4gIC8vIE9ubHkgbWVyZ2VkIG9wdGlvbnMgaGFzIHRoZSBfYmFzZSBwcm9wZXJ0eS5cbiAgaWYgKCFjaGlsZC5fYmFzZSkge1xuICAgIGlmIChjaGlsZC5leHRlbmRzKSB7XG4gICAgICBwYXJlbnQgPSBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZC5leHRlbmRzLCB2bSk7XG4gICAgfVxuICAgIGlmIChjaGlsZC5taXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGQubWl4aW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBwYXJlbnQgPSBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZC5taXhpbnNbaV0sIHZtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IHt9O1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBwYXJlbnQpIHtcbiAgICBtZXJnZUZpZWxkKGtleSk7XG4gIH1cbiAgZm9yIChrZXkgaW4gY2hpbGQpIHtcbiAgICBpZiAoIWhhc093bihwYXJlbnQsIGtleSkpIHtcbiAgICAgIG1lcmdlRmllbGQoa2V5KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWVyZ2VGaWVsZCAoa2V5KSB7XG4gICAgdmFyIHN0cmF0ID0gc3RyYXRzW2tleV0gfHwgZGVmYXVsdFN0cmF0O1xuICAgIG9wdGlvbnNba2V5XSA9IHN0cmF0KHBhcmVudFtrZXldLCBjaGlsZFtrZXldLCB2bSwga2V5KTtcbiAgfVxuICByZXR1cm4gb3B0aW9uc1xufVxuXG4vKipcbiAqIFJlc29sdmUgYW4gYXNzZXQuXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgYmVjYXVzZSBjaGlsZCBpbnN0YW5jZXMgbmVlZCBhY2Nlc3NcbiAqIHRvIGFzc2V0cyBkZWZpbmVkIGluIGl0cyBhbmNlc3RvciBjaGFpbi5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUFzc2V0IChcbiAgb3B0aW9ucyxcbiAgdHlwZSxcbiAgaWQsXG4gIHdhcm5NaXNzaW5nXG4pIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIGFzc2V0cyA9IG9wdGlvbnNbdHlwZV07XG4gIC8vIGNoZWNrIGxvY2FsIHJlZ2lzdHJhdGlvbiB2YXJpYXRpb25zIGZpcnN0XG4gIGlmIChoYXNPd24oYXNzZXRzLCBpZCkpIHsgcmV0dXJuIGFzc2V0c1tpZF0gfVxuICB2YXIgY2FtZWxpemVkSWQgPSBjYW1lbGl6ZShpZCk7XG4gIGlmIChoYXNPd24oYXNzZXRzLCBjYW1lbGl6ZWRJZCkpIHsgcmV0dXJuIGFzc2V0c1tjYW1lbGl6ZWRJZF0gfVxuICB2YXIgUGFzY2FsQ2FzZUlkID0gY2FwaXRhbGl6ZShjYW1lbGl6ZWRJZCk7XG4gIGlmIChoYXNPd24oYXNzZXRzLCBQYXNjYWxDYXNlSWQpKSB7IHJldHVybiBhc3NldHNbUGFzY2FsQ2FzZUlkXSB9XG4gIC8vIGZhbGxiYWNrIHRvIHByb3RvdHlwZSBjaGFpblxuICB2YXIgcmVzID0gYXNzZXRzW2lkXSB8fCBhc3NldHNbY2FtZWxpemVkSWRdIHx8IGFzc2V0c1tQYXNjYWxDYXNlSWRdO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuTWlzc2luZyAmJiAhcmVzKSB7XG4gICAgd2FybihcbiAgICAgICdGYWlsZWQgdG8gcmVzb2x2ZSAnICsgdHlwZS5zbGljZSgwLCAtMSkgKyAnOiAnICsgaWQsXG4gICAgICBvcHRpb25zXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG5cblxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wIChcbiAga2V5LFxuICBwcm9wT3B0aW9ucyxcbiAgcHJvcHNEYXRhLFxuICB2bVxuKSB7XG4gIHZhciBwcm9wID0gcHJvcE9wdGlvbnNba2V5XTtcbiAgdmFyIGFic2VudCA9ICFoYXNPd24ocHJvcHNEYXRhLCBrZXkpO1xuICB2YXIgdmFsdWUgPSBwcm9wc0RhdGFba2V5XTtcbiAgLy8gYm9vbGVhbiBjYXN0aW5nXG4gIHZhciBib29sZWFuSW5kZXggPSBnZXRUeXBlSW5kZXgoQm9vbGVhbiwgcHJvcC50eXBlKTtcbiAgaWYgKGJvb2xlYW5JbmRleCA+IC0xKSB7XG4gICAgaWYgKGFic2VudCAmJiAhaGFzT3duKHByb3AsICdkZWZhdWx0JykpIHtcbiAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IGh5cGhlbmF0ZShrZXkpKSB7XG4gICAgICAvLyBvbmx5IGNhc3QgZW1wdHkgc3RyaW5nIC8gc2FtZSBuYW1lIHRvIGJvb2xlYW4gaWZcbiAgICAgIC8vIGJvb2xlYW4gaGFzIGhpZ2hlciBwcmlvcml0eVxuICAgICAgdmFyIHN0cmluZ0luZGV4ID0gZ2V0VHlwZUluZGV4KFN0cmluZywgcHJvcC50eXBlKTtcbiAgICAgIGlmIChzdHJpbmdJbmRleCA8IDAgfHwgYm9vbGVhbkluZGV4IDwgc3RyaW5nSW5kZXgpIHtcbiAgICAgICAgdmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBjaGVjayBkZWZhdWx0IHZhbHVlXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsdWUgPSBnZXRQcm9wRGVmYXVsdFZhbHVlKHZtLCBwcm9wLCBrZXkpO1xuICAgIC8vIHNpbmNlIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGEgZnJlc2ggY29weSxcbiAgICAvLyBtYWtlIHN1cmUgdG8gb2JzZXJ2ZSBpdC5cbiAgICB2YXIgcHJldlNob3VsZE9ic2VydmUgPSBzaG91bGRPYnNlcnZlO1xuICAgIHRvZ2dsZU9ic2VydmluZyh0cnVlKTtcbiAgICBvYnNlcnZlKHZhbHVlKTtcbiAgICB0b2dnbGVPYnNlcnZpbmcocHJldlNob3VsZE9ic2VydmUpO1xuICB9XG4gIGlmIChcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgLy8gc2tpcCB2YWxpZGF0aW9uIGZvciB3ZWV4IHJlY3ljbGUtbGlzdCBjaGlsZCBjb21wb25lbnQgcHJvcHNcbiAgICAhKGZhbHNlKVxuICApIHtcbiAgICBhc3NlcnRQcm9wKHByb3AsIGtleSwgdmFsdWUsIHZtLCBhYnNlbnQpO1xuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG4vKipcbiAqIEdldCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhIHByb3AuXG4gKi9cbmZ1bmN0aW9uIGdldFByb3BEZWZhdWx0VmFsdWUgKHZtLCBwcm9wLCBrZXkpIHtcbiAgLy8gbm8gZGVmYXVsdCwgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG4gIHZhciBkZWYgPSBwcm9wLmRlZmF1bHQ7XG4gIC8vIHdhcm4gYWdhaW5zdCBub24tZmFjdG9yeSBkZWZhdWx0cyBmb3IgT2JqZWN0ICYgQXJyYXlcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaXNPYmplY3QoZGVmKSkge1xuICAgIHdhcm4oXG4gICAgICAnSW52YWxpZCBkZWZhdWx0IHZhbHVlIGZvciBwcm9wIFwiJyArIGtleSArICdcIjogJyArXG4gICAgICAnUHJvcHMgd2l0aCB0eXBlIE9iamVjdC9BcnJheSBtdXN0IHVzZSBhIGZhY3RvcnkgZnVuY3Rpb24gJyArXG4gICAgICAndG8gcmV0dXJuIHRoZSBkZWZhdWx0IHZhbHVlLicsXG4gICAgICB2bVxuICAgICk7XG4gIH1cbiAgLy8gdGhlIHJhdyBwcm9wIHZhbHVlIHdhcyBhbHNvIHVuZGVmaW5lZCBmcm9tIHByZXZpb3VzIHJlbmRlcixcbiAgLy8gcmV0dXJuIHByZXZpb3VzIGRlZmF1bHQgdmFsdWUgdG8gYXZvaWQgdW5uZWNlc3Nhcnkgd2F0Y2hlciB0cmlnZ2VyXG4gIGlmICh2bSAmJiB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgJiZcbiAgICB2bS4kb3B0aW9ucy5wcm9wc0RhdGFba2V5XSA9PT0gdW5kZWZpbmVkICYmXG4gICAgdm0uX3Byb3BzW2tleV0gIT09IHVuZGVmaW5lZFxuICApIHtcbiAgICByZXR1cm4gdm0uX3Byb3BzW2tleV1cbiAgfVxuICAvLyBjYWxsIGZhY3RvcnkgZnVuY3Rpb24gZm9yIG5vbi1GdW5jdGlvbiB0eXBlc1xuICAvLyBhIHZhbHVlIGlzIEZ1bmN0aW9uIGlmIGl0cyBwcm90b3R5cGUgaXMgZnVuY3Rpb24gZXZlbiBhY3Jvc3MgZGlmZmVyZW50IGV4ZWN1dGlvbiBjb250ZXh0XG4gIHJldHVybiB0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nICYmIGdldFR5cGUocHJvcC50eXBlKSAhPT0gJ0Z1bmN0aW9uJ1xuICAgID8gZGVmLmNhbGwodm0pXG4gICAgOiBkZWZcbn1cblxuLyoqXG4gKiBBc3NlcnQgd2hldGhlciBhIHByb3AgaXMgdmFsaWQuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydFByb3AgKFxuICBwcm9wLFxuICBuYW1lLFxuICB2YWx1ZSxcbiAgdm0sXG4gIGFic2VudFxuKSB7XG4gIGlmIChwcm9wLnJlcXVpcmVkICYmIGFic2VudCkge1xuICAgIHdhcm4oXG4gICAgICAnTWlzc2luZyByZXF1aXJlZCBwcm9wOiBcIicgKyBuYW1lICsgJ1wiJyxcbiAgICAgIHZtXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCAmJiAhcHJvcC5yZXF1aXJlZCkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciB0eXBlID0gcHJvcC50eXBlO1xuICB2YXIgdmFsaWQgPSAhdHlwZSB8fCB0eXBlID09PSB0cnVlO1xuICB2YXIgZXhwZWN0ZWRUeXBlcyA9IFtdO1xuICBpZiAodHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgdHlwZSA9IFt0eXBlXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aCAmJiAhdmFsaWQ7IGkrKykge1xuICAgICAgdmFyIGFzc2VydGVkVHlwZSA9IGFzc2VydFR5cGUodmFsdWUsIHR5cGVbaV0pO1xuICAgICAgZXhwZWN0ZWRUeXBlcy5wdXNoKGFzc2VydGVkVHlwZS5leHBlY3RlZFR5cGUgfHwgJycpO1xuICAgICAgdmFsaWQgPSBhc3NlcnRlZFR5cGUudmFsaWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKCF2YWxpZCkge1xuICAgIHdhcm4oXG4gICAgICBnZXRJbnZhbGlkVHlwZU1lc3NhZ2UobmFtZSwgdmFsdWUsIGV4cGVjdGVkVHlwZXMpLFxuICAgICAgdm1cbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIHZhciB2YWxpZGF0b3IgPSBwcm9wLnZhbGlkYXRvcjtcbiAgaWYgKHZhbGlkYXRvcikge1xuICAgIGlmICghdmFsaWRhdG9yKHZhbHVlKSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0ludmFsaWQgcHJvcDogY3VzdG9tIHZhbGlkYXRvciBjaGVjayBmYWlsZWQgZm9yIHByb3AgXCInICsgbmFtZSArICdcIi4nLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHNpbXBsZUNoZWNrUkUgPSAvXihTdHJpbmd8TnVtYmVyfEJvb2xlYW58RnVuY3Rpb258U3ltYm9sKSQvO1xuXG5mdW5jdGlvbiBhc3NlcnRUeXBlICh2YWx1ZSwgdHlwZSkge1xuICB2YXIgdmFsaWQ7XG4gIHZhciBleHBlY3RlZFR5cGUgPSBnZXRUeXBlKHR5cGUpO1xuICBpZiAoc2ltcGxlQ2hlY2tSRS50ZXN0KGV4cGVjdGVkVHlwZSkpIHtcbiAgICB2YXIgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICB2YWxpZCA9IHQgPT09IGV4cGVjdGVkVHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIGZvciBwcmltaXRpdmUgd3JhcHBlciBvYmplY3RzXG4gICAgaWYgKCF2YWxpZCAmJiB0ID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gICAgfVxuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ09iamVjdCcpIHtcbiAgICB2YWxpZCA9IGlzUGxhaW5PYmplY3QodmFsdWUpO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ0FycmF5Jykge1xuICAgIHZhbGlkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB2YWxpZDogdmFsaWQsXG4gICAgZXhwZWN0ZWRUeXBlOiBleHBlY3RlZFR5cGVcbiAgfVxufVxuXG4vKipcbiAqIFVzZSBmdW5jdGlvbiBzdHJpbmcgbmFtZSB0byBjaGVjayBidWlsdC1pbiB0eXBlcyxcbiAqIGJlY2F1c2UgYSBzaW1wbGUgZXF1YWxpdHkgY2hlY2sgd2lsbCBmYWlsIHdoZW4gcnVubmluZ1xuICogYWNyb3NzIGRpZmZlcmVudCB2bXMgLyBpZnJhbWVzLlxuICovXG5mdW5jdGlvbiBnZXRUeXBlIChmbikge1xuICB2YXIgbWF0Y2ggPSBmbiAmJiBmbi50b1N0cmluZygpLm1hdGNoKC9eXFxzKmZ1bmN0aW9uIChcXHcrKS8pO1xuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnXG59XG5cbmZ1bmN0aW9uIGlzU2FtZVR5cGUgKGEsIGIpIHtcbiAgcmV0dXJuIGdldFR5cGUoYSkgPT09IGdldFR5cGUoYilcbn1cblxuZnVuY3Rpb24gZ2V0VHlwZUluZGV4ICh0eXBlLCBleHBlY3RlZFR5cGVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFR5cGVzKSkge1xuICAgIHJldHVybiBpc1NhbWVUeXBlKGV4cGVjdGVkVHlwZXMsIHR5cGUpID8gMCA6IC0xXG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV4cGVjdGVkVHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoaXNTYW1lVHlwZShleHBlY3RlZFR5cGVzW2ldLCB0eXBlKSkge1xuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xXG59XG5cbmZ1bmN0aW9uIGdldEludmFsaWRUeXBlTWVzc2FnZSAobmFtZSwgdmFsdWUsIGV4cGVjdGVkVHlwZXMpIHtcbiAgdmFyIG1lc3NhZ2UgPSBcIkludmFsaWQgcHJvcDogdHlwZSBjaGVjayBmYWlsZWQgZm9yIHByb3AgXFxcIlwiICsgbmFtZSArIFwiXFxcIi5cIiArXG4gICAgXCIgRXhwZWN0ZWQgXCIgKyAoZXhwZWN0ZWRUeXBlcy5tYXAoY2FwaXRhbGl6ZSkuam9pbignLCAnKSk7XG4gIHZhciBleHBlY3RlZFR5cGUgPSBleHBlY3RlZFR5cGVzWzBdO1xuICB2YXIgcmVjZWl2ZWRUeXBlID0gdG9SYXdUeXBlKHZhbHVlKTtcbiAgdmFyIGV4cGVjdGVkVmFsdWUgPSBzdHlsZVZhbHVlKHZhbHVlLCBleHBlY3RlZFR5cGUpO1xuICB2YXIgcmVjZWl2ZWRWYWx1ZSA9IHN0eWxlVmFsdWUodmFsdWUsIHJlY2VpdmVkVHlwZSk7XG4gIC8vIGNoZWNrIGlmIHdlIG5lZWQgdG8gc3BlY2lmeSBleHBlY3RlZCB2YWx1ZVxuICBpZiAoZXhwZWN0ZWRUeXBlcy5sZW5ndGggPT09IDEgJiZcbiAgICAgIGlzRXhwbGljYWJsZShleHBlY3RlZFR5cGUpICYmXG4gICAgICAhaXNCb29sZWFuKGV4cGVjdGVkVHlwZSwgcmVjZWl2ZWRUeXBlKSkge1xuICAgIG1lc3NhZ2UgKz0gXCIgd2l0aCB2YWx1ZSBcIiArIGV4cGVjdGVkVmFsdWU7XG4gIH1cbiAgbWVzc2FnZSArPSBcIiwgZ290IFwiICsgcmVjZWl2ZWRUeXBlICsgXCIgXCI7XG4gIC8vIGNoZWNrIGlmIHdlIG5lZWQgdG8gc3BlY2lmeSByZWNlaXZlZCB2YWx1ZVxuICBpZiAoaXNFeHBsaWNhYmxlKHJlY2VpdmVkVHlwZSkpIHtcbiAgICBtZXNzYWdlICs9IFwid2l0aCB2YWx1ZSBcIiArIHJlY2VpdmVkVmFsdWUgKyBcIi5cIjtcbiAgfVxuICByZXR1cm4gbWVzc2FnZVxufVxuXG5mdW5jdGlvbiBzdHlsZVZhbHVlICh2YWx1ZSwgdHlwZSkge1xuICBpZiAodHlwZSA9PT0gJ1N0cmluZycpIHtcbiAgICByZXR1cm4gKFwiXFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIilcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnTnVtYmVyJykge1xuICAgIHJldHVybiAoXCJcIiArIChOdW1iZXIodmFsdWUpKSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFwiXCIgKyB2YWx1ZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0V4cGxpY2FibGUgKHZhbHVlKSB7XG4gIHZhciBleHBsaWNpdFR5cGVzID0gWydzdHJpbmcnLCAnbnVtYmVyJywgJ2Jvb2xlYW4nXTtcbiAgcmV0dXJuIGV4cGxpY2l0VHlwZXMuc29tZShmdW5jdGlvbiAoZWxlbSkgeyByZXR1cm4gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gZWxlbTsgfSlcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuICgpIHtcbiAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICByZXR1cm4gYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtKSB7IHJldHVybiBlbGVtLnRvTG93ZXJDYXNlKCkgPT09ICdib29sZWFuJzsgfSlcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yIChlcnIsIHZtLCBpbmZvKSB7XG4gIC8vIERlYWN0aXZhdGUgZGVwcyB0cmFja2luZyB3aGlsZSBwcm9jZXNzaW5nIGVycm9yIGhhbmRsZXIgdG8gYXZvaWQgcG9zc2libGUgaW5maW5pdGUgcmVuZGVyaW5nLlxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWV4L2lzc3Vlcy8xNTA1XG4gIHB1c2hUYXJnZXQoKTtcbiAgdHJ5IHtcbiAgICBpZiAodm0pIHtcbiAgICAgIHZhciBjdXIgPSB2bTtcbiAgICAgIHdoaWxlICgoY3VyID0gY3VyLiRwYXJlbnQpKSB7XG4gICAgICAgIHZhciBob29rcyA9IGN1ci4kb3B0aW9ucy5lcnJvckNhcHR1cmVkO1xuICAgICAgICBpZiAoaG9va3MpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YXIgY2FwdHVyZSA9IGhvb2tzW2ldLmNhbGwoY3VyLCBlcnIsIHZtLCBpbmZvKSA9PT0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChjYXB0dXJlKSB7IHJldHVybiB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGdsb2JhbEhhbmRsZUVycm9yKGUsIGN1ciwgJ2Vycm9yQ2FwdHVyZWQgaG9vaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnbG9iYWxIYW5kbGVFcnJvcihlcnIsIHZtLCBpbmZvKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBwb3BUYXJnZXQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZva2VXaXRoRXJyb3JIYW5kbGluZyAoXG4gIGhhbmRsZXIsXG4gIGNvbnRleHQsXG4gIGFyZ3MsXG4gIHZtLFxuICBpbmZvXG4pIHtcbiAgdmFyIHJlcztcbiAgdHJ5IHtcbiAgICByZXMgPSBhcmdzID8gaGFuZGxlci5hcHBseShjb250ZXh0LCBhcmdzKSA6IGhhbmRsZXIuY2FsbChjb250ZXh0KTtcbiAgICBpZiAocmVzICYmICFyZXMuX2lzVnVlICYmIGlzUHJvbWlzZShyZXMpICYmICFyZXMuX2hhbmRsZWQpIHtcbiAgICAgIHJlcy5jYXRjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZSwgdm0sIGluZm8gKyBcIiAoUHJvbWlzZS9hc3luYylcIik7IH0pO1xuICAgICAgLy8gaXNzdWUgIzk1MTFcbiAgICAgIC8vIGF2b2lkIGNhdGNoIHRyaWdnZXJpbmcgbXVsdGlwbGUgdGltZXMgd2hlbiBuZXN0ZWQgY2FsbHNcbiAgICAgIHJlcy5faGFuZGxlZCA9IHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaGFuZGxlRXJyb3IoZSwgdm0sIGluZm8pO1xuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2xvYmFsSGFuZGxlRXJyb3IgKGVyciwgdm0sIGluZm8pIHtcbiAgaWYgKGNvbmZpZy5lcnJvckhhbmRsZXIpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGNvbmZpZy5lcnJvckhhbmRsZXIuY2FsbChudWxsLCBlcnIsIHZtLCBpbmZvKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGlmIHRoZSB1c2VyIGludGVudGlvbmFsbHkgdGhyb3dzIHRoZSBvcmlnaW5hbCBlcnJvciBpbiB0aGUgaGFuZGxlcixcbiAgICAgIC8vIGRvIG5vdCBsb2cgaXQgdHdpY2VcbiAgICAgIGlmIChlICE9PSBlcnIpIHtcbiAgICAgICAgbG9nRXJyb3IoZSwgbnVsbCwgJ2NvbmZpZy5lcnJvckhhbmRsZXInKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbG9nRXJyb3IoZXJyLCB2bSwgaW5mbyk7XG59XG5cbmZ1bmN0aW9uIGxvZ0Vycm9yIChlcnIsIHZtLCBpbmZvKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgd2FybigoXCJFcnJvciBpbiBcIiArIGluZm8gKyBcIjogXFxcIlwiICsgKGVyci50b1N0cmluZygpKSArIFwiXFxcIlwiKSwgdm0pO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICgoaW5Ccm93c2VyIHx8IGluV2VleCkgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IGVyclxuICB9XG59XG5cbi8qICAqL1xuXG52YXIgY2FsbGJhY2tzID0gW107XG52YXIgcGVuZGluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBmbHVzaENhbGxiYWNrcyAoKSB7XG4gIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGNvcGllcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29waWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29waWVzW2ldKCk7XG4gIH1cbn1cblxuLy8gSGVyZSB3ZSBoYXZlIGFzeW5jIGRlZmVycmluZyB3cmFwcGVycyB1c2luZyBtaWNyb3Rhc2tzLlxuLy8gSW4gMi41IHdlIHVzZWQgKG1hY3JvKSB0YXNrcyAoaW4gY29tYmluYXRpb24gd2l0aCBtaWNyb3Rhc2tzKS5cbi8vIEhvd2V2ZXIsIGl0IGhhcyBzdWJ0bGUgcHJvYmxlbXMgd2hlbiBzdGF0ZSBpcyBjaGFuZ2VkIHJpZ2h0IGJlZm9yZSByZXBhaW50XG4vLyAoZS5nLiAjNjgxMywgb3V0LWluIHRyYW5zaXRpb25zKS5cbi8vIEFsc28sIHVzaW5nIChtYWNybykgdGFza3MgaW4gZXZlbnQgaGFuZGxlciB3b3VsZCBjYXVzZSBzb21lIHdlaXJkIGJlaGF2aW9yc1xuLy8gdGhhdCBjYW5ub3QgYmUgY2lyY3VtdmVudGVkIChlLmcuICM3MTA5LCAjNzE1MywgIzc1NDYsICM3ODM0LCAjODEwOSkuXG4vLyBTbyB3ZSBub3cgdXNlIG1pY3JvdGFza3MgZXZlcnl3aGVyZSwgYWdhaW4uXG4vLyBBIG1ham9yIGRyYXdiYWNrIG9mIHRoaXMgdHJhZGVvZmYgaXMgdGhhdCB0aGVyZSBhcmUgc29tZSBzY2VuYXJpb3Ncbi8vIHdoZXJlIG1pY3JvdGFza3MgaGF2ZSB0b28gaGlnaCBhIHByaW9yaXR5IGFuZCBmaXJlIGluIGJldHdlZW4gc3VwcG9zZWRseVxuLy8gc2VxdWVudGlhbCBldmVudHMgKGUuZy4gIzQ1MjEsICM2NjkwLCB3aGljaCBoYXZlIHdvcmthcm91bmRzKVxuLy8gb3IgZXZlbiBiZXR3ZWVuIGJ1YmJsaW5nIG9mIHRoZSBzYW1lIGV2ZW50ICgjNjU2NikuXG52YXIgdGltZXJGdW5jO1xuXG4vLyBUaGUgbmV4dFRpY2sgYmVoYXZpb3IgbGV2ZXJhZ2VzIHRoZSBtaWNyb3Rhc2sgcXVldWUsIHdoaWNoIGNhbiBiZSBhY2Nlc3NlZFxuLy8gdmlhIGVpdGhlciBuYXRpdmUgUHJvbWlzZS50aGVuIG9yIE11dGF0aW9uT2JzZXJ2ZXIuXG4vLyBNdXRhdGlvbk9ic2VydmVyIGhhcyB3aWRlciBzdXBwb3J0LCBob3dldmVyIGl0IGlzIHNlcmlvdXNseSBidWdnZWQgaW5cbi8vIFVJV2ViVmlldyBpbiBpT1MgPj0gOS4zLjMgd2hlbiB0cmlnZ2VyZWQgaW4gdG91Y2ggZXZlbnQgaGFuZGxlcnMuIEl0XG4vLyBjb21wbGV0ZWx5IHN0b3BzIHdvcmtpbmcgYWZ0ZXIgdHJpZ2dlcmluZyBhIGZldyB0aW1lcy4uLiBzbywgaWYgbmF0aXZlXG4vLyBQcm9taXNlIGlzIGF2YWlsYWJsZSwgd2Ugd2lsbCB1c2UgaXQ6XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCwgJGZsb3ctZGlzYWJsZS1saW5lICovXG5pZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKFByb21pc2UpKSB7XG4gIHZhciBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBwLnRoZW4oZmx1c2hDYWxsYmFja3MpO1xuICAgIC8vIEluIHByb2JsZW1hdGljIFVJV2ViVmlld3MsIFByb21pc2UudGhlbiBkb2Vzbid0IGNvbXBsZXRlbHkgYnJlYWssIGJ1dFxuICAgIC8vIGl0IGNhbiBnZXQgc3R1Y2sgaW4gYSB3ZWlyZCBzdGF0ZSB3aGVyZSBjYWxsYmFja3MgYXJlIHB1c2hlZCBpbnRvIHRoZVxuICAgIC8vIG1pY3JvdGFzayBxdWV1ZSBidXQgdGhlIHF1ZXVlIGlzbid0IGJlaW5nIGZsdXNoZWQsIHVudGlsIHRoZSBicm93c2VyXG4gICAgLy8gbmVlZHMgdG8gZG8gc29tZSBvdGhlciB3b3JrLCBlLmcuIGhhbmRsZSBhIHRpbWVyLiBUaGVyZWZvcmUgd2UgY2FuXG4gICAgLy8gXCJmb3JjZVwiIHRoZSBtaWNyb3Rhc2sgcXVldWUgdG8gYmUgZmx1c2hlZCBieSBhZGRpbmcgYW4gZW1wdHkgdGltZXIuXG4gICAgaWYgKGlzSU9TKSB7IHNldFRpbWVvdXQobm9vcCk7IH1cbiAgfTtcbn0gZWxzZSBpZiAoIWlzSUUgJiYgdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnICYmIChcbiAgaXNOYXRpdmUoTXV0YXRpb25PYnNlcnZlcikgfHxcbiAgLy8gUGhhbnRvbUpTIGFuZCBpT1MgNy54XG4gIE11dGF0aW9uT2JzZXJ2ZXIudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgTXV0YXRpb25PYnNlcnZlckNvbnN0cnVjdG9yXSdcbikpIHtcbiAgLy8gVXNlIE11dGF0aW9uT2JzZXJ2ZXIgd2hlcmUgbmF0aXZlIFByb21pc2UgaXMgbm90IGF2YWlsYWJsZSxcbiAgLy8gZS5nLiBQaGFudG9tSlMsIGlPUzcsIEFuZHJvaWQgNC40XG4gIC8vICgjNjQ2NiBNdXRhdGlvbk9ic2VydmVyIGlzIHVucmVsaWFibGUgaW4gSUUxMSlcbiAgdmFyIGNvdW50ZXIgPSAxO1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmbHVzaENhbGxiYWNrcyk7XG4gIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhjb3VudGVyKSk7XG4gIG9ic2VydmVyLm9ic2VydmUodGV4dE5vZGUsIHtcbiAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gIH0pO1xuICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgY291bnRlciA9IChjb3VudGVyICsgMSkgJSAyO1xuICAgIHRleHROb2RlLmRhdGEgPSBTdHJpbmcoY291bnRlcik7XG4gIH07XG59IGVsc2UgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKHNldEltbWVkaWF0ZSkpIHtcbiAgLy8gRmFsbGJhY2sgdG8gc2V0SW1tZWRpYXRlLlxuICAvLyBUZWNobmljYWxseSBpdCBsZXZlcmFnZXMgdGhlIChtYWNybykgdGFzayBxdWV1ZSxcbiAgLy8gYnV0IGl0IGlzIHN0aWxsIGEgYmV0dGVyIGNob2ljZSB0aGFuIHNldFRpbWVvdXQuXG4gIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZXRJbW1lZGlhdGUoZmx1c2hDYWxsYmFja3MpO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gRmFsbGJhY2sgdG8gc2V0VGltZW91dC5cbiAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoZmx1c2hDYWxsYmFja3MsIDApO1xuICB9O1xufVxuXG5mdW5jdGlvbiBuZXh0VGljayAoY2IsIGN0eCkge1xuICB2YXIgX3Jlc29sdmU7XG4gIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY2IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNiLmNhbGwoY3R4KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoZSwgY3R4LCAnbmV4dFRpY2snKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKF9yZXNvbHZlKSB7XG4gICAgICBfcmVzb2x2ZShjdHgpO1xuICAgIH1cbiAgfSk7XG4gIGlmICghcGVuZGluZykge1xuICAgIHBlbmRpbmcgPSB0cnVlO1xuICAgIHRpbWVyRnVuYygpO1xuICB9XG4gIC8vICRmbG93LWRpc2FibGUtbGluZVxuICBpZiAoIWNiICYmIHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pXG4gIH1cbn1cblxuLyogICovXG5cbi8qIG5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBwbGF5IHdlbGwgd2l0aCBQcm94eSAqL1xuXG52YXIgaW5pdFByb3h5O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgYWxsb3dlZEdsb2JhbHMgPSBtYWtlTWFwKFxuICAgICdJbmZpbml0eSx1bmRlZmluZWQsTmFOLGlzRmluaXRlLGlzTmFOLCcgK1xuICAgICdwYXJzZUZsb2F0LHBhcnNlSW50LGRlY29kZVVSSSxkZWNvZGVVUklDb21wb25lbnQsZW5jb2RlVVJJLGVuY29kZVVSSUNvbXBvbmVudCwnICtcbiAgICAnTWF0aCxOdW1iZXIsRGF0ZSxBcnJheSxPYmplY3QsQm9vbGVhbixTdHJpbmcsUmVnRXhwLE1hcCxTZXQsSlNPTixJbnRsLCcgK1xuICAgICdyZXF1aXJlJyAvLyBmb3IgV2VicGFjay9Ccm93c2VyaWZ5XG4gICk7XG5cbiAgdmFyIHdhcm5Ob25QcmVzZW50ID0gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7XG4gICAgd2FybihcbiAgICAgIFwiUHJvcGVydHkgb3IgbWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBub3QgZGVmaW5lZCBvbiB0aGUgaW5zdGFuY2UgYnV0IFwiICtcbiAgICAgICdyZWZlcmVuY2VkIGR1cmluZyByZW5kZXIuIE1ha2Ugc3VyZSB0aGF0IHRoaXMgcHJvcGVydHkgaXMgcmVhY3RpdmUsICcgK1xuICAgICAgJ2VpdGhlciBpbiB0aGUgZGF0YSBvcHRpb24sIG9yIGZvciBjbGFzcy1iYXNlZCBjb21wb25lbnRzLCBieSAnICtcbiAgICAgICdpbml0aWFsaXppbmcgdGhlIHByb3BlcnR5LiAnICtcbiAgICAgICdTZWU6IGh0dHBzOi8vdnVlanMub3JnL3YyL2d1aWRlL3JlYWN0aXZpdHkuaHRtbCNEZWNsYXJpbmctUmVhY3RpdmUtUHJvcGVydGllcy4nLFxuICAgICAgdGFyZ2V0XG4gICAgKTtcbiAgfTtcblxuICB2YXIgd2FyblJlc2VydmVkUHJlZml4ID0gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7XG4gICAgd2FybihcbiAgICAgIFwiUHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiIG11c3QgYmUgYWNjZXNzZWQgd2l0aCBcXFwiJGRhdGEuXCIgKyBrZXkgKyBcIlxcXCIgYmVjYXVzZSBcIiArXG4gICAgICAncHJvcGVydGllcyBzdGFydGluZyB3aXRoIFwiJFwiIG9yIFwiX1wiIGFyZSBub3QgcHJveGllZCBpbiB0aGUgVnVlIGluc3RhbmNlIHRvICcgK1xuICAgICAgJ3ByZXZlbnQgY29uZmxpY3RzIHdpdGggVnVlIGludGVybmFscy4gJyArXG4gICAgICAnU2VlOiBodHRwczovL3Z1ZWpzLm9yZy92Mi9hcGkvI2RhdGEnLFxuICAgICAgdGFyZ2V0XG4gICAgKTtcbiAgfTtcblxuICB2YXIgaGFzUHJveHkgPVxuICAgIHR5cGVvZiBQcm94eSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUHJveHkpO1xuXG4gIGlmIChoYXNQcm94eSkge1xuICAgIHZhciBpc0J1aWx0SW5Nb2RpZmllciA9IG1ha2VNYXAoJ3N0b3AscHJldmVudCxzZWxmLGN0cmwsc2hpZnQsYWx0LG1ldGEsZXhhY3QnKTtcbiAgICBjb25maWcua2V5Q29kZXMgPSBuZXcgUHJveHkoY29uZmlnLmtleUNvZGVzLCB7XG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCAodGFyZ2V0LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChpc0J1aWx0SW5Nb2RpZmllcihrZXkpKSB7XG4gICAgICAgICAgd2FybigoXCJBdm9pZCBvdmVyd3JpdGluZyBidWlsdC1pbiBtb2RpZmllciBpbiBjb25maWcua2V5Q29kZXM6IC5cIiArIGtleSkpO1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIGhhc0hhbmRsZXIgPSB7XG4gICAgaGFzOiBmdW5jdGlvbiBoYXMgKHRhcmdldCwga2V5KSB7XG4gICAgICB2YXIgaGFzID0ga2V5IGluIHRhcmdldDtcbiAgICAgIHZhciBpc0FsbG93ZWQgPSBhbGxvd2VkR2xvYmFscyhrZXkpIHx8XG4gICAgICAgICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkuY2hhckF0KDApID09PSAnXycgJiYgIShrZXkgaW4gdGFyZ2V0LiRkYXRhKSk7XG4gICAgICBpZiAoIWhhcyAmJiAhaXNBbGxvd2VkKSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGFyZ2V0LiRkYXRhKSB7IHdhcm5SZXNlcnZlZFByZWZpeCh0YXJnZXQsIGtleSk7IH1cbiAgICAgICAgZWxzZSB7IHdhcm5Ob25QcmVzZW50KHRhcmdldCwga2V5KTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGhhcyB8fCAhaXNBbGxvd2VkXG4gICAgfVxuICB9O1xuXG4gIHZhciBnZXRIYW5kbGVyID0ge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0ICh0YXJnZXQsIGtleSkge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmICEoa2V5IGluIHRhcmdldCkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQuJGRhdGEpIHsgd2FyblJlc2VydmVkUHJlZml4KHRhcmdldCwga2V5KTsgfVxuICAgICAgICBlbHNlIHsgd2Fybk5vblByZXNlbnQodGFyZ2V0LCBrZXkpOyB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0W2tleV1cbiAgICB9XG4gIH07XG5cbiAgaW5pdFByb3h5ID0gZnVuY3Rpb24gaW5pdFByb3h5ICh2bSkge1xuICAgIGlmIChoYXNQcm94eSkge1xuICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIHByb3h5IGhhbmRsZXIgdG8gdXNlXG4gICAgICB2YXIgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xuICAgICAgdmFyIGhhbmRsZXJzID0gb3B0aW9ucy5yZW5kZXIgJiYgb3B0aW9ucy5yZW5kZXIuX3dpdGhTdHJpcHBlZFxuICAgICAgICA/IGdldEhhbmRsZXJcbiAgICAgICAgOiBoYXNIYW5kbGVyO1xuICAgICAgdm0uX3JlbmRlclByb3h5ID0gbmV3IFByb3h5KHZtLCBoYW5kbGVycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IHZtO1xuICAgIH1cbiAgfTtcbn1cblxuLyogICovXG5cbnZhciBzZWVuT2JqZWN0cyA9IG5ldyBfU2V0KCk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgdHJhdmVyc2UgYW4gb2JqZWN0IHRvIGV2b2tlIGFsbCBjb252ZXJ0ZWRcbiAqIGdldHRlcnMsIHNvIHRoYXQgZXZlcnkgbmVzdGVkIHByb3BlcnR5IGluc2lkZSB0aGUgb2JqZWN0XG4gKiBpcyBjb2xsZWN0ZWQgYXMgYSBcImRlZXBcIiBkZXBlbmRlbmN5LlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZSAodmFsKSB7XG4gIF90cmF2ZXJzZSh2YWwsIHNlZW5PYmplY3RzKTtcbiAgc2Vlbk9iamVjdHMuY2xlYXIoKTtcbn1cblxuZnVuY3Rpb24gX3RyYXZlcnNlICh2YWwsIHNlZW4pIHtcbiAgdmFyIGksIGtleXM7XG4gIHZhciBpc0EgPSBBcnJheS5pc0FycmF5KHZhbCk7XG4gIGlmICgoIWlzQSAmJiAhaXNPYmplY3QodmFsKSkgfHwgT2JqZWN0LmlzRnJvemVuKHZhbCkgfHwgdmFsIGluc3RhbmNlb2YgVk5vZGUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodmFsLl9fb2JfXykge1xuICAgIHZhciBkZXBJZCA9IHZhbC5fX29iX18uZGVwLmlkO1xuICAgIGlmIChzZWVuLmhhcyhkZXBJZCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzZWVuLmFkZChkZXBJZCk7XG4gIH1cbiAgaWYgKGlzQSkge1xuICAgIGkgPSB2YWwubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHsgX3RyYXZlcnNlKHZhbFtpXSwgc2Vlbik7IH1cbiAgfSBlbHNlIHtcbiAgICBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgeyBfdHJhdmVyc2UodmFsW2tleXNbaV1dLCBzZWVuKTsgfVxuICB9XG59XG5cbnZhciBtYXJrO1xudmFyIG1lYXN1cmU7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwZXJmID0gaW5Ccm93c2VyICYmIHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChcbiAgICBwZXJmICYmXG4gICAgcGVyZi5tYXJrICYmXG4gICAgcGVyZi5tZWFzdXJlICYmXG4gICAgcGVyZi5jbGVhck1hcmtzICYmXG4gICAgcGVyZi5jbGVhck1lYXN1cmVzXG4gICkge1xuICAgIG1hcmsgPSBmdW5jdGlvbiAodGFnKSB7IHJldHVybiBwZXJmLm1hcmsodGFnKTsgfTtcbiAgICBtZWFzdXJlID0gZnVuY3Rpb24gKG5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpIHtcbiAgICAgIHBlcmYubWVhc3VyZShuYW1lLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICAgIHBlcmYuY2xlYXJNYXJrcyhzdGFydFRhZyk7XG4gICAgICBwZXJmLmNsZWFyTWFya3MoZW5kVGFnKTtcbiAgICAgIC8vIHBlcmYuY2xlYXJNZWFzdXJlcyhuYW1lKVxuICAgIH07XG4gIH1cbn1cblxuLyogICovXG5cbnZhciBub3JtYWxpemVFdmVudCA9IGNhY2hlZChmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgcGFzc2l2ZSA9IG5hbWUuY2hhckF0KDApID09PSAnJic7XG4gIG5hbWUgPSBwYXNzaXZlID8gbmFtZS5zbGljZSgxKSA6IG5hbWU7XG4gIHZhciBvbmNlJCQxID0gbmFtZS5jaGFyQXQoMCkgPT09ICd+JzsgLy8gUHJlZml4ZWQgbGFzdCwgY2hlY2tlZCBmaXJzdFxuICBuYW1lID0gb25jZSQkMSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICB2YXIgY2FwdHVyZSA9IG5hbWUuY2hhckF0KDApID09PSAnISc7XG4gIG5hbWUgPSBjYXB0dXJlID8gbmFtZS5zbGljZSgxKSA6IG5hbWU7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBvbmNlOiBvbmNlJCQxLFxuICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgcGFzc2l2ZTogcGFzc2l2ZVxuICB9XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlRm5JbnZva2VyIChmbnMsIHZtKSB7XG4gIGZ1bmN0aW9uIGludm9rZXIgKCkge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuICAgIHZhciBmbnMgPSBpbnZva2VyLmZucztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmbnMpKSB7XG4gICAgICB2YXIgY2xvbmVkID0gZm5zLnNsaWNlKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpbnZva2VXaXRoRXJyb3JIYW5kbGluZyhjbG9uZWRbaV0sIG51bGwsIGFyZ3VtZW50cyQxLCB2bSwgXCJ2LW9uIGhhbmRsZXJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJldHVybiBoYW5kbGVyIHJldHVybiB2YWx1ZSBmb3Igc2luZ2xlIGhhbmRsZXJzXG4gICAgICByZXR1cm4gaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoZm5zLCBudWxsLCBhcmd1bWVudHMsIHZtLCBcInYtb24gaGFuZGxlclwiKVxuICAgIH1cbiAgfVxuICBpbnZva2VyLmZucyA9IGZucztcbiAgcmV0dXJuIGludm9rZXJcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGlzdGVuZXJzIChcbiAgb24sXG4gIG9sZE9uLFxuICBhZGQsXG4gIHJlbW92ZSQkMSxcbiAgY3JlYXRlT25jZUhhbmRsZXIsXG4gIHZtXG4pIHtcbiAgdmFyIG5hbWUsIGRlZiQkMSwgY3VyLCBvbGQsIGV2ZW50O1xuICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICBkZWYkJDEgPSBjdXIgPSBvbltuYW1lXTtcbiAgICBvbGQgPSBvbGRPbltuYW1lXTtcbiAgICBldmVudCA9IG5vcm1hbGl6ZUV2ZW50KG5hbWUpO1xuICAgIGlmIChpc1VuZGVmKGN1cikpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJJbnZhbGlkIGhhbmRsZXIgZm9yIGV2ZW50IFxcXCJcIiArIChldmVudC5uYW1lKSArIFwiXFxcIjogZ290IFwiICsgU3RyaW5nKGN1ciksXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoaXNVbmRlZihvbGQpKSB7XG4gICAgICBpZiAoaXNVbmRlZihjdXIuZm5zKSkge1xuICAgICAgICBjdXIgPSBvbltuYW1lXSA9IGNyZWF0ZUZuSW52b2tlcihjdXIsIHZtKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1RydWUoZXZlbnQub25jZSkpIHtcbiAgICAgICAgY3VyID0gb25bbmFtZV0gPSBjcmVhdGVPbmNlSGFuZGxlcihldmVudC5uYW1lLCBjdXIsIGV2ZW50LmNhcHR1cmUpO1xuICAgICAgfVxuICAgICAgYWRkKGV2ZW50Lm5hbWUsIGN1ciwgZXZlbnQuY2FwdHVyZSwgZXZlbnQucGFzc2l2ZSwgZXZlbnQucGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKGN1ciAhPT0gb2xkKSB7XG4gICAgICBvbGQuZm5zID0gY3VyO1xuICAgICAgb25bbmFtZV0gPSBvbGQ7XG4gICAgfVxuICB9XG4gIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgIGlmIChpc1VuZGVmKG9uW25hbWVdKSkge1xuICAgICAgZXZlbnQgPSBub3JtYWxpemVFdmVudChuYW1lKTtcbiAgICAgIHJlbW92ZSQkMShldmVudC5uYW1lLCBvbGRPbltuYW1lXSwgZXZlbnQuY2FwdHVyZSk7XG4gICAgfVxuICB9XG59XG5cbi8qICAqL1xuXG4vKiAgKi9cblxuLy8gZml4ZWQgYnkgeHh4eHh4IChtcCBwcm9wZXJ0aWVzKVxyXG5mdW5jdGlvbiBleHRyYWN0UHJvcGVydGllc0Zyb21WTm9kZURhdGEoZGF0YSwgQ3RvciwgcmVzLCBjb250ZXh0KSB7XHJcbiAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLm1wT3B0aW9ucyAmJiBDdG9yLm9wdGlvbnMubXBPcHRpb25zLnByb3BlcnRpZXM7XHJcbiAgaWYgKGlzVW5kZWYocHJvcE9wdGlvbnMpKSB7XHJcbiAgICByZXR1cm4gcmVzXHJcbiAgfVxuICB2YXIgZXh0ZXJuYWxDbGFzc2VzID0gQ3Rvci5vcHRpb25zLm1wT3B0aW9ucy5leHRlcm5hbENsYXNzZXMgfHwgW107XHJcbiAgdmFyIGF0dHJzID0gZGF0YS5hdHRycztcbiAgdmFyIHByb3BzID0gZGF0YS5wcm9wcztcclxuICBpZiAoaXNEZWYoYXR0cnMpIHx8IGlzRGVmKHByb3BzKSkge1xyXG4gICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XHJcbiAgICAgIHZhciBhbHRLZXkgPSBoeXBoZW5hdGUoa2V5KTtcbiAgICAgIHZhciByZXN1bHQgPSBjaGVja1Byb3AocmVzLCBwcm9wcywga2V5LCBhbHRLZXksIHRydWUpIHx8XG4gICAgICAgICAgY2hlY2tQcm9wKHJlcywgYXR0cnMsIGtleSwgYWx0S2V5LCBmYWxzZSk7XG4gICAgICAvLyBleHRlcm5hbENsYXNzXG4gICAgICBpZiAoXG4gICAgICAgIHJlc3VsdCAmJlxuICAgICAgICByZXNba2V5XSAmJlxuICAgICAgICBleHRlcm5hbENsYXNzZXMuaW5kZXhPZihhbHRLZXkpICE9PSAtMSAmJlxuICAgICAgICBjb250ZXh0W2NhbWVsaXplKHJlc1trZXldKV1cbiAgICAgICkge1xuICAgICAgICAvLyDotYvlgLwgZXh0ZXJuYWxDbGFzcyDnnJ/mraPnmoTlgLwo5qih5p2/6YeMIGV4dGVybmFsQ2xhc3Mg55qE5YC85Y+v6IO95piv5a2X56ym5LiyKVxuICAgICAgICByZXNba2V5XSA9IGNvbnRleHRbY2FtZWxpemUocmVzW2tleV0pXTtcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc1xyXG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RQcm9wc0Zyb21WTm9kZURhdGEgKFxuICBkYXRhLFxuICBDdG9yLFxuICB0YWcsXG4gIGNvbnRleHQvLyBmaXhlZCBieSB4eHh4eHhcbikge1xuICAvLyB3ZSBhcmUgb25seSBleHRyYWN0aW5nIHJhdyB2YWx1ZXMgaGVyZS5cbiAgLy8gdmFsaWRhdGlvbiBhbmQgZGVmYXVsdCB2YWx1ZXMgYXJlIGhhbmRsZWQgaW4gdGhlIGNoaWxkXG4gIC8vIGNvbXBvbmVudCBpdHNlbGYuXG4gIHZhciBwcm9wT3B0aW9ucyA9IEN0b3Iub3B0aW9ucy5wcm9wcztcbiAgaWYgKGlzVW5kZWYocHJvcE9wdGlvbnMpKSB7XG4gICAgLy8gZml4ZWQgYnkgeHh4eHh4XG4gICAgcmV0dXJuIGV4dHJhY3RQcm9wZXJ0aWVzRnJvbVZOb2RlRGF0YShkYXRhLCBDdG9yLCB7fSwgY29udGV4dClcbiAgfVxuICB2YXIgcmVzID0ge307XG4gIHZhciBhdHRycyA9IGRhdGEuYXR0cnM7XG4gIHZhciBwcm9wcyA9IGRhdGEucHJvcHM7XG4gIGlmIChpc0RlZihhdHRycykgfHwgaXNEZWYocHJvcHMpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XG4gICAgICB2YXIgYWx0S2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB2YXIga2V5SW5Mb3dlckNhc2UgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGtleSAhPT0ga2V5SW5Mb3dlckNhc2UgJiZcbiAgICAgICAgICBhdHRycyAmJiBoYXNPd24oYXR0cnMsIGtleUluTG93ZXJDYXNlKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aXAoXG4gICAgICAgICAgICBcIlByb3AgXFxcIlwiICsga2V5SW5Mb3dlckNhc2UgKyBcIlxcXCIgaXMgcGFzc2VkIHRvIGNvbXBvbmVudCBcIiArXG4gICAgICAgICAgICAoZm9ybWF0Q29tcG9uZW50TmFtZSh0YWcgfHwgQ3RvcikpICsgXCIsIGJ1dCB0aGUgZGVjbGFyZWQgcHJvcCBuYW1lIGlzXCIgK1xuICAgICAgICAgICAgXCIgXFxcIlwiICsga2V5ICsgXCJcXFwiLiBcIiArXG4gICAgICAgICAgICBcIk5vdGUgdGhhdCBIVE1MIGF0dHJpYnV0ZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmUgYW5kIGNhbWVsQ2FzZWQgXCIgK1xuICAgICAgICAgICAgXCJwcm9wcyBuZWVkIHRvIHVzZSB0aGVpciBrZWJhYi1jYXNlIGVxdWl2YWxlbnRzIHdoZW4gdXNpbmcgaW4tRE9NIFwiICtcbiAgICAgICAgICAgIFwidGVtcGxhdGVzLiBZb3Ugc2hvdWxkIHByb2JhYmx5IHVzZSBcXFwiXCIgKyBhbHRLZXkgKyBcIlxcXCIgaW5zdGVhZCBvZiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGVja1Byb3AocmVzLCBwcm9wcywga2V5LCBhbHRLZXksIHRydWUpIHx8XG4gICAgICBjaGVja1Byb3AocmVzLCBhdHRycywga2V5LCBhbHRLZXksIGZhbHNlKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4ZWQgYnkgeHh4eHh4XG4gIHJldHVybiBleHRyYWN0UHJvcGVydGllc0Zyb21WTm9kZURhdGEoZGF0YSwgQ3RvciwgcmVzLCBjb250ZXh0KVxufVxuXG5mdW5jdGlvbiBjaGVja1Byb3AgKFxuICByZXMsXG4gIGhhc2gsXG4gIGtleSxcbiAgYWx0S2V5LFxuICBwcmVzZXJ2ZVxuKSB7XG4gIGlmIChpc0RlZihoYXNoKSkge1xuICAgIGlmIChoYXNPd24oaGFzaCwga2V5KSkge1xuICAgICAgcmVzW2tleV0gPSBoYXNoW2tleV07XG4gICAgICBpZiAoIXByZXNlcnZlKSB7XG4gICAgICAgIGRlbGV0ZSBoYXNoW2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAoaGFzT3duKGhhc2gsIGFsdEtleSkpIHtcbiAgICAgIHJlc1trZXldID0gaGFzaFthbHRLZXldO1xuICAgICAgaWYgKCFwcmVzZXJ2ZSkge1xuICAgICAgICBkZWxldGUgaGFzaFthbHRLZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qICAqL1xuXG4vLyBUaGUgdGVtcGxhdGUgY29tcGlsZXIgYXR0ZW1wdHMgdG8gbWluaW1pemUgdGhlIG5lZWQgZm9yIG5vcm1hbGl6YXRpb24gYnlcbi8vIHN0YXRpY2FsbHkgYW5hbHl6aW5nIHRoZSB0ZW1wbGF0ZSBhdCBjb21waWxlIHRpbWUuXG4vL1xuLy8gRm9yIHBsYWluIEhUTUwgbWFya3VwLCBub3JtYWxpemF0aW9uIGNhbiBiZSBjb21wbGV0ZWx5IHNraXBwZWQgYmVjYXVzZSB0aGVcbi8vIGdlbmVyYXRlZCByZW5kZXIgZnVuY3Rpb24gaXMgZ3VhcmFudGVlZCB0byByZXR1cm4gQXJyYXk8Vk5vZGU+LiBUaGVyZSBhcmVcbi8vIHR3byBjYXNlcyB3aGVyZSBleHRyYSBub3JtYWxpemF0aW9uIGlzIG5lZWRlZDpcblxuLy8gMS4gV2hlbiB0aGUgY2hpbGRyZW4gY29udGFpbnMgY29tcG9uZW50cyAtIGJlY2F1c2UgYSBmdW5jdGlvbmFsIGNvbXBvbmVudFxuLy8gbWF5IHJldHVybiBhbiBBcnJheSBpbnN0ZWFkIG9mIGEgc2luZ2xlIHJvb3QuIEluIHRoaXMgY2FzZSwganVzdCBhIHNpbXBsZVxuLy8gbm9ybWFsaXphdGlvbiBpcyBuZWVkZWQgLSBpZiBhbnkgY2hpbGQgaXMgYW4gQXJyYXksIHdlIGZsYXR0ZW4gdGhlIHdob2xlXG4vLyB0aGluZyB3aXRoIEFycmF5LnByb3RvdHlwZS5jb25jYXQuIEl0IGlzIGd1YXJhbnRlZWQgdG8gYmUgb25seSAxLWxldmVsIGRlZXBcbi8vIGJlY2F1c2UgZnVuY3Rpb25hbCBjb21wb25lbnRzIGFscmVhZHkgbm9ybWFsaXplIHRoZWlyIG93biBjaGlsZHJlbi5cbmZ1bmN0aW9uIHNpbXBsZU5vcm1hbGl6ZUNoaWxkcmVuIChjaGlsZHJlbikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW5baV0pKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgY2hpbGRyZW4pXG4gICAgfVxuICB9XG4gIHJldHVybiBjaGlsZHJlblxufVxuXG4vLyAyLiBXaGVuIHRoZSBjaGlsZHJlbiBjb250YWlucyBjb25zdHJ1Y3RzIHRoYXQgYWx3YXlzIGdlbmVyYXRlZCBuZXN0ZWQgQXJyYXlzLFxuLy8gZS5nLiA8dGVtcGxhdGU+LCA8c2xvdD4sIHYtZm9yLCBvciB3aGVuIHRoZSBjaGlsZHJlbiBpcyBwcm92aWRlZCBieSB1c2VyXG4vLyB3aXRoIGhhbmQtd3JpdHRlbiByZW5kZXIgZnVuY3Rpb25zIC8gSlNYLiBJbiBzdWNoIGNhc2VzIGEgZnVsbCBub3JtYWxpemF0aW9uXG4vLyBpcyBuZWVkZWQgdG8gY2F0ZXIgdG8gYWxsIHBvc3NpYmxlIHR5cGVzIG9mIGNoaWxkcmVuIHZhbHVlcy5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNoaWxkcmVuIChjaGlsZHJlbikge1xuICByZXR1cm4gaXNQcmltaXRpdmUoY2hpbGRyZW4pXG4gICAgPyBbY3JlYXRlVGV4dFZOb2RlKGNoaWxkcmVuKV1cbiAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pXG4gICAgICA/IG5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4oY2hpbGRyZW4pXG4gICAgICA6IHVuZGVmaW5lZFxufVxuXG5mdW5jdGlvbiBpc1RleHROb2RlIChub2RlKSB7XG4gIHJldHVybiBpc0RlZihub2RlKSAmJiBpc0RlZihub2RlLnRleHQpICYmIGlzRmFsc2Uobm9kZS5pc0NvbW1lbnQpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4gKGNoaWxkcmVuLCBuZXN0ZWRJbmRleCkge1xuICB2YXIgcmVzID0gW107XG4gIHZhciBpLCBjLCBsYXN0SW5kZXgsIGxhc3Q7XG4gIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBjaGlsZHJlbltpXTtcbiAgICBpZiAoaXNVbmRlZihjKSB8fCB0eXBlb2YgYyA9PT0gJ2Jvb2xlYW4nKSB7IGNvbnRpbnVlIH1cbiAgICBsYXN0SW5kZXggPSByZXMubGVuZ3RoIC0gMTtcbiAgICBsYXN0ID0gcmVzW2xhc3RJbmRleF07XG4gICAgLy8gIG5lc3RlZFxuICAgIGlmIChBcnJheS5pc0FycmF5KGMpKSB7XG4gICAgICBpZiAoYy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGMgPSBub3JtYWxpemVBcnJheUNoaWxkcmVuKGMsICgobmVzdGVkSW5kZXggfHwgJycpICsgXCJfXCIgKyBpKSk7XG4gICAgICAgIC8vIG1lcmdlIGFkamFjZW50IHRleHQgbm9kZXNcbiAgICAgICAgaWYgKGlzVGV4dE5vZGUoY1swXSkgJiYgaXNUZXh0Tm9kZShsYXN0KSkge1xuICAgICAgICAgIHJlc1tsYXN0SW5kZXhdID0gY3JlYXRlVGV4dFZOb2RlKGxhc3QudGV4dCArIChjWzBdKS50ZXh0KTtcbiAgICAgICAgICBjLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnB1c2guYXBwbHkocmVzLCBjKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzUHJpbWl0aXZlKGMpKSB7XG4gICAgICBpZiAoaXNUZXh0Tm9kZShsYXN0KSkge1xuICAgICAgICAvLyBtZXJnZSBhZGphY2VudCB0ZXh0IG5vZGVzXG4gICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciBTU1IgaHlkcmF0aW9uIGJlY2F1c2UgdGV4dCBub2RlcyBhcmVcbiAgICAgICAgLy8gZXNzZW50aWFsbHkgbWVyZ2VkIHdoZW4gcmVuZGVyZWQgdG8gSFRNTCBzdHJpbmdzXG4gICAgICAgIHJlc1tsYXN0SW5kZXhdID0gY3JlYXRlVGV4dFZOb2RlKGxhc3QudGV4dCArIGMpO1xuICAgICAgfSBlbHNlIGlmIChjICE9PSAnJykge1xuICAgICAgICAvLyBjb252ZXJ0IHByaW1pdGl2ZSB0byB2bm9kZVxuICAgICAgICByZXMucHVzaChjcmVhdGVUZXh0Vk5vZGUoYykpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNUZXh0Tm9kZShjKSAmJiBpc1RleHROb2RlKGxhc3QpKSB7XG4gICAgICAgIC8vIG1lcmdlIGFkamFjZW50IHRleHQgbm9kZXNcbiAgICAgICAgcmVzW2xhc3RJbmRleF0gPSBjcmVhdGVUZXh0Vk5vZGUobGFzdC50ZXh0ICsgYy50ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlZmF1bHQga2V5IGZvciBuZXN0ZWQgYXJyYXkgY2hpbGRyZW4gKGxpa2VseSBnZW5lcmF0ZWQgYnkgdi1mb3IpXG4gICAgICAgIGlmIChpc1RydWUoY2hpbGRyZW4uX2lzVkxpc3QpICYmXG4gICAgICAgICAgaXNEZWYoYy50YWcpICYmXG4gICAgICAgICAgaXNVbmRlZihjLmtleSkgJiZcbiAgICAgICAgICBpc0RlZihuZXN0ZWRJbmRleCkpIHtcbiAgICAgICAgICBjLmtleSA9IFwiX192bGlzdFwiICsgbmVzdGVkSW5kZXggKyBcIl9cIiArIGkgKyBcIl9fXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnB1c2goYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRQcm92aWRlICh2bSkge1xuICB2YXIgcHJvdmlkZSA9IHZtLiRvcHRpb25zLnByb3ZpZGU7XG4gIGlmIChwcm92aWRlKSB7XG4gICAgdm0uX3Byb3ZpZGVkID0gdHlwZW9mIHByb3ZpZGUgPT09ICdmdW5jdGlvbidcbiAgICAgID8gcHJvdmlkZS5jYWxsKHZtKVxuICAgICAgOiBwcm92aWRlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRJbmplY3Rpb25zICh2bSkge1xuICB2YXIgcmVzdWx0ID0gcmVzb2x2ZUluamVjdCh2bS4kb3B0aW9ucy5pbmplY3QsIHZtKTtcbiAgaWYgKHJlc3VsdCkge1xuICAgIHRvZ2dsZU9ic2VydmluZyhmYWxzZSk7XG4gICAgT2JqZWN0LmtleXMocmVzdWx0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZSQkMSh2bSwga2V5LCByZXN1bHRba2V5XSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICBcIkF2b2lkIG11dGF0aW5nIGFuIGluamVjdGVkIHZhbHVlIGRpcmVjdGx5IHNpbmNlIHRoZSBjaGFuZ2VzIHdpbGwgYmUgXCIgK1xuICAgICAgICAgICAgXCJvdmVyd3JpdHRlbiB3aGVuZXZlciB0aGUgcHJvdmlkZWQgY29tcG9uZW50IHJlLXJlbmRlcnMuIFwiICtcbiAgICAgICAgICAgIFwiaW5qZWN0aW9uIGJlaW5nIG11dGF0ZWQ6IFxcXCJcIiArIGtleSArIFwiXFxcIlwiLFxuICAgICAgICAgICAgdm1cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlJCQxKHZtLCBrZXksIHJlc3VsdFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUluamVjdCAoaW5qZWN0LCB2bSkge1xuICBpZiAoaW5qZWN0KSB7XG4gICAgLy8gaW5qZWN0IGlzIDphbnkgYmVjYXVzZSBmbG93IGlzIG5vdCBzbWFydCBlbm91Z2ggdG8gZmlndXJlIG91dCBjYWNoZWRcbiAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIga2V5cyA9IGhhc1N5bWJvbFxuICAgICAgPyBSZWZsZWN0Lm93bktleXMoaW5qZWN0KVxuICAgICAgOiBPYmplY3Qua2V5cyhpbmplY3QpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIC8vICM2NTc0IGluIGNhc2UgdGhlIGluamVjdCBvYmplY3QgaXMgb2JzZXJ2ZWQuLi5cbiAgICAgIGlmIChrZXkgPT09ICdfX29iX18nKSB7IGNvbnRpbnVlIH1cbiAgICAgIHZhciBwcm92aWRlS2V5ID0gaW5qZWN0W2tleV0uZnJvbTtcbiAgICAgIHZhciBzb3VyY2UgPSB2bTtcbiAgICAgIHdoaWxlIChzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZS5fcHJvdmlkZWQgJiYgaGFzT3duKHNvdXJjZS5fcHJvdmlkZWQsIHByb3ZpZGVLZXkpKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBzb3VyY2UuX3Byb3ZpZGVkW3Byb3ZpZGVLZXldO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgc291cmNlID0gc291cmNlLiRwYXJlbnQ7XG4gICAgICB9XG4gICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICBpZiAoJ2RlZmF1bHQnIGluIGluamVjdFtrZXldKSB7XG4gICAgICAgICAgdmFyIHByb3ZpZGVEZWZhdWx0ID0gaW5qZWN0W2tleV0uZGVmYXVsdDtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHR5cGVvZiBwcm92aWRlRGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBwcm92aWRlRGVmYXVsdC5jYWxsKHZtKVxuICAgICAgICAgICAgOiBwcm92aWRlRGVmYXVsdDtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgd2FybigoXCJJbmplY3Rpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiIG5vdCBmb3VuZFwiKSwgdm0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG4vKiAgKi9cblxuXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlc29sdmluZyByYXcgY2hpbGRyZW4gVk5vZGVzIGludG8gYSBzbG90IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVNsb3RzIChcbiAgY2hpbGRyZW4sXG4gIGNvbnRleHRcbikge1xuICBpZiAoIWNoaWxkcmVuIHx8ICFjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICByZXR1cm4ge31cbiAgfVxuICB2YXIgc2xvdHMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICB2YXIgZGF0YSA9IGNoaWxkLmRhdGE7XG4gICAgLy8gcmVtb3ZlIHNsb3QgYXR0cmlidXRlIGlmIHRoZSBub2RlIGlzIHJlc29sdmVkIGFzIGEgVnVlIHNsb3Qgbm9kZVxuICAgIGlmIChkYXRhICYmIGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy5zbG90KSB7XG4gICAgICBkZWxldGUgZGF0YS5hdHRycy5zbG90O1xuICAgIH1cbiAgICAvLyBuYW1lZCBzbG90cyBzaG91bGQgb25seSBiZSByZXNwZWN0ZWQgaWYgdGhlIHZub2RlIHdhcyByZW5kZXJlZCBpbiB0aGVcbiAgICAvLyBzYW1lIGNvbnRleHQuXG4gICAgaWYgKChjaGlsZC5jb250ZXh0ID09PSBjb250ZXh0IHx8IGNoaWxkLmZuQ29udGV4dCA9PT0gY29udGV4dCkgJiZcbiAgICAgIGRhdGEgJiYgZGF0YS5zbG90ICE9IG51bGxcbiAgICApIHtcbiAgICAgIHZhciBuYW1lID0gZGF0YS5zbG90O1xuICAgICAgdmFyIHNsb3QgPSAoc2xvdHNbbmFtZV0gfHwgKHNsb3RzW25hbWVdID0gW10pKTtcbiAgICAgIGlmIChjaGlsZC50YWcgPT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgc2xvdC5wdXNoLmFwcGx5KHNsb3QsIGNoaWxkLmNoaWxkcmVuIHx8IFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsb3QucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZpeGVkIGJ5IHh4eHh4eCDkuLTml7YgaGFjayDmjokgdW5pLWFwcCDkuK3nmoTlvILmraUgbmFtZSBzbG90IHBhZ2VcbiAgICAgIGlmKGNoaWxkLmFzeW5jTWV0YSAmJiBjaGlsZC5hc3luY01ldGEuZGF0YSAmJiBjaGlsZC5hc3luY01ldGEuZGF0YS5zbG90ID09PSAncGFnZScpe1xuICAgICAgICAoc2xvdHNbJ3BhZ2UnXSB8fCAoc2xvdHNbJ3BhZ2UnXSA9IFtdKSkucHVzaChjaGlsZCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgKHNsb3RzLmRlZmF1bHQgfHwgKHNsb3RzLmRlZmF1bHQgPSBbXSkpLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBpZ25vcmUgc2xvdHMgdGhhdCBjb250YWlucyBvbmx5IHdoaXRlc3BhY2VcbiAgZm9yICh2YXIgbmFtZSQxIGluIHNsb3RzKSB7XG4gICAgaWYgKHNsb3RzW25hbWUkMV0uZXZlcnkoaXNXaGl0ZXNwYWNlKSkge1xuICAgICAgZGVsZXRlIHNsb3RzW25hbWUkMV07XG4gICAgfVxuICB9XG4gIHJldHVybiBzbG90c1xufVxuXG5mdW5jdGlvbiBpc1doaXRlc3BhY2UgKG5vZGUpIHtcbiAgcmV0dXJuIChub2RlLmlzQ29tbWVudCAmJiAhbm9kZS5hc3luY0ZhY3RvcnkpIHx8IG5vZGUudGV4dCA9PT0gJyAnXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBub3JtYWxpemVTY29wZWRTbG90cyAoXG4gIHNsb3RzLFxuICBub3JtYWxTbG90cyxcbiAgcHJldlNsb3RzXG4pIHtcbiAgdmFyIHJlcztcbiAgdmFyIGhhc05vcm1hbFNsb3RzID0gT2JqZWN0LmtleXMobm9ybWFsU2xvdHMpLmxlbmd0aCA+IDA7XG4gIHZhciBpc1N0YWJsZSA9IHNsb3RzID8gISFzbG90cy4kc3RhYmxlIDogIWhhc05vcm1hbFNsb3RzO1xuICB2YXIga2V5ID0gc2xvdHMgJiYgc2xvdHMuJGtleTtcbiAgaWYgKCFzbG90cykge1xuICAgIHJlcyA9IHt9O1xuICB9IGVsc2UgaWYgKHNsb3RzLl9ub3JtYWxpemVkKSB7XG4gICAgLy8gZmFzdCBwYXRoIDE6IGNoaWxkIGNvbXBvbmVudCByZS1yZW5kZXIgb25seSwgcGFyZW50IGRpZCBub3QgY2hhbmdlXG4gICAgcmV0dXJuIHNsb3RzLl9ub3JtYWxpemVkXG4gIH0gZWxzZSBpZiAoXG4gICAgaXNTdGFibGUgJiZcbiAgICBwcmV2U2xvdHMgJiZcbiAgICBwcmV2U2xvdHMgIT09IGVtcHR5T2JqZWN0ICYmXG4gICAga2V5ID09PSBwcmV2U2xvdHMuJGtleSAmJlxuICAgICFoYXNOb3JtYWxTbG90cyAmJlxuICAgICFwcmV2U2xvdHMuJGhhc05vcm1hbFxuICApIHtcbiAgICAvLyBmYXN0IHBhdGggMjogc3RhYmxlIHNjb3BlZCBzbG90cyB3LyBubyBub3JtYWwgc2xvdHMgdG8gcHJveHksXG4gICAgLy8gb25seSBuZWVkIHRvIG5vcm1hbGl6ZSBvbmNlXG4gICAgcmV0dXJuIHByZXZTbG90c1xuICB9IGVsc2Uge1xuICAgIHJlcyA9IHt9O1xuICAgIGZvciAodmFyIGtleSQxIGluIHNsb3RzKSB7XG4gICAgICBpZiAoc2xvdHNba2V5JDFdICYmIGtleSQxWzBdICE9PSAnJCcpIHtcbiAgICAgICAgcmVzW2tleSQxXSA9IG5vcm1hbGl6ZVNjb3BlZFNsb3Qobm9ybWFsU2xvdHMsIGtleSQxLCBzbG90c1trZXkkMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBleHBvc2Ugbm9ybWFsIHNsb3RzIG9uIHNjb3BlZFNsb3RzXG4gIGZvciAodmFyIGtleSQyIGluIG5vcm1hbFNsb3RzKSB7XG4gICAgaWYgKCEoa2V5JDIgaW4gcmVzKSkge1xuICAgICAgcmVzW2tleSQyXSA9IHByb3h5Tm9ybWFsU2xvdChub3JtYWxTbG90cywga2V5JDIpO1xuICAgIH1cbiAgfVxuICAvLyBhdm9yaWF6IHNlZW1zIHRvIG1vY2sgYSBub24tZXh0ZW5zaWJsZSAkc2NvcGVkU2xvdHMgb2JqZWN0XG4gIC8vIGFuZCB3aGVuIHRoYXQgaXMgcGFzc2VkIGRvd24gdGhpcyB3b3VsZCBjYXVzZSBhbiBlcnJvclxuICBpZiAoc2xvdHMgJiYgT2JqZWN0LmlzRXh0ZW5zaWJsZShzbG90cykpIHtcbiAgICAoc2xvdHMpLl9ub3JtYWxpemVkID0gcmVzO1xuICB9XG4gIGRlZihyZXMsICckc3RhYmxlJywgaXNTdGFibGUpO1xuICBkZWYocmVzLCAnJGtleScsIGtleSk7XG4gIGRlZihyZXMsICckaGFzTm9ybWFsJywgaGFzTm9ybWFsU2xvdHMpO1xuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNjb3BlZFNsb3Qobm9ybWFsU2xvdHMsIGtleSwgZm4pIHtcbiAgdmFyIG5vcm1hbGl6ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlcyA9IGFyZ3VtZW50cy5sZW5ndGggPyBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpIDogZm4oe30pO1xuICAgIHJlcyA9IHJlcyAmJiB0eXBlb2YgcmVzID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShyZXMpXG4gICAgICA/IFtyZXNdIC8vIHNpbmdsZSB2bm9kZVxuICAgICAgOiBub3JtYWxpemVDaGlsZHJlbihyZXMpO1xuICAgIHJldHVybiByZXMgJiYgKFxuICAgICAgcmVzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgKHJlcy5sZW5ndGggPT09IDEgJiYgcmVzWzBdLmlzQ29tbWVudCkgLy8gIzk2NThcbiAgICApID8gdW5kZWZpbmVkXG4gICAgICA6IHJlc1xuICB9O1xuICAvLyB0aGlzIGlzIGEgc2xvdCB1c2luZyB0aGUgbmV3IHYtc2xvdCBzeW50YXggd2l0aG91dCBzY29wZS4gYWx0aG91Z2ggaXQgaXNcbiAgLy8gY29tcGlsZWQgYXMgYSBzY29wZWQgc2xvdCwgcmVuZGVyIGZuIHVzZXJzIHdvdWxkIGV4cGVjdCBpdCB0byBiZSBwcmVzZW50XG4gIC8vIG9uIHRoaXMuJHNsb3RzIGJlY2F1c2UgdGhlIHVzYWdlIGlzIHNlbWFudGljYWxseSBhIG5vcm1hbCBzbG90LlxuICBpZiAoZm4ucHJveHkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobm9ybWFsU2xvdHMsIGtleSwge1xuICAgICAgZ2V0OiBub3JtYWxpemVkLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBub3JtYWxpemVkXG59XG5cbmZ1bmN0aW9uIHByb3h5Tm9ybWFsU2xvdChzbG90cywga2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBzbG90c1trZXldOyB9XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgdi1mb3IgbGlzdHMuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckxpc3QgKFxuICB2YWwsXG4gIHJlbmRlclxuKSB7XG4gIHZhciByZXQsIGksIGwsIGtleXMsIGtleTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSB8fCB0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHJldCA9IG5ldyBBcnJheSh2YWwubGVuZ3RoKTtcbiAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgcmV0W2ldID0gcmVuZGVyKHZhbFtpXSwgaSwgaSwgaSk7IC8vIGZpeGVkIGJ5IHh4eHh4eFxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHJldCA9IG5ldyBBcnJheSh2YWwpO1xuICAgIGZvciAoaSA9IDA7IGkgPCB2YWw7IGkrKykge1xuICAgICAgcmV0W2ldID0gcmVuZGVyKGkgKyAxLCBpLCBpLCBpKTsgLy8gZml4ZWQgYnkgeHh4eHh4XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICBpZiAoaGFzU3ltYm9sICYmIHZhbFtTeW1ib2wuaXRlcmF0b3JdKSB7XG4gICAgICByZXQgPSBbXTtcbiAgICAgIHZhciBpdGVyYXRvciA9IHZhbFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgICB2YXIgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgd2hpbGUgKCFyZXN1bHQuZG9uZSkge1xuICAgICAgICByZXQucHVzaChyZW5kZXIocmVzdWx0LnZhbHVlLCByZXQubGVuZ3RoLCBpKyssIGkpKTsgLy8gZml4ZWQgYnkgeHh4eHh4XG4gICAgICAgIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgICByZXQgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgpO1xuICAgICAgZm9yIChpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIHJldFtpXSA9IHJlbmRlcih2YWxba2V5XSwga2V5LCBpLCBpKTsgLy8gZml4ZWQgYnkgeHh4eHh4XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICghaXNEZWYocmV0KSkge1xuICAgIHJldCA9IFtdO1xuICB9XG4gIChyZXQpLl9pc1ZMaXN0ID0gdHJ1ZTtcbiAgcmV0dXJuIHJldFxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVuZGVyaW5nIDxzbG90PlxuICovXG5mdW5jdGlvbiByZW5kZXJTbG90IChcbiAgbmFtZSxcbiAgZmFsbGJhY2ssXG4gIHByb3BzLFxuICBiaW5kT2JqZWN0XG4pIHtcbiAgdmFyIHNjb3BlZFNsb3RGbiA9IHRoaXMuJHNjb3BlZFNsb3RzW25hbWVdO1xuICB2YXIgbm9kZXM7XG4gIGlmIChzY29wZWRTbG90Rm4pIHsgLy8gc2NvcGVkIHNsb3RcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIGlmIChiaW5kT2JqZWN0KSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhaXNPYmplY3QoYmluZE9iamVjdCkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnc2xvdCB2LWJpbmQgd2l0aG91dCBhcmd1bWVudCBleHBlY3RzIGFuIE9iamVjdCcsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcHJvcHMgPSBleHRlbmQoZXh0ZW5kKHt9LCBiaW5kT2JqZWN0KSwgcHJvcHMpO1xuICAgIH1cbiAgICAvLyBmaXhlZCBieSB4eHh4eHggYXBwLXBsdXMgc2NvcGVkU2xvdFxuICAgIG5vZGVzID0gc2NvcGVkU2xvdEZuKHByb3BzLCB0aGlzLCBwcm9wcy5faSkgfHwgZmFsbGJhY2s7XG4gIH0gZWxzZSB7XG4gICAgbm9kZXMgPSB0aGlzLiRzbG90c1tuYW1lXSB8fCBmYWxsYmFjaztcbiAgfVxuXG4gIHZhciB0YXJnZXQgPSBwcm9wcyAmJiBwcm9wcy5zbG90O1xuICBpZiAodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJywgeyBzbG90OiB0YXJnZXQgfSwgbm9kZXMpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5vZGVzXG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlc29sdmluZyBmaWx0ZXJzXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVGaWx0ZXIgKGlkKSB7XG4gIHJldHVybiByZXNvbHZlQXNzZXQodGhpcy4kb3B0aW9ucywgJ2ZpbHRlcnMnLCBpZCwgdHJ1ZSkgfHwgaWRlbnRpdHlcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGlzS2V5Tm90TWF0Y2ggKGV4cGVjdCwgYWN0dWFsKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGV4cGVjdCkpIHtcbiAgICByZXR1cm4gZXhwZWN0LmluZGV4T2YoYWN0dWFsKSA9PT0gLTFcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXhwZWN0ICE9PSBhY3R1YWxcbiAgfVxufVxuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciBjaGVja2luZyBrZXlDb2RlcyBmcm9tIGNvbmZpZy5cbiAqIGV4cG9zZWQgYXMgVnVlLnByb3RvdHlwZS5fa1xuICogcGFzc2luZyBpbiBldmVudEtleU5hbWUgYXMgbGFzdCBhcmd1bWVudCBzZXBhcmF0ZWx5IGZvciBiYWNrd2FyZHMgY29tcGF0XG4gKi9cbmZ1bmN0aW9uIGNoZWNrS2V5Q29kZXMgKFxuICBldmVudEtleUNvZGUsXG4gIGtleSxcbiAgYnVpbHRJbktleUNvZGUsXG4gIGV2ZW50S2V5TmFtZSxcbiAgYnVpbHRJbktleU5hbWVcbikge1xuICB2YXIgbWFwcGVkS2V5Q29kZSA9IGNvbmZpZy5rZXlDb2Rlc1trZXldIHx8IGJ1aWx0SW5LZXlDb2RlO1xuICBpZiAoYnVpbHRJbktleU5hbWUgJiYgZXZlbnRLZXlOYW1lICYmICFjb25maWcua2V5Q29kZXNba2V5XSkge1xuICAgIHJldHVybiBpc0tleU5vdE1hdGNoKGJ1aWx0SW5LZXlOYW1lLCBldmVudEtleU5hbWUpXG4gIH0gZWxzZSBpZiAobWFwcGVkS2V5Q29kZSkge1xuICAgIHJldHVybiBpc0tleU5vdE1hdGNoKG1hcHBlZEtleUNvZGUsIGV2ZW50S2V5Q29kZSlcbiAgfSBlbHNlIGlmIChldmVudEtleU5hbWUpIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKGV2ZW50S2V5TmFtZSkgIT09IGtleVxuICB9XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciBtZXJnaW5nIHYtYmluZD1cIm9iamVjdFwiIGludG8gYSBWTm9kZSdzIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGJpbmRPYmplY3RQcm9wcyAoXG4gIGRhdGEsXG4gIHRhZyxcbiAgdmFsdWUsXG4gIGFzUHJvcCxcbiAgaXNTeW5jXG4pIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ3YtYmluZCB3aXRob3V0IGFyZ3VtZW50IGV4cGVjdHMgYW4gT2JqZWN0IG9yIEFycmF5IHZhbHVlJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdG9PYmplY3QodmFsdWUpO1xuICAgICAgfVxuICAgICAgdmFyIGhhc2g7XG4gICAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uICgga2V5ICkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAga2V5ID09PSAnY2xhc3MnIHx8XG4gICAgICAgICAga2V5ID09PSAnc3R5bGUnIHx8XG4gICAgICAgICAgaXNSZXNlcnZlZEF0dHJpYnV0ZShrZXkpXG4gICAgICAgICkge1xuICAgICAgICAgIGhhc2ggPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0eXBlID0gZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLnR5cGU7XG4gICAgICAgICAgaGFzaCA9IGFzUHJvcCB8fCBjb25maWcubXVzdFVzZVByb3AodGFnLCB0eXBlLCBrZXkpXG4gICAgICAgICAgICA/IGRhdGEuZG9tUHJvcHMgfHwgKGRhdGEuZG9tUHJvcHMgPSB7fSlcbiAgICAgICAgICAgIDogZGF0YS5hdHRycyB8fCAoZGF0YS5hdHRycyA9IHt9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FtZWxpemVkS2V5ID0gY2FtZWxpemUoa2V5KTtcbiAgICAgICAgdmFyIGh5cGhlbmF0ZWRLZXkgPSBoeXBoZW5hdGUoa2V5KTtcbiAgICAgICAgaWYgKCEoY2FtZWxpemVkS2V5IGluIGhhc2gpICYmICEoaHlwaGVuYXRlZEtleSBpbiBoYXNoKSkge1xuICAgICAgICAgIGhhc2hba2V5XSA9IHZhbHVlW2tleV07XG5cbiAgICAgICAgICBpZiAoaXNTeW5jKSB7XG4gICAgICAgICAgICB2YXIgb24gPSBkYXRhLm9uIHx8IChkYXRhLm9uID0ge30pO1xuICAgICAgICAgICAgb25bKFwidXBkYXRlOlwiICsga2V5KV0gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgIHZhbHVlW2tleV0gPSAkZXZlbnQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSBsb29wKCBrZXkgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGFcbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlbmRlcmluZyBzdGF0aWMgdHJlZXMuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclN0YXRpYyAoXG4gIGluZGV4LFxuICBpc0luRm9yXG4pIHtcbiAgdmFyIGNhY2hlZCA9IHRoaXMuX3N0YXRpY1RyZWVzIHx8ICh0aGlzLl9zdGF0aWNUcmVlcyA9IFtdKTtcbiAgdmFyIHRyZWUgPSBjYWNoZWRbaW5kZXhdO1xuICAvLyBpZiBoYXMgYWxyZWFkeS1yZW5kZXJlZCBzdGF0aWMgdHJlZSBhbmQgbm90IGluc2lkZSB2LWZvcixcbiAgLy8gd2UgY2FuIHJldXNlIHRoZSBzYW1lIHRyZWUuXG4gIGlmICh0cmVlICYmICFpc0luRm9yKSB7XG4gICAgcmV0dXJuIHRyZWVcbiAgfVxuICAvLyBvdGhlcndpc2UsIHJlbmRlciBhIGZyZXNoIHRyZWUuXG4gIHRyZWUgPSBjYWNoZWRbaW5kZXhdID0gdGhpcy4kb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNbaW5kZXhdLmNhbGwoXG4gICAgdGhpcy5fcmVuZGVyUHJveHksXG4gICAgbnVsbCxcbiAgICB0aGlzIC8vIGZvciByZW5kZXIgZm5zIGdlbmVyYXRlZCBmb3IgZnVuY3Rpb25hbCBjb21wb25lbnQgdGVtcGxhdGVzXG4gICk7XG4gIG1hcmtTdGF0aWModHJlZSwgKFwiX19zdGF0aWNfX1wiICsgaW5kZXgpLCBmYWxzZSk7XG4gIHJldHVybiB0cmVlXG59XG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHYtb25jZS5cbiAqIEVmZmVjdGl2ZWx5IGl0IG1lYW5zIG1hcmtpbmcgdGhlIG5vZGUgYXMgc3RhdGljIHdpdGggYSB1bmlxdWUga2V5LlxuICovXG5mdW5jdGlvbiBtYXJrT25jZSAoXG4gIHRyZWUsXG4gIGluZGV4LFxuICBrZXlcbikge1xuICBtYXJrU3RhdGljKHRyZWUsIChcIl9fb25jZV9fXCIgKyBpbmRleCArIChrZXkgPyAoXCJfXCIgKyBrZXkpIDogXCJcIikpLCB0cnVlKTtcbiAgcmV0dXJuIHRyZWVcbn1cblxuZnVuY3Rpb24gbWFya1N0YXRpYyAoXG4gIHRyZWUsXG4gIGtleSxcbiAgaXNPbmNlXG4pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHJlZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0cmVlW2ldICYmIHR5cGVvZiB0cmVlW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICBtYXJrU3RhdGljTm9kZSh0cmVlW2ldLCAoa2V5ICsgXCJfXCIgKyBpKSwgaXNPbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbWFya1N0YXRpY05vZGUodHJlZSwga2V5LCBpc09uY2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcmtTdGF0aWNOb2RlIChub2RlLCBrZXksIGlzT25jZSkge1xuICBub2RlLmlzU3RhdGljID0gdHJ1ZTtcbiAgbm9kZS5rZXkgPSBrZXk7XG4gIG5vZGUuaXNPbmNlID0gaXNPbmNlO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gYmluZE9iamVjdExpc3RlbmVycyAoZGF0YSwgdmFsdWUpIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAndi1vbiB3aXRob3V0IGFyZ3VtZW50IGV4cGVjdHMgYW4gT2JqZWN0IHZhbHVlJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9uID0gZGF0YS5vbiA9IGRhdGEub24gPyBleHRlbmQoe30sIGRhdGEub24pIDoge307XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgdmFyIGV4aXN0aW5nID0gb25ba2V5XTtcbiAgICAgICAgdmFyIG91cnMgPSB2YWx1ZVtrZXldO1xuICAgICAgICBvbltrZXldID0gZXhpc3RpbmcgPyBbXS5jb25jYXQoZXhpc3RpbmcsIG91cnMpIDogb3VycztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGFcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIHJlc29sdmVTY29wZWRTbG90cyAoXG4gIGZucywgLy8gc2VlIGZsb3cvdm5vZGVcbiAgcmVzLFxuICAvLyB0aGUgZm9sbG93aW5nIGFyZSBhZGRlZCBpbiAyLjZcbiAgaGFzRHluYW1pY0tleXMsXG4gIGNvbnRlbnRIYXNoS2V5XG4pIHtcbiAgcmVzID0gcmVzIHx8IHsgJHN0YWJsZTogIWhhc0R5bmFtaWNLZXlzIH07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNsb3QgPSBmbnNbaV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2xvdCkpIHtcbiAgICAgIHJlc29sdmVTY29wZWRTbG90cyhzbG90LCByZXMsIGhhc0R5bmFtaWNLZXlzKTtcbiAgICB9IGVsc2UgaWYgKHNsb3QpIHtcbiAgICAgIC8vIG1hcmtlciBmb3IgcmV2ZXJzZSBwcm94eWluZyB2LXNsb3Qgd2l0aG91dCBzY29wZSBvbiB0aGlzLiRzbG90c1xuICAgICAgaWYgKHNsb3QucHJveHkpIHtcbiAgICAgICAgc2xvdC5mbi5wcm94eSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXNbc2xvdC5rZXldID0gc2xvdC5mbjtcbiAgICB9XG4gIH1cbiAgaWYgKGNvbnRlbnRIYXNoS2V5KSB7XG4gICAgKHJlcykuJGtleSA9IGNvbnRlbnRIYXNoS2V5O1xuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGJpbmREeW5hbWljS2V5cyAoYmFzZU9iaiwgdmFsdWVzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGtleSA9IHZhbHVlc1tpXTtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5KSB7XG4gICAgICBiYXNlT2JqW3ZhbHVlc1tpXV0gPSB2YWx1ZXNbaSArIDFdO1xuICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBrZXkgIT09ICcnICYmIGtleSAhPT0gbnVsbCkge1xuICAgICAgLy8gbnVsbCBpcyBhIHNwZWNpYWwgdmFsdWUgZm9yIGV4cGxpY2l0bHkgcmVtb3ZpbmcgYSBiaW5kaW5nXG4gICAgICB3YXJuKFxuICAgICAgICAoXCJJbnZhbGlkIHZhbHVlIGZvciBkeW5hbWljIGRpcmVjdGl2ZSBhcmd1bWVudCAoZXhwZWN0ZWQgc3RyaW5nIG9yIG51bGwpOiBcIiArIGtleSksXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlT2JqXG59XG5cbi8vIGhlbHBlciB0byBkeW5hbWljYWxseSBhcHBlbmQgbW9kaWZpZXIgcnVudGltZSBtYXJrZXJzIHRvIGV2ZW50IG5hbWVzLlxuLy8gZW5zdXJlIG9ubHkgYXBwZW5kIHdoZW4gdmFsdWUgaXMgYWxyZWFkeSBzdHJpbmcsIG90aGVyd2lzZSBpdCB3aWxsIGJlIGNhc3Rcbi8vIHRvIHN0cmluZyBhbmQgY2F1c2UgdGhlIHR5cGUgY2hlY2sgdG8gbWlzcy5cbmZ1bmN0aW9uIHByZXBlbmRNb2RpZmllciAodmFsdWUsIHN5bWJvbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHN5bWJvbCArIHZhbHVlIDogdmFsdWVcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluc3RhbGxSZW5kZXJIZWxwZXJzICh0YXJnZXQpIHtcbiAgdGFyZ2V0Ll9vID0gbWFya09uY2U7XG4gIHRhcmdldC5fbiA9IHRvTnVtYmVyO1xuICB0YXJnZXQuX3MgPSB0b1N0cmluZztcbiAgdGFyZ2V0Ll9sID0gcmVuZGVyTGlzdDtcbiAgdGFyZ2V0Ll90ID0gcmVuZGVyU2xvdDtcbiAgdGFyZ2V0Ll9xID0gbG9vc2VFcXVhbDtcbiAgdGFyZ2V0Ll9pID0gbG9vc2VJbmRleE9mO1xuICB0YXJnZXQuX20gPSByZW5kZXJTdGF0aWM7XG4gIHRhcmdldC5fZiA9IHJlc29sdmVGaWx0ZXI7XG4gIHRhcmdldC5fayA9IGNoZWNrS2V5Q29kZXM7XG4gIHRhcmdldC5fYiA9IGJpbmRPYmplY3RQcm9wcztcbiAgdGFyZ2V0Ll92ID0gY3JlYXRlVGV4dFZOb2RlO1xuICB0YXJnZXQuX2UgPSBjcmVhdGVFbXB0eVZOb2RlO1xuICB0YXJnZXQuX3UgPSByZXNvbHZlU2NvcGVkU2xvdHM7XG4gIHRhcmdldC5fZyA9IGJpbmRPYmplY3RMaXN0ZW5lcnM7XG4gIHRhcmdldC5fZCA9IGJpbmREeW5hbWljS2V5cztcbiAgdGFyZ2V0Ll9wID0gcHJlcGVuZE1vZGlmaWVyO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gRnVuY3Rpb25hbFJlbmRlckNvbnRleHQgKFxuICBkYXRhLFxuICBwcm9wcyxcbiAgY2hpbGRyZW4sXG4gIHBhcmVudCxcbiAgQ3RvclxuKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBvcHRpb25zID0gQ3Rvci5vcHRpb25zO1xuICAvLyBlbnN1cmUgdGhlIGNyZWF0ZUVsZW1lbnQgZnVuY3Rpb24gaW4gZnVuY3Rpb25hbCBjb21wb25lbnRzXG4gIC8vIGdldHMgYSB1bmlxdWUgY29udGV4dCAtIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciBjb3JyZWN0IG5hbWVkIHNsb3QgY2hlY2tcbiAgdmFyIGNvbnRleHRWbTtcbiAgaWYgKGhhc093bihwYXJlbnQsICdfdWlkJykpIHtcbiAgICBjb250ZXh0Vm0gPSBPYmplY3QuY3JlYXRlKHBhcmVudCk7XG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgY29udGV4dFZtLl9vcmlnaW5hbCA9IHBhcmVudDtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aGUgY29udGV4dCB2bSBwYXNzZWQgaW4gaXMgYSBmdW5jdGlvbmFsIGNvbnRleHQgYXMgd2VsbC5cbiAgICAvLyBpbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBtYWtlIHN1cmUgd2UgYXJlIGFibGUgdG8gZ2V0IGEgaG9sZCB0byB0aGVcbiAgICAvLyByZWFsIGNvbnRleHQgaW5zdGFuY2UuXG4gICAgY29udGV4dFZtID0gcGFyZW50O1xuICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgIHBhcmVudCA9IHBhcmVudC5fb3JpZ2luYWw7XG4gIH1cbiAgdmFyIGlzQ29tcGlsZWQgPSBpc1RydWUob3B0aW9ucy5fY29tcGlsZWQpO1xuICB2YXIgbmVlZE5vcm1hbGl6YXRpb24gPSAhaXNDb21waWxlZDtcblxuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMubGlzdGVuZXJzID0gZGF0YS5vbiB8fCBlbXB0eU9iamVjdDtcbiAgdGhpcy5pbmplY3Rpb25zID0gcmVzb2x2ZUluamVjdChvcHRpb25zLmluamVjdCwgcGFyZW50KTtcbiAgdGhpcy5zbG90cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMkMS4kc2xvdHMpIHtcbiAgICAgIG5vcm1hbGl6ZVNjb3BlZFNsb3RzKFxuICAgICAgICBkYXRhLnNjb3BlZFNsb3RzLFxuICAgICAgICB0aGlzJDEuJHNsb3RzID0gcmVzb2x2ZVNsb3RzKGNoaWxkcmVuLCBwYXJlbnQpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcyQxLiRzbG90c1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc2NvcGVkU2xvdHMnLCAoe1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQgKCkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVNjb3BlZFNsb3RzKGRhdGEuc2NvcGVkU2xvdHMsIHRoaXMuc2xvdHMoKSlcbiAgICB9XG4gIH0pKTtcblxuICAvLyBzdXBwb3J0IGZvciBjb21waWxlZCBmdW5jdGlvbmFsIHRlbXBsYXRlXG4gIGlmIChpc0NvbXBpbGVkKSB7XG4gICAgLy8gZXhwb3NpbmcgJG9wdGlvbnMgZm9yIHJlbmRlclN0YXRpYygpXG4gICAgdGhpcy4kb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgLy8gcHJlLXJlc29sdmUgc2xvdHMgZm9yIHJlbmRlclNsb3QoKVxuICAgIHRoaXMuJHNsb3RzID0gdGhpcy5zbG90cygpO1xuICAgIHRoaXMuJHNjb3BlZFNsb3RzID0gbm9ybWFsaXplU2NvcGVkU2xvdHMoZGF0YS5zY29wZWRTbG90cywgdGhpcy4kc2xvdHMpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuX3Njb3BlSWQpIHtcbiAgICB0aGlzLl9jID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHtcbiAgICAgIHZhciB2bm9kZSA9IGNyZWF0ZUVsZW1lbnQoY29udGV4dFZtLCBhLCBiLCBjLCBkLCBuZWVkTm9ybWFsaXphdGlvbik7XG4gICAgICBpZiAodm5vZGUgJiYgIUFycmF5LmlzQXJyYXkodm5vZGUpKSB7XG4gICAgICAgIHZub2RlLmZuU2NvcGVJZCA9IG9wdGlvbnMuX3Njb3BlSWQ7XG4gICAgICAgIHZub2RlLmZuQ29udGV4dCA9IHBhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bm9kZVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KGNvbnRleHRWbSwgYSwgYiwgYywgZCwgbmVlZE5vcm1hbGl6YXRpb24pOyB9O1xuICB9XG59XG5cbmluc3RhbGxSZW5kZXJIZWxwZXJzKEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0LnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQgKFxuICBDdG9yLFxuICBwcm9wc0RhdGEsXG4gIGRhdGEsXG4gIGNvbnRleHRWbSxcbiAgY2hpbGRyZW5cbikge1xuICB2YXIgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucztcbiAgdmFyIHByb3BzID0ge307XG4gIHZhciBwcm9wT3B0aW9ucyA9IG9wdGlvbnMucHJvcHM7XG4gIGlmIChpc0RlZihwcm9wT3B0aW9ucykpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcE9wdGlvbnMpIHtcbiAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhIHx8IGVtcHR5T2JqZWN0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRGVmKGRhdGEuYXR0cnMpKSB7IG1lcmdlUHJvcHMocHJvcHMsIGRhdGEuYXR0cnMpOyB9XG4gICAgaWYgKGlzRGVmKGRhdGEucHJvcHMpKSB7IG1lcmdlUHJvcHMocHJvcHMsIGRhdGEucHJvcHMpOyB9XG4gIH1cblxuICB2YXIgcmVuZGVyQ29udGV4dCA9IG5ldyBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dChcbiAgICBkYXRhLFxuICAgIHByb3BzLFxuICAgIGNoaWxkcmVuLFxuICAgIGNvbnRleHRWbSxcbiAgICBDdG9yXG4gICk7XG5cbiAgdmFyIHZub2RlID0gb3B0aW9ucy5yZW5kZXIuY2FsbChudWxsLCByZW5kZXJDb250ZXh0Ll9jLCByZW5kZXJDb250ZXh0KTtcblxuICBpZiAodm5vZGUgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgIHJldHVybiBjbG9uZUFuZE1hcmtGdW5jdGlvbmFsUmVzdWx0KHZub2RlLCBkYXRhLCByZW5kZXJDb250ZXh0LnBhcmVudCwgb3B0aW9ucywgcmVuZGVyQ29udGV4dClcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZub2RlKSkge1xuICAgIHZhciB2bm9kZXMgPSBub3JtYWxpemVDaGlsZHJlbih2bm9kZSkgfHwgW107XG4gICAgdmFyIHJlcyA9IG5ldyBBcnJheSh2bm9kZXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzW2ldID0gY2xvbmVBbmRNYXJrRnVuY3Rpb25hbFJlc3VsdCh2bm9kZXNbaV0sIGRhdGEsIHJlbmRlckNvbnRleHQucGFyZW50LCBvcHRpb25zLCByZW5kZXJDb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lQW5kTWFya0Z1bmN0aW9uYWxSZXN1bHQgKHZub2RlLCBkYXRhLCBjb250ZXh0Vm0sIG9wdGlvbnMsIHJlbmRlckNvbnRleHQpIHtcbiAgLy8gIzc4MTcgY2xvbmUgbm9kZSBiZWZvcmUgc2V0dGluZyBmbkNvbnRleHQsIG90aGVyd2lzZSBpZiB0aGUgbm9kZSBpcyByZXVzZWRcbiAgLy8gKGUuZy4gaXQgd2FzIGZyb20gYSBjYWNoZWQgbm9ybWFsIHNsb3QpIHRoZSBmbkNvbnRleHQgY2F1c2VzIG5hbWVkIHNsb3RzXG4gIC8vIHRoYXQgc2hvdWxkIG5vdCBiZSBtYXRjaGVkIHRvIG1hdGNoLlxuICB2YXIgY2xvbmUgPSBjbG9uZVZOb2RlKHZub2RlKTtcbiAgY2xvbmUuZm5Db250ZXh0ID0gY29udGV4dFZtO1xuICBjbG9uZS5mbk9wdGlvbnMgPSBvcHRpb25zO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIChjbG9uZS5kZXZ0b29sc01ldGEgPSBjbG9uZS5kZXZ0b29sc01ldGEgfHwge30pLnJlbmRlckNvbnRleHQgPSByZW5kZXJDb250ZXh0O1xuICB9XG4gIGlmIChkYXRhLnNsb3QpIHtcbiAgICAoY2xvbmUuZGF0YSB8fCAoY2xvbmUuZGF0YSA9IHt9KSkuc2xvdCA9IGRhdGEuc2xvdDtcbiAgfVxuICByZXR1cm4gY2xvbmVcbn1cblxuZnVuY3Rpb24gbWVyZ2VQcm9wcyAodG8sIGZyb20pIHtcbiAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICB0b1tjYW1lbGl6ZShrZXkpXSA9IGZyb21ba2V5XTtcbiAgfVxufVxuXG4vKiAgKi9cblxuLyogICovXG5cbi8qICAqL1xuXG4vKiAgKi9cblxuLy8gaW5saW5lIGhvb2tzIHRvIGJlIGludm9rZWQgb24gY29tcG9uZW50IFZOb2RlcyBkdXJpbmcgcGF0Y2hcbnZhciBjb21wb25lbnRWTm9kZUhvb2tzID0ge1xuICBpbml0OiBmdW5jdGlvbiBpbml0ICh2bm9kZSwgaHlkcmF0aW5nKSB7XG4gICAgaWYgKFxuICAgICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgJiZcbiAgICAgICF2bm9kZS5jb21wb25lbnRJbnN0YW5jZS5faXNEZXN0cm95ZWQgJiZcbiAgICAgIHZub2RlLmRhdGEua2VlcEFsaXZlXG4gICAgKSB7XG4gICAgICAvLyBrZXB0LWFsaXZlIGNvbXBvbmVudHMsIHRyZWF0IGFzIGEgcGF0Y2hcbiAgICAgIHZhciBtb3VudGVkTm9kZSA9IHZub2RlOyAvLyB3b3JrIGFyb3VuZCBmbG93XG4gICAgICBjb21wb25lbnRWTm9kZUhvb2tzLnByZXBhdGNoKG1vdW50ZWROb2RlLCBtb3VudGVkTm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjaGlsZCA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VGb3JWbm9kZShcbiAgICAgICAgdm5vZGUsXG4gICAgICAgIGFjdGl2ZUluc3RhbmNlXG4gICAgICApO1xuICAgICAgY2hpbGQuJG1vdW50KGh5ZHJhdGluZyA/IHZub2RlLmVsbSA6IHVuZGVmaW5lZCwgaHlkcmF0aW5nKTtcbiAgICB9XG4gIH0sXG5cbiAgcHJlcGF0Y2g6IGZ1bmN0aW9uIHByZXBhdGNoIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gICAgdmFyIGNoaWxkID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgPSBvbGRWbm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICB1cGRhdGVDaGlsZENvbXBvbmVudChcbiAgICAgIGNoaWxkLFxuICAgICAgb3B0aW9ucy5wcm9wc0RhdGEsIC8vIHVwZGF0ZWQgcHJvcHNcbiAgICAgIG9wdGlvbnMubGlzdGVuZXJzLCAvLyB1cGRhdGVkIGxpc3RlbmVyc1xuICAgICAgdm5vZGUsIC8vIG5ldyBwYXJlbnQgdm5vZGVcbiAgICAgIG9wdGlvbnMuY2hpbGRyZW4gLy8gbmV3IGNoaWxkcmVuXG4gICAgKTtcbiAgfSxcblxuICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydCAodm5vZGUpIHtcbiAgICB2YXIgY29udGV4dCA9IHZub2RlLmNvbnRleHQ7XG4gICAgdmFyIGNvbXBvbmVudEluc3RhbmNlID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgaWYgKCFjb21wb25lbnRJbnN0YW5jZS5faXNNb3VudGVkKSB7XG4gICAgICBjYWxsSG9vayhjb21wb25lbnRJbnN0YW5jZSwgJ29uU2VydmljZUNyZWF0ZWQnKTtcbiAgICAgIGNhbGxIb29rKGNvbXBvbmVudEluc3RhbmNlLCAnb25TZXJ2aWNlQXR0YWNoZWQnKTtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLl9pc01vdW50ZWQgPSB0cnVlO1xuICAgICAgY2FsbEhvb2soY29tcG9uZW50SW5zdGFuY2UsICdtb3VudGVkJyk7XG4gICAgfVxuICAgIGlmICh2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgaWYgKGNvbnRleHQuX2lzTW91bnRlZCkge1xuICAgICAgICAvLyB2dWUtcm91dGVyIzEyMTJcbiAgICAgICAgLy8gRHVyaW5nIHVwZGF0ZXMsIGEga2VwdC1hbGl2ZSBjb21wb25lbnQncyBjaGlsZCBjb21wb25lbnRzIG1heVxuICAgICAgICAvLyBjaGFuZ2UsIHNvIGRpcmVjdGx5IHdhbGtpbmcgdGhlIHRyZWUgaGVyZSBtYXkgY2FsbCBhY3RpdmF0ZWQgaG9va3NcbiAgICAgICAgLy8gb24gaW5jb3JyZWN0IGNoaWxkcmVuLiBJbnN0ZWFkIHdlIHB1c2ggdGhlbSBpbnRvIGEgcXVldWUgd2hpY2ggd2lsbFxuICAgICAgICAvLyBiZSBwcm9jZXNzZWQgYWZ0ZXIgdGhlIHdob2xlIHBhdGNoIHByb2Nlc3MgZW5kZWQuXG4gICAgICAgIHF1ZXVlQWN0aXZhdGVkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQoY29tcG9uZW50SW5zdGFuY2UsIHRydWUgLyogZGlyZWN0ICovKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSAodm5vZGUpIHtcbiAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBpZiAoIWNvbXBvbmVudEluc3RhbmNlLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgaWYgKCF2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS4kZGVzdHJveSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlLCB0cnVlIC8qIGRpcmVjdCAqLyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgaG9va3NUb01lcmdlID0gT2JqZWN0LmtleXMoY29tcG9uZW50Vk5vZGVIb29rcyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCAoXG4gIEN0b3IsXG4gIGRhdGEsXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuLFxuICB0YWdcbikge1xuICBpZiAoaXNVbmRlZihDdG9yKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGJhc2VDdG9yID0gY29udGV4dC4kb3B0aW9ucy5fYmFzZTtcblxuICAvLyBwbGFpbiBvcHRpb25zIG9iamVjdDogdHVybiBpdCBpbnRvIGEgY29uc3RydWN0b3JcbiAgaWYgKGlzT2JqZWN0KEN0b3IpKSB7XG4gICAgQ3RvciA9IGJhc2VDdG9yLmV4dGVuZChDdG9yKTtcbiAgfVxuXG4gIC8vIGlmIGF0IHRoaXMgc3RhZ2UgaXQncyBub3QgYSBjb25zdHJ1Y3RvciBvciBhbiBhc3luYyBjb21wb25lbnQgZmFjdG9yeSxcbiAgLy8gcmVqZWN0LlxuICBpZiAodHlwZW9mIEN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybigoXCJJbnZhbGlkIENvbXBvbmVudCBkZWZpbml0aW9uOiBcIiArIChTdHJpbmcoQ3RvcikpKSwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gYXN5bmMgY29tcG9uZW50XG4gIHZhciBhc3luY0ZhY3Rvcnk7XG4gIGlmIChpc1VuZGVmKEN0b3IuY2lkKSkge1xuICAgIGFzeW5jRmFjdG9yeSA9IEN0b3I7XG4gICAgQ3RvciA9IHJlc29sdmVBc3luY0NvbXBvbmVudChhc3luY0ZhY3RvcnksIGJhc2VDdG9yKTtcbiAgICBpZiAoQ3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyByZXR1cm4gYSBwbGFjZWhvbGRlciBub2RlIGZvciBhc3luYyBjb21wb25lbnQsIHdoaWNoIGlzIHJlbmRlcmVkXG4gICAgICAvLyBhcyBhIGNvbW1lbnQgbm9kZSBidXQgcHJlc2VydmVzIGFsbCB0aGUgcmF3IGluZm9ybWF0aW9uIGZvciB0aGUgbm9kZS5cbiAgICAgIC8vIHRoZSBpbmZvcm1hdGlvbiB3aWxsIGJlIHVzZWQgZm9yIGFzeW5jIHNlcnZlci1yZW5kZXJpbmcgYW5kIGh5ZHJhdGlvbi5cbiAgICAgIHJldHVybiBjcmVhdGVBc3luY1BsYWNlaG9sZGVyKFxuICAgICAgICBhc3luY0ZhY3RvcnksXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICB0YWdcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAvLyByZXNvbHZlIGNvbnN0cnVjdG9yIG9wdGlvbnMgaW4gY2FzZSBnbG9iYWwgbWl4aW5zIGFyZSBhcHBsaWVkIGFmdGVyXG4gIC8vIGNvbXBvbmVudCBjb25zdHJ1Y3RvciBjcmVhdGlvblxuICByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKEN0b3IpO1xuXG4gIC8vIHRyYW5zZm9ybSBjb21wb25lbnQgdi1tb2RlbCBkYXRhIGludG8gcHJvcHMgJiBldmVudHNcbiAgaWYgKGlzRGVmKGRhdGEubW9kZWwpKSB7XG4gICAgdHJhbnNmb3JtTW9kZWwoQ3Rvci5vcHRpb25zLCBkYXRhKTtcbiAgfVxuXG4gIC8vIGV4dHJhY3QgcHJvcHNcbiAgdmFyIHByb3BzRGF0YSA9IGV4dHJhY3RQcm9wc0Zyb21WTm9kZURhdGEoZGF0YSwgQ3RvciwgdGFnLCBjb250ZXh0KTsgLy8gZml4ZWQgYnkgeHh4eHh4XG5cbiAgLy8gZnVuY3Rpb25hbCBjb21wb25lbnRcbiAgaWYgKGlzVHJ1ZShDdG9yLm9wdGlvbnMuZnVuY3Rpb25hbCkpIHtcbiAgICByZXR1cm4gY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudChDdG9yLCBwcm9wc0RhdGEsIGRhdGEsIGNvbnRleHQsIGNoaWxkcmVuKVxuICB9XG5cbiAgLy8gZXh0cmFjdCBsaXN0ZW5lcnMsIHNpbmNlIHRoZXNlIG5lZWRzIHRvIGJlIHRyZWF0ZWQgYXNcbiAgLy8gY2hpbGQgY29tcG9uZW50IGxpc3RlbmVycyBpbnN0ZWFkIG9mIERPTSBsaXN0ZW5lcnNcbiAgdmFyIGxpc3RlbmVycyA9IGRhdGEub247XG4gIC8vIHJlcGxhY2Ugd2l0aCBsaXN0ZW5lcnMgd2l0aCAubmF0aXZlIG1vZGlmaWVyXG4gIC8vIHNvIGl0IGdldHMgcHJvY2Vzc2VkIGR1cmluZyBwYXJlbnQgY29tcG9uZW50IHBhdGNoLlxuICBkYXRhLm9uID0gZGF0YS5uYXRpdmVPbjtcblxuICBpZiAoaXNUcnVlKEN0b3Iub3B0aW9ucy5hYnN0cmFjdCkpIHtcbiAgICAvLyBhYnN0cmFjdCBjb21wb25lbnRzIGRvIG5vdCBrZWVwIGFueXRoaW5nXG4gICAgLy8gb3RoZXIgdGhhbiBwcm9wcyAmIGxpc3RlbmVycyAmIHNsb3RcblxuICAgIC8vIHdvcmsgYXJvdW5kIGZsb3dcbiAgICB2YXIgc2xvdCA9IGRhdGEuc2xvdDtcbiAgICBkYXRhID0ge307XG4gICAgaWYgKHNsb3QpIHtcbiAgICAgIGRhdGEuc2xvdCA9IHNsb3Q7XG4gICAgfVxuICB9XG5cbiAgLy8gaW5zdGFsbCBjb21wb25lbnQgbWFuYWdlbWVudCBob29rcyBvbnRvIHRoZSBwbGFjZWhvbGRlciBub2RlXG4gIGluc3RhbGxDb21wb25lbnRIb29rcyhkYXRhKTtcblxuICAvLyByZXR1cm4gYSBwbGFjZWhvbGRlciB2bm9kZVxuICB2YXIgbmFtZSA9IEN0b3Iub3B0aW9ucy5uYW1lIHx8IHRhZztcbiAgdmFyIHZub2RlID0gbmV3IFZOb2RlKFxuICAgIChcInZ1ZS1jb21wb25lbnQtXCIgKyAoQ3Rvci5jaWQpICsgKG5hbWUgPyAoXCItXCIgKyBuYW1lKSA6ICcnKSksXG4gICAgZGF0YSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29udGV4dCxcbiAgICB7IEN0b3I6IEN0b3IsIHByb3BzRGF0YTogcHJvcHNEYXRhLCBsaXN0ZW5lcnM6IGxpc3RlbmVycywgdGFnOiB0YWcsIGNoaWxkcmVuOiBjaGlsZHJlbiB9LFxuICAgIGFzeW5jRmFjdG9yeVxuICApO1xuXG4gIHJldHVybiB2bm9kZVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnRJbnN0YW5jZUZvclZub2RlIChcbiAgdm5vZGUsIC8vIHdlIGtub3cgaXQncyBNb3VudGVkQ29tcG9uZW50Vk5vZGUgYnV0IGZsb3cgZG9lc24ndFxuICBwYXJlbnQgLy8gYWN0aXZlSW5zdGFuY2UgaW4gbGlmZWN5Y2xlIHN0YXRlXG4pIHtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgX2lzQ29tcG9uZW50OiB0cnVlLFxuICAgIF9wYXJlbnRWbm9kZTogdm5vZGUsXG4gICAgcGFyZW50OiBwYXJlbnRcbiAgfTtcbiAgLy8gY2hlY2sgaW5saW5lLXRlbXBsYXRlIHJlbmRlciBmdW5jdGlvbnNcbiAgdmFyIGlubGluZVRlbXBsYXRlID0gdm5vZGUuZGF0YS5pbmxpbmVUZW1wbGF0ZTtcbiAgaWYgKGlzRGVmKGlubGluZVRlbXBsYXRlKSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gaW5saW5lVGVtcGxhdGUucmVuZGVyO1xuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gaW5saW5lVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zO1xuICB9XG4gIHJldHVybiBuZXcgdm5vZGUuY29tcG9uZW50T3B0aW9ucy5DdG9yKG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIGluc3RhbGxDb21wb25lbnRIb29rcyAoZGF0YSkge1xuICB2YXIgaG9va3MgPSBkYXRhLmhvb2sgfHwgKGRhdGEuaG9vayA9IHt9KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rc1RvTWVyZ2UubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gaG9va3NUb01lcmdlW2ldO1xuICAgIHZhciBleGlzdGluZyA9IGhvb2tzW2tleV07XG4gICAgdmFyIHRvTWVyZ2UgPSBjb21wb25lbnRWTm9kZUhvb2tzW2tleV07XG4gICAgaWYgKGV4aXN0aW5nICE9PSB0b01lcmdlICYmICEoZXhpc3RpbmcgJiYgZXhpc3RpbmcuX21lcmdlZCkpIHtcbiAgICAgIGhvb2tzW2tleV0gPSBleGlzdGluZyA/IG1lcmdlSG9vayQxKHRvTWVyZ2UsIGV4aXN0aW5nKSA6IHRvTWVyZ2U7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlSG9vayQxIChmMSwgZjIpIHtcbiAgdmFyIG1lcmdlZCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgLy8gZmxvdyBjb21wbGFpbnMgYWJvdXQgZXh0cmEgYXJncyB3aGljaCBpcyB3aHkgd2UgdXNlIGFueVxuICAgIGYxKGEsIGIpO1xuICAgIGYyKGEsIGIpO1xuICB9O1xuICBtZXJnZWQuX21lcmdlZCA9IHRydWU7XG4gIHJldHVybiBtZXJnZWRcbn1cblxuLy8gdHJhbnNmb3JtIGNvbXBvbmVudCB2LW1vZGVsIGluZm8gKHZhbHVlIGFuZCBjYWxsYmFjaykgaW50b1xuLy8gcHJvcCBhbmQgZXZlbnQgaGFuZGxlciByZXNwZWN0aXZlbHkuXG5mdW5jdGlvbiB0cmFuc2Zvcm1Nb2RlbCAob3B0aW9ucywgZGF0YSkge1xuICB2YXIgcHJvcCA9IChvcHRpb25zLm1vZGVsICYmIG9wdGlvbnMubW9kZWwucHJvcCkgfHwgJ3ZhbHVlJztcbiAgdmFyIGV2ZW50ID0gKG9wdGlvbnMubW9kZWwgJiYgb3B0aW9ucy5tb2RlbC5ldmVudCkgfHwgJ2lucHV0J1xuICA7KGRhdGEuYXR0cnMgfHwgKGRhdGEuYXR0cnMgPSB7fSkpW3Byb3BdID0gZGF0YS5tb2RlbC52YWx1ZTtcbiAgdmFyIG9uID0gZGF0YS5vbiB8fCAoZGF0YS5vbiA9IHt9KTtcbiAgdmFyIGV4aXN0aW5nID0gb25bZXZlbnRdO1xuICB2YXIgY2FsbGJhY2sgPSBkYXRhLm1vZGVsLmNhbGxiYWNrO1xuICBpZiAoaXNEZWYoZXhpc3RpbmcpKSB7XG4gICAgaWYgKFxuICAgICAgQXJyYXkuaXNBcnJheShleGlzdGluZylcbiAgICAgICAgPyBleGlzdGluZy5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTFcbiAgICAgICAgOiBleGlzdGluZyAhPT0gY2FsbGJhY2tcbiAgICApIHtcbiAgICAgIG9uW2V2ZW50XSA9IFtjYWxsYmFja10uY29uY2F0KGV4aXN0aW5nKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgb25bZXZlbnRdID0gY2FsbGJhY2s7XG4gIH1cbn1cblxuLyogICovXG5cbnZhciBTSU1QTEVfTk9STUFMSVpFID0gMTtcbnZhciBBTFdBWVNfTk9STUFMSVpFID0gMjtcblxuLy8gd3JhcHBlciBmdW5jdGlvbiBmb3IgcHJvdmlkaW5nIGEgbW9yZSBmbGV4aWJsZSBpbnRlcmZhY2Vcbi8vIHdpdGhvdXQgZ2V0dGluZyB5ZWxsZWQgYXQgYnkgZmxvd1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCAoXG4gIGNvbnRleHQsXG4gIHRhZyxcbiAgZGF0YSxcbiAgY2hpbGRyZW4sXG4gIG5vcm1hbGl6YXRpb25UeXBlLFxuICBhbHdheXNOb3JtYWxpemVcbikge1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSB8fCBpc1ByaW1pdGl2ZShkYXRhKSkge1xuICAgIG5vcm1hbGl6YXRpb25UeXBlID0gY2hpbGRyZW47XG4gICAgY2hpbGRyZW4gPSBkYXRhO1xuICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGlzVHJ1ZShhbHdheXNOb3JtYWxpemUpKSB7XG4gICAgbm9ybWFsaXphdGlvblR5cGUgPSBBTFdBWVNfTk9STUFMSVpFO1xuICB9XG4gIHJldHVybiBfY3JlYXRlRWxlbWVudChjb250ZXh0LCB0YWcsIGRhdGEsIGNoaWxkcmVuLCBub3JtYWxpemF0aW9uVHlwZSlcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQgKFxuICBjb250ZXh0LFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICBub3JtYWxpemF0aW9uVHlwZVxuKSB7XG4gIGlmIChpc0RlZihkYXRhKSAmJiBpc0RlZigoZGF0YSkuX19vYl9fKSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgIFwiQXZvaWQgdXNpbmcgb2JzZXJ2ZWQgZGF0YSBvYmplY3QgYXMgdm5vZGUgZGF0YTogXCIgKyAoSlNPTi5zdHJpbmdpZnkoZGF0YSkpICsgXCJcXG5cIiArXG4gICAgICAnQWx3YXlzIGNyZWF0ZSBmcmVzaCB2bm9kZSBkYXRhIG9iamVjdHMgaW4gZWFjaCByZW5kZXIhJyxcbiAgICAgIGNvbnRleHRcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVFbXB0eVZOb2RlKClcbiAgfVxuICAvLyBvYmplY3Qgc3ludGF4IGluIHYtYmluZFxuICBpZiAoaXNEZWYoZGF0YSkgJiYgaXNEZWYoZGF0YS5pcykpIHtcbiAgICB0YWcgPSBkYXRhLmlzO1xuICB9XG4gIGlmICghdGFnKSB7XG4gICAgLy8gaW4gY2FzZSBvZiBjb21wb25lbnQgOmlzIHNldCB0byBmYWxzeSB2YWx1ZVxuICAgIHJldHVybiBjcmVhdGVFbXB0eVZOb2RlKClcbiAgfVxuICAvLyB3YXJuIGFnYWluc3Qgbm9uLXByaW1pdGl2ZSBrZXlcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICBpc0RlZihkYXRhKSAmJiBpc0RlZihkYXRhLmtleSkgJiYgIWlzUHJpbWl0aXZlKGRhdGEua2V5KVxuICApIHtcbiAgICB7XG4gICAgICB3YXJuKFxuICAgICAgICAnQXZvaWQgdXNpbmcgbm9uLXByaW1pdGl2ZSB2YWx1ZSBhcyBrZXksICcgK1xuICAgICAgICAndXNlIHN0cmluZy9udW1iZXIgdmFsdWUgaW5zdGVhZC4nLFxuICAgICAgICBjb250ZXh0XG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvLyBzdXBwb3J0IHNpbmdsZSBmdW5jdGlvbiBjaGlsZHJlbiBhcyBkZWZhdWx0IHNjb3BlZCBzbG90XG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJlxuICAgIHR5cGVvZiBjaGlsZHJlblswXSA9PT0gJ2Z1bmN0aW9uJ1xuICApIHtcbiAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICBkYXRhLnNjb3BlZFNsb3RzID0geyBkZWZhdWx0OiBjaGlsZHJlblswXSB9O1xuICAgIGNoaWxkcmVuLmxlbmd0aCA9IDA7XG4gIH1cbiAgaWYgKG5vcm1hbGl6YXRpb25UeXBlID09PSBBTFdBWVNfTk9STUFMSVpFKSB7XG4gICAgY2hpbGRyZW4gPSBub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbik7XG4gIH0gZWxzZSBpZiAobm9ybWFsaXphdGlvblR5cGUgPT09IFNJTVBMRV9OT1JNQUxJWkUpIHtcbiAgICBjaGlsZHJlbiA9IHNpbXBsZU5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKTtcbiAgfVxuICB2YXIgdm5vZGUsIG5zO1xuICBpZiAodHlwZW9mIHRhZyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgQ3RvcjtcbiAgICBucyA9IChjb250ZXh0LiR2bm9kZSAmJiBjb250ZXh0LiR2bm9kZS5ucykgfHwgY29uZmlnLmdldFRhZ05hbWVzcGFjZSh0YWcpO1xuICAgIGlmIChjb25maWcuaXNSZXNlcnZlZFRhZyh0YWcpKSB7XG4gICAgICAvLyBwbGF0Zm9ybSBidWlsdC1pbiBlbGVtZW50c1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaXNEZWYoZGF0YSkgJiYgaXNEZWYoZGF0YS5uYXRpdmVPbikpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAoXCJUaGUgLm5hdGl2ZSBtb2RpZmllciBmb3Igdi1vbiBpcyBvbmx5IHZhbGlkIG9uIGNvbXBvbmVudHMgYnV0IGl0IHdhcyB1c2VkIG9uIDxcIiArIHRhZyArIFwiPi5cIiksXG4gICAgICAgICAgY29udGV4dFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdm5vZGUgPSBuZXcgVk5vZGUoXG4gICAgICAgIGNvbmZpZy5wYXJzZVBsYXRmb3JtVGFnTmFtZSh0YWcpLCBkYXRhLCBjaGlsZHJlbixcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHRcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICgoIWRhdGEgfHwgIWRhdGEucHJlKSAmJiBpc0RlZihDdG9yID0gcmVzb2x2ZUFzc2V0KGNvbnRleHQuJG9wdGlvbnMsICdjb21wb25lbnRzJywgdGFnKSkpIHtcbiAgICAgIC8vIGNvbXBvbmVudFxuICAgICAgdm5vZGUgPSBjcmVhdGVDb21wb25lbnQoQ3RvciwgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4sIHRhZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHVua25vd24gb3IgdW5saXN0ZWQgbmFtZXNwYWNlZCBlbGVtZW50c1xuICAgICAgLy8gY2hlY2sgYXQgcnVudGltZSBiZWNhdXNlIGl0IG1heSBnZXQgYXNzaWduZWQgYSBuYW1lc3BhY2Ugd2hlbiBpdHNcbiAgICAgIC8vIHBhcmVudCBub3JtYWxpemVzIGNoaWxkcmVuXG4gICAgICB2bm9kZSA9IG5ldyBWTm9kZShcbiAgICAgICAgdGFnLCBkYXRhLCBjaGlsZHJlbixcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHRcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGRpcmVjdCBjb21wb25lbnQgb3B0aW9ucyAvIGNvbnN0cnVjdG9yXG4gICAgdm5vZGUgPSBjcmVhdGVDb21wb25lbnQodGFnLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbik7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkodm5vZGUpKSB7XG4gICAgcmV0dXJuIHZub2RlXG4gIH0gZWxzZSBpZiAoaXNEZWYodm5vZGUpKSB7XG4gICAgaWYgKGlzRGVmKG5zKSkgeyBhcHBseU5TKHZub2RlLCBucyk7IH1cbiAgICBpZiAoaXNEZWYoZGF0YSkpIHsgcmVnaXN0ZXJEZWVwQmluZGluZ3MoZGF0YSk7IH1cbiAgICByZXR1cm4gdm5vZGVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3JlYXRlRW1wdHlWTm9kZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlOUyAodm5vZGUsIG5zLCBmb3JjZSkge1xuICB2bm9kZS5ucyA9IG5zO1xuICBpZiAodm5vZGUudGFnID09PSAnZm9yZWlnbk9iamVjdCcpIHtcbiAgICAvLyB1c2UgZGVmYXVsdCBuYW1lc3BhY2UgaW5zaWRlIGZvcmVpZ25PYmplY3RcbiAgICBucyA9IHVuZGVmaW5lZDtcbiAgICBmb3JjZSA9IHRydWU7XG4gIH1cbiAgaWYgKGlzRGVmKHZub2RlLmNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSB2bm9kZS5jaGlsZHJlbltpXTtcbiAgICAgIGlmIChpc0RlZihjaGlsZC50YWcpICYmIChcbiAgICAgICAgaXNVbmRlZihjaGlsZC5ucykgfHwgKGlzVHJ1ZShmb3JjZSkgJiYgY2hpbGQudGFnICE9PSAnc3ZnJykpKSB7XG4gICAgICAgIGFwcGx5TlMoY2hpbGQsIG5zLCBmb3JjZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIHJlZiAjNTMxOFxuLy8gbmVjZXNzYXJ5IHRvIGVuc3VyZSBwYXJlbnQgcmUtcmVuZGVyIHdoZW4gZGVlcCBiaW5kaW5ncyBsaWtlIDpzdHlsZSBhbmRcbi8vIDpjbGFzcyBhcmUgdXNlZCBvbiBzbG90IG5vZGVzXG5mdW5jdGlvbiByZWdpc3RlckRlZXBCaW5kaW5ncyAoZGF0YSkge1xuICBpZiAoaXNPYmplY3QoZGF0YS5zdHlsZSkpIHtcbiAgICB0cmF2ZXJzZShkYXRhLnN0eWxlKTtcbiAgfVxuICBpZiAoaXNPYmplY3QoZGF0YS5jbGFzcykpIHtcbiAgICB0cmF2ZXJzZShkYXRhLmNsYXNzKTtcbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdFJlbmRlciAodm0pIHtcbiAgdm0uX3Zub2RlID0gbnVsbDsgLy8gdGhlIHJvb3Qgb2YgdGhlIGNoaWxkIHRyZWVcbiAgdm0uX3N0YXRpY1RyZWVzID0gbnVsbDsgLy8gdi1vbmNlIGNhY2hlZCB0cmVlc1xuICB2YXIgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xuICB2YXIgcGFyZW50Vm5vZGUgPSB2bS4kdm5vZGUgPSBvcHRpb25zLl9wYXJlbnRWbm9kZTsgLy8gdGhlIHBsYWNlaG9sZGVyIG5vZGUgaW4gcGFyZW50IHRyZWVcbiAgdmFyIHJlbmRlckNvbnRleHQgPSBwYXJlbnRWbm9kZSAmJiBwYXJlbnRWbm9kZS5jb250ZXh0O1xuICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHMob3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4sIHJlbmRlckNvbnRleHQpO1xuICB2bS4kc2NvcGVkU2xvdHMgPSBlbXB0eU9iamVjdDtcbiAgLy8gYmluZCB0aGUgY3JlYXRlRWxlbWVudCBmbiB0byB0aGlzIGluc3RhbmNlXG4gIC8vIHNvIHRoYXQgd2UgZ2V0IHByb3BlciByZW5kZXIgY29udGV4dCBpbnNpZGUgaXQuXG4gIC8vIGFyZ3Mgb3JkZXI6IHRhZywgZGF0YSwgY2hpbGRyZW4sIG5vcm1hbGl6YXRpb25UeXBlLCBhbHdheXNOb3JtYWxpemVcbiAgLy8gaW50ZXJuYWwgdmVyc2lvbiBpcyB1c2VkIGJ5IHJlbmRlciBmdW5jdGlvbnMgY29tcGlsZWQgZnJvbSB0ZW1wbGF0ZXNcbiAgdm0uX2MgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudCh2bSwgYSwgYiwgYywgZCwgZmFsc2UpOyB9O1xuICAvLyBub3JtYWxpemF0aW9uIGlzIGFsd2F5cyBhcHBsaWVkIGZvciB0aGUgcHVibGljIHZlcnNpb24sIHVzZWQgaW5cbiAgLy8gdXNlci13cml0dGVuIHJlbmRlciBmdW5jdGlvbnMuXG4gIHZtLiRjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodm0sIGEsIGIsIGMsIGQsIHRydWUpOyB9O1xuXG4gIC8vICRhdHRycyAmICRsaXN0ZW5lcnMgYXJlIGV4cG9zZWQgZm9yIGVhc2llciBIT0MgY3JlYXRpb24uXG4gIC8vIHRoZXkgbmVlZCB0byBiZSByZWFjdGl2ZSBzbyB0aGF0IEhPQ3MgdXNpbmcgdGhlbSBhcmUgYWx3YXlzIHVwZGF0ZWRcbiAgdmFyIHBhcmVudERhdGEgPSBwYXJlbnRWbm9kZSAmJiBwYXJlbnRWbm9kZS5kYXRhO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZGVmaW5lUmVhY3RpdmUkJDEodm0sICckYXR0cnMnLCBwYXJlbnREYXRhICYmIHBhcmVudERhdGEuYXR0cnMgfHwgZW1wdHlPYmplY3QsIGZ1bmN0aW9uICgpIHtcbiAgICAgICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgJiYgd2FybihcIiRhdHRycyBpcyByZWFkb25seS5cIiwgdm0pO1xuICAgIH0sIHRydWUpO1xuICAgIGRlZmluZVJlYWN0aXZlJCQxKHZtLCAnJGxpc3RlbmVycycsIG9wdGlvbnMuX3BhcmVudExpc3RlbmVycyB8fCBlbXB0eU9iamVjdCwgZnVuY3Rpb24gKCkge1xuICAgICAgIWlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCAmJiB3YXJuKFwiJGxpc3RlbmVycyBpcyByZWFkb25seS5cIiwgdm0pO1xuICAgIH0sIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGRlZmluZVJlYWN0aXZlJCQxKHZtLCAnJGF0dHJzJywgcGFyZW50RGF0YSAmJiBwYXJlbnREYXRhLmF0dHJzIHx8IGVtcHR5T2JqZWN0LCBudWxsLCB0cnVlKTtcbiAgICBkZWZpbmVSZWFjdGl2ZSQkMSh2bSwgJyRsaXN0ZW5lcnMnLCBvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3QsIG51bGwsIHRydWUpO1xuICB9XG59XG5cbnZhciBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UgPSBudWxsO1xuXG5mdW5jdGlvbiByZW5kZXJNaXhpbiAoVnVlKSB7XG4gIC8vIGluc3RhbGwgcnVudGltZSBjb252ZW5pZW5jZSBoZWxwZXJzXG4gIGluc3RhbGxSZW5kZXJIZWxwZXJzKFZ1ZS5wcm90b3R5cGUpO1xuXG4gIFZ1ZS5wcm90b3R5cGUuJG5leHRUaWNrID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgcmV0dXJuIG5leHRUaWNrKGZuLCB0aGlzKVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIHZhciByZWYgPSB2bS4kb3B0aW9ucztcbiAgICB2YXIgcmVuZGVyID0gcmVmLnJlbmRlcjtcbiAgICB2YXIgX3BhcmVudFZub2RlID0gcmVmLl9wYXJlbnRWbm9kZTtcblxuICAgIGlmIChfcGFyZW50Vm5vZGUpIHtcbiAgICAgIHZtLiRzY29wZWRTbG90cyA9IG5vcm1hbGl6ZVNjb3BlZFNsb3RzKFxuICAgICAgICBfcGFyZW50Vm5vZGUuZGF0YS5zY29wZWRTbG90cyxcbiAgICAgICAgdm0uJHNsb3RzLFxuICAgICAgICB2bS4kc2NvcGVkU2xvdHNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHBhcmVudCB2bm9kZS4gdGhpcyBhbGxvd3MgcmVuZGVyIGZ1bmN0aW9ucyB0byBoYXZlIGFjY2Vzc1xuICAgIC8vIHRvIHRoZSBkYXRhIG9uIHRoZSBwbGFjZWhvbGRlciBub2RlLlxuICAgIHZtLiR2bm9kZSA9IF9wYXJlbnRWbm9kZTtcbiAgICAvLyByZW5kZXIgc2VsZlxuICAgIHZhciB2bm9kZTtcbiAgICB0cnkge1xuICAgICAgLy8gVGhlcmUncyBubyBuZWVkIHRvIG1haW50YWluIGEgc3RhY2sgYmVjYXVzZSBhbGwgcmVuZGVyIGZucyBhcmUgY2FsbGVkXG4gICAgICAvLyBzZXBhcmF0ZWx5IGZyb20gb25lIGFub3RoZXIuIE5lc3RlZCBjb21wb25lbnQncyByZW5kZXIgZm5zIGFyZSBjYWxsZWRcbiAgICAgIC8vIHdoZW4gcGFyZW50IGNvbXBvbmVudCBpcyBwYXRjaGVkLlxuICAgICAgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlID0gdm07XG4gICAgICB2bm9kZSA9IHJlbmRlci5jYWxsKHZtLl9yZW5kZXJQcm94eSwgdm0uJGNyZWF0ZUVsZW1lbnQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCBcInJlbmRlclwiKTtcbiAgICAgIC8vIHJldHVybiBlcnJvciByZW5kZXIgcmVzdWx0LFxuICAgICAgLy8gb3IgcHJldmlvdXMgdm5vZGUgdG8gcHJldmVudCByZW5kZXIgZXJyb3IgY2F1c2luZyBibGFuayBjb21wb25lbnRcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB2bS4kb3B0aW9ucy5yZW5kZXJFcnJvcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZub2RlID0gdm0uJG9wdGlvbnMucmVuZGVyRXJyb3IuY2FsbCh2bS5fcmVuZGVyUHJveHksIHZtLiRjcmVhdGVFbGVtZW50LCBlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCBcInJlbmRlckVycm9yXCIpO1xuICAgICAgICAgIHZub2RlID0gdm0uX3Zub2RlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2bm9kZSA9IHZtLl92bm9kZTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlID0gbnVsbDtcbiAgICB9XG4gICAgLy8gaWYgdGhlIHJldHVybmVkIGFycmF5IGNvbnRhaW5zIG9ubHkgYSBzaW5nbGUgbm9kZSwgYWxsb3cgaXRcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZSkgJiYgdm5vZGUubGVuZ3RoID09PSAxKSB7XG4gICAgICB2bm9kZSA9IHZub2RlWzBdO1xuICAgIH1cbiAgICAvLyByZXR1cm4gZW1wdHkgdm5vZGUgaW4gY2FzZSB0aGUgcmVuZGVyIGZ1bmN0aW9uIGVycm9yZWQgb3V0XG4gICAgaWYgKCEodm5vZGUgaW5zdGFuY2VvZiBWTm9kZSkpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIEFycmF5LmlzQXJyYXkodm5vZGUpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ011bHRpcGxlIHJvb3Qgbm9kZXMgcmV0dXJuZWQgZnJvbSByZW5kZXIgZnVuY3Rpb24uIFJlbmRlciBmdW5jdGlvbiAnICtcbiAgICAgICAgICAnc2hvdWxkIHJldHVybiBhIHNpbmdsZSByb290IG5vZGUuJyxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdm5vZGUgPSBjcmVhdGVFbXB0eVZOb2RlKCk7XG4gICAgfVxuICAgIC8vIHNldCBwYXJlbnRcbiAgICB2bm9kZS5wYXJlbnQgPSBfcGFyZW50Vm5vZGU7XG4gICAgcmV0dXJuIHZub2RlXG4gIH07XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBlbnN1cmVDdG9yIChjb21wLCBiYXNlKSB7XG4gIGlmIChcbiAgICBjb21wLl9fZXNNb2R1bGUgfHxcbiAgICAoaGFzU3ltYm9sICYmIGNvbXBbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ01vZHVsZScpXG4gICkge1xuICAgIGNvbXAgPSBjb21wLmRlZmF1bHQ7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KGNvbXApXG4gICAgPyBiYXNlLmV4dGVuZChjb21wKVxuICAgIDogY29tcFxufVxuXG5mdW5jdGlvbiBjcmVhdGVBc3luY1BsYWNlaG9sZGVyIChcbiAgZmFjdG9yeSxcbiAgZGF0YSxcbiAgY29udGV4dCxcbiAgY2hpbGRyZW4sXG4gIHRhZ1xuKSB7XG4gIHZhciBub2RlID0gY3JlYXRlRW1wdHlWTm9kZSgpO1xuICBub2RlLmFzeW5jRmFjdG9yeSA9IGZhY3Rvcnk7XG4gIG5vZGUuYXN5bmNNZXRhID0geyBkYXRhOiBkYXRhLCBjb250ZXh0OiBjb250ZXh0LCBjaGlsZHJlbjogY2hpbGRyZW4sIHRhZzogdGFnIH07XG4gIHJldHVybiBub2RlXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVBc3luY0NvbXBvbmVudCAoXG4gIGZhY3RvcnksXG4gIGJhc2VDdG9yXG4pIHtcbiAgaWYgKGlzVHJ1ZShmYWN0b3J5LmVycm9yKSAmJiBpc0RlZihmYWN0b3J5LmVycm9yQ29tcCkpIHtcbiAgICByZXR1cm4gZmFjdG9yeS5lcnJvckNvbXBcbiAgfVxuXG4gIGlmIChpc0RlZihmYWN0b3J5LnJlc29sdmVkKSkge1xuICAgIHJldHVybiBmYWN0b3J5LnJlc29sdmVkXG4gIH1cblxuICB2YXIgb3duZXIgPSBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2U7XG4gIGlmIChvd25lciAmJiBpc0RlZihmYWN0b3J5Lm93bmVycykgJiYgZmFjdG9yeS5vd25lcnMuaW5kZXhPZihvd25lcikgPT09IC0xKSB7XG4gICAgLy8gYWxyZWFkeSBwZW5kaW5nXG4gICAgZmFjdG9yeS5vd25lcnMucHVzaChvd25lcik7XG4gIH1cblxuICBpZiAoaXNUcnVlKGZhY3RvcnkubG9hZGluZykgJiYgaXNEZWYoZmFjdG9yeS5sb2FkaW5nQ29tcCkpIHtcbiAgICByZXR1cm4gZmFjdG9yeS5sb2FkaW5nQ29tcFxuICB9XG5cbiAgaWYgKG93bmVyICYmICFpc0RlZihmYWN0b3J5Lm93bmVycykpIHtcbiAgICB2YXIgb3duZXJzID0gZmFjdG9yeS5vd25lcnMgPSBbb3duZXJdO1xuICAgIHZhciBzeW5jID0gdHJ1ZTtcbiAgICB2YXIgdGltZXJMb2FkaW5nID0gbnVsbDtcbiAgICB2YXIgdGltZXJUaW1lb3V0ID0gbnVsbFxuXG4gICAgOyhvd25lcikuJG9uKCdob29rOmRlc3Ryb3llZCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW92ZShvd25lcnMsIG93bmVyKTsgfSk7XG5cbiAgICB2YXIgZm9yY2VSZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyQ29tcGxldGVkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG93bmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgKG93bmVyc1tpXSkuJGZvcmNlVXBkYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZW5kZXJDb21wbGV0ZWQpIHtcbiAgICAgICAgb3duZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgIGlmICh0aW1lckxvYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJMb2FkaW5nKTtcbiAgICAgICAgICB0aW1lckxvYWRpbmcgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lclRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJUaW1lb3V0KTtcbiAgICAgICAgICB0aW1lclRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciByZXNvbHZlID0gb25jZShmdW5jdGlvbiAocmVzKSB7XG4gICAgICAvLyBjYWNoZSByZXNvbHZlZFxuICAgICAgZmFjdG9yeS5yZXNvbHZlZCA9IGVuc3VyZUN0b3IocmVzLCBiYXNlQ3Rvcik7XG4gICAgICAvLyBpbnZva2UgY2FsbGJhY2tzIG9ubHkgaWYgdGhpcyBpcyBub3QgYSBzeW5jaHJvbm91cyByZXNvbHZlXG4gICAgICAvLyAoYXN5bmMgcmVzb2x2ZXMgYXJlIHNoaW1tZWQgYXMgc3luY2hyb25vdXMgZHVyaW5nIFNTUilcbiAgICAgIGlmICghc3luYykge1xuICAgICAgICBmb3JjZVJlbmRlcih0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG93bmVycy5sZW5ndGggPSAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHJlamVjdCA9IG9uY2UoZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIkZhaWxlZCB0byByZXNvbHZlIGFzeW5jIGNvbXBvbmVudDogXCIgKyAoU3RyaW5nKGZhY3RvcnkpKSArXG4gICAgICAgIChyZWFzb24gPyAoXCJcXG5SZWFzb246IFwiICsgcmVhc29uKSA6ICcnKVxuICAgICAgKTtcbiAgICAgIGlmIChpc0RlZihmYWN0b3J5LmVycm9yQ29tcCkpIHtcbiAgICAgICAgZmFjdG9yeS5lcnJvciA9IHRydWU7XG4gICAgICAgIGZvcmNlUmVuZGVyKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHJlcyA9IGZhY3RvcnkocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgIGlmIChpc09iamVjdChyZXMpKSB7XG4gICAgICBpZiAoaXNQcm9taXNlKHJlcykpIHtcbiAgICAgICAgLy8gKCkgPT4gUHJvbWlzZVxuICAgICAgICBpZiAoaXNVbmRlZihmYWN0b3J5LnJlc29sdmVkKSkge1xuICAgICAgICAgIHJlcy50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNQcm9taXNlKHJlcy5jb21wb25lbnQpKSB7XG4gICAgICAgIHJlcy5jb21wb25lbnQudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIGlmIChpc0RlZihyZXMuZXJyb3IpKSB7XG4gICAgICAgICAgZmFjdG9yeS5lcnJvckNvbXAgPSBlbnN1cmVDdG9yKHJlcy5lcnJvciwgYmFzZUN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGVmKHJlcy5sb2FkaW5nKSkge1xuICAgICAgICAgIGZhY3RvcnkubG9hZGluZ0NvbXAgPSBlbnN1cmVDdG9yKHJlcy5sb2FkaW5nLCBiYXNlQ3Rvcik7XG4gICAgICAgICAgaWYgKHJlcy5kZWxheSA9PT0gMCkge1xuICAgICAgICAgICAgZmFjdG9yeS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZXJMb2FkaW5nID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRpbWVyTG9hZGluZyA9IG51bGw7XG4gICAgICAgICAgICAgIGlmIChpc1VuZGVmKGZhY3RvcnkucmVzb2x2ZWQpICYmIGlzVW5kZWYoZmFjdG9yeS5lcnJvcikpIHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5LmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvcmNlUmVuZGVyKGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmVzLmRlbGF5IHx8IDIwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGVmKHJlcy50aW1lb3V0KSkge1xuICAgICAgICAgIHRpbWVyVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZXJUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKGZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG4gICAgICAgICAgICAgICAgICA/IChcInRpbWVvdXQgKFwiICsgKHJlcy50aW1lb3V0KSArIFwibXMpXCIpXG4gICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCByZXMudGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzeW5jID0gZmFsc2U7XG4gICAgLy8gcmV0dXJuIGluIGNhc2UgcmVzb2x2ZWQgc3luY2hyb25vdXNseVxuICAgIHJldHVybiBmYWN0b3J5LmxvYWRpbmdcbiAgICAgID8gZmFjdG9yeS5sb2FkaW5nQ29tcFxuICAgICAgOiBmYWN0b3J5LnJlc29sdmVkXG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGlzQXN5bmNQbGFjZWhvbGRlciAobm9kZSkge1xuICByZXR1cm4gbm9kZS5pc0NvbW1lbnQgJiYgbm9kZS5hc3luY0ZhY3Rvcnlcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGdldEZpcnN0Q29tcG9uZW50Q2hpbGQgKGNoaWxkcmVuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2hpbGRyZW5baV07XG4gICAgICBpZiAoaXNEZWYoYykgJiYgKGlzRGVmKGMuY29tcG9uZW50T3B0aW9ucykgfHwgaXNBc3luY1BsYWNlaG9sZGVyKGMpKSkge1xuICAgICAgICByZXR1cm4gY1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRFdmVudHMgKHZtKSB7XG4gIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2bS5faGFzSG9va0V2ZW50ID0gZmFsc2U7XG4gIC8vIGluaXQgcGFyZW50IGF0dGFjaGVkIGV2ZW50c1xuICB2YXIgbGlzdGVuZXJzID0gdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgaWYgKGxpc3RlbmVycykge1xuICAgIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyh2bSwgbGlzdGVuZXJzKTtcbiAgfVxufVxuXG52YXIgdGFyZ2V0O1xuXG5mdW5jdGlvbiBhZGQgKGV2ZW50LCBmbikge1xuICB0YXJnZXQuJG9uKGV2ZW50LCBmbik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSQxIChldmVudCwgZm4pIHtcbiAgdGFyZ2V0LiRvZmYoZXZlbnQsIGZuKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT25jZUhhbmRsZXIgKGV2ZW50LCBmbikge1xuICB2YXIgX3RhcmdldCA9IHRhcmdldDtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uY2VIYW5kbGVyICgpIHtcbiAgICB2YXIgcmVzID0gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICBpZiAocmVzICE9PSBudWxsKSB7XG4gICAgICBfdGFyZ2V0LiRvZmYoZXZlbnQsIG9uY2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50TGlzdGVuZXJzIChcbiAgdm0sXG4gIGxpc3RlbmVycyxcbiAgb2xkTGlzdGVuZXJzXG4pIHtcbiAgdGFyZ2V0ID0gdm07XG4gIHVwZGF0ZUxpc3RlbmVycyhsaXN0ZW5lcnMsIG9sZExpc3RlbmVycyB8fCB7fSwgYWRkLCByZW1vdmUkMSwgY3JlYXRlT25jZUhhbmRsZXIsIHZtKTtcbiAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBldmVudHNNaXhpbiAoVnVlKSB7XG4gIHZhciBob29rUkUgPSAvXmhvb2s6LztcbiAgVnVlLnByb3RvdHlwZS4kb24gPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZtLiRvbihldmVudFtpXSwgZm4pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAodm0uX2V2ZW50c1tldmVudF0gfHwgKHZtLl9ldmVudHNbZXZlbnRdID0gW10pKS5wdXNoKGZuKTtcbiAgICAgIC8vIG9wdGltaXplIGhvb2s6ZXZlbnQgY29zdCBieSB1c2luZyBhIGJvb2xlYW4gZmxhZyBtYXJrZWQgYXQgcmVnaXN0cmF0aW9uXG4gICAgICAvLyBpbnN0ZWFkIG9mIGEgaGFzaCBsb29rdXBcbiAgICAgIGlmIChob29rUkUudGVzdChldmVudCkpIHtcbiAgICAgICAgdm0uX2hhc0hvb2tFdmVudCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2bVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJG9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBmdW5jdGlvbiBvbiAoKSB7XG4gICAgICB2bS4kb2ZmKGV2ZW50LCBvbik7XG4gICAgICBmbi5hcHBseSh2bSwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgb24uZm4gPSBmbjtcbiAgICB2bS4kb24oZXZlbnQsIG9uKTtcbiAgICByZXR1cm4gdm1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRvZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICAvLyBhbGxcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIC8vIGFycmF5IG9mIGV2ZW50c1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yICh2YXIgaSQxID0gMCwgbCA9IGV2ZW50Lmxlbmd0aDsgaSQxIDwgbDsgaSQxKyspIHtcbiAgICAgICAgdm0uJG9mZihldmVudFtpJDFdLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgICB2YXIgY2JzID0gdm0uX2V2ZW50c1tldmVudF07XG4gICAgaWYgKCFjYnMpIHtcbiAgICAgIHJldHVybiB2bVxuICAgIH1cbiAgICBpZiAoIWZuKSB7XG4gICAgICB2bS5fZXZlbnRzW2V2ZW50XSA9IG51bGw7XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgLy8gc3BlY2lmaWMgaGFuZGxlclxuICAgIHZhciBjYjtcbiAgICB2YXIgaSA9IGNicy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY2IgPSBjYnNbaV07XG4gICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgICBjYnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIGxvd2VyQ2FzZUV2ZW50ID0gZXZlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChsb3dlckNhc2VFdmVudCAhPT0gZXZlbnQgJiYgdm0uX2V2ZW50c1tsb3dlckNhc2VFdmVudF0pIHtcbiAgICAgICAgdGlwKFxuICAgICAgICAgIFwiRXZlbnQgXFxcIlwiICsgbG93ZXJDYXNlRXZlbnQgKyBcIlxcXCIgaXMgZW1pdHRlZCBpbiBjb21wb25lbnQgXCIgK1xuICAgICAgICAgIChmb3JtYXRDb21wb25lbnROYW1lKHZtKSkgKyBcIiBidXQgdGhlIGhhbmRsZXIgaXMgcmVnaXN0ZXJlZCBmb3IgXFxcIlwiICsgZXZlbnQgKyBcIlxcXCIuIFwiICtcbiAgICAgICAgICBcIk5vdGUgdGhhdCBIVE1MIGF0dHJpYnV0ZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmUgYW5kIHlvdSBjYW5ub3QgdXNlIFwiICtcbiAgICAgICAgICBcInYtb24gdG8gbGlzdGVuIHRvIGNhbWVsQ2FzZSBldmVudHMgd2hlbiB1c2luZyBpbi1ET00gdGVtcGxhdGVzLiBcIiArXG4gICAgICAgICAgXCJZb3Ugc2hvdWxkIHByb2JhYmx5IHVzZSBcXFwiXCIgKyAoaHlwaGVuYXRlKGV2ZW50KSkgKyBcIlxcXCIgaW5zdGVhZCBvZiBcXFwiXCIgKyBldmVudCArIFwiXFxcIi5cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2JzID0gdm0uX2V2ZW50c1tldmVudF07XG4gICAgaWYgKGNicykge1xuICAgICAgY2JzID0gY2JzLmxlbmd0aCA+IDEgPyB0b0FycmF5KGNicykgOiBjYnM7XG4gICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICAgIHZhciBpbmZvID0gXCJldmVudCBoYW5kbGVyIGZvciBcXFwiXCIgKyBldmVudCArIFwiXFxcIlwiO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGludm9rZVdpdGhFcnJvckhhbmRsaW5nKGNic1tpXSwgdm0sIGFyZ3MsIHZtLCBpbmZvKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZtXG4gIH07XG59XG5cbi8qICAqL1xuXG52YXIgYWN0aXZlSW5zdGFuY2UgPSBudWxsO1xudmFyIGlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBzZXRBY3RpdmVJbnN0YW5jZSh2bSkge1xuICB2YXIgcHJldkFjdGl2ZUluc3RhbmNlID0gYWN0aXZlSW5zdGFuY2U7XG4gIGFjdGl2ZUluc3RhbmNlID0gdm07XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgYWN0aXZlSW5zdGFuY2UgPSBwcmV2QWN0aXZlSW5zdGFuY2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdExpZmVjeWNsZSAodm0pIHtcbiAgdmFyIG9wdGlvbnMgPSB2bS4kb3B0aW9ucztcblxuICAvLyBsb2NhdGUgZmlyc3Qgbm9uLWFic3RyYWN0IHBhcmVudFxuICB2YXIgcGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ7XG4gIGlmIChwYXJlbnQgJiYgIW9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICB3aGlsZSAocGFyZW50LiRvcHRpb25zLmFic3RyYWN0ICYmIHBhcmVudC4kcGFyZW50KSB7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQuJHBhcmVudDtcbiAgICB9XG4gICAgcGFyZW50LiRjaGlsZHJlbi5wdXNoKHZtKTtcbiAgfVxuXG4gIHZtLiRwYXJlbnQgPSBwYXJlbnQ7XG4gIHZtLiRyb290ID0gcGFyZW50ID8gcGFyZW50LiRyb290IDogdm07XG5cbiAgdm0uJGNoaWxkcmVuID0gW107XG4gIHZtLiRyZWZzID0ge307XG5cbiAgdm0uX3dhdGNoZXIgPSBudWxsO1xuICB2bS5faW5hY3RpdmUgPSBudWxsO1xuICB2bS5fZGlyZWN0SW5hY3RpdmUgPSBmYWxzZTtcbiAgdm0uX2lzTW91bnRlZCA9IGZhbHNlO1xuICB2bS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcbiAgdm0uX2lzQmVpbmdEZXN0cm95ZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbGlmZWN5Y2xlTWl4aW4gKFZ1ZSkge1xuICBWdWUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAodm5vZGUsIGh5ZHJhdGluZykge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdmFyIHByZXZFbCA9IHZtLiRlbDtcbiAgICB2YXIgcHJldlZub2RlID0gdm0uX3Zub2RlO1xuICAgIHZhciByZXN0b3JlQWN0aXZlSW5zdGFuY2UgPSBzZXRBY3RpdmVJbnN0YW5jZSh2bSk7XG4gICAgdm0uX3Zub2RlID0gdm5vZGU7XG4gICAgLy8gVnVlLnByb3RvdHlwZS5fX3BhdGNoX18gaXMgaW5qZWN0ZWQgaW4gZW50cnkgcG9pbnRzXG4gICAgLy8gYmFzZWQgb24gdGhlIHJlbmRlcmluZyBiYWNrZW5kIHVzZWQuXG4gICAgaWYgKCFwcmV2Vm5vZGUpIHtcbiAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICB2bS4kZWwgPSB2bS5fX3BhdGNoX18odm0uJGVsLCB2bm9kZSwgaHlkcmF0aW5nLCBmYWxzZSAvKiByZW1vdmVPbmx5ICovKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdXBkYXRlc1xuICAgICAgdm0uJGVsID0gdm0uX19wYXRjaF9fKHByZXZWbm9kZSwgdm5vZGUpO1xuICAgIH1cbiAgICByZXN0b3JlQWN0aXZlSW5zdGFuY2UoKTtcbiAgICAvLyB1cGRhdGUgX192dWVfXyByZWZlcmVuY2VcbiAgICBpZiAocHJldkVsKSB7XG4gICAgICBwcmV2RWwuX192dWVfXyA9IG51bGw7XG4gICAgfVxuICAgIGlmICh2bS4kZWwpIHtcbiAgICAgIHZtLiRlbC5fX3Z1ZV9fID0gdm07XG4gICAgfVxuICAgIC8vIGlmIHBhcmVudCBpcyBhbiBIT0MsIHVwZGF0ZSBpdHMgJGVsIGFzIHdlbGxcbiAgICBpZiAodm0uJHZub2RlICYmIHZtLiRwYXJlbnQgJiYgdm0uJHZub2RlID09PSB2bS4kcGFyZW50Ll92bm9kZSkge1xuICAgICAgdm0uJHBhcmVudC4kZWwgPSB2bS4kZWw7XG4gICAgfVxuICAgIC8vIHVwZGF0ZWQgaG9vayBpcyBjYWxsZWQgYnkgdGhlIHNjaGVkdWxlciB0byBlbnN1cmUgdGhhdCBjaGlsZHJlbiBhcmVcbiAgICAvLyB1cGRhdGVkIGluIGEgcGFyZW50J3MgdXBkYXRlZCBob29rLlxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHZtLl93YXRjaGVyKSB7XG4gICAgICB2bS5fd2F0Y2hlci51cGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmICh2bS5faXNCZWluZ0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlRGVzdHJveScpO1xuICAgIHZtLl9pc0JlaW5nRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHBhcmVudFxuICAgIHZhciBwYXJlbnQgPSB2bS4kcGFyZW50O1xuICAgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNCZWluZ0Rlc3Ryb3llZCAmJiAhdm0uJG9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICAgIHJlbW92ZShwYXJlbnQuJGNoaWxkcmVuLCB2bSk7XG4gICAgfVxuICAgIC8vIHRlYXJkb3duIHdhdGNoZXJzXG4gICAgaWYgKHZtLl93YXRjaGVyKSB7XG4gICAgICB2bS5fd2F0Y2hlci50ZWFyZG93bigpO1xuICAgIH1cbiAgICB2YXIgaSA9IHZtLl93YXRjaGVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdm0uX3dhdGNoZXJzW2ldLnRlYXJkb3duKCk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZWZlcmVuY2UgZnJvbSBkYXRhIG9iXG4gICAgLy8gZnJvemVuIG9iamVjdCBtYXkgbm90IGhhdmUgb2JzZXJ2ZXIuXG4gICAgaWYgKHZtLl9kYXRhLl9fb2JfXykge1xuICAgICAgdm0uX2RhdGEuX19vYl9fLnZtQ291bnQtLTtcbiAgICB9XG4gICAgLy8gY2FsbCB0aGUgbGFzdCBob29rLi4uXG4gICAgdm0uX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAvLyBpbnZva2UgZGVzdHJveSBob29rcyBvbiBjdXJyZW50IHJlbmRlcmVkIHRyZWVcbiAgICB2bS5fX3BhdGNoX18odm0uX3Zub2RlLCBudWxsKTtcbiAgICAvLyBmaXJlIGRlc3Ryb3llZCBob29rXG4gICAgY2FsbEhvb2sodm0sICdkZXN0cm95ZWQnKTtcbiAgICAvLyB0dXJuIG9mZiBhbGwgaW5zdGFuY2UgbGlzdGVuZXJzLlxuICAgIHZtLiRvZmYoKTtcbiAgICAvLyByZW1vdmUgX192dWVfXyByZWZlcmVuY2VcbiAgICBpZiAodm0uJGVsKSB7XG4gICAgICB2bS4kZWwuX192dWVfXyA9IG51bGw7XG4gICAgfVxuICAgIC8vIHJlbGVhc2UgY2lyY3VsYXIgcmVmZXJlbmNlICgjNjc1OSlcbiAgICBpZiAodm0uJHZub2RlKSB7XG4gICAgICB2bS4kdm5vZGUucGFyZW50ID0gbnVsbDtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoaWxkQ29tcG9uZW50IChcbiAgdm0sXG4gIHByb3BzRGF0YSxcbiAgbGlzdGVuZXJzLFxuICBwYXJlbnRWbm9kZSxcbiAgcmVuZGVyQ2hpbGRyZW5cbikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCA9IHRydWU7XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgd2hldGhlciBjb21wb25lbnQgaGFzIHNsb3QgY2hpbGRyZW5cbiAgLy8gd2UgbmVlZCB0byBkbyB0aGlzIGJlZm9yZSBvdmVyd3JpdGluZyAkb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4uXG5cbiAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGR5bmFtaWMgc2NvcGVkU2xvdHMgKGhhbmQtd3JpdHRlbiBvciBjb21waWxlZCBidXQgd2l0aFxuICAvLyBkeW5hbWljIHNsb3QgbmFtZXMpLiBTdGF0aWMgc2NvcGVkIHNsb3RzIGNvbXBpbGVkIGZyb20gdGVtcGxhdGUgaGFzIHRoZVxuICAvLyBcIiRzdGFibGVcIiBtYXJrZXIuXG4gIHZhciBuZXdTY29wZWRTbG90cyA9IHBhcmVudFZub2RlLmRhdGEuc2NvcGVkU2xvdHM7XG4gIHZhciBvbGRTY29wZWRTbG90cyA9IHZtLiRzY29wZWRTbG90cztcbiAgdmFyIGhhc0R5bmFtaWNTY29wZWRTbG90ID0gISEoXG4gICAgKG5ld1Njb3BlZFNsb3RzICYmICFuZXdTY29wZWRTbG90cy4kc3RhYmxlKSB8fFxuICAgIChvbGRTY29wZWRTbG90cyAhPT0gZW1wdHlPYmplY3QgJiYgIW9sZFNjb3BlZFNsb3RzLiRzdGFibGUpIHx8XG4gICAgKG5ld1Njb3BlZFNsb3RzICYmIHZtLiRzY29wZWRTbG90cy4ka2V5ICE9PSBuZXdTY29wZWRTbG90cy4ka2V5KVxuICApO1xuXG4gIC8vIEFueSBzdGF0aWMgc2xvdCBjaGlsZHJlbiBmcm9tIHRoZSBwYXJlbnQgbWF5IGhhdmUgY2hhbmdlZCBkdXJpbmcgcGFyZW50J3NcbiAgLy8gdXBkYXRlLiBEeW5hbWljIHNjb3BlZCBzbG90cyBtYXkgYWxzbyBoYXZlIGNoYW5nZWQuIEluIHN1Y2ggY2FzZXMsIGEgZm9yY2VkXG4gIC8vIHVwZGF0ZSBpcyBuZWNlc3NhcnkgdG8gZW5zdXJlIGNvcnJlY3RuZXNzLlxuICB2YXIgbmVlZHNGb3JjZVVwZGF0ZSA9ICEhKFxuICAgIHJlbmRlckNoaWxkcmVuIHx8ICAgICAgICAgICAgICAgLy8gaGFzIG5ldyBzdGF0aWMgc2xvdHNcbiAgICB2bS4kb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4gfHwgIC8vIGhhcyBvbGQgc3RhdGljIHNsb3RzXG4gICAgaGFzRHluYW1pY1Njb3BlZFNsb3RcbiAgKTtcblxuICB2bS4kb3B0aW9ucy5fcGFyZW50Vm5vZGUgPSBwYXJlbnRWbm9kZTtcbiAgdm0uJHZub2RlID0gcGFyZW50Vm5vZGU7IC8vIHVwZGF0ZSB2bSdzIHBsYWNlaG9sZGVyIG5vZGUgd2l0aG91dCByZS1yZW5kZXJcblxuICBpZiAodm0uX3Zub2RlKSB7IC8vIHVwZGF0ZSBjaGlsZCB0cmVlJ3MgcGFyZW50XG4gICAgdm0uX3Zub2RlLnBhcmVudCA9IHBhcmVudFZub2RlO1xuICB9XG4gIHZtLiRvcHRpb25zLl9yZW5kZXJDaGlsZHJlbiA9IHJlbmRlckNoaWxkcmVuO1xuXG4gIC8vIHVwZGF0ZSAkYXR0cnMgYW5kICRsaXN0ZW5lcnMgaGFzaFxuICAvLyB0aGVzZSBhcmUgYWxzbyByZWFjdGl2ZSBzbyB0aGV5IG1heSB0cmlnZ2VyIGNoaWxkIHVwZGF0ZSBpZiB0aGUgY2hpbGRcbiAgLy8gdXNlZCB0aGVtIGR1cmluZyByZW5kZXJcbiAgdm0uJGF0dHJzID0gcGFyZW50Vm5vZGUuZGF0YS5hdHRycyB8fCBlbXB0eU9iamVjdDtcbiAgdm0uJGxpc3RlbmVycyA9IGxpc3RlbmVycyB8fCBlbXB0eU9iamVjdDtcblxuICAvLyB1cGRhdGUgcHJvcHNcbiAgaWYgKHByb3BzRGF0YSAmJiB2bS4kb3B0aW9ucy5wcm9wcykge1xuICAgIHRvZ2dsZU9ic2VydmluZyhmYWxzZSk7XG4gICAgdmFyIHByb3BzID0gdm0uX3Byb3BzO1xuICAgIHZhciBwcm9wS2V5cyA9IHZtLiRvcHRpb25zLl9wcm9wS2V5cyB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcEtleXNbaV07XG4gICAgICB2YXIgcHJvcE9wdGlvbnMgPSB2bS4kb3B0aW9ucy5wcm9wczsgLy8gd3RmIGZsb3c/XG4gICAgICBwcm9wc1trZXldID0gdmFsaWRhdGVQcm9wKGtleSwgcHJvcE9wdGlvbnMsIHByb3BzRGF0YSwgdm0pO1xuICAgIH1cbiAgICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG4gICAgLy8ga2VlcCBhIGNvcHkgb2YgcmF3IHByb3BzRGF0YVxuICAgIHZtLiRvcHRpb25zLnByb3BzRGF0YSA9IHByb3BzRGF0YTtcbiAgfVxuICBcbiAgLy8gZml4ZWQgYnkgeHh4eHh4IHVwZGF0ZSBwcm9wZXJ0aWVzKG1wIHJ1bnRpbWUpXG4gIHZtLl8kdXBkYXRlUHJvcGVydGllcyAmJiB2bS5fJHVwZGF0ZVByb3BlcnRpZXModm0pO1xuICBcbiAgLy8gdXBkYXRlIGxpc3RlbmVyc1xuICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3Q7XG4gIHZhciBvbGRMaXN0ZW5lcnMgPSB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzID0gbGlzdGVuZXJzO1xuICB1cGRhdGVDb21wb25lbnRMaXN0ZW5lcnModm0sIGxpc3RlbmVycywgb2xkTGlzdGVuZXJzKTtcblxuICAvLyByZXNvbHZlIHNsb3RzICsgZm9yY2UgdXBkYXRlIGlmIGhhcyBjaGlsZHJlblxuICBpZiAobmVlZHNGb3JjZVVwZGF0ZSkge1xuICAgIHZtLiRzbG90cyA9IHJlc29sdmVTbG90cyhyZW5kZXJDaGlsZHJlbiwgcGFyZW50Vm5vZGUuY29udGV4dCk7XG4gICAgdm0uJGZvcmNlVXBkYXRlKCk7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzSW5JbmFjdGl2ZVRyZWUgKHZtKSB7XG4gIHdoaWxlICh2bSAmJiAodm0gPSB2bS4kcGFyZW50KSkge1xuICAgIGlmICh2bS5faW5hY3RpdmUpIHsgcmV0dXJuIHRydWUgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50ICh2bSwgZGlyZWN0KSB7XG4gIGlmIChkaXJlY3QpIHtcbiAgICB2bS5fZGlyZWN0SW5hY3RpdmUgPSBmYWxzZTtcbiAgICBpZiAoaXNJbkluYWN0aXZlVHJlZSh2bSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSBlbHNlIGlmICh2bS5fZGlyZWN0SW5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodm0uX2luYWN0aXZlIHx8IHZtLl9pbmFjdGl2ZSA9PT0gbnVsbCkge1xuICAgIHZtLl9pbmFjdGl2ZSA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm0uJGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KHZtLiRjaGlsZHJlbltpXSk7XG4gICAgfVxuICAgIGNhbGxIb29rKHZtLCAnYWN0aXZhdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50ICh2bSwgZGlyZWN0KSB7XG4gIGlmIChkaXJlY3QpIHtcbiAgICB2bS5fZGlyZWN0SW5hY3RpdmUgPSB0cnVlO1xuICAgIGlmIChpc0luSW5hY3RpdmVUcmVlKHZtKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG4gIGlmICghdm0uX2luYWN0aXZlKSB7XG4gICAgdm0uX2luYWN0aXZlID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZtLiRjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KHZtLiRjaGlsZHJlbltpXSk7XG4gICAgfVxuICAgIGNhbGxIb29rKHZtLCAnZGVhY3RpdmF0ZWQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsSG9vayAodm0sIGhvb2spIHtcbiAgLy8gIzc1NzMgZGlzYWJsZSBkZXAgY29sbGVjdGlvbiB3aGVuIGludm9raW5nIGxpZmVjeWNsZSBob29rc1xuICBwdXNoVGFyZ2V0KCk7XG4gIHZhciBoYW5kbGVycyA9IHZtLiRvcHRpb25zW2hvb2tdO1xuICB2YXIgaW5mbyA9IGhvb2sgKyBcIiBob29rXCI7XG4gIGlmIChoYW5kbGVycykge1xuICAgIGZvciAodmFyIGkgPSAwLCBqID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICBpbnZva2VXaXRoRXJyb3JIYW5kbGluZyhoYW5kbGVyc1tpXSwgdm0sIG51bGwsIHZtLCBpbmZvKTtcbiAgICB9XG4gIH1cbiAgaWYgKHZtLl9oYXNIb29rRXZlbnQpIHtcbiAgICB2bS4kZW1pdCgnaG9vazonICsgaG9vayk7XG4gIH1cbiAgcG9wVGFyZ2V0KCk7XG59XG5cbi8qICAqL1xuXG52YXIgTUFYX1VQREFURV9DT1VOVCA9IDEwMDtcblxudmFyIHF1ZXVlID0gW107XG52YXIgYWN0aXZhdGVkQ2hpbGRyZW4gPSBbXTtcbnZhciBoYXMgPSB7fTtcbnZhciBjaXJjdWxhciA9IHt9O1xudmFyIHdhaXRpbmcgPSBmYWxzZTtcbnZhciBmbHVzaGluZyA9IGZhbHNlO1xudmFyIGluZGV4ID0gMDtcblxuLyoqXG4gKiBSZXNldCB0aGUgc2NoZWR1bGVyJ3Mgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIHJlc2V0U2NoZWR1bGVyU3RhdGUgKCkge1xuICBpbmRleCA9IHF1ZXVlLmxlbmd0aCA9IGFjdGl2YXRlZENoaWxkcmVuLmxlbmd0aCA9IDA7XG4gIGhhcyA9IHt9O1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNpcmN1bGFyID0ge307XG4gIH1cbiAgd2FpdGluZyA9IGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8vIEFzeW5jIGVkZ2UgY2FzZSAjNjU2NiByZXF1aXJlcyBzYXZpbmcgdGhlIHRpbWVzdGFtcCB3aGVuIGV2ZW50IGxpc3RlbmVycyBhcmVcbi8vIGF0dGFjaGVkLiBIb3dldmVyLCBjYWxsaW5nIHBlcmZvcm1hbmNlLm5vdygpIGhhcyBhIHBlcmYgb3ZlcmhlYWQgZXNwZWNpYWxseVxuLy8gaWYgdGhlIHBhZ2UgaGFzIHRob3VzYW5kcyBvZiBldmVudCBsaXN0ZW5lcnMuIEluc3RlYWQsIHdlIHRha2UgYSB0aW1lc3RhbXBcbi8vIGV2ZXJ5IHRpbWUgdGhlIHNjaGVkdWxlciBmbHVzaGVzIGFuZCB1c2UgdGhhdCBmb3IgYWxsIGV2ZW50IGxpc3RlbmVyc1xuLy8gYXR0YWNoZWQgZHVyaW5nIHRoYXQgZmx1c2guXG52YXIgY3VycmVudEZsdXNoVGltZXN0YW1wID0gMDtcblxuLy8gQXN5bmMgZWRnZSBjYXNlIGZpeCByZXF1aXJlcyBzdG9yaW5nIGFuIGV2ZW50IGxpc3RlbmVyJ3MgYXR0YWNoIHRpbWVzdGFtcC5cbnZhciBnZXROb3cgPSBEYXRlLm5vdztcblxuLy8gRGV0ZXJtaW5lIHdoYXQgZXZlbnQgdGltZXN0YW1wIHRoZSBicm93c2VyIGlzIHVzaW5nLiBBbm5veWluZ2x5LCB0aGVcbi8vIHRpbWVzdGFtcCBjYW4gZWl0aGVyIGJlIGhpLXJlcyAocmVsYXRpdmUgdG8gcGFnZSBsb2FkKSBvciBsb3ctcmVzXG4vLyAocmVsYXRpdmUgdG8gVU5JWCBlcG9jaCksIHNvIGluIG9yZGVyIHRvIGNvbXBhcmUgdGltZSB3ZSBoYXZlIHRvIHVzZSB0aGVcbi8vIHNhbWUgdGltZXN0YW1wIHR5cGUgd2hlbiBzYXZpbmcgdGhlIGZsdXNoIHRpbWVzdGFtcC5cbi8vIEFsbCBJRSB2ZXJzaW9ucyB1c2UgbG93LXJlcyBldmVudCB0aW1lc3RhbXBzLCBhbmQgaGF2ZSBwcm9ibGVtYXRpYyBjbG9ja1xuLy8gaW1wbGVtZW50YXRpb25zICgjOTYzMilcbmlmIChpbkJyb3dzZXIgJiYgIWlzSUUpIHtcbiAgdmFyIHBlcmZvcm1hbmNlID0gd2luZG93LnBlcmZvcm1hbmNlO1xuICBpZiAoXG4gICAgcGVyZm9ybWFuY2UgJiZcbiAgICB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ID09PSAnZnVuY3Rpb24nICYmXG4gICAgZ2V0Tm93KCkgPiBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKS50aW1lU3RhbXBcbiAgKSB7XG4gICAgLy8gaWYgdGhlIGV2ZW50IHRpbWVzdGFtcCwgYWx0aG91Z2ggZXZhbHVhdGVkIEFGVEVSIHRoZSBEYXRlLm5vdygpLCBpc1xuICAgIC8vIHNtYWxsZXIgdGhhbiBpdCwgaXQgbWVhbnMgdGhlIGV2ZW50IGlzIHVzaW5nIGEgaGktcmVzIHRpbWVzdGFtcCxcbiAgICAvLyBhbmQgd2UgbmVlZCB0byB1c2UgdGhlIGhpLXJlcyB2ZXJzaW9uIGZvciBldmVudCBsaXN0ZW5lciB0aW1lc3RhbXBzIGFzXG4gICAgLy8gd2VsbC5cbiAgICBnZXROb3cgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTsgfTtcbiAgfVxufVxuXG4vKipcbiAqIEZsdXNoIGJvdGggcXVldWVzIGFuZCBydW4gdGhlIHdhdGNoZXJzLlxuICovXG5mdW5jdGlvbiBmbHVzaFNjaGVkdWxlclF1ZXVlICgpIHtcbiAgY3VycmVudEZsdXNoVGltZXN0YW1wID0gZ2V0Tm93KCk7XG4gIGZsdXNoaW5nID0gdHJ1ZTtcbiAgdmFyIHdhdGNoZXIsIGlkO1xuXG4gIC8vIFNvcnQgcXVldWUgYmVmb3JlIGZsdXNoLlxuICAvLyBUaGlzIGVuc3VyZXMgdGhhdDpcbiAgLy8gMS4gQ29tcG9uZW50cyBhcmUgdXBkYXRlZCBmcm9tIHBhcmVudCB0byBjaGlsZC4gKGJlY2F1c2UgcGFyZW50IGlzIGFsd2F5c1xuICAvLyAgICBjcmVhdGVkIGJlZm9yZSB0aGUgY2hpbGQpXG4gIC8vIDIuIEEgY29tcG9uZW50J3MgdXNlciB3YXRjaGVycyBhcmUgcnVuIGJlZm9yZSBpdHMgcmVuZGVyIHdhdGNoZXIgKGJlY2F1c2VcbiAgLy8gICAgdXNlciB3YXRjaGVycyBhcmUgY3JlYXRlZCBiZWZvcmUgdGhlIHJlbmRlciB3YXRjaGVyKVxuICAvLyAzLiBJZiBhIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQgZHVyaW5nIGEgcGFyZW50IGNvbXBvbmVudCdzIHdhdGNoZXIgcnVuLFxuICAvLyAgICBpdHMgd2F0Y2hlcnMgY2FuIGJlIHNraXBwZWQuXG4gIHF1ZXVlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuaWQgLSBiLmlkOyB9KTtcblxuICAvLyBkbyBub3QgY2FjaGUgbGVuZ3RoIGJlY2F1c2UgbW9yZSB3YXRjaGVycyBtaWdodCBiZSBwdXNoZWRcbiAgLy8gYXMgd2UgcnVuIGV4aXN0aW5nIHdhdGNoZXJzXG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHF1ZXVlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHdhdGNoZXIgPSBxdWV1ZVtpbmRleF07XG4gICAgaWYgKHdhdGNoZXIuYmVmb3JlKSB7XG4gICAgICB3YXRjaGVyLmJlZm9yZSgpO1xuICAgIH1cbiAgICBpZCA9IHdhdGNoZXIuaWQ7XG4gICAgaGFzW2lkXSA9IG51bGw7XG4gICAgd2F0Y2hlci5ydW4oKTtcbiAgICAvLyBpbiBkZXYgYnVpbGQsIGNoZWNrIGFuZCBzdG9wIGNpcmN1bGFyIHVwZGF0ZXMuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaGFzW2lkXSAhPSBudWxsKSB7XG4gICAgICBjaXJjdWxhcltpZF0gPSAoY2lyY3VsYXJbaWRdIHx8IDApICsgMTtcbiAgICAgIGlmIChjaXJjdWxhcltpZF0gPiBNQVhfVVBEQVRFX0NPVU5UKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBhbiBpbmZpbml0ZSB1cGRhdGUgbG9vcCAnICsgKFxuICAgICAgICAgICAgd2F0Y2hlci51c2VyXG4gICAgICAgICAgICAgID8gKFwiaW4gd2F0Y2hlciB3aXRoIGV4cHJlc3Npb24gXFxcIlwiICsgKHdhdGNoZXIuZXhwcmVzc2lvbikgKyBcIlxcXCJcIilcbiAgICAgICAgICAgICAgOiBcImluIGEgY29tcG9uZW50IHJlbmRlciBmdW5jdGlvbi5cIlxuICAgICAgICAgICksXG4gICAgICAgICAgd2F0Y2hlci52bVxuICAgICAgICApO1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGtlZXAgY29waWVzIG9mIHBvc3QgcXVldWVzIGJlZm9yZSByZXNldHRpbmcgc3RhdGVcbiAgdmFyIGFjdGl2YXRlZFF1ZXVlID0gYWN0aXZhdGVkQ2hpbGRyZW4uc2xpY2UoKTtcbiAgdmFyIHVwZGF0ZWRRdWV1ZSA9IHF1ZXVlLnNsaWNlKCk7XG5cbiAgcmVzZXRTY2hlZHVsZXJTdGF0ZSgpO1xuXG4gIC8vIGNhbGwgY29tcG9uZW50IHVwZGF0ZWQgYW5kIGFjdGl2YXRlZCBob29rc1xuICBjYWxsQWN0aXZhdGVkSG9va3MoYWN0aXZhdGVkUXVldWUpO1xuICBjYWxsVXBkYXRlZEhvb2tzKHVwZGF0ZWRRdWV1ZSk7XG5cbiAgLy8gZGV2dG9vbCBob29rXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoZGV2dG9vbHMgJiYgY29uZmlnLmRldnRvb2xzKSB7XG4gICAgZGV2dG9vbHMuZW1pdCgnZmx1c2gnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsVXBkYXRlZEhvb2tzIChxdWV1ZSkge1xuICB2YXIgaSA9IHF1ZXVlLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIHZhciB3YXRjaGVyID0gcXVldWVbaV07XG4gICAgdmFyIHZtID0gd2F0Y2hlci52bTtcbiAgICBpZiAodm0uX3dhdGNoZXIgPT09IHdhdGNoZXIgJiYgdm0uX2lzTW91bnRlZCAmJiAhdm0uX2lzRGVzdHJveWVkKSB7XG4gICAgICBjYWxsSG9vayh2bSwgJ3VwZGF0ZWQnKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBRdWV1ZSBhIGtlcHQtYWxpdmUgY29tcG9uZW50IHRoYXQgd2FzIGFjdGl2YXRlZCBkdXJpbmcgcGF0Y2guXG4gKiBUaGUgcXVldWUgd2lsbCBiZSBwcm9jZXNzZWQgYWZ0ZXIgdGhlIGVudGlyZSB0cmVlIGhhcyBiZWVuIHBhdGNoZWQuXG4gKi9cbmZ1bmN0aW9uIHF1ZXVlQWN0aXZhdGVkQ29tcG9uZW50ICh2bSkge1xuICAvLyBzZXR0aW5nIF9pbmFjdGl2ZSB0byBmYWxzZSBoZXJlIHNvIHRoYXQgYSByZW5kZXIgZnVuY3Rpb24gY2FuXG4gIC8vIHJlbHkgb24gY2hlY2tpbmcgd2hldGhlciBpdCdzIGluIGFuIGluYWN0aXZlIHRyZWUgKGUuZy4gcm91dGVyLXZpZXcpXG4gIHZtLl9pbmFjdGl2ZSA9IGZhbHNlO1xuICBhY3RpdmF0ZWRDaGlsZHJlbi5wdXNoKHZtKTtcbn1cblxuZnVuY3Rpb24gY2FsbEFjdGl2YXRlZEhvb2tzIChxdWV1ZSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgcXVldWVbaV0uX2luYWN0aXZlID0gdHJ1ZTtcbiAgICBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KHF1ZXVlW2ldLCB0cnVlIC8qIHRydWUgKi8pO1xuICB9XG59XG5cbi8qKlxuICogUHVzaCBhIHdhdGNoZXIgaW50byB0aGUgd2F0Y2hlciBxdWV1ZS5cbiAqIEpvYnMgd2l0aCBkdXBsaWNhdGUgSURzIHdpbGwgYmUgc2tpcHBlZCB1bmxlc3MgaXQnc1xuICogcHVzaGVkIHdoZW4gdGhlIHF1ZXVlIGlzIGJlaW5nIGZsdXNoZWQuXG4gKi9cbmZ1bmN0aW9uIHF1ZXVlV2F0Y2hlciAod2F0Y2hlcikge1xuICB2YXIgaWQgPSB3YXRjaGVyLmlkO1xuICBpZiAoaGFzW2lkXSA9PSBudWxsKSB7XG4gICAgaGFzW2lkXSA9IHRydWU7XG4gICAgaWYgKCFmbHVzaGluZykge1xuICAgICAgcXVldWUucHVzaCh3YXRjaGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgYWxyZWFkeSBmbHVzaGluZywgc3BsaWNlIHRoZSB3YXRjaGVyIGJhc2VkIG9uIGl0cyBpZFxuICAgICAgLy8gaWYgYWxyZWFkeSBwYXN0IGl0cyBpZCwgaXQgd2lsbCBiZSBydW4gbmV4dCBpbW1lZGlhdGVseS5cbiAgICAgIHZhciBpID0gcXVldWUubGVuZ3RoIC0gMTtcbiAgICAgIHdoaWxlIChpID4gaW5kZXggJiYgcXVldWVbaV0uaWQgPiB3YXRjaGVyLmlkKSB7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlLnNwbGljZShpICsgMSwgMCwgd2F0Y2hlcik7XG4gICAgfVxuICAgIC8vIHF1ZXVlIHRoZSBmbHVzaFxuICAgIGlmICghd2FpdGluZykge1xuICAgICAgd2FpdGluZyA9IHRydWU7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFjb25maWcuYXN5bmMpIHtcbiAgICAgICAgZmx1c2hTY2hlZHVsZXJRdWV1ZSgpO1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIG5leHRUaWNrKGZsdXNoU2NoZWR1bGVyUXVldWUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuXG5cbnZhciB1aWQkMiA9IDA7XG5cbi8qKlxuICogQSB3YXRjaGVyIHBhcnNlcyBhbiBleHByZXNzaW9uLCBjb2xsZWN0cyBkZXBlbmRlbmNpZXMsXG4gKiBhbmQgZmlyZXMgY2FsbGJhY2sgd2hlbiB0aGUgZXhwcmVzc2lvbiB2YWx1ZSBjaGFuZ2VzLlxuICogVGhpcyBpcyB1c2VkIGZvciBib3RoIHRoZSAkd2F0Y2goKSBhcGkgYW5kIGRpcmVjdGl2ZXMuXG4gKi9cbnZhciBXYXRjaGVyID0gZnVuY3Rpb24gV2F0Y2hlciAoXG4gIHZtLFxuICBleHBPckZuLFxuICBjYixcbiAgb3B0aW9ucyxcbiAgaXNSZW5kZXJXYXRjaGVyXG4pIHtcbiAgdGhpcy52bSA9IHZtO1xuICBpZiAoaXNSZW5kZXJXYXRjaGVyKSB7XG4gICAgdm0uX3dhdGNoZXIgPSB0aGlzO1xuICB9XG4gIHZtLl93YXRjaGVycy5wdXNoKHRoaXMpO1xuICAvLyBvcHRpb25zXG4gIGlmIChvcHRpb25zKSB7XG4gICAgdGhpcy5kZWVwID0gISFvcHRpb25zLmRlZXA7XG4gICAgdGhpcy51c2VyID0gISFvcHRpb25zLnVzZXI7XG4gICAgdGhpcy5sYXp5ID0gISFvcHRpb25zLmxhenk7XG4gICAgdGhpcy5zeW5jID0gISFvcHRpb25zLnN5bmM7XG4gICAgdGhpcy5iZWZvcmUgPSBvcHRpb25zLmJlZm9yZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRlZXAgPSB0aGlzLnVzZXIgPSB0aGlzLmxhenkgPSB0aGlzLnN5bmMgPSBmYWxzZTtcbiAgfVxuICB0aGlzLmNiID0gY2I7XG4gIHRoaXMuaWQgPSArK3VpZCQyOyAvLyB1aWQgZm9yIGJhdGNoaW5nXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgdGhpcy5kaXJ0eSA9IHRoaXMubGF6eTsgLy8gZm9yIGxhenkgd2F0Y2hlcnNcbiAgdGhpcy5kZXBzID0gW107XG4gIHRoaXMubmV3RGVwcyA9IFtdO1xuICB0aGlzLmRlcElkcyA9IG5ldyBfU2V0KCk7XG4gIHRoaXMubmV3RGVwSWRzID0gbmV3IF9TZXQoKTtcbiAgdGhpcy5leHByZXNzaW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuICAgID8gZXhwT3JGbi50b1N0cmluZygpXG4gICAgOiAnJztcbiAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyXG4gIGlmICh0eXBlb2YgZXhwT3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuZ2V0dGVyID0gZXhwT3JGbjtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmdldHRlciA9IHBhcnNlUGF0aChleHBPckZuKTtcbiAgICBpZiAoIXRoaXMuZ2V0dGVyKSB7XG4gICAgICB0aGlzLmdldHRlciA9IG5vb3A7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIFwiRmFpbGVkIHdhdGNoaW5nIHBhdGg6IFxcXCJcIiArIGV4cE9yRm4gKyBcIlxcXCIgXCIgK1xuICAgICAgICAnV2F0Y2hlciBvbmx5IGFjY2VwdHMgc2ltcGxlIGRvdC1kZWxpbWl0ZWQgcGF0aHMuICcgK1xuICAgICAgICAnRm9yIGZ1bGwgY29udHJvbCwgdXNlIGEgZnVuY3Rpb24gaW5zdGVhZC4nLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgdGhpcy52YWx1ZSA9IHRoaXMubGF6eVxuICAgID8gdW5kZWZpbmVkXG4gICAgOiB0aGlzLmdldCgpO1xufTtcblxuLyoqXG4gKiBFdmFsdWF0ZSB0aGUgZ2V0dGVyLCBhbmQgcmUtY29sbGVjdCBkZXBlbmRlbmNpZXMuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoKSB7XG4gIHB1c2hUYXJnZXQodGhpcyk7XG4gIHZhciB2YWx1ZTtcbiAgdmFyIHZtID0gdGhpcy52bTtcbiAgdHJ5IHtcbiAgICB2YWx1ZSA9IHRoaXMuZ2V0dGVyLmNhbGwodm0sIHZtKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmICh0aGlzLnVzZXIpIHtcbiAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCAoXCJnZXR0ZXIgZm9yIHdhdGNoZXIgXFxcIlwiICsgKHRoaXMuZXhwcmVzc2lvbikgKyBcIlxcXCJcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlXG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xuICAgIC8vIGRlcGVuZGVuY2llcyBmb3IgZGVlcCB3YXRjaGluZ1xuICAgIGlmICh0aGlzLmRlZXApIHtcbiAgICAgIHRyYXZlcnNlKHZhbHVlKTtcbiAgICB9XG4gICAgcG9wVGFyZ2V0KCk7XG4gICAgdGhpcy5jbGVhbnVwRGVwcygpO1xuICB9XG4gIHJldHVybiB2YWx1ZVxufTtcblxuLyoqXG4gKiBBZGQgYSBkZXBlbmRlbmN5IHRvIHRoaXMgZGlyZWN0aXZlLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5hZGREZXAgPSBmdW5jdGlvbiBhZGREZXAgKGRlcCkge1xuICB2YXIgaWQgPSBkZXAuaWQ7XG4gIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGlkKSkge1xuICAgIHRoaXMubmV3RGVwSWRzLmFkZChpZCk7XG4gICAgdGhpcy5uZXdEZXBzLnB1c2goZGVwKTtcbiAgICBpZiAoIXRoaXMuZGVwSWRzLmhhcyhpZCkpIHtcbiAgICAgIGRlcC5hZGRTdWIodGhpcyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENsZWFuIHVwIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmNsZWFudXBEZXBzID0gZnVuY3Rpb24gY2xlYW51cERlcHMgKCkge1xuICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgZGVwID0gdGhpcy5kZXBzW2ldO1xuICAgIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGRlcC5pZCkpIHtcbiAgICAgIGRlcC5yZW1vdmVTdWIodGhpcyk7XG4gICAgfVxuICB9XG4gIHZhciB0bXAgPSB0aGlzLmRlcElkcztcbiAgdGhpcy5kZXBJZHMgPSB0aGlzLm5ld0RlcElkcztcbiAgdGhpcy5uZXdEZXBJZHMgPSB0bXA7XG4gIHRoaXMubmV3RGVwSWRzLmNsZWFyKCk7XG4gIHRtcCA9IHRoaXMuZGVwcztcbiAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzO1xuICB0aGlzLm5ld0RlcHMgPSB0bXA7XG4gIHRoaXMubmV3RGVwcy5sZW5ndGggPSAwO1xufTtcblxuLyoqXG4gKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IGNoYW5nZXMuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0aGlzLmxhenkpIHtcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0aGlzLnN5bmMpIHtcbiAgICB0aGlzLnJ1bigpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlV2F0Y2hlcih0aGlzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTY2hlZHVsZXIgam9iIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBzY2hlZHVsZXIuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIHJ1biAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgaWYgKFxuICAgICAgdmFsdWUgIT09IHRoaXMudmFsdWUgfHxcbiAgICAgIC8vIERlZXAgd2F0Y2hlcnMgYW5kIHdhdGNoZXJzIG9uIE9iamVjdC9BcnJheXMgc2hvdWxkIGZpcmUgZXZlblxuICAgICAgLy8gd2hlbiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUsIGJlY2F1c2UgdGhlIHZhbHVlIG1heVxuICAgICAgLy8gaGF2ZSBtdXRhdGVkLlxuICAgICAgaXNPYmplY3QodmFsdWUpIHx8XG4gICAgICB0aGlzLmRlZXBcbiAgICApIHtcbiAgICAgIC8vIHNldCBuZXcgdmFsdWVcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBoYW5kbGVFcnJvcihlLCB0aGlzLnZtLCAoXCJjYWxsYmFjayBmb3Igd2F0Y2hlciBcXFwiXCIgKyAodGhpcy5leHByZXNzaW9uKSArIFwiXFxcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBFdmFsdWF0ZSB0aGUgdmFsdWUgb2YgdGhlIHdhdGNoZXIuXG4gKiBUaGlzIG9ubHkgZ2V0cyBjYWxsZWQgZm9yIGxhenkgd2F0Y2hlcnMuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmV2YWx1YXRlID0gZnVuY3Rpb24gZXZhbHVhdGUgKCkge1xuICB0aGlzLnZhbHVlID0gdGhpcy5nZXQoKTtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBEZXBlbmQgb24gYWxsIGRlcHMgY29sbGVjdGVkIGJ5IHRoaXMgd2F0Y2hlci5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcbiAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdGhpcy5kZXBzW2ldLmRlcGVuZCgpO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSBzZWxmIGZyb20gYWxsIGRlcGVuZGVuY2llcycgc3Vic2NyaWJlciBsaXN0LlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS50ZWFyZG93biA9IGZ1bmN0aW9uIHRlYXJkb3duICgpIHtcbiAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSB2bSdzIHdhdGNoZXIgbGlzdFxuICAgIC8vIHRoaXMgaXMgYSBzb21ld2hhdCBleHBlbnNpdmUgb3BlcmF0aW9uIHNvIHdlIHNraXAgaXRcbiAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgZGVzdHJveWVkLlxuICAgIGlmICghdGhpcy52bS5faXNCZWluZ0Rlc3Ryb3llZCkge1xuICAgICAgcmVtb3ZlKHRoaXMudm0uX3dhdGNoZXJzLCB0aGlzKTtcbiAgICB9XG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMuZGVwc1tpXS5yZW1vdmVTdWIodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH1cbn07XG5cbi8qICAqL1xuXG52YXIgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uID0ge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogbm9vcCxcbiAgc2V0OiBub29wXG59O1xuXG5mdW5jdGlvbiBwcm94eSAodGFyZ2V0LCBzb3VyY2VLZXksIGtleSkge1xuICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uZ2V0ID0gZnVuY3Rpb24gcHJveHlHZXR0ZXIgKCkge1xuICAgIHJldHVybiB0aGlzW3NvdXJjZUtleV1ba2V5XVxuICB9O1xuICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID0gZnVuY3Rpb24gcHJveHlTZXR0ZXIgKHZhbCkge1xuICAgIHRoaXNbc291cmNlS2V5XVtrZXldID0gdmFsO1xuICB9O1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbik7XG59XG5cbmZ1bmN0aW9uIGluaXRTdGF0ZSAodm0pIHtcbiAgdm0uX3dhdGNoZXJzID0gW107XG4gIHZhciBvcHRzID0gdm0uJG9wdGlvbnM7XG4gIGlmIChvcHRzLnByb3BzKSB7IGluaXRQcm9wcyh2bSwgb3B0cy5wcm9wcyk7IH1cbiAgaWYgKG9wdHMubWV0aG9kcykgeyBpbml0TWV0aG9kcyh2bSwgb3B0cy5tZXRob2RzKTsgfVxuICBpZiAob3B0cy5kYXRhKSB7XG4gICAgaW5pdERhdGEodm0pO1xuICB9IGVsc2Uge1xuICAgIG9ic2VydmUodm0uX2RhdGEgPSB7fSwgdHJ1ZSAvKiBhc1Jvb3REYXRhICovKTtcbiAgfVxuICBpZiAob3B0cy5jb21wdXRlZCkgeyBpbml0Q29tcHV0ZWQodm0sIG9wdHMuY29tcHV0ZWQpOyB9XG4gIGlmIChvcHRzLndhdGNoICYmIG9wdHMud2F0Y2ggIT09IG5hdGl2ZVdhdGNoKSB7XG4gICAgaW5pdFdhdGNoKHZtLCBvcHRzLndhdGNoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0UHJvcHMgKHZtLCBwcm9wc09wdGlvbnMpIHtcbiAgdmFyIHByb3BzRGF0YSA9IHZtLiRvcHRpb25zLnByb3BzRGF0YSB8fCB7fTtcbiAgdmFyIHByb3BzID0gdm0uX3Byb3BzID0ge307XG4gIC8vIGNhY2hlIHByb3Aga2V5cyBzbyB0aGF0IGZ1dHVyZSBwcm9wcyB1cGRhdGVzIGNhbiBpdGVyYXRlIHVzaW5nIEFycmF5XG4gIC8vIGluc3RlYWQgb2YgZHluYW1pYyBvYmplY3Qga2V5IGVudW1lcmF0aW9uLlxuICB2YXIga2V5cyA9IHZtLiRvcHRpb25zLl9wcm9wS2V5cyA9IFtdO1xuICB2YXIgaXNSb290ID0gIXZtLiRwYXJlbnQ7XG4gIC8vIHJvb3QgaW5zdGFuY2UgcHJvcHMgc2hvdWxkIGJlIGNvbnZlcnRlZFxuICBpZiAoIWlzUm9vdCkge1xuICAgIHRvZ2dsZU9ic2VydmluZyhmYWxzZSk7XG4gIH1cbiAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoIGtleSApIHtcbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB2YXIgdmFsdWUgPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wc09wdGlvbnMsIHByb3BzRGF0YSwgdm0pO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBoeXBoZW5hdGVkS2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICBpZiAoaXNSZXNlcnZlZEF0dHJpYnV0ZShoeXBoZW5hdGVkS2V5KSB8fFxuICAgICAgICAgIGNvbmZpZy5pc1Jlc2VydmVkQXR0cihoeXBoZW5hdGVkS2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIlxcXCJcIiArIGh5cGhlbmF0ZWRLZXkgKyBcIlxcXCIgaXMgYSByZXNlcnZlZCBhdHRyaWJ1dGUgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIGNvbXBvbmVudCBwcm9wLlwiKSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZGVmaW5lUmVhY3RpdmUkJDEocHJvcHMsIGtleSwgdmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpc1Jvb3QgJiYgIWlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCkge1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmKHZtLm1wSG9zdCA9PT0gJ21wLWJhaWR1Jyl7Ly/nmb7luqYgb2JzZXJ2ZXIg5ZyoIHNldERhdGEgY2FsbGJhY2sg5LmL5ZCO6Kem5Y+R77yM55u05o6l5b+955Wl6K+lIHdhcm5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZml4ZWQgYnkgeHh4eHh4IF9fbmV4dF90aWNrX3BlbmRpbmcsdW5pOi8vZm9ybS1maWVsZCDml7bkuI3lkYroraZcbiAgICAgICAgICAgIGlmKFxuICAgICAgICAgICAgICAgIGtleSA9PT0gJ3ZhbHVlJyAmJiBcbiAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHZtLiRvcHRpb25zLmJlaGF2aW9ycykgJiZcbiAgICAgICAgICAgICAgICB2bS4kb3B0aW9ucy5iZWhhdmlvcnMuaW5kZXhPZigndW5pOi8vZm9ybS1maWVsZCcpICE9PSAtMVxuICAgICAgICAgICAgICApe1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHZtLl9nZXRGb3JtRGF0YSl7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyICRwYXJlbnQgPSB2bS4kcGFyZW50O1xuICAgICAgICAgICAgd2hpbGUoJHBhcmVudCl7XG4gICAgICAgICAgICAgIGlmKCRwYXJlbnQuX19uZXh0X3RpY2tfcGVuZGluZyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkcGFyZW50ID0gJHBhcmVudC4kcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgXCJBdm9pZCBtdXRhdGluZyBhIHByb3AgZGlyZWN0bHkgc2luY2UgdGhlIHZhbHVlIHdpbGwgYmUgXCIgK1xuICAgICAgICAgICAgXCJvdmVyd3JpdHRlbiB3aGVuZXZlciB0aGUgcGFyZW50IGNvbXBvbmVudCByZS1yZW5kZXJzLiBcIiArXG4gICAgICAgICAgICBcIkluc3RlYWQsIHVzZSBhIGRhdGEgb3IgY29tcHV0ZWQgcHJvcGVydHkgYmFzZWQgb24gdGhlIHByb3AncyBcIiArXG4gICAgICAgICAgICBcInZhbHVlLiBQcm9wIGJlaW5nIG11dGF0ZWQ6IFxcXCJcIiArIGtleSArIFwiXFxcIlwiLFxuICAgICAgICAgICAgdm1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5lUmVhY3RpdmUkJDEocHJvcHMsIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvLyBzdGF0aWMgcHJvcHMgYXJlIGFscmVhZHkgcHJveGllZCBvbiB0aGUgY29tcG9uZW50J3MgcHJvdG90eXBlXG4gICAgLy8gZHVyaW5nIFZ1ZS5leHRlbmQoKS4gV2Ugb25seSBuZWVkIHRvIHByb3h5IHByb3BzIGRlZmluZWQgYXRcbiAgICAvLyBpbnN0YW50aWF0aW9uIGhlcmUuXG4gICAgaWYgKCEoa2V5IGluIHZtKSkge1xuICAgICAgcHJveHkodm0sIFwiX3Byb3BzXCIsIGtleSk7XG4gICAgfVxuICB9O1xuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wc09wdGlvbnMpIGxvb3AoIGtleSApO1xuICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGluaXREYXRhICh2bSkge1xuICB2YXIgZGF0YSA9IHZtLiRvcHRpb25zLmRhdGE7XG4gIGRhdGEgPSB2bS5fZGF0YSA9IHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nXG4gICAgPyBnZXREYXRhKGRhdGEsIHZtKVxuICAgIDogZGF0YSB8fCB7fTtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgZGF0YSA9IHt9O1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdkYXRhIGZ1bmN0aW9ucyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdDpcXG4nICtcbiAgICAgICdodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9jb21wb25lbnRzLmh0bWwjZGF0YS1NdXN0LUJlLWEtRnVuY3Rpb24nLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgdmFyIHByb3BzID0gdm0uJG9wdGlvbnMucHJvcHM7XG4gIHZhciBtZXRob2RzID0gdm0uJG9wdGlvbnMubWV0aG9kcztcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAobWV0aG9kcyAmJiBoYXNPd24obWV0aG9kcywga2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkIGFzIGEgZGF0YSBwcm9wZXJ0eS5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByb3BzICYmIGhhc093bihwcm9wcywga2V5KSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIlRoZSBkYXRhIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlY2xhcmVkIGFzIGEgcHJvcC4gXCIgK1xuICAgICAgICBcIlVzZSBwcm9wIGRlZmF1bHQgdmFsdWUgaW5zdGVhZC5cIixcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICBwcm94eSh2bSwgXCJfZGF0YVwiLCBrZXkpO1xuICAgIH1cbiAgfVxuICAvLyBvYnNlcnZlIGRhdGFcbiAgb2JzZXJ2ZShkYXRhLCB0cnVlIC8qIGFzUm9vdERhdGEgKi8pO1xufVxuXG5mdW5jdGlvbiBnZXREYXRhIChkYXRhLCB2bSkge1xuICAvLyAjNzU3MyBkaXNhYmxlIGRlcCBjb2xsZWN0aW9uIHdoZW4gaW52b2tpbmcgZGF0YSBnZXR0ZXJzXG4gIHB1c2hUYXJnZXQoKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGF0YS5jYWxsKHZtLCB2bSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGhhbmRsZUVycm9yKGUsIHZtLCBcImRhdGEoKVwiKTtcbiAgICByZXR1cm4ge31cbiAgfSBmaW5hbGx5IHtcbiAgICBwb3BUYXJnZXQoKTtcbiAgfVxufVxuXG52YXIgY29tcHV0ZWRXYXRjaGVyT3B0aW9ucyA9IHsgbGF6eTogdHJ1ZSB9O1xuXG5mdW5jdGlvbiBpbml0Q29tcHV0ZWQgKHZtLCBjb21wdXRlZCkge1xuICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgdmFyIHdhdGNoZXJzID0gdm0uX2NvbXB1dGVkV2F0Y2hlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAvLyBjb21wdXRlZCBwcm9wZXJ0aWVzIGFyZSBqdXN0IGdldHRlcnMgZHVyaW5nIFNTUlxuICB2YXIgaXNTU1IgPSBpc1NlcnZlclJlbmRlcmluZygpO1xuXG4gIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgIHZhciB1c2VyRGVmID0gY29tcHV0ZWRba2V5XTtcbiAgICB2YXIgZ2V0dGVyID0gdHlwZW9mIHVzZXJEZWYgPT09ICdmdW5jdGlvbicgPyB1c2VyRGVmIDogdXNlckRlZi5nZXQ7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgZ2V0dGVyID09IG51bGwpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIChcIkdldHRlciBpcyBtaXNzaW5nIGZvciBjb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIuXCIpLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzU1NSKSB7XG4gICAgICAvLyBjcmVhdGUgaW50ZXJuYWwgd2F0Y2hlciBmb3IgdGhlIGNvbXB1dGVkIHByb3BlcnR5LlxuICAgICAgd2F0Y2hlcnNba2V5XSA9IG5ldyBXYXRjaGVyKFxuICAgICAgICB2bSxcbiAgICAgICAgZ2V0dGVyIHx8IG5vb3AsXG4gICAgICAgIG5vb3AsXG4gICAgICAgIGNvbXB1dGVkV2F0Y2hlck9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY29tcG9uZW50LWRlZmluZWQgY29tcHV0ZWQgcHJvcGVydGllcyBhcmUgYWxyZWFkeSBkZWZpbmVkIG9uIHRoZVxuICAgIC8vIGNvbXBvbmVudCBwcm90b3R5cGUuIFdlIG9ubHkgbmVlZCB0byBkZWZpbmUgY29tcHV0ZWQgcHJvcGVydGllcyBkZWZpbmVkXG4gICAgLy8gYXQgaW5zdGFudGlhdGlvbiBoZXJlLlxuICAgIGlmICghKGtleSBpbiB2bSkpIHtcbiAgICAgIGRlZmluZUNvbXB1dGVkKHZtLCBrZXksIHVzZXJEZWYpO1xuICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGtleSBpbiB2bS4kZGF0YSkge1xuICAgICAgICB3YXJuKChcIlRoZSBjb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgYWxyZWFkeSBkZWZpbmVkIGluIGRhdGEuXCIpLCB2bSk7XG4gICAgICB9IGVsc2UgaWYgKHZtLiRvcHRpb25zLnByb3BzICYmIGtleSBpbiB2bS4kb3B0aW9ucy5wcm9wcykge1xuICAgICAgICB3YXJuKChcIlRoZSBjb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgYWxyZWFkeSBkZWZpbmVkIGFzIGEgcHJvcC5cIiksIHZtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmaW5lQ29tcHV0ZWQgKFxuICB0YXJnZXQsXG4gIGtleSxcbiAgdXNlckRlZlxuKSB7XG4gIHZhciBzaG91bGRDYWNoZSA9ICFpc1NlcnZlclJlbmRlcmluZygpO1xuICBpZiAodHlwZW9mIHVzZXJEZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uZ2V0ID0gc2hvdWxkQ2FjaGVcbiAgICAgID8gY3JlYXRlQ29tcHV0ZWRHZXR0ZXIoa2V5KVxuICAgICAgOiBjcmVhdGVHZXR0ZXJJbnZva2VyKHVzZXJEZWYpO1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBub29wO1xuICB9IGVsc2Uge1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5nZXQgPSB1c2VyRGVmLmdldFxuICAgICAgPyBzaG91bGRDYWNoZSAmJiB1c2VyRGVmLmNhY2hlICE9PSBmYWxzZVxuICAgICAgICA/IGNyZWF0ZUNvbXB1dGVkR2V0dGVyKGtleSlcbiAgICAgICAgOiBjcmVhdGVHZXR0ZXJJbnZva2VyKHVzZXJEZWYuZ2V0KVxuICAgICAgOiBub29wO1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSB1c2VyRGVmLnNldCB8fCBub29wO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID09PSBub29wKSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIChcIkNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgYXNzaWduZWQgdG8gYnV0IGl0IGhhcyBubyBzZXR0ZXIuXCIpLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlZEdldHRlciAoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjb21wdXRlZEdldHRlciAoKSB7XG4gICAgdmFyIHdhdGNoZXIgPSB0aGlzLl9jb21wdXRlZFdhdGNoZXJzICYmIHRoaXMuX2NvbXB1dGVkV2F0Y2hlcnNba2V5XTtcbiAgICBpZiAod2F0Y2hlcikge1xuICAgICAgaWYgKHdhdGNoZXIuZGlydHkpIHtcbiAgICAgICAgd2F0Y2hlci5ldmFsdWF0ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKERlcC5TaGFyZWRPYmplY3QudGFyZ2V0KSB7Ly8gZml4ZWQgYnkgeHh4eHh4XG4gICAgICAgIHdhdGNoZXIuZGVwZW5kKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0Y2hlci52YWx1ZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVHZXR0ZXJJbnZva2VyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjb21wdXRlZEdldHRlciAoKSB7XG4gICAgcmV0dXJuIGZuLmNhbGwodGhpcywgdGhpcylcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0TWV0aG9kcyAodm0sIG1ldGhvZHMpIHtcbiAgdmFyIHByb3BzID0gdm0uJG9wdGlvbnMucHJvcHM7XG4gIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgbWV0aG9kc1trZXldICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgXCJNZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGhhcyB0eXBlIFxcXCJcIiArICh0eXBlb2YgbWV0aG9kc1trZXldKSArIFwiXFxcIiBpbiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24uIFwiICtcbiAgICAgICAgICBcIkRpZCB5b3UgcmVmZXJlbmNlIHRoZSBmdW5jdGlvbiBjb3JyZWN0bHk/XCIsXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wcyAmJiBoYXNPd24ocHJvcHMsIGtleSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAoXCJNZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZCBhcyBhIHByb3AuXCIpLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoKGtleSBpbiB2bSkgJiYgaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgXCJNZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGNvbmZsaWN0cyB3aXRoIGFuIGV4aXN0aW5nIFZ1ZSBpbnN0YW5jZSBtZXRob2QuIFwiICtcbiAgICAgICAgICBcIkF2b2lkIGRlZmluaW5nIGNvbXBvbmVudCBtZXRob2RzIHRoYXQgc3RhcnQgd2l0aCBfIG9yICQuXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdm1ba2V5XSA9IHR5cGVvZiBtZXRob2RzW2tleV0gIT09ICdmdW5jdGlvbicgPyBub29wIDogYmluZChtZXRob2RzW2tleV0sIHZtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0V2F0Y2ggKHZtLCB3YXRjaCkge1xuICBmb3IgKHZhciBrZXkgaW4gd2F0Y2gpIHtcbiAgICB2YXIgaGFuZGxlciA9IHdhdGNoW2tleV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGFuZGxlcikpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXJbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVXYXRjaGVyIChcbiAgdm0sXG4gIGV4cE9yRm4sXG4gIGhhbmRsZXIsXG4gIG9wdGlvbnNcbikge1xuICBpZiAoaXNQbGFpbk9iamVjdChoYW5kbGVyKSkge1xuICAgIG9wdGlvbnMgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBoYW5kbGVyLmhhbmRsZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJykge1xuICAgIGhhbmRsZXIgPSB2bVtoYW5kbGVyXTtcbiAgfVxuICByZXR1cm4gdm0uJHdhdGNoKGV4cE9yRm4sIGhhbmRsZXIsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIHN0YXRlTWl4aW4gKFZ1ZSkge1xuICAvLyBmbG93IHNvbWVob3cgaGFzIHByb2JsZW1zIHdpdGggZGlyZWN0bHkgZGVjbGFyZWQgZGVmaW5pdGlvbiBvYmplY3RcbiAgLy8gd2hlbiB1c2luZyBPYmplY3QuZGVmaW5lUHJvcGVydHksIHNvIHdlIGhhdmUgdG8gcHJvY2VkdXJhbGx5IGJ1aWxkIHVwXG4gIC8vIHRoZSBvYmplY3QgaGVyZS5cbiAgdmFyIGRhdGFEZWYgPSB7fTtcbiAgZGF0YURlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9kYXRhIH07XG4gIHZhciBwcm9wc0RlZiA9IHt9O1xuICBwcm9wc0RlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9wcm9wcyB9O1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGRhdGFEZWYuc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0F2b2lkIHJlcGxhY2luZyBpbnN0YW5jZSByb290ICRkYXRhLiAnICtcbiAgICAgICAgJ1VzZSBuZXN0ZWQgZGF0YSBwcm9wZXJ0aWVzIGluc3RlYWQuJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9O1xuICAgIHByb3BzRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXCIkcHJvcHMgaXMgcmVhZG9ubHkuXCIsIHRoaXMpO1xuICAgIH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckZGF0YScsIGRhdGFEZWYpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRwcm9wcycsIHByb3BzRGVmKTtcblxuICBWdWUucHJvdG90eXBlLiRzZXQgPSBzZXQ7XG4gIFZ1ZS5wcm90b3R5cGUuJGRlbGV0ZSA9IGRlbDtcblxuICBWdWUucHJvdG90eXBlLiR3YXRjaCA9IGZ1bmN0aW9uIChcbiAgICBleHBPckZuLFxuICAgIGNiLFxuICAgIG9wdGlvbnNcbiAgKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAoaXNQbGFpbk9iamVjdChjYikpIHtcbiAgICAgIHJldHVybiBjcmVhdGVXYXRjaGVyKHZtLCBleHBPckZuLCBjYiwgb3B0aW9ucylcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy51c2VyID0gdHJ1ZTtcbiAgICB2YXIgd2F0Y2hlciA9IG5ldyBXYXRjaGVyKHZtLCBleHBPckZuLCBjYiwgb3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMuaW1tZWRpYXRlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjYi5jYWxsKHZtLCB3YXRjaGVyLnZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGVycm9yLCB2bSwgKFwiY2FsbGJhY2sgZm9yIGltbWVkaWF0ZSB3YXRjaGVyIFxcXCJcIiArICh3YXRjaGVyLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVud2F0Y2hGbiAoKSB7XG4gICAgICB3YXRjaGVyLnRlYXJkb3duKCk7XG4gICAgfVxuICB9O1xufVxuXG4vKiAgKi9cblxudmFyIHVpZCQzID0gMDtcblxuZnVuY3Rpb24gaW5pdE1peGluIChWdWUpIHtcbiAgVnVlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICAvLyBhIHVpZFxuICAgIHZtLl91aWQgPSB1aWQkMysrO1xuXG4gICAgdmFyIHN0YXJ0VGFnLCBlbmRUYWc7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLnBlcmZvcm1hbmNlICYmIG1hcmspIHtcbiAgICAgIHN0YXJ0VGFnID0gXCJ2dWUtcGVyZi1zdGFydDpcIiArICh2bS5fdWlkKTtcbiAgICAgIGVuZFRhZyA9IFwidnVlLXBlcmYtZW5kOlwiICsgKHZtLl91aWQpO1xuICAgICAgbWFyayhzdGFydFRhZyk7XG4gICAgfVxuXG4gICAgLy8gYSBmbGFnIHRvIGF2b2lkIHRoaXMgYmVpbmcgb2JzZXJ2ZWRcbiAgICB2bS5faXNWdWUgPSB0cnVlO1xuICAgIC8vIG1lcmdlIG9wdGlvbnNcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLl9pc0NvbXBvbmVudCkge1xuICAgICAgLy8gb3B0aW1pemUgaW50ZXJuYWwgY29tcG9uZW50IGluc3RhbnRpYXRpb25cbiAgICAgIC8vIHNpbmNlIGR5bmFtaWMgb3B0aW9ucyBtZXJnaW5nIGlzIHByZXR0eSBzbG93LCBhbmQgbm9uZSBvZiB0aGVcbiAgICAgIC8vIGludGVybmFsIGNvbXBvbmVudCBvcHRpb25zIG5lZWRzIHNwZWNpYWwgdHJlYXRtZW50LlxuICAgICAgaW5pdEludGVybmFsQ29tcG9uZW50KHZtLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdm0uJG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXG4gICAgICAgIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnModm0uY29uc3RydWN0b3IpLFxuICAgICAgICBvcHRpb25zIHx8IHt9LFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaW5pdFByb3h5KHZtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdm0uX3JlbmRlclByb3h5ID0gdm07XG4gICAgfVxuICAgIC8vIGV4cG9zZSByZWFsIHNlbGZcbiAgICB2bS5fc2VsZiA9IHZtO1xuICAgIGluaXRMaWZlY3ljbGUodm0pO1xuICAgIGluaXRFdmVudHModm0pO1xuICAgIGluaXRSZW5kZXIodm0pO1xuICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlQ3JlYXRlJyk7XG4gICAgdm0ubXBIb3N0ICE9PSAnbXAtdG91dGlhbycgJiYgaW5pdEluamVjdGlvbnModm0pOyAvLyByZXNvbHZlIGluamVjdGlvbnMgYmVmb3JlIGRhdGEvcHJvcHMgIFxuICAgIGluaXRTdGF0ZSh2bSk7XG4gICAgdm0ubXBIb3N0ICE9PSAnbXAtdG91dGlhbycgJiYgaW5pdFByb3ZpZGUodm0pOyAvLyByZXNvbHZlIHByb3ZpZGUgYWZ0ZXIgZGF0YS9wcm9wc1xuICAgIHZtLm1wSG9zdCAhPT0gJ21wLXRvdXRpYW8nICYmIGNhbGxIb29rKHZtLCAnY3JlYXRlZCcpOyAgICAgIFxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLnBlcmZvcm1hbmNlICYmIG1hcmspIHtcbiAgICAgIHZtLl9uYW1lID0gZm9ybWF0Q29tcG9uZW50TmFtZSh2bSwgZmFsc2UpO1xuICAgICAgbWFyayhlbmRUYWcpO1xuICAgICAgbWVhc3VyZSgoXCJ2dWUgXCIgKyAodm0uX25hbWUpICsgXCIgaW5pdFwiKSwgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgfVxuXG4gICAgaWYgKHZtLiRvcHRpb25zLmVsKSB7XG4gICAgICB2bS4kbW91bnQodm0uJG9wdGlvbnMuZWwpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdEludGVybmFsQ29tcG9uZW50ICh2bSwgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IHZtLiRvcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh2bS5jb25zdHJ1Y3Rvci5vcHRpb25zKTtcbiAgLy8gZG9pbmcgdGhpcyBiZWNhdXNlIGl0J3MgZmFzdGVyIHRoYW4gZHluYW1pYyBlbnVtZXJhdGlvbi5cbiAgdmFyIHBhcmVudFZub2RlID0gb3B0aW9ucy5fcGFyZW50Vm5vZGU7XG4gIG9wdHMucGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ7XG4gIG9wdHMuX3BhcmVudFZub2RlID0gcGFyZW50Vm5vZGU7XG5cbiAgdmFyIHZub2RlQ29tcG9uZW50T3B0aW9ucyA9IHBhcmVudFZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gIG9wdHMucHJvcHNEYXRhID0gdm5vZGVDb21wb25lbnRPcHRpb25zLnByb3BzRGF0YTtcbiAgb3B0cy5fcGFyZW50TGlzdGVuZXJzID0gdm5vZGVDb21wb25lbnRPcHRpb25zLmxpc3RlbmVycztcbiAgb3B0cy5fcmVuZGVyQ2hpbGRyZW4gPSB2bm9kZUNvbXBvbmVudE9wdGlvbnMuY2hpbGRyZW47XG4gIG9wdHMuX2NvbXBvbmVudFRhZyA9IHZub2RlQ29tcG9uZW50T3B0aW9ucy50YWc7XG5cbiAgaWYgKG9wdGlvbnMucmVuZGVyKSB7XG4gICAgb3B0cy5yZW5kZXIgPSBvcHRpb25zLnJlbmRlcjtcbiAgICBvcHRzLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMgKEN0b3IpIHtcbiAgdmFyIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnM7XG4gIGlmIChDdG9yLnN1cGVyKSB7XG4gICAgdmFyIHN1cGVyT3B0aW9ucyA9IHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMoQ3Rvci5zdXBlcik7XG4gICAgdmFyIGNhY2hlZFN1cGVyT3B0aW9ucyA9IEN0b3Iuc3VwZXJPcHRpb25zO1xuICAgIGlmIChzdXBlck9wdGlvbnMgIT09IGNhY2hlZFN1cGVyT3B0aW9ucykge1xuICAgICAgLy8gc3VwZXIgb3B0aW9uIGNoYW5nZWQsXG4gICAgICAvLyBuZWVkIHRvIHJlc29sdmUgbmV3IG9wdGlvbnMuXG4gICAgICBDdG9yLnN1cGVyT3B0aW9ucyA9IHN1cGVyT3B0aW9ucztcbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBhbnkgbGF0ZS1tb2RpZmllZC9hdHRhY2hlZCBvcHRpb25zICgjNDk3NilcbiAgICAgIHZhciBtb2RpZmllZE9wdGlvbnMgPSByZXNvbHZlTW9kaWZpZWRPcHRpb25zKEN0b3IpO1xuICAgICAgLy8gdXBkYXRlIGJhc2UgZXh0ZW5kIG9wdGlvbnNcbiAgICAgIGlmIChtb2RpZmllZE9wdGlvbnMpIHtcbiAgICAgICAgZXh0ZW5kKEN0b3IuZXh0ZW5kT3B0aW9ucywgbW9kaWZpZWRPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoc3VwZXJPcHRpb25zLCBDdG9yLmV4dGVuZE9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMubmFtZSkge1xuICAgICAgICBvcHRpb25zLmNvbXBvbmVudHNbb3B0aW9ucy5uYW1lXSA9IEN0b3I7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvcHRpb25zXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVNb2RpZmllZE9wdGlvbnMgKEN0b3IpIHtcbiAgdmFyIG1vZGlmaWVkO1xuICB2YXIgbGF0ZXN0ID0gQ3Rvci5vcHRpb25zO1xuICB2YXIgc2VhbGVkID0gQ3Rvci5zZWFsZWRPcHRpb25zO1xuICBmb3IgKHZhciBrZXkgaW4gbGF0ZXN0KSB7XG4gICAgaWYgKGxhdGVzdFtrZXldICE9PSBzZWFsZWRba2V5XSkge1xuICAgICAgaWYgKCFtb2RpZmllZCkgeyBtb2RpZmllZCA9IHt9OyB9XG4gICAgICBtb2RpZmllZFtrZXldID0gbGF0ZXN0W2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBtb2RpZmllZFxufVxuXG5mdW5jdGlvbiBWdWUgKG9wdGlvbnMpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAhKHRoaXMgaW5zdGFuY2VvZiBWdWUpXG4gICkge1xuICAgIHdhcm4oJ1Z1ZSBpcyBhIGNvbnN0cnVjdG9yIGFuZCBzaG91bGQgYmUgY2FsbGVkIHdpdGggdGhlIGBuZXdgIGtleXdvcmQnKTtcbiAgfVxuICB0aGlzLl9pbml0KG9wdGlvbnMpO1xufVxuXG5pbml0TWl4aW4oVnVlKTtcbnN0YXRlTWl4aW4oVnVlKTtcbmV2ZW50c01peGluKFZ1ZSk7XG5saWZlY3ljbGVNaXhpbihWdWUpO1xucmVuZGVyTWl4aW4oVnVlKTtcblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRVc2UgKFZ1ZSkge1xuICBWdWUudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xuICAgIHZhciBpbnN0YWxsZWRQbHVnaW5zID0gKHRoaXMuX2luc3RhbGxlZFBsdWdpbnMgfHwgKHRoaXMuX2luc3RhbGxlZFBsdWdpbnMgPSBbXSkpO1xuICAgIGlmIChpbnN0YWxsZWRQbHVnaW5zLmluZGV4T2YocGx1Z2luKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8vIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgIGFyZ3MudW5zaGlmdCh0aGlzKTtcbiAgICBpZiAodHlwZW9mIHBsdWdpbi5pbnN0YWxsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwbHVnaW4uaW5zdGFsbC5hcHBseShwbHVnaW4sIGFyZ3MpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcGx1Z2luLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBpbnN0YWxsZWRQbHVnaW5zLnB1c2gocGx1Z2luKTtcbiAgICByZXR1cm4gdGhpc1xuICB9O1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdE1peGluJDEgKFZ1ZSkge1xuICBWdWUubWl4aW4gPSBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnModGhpcy5vcHRpb25zLCBtaXhpbik7XG4gICAgcmV0dXJuIHRoaXNcbiAgfTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRFeHRlbmQgKFZ1ZSkge1xuICAvKipcbiAgICogRWFjaCBpbnN0YW5jZSBjb25zdHJ1Y3RvciwgaW5jbHVkaW5nIFZ1ZSwgaGFzIGEgdW5pcXVlXG4gICAqIGNpZC4gVGhpcyBlbmFibGVzIHVzIHRvIGNyZWF0ZSB3cmFwcGVkIFwiY2hpbGRcbiAgICogY29uc3RydWN0b3JzXCIgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UgYW5kIGNhY2hlIHRoZW0uXG4gICAqL1xuICBWdWUuY2lkID0gMDtcbiAgdmFyIGNpZCA9IDE7XG5cbiAgLyoqXG4gICAqIENsYXNzIGluaGVyaXRhbmNlXG4gICAqL1xuICBWdWUuZXh0ZW5kID0gZnVuY3Rpb24gKGV4dGVuZE9wdGlvbnMpIHtcbiAgICBleHRlbmRPcHRpb25zID0gZXh0ZW5kT3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgU3VwZXIgPSB0aGlzO1xuICAgIHZhciBTdXBlcklkID0gU3VwZXIuY2lkO1xuICAgIHZhciBjYWNoZWRDdG9ycyA9IGV4dGVuZE9wdGlvbnMuX0N0b3IgfHwgKGV4dGVuZE9wdGlvbnMuX0N0b3IgPSB7fSk7XG4gICAgaWYgKGNhY2hlZEN0b3JzW1N1cGVySWRdKSB7XG4gICAgICByZXR1cm4gY2FjaGVkQ3RvcnNbU3VwZXJJZF1cbiAgICB9XG5cbiAgICB2YXIgbmFtZSA9IGV4dGVuZE9wdGlvbnMubmFtZSB8fCBTdXBlci5vcHRpb25zLm5hbWU7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgbmFtZSkge1xuICAgICAgdmFsaWRhdGVDb21wb25lbnROYW1lKG5hbWUpO1xuICAgIH1cblxuICAgIHZhciBTdWIgPSBmdW5jdGlvbiBWdWVDb21wb25lbnQgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG4gICAgfTtcbiAgICBTdWIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlci5wcm90b3R5cGUpO1xuICAgIFN1Yi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdWI7XG4gICAgU3ViLmNpZCA9IGNpZCsrO1xuICAgIFN1Yi5vcHRpb25zID0gbWVyZ2VPcHRpb25zKFxuICAgICAgU3VwZXIub3B0aW9ucyxcbiAgICAgIGV4dGVuZE9wdGlvbnNcbiAgICApO1xuICAgIFN1Ylsnc3VwZXInXSA9IFN1cGVyO1xuXG4gICAgLy8gRm9yIHByb3BzIGFuZCBjb21wdXRlZCBwcm9wZXJ0aWVzLCB3ZSBkZWZpbmUgdGhlIHByb3h5IGdldHRlcnMgb25cbiAgICAvLyB0aGUgVnVlIGluc3RhbmNlcyBhdCBleHRlbnNpb24gdGltZSwgb24gdGhlIGV4dGVuZGVkIHByb3RvdHlwZS4gVGhpc1xuICAgIC8vIGF2b2lkcyBPYmplY3QuZGVmaW5lUHJvcGVydHkgY2FsbHMgZm9yIGVhY2ggaW5zdGFuY2UgY3JlYXRlZC5cbiAgICBpZiAoU3ViLm9wdGlvbnMucHJvcHMpIHtcbiAgICAgIGluaXRQcm9wcyQxKFN1Yik7XG4gICAgfVxuICAgIGlmIChTdWIub3B0aW9ucy5jb21wdXRlZCkge1xuICAgICAgaW5pdENvbXB1dGVkJDEoU3ViKTtcbiAgICB9XG5cbiAgICAvLyBhbGxvdyBmdXJ0aGVyIGV4dGVuc2lvbi9taXhpbi9wbHVnaW4gdXNhZ2VcbiAgICBTdWIuZXh0ZW5kID0gU3VwZXIuZXh0ZW5kO1xuICAgIFN1Yi5taXhpbiA9IFN1cGVyLm1peGluO1xuICAgIFN1Yi51c2UgPSBTdXBlci51c2U7XG5cbiAgICAvLyBjcmVhdGUgYXNzZXQgcmVnaXN0ZXJzLCBzbyBleHRlbmRlZCBjbGFzc2VzXG4gICAgLy8gY2FuIGhhdmUgdGhlaXIgcHJpdmF0ZSBhc3NldHMgdG9vLlxuICAgIEFTU0VUX1RZUEVTLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIFN1Ylt0eXBlXSA9IFN1cGVyW3R5cGVdO1xuICAgIH0pO1xuICAgIC8vIGVuYWJsZSByZWN1cnNpdmUgc2VsZi1sb29rdXBcbiAgICBpZiAobmFtZSkge1xuICAgICAgU3ViLm9wdGlvbnMuY29tcG9uZW50c1tuYW1lXSA9IFN1YjtcbiAgICB9XG5cbiAgICAvLyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBzdXBlciBvcHRpb25zIGF0IGV4dGVuc2lvbiB0aW1lLlxuICAgIC8vIGxhdGVyIGF0IGluc3RhbnRpYXRpb24gd2UgY2FuIGNoZWNrIGlmIFN1cGVyJ3Mgb3B0aW9ucyBoYXZlXG4gICAgLy8gYmVlbiB1cGRhdGVkLlxuICAgIFN1Yi5zdXBlck9wdGlvbnMgPSBTdXBlci5vcHRpb25zO1xuICAgIFN1Yi5leHRlbmRPcHRpb25zID0gZXh0ZW5kT3B0aW9ucztcbiAgICBTdWIuc2VhbGVkT3B0aW9ucyA9IGV4dGVuZCh7fSwgU3ViLm9wdGlvbnMpO1xuXG4gICAgLy8gY2FjaGUgY29uc3RydWN0b3JcbiAgICBjYWNoZWRDdG9yc1tTdXBlcklkXSA9IFN1YjtcbiAgICByZXR1cm4gU3ViXG4gIH07XG59XG5cbmZ1bmN0aW9uIGluaXRQcm9wcyQxIChDb21wKSB7XG4gIHZhciBwcm9wcyA9IENvbXAub3B0aW9ucy5wcm9wcztcbiAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgcHJveHkoQ29tcC5wcm90b3R5cGUsIFwiX3Byb3BzXCIsIGtleSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdENvbXB1dGVkJDEgKENvbXApIHtcbiAgdmFyIGNvbXB1dGVkID0gQ29tcC5vcHRpb25zLmNvbXB1dGVkO1xuICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcbiAgICBkZWZpbmVDb21wdXRlZChDb21wLnByb3RvdHlwZSwga2V5LCBjb21wdXRlZFtrZXldKTtcbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEFzc2V0UmVnaXN0ZXJzIChWdWUpIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhc3NldCByZWdpc3RyYXRpb24gbWV0aG9kcy5cbiAgICovXG4gIEFTU0VUX1RZUEVTLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBWdWVbdHlwZV0gPSBmdW5jdGlvbiAoXG4gICAgICBpZCxcbiAgICAgIGRlZmluaXRpb25cbiAgICApIHtcbiAgICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGUgPT09ICdjb21wb25lbnQnKSB7XG4gICAgICAgICAgdmFsaWRhdGVDb21wb25lbnROYW1lKGlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ2NvbXBvbmVudCcgJiYgaXNQbGFpbk9iamVjdChkZWZpbml0aW9uKSkge1xuICAgICAgICAgIGRlZmluaXRpb24ubmFtZSA9IGRlZmluaXRpb24ubmFtZSB8fCBpZDtcbiAgICAgICAgICBkZWZpbml0aW9uID0gdGhpcy5vcHRpb25zLl9iYXNlLmV4dGVuZChkZWZpbml0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ2RpcmVjdGl2ZScgJiYgdHlwZW9mIGRlZmluaXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkZWZpbml0aW9uID0geyBiaW5kOiBkZWZpbml0aW9uLCB1cGRhdGU6IGRlZmluaXRpb24gfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdID0gZGVmaW5pdGlvbjtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuLyogICovXG5cblxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lIChvcHRzKSB7XG4gIHJldHVybiBvcHRzICYmIChvcHRzLkN0b3Iub3B0aW9ucy5uYW1lIHx8IG9wdHMudGFnKVxufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChwYXR0ZXJuLCBuYW1lKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4uaW5kZXhPZihuYW1lKSA+IC0xXG4gIH0gZWxzZSBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4uc3BsaXQoJywnKS5pbmRleE9mKG5hbWUpID4gLTFcbiAgfSBlbHNlIGlmIChpc1JlZ0V4cChwYXR0ZXJuKSkge1xuICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobmFtZSlcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gcHJ1bmVDYWNoZSAoa2VlcEFsaXZlSW5zdGFuY2UsIGZpbHRlcikge1xuICB2YXIgY2FjaGUgPSBrZWVwQWxpdmVJbnN0YW5jZS5jYWNoZTtcbiAgdmFyIGtleXMgPSBrZWVwQWxpdmVJbnN0YW5jZS5rZXlzO1xuICB2YXIgX3Zub2RlID0ga2VlcEFsaXZlSW5zdGFuY2UuX3Zub2RlO1xuICBmb3IgKHZhciBrZXkgaW4gY2FjaGUpIHtcbiAgICB2YXIgY2FjaGVkTm9kZSA9IGNhY2hlW2tleV07XG4gICAgaWYgKGNhY2hlZE5vZGUpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShjYWNoZWROb2RlLmNvbXBvbmVudE9wdGlvbnMpO1xuICAgICAgaWYgKG5hbWUgJiYgIWZpbHRlcihuYW1lKSkge1xuICAgICAgICBwcnVuZUNhY2hlRW50cnkoY2FjaGUsIGtleSwga2V5cywgX3Zub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJ1bmVDYWNoZUVudHJ5IChcbiAgY2FjaGUsXG4gIGtleSxcbiAga2V5cyxcbiAgY3VycmVudFxuKSB7XG4gIHZhciBjYWNoZWQkJDEgPSBjYWNoZVtrZXldO1xuICBpZiAoY2FjaGVkJCQxICYmICghY3VycmVudCB8fCBjYWNoZWQkJDEudGFnICE9PSBjdXJyZW50LnRhZykpIHtcbiAgICBjYWNoZWQkJDEuY29tcG9uZW50SW5zdGFuY2UuJGRlc3Ryb3koKTtcbiAgfVxuICBjYWNoZVtrZXldID0gbnVsbDtcbiAgcmVtb3ZlKGtleXMsIGtleSk7XG59XG5cbnZhciBwYXR0ZXJuVHlwZXMgPSBbU3RyaW5nLCBSZWdFeHAsIEFycmF5XTtcblxudmFyIEtlZXBBbGl2ZSA9IHtcbiAgbmFtZTogJ2tlZXAtYWxpdmUnLFxuICBhYnN0cmFjdDogdHJ1ZSxcblxuICBwcm9wczoge1xuICAgIGluY2x1ZGU6IHBhdHRlcm5UeXBlcyxcbiAgICBleGNsdWRlOiBwYXR0ZXJuVHlwZXMsXG4gICAgbWF4OiBbU3RyaW5nLCBOdW1iZXJdXG4gIH0sXG5cbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCAoKSB7XG4gICAgdGhpcy5jYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5rZXlzID0gW107XG4gIH0sXG5cbiAgZGVzdHJveWVkOiBmdW5jdGlvbiBkZXN0cm95ZWQgKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICBwcnVuZUNhY2hlRW50cnkodGhpcy5jYWNoZSwga2V5LCB0aGlzLmtleXMpO1xuICAgIH1cbiAgfSxcblxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHRoaXMuJHdhdGNoKCdpbmNsdWRlJywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcHJ1bmVDYWNoZSh0aGlzJDEsIGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBtYXRjaGVzKHZhbCwgbmFtZSk7IH0pO1xuICAgIH0pO1xuICAgIHRoaXMuJHdhdGNoKCdleGNsdWRlJywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcHJ1bmVDYWNoZSh0aGlzJDEsIGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiAhbWF0Y2hlcyh2YWwsIG5hbWUpOyB9KTtcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgdmFyIHNsb3QgPSB0aGlzLiRzbG90cy5kZWZhdWx0O1xuICAgIHZhciB2bm9kZSA9IGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoc2xvdCk7XG4gICAgdmFyIGNvbXBvbmVudE9wdGlvbnMgPSB2bm9kZSAmJiB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xuICAgIGlmIChjb21wb25lbnRPcHRpb25zKSB7XG4gICAgICAvLyBjaGVjayBwYXR0ZXJuXG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoY29tcG9uZW50T3B0aW9ucyk7XG4gICAgICB2YXIgcmVmID0gdGhpcztcbiAgICAgIHZhciBpbmNsdWRlID0gcmVmLmluY2x1ZGU7XG4gICAgICB2YXIgZXhjbHVkZSA9IHJlZi5leGNsdWRlO1xuICAgICAgaWYgKFxuICAgICAgICAvLyBub3QgaW5jbHVkZWRcbiAgICAgICAgKGluY2x1ZGUgJiYgKCFuYW1lIHx8ICFtYXRjaGVzKGluY2x1ZGUsIG5hbWUpKSkgfHxcbiAgICAgICAgLy8gZXhjbHVkZWRcbiAgICAgICAgKGV4Y2x1ZGUgJiYgbmFtZSAmJiBtYXRjaGVzKGV4Y2x1ZGUsIG5hbWUpKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB2bm9kZVxuICAgICAgfVxuXG4gICAgICB2YXIgcmVmJDEgPSB0aGlzO1xuICAgICAgdmFyIGNhY2hlID0gcmVmJDEuY2FjaGU7XG4gICAgICB2YXIga2V5cyA9IHJlZiQxLmtleXM7XG4gICAgICB2YXIga2V5ID0gdm5vZGUua2V5ID09IG51bGxcbiAgICAgICAgLy8gc2FtZSBjb25zdHJ1Y3RvciBtYXkgZ2V0IHJlZ2lzdGVyZWQgYXMgZGlmZmVyZW50IGxvY2FsIGNvbXBvbmVudHNcbiAgICAgICAgLy8gc28gY2lkIGFsb25lIGlzIG5vdCBlbm91Z2ggKCMzMjY5KVxuICAgICAgICA/IGNvbXBvbmVudE9wdGlvbnMuQ3Rvci5jaWQgKyAoY29tcG9uZW50T3B0aW9ucy50YWcgPyAoXCI6OlwiICsgKGNvbXBvbmVudE9wdGlvbnMudGFnKSkgOiAnJylcbiAgICAgICAgOiB2bm9kZS5rZXk7XG4gICAgICBpZiAoY2FjaGVba2V5XSkge1xuICAgICAgICB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IGNhY2hlW2tleV0uY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIC8vIG1ha2UgY3VycmVudCBrZXkgZnJlc2hlc3RcbiAgICAgICAgcmVtb3ZlKGtleXMsIGtleSk7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FjaGVba2V5XSA9IHZub2RlO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgLy8gcHJ1bmUgb2xkZXN0IGVudHJ5XG4gICAgICAgIGlmICh0aGlzLm1heCAmJiBrZXlzLmxlbmd0aCA+IHBhcnNlSW50KHRoaXMubWF4KSkge1xuICAgICAgICAgIHBydW5lQ2FjaGVFbnRyeShjYWNoZSwga2V5c1swXSwga2V5cywgdGhpcy5fdm5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZub2RlLmRhdGEua2VlcEFsaXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZub2RlIHx8IChzbG90ICYmIHNsb3RbMF0pXG4gIH1cbn07XG5cbnZhciBidWlsdEluQ29tcG9uZW50cyA9IHtcbiAgS2VlcEFsaXZlOiBLZWVwQWxpdmVcbn07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0R2xvYmFsQVBJIChWdWUpIHtcbiAgLy8gY29uZmlnXG4gIHZhciBjb25maWdEZWYgPSB7fTtcbiAgY29uZmlnRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbmZpZzsgfTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjb25maWdEZWYuc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0RvIG5vdCByZXBsYWNlIHRoZSBWdWUuY29uZmlnIG9iamVjdCwgc2V0IGluZGl2aWR1YWwgZmllbGRzIGluc3RlYWQuJ1xuICAgICAgKTtcbiAgICB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUsICdjb25maWcnLCBjb25maWdEZWYpO1xuXG4gIC8vIGV4cG9zZWQgdXRpbCBtZXRob2RzLlxuICAvLyBOT1RFOiB0aGVzZSBhcmUgbm90IGNvbnNpZGVyZWQgcGFydCBvZiB0aGUgcHVibGljIEFQSSAtIGF2b2lkIHJlbHlpbmcgb25cbiAgLy8gdGhlbSB1bmxlc3MgeW91IGFyZSBhd2FyZSBvZiB0aGUgcmlzay5cbiAgVnVlLnV0aWwgPSB7XG4gICAgd2Fybjogd2FybixcbiAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICBtZXJnZU9wdGlvbnM6IG1lcmdlT3B0aW9ucyxcbiAgICBkZWZpbmVSZWFjdGl2ZTogZGVmaW5lUmVhY3RpdmUkJDFcbiAgfTtcblxuICBWdWUuc2V0ID0gc2V0O1xuICBWdWUuZGVsZXRlID0gZGVsO1xuICBWdWUubmV4dFRpY2sgPSBuZXh0VGljaztcblxuICAvLyAyLjYgZXhwbGljaXQgb2JzZXJ2YWJsZSBBUElcbiAgVnVlLm9ic2VydmFibGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgb2JzZXJ2ZShvYmopO1xuICAgIHJldHVybiBvYmpcbiAgfTtcblxuICBWdWUub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIEFTU0VUX1RZUEVTLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBWdWUub3B0aW9uc1t0eXBlICsgJ3MnXSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH0pO1xuXG4gIC8vIHRoaXMgaXMgdXNlZCB0byBpZGVudGlmeSB0aGUgXCJiYXNlXCIgY29uc3RydWN0b3IgdG8gZXh0ZW5kIGFsbCBwbGFpbi1vYmplY3RcbiAgLy8gY29tcG9uZW50cyB3aXRoIGluIFdlZXgncyBtdWx0aS1pbnN0YW5jZSBzY2VuYXJpb3MuXG4gIFZ1ZS5vcHRpb25zLl9iYXNlID0gVnVlO1xuXG4gIGV4dGVuZChWdWUub3B0aW9ucy5jb21wb25lbnRzLCBidWlsdEluQ29tcG9uZW50cyk7XG5cbiAgaW5pdFVzZShWdWUpO1xuICBpbml0TWl4aW4kMShWdWUpO1xuICBpbml0RXh0ZW5kKFZ1ZSk7XG4gIGluaXRBc3NldFJlZ2lzdGVycyhWdWUpO1xufVxuXG5pbml0R2xvYmFsQVBJKFZ1ZSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJGlzU2VydmVyJywge1xuICBnZXQ6IGlzU2VydmVyUmVuZGVyaW5nXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckc3NyQ29udGV4dCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiBnZXQgKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcmV0dXJuIHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHRcbiAgfVxufSk7XG5cbi8vIGV4cG9zZSBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dCBmb3Igc3NyIHJ1bnRpbWUgaGVscGVyIGluc3RhbGxhdGlvblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZSwgJ0Z1bmN0aW9uYWxSZW5kZXJDb250ZXh0Jywge1xuICB2YWx1ZTogRnVuY3Rpb25hbFJlbmRlckNvbnRleHRcbn0pO1xuXG5WdWUudmVyc2lvbiA9ICcyLjYuMTEnO1xuXG4vKipcbiAqIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9UZW5jZW50L3dlc3RvcmUvbWFzdGVyL3BhY2thZ2VzL3dlc3RvcmUvdXRpbHMvZGlmZi5qc1xuICovXG52YXIgQVJSQVlUWVBFID0gJ1tvYmplY3QgQXJyYXldJztcbnZhciBPQkpFQ1RUWVBFID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4vLyBjb25zdCBGVU5DVElPTlRZUEUgPSAnW29iamVjdCBGdW5jdGlvbl0nXG5cbmZ1bmN0aW9uIGRpZmYoY3VycmVudCwgcHJlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHN5bmNLZXlzKGN1cnJlbnQsIHByZSk7XG4gICAgX2RpZmYoY3VycmVudCwgcHJlLCAnJywgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIHN5bmNLZXlzKGN1cnJlbnQsIHByZSkge1xuICAgIGlmIChjdXJyZW50ID09PSBwcmUpIHsgcmV0dXJuIH1cbiAgICB2YXIgcm9vdEN1cnJlbnRUeXBlID0gdHlwZShjdXJyZW50KTtcbiAgICB2YXIgcm9vdFByZVR5cGUgPSB0eXBlKHByZSk7XG4gICAgaWYgKHJvb3RDdXJyZW50VHlwZSA9PSBPQkpFQ1RUWVBFICYmIHJvb3RQcmVUeXBlID09IE9CSkVDVFRZUEUpIHtcbiAgICAgICAgaWYoT2JqZWN0LmtleXMoY3VycmVudCkubGVuZ3RoID49IE9iamVjdC5rZXlzKHByZSkubGVuZ3RoKXtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwcmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gY3VycmVudFtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50W2tleV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN5bmNLZXlzKGN1cnJlbnRWYWx1ZSwgcHJlW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocm9vdEN1cnJlbnRUeXBlID09IEFSUkFZVFlQRSAmJiByb290UHJlVHlwZSA9PSBBUlJBWVRZUEUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQubGVuZ3RoID49IHByZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHN5bmNLZXlzKGN1cnJlbnRbaW5kZXhdLCBpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfZGlmZihjdXJyZW50LCBwcmUsIHBhdGgsIHJlc3VsdCkge1xuICAgIGlmIChjdXJyZW50ID09PSBwcmUpIHsgcmV0dXJuIH1cbiAgICB2YXIgcm9vdEN1cnJlbnRUeXBlID0gdHlwZShjdXJyZW50KTtcbiAgICB2YXIgcm9vdFByZVR5cGUgPSB0eXBlKHByZSk7XG4gICAgaWYgKHJvb3RDdXJyZW50VHlwZSA9PSBPQkpFQ1RUWVBFKSB7XG4gICAgICAgIGlmIChyb290UHJlVHlwZSAhPSBPQkpFQ1RUWVBFIHx8IE9iamVjdC5rZXlzKGN1cnJlbnQpLmxlbmd0aCA8IE9iamVjdC5rZXlzKHByZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCBwYXRoLCBjdXJyZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsb29wID0gZnVuY3Rpb24gKCBrZXkgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlVmFsdWUgPSBwcmVba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFR5cGUgPSB0eXBlKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHByZVR5cGUgPSB0eXBlKHByZVZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFR5cGUgIT0gQVJSQVlUWVBFICYmIGN1cnJlbnRUeXBlICE9IE9CSkVDVFRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAhPSBwcmVba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KHJlc3VsdCwgKHBhdGggPT0gJycgPyAnJyA6IHBhdGggKyBcIi5cIikgKyBrZXksIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09IEFSUkFZVFlQRSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJlVHlwZSAhPSBBUlJBWVRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdChyZXN1bHQsIChwYXRoID09ICcnID8gJycgOiBwYXRoICsgXCIuXCIpICsga2V5LCBjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5sZW5ndGggPCBwcmVWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCAocGF0aCA9PSAnJyA/ICcnIDogcGF0aCArIFwiLlwiKSArIGtleSwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kaWZmKGl0ZW0sIHByZVZhbHVlW2luZGV4XSwgKHBhdGggPT0gJycgPyAnJyA6IHBhdGggKyBcIi5cIikgKyBrZXkgKyAnWycgKyBpbmRleCArICddJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFR5cGUgPT0gT0JKRUNUVFlQRSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJlVHlwZSAhPSBPQkpFQ1RUWVBFIHx8IE9iamVjdC5rZXlzKGN1cnJlbnRWYWx1ZSkubGVuZ3RoIDwgT2JqZWN0LmtleXMocHJlVmFsdWUpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KHJlc3VsdCwgKHBhdGggPT0gJycgPyAnJyA6IHBhdGggKyBcIi5cIikgKyBrZXksIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzdWJLZXkgaW4gY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2RpZmYoY3VycmVudFZhbHVlW3N1YktleV0sIHByZVZhbHVlW3N1YktleV0sIChwYXRoID09ICcnID8gJycgOiBwYXRoICsgXCIuXCIpICsga2V5ICsgJy4nICsgc3ViS2V5LCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGN1cnJlbnQpIGxvb3AoIGtleSApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChyb290Q3VycmVudFR5cGUgPT0gQVJSQVlUWVBFKSB7XG4gICAgICAgIGlmIChyb290UHJlVHlwZSAhPSBBUlJBWVRZUEUpIHtcbiAgICAgICAgICAgIHNldFJlc3VsdChyZXN1bHQsIHBhdGgsIGN1cnJlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQubGVuZ3RoIDwgcHJlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNldFJlc3VsdChyZXN1bHQsIHBhdGgsIGN1cnJlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIF9kaWZmKGl0ZW0sIHByZVtpbmRleF0sIHBhdGggKyAnWycgKyBpbmRleCArICddJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFJlc3VsdChyZXN1bHQsIHBhdGgsIGN1cnJlbnQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0UmVzdWx0KHJlc3VsdCwgaywgdikge1xuICAgIC8vIGlmICh0eXBlKHYpICE9IEZVTkNUSU9OVFlQRSkge1xuICAgICAgICByZXN1bHRba10gPSB2O1xuICAgIC8vIH1cbn1cblxuZnVuY3Rpb24gdHlwZShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iailcbn1cblxuLyogICovXHJcblxyXG5mdW5jdGlvbiBmbHVzaENhbGxiYWNrcyQxKHZtKSB7XHJcbiAgICBpZiAodm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzICYmIHZtLl9fbmV4dF90aWNrX2NhbGxiYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuVlVFX0FQUF9ERUJVRykge1xyXG4gICAgICAgICAgICB2YXIgbXBJbnN0YW5jZSA9IHZtLiRzY29wZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1snICsgKCtuZXcgRGF0ZSkgKyAnXVsnICsgKG1wSW5zdGFuY2UuaXMgfHwgbXBJbnN0YW5jZS5yb3V0ZSkgKyAnXVsnICsgdm0uX3VpZCArXHJcbiAgICAgICAgICAgICAgICAnXTpmbHVzaENhbGxiYWNrc1snICsgdm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzLmxlbmd0aCArICddJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb3BpZXMgPSB2bS5fX25leHRfdGlja19jYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICAgICAgdm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3BpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29waWVzW2ldKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYXNSZW5kZXJXYXRjaGVyKHZtKSB7XHJcbiAgICByZXR1cm4gcXVldWUuZmluZChmdW5jdGlvbiAod2F0Y2hlcikgeyByZXR1cm4gdm0uX3dhdGNoZXIgPT09IHdhdGNoZXI7IH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5leHRUaWNrJDEodm0sIGNiKSB7XHJcbiAgICAvLzEubmV4dFRpY2sg5LmL5YmNIOW3siBzZXREYXRhIOS4lCBzZXREYXRhIOi/mOacquWbnuiwg+WujOaIkFxyXG4gICAgLy8yLm5leHRUaWNrIOS5i+WJjeWtmOWcqCByZW5kZXIgd2F0Y2hlclxyXG4gICAgaWYgKCF2bS5fX25leHRfdGlja19wZW5kaW5nICYmICFoYXNSZW5kZXJXYXRjaGVyKHZtKSkge1xuICAgICAgICBpZihwcm9jZXNzLmVudi5WVUVfQVBQX0RFQlVHKXtcbiAgICAgICAgICAgIHZhciBtcEluc3RhbmNlID0gdm0uJHNjb3BlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1snICsgKCtuZXcgRGF0ZSkgKyAnXVsnICsgKG1wSW5zdGFuY2UuaXMgfHwgbXBJbnN0YW5jZS5yb3V0ZSkgKyAnXVsnICsgdm0uX3VpZCArXG4gICAgICAgICAgICAgICAgJ106bmV4dFZ1ZVRpY2snKTtcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0VGljayhjYiwgdm0pXHJcbiAgICB9ZWxzZXtcbiAgICAgICAgaWYocHJvY2Vzcy5lbnYuVlVFX0FQUF9ERUJVRyl7XG4gICAgICAgICAgICB2YXIgbXBJbnN0YW5jZSQxID0gdm0uJHNjb3BlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1snICsgKCtuZXcgRGF0ZSkgKyAnXVsnICsgKG1wSW5zdGFuY2UkMS5pcyB8fCBtcEluc3RhbmNlJDEucm91dGUpICsgJ11bJyArIHZtLl91aWQgK1xuICAgICAgICAgICAgICAgICddOm5leHRNUFRpY2snKTtcbiAgICAgICAgfVxuICAgIH1cclxuICAgIHZhciBfcmVzb2x2ZTtcclxuICAgIGlmICghdm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgdm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzID0gW107XHJcbiAgICB9XHJcbiAgICB2bS5fX25leHRfdGlja19jYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjYi5jYWxsKHZtKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sICduZXh0VGljaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfcmVzb2x2ZSkge1xyXG4gICAgICAgICAgICBfcmVzb2x2ZSh2bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcclxuICAgIGlmICghY2IgJiYgdHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XG5cbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gY2xvbmVXaXRoRGF0YSh2bSkge1xyXG4gIC8vIOehruS/neW9k+WJjSB2bSDmiYDmnInmlbDmja7ooqvlkIzmraVcclxuICB2YXIgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICB2YXIgZGF0YUtleXMgPSBbXS5jb25jYXQoXHJcbiAgICBPYmplY3Qua2V5cyh2bS5fZGF0YSB8fCB7fSksXHJcbiAgICBPYmplY3Qua2V5cyh2bS5fY29tcHV0ZWRXYXRjaGVycyB8fCB7fSkpO1xyXG5cclxuICBkYXRhS2V5cy5yZWR1Y2UoZnVuY3Rpb24ocmV0LCBrZXkpIHtcclxuICAgIHJldFtrZXldID0gdm1ba2V5XTtcclxuICAgIHJldHVybiByZXRcclxuICB9LCByZXQpO1xyXG4gIC8vVE9ETyDpnIDopoHmiorml6DnlKjmlbDmja7lpITnkIbmjonvvIzmr5TlpoIgbGlzdD0+bDAg5YiZIGxpc3Qg6ZyA6KaB56e76Zmk77yM5ZCm5YiZ5aSa5Lyg6L6T5LiA5Lu95pWw5o2uXHJcbiAgT2JqZWN0LmFzc2lnbihyZXQsIHZtLiRtcC5kYXRhIHx8IHt9KTtcclxuICBpZiAoXHJcbiAgICBBcnJheS5pc0FycmF5KHZtLiRvcHRpb25zLmJlaGF2aW9ycykgJiZcclxuICAgIHZtLiRvcHRpb25zLmJlaGF2aW9ycy5pbmRleE9mKCd1bmk6Ly9mb3JtLWZpZWxkJykgIT09IC0xXHJcbiAgKSB7IC8vZm9ybS1maWVsZFxyXG4gICAgcmV0WyduYW1lJ10gPSB2bS5uYW1lO1xyXG4gICAgcmV0Wyd2YWx1ZSddID0gdm0udmFsdWU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXQpKVxyXG59XHJcblxyXG52YXIgcGF0Y2ggPSBmdW5jdGlvbihvbGRWbm9kZSwgdm5vZGUpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cclxuICBpZiAodm5vZGUgPT09IG51bGwpIHsgLy9kZXN0cm95XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgaWYgKHRoaXMubXBUeXBlID09PSAncGFnZScgfHwgdGhpcy5tcFR5cGUgPT09ICdjb21wb25lbnQnKSB7XHJcbiAgICB2YXIgbXBJbnN0YW5jZSA9IHRoaXMuJHNjb3BlO1xyXG4gICAgdmFyIGRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGF0YSA9IGNsb25lV2l0aERhdGEodGhpcyk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgfVxyXG4gICAgZGF0YS5fX3dlYnZpZXdJZF9fID0gbXBJbnN0YW5jZS5kYXRhLl9fd2Vidmlld0lkX187XHJcbiAgICB2YXIgbXBEYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyAvL+S7heWQjOatpSBkYXRhIOS4reacieeahOaVsOaNrlxyXG4gICAgICBtcERhdGFba2V5XSA9IG1wSW5zdGFuY2UuZGF0YVtrZXldO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgZGlmZkRhdGEgPSB0aGlzLiRzaG91bGREaWZmRGF0YSA9PT0gZmFsc2UgPyBkYXRhIDogZGlmZihkYXRhLCBtcERhdGEpO1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKGRpZmZEYXRhKS5sZW5ndGgpIHtcclxuICAgICAgaWYgKHByb2Nlc3MuZW52LlZVRV9BUFBfREVCVUcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnWycgKyAoK25ldyBEYXRlKSArICddWycgKyAobXBJbnN0YW5jZS5pcyB8fCBtcEluc3RhbmNlLnJvdXRlKSArICddWycgKyB0aGlzLl91aWQgK1xyXG4gICAgICAgICAgJ13lt67ph4/mm7TmlrAnLFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGlmZkRhdGEpKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9fbmV4dF90aWNrX3BlbmRpbmcgPSB0cnVlO1xyXG4gICAgICBtcEluc3RhbmNlLnNldERhdGEoZGlmZkRhdGEsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzJDEuX19uZXh0X3RpY2tfcGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGZsdXNoQ2FsbGJhY2tzJDEodGhpcyQxKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmbHVzaENhbGxiYWNrcyQxKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcblxuLyogICovXG5cbmZ1bmN0aW9uIGNyZWF0ZUVtcHR5UmVuZGVyKCkge1xuXG59XG5cbmZ1bmN0aW9uIG1vdW50Q29tcG9uZW50JDEoXG4gIHZtLFxuICBlbCxcbiAgaHlkcmF0aW5nXG4pIHtcbiAgaWYgKCF2bS5tcFR5cGUpIHsvL21haW4uanMg5Lit55qEIG5ldyBWdWVcbiAgICByZXR1cm4gdm1cbiAgfVxuICBpZiAodm0ubXBUeXBlID09PSAnYXBwJykge1xuICAgIHZtLiRvcHRpb25zLnJlbmRlciA9IGNyZWF0ZUVtcHR5UmVuZGVyO1xuICB9XG4gIGlmICghdm0uJG9wdGlvbnMucmVuZGVyKSB7XG4gICAgdm0uJG9wdGlvbnMucmVuZGVyID0gY3JlYXRlRW1wdHlSZW5kZXI7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCh2bS4kb3B0aW9ucy50ZW1wbGF0ZSAmJiB2bS4kb3B0aW9ucy50ZW1wbGF0ZS5jaGFyQXQoMCkgIT09ICcjJykgfHxcbiAgICAgICAgdm0uJG9wdGlvbnMuZWwgfHwgZWwpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnWW91IGFyZSB1c2luZyB0aGUgcnVudGltZS1vbmx5IGJ1aWxkIG9mIFZ1ZSB3aGVyZSB0aGUgdGVtcGxhdGUgJyArXG4gICAgICAgICAgJ2NvbXBpbGVyIGlzIG5vdCBhdmFpbGFibGUuIEVpdGhlciBwcmUtY29tcGlsZSB0aGUgdGVtcGxhdGVzIGludG8gJyArXG4gICAgICAgICAgJ3JlbmRlciBmdW5jdGlvbnMsIG9yIHVzZSB0aGUgY29tcGlsZXItaW5jbHVkZWQgYnVpbGQuJyxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnRmFpbGVkIHRvIG1vdW50IGNvbXBvbmVudDogdGVtcGxhdGUgb3IgcmVuZGVyIGZ1bmN0aW9uIG5vdCBkZWZpbmVkLicsXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIHZtLm1wSG9zdCAhPT0gJ21wLXRvdXRpYW8nICYmIGNhbGxIb29rKHZtLCAnYmVmb3JlTW91bnQnKTtcblxuICB2YXIgdXBkYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZtLl91cGRhdGUodm0uX3JlbmRlcigpLCBoeWRyYXRpbmcpO1xuICB9O1xuXG4gIC8vIHdlIHNldCB0aGlzIHRvIHZtLl93YXRjaGVyIGluc2lkZSB0aGUgd2F0Y2hlcidzIGNvbnN0cnVjdG9yXG4gIC8vIHNpbmNlIHRoZSB3YXRjaGVyJ3MgaW5pdGlhbCBwYXRjaCBtYXkgY2FsbCAkZm9yY2VVcGRhdGUgKGUuZy4gaW5zaWRlIGNoaWxkXG4gIC8vIGNvbXBvbmVudCdzIG1vdW50ZWQgaG9vayksIHdoaWNoIHJlbGllcyBvbiB2bS5fd2F0Y2hlciBiZWluZyBhbHJlYWR5IGRlZmluZWRcbiAgbmV3IFdhdGNoZXIodm0sIHVwZGF0ZUNvbXBvbmVudCwgbm9vcCwge1xuICAgIGJlZm9yZTogZnVuY3Rpb24gYmVmb3JlKCkge1xuICAgICAgaWYgKHZtLl9pc01vdW50ZWQgJiYgIXZtLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZVVwZGF0ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgdHJ1ZSAvKiBpc1JlbmRlcldhdGNoZXIgKi8pO1xuICBoeWRyYXRpbmcgPSBmYWxzZTtcbiAgcmV0dXJuIHZtXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiByZW5kZXJDbGFzcyAoXG4gIHN0YXRpY0NsYXNzLFxuICBkeW5hbWljQ2xhc3Ncbikge1xuICBpZiAoaXNEZWYoc3RhdGljQ2xhc3MpIHx8IGlzRGVmKGR5bmFtaWNDbGFzcykpIHtcbiAgICByZXR1cm4gY29uY2F0KHN0YXRpY0NsYXNzLCBzdHJpbmdpZnlDbGFzcyhkeW5hbWljQ2xhc3MpKVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBjb25jYXQgKGEsIGIpIHtcbiAgcmV0dXJuIGEgPyBiID8gKGEgKyAnICcgKyBiKSA6IGEgOiAoYiB8fCAnJylcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5Q2xhc3MgKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBzdHJpbmdpZnlBcnJheSh2YWx1ZSlcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN0cmluZ2lmeU9iamVjdCh2YWx1ZSlcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlBcnJheSAodmFsdWUpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICB2YXIgc3RyaW5naWZpZWQ7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGlzRGVmKHN0cmluZ2lmaWVkID0gc3RyaW5naWZ5Q2xhc3ModmFsdWVbaV0pKSAmJiBzdHJpbmdpZmllZCAhPT0gJycpIHtcbiAgICAgIGlmIChyZXMpIHsgcmVzICs9ICcgJzsgfVxuICAgICAgcmVzICs9IHN0cmluZ2lmaWVkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdCAodmFsdWUpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAodmFsdWVba2V5XSkge1xuICAgICAgaWYgKHJlcykgeyByZXMgKz0gJyAnOyB9XG4gICAgICByZXMgKz0ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG52YXIgcGFyc2VTdHlsZVRleHQgPSBjYWNoZWQoZnVuY3Rpb24gKGNzc1RleHQpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICB2YXIgbGlzdERlbGltaXRlciA9IC87KD8hW14oXSpcXCkpL2c7XG4gIHZhciBwcm9wZXJ0eURlbGltaXRlciA9IC86KC4rKS87XG4gIGNzc1RleHQuc3BsaXQobGlzdERlbGltaXRlcikuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICB2YXIgdG1wID0gaXRlbS5zcGxpdChwcm9wZXJ0eURlbGltaXRlcik7XG4gICAgICB0bXAubGVuZ3RoID4gMSAmJiAocmVzW3RtcFswXS50cmltKCldID0gdG1wWzFdLnRyaW0oKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc1xufSk7XG5cbi8vIG5vcm1hbGl6ZSBwb3NzaWJsZSBhcnJheSAvIHN0cmluZyB2YWx1ZXMgaW50byBPYmplY3RcbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0eWxlQmluZGluZyAoYmluZGluZ1N0eWxlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGJpbmRpbmdTdHlsZSkpIHtcbiAgICByZXR1cm4gdG9PYmplY3QoYmluZGluZ1N0eWxlKVxuICB9XG4gIGlmICh0eXBlb2YgYmluZGluZ1N0eWxlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBwYXJzZVN0eWxlVGV4dChiaW5kaW5nU3R5bGUpXG4gIH1cbiAgcmV0dXJuIGJpbmRpbmdTdHlsZVxufVxuXG4vKiAgKi9cclxuXHJcbnZhciBNUF9NRVRIT0RTID0gWydjcmVhdGVTZWxlY3RvclF1ZXJ5JywgJ2NyZWF0ZUludGVyc2VjdGlvbk9ic2VydmVyJywgJ3NlbGVjdEFsbENvbXBvbmVudHMnLCAnc2VsZWN0Q29tcG9uZW50J107XHJcblxyXG5mdW5jdGlvbiBnZXRUYXJnZXQob2JqLCBwYXRoKSB7XHJcbiAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgnLicpO1xyXG4gIHZhciBrZXkgPSBwYXJ0c1swXTtcclxuICBpZiAoa2V5LmluZGV4T2YoJ19fJG4nKSA9PT0gMCkgeyAvL251bWJlciBpbmRleFxyXG4gICAga2V5ID0gcGFyc2VJbnQoa2V5LnJlcGxhY2UoJ19fJG4nLCAnJykpO1xyXG4gIH1cclxuICBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gb2JqW2tleV1cclxuICB9XHJcbiAgcmV0dXJuIGdldFRhcmdldChvYmpba2V5XSwgcGFydHMuc2xpY2UoMSkuam9pbignLicpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm5hbE1peGluKFZ1ZSkge1xyXG5cclxuICBWdWUuY29uZmlnLmVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4gICAgdmFyIGFwcCA9IGdldEFwcCgpO1xyXG4gICAgaWYgKGFwcCAmJiBhcHAub25FcnJvcikge1xyXG4gICAgICBhcHAub25FcnJvcihlcnIpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHZhciBvbGRFbWl0ID0gVnVlLnByb3RvdHlwZS4kZW1pdDtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy4kc2NvcGUgJiYgZXZlbnQpIHtcclxuICAgICAgdGhpcy4kc2NvcGVbJ3RyaWdnZXJFdmVudCddKGV2ZW50LCB7XHJcbiAgICAgICAgX19hcmdzX186IHRvQXJyYXkoYXJndW1lbnRzLCAxKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBvbGRFbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcclxuICB9O1xyXG5cclxuICBWdWUucHJvdG90eXBlLiRuZXh0VGljayA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICByZXR1cm4gbmV4dFRpY2skMSh0aGlzLCBmbilcclxuICB9O1xyXG5cclxuICBNUF9NRVRIT0RTLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xyXG4gICAgVnVlLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJncykge1xyXG4gICAgICBpZiAodGhpcy4kc2NvcGUgJiYgdGhpcy4kc2NvcGVbbWV0aG9kXSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRzY29wZVttZXRob2RdKGFyZ3MpXHJcbiAgICAgIH1cclxuICAgICAgLy8gbXAtYWxpcGF5XHJcbiAgICAgIGlmICh0eXBlb2YgbXkgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1ldGhvZCA9PT0gJ2NyZWF0ZVNlbGVjdG9yUXVlcnknKSB7XHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuICAgICAgICByZXR1cm4gbXkuY3JlYXRlU2VsZWN0b3JRdWVyeShhcmdzKVxyXG4gICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ2NyZWF0ZUludGVyc2VjdGlvbk9ic2VydmVyJykge1xyXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbiAgICAgICAgcmV0dXJuIG15LmNyZWF0ZUludGVyc2VjdGlvbk9ic2VydmVyKGFyZ3MpXHJcbiAgICAgIH1cclxuICAgICAgLy8gVE9ETyBtcC1hbGlwYXkg5pqC5LiN5pSv5oyBIHNlbGVjdEFsbENvbXBvbmVudHMsc2VsZWN0Q29tcG9uZW50XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBWdWUucHJvdG90eXBlLl9faW5pdF9wcm92aWRlID0gaW5pdFByb3ZpZGU7XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX19pbml0X2luamVjdGlvbnMgPSBpbml0SW5qZWN0aW9ucztcclxuXHJcbiAgVnVlLnByb3RvdHlwZS5fX2NhbGxfaG9vayA9IGZ1bmN0aW9uKGhvb2ssIGFyZ3MpIHtcclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAvLyAjNzU3MyBkaXNhYmxlIGRlcCBjb2xsZWN0aW9uIHdoZW4gaW52b2tpbmcgbGlmZWN5Y2xlIGhvb2tzXHJcbiAgICBwdXNoVGFyZ2V0KCk7XHJcbiAgICB2YXIgaGFuZGxlcnMgPSB2bS4kb3B0aW9uc1tob29rXTtcclxuICAgIHZhciBpbmZvID0gaG9vayArIFwiIGhvb2tcIjtcclxuICAgIHZhciByZXQ7XHJcbiAgICBpZiAoaGFuZGxlcnMpIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICByZXQgPSBpbnZva2VXaXRoRXJyb3JIYW5kbGluZyhoYW5kbGVyc1tpXSwgdm0sIGFyZ3MgPyBbYXJnc10gOiBudWxsLCB2bSwgaW5mbyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh2bS5faGFzSG9va0V2ZW50KSB7XHJcbiAgICAgIHZtLiRlbWl0KCdob29rOicgKyBob29rLCBhcmdzKTtcclxuICAgIH1cclxuICAgIHBvcFRhcmdldCgpO1xyXG4gICAgcmV0dXJuIHJldFxyXG4gIH07XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX19zZXRfbW9kZWwgPSBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUsIG1vZGlmaWVycykge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobW9kaWZpZXJzKSkge1xyXG4gICAgICBpZiAobW9kaWZpZXJzLmluZGV4T2YoJ3RyaW0nKSAhPT0gLTEpIHtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobW9kaWZpZXJzLmluZGV4T2YoJ251bWJlcicpICE9PSAtMSkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5fbih2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgIHRhcmdldCA9IHRoaXM7XHJcbiAgICB9XHJcbiAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xyXG4gIH07XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX19zZXRfc3luYyA9IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgdGFyZ2V0ID0gdGhpcztcclxuICAgIH1cclxuICAgIHRhcmdldFtrZXldID0gdmFsdWU7XHJcbiAgfTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS5fX2dldF9vcmlnID0gZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgaWYgKGlzUGxhaW5PYmplY3QoaXRlbSkpIHtcclxuICAgICAgcmV0dXJuIGl0ZW1bJyRvcmlnJ10gfHwgaXRlbVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGl0ZW1cclxuICB9O1xyXG5cclxuICBWdWUucHJvdG90eXBlLl9fZ2V0X3ZhbHVlID0gZnVuY3Rpb24oZGF0YVBhdGgsIHRhcmdldCkge1xyXG4gICAgcmV0dXJuIGdldFRhcmdldCh0YXJnZXQgfHwgdGhpcywgZGF0YVBhdGgpXHJcbiAgfTtcclxuXHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX19nZXRfY2xhc3MgPSBmdW5jdGlvbihkeW5hbWljQ2xhc3MsIHN0YXRpY0NsYXNzKSB7XHJcbiAgICByZXR1cm4gcmVuZGVyQ2xhc3Moc3RhdGljQ2xhc3MsIGR5bmFtaWNDbGFzcylcclxuICB9O1xyXG5cclxuICBWdWUucHJvdG90eXBlLl9fZ2V0X3N0eWxlID0gZnVuY3Rpb24oZHluYW1pY1N0eWxlLCBzdGF0aWNTdHlsZSkge1xyXG4gICAgaWYgKCFkeW5hbWljU3R5bGUgJiYgIXN0YXRpY1N0eWxlKSB7XHJcbiAgICAgIHJldHVybiAnJ1xyXG4gICAgfVxyXG4gICAgdmFyIGR5bmFtaWNTdHlsZU9iaiA9IG5vcm1hbGl6ZVN0eWxlQmluZGluZyhkeW5hbWljU3R5bGUpO1xyXG4gICAgdmFyIHN0eWxlT2JqID0gc3RhdGljU3R5bGUgPyBleHRlbmQoc3RhdGljU3R5bGUsIGR5bmFtaWNTdHlsZU9iaikgOiBkeW5hbWljU3R5bGVPYmo7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGVPYmopLm1hcChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gKChoeXBoZW5hdGUobmFtZSkpICsgXCI6XCIgKyAoc3R5bGVPYmpbbmFtZV0pKTsgfSkuam9pbignOycpXHJcbiAgfTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS5fX21hcCA9IGZ1bmN0aW9uKHZhbCwgaXRlcmF0ZWUpIHtcclxuICAgIC8vVE9ETyDmmoLkuI3ogIPomZEgc3RyaW5nLG51bWJlclxyXG4gICAgdmFyIHJldCwgaSwgbCwga2V5cywga2V5O1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xyXG4gICAgICByZXQgPSBuZXcgQXJyYXkodmFsLmxlbmd0aCk7XHJcbiAgICAgIGZvciAoaSA9IDAsIGwgPSB2YWwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgcmV0W2ldID0gaXRlcmF0ZWUodmFsW2ldLCBpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmV0XHJcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcclxuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XHJcbiAgICAgIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgcmV0W2tleV0gPSBpdGVyYXRlZSh2YWxba2V5XSwga2V5LCBpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmV0XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW11cclxuICB9O1xyXG5cclxufVxuXG4vKiAgKi9cclxuXHJcbnZhciBMSUZFQ1lDTEVfSE9PS1MkMSA9IFtcclxuICAgIC8vQXBwXHJcbiAgICAnb25MYXVuY2gnLFxyXG4gICAgJ29uU2hvdycsXHJcbiAgICAnb25IaWRlJyxcclxuICAgICdvblVuaU5WaWV3TWVzc2FnZScsXG4gICAgJ29uRXJyb3InLFxyXG4gICAgLy9QYWdlXHJcbiAgICAnb25Mb2FkJyxcclxuICAgIC8vICdvblNob3cnLFxyXG4gICAgJ29uUmVhZHknLFxyXG4gICAgLy8gJ29uSGlkZScsXHJcbiAgICAnb25VbmxvYWQnLFxyXG4gICAgJ29uUHVsbERvd25SZWZyZXNoJyxcclxuICAgICdvblJlYWNoQm90dG9tJyxcclxuICAgICdvblRhYkl0ZW1UYXAnLFxyXG4gICAgJ29uU2hhcmVBcHBNZXNzYWdlJyxcbiAgICAnb25SZXNpemUnLFxyXG4gICAgJ29uUGFnZVNjcm9sbCcsXHJcbiAgICAnb25OYXZpZ2F0aW9uQmFyQnV0dG9uVGFwJyxcclxuICAgICdvbkJhY2tQcmVzcycsXHJcbiAgICAnb25OYXZpZ2F0aW9uQmFyU2VhcmNoSW5wdXRDaGFuZ2VkJyxcclxuICAgICdvbk5hdmlnYXRpb25CYXJTZWFyY2hJbnB1dENvbmZpcm1lZCcsXHJcbiAgICAnb25OYXZpZ2F0aW9uQmFyU2VhcmNoSW5wdXRDbGlja2VkJyxcclxuICAgIC8vQ29tcG9uZW50XHJcbiAgICAvLyAnb25SZWFkeScsIC8vIOWFvOWuueaXp+eJiOacrO+8jOW6lOivpeenu+mZpOivpeS6i+S7tlxyXG4gICAgJ29uUGFnZVNob3cnLFxyXG4gICAgJ29uUGFnZUhpZGUnLFxyXG4gICAgJ29uUGFnZVJlc2l6ZSdcclxuXTtcclxuZnVuY3Rpb24gbGlmZWN5Y2xlTWl4aW4kMShWdWUpIHtcclxuXHJcbiAgICAvL2ZpeGVkIHZ1ZS1jbGFzcy1jb21wb25lbnRcclxuICAgIHZhciBvbGRFeHRlbmQgPSBWdWUuZXh0ZW5kO1xyXG4gICAgVnVlLmV4dGVuZCA9IGZ1bmN0aW9uKGV4dGVuZE9wdGlvbnMpIHtcclxuICAgICAgICBleHRlbmRPcHRpb25zID0gZXh0ZW5kT3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgdmFyIG1ldGhvZHMgPSBleHRlbmRPcHRpb25zLm1ldGhvZHM7XHJcbiAgICAgICAgaWYgKG1ldGhvZHMpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKExJRkVDWUNMRV9IT09LUyQxLmluZGV4T2YobWV0aG9kTmFtZSkhPT0tMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZE9wdGlvbnNbbWV0aG9kTmFtZV0gPSBtZXRob2RzW21ldGhvZE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtZXRob2RzW21ldGhvZE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvbGRFeHRlbmQuY2FsbCh0aGlzLCBleHRlbmRPcHRpb25zKVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc3RyYXRlZ2llcyA9IFZ1ZS5jb25maWcub3B0aW9uTWVyZ2VTdHJhdGVnaWVzO1xyXG4gICAgdmFyIG1lcmdlSG9vayA9IHN0cmF0ZWdpZXMuY3JlYXRlZDtcclxuICAgIExJRkVDWUNMRV9IT09LUyQxLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcclxuICAgICAgICBzdHJhdGVnaWVzW2hvb2tdID0gbWVyZ2VIb29rO1xyXG4gICAgfSk7XHJcblxyXG4gICAgVnVlLnByb3RvdHlwZS5fX2xpZmVjeWNsZV9ob29rc19fID0gTElGRUNZQ0xFX0hPT0tTJDE7XHJcbn1cblxuLyogICovXHJcblxuLy8gaW5zdGFsbCBwbGF0Zm9ybSBwYXRjaCBmdW5jdGlvblxyXG5WdWUucHJvdG90eXBlLl9fcGF0Y2hfXyA9IHBhdGNoO1xyXG5cclxuLy8gcHVibGljIG1vdW50IG1ldGhvZFxyXG5WdWUucHJvdG90eXBlLiRtb3VudCA9IGZ1bmN0aW9uKFxyXG4gICAgZWwgLFxyXG4gICAgaHlkcmF0aW5nIFxyXG4pIHtcclxuICAgIHJldHVybiBtb3VudENvbXBvbmVudCQxKHRoaXMsIGVsLCBoeWRyYXRpbmcpXHJcbn07XHJcblxyXG5saWZlY3ljbGVNaXhpbiQxKFZ1ZSk7XHJcbmludGVybmFsTWl4aW4oVnVlKTtcblxuLyogICovXG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xyXG5cclxuY29uc3QgU1RBVF9WRVJTSU9OID0gdmVyc2lvbjtcclxuY29uc3QgU1RBVF9VUkwgPSAnaHR0cHM6Ly90b25namkuZGNsb3VkLmlvL3VuaS9zdGF0JztcclxuY29uc3QgU1RBVF9INV9VUkwgPSAnaHR0cHM6Ly90b25namkuZGNsb3VkLmlvL3VuaS9zdGF0LmdpZic7IFxyXG5jb25zdCBQQUdFX1BWRVJfVElNRSA9IDE4MDA7XHJcbmNvbnN0IEFQUF9QVkVSX1RJTUUgPSAzMDA7XHJcbmNvbnN0IE9QRVJBVElOR19USU1FID0gMTA7XHJcblxyXG5jb25zdCBVVUlEX0tFWSA9ICdfX0RDX1NUQVRfVVVJRCc7XHJcbmNvbnN0IFVVSURfVkFMVUUgPSAnX19EQ19VVUlEX1ZBTFVFJztcclxuXHJcbmZ1bmN0aW9uIGdldFV1aWQoKSB7XHJcbiAgbGV0IHV1aWQgPSAnJztcclxuICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICduJykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdXVpZCA9IHBsdXMucnVudGltZS5nZXREQ2xvdWRJZCgpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICB1dWlkID0gJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXVpZFxyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIHV1aWQgPSB1bmkuZ2V0U3RvcmFnZVN5bmMoVVVJRF9LRVkpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHV1aWQgPSBVVUlEX1ZBTFVFO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF1dWlkKSB7XHJcbiAgICB1dWlkID0gRGF0ZS5ub3coKSArICcnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMWU3KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHVuaS5zZXRTdG9yYWdlU3luYyhVVUlEX0tFWSwgdXVpZCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHVuaS5zZXRTdG9yYWdlU3luYyhVVUlEX0tFWSwgVVVJRF9WQUxVRSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB1dWlkO1xyXG59XHJcblxyXG5jb25zdCBnZXRTZ2luID0gKHN0YXREYXRhKSA9PiB7XHJcbiAgbGV0IGFyciA9IE9iamVjdC5rZXlzKHN0YXREYXRhKTtcclxuICBsZXQgc29ydEFyciA9IGFyci5zb3J0KCk7XHJcbiAgbGV0IHNnaW4gPSB7fTtcclxuICBsZXQgc2dpblN0ciA9ICcnO1xyXG4gIGZvciAodmFyIGkgaW4gc29ydEFycikge1xyXG4gICAgc2dpbltzb3J0QXJyW2ldXSA9IHN0YXREYXRhW3NvcnRBcnJbaV1dO1xyXG4gICAgc2dpblN0ciArPSBzb3J0QXJyW2ldICsgJz0nICsgc3RhdERhdGFbc29ydEFycltpXV0gKyAnJic7XHJcbiAgfVxyXG4gIC8vIGNvbnN0IG9wdGlvbnMgPSBzZ2luU3RyLnN1YnN0cigwLCBzZ2luU3RyLmxlbmd0aCAtIDEpXHJcbiAgLy8gc2dpblN0ciA9IHNnaW5TdHIuc3Vic3RyKDAsIHNnaW5TdHIubGVuZ3RoIC0gMSkgKyAnJmtleT0nICsgU1RBVF9LRVk7XHJcbiAgLy8gY29uc3Qgc2kgPSBjcnlwdG8uY3JlYXRlSGFzaCgnbWQ1JykudXBkYXRlKHNnaW5TdHIpLmRpZ2VzdCgnaGV4Jyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHNpZ246ICcnLFxyXG4gICAgb3B0aW9uczogc2dpblN0ci5zdWJzdHIoMCwgc2dpblN0ci5sZW5ndGggLSAxKVxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBnZXRTcGxpY2luZyA9IChkYXRhKSA9PiB7XHJcbiAgbGV0IHN0ciA9ICcnO1xyXG4gIGZvciAodmFyIGkgaW4gZGF0YSkge1xyXG4gICAgc3RyICs9IGkgKyAnPScgKyBkYXRhW2ldICsgJyYnO1xyXG4gIH1cclxuICByZXR1cm4gc3RyLnN1YnN0cigwLCBzdHIubGVuZ3RoIC0gMSlcclxufTtcclxuXHJcbmNvbnN0IGdldFRpbWUgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHBhcnNlSW50KG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRQbGF0Zm9ybU5hbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxhdGZvcm1MaXN0ID0ge1xyXG4gICAgJ2FwcC1wbHVzJzogJ24nLFxyXG4gICAgJ2g1JzogJ2g1JyxcclxuICAgICdtcC13ZWl4aW4nOiAnd3gnLFxyXG4gICAgJ21wLWFsaXBheSc6ICdhbGknLFxyXG4gICAgJ21wLWJhaWR1JzogJ2JkJyxcclxuICAgICdtcC10b3V0aWFvJzogJ3R0JyxcclxuICAgICdtcC1xcSc6ICdxcSdcclxuICB9O1xyXG4gIHJldHVybiBwbGF0Zm9ybUxpc3RbcHJvY2Vzcy5lbnYuVlVFX0FQUF9QTEFURk9STV07XHJcbn07XHJcblxyXG5jb25zdCBnZXRQYWNrTmFtZSA9ICgpID0+IHtcclxuICBsZXQgcGFja05hbWUgPSAnJztcclxuICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICd3eCcgfHwgZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICdxcScpIHtcclxuICAgIC8vIOWFvOWuueW+ruS/oeWwj+eoi+W6j+S9jueJiOacrOWfuuehgOW6k1xyXG4gICAgaWYodW5pLmNhbklVc2UoJ2dldEFjY291bnRJbmZvU3luYycpKXtcclxuICAgICAgcGFja05hbWUgPSB1bmkuZ2V0QWNjb3VudEluZm9TeW5jKCkubWluaVByb2dyYW0uYXBwSWQgfHwgJyc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBwYWNrTmFtZVxyXG59O1xyXG5cclxuY29uc3QgZ2V0VmVyc2lvbiA9ICgpID0+IHtcclxuICByZXR1cm4gZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICduJyA/IHBsdXMucnVudGltZS52ZXJzaW9uIDogJyc7XHJcbn07XHJcblxyXG5jb25zdCBnZXRDaGFubmVsID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXRmb3JtTmFtZSA9IGdldFBsYXRmb3JtTmFtZSgpO1xyXG4gIGxldCBjaGFubmVsID0gJyc7XHJcbiAgaWYgKHBsYXRmb3JtTmFtZSA9PT0gJ24nKSB7XHJcbiAgICBjaGFubmVsID0gcGx1cy5ydW50aW1lLmNoYW5uZWw7XHJcbiAgfVxyXG4gIHJldHVybiBjaGFubmVsO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0U2NlbmUgPSAob3B0aW9ucykgPT4ge1xyXG4gIGNvbnN0IHBsYXRmb3JtTmFtZSA9IGdldFBsYXRmb3JtTmFtZSgpO1xyXG4gIGxldCBzY2VuZSA9ICcnO1xyXG4gIGlmIChvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcbiAgaWYgKHBsYXRmb3JtTmFtZSA9PT0gJ3d4Jykge1xyXG4gICAgc2NlbmUgPSB1bmkuZ2V0TGF1bmNoT3B0aW9uc1N5bmMoKS5zY2VuZTtcclxuICB9XHJcbiAgcmV0dXJuIHNjZW5lO1xyXG59O1xyXG5jb25zdCBGaXJzdF9fVmlzaXRfX1RpbWVfX0tFWSA9ICdGaXJzdF9fVmlzaXRfX1RpbWUnO1xyXG5jb25zdCBMYXN0X19WaXNpdF9fVGltZV9fS0VZID0gJ0xhc3RfX1Zpc2l0X19UaW1lJztcclxuXHJcbmNvbnN0IGdldEZpcnN0VmlzaXRUaW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IHRpbWVTdG9yZ2UgPSB1bmkuZ2V0U3RvcmFnZVN5bmMoRmlyc3RfX1Zpc2l0X19UaW1lX19LRVkpO1xyXG4gIGxldCB0aW1lID0gMDtcclxuICBpZiAodGltZVN0b3JnZSkge1xyXG4gICAgdGltZSA9IHRpbWVTdG9yZ2U7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWUgPSBnZXRUaW1lKCk7XHJcbiAgICB1bmkuc2V0U3RvcmFnZVN5bmMoRmlyc3RfX1Zpc2l0X19UaW1lX19LRVksIHRpbWUpO1xyXG4gICAgdW5pLnJlbW92ZVN0b3JhZ2VTeW5jKExhc3RfX1Zpc2l0X19UaW1lX19LRVkpO1xyXG4gIH1cclxuICByZXR1cm4gdGltZTtcclxufTtcclxuXHJcbmNvbnN0IGdldExhc3RWaXNpdFRpbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgdGltZVN0b3JnZSA9IHVuaS5nZXRTdG9yYWdlU3luYyhMYXN0X19WaXNpdF9fVGltZV9fS0VZKTtcclxuICBsZXQgdGltZSA9IDA7XHJcbiAgaWYgKHRpbWVTdG9yZ2UpIHtcclxuICAgIHRpbWUgPSB0aW1lU3RvcmdlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aW1lID0gJyc7XHJcbiAgfVxyXG4gIHVuaS5zZXRTdG9yYWdlU3luYyhMYXN0X19WaXNpdF9fVGltZV9fS0VZLCBnZXRUaW1lKCkpO1xyXG4gIHJldHVybiB0aW1lO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IFBBR0VfUkVTSURFTkNFX1RJTUUgPSAnX19wYWdlX19yZXNpZGVuY2VfX3RpbWUnO1xyXG5sZXQgRmlyc3RfUGFnZV9yZXNpZGVuY2VfdGltZSA9IDA7XHJcbmxldCBMYXN0X1BhZ2VfcmVzaWRlbmNlX3RpbWUgPSAwO1xyXG5cclxuXHJcbmNvbnN0IHNldFBhZ2VSZXNpZGVuY2VUaW1lID0gKCkgPT4ge1xyXG4gIEZpcnN0X1BhZ2VfcmVzaWRlbmNlX3RpbWUgPSBnZXRUaW1lKCk7XHJcbiAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnbicpIHtcclxuICAgIHVuaS5zZXRTdG9yYWdlU3luYyhQQUdFX1JFU0lERU5DRV9USU1FLCBnZXRUaW1lKCkpO1xyXG4gIH1cclxuICByZXR1cm4gRmlyc3RfUGFnZV9yZXNpZGVuY2VfdGltZVxyXG59O1xyXG5cclxuY29uc3QgZ2V0UGFnZVJlc2lkZW5jZVRpbWUgPSAoKSA9PiB7XHJcbiAgTGFzdF9QYWdlX3Jlc2lkZW5jZV90aW1lID0gZ2V0VGltZSgpO1xyXG4gIGlmIChnZXRQbGF0Zm9ybU5hbWUoKSA9PT0gJ24nKSB7XHJcbiAgICBGaXJzdF9QYWdlX3Jlc2lkZW5jZV90aW1lID0gdW5pLmdldFN0b3JhZ2VTeW5jKFBBR0VfUkVTSURFTkNFX1RJTUUpO1xyXG4gIH1cclxuICByZXR1cm4gTGFzdF9QYWdlX3Jlc2lkZW5jZV90aW1lIC0gRmlyc3RfUGFnZV9yZXNpZGVuY2VfdGltZVxyXG59O1xyXG5jb25zdCBUT1RBTF9fVklTSVRfX0NPVU5UID0gJ1RvdGFsX19WaXNpdF9fQ291bnQnO1xyXG5jb25zdCBnZXRUb3RhbFZpc2l0Q291bnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgdGltZVN0b3JnZSA9IHVuaS5nZXRTdG9yYWdlU3luYyhUT1RBTF9fVklTSVRfX0NPVU5UKTtcclxuICBsZXQgY291bnQgPSAxO1xyXG4gIGlmICh0aW1lU3RvcmdlKSB7XHJcbiAgICBjb3VudCA9IHRpbWVTdG9yZ2U7XHJcbiAgICBjb3VudCsrO1xyXG4gIH1cclxuICB1bmkuc2V0U3RvcmFnZVN5bmMoVE9UQUxfX1ZJU0lUX19DT1VOVCwgY291bnQpO1xyXG4gIHJldHVybiBjb3VudDtcclxufTtcclxuXHJcbmNvbnN0IEdldEVuY29kZVVSSUNvbXBvbmVudE9wdGlvbnMgPSAoc3RhdERhdGEpID0+IHtcclxuICBsZXQgZGF0YSA9IHt9O1xyXG4gIGZvciAobGV0IHByb3AgaW4gc3RhdERhdGEpIHtcclxuICAgIGRhdGFbcHJvcF0gPSBlbmNvZGVVUklDb21wb25lbnQoc3RhdERhdGFbcHJvcF0pO1xyXG4gIH1cclxuICByZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmxldCBTZXRfX0ZpcnN0X19UaW1lID0gMDtcclxubGV0IFNldF9fTGFzdF9fVGltZSA9IDA7XHJcblxyXG5jb25zdCBnZXRGaXJzdFRpbWUgPSAoKSA9PiB7XHJcbiAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICBTZXRfX0ZpcnN0X19UaW1lID0gdGltZTtcclxuICBTZXRfX0xhc3RfX1RpbWUgPSAwO1xyXG4gIHJldHVybiB0aW1lO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGdldExhc3RUaW1lID0gKCkgPT4ge1xyXG4gIGxldCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgU2V0X19MYXN0X19UaW1lID0gdGltZTtcclxuICByZXR1cm4gdGltZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBnZXRSZXNpZGVuY2VUaW1lID0gKHR5cGUpID0+IHtcclxuICBsZXQgcmVzaWRlbmNlVGltZSA9IDA7XHJcbiAgaWYgKFNldF9fRmlyc3RfX1RpbWUgIT09IDApIHtcclxuICAgIHJlc2lkZW5jZVRpbWUgPSBTZXRfX0xhc3RfX1RpbWUgLSBTZXRfX0ZpcnN0X19UaW1lO1xyXG4gIH1cclxuXHJcbiAgcmVzaWRlbmNlVGltZSA9IHBhcnNlSW50KHJlc2lkZW5jZVRpbWUgLyAxMDAwKTtcclxuICByZXNpZGVuY2VUaW1lID0gcmVzaWRlbmNlVGltZSA8IDEgPyAxIDogcmVzaWRlbmNlVGltZTtcclxuICBpZiAodHlwZSA9PT0gJ2FwcCcpIHtcclxuICAgIGxldCBvdmVydGltZSA9IHJlc2lkZW5jZVRpbWUgPiBBUFBfUFZFUl9USU1FID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzaWRlbmNlVGltZSxcclxuICAgICAgb3ZlcnRpbWVcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmICh0eXBlID09PSAncGFnZScpIHtcclxuICAgIGxldCBvdmVydGltZSA9IHJlc2lkZW5jZVRpbWUgPiBQQUdFX1BWRVJfVElNRSA/IHRydWUgOiBmYWxzZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc2lkZW5jZVRpbWUsXHJcbiAgICAgIG92ZXJ0aW1lXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc2lkZW5jZVRpbWVcclxuICB9O1xyXG5cclxufTtcclxuXHJcbmNvbnN0IGdldFJvdXRlID0gKCkgPT4ge1xyXG4gIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gIHZhciBwYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgbGV0IF9zZWxmID0gcGFnZS4kdm07XHJcblxyXG4gIGlmIChnZXRQbGF0Zm9ybU5hbWUoKSA9PT0gJ2JkJykge1xyXG4gICAgcmV0dXJuIF9zZWxmLiRtcCAmJiBfc2VsZi4kbXAucGFnZS5pcztcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIChfc2VsZi4kc2NvcGUgJiYgX3NlbGYuJHNjb3BlLnJvdXRlKSB8fCAoX3NlbGYuJG1wICYmIF9zZWxmLiRtcC5wYWdlLnJvdXRlKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBnZXRQYWdlUm91dGUgPSAoc2VsZikgPT4ge1xyXG4gIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gIHZhciBwYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgbGV0IF9zZWxmID0gcGFnZS4kdm07XHJcbiAgbGV0IHF1ZXJ5ID0gc2VsZi5fcXVlcnk7XHJcbiAgbGV0IHN0ciA9IHF1ZXJ5ICYmIEpTT04uc3RyaW5naWZ5KHF1ZXJ5KSAhPT0gJ3t9JyA/ICc/JyArIEpTT04uc3RyaW5naWZ5KHF1ZXJ5KSA6ICcnO1xyXG4gIC8vIGNsZWFyXHJcbiAgc2VsZi5fcXVlcnkgPSAnJztcclxuICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICdiZCcpIHtcclxuICAgIHJldHVybiBfc2VsZi4kbXAgJiYgX3NlbGYuJG1wLnBhZ2UuaXMgKyBzdHI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAoX3NlbGYuJHNjb3BlICYmIF9zZWxmLiRzY29wZS5yb3V0ZSArIHN0ciApfHwgKF9zZWxmLiRtcCAmJiBfc2VsZi4kbXAucGFnZS5yb3V0ZSArIHN0cik7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2V0UGFnZVR5cGVzID0gKHNlbGYpID0+IHtcclxuICBpZiAoc2VsZi5tcFR5cGUgPT09ICdwYWdlJyB8fCAoc2VsZi4kbXAgJiYgc2VsZi4kbXAubXBUeXBlID09PSAncGFnZScpIHx8IHNlbGYuJG9wdGlvbnMubXBUeXBlID09PSAncGFnZScpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5jb25zdCBjYWxpYnJhdGlvbiA9IChldmVudE5hbWUsIG9wdGlvbnMpID0+IHtcclxuICAvLyAgbG9naW4g44CBIHNoYXJlIOOAgXBheV9zdWNjZXNzIOOAgXBheV9mYWlsIOOAgXJlZ2lzdGVyIOOAgXRpdGxlXHJcbiAgaWYoIWV2ZW50TmFtZSl7XHJcbiAgICBjb25zb2xlLmVycm9yKGB1bmkucmVwb3J0IOe8uuWwkSBbZXZlbnROYW1lXSDlj4LmlbBgKTtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgZXZlbnROYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgY29uc29sZS5lcnJvcihgdW5pLnJlcG9ydCBbZXZlbnROYW1lXSDlj4LmlbDnsbvlnovplJnor68s5Y+q6IO95Li6IFN0cmluZyDnsbvlnotgKTtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIGlmIChldmVudE5hbWUubGVuZ3RoID4gMjU1KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGB1bmkucmVwb3J0IFtldmVudE5hbWVdIOWPguaVsOmVv+W6puS4jeiDveWkp+S6jiAyNTVgKTtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG4gICAgY29uc29sZS5lcnJvcihgdW5pLnJlcG9ydCBbb3B0aW9uc10g5Y+C5pWw57G75Z6L6ZSZ6K+vLOWPquiDveS4uiBTdHJpbmcg5oiWIE9iamVjdCDnsbvlnotgKTtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnICYmIG9wdGlvbnMubGVuZ3RoID4gMjU1KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGB1bmkucmVwb3J0IFtvcHRpb25zXSDlj4LmlbDplb/luqbkuI3og73lpKfkuo4gMjU1YCk7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgaWYgKGV2ZW50TmFtZSA9PT0gJ3RpdGxlJyAmJiB0eXBlb2Ygb3B0aW9ucyAhPT0gJ3N0cmluZycpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ3VuaS5yZXBvcnQgW2V2ZW50TmFtZV0g5Y+C5pWw5Li6IHRpdGxlIOaXtu+8jFtvcHRpb25zXSDlj4LmlbDlj6rog73kuLogU3RyaW5nIOexu+WeiycpO1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBQYWdlc0pzb24gPSByZXF1aXJlKCd1bmktcGFnZXM/e1widHlwZVwiOlwic3R5bGVcIn0nKS5kZWZhdWx0O1xyXG5jb25zdCBzdGF0Q29uZmlnID0gcmVxdWlyZSgndW5pLXN0YXQtY29uZmlnJykuZGVmYXVsdCB8fCByZXF1aXJlKCd1bmktc3RhdC1jb25maWcnKTtcclxuXHJcbmNvbnN0IHJlc3VsdE9wdGlvbnMgPSB1bmkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuXHJcbmNsYXNzIFV0aWwge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZWxmID0gJyc7XHJcbiAgICB0aGlzLl9yZXRyeSA9IDA7XHJcbiAgICB0aGlzLl9wbGF0Zm9ybSA9ICcnO1xyXG4gICAgdGhpcy5fcXVlcnkgPSB7fTtcclxuICAgIHRoaXMuX25hdmlnYXRpb25CYXJUaXRsZSA9IHtcclxuICAgICAgY29uZmlnOiAnJyxcclxuICAgICAgcGFnZTogJycsXHJcbiAgICAgIHJlcG9ydDogJycsXHJcbiAgICAgIGx0OiAnJ1xyXG4gICAgfTtcclxuICAgIHRoaXMuX29wZXJhdGluZ1RpbWUgPSAwO1xyXG4gICAgdGhpcy5fcmVwb3J0aW5nUmVxdWVzdERhdGEgPSB7XHJcbiAgICAgICcxJzogW10sXHJcbiAgICAgICcxMSc6IFtdXHJcbiAgICB9O1xyXG4gICAgdGhpcy5fX3ByZXZlbnRfdHJpZ2dlcmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX19saWNhdGlvbkhpZGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX19saWNhdGlvblNob3cgPSBmYWxzZTtcclxuICAgIHRoaXMuX2xhc3RQYWdlUm91dGUgPSAnJztcclxuICAgIHRoaXMuc3RhdERhdGEgPSB7XHJcbiAgICAgIHV1aWQ6IGdldFV1aWQoKSxcclxuICAgICAgdXQ6IGdldFBsYXRmb3JtTmFtZSgpLFxyXG4gICAgICBtcG46IGdldFBhY2tOYW1lKCksXHJcbiAgICAgIGFrOiBzdGF0Q29uZmlnLmFwcGlkLFxyXG4gICAgICB1c3Y6IFNUQVRfVkVSU0lPTixcclxuICAgICAgdjogZ2V0VmVyc2lvbigpLFxyXG4gICAgICBjaDogZ2V0Q2hhbm5lbCgpLFxyXG4gICAgICBjbjogJycsXHJcbiAgICAgIHBuOiAnJyxcclxuICAgICAgY3Q6ICcnLFxyXG4gICAgICB0OiBnZXRUaW1lKCksXHJcbiAgICAgIHR0OiAnJyxcclxuICAgICAgcDogcmVzdWx0T3B0aW9ucy5wbGF0Zm9ybSA9PT0gJ2FuZHJvaWQnID8gJ2EnIDogJ2knLFxyXG4gICAgICBicmFuZDogcmVzdWx0T3B0aW9ucy5icmFuZCB8fCAnJyxcclxuICAgICAgbWQ6IHJlc3VsdE9wdGlvbnMubW9kZWwsXHJcbiAgICAgIHN2OiByZXN1bHRPcHRpb25zLnN5c3RlbS5yZXBsYWNlKC8oQW5kcm9pZHxpT1MpXFxzLywgJycpLFxyXG4gICAgICBtcHNkazogcmVzdWx0T3B0aW9ucy5TREtWZXJzaW9uIHx8ICcnLFxyXG4gICAgICBtcHY6IHJlc3VsdE9wdGlvbnMudmVyc2lvbiB8fCAnJyxcclxuICAgICAgbGFuZzogcmVzdWx0T3B0aW9ucy5sYW5ndWFnZSxcclxuICAgICAgcHI6IHJlc3VsdE9wdGlvbnMucGl4ZWxSYXRpbyxcclxuICAgICAgd3c6IHJlc3VsdE9wdGlvbnMud2luZG93V2lkdGgsXHJcbiAgICAgIHdoOiByZXN1bHRPcHRpb25zLndpbmRvd0hlaWdodCxcclxuICAgICAgc3c6IHJlc3VsdE9wdGlvbnMuc2NyZWVuV2lkdGgsXHJcbiAgICAgIHNoOiByZXN1bHRPcHRpb25zLnNjcmVlbkhlaWdodFxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICBfYXBwbGljYXRpb25TaG93KCkge1xyXG4gICAgaWYgKHRoaXMuX19saWNhdGlvbkhpZGUpIHtcclxuICAgICAgZ2V0TGFzdFRpbWUoKTtcclxuICAgICAgY29uc3QgdGltZSA9IGdldFJlc2lkZW5jZVRpbWUoJ2FwcCcpO1xyXG4gICAgICBpZiAodGltZS5vdmVydGltZSkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgcGF0aDogdGhpcy5fbGFzdFBhZ2VSb3V0ZSxcclxuICAgICAgICAgIHNjZW5lOiB0aGlzLnN0YXREYXRhLnNjXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9zZW5kUmVwb3J0UmVxdWVzdChvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9fbGljYXRpb25IaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfYXBwbGljYXRpb25IaWRlKHNlbGYsIHR5cGUpIHtcclxuXHJcbiAgICB0aGlzLl9fbGljYXRpb25IaWRlID0gdHJ1ZTtcclxuICAgIGdldExhc3RUaW1lKCk7XHJcbiAgICBjb25zdCB0aW1lID0gZ2V0UmVzaWRlbmNlVGltZSgpO1xyXG4gICAgZ2V0Rmlyc3RUaW1lKCk7XHJcbiAgICBjb25zdCByb3V0ZSA9IGdldFBhZ2VSb3V0ZSh0aGlzKTtcclxuICAgIHRoaXMuX3NlbmRIaWRlUmVxdWVzdCh7XHJcbiAgICAgIHVybHJlZjogcm91dGUsXHJcbiAgICAgIHVybHJlZl90czogdGltZS5yZXNpZGVuY2VUaW1lXHJcbiAgICB9LCB0eXBlKTtcclxuICB9XHJcblxyXG4gIF9wYWdlU2hvdygpIHtcclxuICAgIGNvbnN0IHJvdXRlID0gZ2V0UGFnZVJvdXRlKHRoaXMpO1xyXG4gICAgY29uc3Qgcm91dGVwYXRoID0gZ2V0Um91dGUoKTtcclxuICAgIHRoaXMuX25hdmlnYXRpb25CYXJUaXRsZS5jb25maWcgPSBQYWdlc0pzb24gJiZcclxuICAgICAgUGFnZXNKc29uLnBhZ2VzW3JvdXRlcGF0aF0gJiZcclxuICAgICAgUGFnZXNKc29uLnBhZ2VzW3JvdXRlcGF0aF0udGl0bGVOVmlldyAmJlxyXG4gICAgICBQYWdlc0pzb24ucGFnZXNbcm91dGVwYXRoXS50aXRsZU5WaWV3LnRpdGxlVGV4dCB8fFxyXG4gICAgICBQYWdlc0pzb24gJiZcclxuICAgICAgUGFnZXNKc29uLnBhZ2VzW3JvdXRlcGF0aF0gJiZcclxuICAgICAgUGFnZXNKc29uLnBhZ2VzW3JvdXRlcGF0aF0ubmF2aWdhdGlvbkJhclRpdGxlVGV4dCB8fCAnJztcclxuXHJcbiAgICBpZiAodGhpcy5fX2xpY2F0aW9uU2hvdykge1xyXG4gICAgICBnZXRGaXJzdFRpbWUoKTtcclxuICAgICAgdGhpcy5fX2xpY2F0aW9uU2hvdyA9IGZhbHNlO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygn6L+Z5pivIG9uTGF1Y2gg5LmL5ZCO5omn6KGM55qE56ys5LiA5qyhIHBhZ2VTaG93IO+8jOS4uuS4i+asoeiusOW9leaXtumXtOWBmuWHhuWkhycpO1xyXG4gICAgICB0aGlzLl9sYXN0UGFnZVJvdXRlID0gcm91dGU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0VGltZSgpO1xyXG4gICAgdGhpcy5fbGFzdFBhZ2VSb3V0ZSA9IHJvdXRlO1xyXG4gICAgY29uc3QgdGltZSA9IGdldFJlc2lkZW5jZVRpbWUoJ3BhZ2UnKTtcclxuICAgIGlmICh0aW1lLm92ZXJ0aW1lKSB7XHJcbiAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgIHBhdGg6IHRoaXMuX2xhc3RQYWdlUm91dGUsXHJcbiAgICAgICAgc2NlbmU6IHRoaXMuc3RhdERhdGEuc2NcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5fc2VuZFJlcG9ydFJlcXVlc3Qob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBnZXRGaXJzdFRpbWUoKTtcclxuICB9XHJcblxyXG4gIF9wYWdlSGlkZSgpIHtcclxuICAgIGlmICghdGhpcy5fX2xpY2F0aW9uSGlkZSkge1xyXG4gICAgICBnZXRMYXN0VGltZSgpO1xyXG4gICAgICBjb25zdCB0aW1lID0gZ2V0UmVzaWRlbmNlVGltZSgncGFnZScpO1xyXG4gICAgICB0aGlzLl9zZW5kUGFnZVJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5fbGFzdFBhZ2VSb3V0ZSxcclxuICAgICAgICB1cmxyZWY6IHRoaXMuX2xhc3RQYWdlUm91dGUsXHJcbiAgICAgICAgdXJscmVmX3RzOiB0aW1lLnJlc2lkZW5jZVRpbWVcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX25hdmlnYXRpb25CYXJUaXRsZSA9IHtcclxuICAgICAgICBjb25maWc6ICcnLFxyXG4gICAgICAgIHBhZ2U6ICcnLFxyXG4gICAgICAgIHJlcG9ydDogJycsXHJcbiAgICAgICAgbHQ6ICcnXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9sb2dpbigpIHtcclxuICAgIHRoaXMuX3NlbmRFdmVudFJlcXVlc3Qoe1xyXG4gICAgICBrZXk6ICdsb2dpbidcclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgX3NoYXJlKCkge1xyXG4gICAgdGhpcy5fc2VuZEV2ZW50UmVxdWVzdCh7XHJcbiAgICAgIGtleTogJ3NoYXJlJ1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG4gIF9wYXltZW50KGtleSkge1xyXG4gICAgdGhpcy5fc2VuZEV2ZW50UmVxdWVzdCh7XHJcbiAgICAgIGtleVxyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG4gIF9zZW5kUmVwb3J0UmVxdWVzdChvcHRpb25zKSB7XHJcblxyXG4gICAgdGhpcy5fbmF2aWdhdGlvbkJhclRpdGxlLmx0ID0gJzEnO1xyXG4gICAgbGV0IHF1ZXJ5ID0gb3B0aW9ucy5xdWVyeSAmJiBKU09OLnN0cmluZ2lmeShvcHRpb25zLnF1ZXJ5KSAhPT0gJ3t9JyA/ICc/JyArIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMucXVlcnkpIDogJyc7XHJcbiAgICB0aGlzLnN0YXREYXRhLmx0ID0gJzEnO1xyXG4gICAgdGhpcy5zdGF0RGF0YS51cmwgPSAob3B0aW9ucy5wYXRoICsgcXVlcnkpIHx8ICcnO1xyXG4gICAgdGhpcy5zdGF0RGF0YS50ID0gZ2V0VGltZSgpO1xyXG4gICAgdGhpcy5zdGF0RGF0YS5zYyA9IGdldFNjZW5lKG9wdGlvbnMuc2NlbmUpO1xyXG4gICAgdGhpcy5zdGF0RGF0YS5mdnRzID0gZ2V0Rmlyc3RWaXNpdFRpbWUoKTtcclxuICAgIHRoaXMuc3RhdERhdGEubHZ0cyA9IGdldExhc3RWaXNpdFRpbWUoKTtcclxuICAgIHRoaXMuc3RhdERhdGEudHZjID0gZ2V0VG90YWxWaXNpdENvdW50KCk7XHJcbiAgICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICduJykge1xyXG4gICAgICB0aGlzLmdldFByb3BlcnR5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdldE5ldHdvcmtJbmZvKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2VuZFBhZ2VSZXF1ZXN0KG9wdCkge1xyXG4gICAgbGV0IHtcclxuICAgICAgdXJsLFxyXG4gICAgICB1cmxyZWYsXHJcbiAgICAgIHVybHJlZl90c1xyXG4gICAgfSA9IG9wdDtcclxuICAgIHRoaXMuX25hdmlnYXRpb25CYXJUaXRsZS5sdCA9ICcxMSc7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgYWs6IHRoaXMuc3RhdERhdGEuYWssXHJcbiAgICAgIHV1aWQ6IHRoaXMuc3RhdERhdGEudXVpZCxcclxuICAgICAgbHQ6ICcxMScsXHJcbiAgICAgIHV0OiB0aGlzLnN0YXREYXRhLnV0LFxyXG4gICAgICB1cmwsXHJcbiAgICAgIHR0OiB0aGlzLnN0YXREYXRhLnR0LFxyXG4gICAgICB1cmxyZWYsXHJcbiAgICAgIHVybHJlZl90cyxcclxuICAgICAgY2g6IHRoaXMuc3RhdERhdGEuY2gsXHJcbiAgICAgIHVzdjogdGhpcy5zdGF0RGF0YS51c3YsXHJcbiAgICAgIHQ6IGdldFRpbWUoKSxcclxuICAgICAgcDogdGhpcy5zdGF0RGF0YS5wXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZXF1ZXN0KG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgX3NlbmRIaWRlUmVxdWVzdChvcHQsIHR5cGUpIHtcclxuICAgIGxldCB7XHJcbiAgICAgIHVybHJlZixcclxuICAgICAgdXJscmVmX3RzXHJcbiAgICB9ID0gb3B0O1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGFrOiB0aGlzLnN0YXREYXRhLmFrLFxyXG4gICAgICB1dWlkOiB0aGlzLnN0YXREYXRhLnV1aWQsXHJcbiAgICAgIGx0OiAnMycsXHJcbiAgICAgIHV0OiB0aGlzLnN0YXREYXRhLnV0LFxyXG4gICAgICB1cmxyZWYsXHJcbiAgICAgIHVybHJlZl90cyxcclxuICAgICAgY2g6IHRoaXMuc3RhdERhdGEuY2gsXHJcbiAgICAgIHVzdjogdGhpcy5zdGF0RGF0YS51c3YsXHJcbiAgICAgIHQ6IGdldFRpbWUoKSxcclxuICAgICAgcDogdGhpcy5zdGF0RGF0YS5wXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZXF1ZXN0KG9wdGlvbnMsIHR5cGUpO1xyXG4gIH1cclxuICBfc2VuZEV2ZW50UmVxdWVzdCh7XHJcbiAgICBrZXkgPSAnJyxcclxuICAgIHZhbHVlID0gXCJcIlxyXG4gIH0gPSB7fSkge1xyXG4gICAgY29uc3Qgcm91dGUgPSB0aGlzLl9sYXN0UGFnZVJvdXRlO1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGFrOiB0aGlzLnN0YXREYXRhLmFrLFxyXG4gICAgICB1dWlkOiB0aGlzLnN0YXREYXRhLnV1aWQsXHJcbiAgICAgIGx0OiAnMjEnLFxyXG4gICAgICB1dDogdGhpcy5zdGF0RGF0YS51dCxcclxuICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgY2g6IHRoaXMuc3RhdERhdGEuY2gsXHJcbiAgICAgIGVfbjoga2V5LFxyXG4gICAgICBlX3Y6IHR5cGVvZih2YWx1ZSkgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWUudG9TdHJpbmcoKSxcclxuICAgICAgdXN2OiB0aGlzLnN0YXREYXRhLnVzdixcclxuICAgICAgdDogZ2V0VGltZSgpLFxyXG4gICAgICBwOiB0aGlzLnN0YXREYXRhLnBcclxuICAgIH07XHJcbiAgICB0aGlzLnJlcXVlc3Qob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXROZXR3b3JrSW5mbygpIHtcclxuICAgIHVuaS5nZXROZXR3b3JrVHlwZSh7XHJcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpID0+IHtcclxuICAgICAgICB0aGlzLnN0YXREYXRhLm5ldCA9IHJlc3VsdC5uZXR3b3JrVHlwZTtcclxuICAgICAgICB0aGlzLmdldExvY2F0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvcGVydHkoKSB7XHJcbiAgICBwbHVzLnJ1bnRpbWUuZ2V0UHJvcGVydHkocGx1cy5ydW50aW1lLmFwcGlkLCAod2d0aW5mbykgPT4ge1xyXG4gICAgICB0aGlzLnN0YXREYXRhLnYgPSB3Z3RpbmZvLnZlcnNpb24gfHwgJyc7XHJcbiAgICAgIHRoaXMuZ2V0TmV0d29ya0luZm8oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG9jYXRpb24oKSB7XHJcbiAgICBpZiAoc3RhdENvbmZpZy5nZXRMb2NhdGlvbikge1xyXG4gICAgICB1bmkuZ2V0TG9jYXRpb24oe1xyXG4gICAgICAgIHR5cGU6ICd3Z3M4NCcsXHJcbiAgICAgICAgZ2VvY29kZTogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzdWx0LmFkZHJlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0RGF0YS5jbiA9IHJlc3VsdC5hZGRyZXNzLmNvdW50cnk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdERhdGEucG4gPSByZXN1bHQuYWRkcmVzcy5wcm92aW5jZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0RGF0YS5jdCA9IHJlc3VsdC5hZGRyZXNzLmNpdHk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5zdGF0RGF0YS5sYXQgPSByZXN1bHQubGF0aXR1ZGU7XHJcbiAgICAgICAgICB0aGlzLnN0YXREYXRhLmxuZyA9IHJlc3VsdC5sb25naXR1ZGU7XHJcbiAgICAgICAgICB0aGlzLnJlcXVlc3QodGhpcy5zdGF0RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RhdERhdGEubGF0ID0gMDtcclxuICAgICAgdGhpcy5zdGF0RGF0YS5sbmcgPSAwO1xyXG4gICAgICB0aGlzLnJlcXVlc3QodGhpcy5zdGF0RGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0KGRhdGEsIHR5cGUpIHtcclxuICAgIGxldCB0aW1lID0gZ2V0VGltZSgpO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLl9uYXZpZ2F0aW9uQmFyVGl0bGU7XHJcbiAgICBkYXRhLnR0biA9IHRpdGxlLnBhZ2U7XHJcbiAgICBkYXRhLnR0cGogPSB0aXRsZS5jb25maWc7XHJcbiAgICBkYXRhLnR0YyA9IHRpdGxlLnJlcG9ydDtcclxuXHJcbiAgICBsZXQgcmVxdWVzdERhdGEgPSB0aGlzLl9yZXBvcnRpbmdSZXF1ZXN0RGF0YTtcclxuICAgIGlmIChnZXRQbGF0Zm9ybU5hbWUoKSA9PT0gJ24nKSB7XHJcbiAgICAgIHJlcXVlc3REYXRhID0gdW5pLmdldFN0b3JhZ2VTeW5jKCdfX1VOSV9fU1RBVF9fREFUQScpIHx8IHt9O1xyXG4gICAgfVxyXG4gICAgaWYgKCFyZXF1ZXN0RGF0YVtkYXRhLmx0XSkge1xyXG4gICAgICByZXF1ZXN0RGF0YVtkYXRhLmx0XSA9IFtdO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdERhdGFbZGF0YS5sdF0ucHVzaChkYXRhKTtcclxuXHJcbiAgICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICduJykge1xyXG4gICAgICB1bmkuc2V0U3RvcmFnZVN5bmMoJ19fVU5JX19TVEFUX19EQVRBJywgcmVxdWVzdERhdGEpO1xyXG4gICAgfVxyXG4gICAgaWYgKGdldFBhZ2VSZXNpZGVuY2VUaW1lKCkgPCBPUEVSQVRJTkdfVElNRSAmJiAhdHlwZSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGxldCB1bmlTdGF0RGF0YSA9IHRoaXMuX3JlcG9ydGluZ1JlcXVlc3REYXRhO1xyXG4gICAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnbicpIHtcclxuICAgICAgdW5pU3RhdERhdGEgPSB1bmkuZ2V0U3RvcmFnZVN5bmMoJ19fVU5JX19TVEFUX19EQVRBJyk7XHJcbiAgICB9XHJcbiAgICAvLyDml7bpl7TotoXov4fvvIzph43mlrDojrflj5bml7bpl7TmiLNcclxuICAgIHNldFBhZ2VSZXNpZGVuY2VUaW1lKCk7XHJcbiAgICBsZXQgZmlyc3RBcnIgPSBbXTtcclxuICAgIGxldCBjb250ZW50QXJyID0gW107XHJcbiAgICBsZXQgbGFzdEFyciA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgaW4gdW5pU3RhdERhdGEpIHtcclxuICAgICAgY29uc3QgcmQgPSB1bmlTdGF0RGF0YVtpXTtcclxuICAgICAgcmQuZm9yRWFjaCgoZWxtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IGdldFNwbGljaW5nKGVsbSk7XHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgIGZpcnN0QXJyLnB1c2gobmV3RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSAzKSB7XHJcbiAgICAgICAgICBsYXN0QXJyLnB1c2gobmV3RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnRlbnRBcnIucHVzaChuZXdEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcnN0QXJyLnB1c2goLi4uY29udGVudEFyciwgLi4ubGFzdEFycik7XHJcbiAgICBsZXQgb3B0aW9uc0RhdGEgPSB7XHJcbiAgICAgIHVzdjogU1RBVF9WRVJTSU9OLCAvL+e7n+iuoSBTREsg54mI5pys5Y+3XHJcbiAgICAgIHQ6IHRpbWUsIC8v5Y+R6YCB6K+35rGC5pe255qE5pe26Ze05oiuXHJcbiAgICAgIHJlcXVlc3RzOiBKU09OLnN0cmluZ2lmeShmaXJzdEFyciksXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX3JlcG9ydGluZ1JlcXVlc3REYXRhID0ge307XHJcbiAgICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICduJykge1xyXG4gICAgICB1bmkucmVtb3ZlU3RvcmFnZVN5bmMoJ19fVU5JX19TVEFUX19EQVRBJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRhdGEudXQgPT09ICdoNScpIHtcclxuICAgICAgdGhpcy5pbWFnZVJlcXVlc3Qob3B0aW9uc0RhdGEpO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICduJyAmJiB0aGlzLnN0YXREYXRhLnAgPT09ICdhJykge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLl9zZW5kUmVxdWVzdChvcHRpb25zRGF0YSk7XHJcbiAgICAgIH0sIDIwMCk7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VuZFJlcXVlc3Qob3B0aW9uc0RhdGEpO1xyXG4gIH1cclxuICBfc2VuZFJlcXVlc3Qob3B0aW9uc0RhdGEpIHtcclxuICAgIHVuaS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiBTVEFUX1VSTCxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIC8vIGhlYWRlcjoge1xyXG4gICAgICAvLyAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgLy8g6buY6K6k5YC8XHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIGRhdGE6IG9wdGlvbnNEYXRhLFxyXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnc3RhdCByZXF1ZXN0IHN1Y2Nlc3MnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IChlKSA9PiB7XHJcbiAgICAgICAgaWYgKCsrdGhpcy5fcmV0cnkgPCAzKSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2VuZFJlcXVlc3Qob3B0aW9uc0RhdGEpO1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogaDUg6K+35rGCXHJcbiAgICovXHJcbiAgaW1hZ2VSZXF1ZXN0KGRhdGEpIHtcclxuICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBnZXRTZ2luKEdldEVuY29kZVVSSUNvbXBvbmVudE9wdGlvbnMoZGF0YSkpLm9wdGlvbnM7XHJcbiAgICBpbWFnZS5zcmMgPSBTVEFUX0g1X1VSTCArICc/JyArIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBzZW5kRXZlbnQoa2V5LCB2YWx1ZSkge1xyXG4gICAgLy8g5qCh6aqMIHR5cGUg5Y+C5pWwXHJcbiAgICBpZiAoY2FsaWJyYXRpb24oa2V5LCB2YWx1ZSkpIHJldHVyblxyXG5cclxuICAgIGlmIChrZXkgPT09ICd0aXRsZScpIHtcclxuICAgICAgdGhpcy5fbmF2aWdhdGlvbkJhclRpdGxlLnJlcG9ydCA9IHZhbHVlO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMuX3NlbmRFdmVudFJlcXVlc3Qoe1xyXG4gICAgICBrZXksXHJcbiAgICAgIHZhbHVlOiB0eXBlb2YodmFsdWUpID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IHZhbHVlXHJcbiAgICB9LCAxKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTdGF0IGV4dGVuZHMgVXRpbCB7XHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU3RhdCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgLy8g5rOo5YaM5oum5oiq5ZmoXHJcbiAgICBpZiAodHlwZW9mIHVuaS5hZGRJbnRlcmNlcHRvciA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICB0aGlzLmFkZEludGVyY2VwdG9ySW5pdCgpO1xyXG4gICAgICB0aGlzLmludGVyY2VwdExvZ2luKCk7XHJcbiAgICAgIHRoaXMuaW50ZXJjZXB0U2hhcmUodHJ1ZSk7XHJcbiAgICAgIHRoaXMuaW50ZXJjZXB0UmVxdWVzdFBheW1lbnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZEludGVyY2VwdG9ySW5pdCgpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIHVuaS5hZGRJbnRlcmNlcHRvcignc2V0TmF2aWdhdGlvbkJhclRpdGxlJywge1xyXG4gICAgICBpbnZva2UoYXJncykge1xyXG4gICAgICAgIHNlbGYuX25hdmlnYXRpb25CYXJUaXRsZS5wYWdlID0gYXJncy50aXRsZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbnRlcmNlcHRMb2dpbigpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIHVuaS5hZGRJbnRlcmNlcHRvcignbG9naW4nLCB7XHJcbiAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgIHNlbGYuX2xvZ2luKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJjZXB0U2hhcmUodHlwZSkge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgaWYgKCF0eXBlKSB7XHJcbiAgICAgIHNlbGYuX3NoYXJlKCk7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdW5pLmFkZEludGVyY2VwdG9yKCdzaGFyZScsIHtcclxuICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICBzZWxmLl9zaGFyZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsKCkge1xyXG4gICAgICAgIHNlbGYuX3NoYXJlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJjZXB0UmVxdWVzdFBheW1lbnQoKSB7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICB1bmkuYWRkSW50ZXJjZXB0b3IoJ3JlcXVlc3RQYXltZW50Jywge1xyXG4gICAgICBzdWNjZXNzKCkge1xyXG4gICAgICAgIHNlbGYuX3BheW1lbnQoJ3BheV9zdWNjZXNzJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgc2VsZi5fcGF5bWVudCgncGF5X2ZhaWwnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXBvcnQob3B0aW9ucywgc2VsZikge1xyXG4gICAgdGhpcy5zZWxmID0gc2VsZjtcclxuICAgIC8vIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZygncmVwb3J0IGluaXQnKTtcclxuICAgIC8vIH1cclxuICAgIHNldFBhZ2VSZXNpZGVuY2VUaW1lKCk7XHJcbiAgICB0aGlzLl9fbGljYXRpb25TaG93ID0gdHJ1ZTtcclxuICAgIHRoaXMuX3NlbmRSZXBvcnRSZXF1ZXN0KG9wdGlvbnMsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgbG9hZChvcHRpb25zLCBzZWxmKSB7XHJcbiAgICBpZiAoIXNlbGYuJHNjb3BlICYmICFzZWxmLiRtcCkge1xyXG4gICAgICBjb25zdCBwYWdlID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgIHNlbGYuJHNjb3BlID0gcGFnZVtwYWdlLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxmID0gc2VsZjtcclxuICAgIHRoaXMuX3F1ZXJ5ID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIHNob3coc2VsZikge1xyXG4gICAgdGhpcy5zZWxmID0gc2VsZjtcclxuICAgIGlmIChnZXRQYWdlVHlwZXMoc2VsZikpIHtcclxuICAgICAgdGhpcy5fcGFnZVNob3coc2VsZik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9hcHBsaWNhdGlvblNob3coc2VsZik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWFkeShzZWxmKSB7XHJcbiAgICAvLyB0aGlzLnNlbGYgPSBzZWxmO1xyXG4gICAgLy8gaWYgKGdldFBhZ2VUeXBlcyhzZWxmKSkge1xyXG4gICAgLy8gICB0aGlzLl9wYWdlU2hvdyhzZWxmKTtcclxuICAgIC8vIH1cclxuICB9XHJcbiAgaGlkZShzZWxmKSB7XHJcbiAgICB0aGlzLnNlbGYgPSBzZWxmO1xyXG4gICAgaWYgKGdldFBhZ2VUeXBlcyhzZWxmKSkge1xyXG4gICAgICB0aGlzLl9wYWdlSGlkZShzZWxmKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2FwcGxpY2F0aW9uSGlkZShzZWxmLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgZXJyb3IoZW0pIHtcclxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybSA9PT0gJ2RldnRvb2xzJykge1xyXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ+W9k+WJjei/kOihjOeOr+Wig+S4uuW8gOWPkeiAheW3peWFt++8jOS4jeS4iuaKpeaVsOaNruOAgicpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBlbVZhbCA9ICcnO1xyXG4gICAgaWYgKCFlbS5tZXNzYWdlKSB7XHJcbiAgICAgIGVtVmFsID0gSlNPTi5zdHJpbmdpZnkoZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZW1WYWwgPSBlbS5zdGFjaztcclxuICAgIH1cclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBhazogdGhpcy5zdGF0RGF0YS5hayxcclxuICAgICAgdXVpZDogdGhpcy5zdGF0RGF0YS51dWlkLFxyXG4gICAgICBsdDogJzMxJyxcclxuICAgICAgdXQ6IHRoaXMuc3RhdERhdGEudXQsXHJcbiAgICAgIGNoOiB0aGlzLnN0YXREYXRhLmNoLFxyXG4gICAgICBtcHNkazogdGhpcy5zdGF0RGF0YS5tcHNkayxcclxuICAgICAgbXB2OiB0aGlzLnN0YXREYXRhLm1wdixcclxuICAgICAgdjogdGhpcy5zdGF0RGF0YS52LFxyXG4gICAgICBlbTogZW1WYWwsXHJcbiAgICAgIHVzdjogdGhpcy5zdGF0RGF0YS51c3YsXHJcbiAgICAgIHQ6IGdldFRpbWUoKSxcclxuICAgICAgcDogdGhpcy5zdGF0RGF0YS5wXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZXF1ZXN0KG9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgc3RhdCA9IFN0YXQuZ2V0SW5zdGFuY2UoKTtcclxubGV0IGlzSGlkZSA9IGZhbHNlO1xyXG5jb25zdCBsaWZlY3ljbGUgPSB7XHJcbiAgb25MYXVuY2gob3B0aW9ucykge1xyXG4gICAgc3RhdC5yZXBvcnQob3B0aW9ucywgdGhpcyk7XHJcbiAgfSxcclxuICBvblJlYWR5KCkge1xyXG4gICAgc3RhdC5yZWFkeSh0aGlzKTtcclxuICB9LFxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICBzdGF0LmxvYWQob3B0aW9ucywgdGhpcyk7XHJcbiAgICAvLyDph43lhpnliIbkuqvvvIzojrflj5bliIbkuqvkuIrmiqXkuovku7ZcclxuICAgIGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS5vblNoYXJlQXBwTWVzc2FnZSkge1xyXG4gICAgICBsZXQgb2xkU2hhcmVBcHBNZXNzYWdlID0gdGhpcy4kc2NvcGUub25TaGFyZUFwcE1lc3NhZ2U7XHJcbiAgICAgIHRoaXMuJHNjb3BlLm9uU2hhcmVBcHBNZXNzYWdlID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgIHN0YXQuaW50ZXJjZXB0U2hhcmUoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiBvbGRTaGFyZUFwcE1lc3NhZ2UuY2FsbCh0aGlzLCBvcHRpb25zKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25TaG93KCkge1xyXG4gICAgaXNIaWRlID0gZmFsc2U7XHJcbiAgICBzdGF0LnNob3codGhpcyk7XHJcbiAgfSxcclxuICBvbkhpZGUoKSB7XHJcbiAgICBpc0hpZGUgPSB0cnVlO1xyXG4gICAgc3RhdC5oaWRlKHRoaXMpO1xyXG4gIH0sXHJcbiAgb25VbmxvYWQoKSB7XHJcbiAgICBpZiAoaXNIaWRlKSB7XHJcbiAgICAgIGlzSGlkZSA9IGZhbHNlO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHN0YXQuaGlkZSh0aGlzKTtcclxuICB9LFxyXG4gIG9uRXJyb3IoZSkge1xyXG4gICAgc3RhdC5lcnJvcihlKTtcclxuICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYWluKCkge1xyXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgdW5pLnJlcG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG9wdGlvbnMpIHt9O1xyXG4gIH1lbHNle1xyXG4gICAgY29uc3QgVnVlID0gcmVxdWlyZSgndnVlJyk7XHJcbiAgICAoVnVlLmRlZmF1bHQgfHwgVnVlKS5taXhpbihsaWZlY3ljbGUpO1xyXG4gICAgdW5pLnJlcG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG9wdGlvbnMpIHtcclxuICAgICAgc3RhdC5zZW5kRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxubWFpbigpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiL3N0YXRpYy9iYW5uZXIucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBR1FBQUFCTENBSUFBQUFKZXJYZ0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBdzlwVkZoMFdFMU1PbU52YlM1aFpHOWlaUzU0YlhBQUFBQUFBRHcvZUhCaFkydGxkQ0JpWldkcGJqMGk3N3UvSWlCcFpEMGlWelZOTUUxd1EyVm9hVWg2Y21WVGVrNVVZM3ByWXpsa0lqOCtJRHg0T25odGNHMWxkR0VnZUcxc2JuTTZlRDBpWVdSdlltVTZibk02YldWMFlTOGlJSGc2ZUcxd2RHczlJa0ZrYjJKbElGaE5VQ0JEYjNKbElEVXVOUzFqTURFMElEYzVMakUxTVRRNE1Td2dNakF4TXk4d015OHhNeTB4TWpvd09Ub3hOU0FnSUNBZ0lDQWdJajRnUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0Z1BISmtaanBFWlhOamNtbHdkR2x2YmlCeVpHWTZZV0p2ZFhROUlpSWdlRzFzYm5NNmVHMXdUVTA5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5dGJTOGlJSGh0Ykc1ek9uTjBVbVZtUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdmMxUjVjR1V2VW1WemIzVnlZMlZTWldZaklpQjRiV3h1Y3pwNGJYQTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzhpSUhodGNFMU5Pa1J2WTNWdFpXNTBTVVE5SW5odGNDNWthV1E2TXpReE9UQXdRVUk0TVRJM01URkZRVUV4UlVORk5UUTBOakkyUVRVeU1rVWlJSGh0Y0UxTk9rbHVjM1JoYm1ObFNVUTlJbmh0Y0M1cGFXUTZNelF4T1RBd1FVRTRNVEkzTVRGRlFVRXhSVU5GTlRRME5qSTJRVFV5TWtVaUlIaHRjRHBEY21WaGRHOXlWRzl2YkQwaVFXUnZZbVVnVUdodmRHOXphRzl3SUVORElGZHBibVJ2ZDNNaVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGlRVEl5TmpFMU5FSTRSalU0UlRSRE0wVTBRMFkzTXpRNFF6ZEZRMFV5T1RraUlITjBVbVZtT21SdlkzVnRaVzUwU1VROUlrRXlNall4TlRSQ09FWTFPRVUwUXpORk5FTkdOek0wT0VNM1JVTkZNams1SWk4K0lEd3ZjbVJtT2tSbGMyTnlhWEIwYVc5dVBpQThMM0prWmpwU1JFWStJRHd2ZURwNGJYQnRaWFJoUGlBOFAzaHdZV05yWlhRZ1pXNWtQU0p5SWo4K2lxaTMwZ0FBUzdaSlJFRlVlTm9zdXdlVVhIZDkvdjI3dlU3dnN6dXpzNzFvZDlWN2J5NlM1U2E1RjdxQkJJSkpDUHc1SlA5REtza0xMeVFRSnhBZ0NZNE5CbXlEdXl6TDZsYVhkclc5MStsOWJ1LzN2VHJuMVZscHBUbTdkKzU4Ny9OOW5zK2p1UXQ5K3krZm5KZ2NtNWt1UFBySWlTYysvV1JEcWtFRTVQSzRTWVZRZVdGcGJ1SzFWLzYzS0ZTZmZQb3hBbU1XRjVkb3hwMUlwcmk2NFB6ZDdYTjFkSzczZUpwRVJRY1lzWFhiVHB3QXNsTCsxdGUrL09xdjNzWlJ6SEwrYmR1UWpVS3FFU2JoUjljbUhtcUptQkIzSnJzOE5TNlN1TWRncWZGS3dVZGE5M2EwaWpqNjBhMVp4SVFHMjhPaXJsMll5TVdiM2NjMkp6QlJiUWlVamdMRHRzb05YaElVWGRWS3BtZ0JFTFNoWmdZd0xJMVJGTXZRTERBTVZYRzdYRjUvWUZuVUZ6TWxXUUdDYUJFWTFwUWdZY2preWxDaHpPZUZtbXBaQklJeUpFSFF0cHZRbWwyNGo4SnRCSklVWERNb0cyaEt0ZWFuM2VzM3J2ZjVQWXVMMllYTW9pZElRbnQzcG54Kzl1Yk5tYjZlbmgvLytJZWFvVnFRdWJDOHNEQXpzenkvc0x5eUdBbjZ1OWYwY1p3S1FUQUNZNEtrOHJ6NDFoL2Y4L3Q4ZXc5c0QwYWp4YUtBa3Q0SEgzMzIwUGF0RjIvZmdqQmg2TUtaNy83bDM2RVFwTmpBZ25ETlJGR0FVcllXeEkxK0w5c1VwUkEvbTV1WHgrZFhzZ0JVQUVBQTZBSEFZR0ZlQlVtS1NEYXhlVlVkemtsQkZ0K2FvdlY2dFNKQUZrNzVQSXlMUUUxWlJrM2NaakdNQkxSbElRQURBRlkwQmJKczNJSjF6UUFRVURYTmhOR2czeGNMK0FrTU5XM1RBanlDb0lwS0ZHdHlYWmQxMjBZMEF6VXNpcllqWGp6R1VHNEtVMjFkME83T3ExempGVnV6Y2RUdFloVk9tVTNubXdmYUgzamlDTnJlM3YzVnIzMitVRWkvKzg1SGM3UFRQZDJkSDd4L2NubHhMbGZLdUR5ZS9RZjNNWXduRklnSXZJQmpKTTI2dmI3QXVmTVhzd1V0RW1aaXNkUzdKOS9nQlBuSC8vcnkzdTFiZVVrMkxhMDFsTVFITnNab0RMVVJsS2JxdWxYa2RkTVpuQWt0eS9hOFVQV2x3Y2FrS3hsampvU2IybU14RkNlMHJGSGo2Ky9VMHBXaTRxRmhGMndYWk4yTmtJWUFMVTVVb2tIYmhwMEppRGlDSUFBbWFDQTFlRDZqMkRZZ1dUZmpjNHVObXR4b3lLTGxpQTNESWJlTDhyaGNBWnkwRlNtL1VuYlJtQ05KWjRTZVlCU2o4RkNNZGdNYmhtQTNqSGtvaW5GaFhoSnhtNkJhS3FUVDh5dGN0Y1piS015cWJxSXFDY0xTdkp1ZzlqLzY4TkhuSHRNd0JaMmVtdm5sTDM2Ky84Q3U5bzRXMFJBdlhMbHc0ZUxIWG85cjE3YWRldzhjOWdaanFtbld5a1ZGY2o1RHdXRFVId3pGNHkwWHpsLy82TXcxVGYvREMxOTVicysrdlMzSlRjdVpyR1paemNsNFM3Z2xmWHVrWHRFak5Cb051bTJGSzNLR1lrTTRCaGsyWmdCTU1tVkUxdGQ1QTgzaEVFR1JsSWRLZFJLYXhxK2VyV1dYeEVnY1MvbkllcTVjRmtCckc5NFZjL1gzK3lQdC9rREFId3BHRVpLeElKZ1R6ZHh5YmZUV3d1MmJFL25WV2pUc1QvcGIvQlRqWmxrRWRwNElseFM1WE0xYXRvV3hYZ3NHcW1KWEdzYlVWSUdURmxUVnVhSVc0UXdMSWR4ZUtoUUxCQ2pLaitMT04vSXdKdUtrd3RpV0NkVU5hU1ZkQ1dIb1E4ODgvc2pqSjlMNTVhczN6NkdQSEwvUDYvVzB0SFJkdkhBdEdta3lkZTNPNk15Ky9idWZlUFpUaXFZUGpkem1KRUhWVlpiMitqelJiS2xHdW55dG5WMG5ubmpVR1ZhNVhJM0h3KzZBWnlXZmpVUlNJUWF0TjV5dEFxS3UyOENXQUNnMnlyd3FHeFlPZ0FVclV0aEdvd3paN0hVMStiQ1pBdi9lbmZSQ3BXR1pZRmNidTZXSGNkYlZDNE1BWnJUSEliZmJ0YzhkMnJTenVhc3Z3WGdJR0xVTUN3TXdCV01NaHJ0Z2IzenR3N0g3ZEpDN2RQbG4zLy92dWZrR3pxQU1iQVJwMk1Dc3FibEpubGRTTFhHZno1UGhoYWw4dlZqV0txVWFiQUdjd0ZHVzlkTzBEOFpnd3hBTm9WSXVhelJkZ215YVJFelVrYit0QTBNelRabXJkOFpkZi9iVi83dGwvKzVidDkrYkc3dkVZamhLMDBSUFR5OUZVVzF0N2IvODZXL0xGWDVtMGRpM3gvdlJ4K2NjTHdsR0lsV2g0Zlo0SVlEQktPenoraFJGS3hhcVR6M3ozTTZkZTRWR0hTWWRRL1hIbzBrYllKekEyUmJrREtzaFpGMHcwQTFwdFFCMHgxUlFCRmJsUHRyMXhlMGRPemU2WUFTY3UxMSs2ZlNFQUlGa1BBTHhuQVNrR3pLNVhKYmFmV0RQVm1iZHVwZ24xc3RHbTJ5S1FIRGNPYkp1SWpwS3dnaHB3Z1FNY0xNbVdLaENlQk94L2M4OVpmaGZlUGhyWnJuQnBOaDZmbDZsU01tMENBSkZFYnhRcUExUHJNeFdWWnR5RTdUTHREVVZCbjZmeThPeW1HSENKa0pDbUcwNFNXSEJrTTJMTm9ZVEJPYXRONHFGTkQrNElmYkNuMysxdGJmejQ5UC9zN1F5R1FnSEVJSkZtcHZvUkNKaEdEb0VZTDhub2FyMnhNenNyVHRUWGkvY056alluR3lCWUpURUdUZmpkbnZjem9YeGV6M3pDelBYcjEvWnNIRmRSK2M2bHFWTWdHaVdCcU5BbFMwREFsNktXYno0UnVYYzVWVE1SNUplellaUlJHdWx5ZTJSNklGT1gyY0xiUUkwVjBYbStKcHFXOUZnM1BGZ3c0SXZUOVdCb2YvSjQ2Mkg3bytHWTI2RXdnUkxNbkhZdElHa09oRkF3VERwQkF5S0lhYnB1SlZpQVpmT3BDQzRQZHplakN5TjlUUDJnUjNyZ0dVdkZBWGNGUUthWGlqa0s3V0s0LytTWmpyeWRvU3RJeGh2MkdXUkwzS05IRmZMTkdyNU9sZm0rV0xEK1ZNb05qUlIwMDFWMVNScDE3NTFMMzdqRzdHVzRFZW5mMTB2em9YOFRRam01eFVkZFdiZ1pBY3FLNVZLK2RubmoyL2J1ZWJzdWZjSDF2WSsrY3luNG9ubVlybElVQ3lKa280NEFMQ2ROUHEzbi83Z3pNY2Y3OTY5NjlWWGZ2cnNVNTg5OGNTemtBVk0yTElzVXhUMVVEUUVnSExtM0x1R0NYRE10ZzNjVDJrNGJhVVl4cFNxLzMwdGg5ekVGQk5vQ0tDQWdXcm15TlFDc0ZBSXlKMGg4TVVYdGh5OUw2RXFDMldwQVZDZlFhQ3dYTE5zRHNFcFcyOWdadEJTZ1NJYU1BWUJsQ0VzRkFNaEJVQXNDQjNldHRzQWF0empFbHBTSHkwSVV3dlZGamNPRkNXZVlMZmV1eSt5ZHNPdG9Zbi8vTS9YRjlJU1FwTFMzWFMwU0VkRUtFVG9FZ0xaR0lZaEtHNWJjTEhhNEV4dzdNR2R6M3psU3hnQm4zNy9OY3ZNeE1JSlJjU3IyWVpoR0doVGF6dE9VczR5OTNTMTU1WW1MNXorOEtubjd2dnlpMzhteVVhdG5HZFIwakNkazVRY1czV00wMUdRUXlpSER0LzdOMy85ejMvN2YxNjhldW4wcHMzckZ6S2xnVTJiVU1LV05Oa0RoMy85Mmcvbmh5ZDM3dWk2TkZlWVdWM3A5c0J4dDN0cEpUOGpBQjBBSHdSb3pCbTg2WEdjbmFUY0hvaW04SFV0M2llZlNxMFpkRWxhbnJOUnhPMUVLWVZBbUhONkFFQW82aENiczR3R3NGRkh3VTRJSWpSTEp3Y0I4RGpVWUJUbmgyNWNTZXBLQXFVUlRPTVU4MDZXY3g0L2ZsL3Z2bDI5eWJWOThJYWo2eC80aTQwN3QvL0wzL3hvZHJZbXdBd3Y4SmFpaEVNK2tpRnN4SGJoUkFCR09MNGkrdkhIbm56cXVjOC90NWdmL3VUTUI0aXB1bjJkNVNMSVoxWXdHNDBGbTlGVU1rbVJXSFoxWlhsaEhyY2hBc01mZWVoUjJJUmRPTXFYRzNXNTBKcHFaWHcrUVJRdDA1STU0Y1d2ZlMzbzhXYVhKejArYjBkUDIvejh6STJoY1FSSFlvbG9SNkxqenRXM1gvcm1kellGZmEzSnhBY1RNODVKZDdjMU9VNEhSU0l0d1VEUTdRKzRxVmpZNC9YUU9BWFpta1NZcWpNN1h4QjNBRzVzbnBONDBuQmNDWGVtd3pycjcwZ1FSV0VuNW1FSVFqRVZRWnhrUTJ6YjlwSU1WcTVqVkJaSGpka0x2NzAxZVhIQ3NGZGhZMjR1dDdKYWV2VFJkWC95eGVOdHpTNnBrcjQ5T3gyQXFOYjFMZXNQblBqczlOQnZmdlVPWmhOMXp1QVZvT2l5YkxvWUJnbmpLQ29VMjhQNHBtZS9lZXlKNXhvTEgwL2QvcFVMSlJoWC8vU3NLdGIxVUtUVEZhTGNmaHBGYklPcmNZckVhNHJFdXYyYk5tMktSYUwxZlBVUGI3NTdmV2dZYzhHTW0raElkcXpwNjA4bWt5Uk5wZVdGV1ZIT3BkUHgxdVl0bXpaTGtwelBGL0tMYzhsd2N6MmIvOGR2L2xXOUNDWHZYeHZiMnZQcDlURVlaWndRWlFERW1MYWpkQjJXSko2WCthcmxzRmRObHVvY3JEZ2VJUXU2Smp0b29zQTRUQ0dFYlFEVGhqR0N4RWxJdmJ0ektPSFFzSW5DR0ltamlIVjNraE9Mb3ZHSkFhRXNBZEVxdCs2ZTdVNkRzQWgzZ0thL2NuRFhVeSsrQUR6ZEFBaGticlVvM2g2NU5JNUR2d3VTdm9tYk00MXlJK21qQTBIV0JuUzFKbFE0SHBYdFJrMUVXT2o0OFdlMlBYemc2cFhmVkc2LzN4SnVsV1JxZkc1SnhVR3NOOFRRd1VUYnhtaFRHUHIxeS85WDRCcGNyUnowZTJ0MVFWT1F6dGJVeFF1Zi9PaC9Qa3o1bVIvKy9BZU1CNSs0ZGN2U25MTWtLSVp4Kzl3b2c4UVRpY0grVFVzelMzLzdOOS9sK1ByYXdmN1dXRHplN01uTVRiYUU0eXdGdUhwV3hXeE10TGhzanF1VURFTXBjUlZOMTAwZEVxc2FCbEdhN2JBWGpEaXpzUUZxTzdabkFRZHZnSVZnTUlEdlVpakFIT1JHbmFiaWlNdmxZaDFyMTNXSnBqREtlY2hKRTVmYnBuQWFKUms2akxveEdFYzB5VG1jVGZzaU51WmovR0gvWFJIam1ZbmIvLzJ2UDFoZHFzZTl2dXlLMEZCczNFVTcwTHVsSS9IUW9hMkJnRG01a0IwdjZXdVBQYnRoMzhITFozOVNXUGd3NmcwVjg5VGljZ01OQmR6dHpZRkFiRTNyRmd5Q3B5Y3ZRNmZlK3hlSHJWQmdVU1I2OGRLVjExNjd0SEd3NThqUlBlKzhkMzUwY25ITC9zUHJOdzIwSjROTkVTOTB0K1hCQkVvZ2pDV3E4czByNDdjdVgySnB0S010NmFGSnZWcXdRSm9pN1ZLYXo4eWx1UVp2VzRqQ09kRUJxYnFoT2hYRXNFVU5saUVMUW1EVVFIUkx0VEhDd1FMbnFUSExka0xPMHAzZnNQT0lNemtic1JBVXNoMTZwSENFZ0UzSTFCMjlPVVhBdGgzVURIcGNuaEJEc2FpYnBRTnVqOS9Qd0lodXlMSUZOTXJucXl1R1pjQytXSlR5dVl5Nmd0VDBZckU2Tnp0clNBYlA4NFVTeDVXQnBvTEhIbXg2Nk1FRGNOdmF5TWI3RWRwLy9lUXZjck52ZWx4Z05ZY1dpN2duNEE3SFd6dldIb3JFdTVkSEw4MlBuT1Q0RmVpbEgzL0dlZHA0c0luQWlJQXY4dDQ3Rno0OGRkSG54MTc0MCtldjNweit0NS85U3BDVjVuaFRYMC96cG8wZG5SM05IYTBkdE0xVU1yTnpDeGRRM0dCeFVpNldMVUdWcWxLbFVlUmxJTXBNcmFFNTJ5WUxwcUk2L2NkNWViRHBETVVKZnFlZ29nanFaZ2dFNFRtWTUrcTJyWGw4TGgvakdMWGg2QXV6TEF5bElReFNnVk1ZREFLZ0ZveEpNRktUVlVuVUdvb20yd0IzNkZVMGRNT3lBWEJDbXNITXNCdEpCcWl3RjNWNVVKK1RHcVNCWUtiSDc2UDhNUndOUndQTmxKZm14SVp0R3JyQUYrYnlJek44MXJUMkhkLzV3UDNQNG5UWHpXc25wOForRllibVRGVmJLWktrZjZNNzBPenpwVFp2M21UWjlRLys4SHAyNWxwN2tuWDdmTkRYdjNLdnBpcDluVDNOOGRqRTJPTDMvdWxYRzlaMWVYenc1Ny95bVowN0R1WHlLL2xpV3VFc1hWTk12UXBqVG9uVnhma0ZUSzNZZUwwdTFqVEJSRFNVcnhuRmtwSEpDOVU2MEMwSGxWRW53b0NKQXhpQlVBbEM3c3JKMFNWa29vQndhNDVMMVNveGY2Z3JpVU00R0I0cnoxY0ZEeE54aWh1dWN5aXNPYUJpWTA0S092U0tOQVE1VjVYZEhxYXJveDNDVWNFMEhHelFOQUVSbkxDVzdxUXpvdWxRTU5MTUVtNjNTUUFQcld1V1VRY282Ry8zdG9SaWhNZW1naVpMUnlQUmlEdkFPSHRyNFl5dUI4UEI3czYxQStjdm5MdjR4aDh4ZGJhakQ2L1c2SG9GODdlMEJ6czZFNjNyMTI3YU96OXg0NjJYLzltRGE1M3RQZ1NESkkyR2RxenJjMXAwZjIra3U5dUpyZmk1czBOTnpZRjFtMU1OU2JOTkxKV01idHJZRlhkN0dyVnFvOFlQM3h4ZW5yalozeVNnUUNpTGdYeGFxMVRGVEpFdjF4eThjRnlZY0t5WXdtQVdoeDBYc2d4RVUzWEowcDFKQVFneEVGVEFzRVpKOXBqY2d3ZGJIandTN0d2V0lkcTFrZy8vOHJmbEg3OTdvUTVBZ3FVSkc5Wk15OEYxbUFDeXFya1l3amwzUDhONmFOVEZrQTdrcUtaYXFoYWtkTWxSQ2hUeGxRSDcwZWxoR0xBT3JQbFEwQVFiUGIyaHdTUHJybDZieTl5cHhsdzRRdFo4ak5uUzF1eUx1b0pSVDB1cWgzRDVWWWlwODFaK2VSN1dNcEJWRzErWXQ3RkFWMnAzc210d1lQdldvRGQ1NGZidlQvL3hGMnM5blgxcmV3UjVzbERqRGF3Ym9nQWxBemtBd05ZdGtZZWVmR2p6bGgzbGN1M08rRTJuNVVYQ1RRaVEyNXM4WGd6bmhQcjFxNU92djN6OXZ1MXJlOXYxb2FHSmJBa1c2cWp1VElVQXJBZEhjU2VySU1od1BraUpsK3F5NE5RanlBWXljQXFYcWR1b0JPTTFUV21Caks4ODNIbjRIbGFURjd4YTNSWk5LOWdjT1ByQzVadm05LzcrdFkrdXprQk9BVVJNZ29CMFF6RVU2UEN1YmEwdDhZbnhNY3FaTzk4SWhOekJVQUNZcUk5MVNWSzlXTXcvOGJuUGZIRHAzRHR2ZjdLalB4bWpsRjE5NE1FSGV2Q3RneWUrL1BFYmI0eTF1encrbWdBUWIydXlsNFk2VzRJZHNVaFRHOVEra1BDRldrV2IwaEZ2cnNndHpVLzdHTFNwYTh2NnZZL1FwT3UxLzNycHh0QzdSdzhlMkwzMjBOenk1T3o0S1hlZ3JXbmRzNUNiZ2dUWjN0cWYrTlR6eC9vR09weWtXVjVZY2h3bkZBa2hGaVlLM1Bsekg0Mk9MUFMxTlZVSzlWTzNDdDk0N0hoVEVQbk55NzhMT1V6Z3haeitxR2kyNDc1T2RWWWRJZW13MExoTDh5cU5jNDRGbWNDd1pLZVhPbG1uR1JZTjJ5L2M0eit4bFVSTnprMFRMQkFoUTlFb05MQW1EdS9jTi85eFlkZkQ3K2JCLy8vTEtabE9kY1lCTGdDRmNnQVVRbkFJWWpGa1RXZWlLUlhXVGREVTFIenluWTg4a1BMdlAvdVNLTThsMlRLbDhaSkxWVkdLakszSmxGdSsvNE96Zi96b0dtZXl1QU1kaHNuQWxwZlNvN2pVR25HM05rTTlYVlM4Sng3cUdzQ296WEkxdGxnY2ovVjB4VnQ2My9yZEs0dnpzdzg4OGllYjl4eHU4TmZmZStQbGVHRFQ0T2FIMGFnWCt1Vy9mMG5nbFBhMmhLcnBmTFhSM2hGdWxLb3loMExPSEJUbDNmZXUvUEtqWWVmVXZRQjArRnpCMXFaeU9mZlV3MGVEaUhIdXJUY29OeTdJbGlqQmdtU1hLb29CQU8yaldsczZsd3VsOFVwTk1wMEM3RHlHSXNDTkFnVUR0WHZiM0k5dmcxdGQxVURBaCtLUVpUcDFCVUpKaCtoSjNHOWhpZGlwTTBSWlptMm9YaXprQW40L3licFdLbkp4VmF3dGNJSnV1OTFJeUdNOS8rU2VscTdvQngrZG01MHZOaWNHQjlwOGhISzVOVWpwaldVMmdJQ3VOVXg0R3lCOG9ESUVnaTFmK2VLcGw5NmZZNk4rd3FFeXAwZERxdk9zbUc0RkNORGJBclhGVUU4QzYrNGYyTFR1c0U0RVovSTh4Nmt5VjkyNjY3NzJkY2VjQURsNTZpVy9OOUMzL2trWEJ0TDVQTHF4cy92c21Ucy8vSWYvMFl6S3cwODh3T1lNeGdKZHFaUU8xSGRmUGJNNnVmamkwOC9Ocnk1Vlp4WVVzYmEwTXJkWU5sYi80N1d2UFg3RVE3dm01K3JncmhNREhFSHUyVGR3NU9GRHQ0WW4vbkJ5WWlidnREdkZoeHJ0clQ3Sk1xYlNSU2NXOWtXUVBRbkxxNkdOZ3NNSlV0Y0dIKzZPVmtYRTQyT3ErZW5abWRxV3B0NFRUM1VCbFFlVUNwQW1VQ0lCbFFKaEJ0U0xkcmF5dEpBVlJOVHJiU3NWOHVkZStjUkZlMWtCOGxqSWp1TlA4UXVzUEhFQkl0bDhFY0VLTXE5ZVJGcThWTHhPS2JMYjYzZXV0SkN2Q29qWGc1TkFGbm82bUExYnVqQ2R1SGx4NnZhVWd4bDZaK3YxUFp1bTloM2MzYi9sNEdxZExwWlJKOHh0SU5TcStaNzQ1dGIrTGM0UjdreGQrdFUvZmhmNjNwL2YrNE1mZmJodjc4YkhuOXlFK1R3Um00blFlcEZiK2UwclozOTdjdFh0Wng4OS9uQTBFaGdkdWxVcjFVUFJJTUc0ejEyK2lkU3JmL2VWcCtibXhuSUYzdTl5eU1NOXVHMmczRWpydGNidkwweWh1UGpnNWlZL1pxN3BEOE0rOTgyMFdpdlhrVkxCWnpvMkpMR01wOW5IVm9TYzZnMDBEYXgzR29SVlhvYVJwaXhuUXB5bTVGZnBjTDY5Tnk0SjRWREhPc2duVmxiSEdNRWd2ZDZsaWR6RUhYTmxXWmxZTEFmaWJhdkZxa25wVDMvaG1hWkFnSktHV2xQaSsvOTFaZkdXb1FtQURJTVhYdnJLeTI5bVB2djlQOUFBMmJXanAxcXg5WEx1bWZ0Qzk5elgxTm0rclZZeDdveVB6QlhVYTlQMnRRdlRjYXdSOGNxN0QzVGU5OGl4YUxMcjVsaWxhcEU5NjFQOWZZODZrM3J6dFgvLzN0OStrNU1rNk04K3QzbmYvYnVpdmxCMVVkZzQwTGt3ZHYxSFAzbjE2cWhUU0lFSVVKbTBnR0k1MytCbUVReW4yNUtwZzRQOUFhOW5mSHpvM24xcjlodzhTRnIyYi83dC8xWHJHVkdxQTBoNzVwR2U0T1pPTkJ5Z1hTeVlYaGw3NTVwWGdwbzMrMENib1JKT3ZsR1dBc1NzY3ZHanhaVUs1ZTNZbUJwWVAzcjU3UExFNkxHSFQ5UXg3OUFIcDlxOURvSWFBT044SVdMOTFrRUZFdk96WTZESXQzUU5oaFB4c2VIWldoMVpMU0VUazZWaWxUY3NxYU83dGNoWjNYMHRKeDdvUHZmTzc0YlAxRmlHMlhhUTNYdDgzZmdVZE9uYWZFY0NPWGh3amRhb1Z3MjFhZTkyb2VxYXVGYjgvYzkvbHdoaWF6YTA3di9Vbi83b0orZS85VTgvN1hPemJsb1liRWRPM0w5cjg2YUhsam5QN2NiOGdhUEg3cHk4K3BYUGY5M3BQVlRZZy96OTMzNEJJNjFTUG52UHJyMkx3eGRlL05aUEw4NnJuRTBMSkFOZ05HWWlPeFB4b0k5MVdoVXFhYVY4RWZCMUlEdFdwSjIrTS9YamwzNjdNblRkRHdycjF2aTZPK2pEdThNUnJDakNWYnozQkdRNHBXSnVjcXo2Kzk5bGtObHlTbFZRdmFib1JReUI4aG10QUNVT2Z2bGJ5YzFIMCttcXFWWnhEKzRzbnVVTFRVOU96czRYVENKbVliSHJ0K2JPbloydTg2WW1FbzI4dEpKVDBnV3VKQXFIamo3UTF0bmpLQjB4dUoxcmt4MXR3VmhQYWo2ZFAvL1IwTUlrUnhQVTg1OWRzK0dRS1pYR0V5Rmo4M2F5M1Y4MTBndWtrSGJqcWlyRGRHb3prK282ZFduOEY3K2JYcnFUVG84TVAvN0lMcGNiT2orOG1OZUlLZzluRmhad2U3aC9FQXNGVzIvZkhFNkVneVJ0TEV6UGRmbWJrY043azRnV2VPVGd3WkViLy9YU2Y3NDZQQWNVNERNZzNkWUZKOU4wUy9kaWRqRmJCamJZMmQzOC9QSDdBejVtTlYwY1c2N2RuTTA1M1h0OXBQYnNmYjdCZmpMUndwSzREeU9iZVZQbHhWWEFMNURtQkdOR1RwK3ByRlpwM1BZMTR4aU9VUHFxTUxKZzdQL2k5OWorSXl0VmRYQ2dmOFB1NW5VZHpPRG0zYjM3ZG5hMHhQRUFVVEh5NVliU003aS9ybnQvK2VaWXRtSlVhM1p6YTJjazJlSU9wTklGL2RTWk13UlZPbndna1dxbVZwYnk3bmhrZFhsSldtNmtJZzdvS2lHMmdoc1FxS0hDSWc4SmVFTkJBZXkzdlYyTkN0QW1wK3JaNndDckgzdmk2WlhsOG1RbVAzNnJOSHI2N0F0UDd6aTBMY1hYdEd5dVVxeFlKZEd3clR0OTBWQW8wRHNwYTBkUEhPMExSYWxTRGZucUM4L3QzK3EvOE02cmIvMzJQWVZ6SzBRd3B3aHJmTlJqTzlaczZmVzJ4d0tDYkR4MDN6MmZPbkYwcFp3bmc4SHBoY1hSNmFVNlRQZkE5b3YzQkwvOW1kNUlXRkM0dkNacjFZcW5oa1FKTCsybGRZSmtUYzJIdytpNUMvT2ZMR3VabXIyUTRScGxWRlpBdG1GNFUxczhjYWZaNnhpQk41YlBXZGw1cmo2ZW5mMTkySlBjY1BTWVI1Yy9mdWNqd3VzNmNuVGZ6R3JwK2xST00vQmdGR013cnBFdWx3ckZaSXJjdWNkT3RhUEZDbnZ6ampRME5SZjFlWHVhWXdSZDNiVVdZMkZ6WVJXcEZPeGNRYTA0VG8xUVpRMFJBVk1SekhKTnhoVkl6V1JkR25mLzRYVUQremFGZXpzVlhqai91L09zYmE1cGpTcXFZNlhtVWhVUjB5cWxadHQ3ZktnN1BEYVp2K2VlSS9HNEYvbTN2LzdVNlhmKzhjS0hOeFErUXFGTXBvZ3RWYXA3dWx4UGJmYnM2bFAyckUrMHg5YUZPOWVjdkRiMDlvVXJIMXdielpRYURVV3h4UHFMaCtpdlBwSkFyU0tmem9zQ3FYQ0dhZVFGY1lJd1JNeDBJZTJIc09idEdHR3FxTEl5V1U0MzlFc05lMmpCV016cHZHQXVYTDh1TDkxWWYvdzR0emcxOHRhM0lwNnF5aE9ZYVZXcWk0UTdPbkw2VEY4SUQzaTFrckIwLzBOUDNiaVR1NXJMN1c2amd5ektWU3E5QTFoclZ5bmNCR1M0NC9KRS9PTlJhYUVtcjJTNFFsRTJUV0hQRG04d2hGeTZVU2dZckk1N01wbEtKVjhYaXh5L3V0cklGQWljcGdIRExRalQxMjdxK1U4MnRVYTJIZGwxLytPN2dkODRlM05pWkdLV1Y1eGVZTWgxdFd6NGFxSVowc1oyOWtaa1p1T2J0LzY0YmNjQjVKRU5pOE5ucTQxeVcwbXBYN3RSV0dyVVVacUU2L1gwZExhNkNHZFdzand5dlpJci92cXRDN3BseDFsL1ViRndQLzEwbi8vSjNVYXcxVklMUXI2a21ycFRCakdhMWoyNGppbzhRQ3VXSjJReFBUQTgwTlBXYzk5OWNDeUJmWFMrT21yb2VRRVRMTXEyUkFjVDcxeTgwaFgyNDlKOGJtWU94eW0yOVVnZVp4QTdrOFFxaVlDWTdDUWp6ZDBVSEsvbkttdGF6RWVPUkc1Y21LQVE3L2J0ak1lTDV2UDBxNyt2U3VqT1ZVbWZXOGw0UTRuYjg0WFpraHh2Y2FYaVBxbmVzSEEwMWhTbW5FekJZWmFFb25FMG1XQmlFVGRFaXdEQng2ZjR4U1ZBRm92SThyQmlGdGJmdCtYWWlkM05BUThMWTJzN1l4c0dtbTVuNUlXQ1FmRUNZOVg3Ti9VakxzK0ZhOVBJbHBESTgraFMzaDZhS3ozMDRJT3QvYW1SK1RtM3dlemMydDRSTjBNTVRMdmNDTkE5Z1hpbDd0UXZnNE0xQ1JqN0F1NGpCOXdFYm1mS3RHa1RCR0dZd0pZNFN1VngyTWtGQmdYMVJURXpoVEUwNmlIMFVMQnJUZnYycU9FQjJPMENQOW9RY3c1bE4vWGExZVVicDgvM2JudlVoc24wN0UxY3pMb1pGQU9OQUFveGpDWGlrcVJwWnJHd3MwOSs1bWs3dWI0VnlKM0RWMmFiWE5WZ3RQUE9HRGMrWGJnMWNzdmxKVHBia3BwaDUyVjFwaUt0WnFIdDNZbk9tT1JEVlE4SnZINHIyY3A0dllEMVN1Nmc0WWlHZ0V5Zlg0aTJKTTRONlRkbnJlYTRuNEhyWEhFSlVpcXRYbXJieHQ3bXNIM1BJNXM5Z2NqYko2OXpTbFNYMURidnhPYmU0MldMUmpwY3NZVXlmbjFxS1JGUFBQUGs0NWV1MzdrOXM5d1RqKzNmVElmcGZJTlRtbnJXVGM3T3ZmbkJpZzVCRUlNMlZOR1dqVS92NmRteDFYMzc1b3hoV0lpRjVGWUVYWVJFUVpRMFhWWmgyOENjcjJGaFNjNWNzeXdCYWRxbkNsQWJrenZVRzN0ZzM5clZUUFhPU24xeWRyVXBGaVQ5L3NuVlN0dTZRYWRvdExXUU5MbGlhb3FnVlEyTXp1VGNuNXliNmc1cUxmNktWRitvRkdyOXozMm5mKy8rNmFFTGw0ZEtLNDJndXlWSStQQlljMWU1eGwrNWZFMlZnR3doNlRwUEdkYUdib2EyK1lEZjVmRlRnbHgzdVhHdjM2OUlKazBGZEJVcXBrc3c3Z2ZlMXJjdnptVmxiZC9SQTB1elk0dER5eFJ0Y1lvd1BwSDIrRnFYOCtqdDRRa1hhOEFPK2t1bGFKQkpkbTlHV0lyK1lEUWQ5ZEc3ZDJ6NGwxKzhjbjU2RHNGcHlwRGpwQjROK0EzZ3FwbXl5NWNZSEZ6YjFabUM5REtoVUR0U2tXODhnYytkbjh3VTdMWU93eENFdVJIZGduQ2FOUWhNSXhIVDFoei9nalduVEJmNWFycW9URnpSeDRlV3I2MmUvdG0xVm92LzBwZWUyTDI5SXo4L2RYcW9ST2d3UmxrNXdhN1VvTlc4d0J1dTJWVmx1UUIrODJidDFaZkwremQzYk42RW0xYkJWRnkxb3FDNDEwWUh2MHkxSnIvL293OWVPVnRjcm1NNmlGYzRBeU9aelR0MjBBUk13M3EySnExazFlMWhwQ1BPbHV2R2dpTTJIcE1ObnlpNlY1YTA1WXhRNG1UTHBqa1pLdFhVcG5oc1lqSFh2V2xQNjVxMTc1MjVlZVptL21jdno1MDgwM2oxZzhtWC9uaUJ4Y2xFeklWaTdscTFSQkxWVkpSRlpGbVJETGk1MWE4QitQWlVHaUc5SnFMUmd0d2I4N1MwSlJvU01yTlFvYW1VQmVPM2gyNmhtbDZ0cUttZ3NUNWF2bmllYStycWJHcWhjeG1uZ2Rnd2dyajhoQ3RBWXl5Tk02VEg1d0Uya1VrTHRad1doRG0rWFAzNGVpTzFxVmVEOFl0WGJoMTZlTSsyRGNrd3dzek81QnVpakxubzl6Kys5ZXQzcHk5ZUYvOXdhdm5reDJMTTIvVE1aenpIN2hOMWF4SGdMb3BzMCticWZMWUsyUlBScEpEeXhmN2pyV3Y1Y2kyZHlVek5wVU9SSm9TaWl1V1NaUm9aVWVkVkxVVkFNSUpQcG8zVlBKckpHYk9yOHJXYkpVN0NZcWxXaWc2SG02Sjk2N29ETGpkc056VkU4L1RGajFtUExTdlFyMTh2K3IzSnJmZDRjRC9pUXFGc2hydjdUb0RQVnhVNTI2d1B0akpJTXVUbEpTdkQxeVpuOHdSSjI3WUJET1ZnWDNEellPZEtibWxzTEZmT21jNjZuYjA2SnBxZ3hqRU5uais0TnhabVdtL09yUEs2RlBTM0JpSXhSYXRTdHFNUkRMZzlIZXYzVGM3eEZ5OHNGL0xxeXFJUjdpQTdEcTZSZzdTQktYMDdXMXlEYldldWpJNmR2KzZtOVhDQ21sdXV6ay96aTVNTmgydzBocDZwMWlYVC9xdXZ0MzN2aCswOWZZS2NYalNNZ0czNXVHckcwRVNYeXdVYUpmbjZ1OTBKaHJaODdsQ1l4S3psb2pTM09EZDBaM1I1dFpJWEpRU1hQYWJ0Y2djTTJNT3JsR1FUQnNIWUVMcTRXTEVSREtNeDFjUnJvc0kzOHZFd0lWb05nbUZxT2VXdFY4YWRMUGpxaTczZi9vZmVleiszNXRIamU1ODd2cThwNEw5OGRWSndmQVVsR25WK1RWc0lTUWJjbFhyZFJoMmVaMDFMdDFSNVQxdjBzU09IcCtjV01zc0xmZ3AzdXdJYXdlZ1FucTVxUzdMajVpUWo4WVZ5RFZpd1pBcTVhb0hCZlg2ZlpTR29LcWdJN3ByTDFkS0ZDa1pEd1RqY3ZjSFh1U3RDdHljb2YzUndTdy9wdGtOaGJOLzkvZHUyeEh4UjA5OWN1ZmRJMjVIN05xMkpCUzZNNXhmckFnREd6Nyt4Njh2ZlQ0RDVtL3F5YXRtSVlWTWt5aW81VFJWRUs1RHlKamVxWEhiNTl0SmdhOHVKUjdkK2VIYTBVQlUxQ3dLd0M4RnhRK0V0eFZyYkZva25takNNZ3ZsYWE0ekVYRWFzS2RqVjNhd2Irc2pJZEZXWFlpMDl1cVNyUW9aMmdGdG5Nbk9sNWliNmlSZVNXeCtUWWY2T3ZPTEc3Q1JDbzMxTnpXKzhkWFZxamtNcGwrUExYbFpIYkUyMUlOdUNNQXZZcGlwdjYrMDZmdkRRbGJNWEZ4Wm1uM2hxQUNEb2paR2xoZ1ZXZWFOc1loSm1LS2dZaFVMNXJGcVN0TzZ0TFNZR2JsOWZnV2phRlhYUHo5Ykt0VkprUU4zN1lQdUd4N2UxM2JNK3NyT3ZtaVVFYkUxdzB4UEFUbWdLb3ZBcXFOZjRYTWFMcWl5ck1RUWY2bk5UWFByMU41Y2lNZTkvL0ZYL1U1OXJBWXRadldqWnNHb29Hcy9WRGFHR1djNTFiRGlVaGNNTG5tYm1sUjh0VldGOTJ6TjcyN3p1UGdaMHRpZG1jMWxORmgvYXM4ZHMxUFA1U2lETUNKek80blo3d3F0clFybGFYZFBmVytlTENHS1dNM1ZaaE81NzRMR0dxT1hTamRHaGJLSkYrdm8vOTBTYUZIazBvMVJNWGF5UUNHdm54Yi82bDkrK2R5MEhFejRMUlp5OHgzRUI1WjJRUXdrYmdnQmtBUXNrbXhMRll2SG02TUwvODljOVI3NTkzOHpiSzdmR1paRXpCVU5UZ01FQzRVU0FlYlFyWEUzMS9mZTFrVjk4VUd5bEFWUWxSWUx3cCtJWUk3YTF3TnNQZHdKQ3JJeVZiMTlWcmw1ZnBWekpnWHZpcjd4NU9qYzhyalNXNmxLQnNEV3NMdlQ1OElPYjR0R1FscStldmphbGZ2dFBteDcvd2xhb0N3RnpjOEtxZ2tFeWhGb293UVFvUnVGNTJ4U29FTXlnWVR5VnV2NnhOYjJJK2phS3BibkY3ZnVTZm53MmRyTzg3Y0Yra3NJNnRpWkxmUGpTNWZUNFpHRjVwWURHeldoQmJvNEdBVTVldkh5RDR3U3hybEF3azgyczNob1piWTRrcmx5NVJESHFrNS9mQWV4RmZhNW1saGhESStwU0ZoUXVMYXJkdjM5L0NYYjVlenBhWlYyVEdyVThwNk1XZ3R2QUdaVUptemFLMEV1THkwdU45S0dka1NNUEpjRHltY2xiUmVqdS8rRVJUcUs3TFdWbnlydTNqUTJRTjQ0KytwQWU2UHZDUDMrRUFyQzJ6VnZpNnQvK3lVaFhHTjlITVkwMzlUdVQrUXVucmtzVnlBWjJzTG4renNucmlDVEhjSkRod1J5QXE4Qm1BZm54Q25WNnRMaXozZXhkU3g1OXNxOTVleGlRbkhhekp0ZDVXTGMwcEFCQThPN2JZYWpGK0VNYzM5Q3NxQkFOUjV2d0srT3IwNmExUjY3NUZlam0rTXppekR4TGhBeEoxQXpyMXNkdlB2MnBRd2YyYjc3NjloQVRYTzhLMmhpaDFhdjFXREl4UHJvd05wSjFCejBMMC9rYUwxKzkrazdjRjFaTjRjKyt2QjFselBKUVdLc0FXQkVFRGtXWnRVV04vZkVyVnpTVDZXbHEyZERYbXFuVnhvYUxobVk3WjJNREU0SmtPZXdoSVpaWktLNTArN1ZQUDdrTndJSTJXcjkrc1h4cVRGWmR0TU9mM1NqYmlpaWQvY21PWHNKUVJvNnRDWnorYm44OGlvVGJndWtzOGVQL1dacEtOOTRiaHF0L3ZHMG9BSUU4d1NCR2t6S0tPbFVjN21yMS8rVXorK1pXS3I4YTVWOGZYaW9wSWdEeVFCQmZ1ek80KzNEQTQ2QmZ0V0J4dEMwWWhJRUJ6R3dvTEVwamJpSlV6bVZwTjFJc2Fqa2gwTkdXS0V4ZHVuUjFmZzVZU3p5NnNpaWR2RERaeUZiV0R2cktzcHFleWtHcThYUDU1SkdqRzdmdDdBR0VCSlNTWnBsTi9TNEFMKzIrUDdyelFLY051L01sZkdreFcwNlBuMzF2NHVpdUFWYm1KbCtmWHNrM29haWpDTEdxb2xnVGUrbFc1WU5iSXNyNnZCaW1WNFg1NVhuSEJSRE5ScHhkZE9nYk52WE9xSnRHN1ptaThNQ0d4T2NlOHdLbHVyaE0vZXp0Mm9nQUlNTHNDM282VUN5RTFuZHRNNXZiSVZFcEVpVGVzM2Q5S0FCejA3Yzc0cDZIdm5CY1hLM2Z2TEZBd2pZQld4NkdvVWdNaFp4SmdVVGNTV2g5ZERuOTRLTUhEdlVHZTBMZXBZcXlrUlQrNjI4SDFtK1ZjUUlvQU5aMHlSSTRUSEZNMUlKUUJOaWtvWmlRY3hVdEdKaDBab1hQVkYxdDNYdVdSNWN2MzFwTnRLVlN2djd6WjBmSDUrYkMzaWlKK1RBVDhzQndLT3hCTVJ1aHpGUjNpNjFWSkFlUVpoZTAxUVVTMVlDRlZtdWNWRTU3R2JPMWgyMWYxek80Ky9ua2h1M2pkKzZNWEZubHFvcG9zdW1LbXBIaE0xT1oxeTdsRkFLbFhVNTF0MmZtWm90OERUTE1uaVkzQ3RzQUpuSFUxZ2pGaEVrVUFzQkw0NkNXTjZyRm9XbjNaTW1FZ01lcjYzNFJjUnZDNXExc3FqZW1LZzFWQzd1Qy9abnhrakEwRXgvYzhjZlhQalRoV2E3a3pOdTF0ai9PQzFJeEowS0dIb3dtWXo2MmtLdlFyUjJ2bnI5Ni9kdS8vOEhqUGNlM2VIcTZ0c05xaVNCbUxGU3JhNFRKR2JqZW9CQXNrNVp3ZHlEWTZtaFI1UE5PcWhhYVc5dHRoclVBbGMzTk54UnRjZ0ZUYkNUaVJ1WXpPUjlMckdscUxoZXM5TTM4eHA2SU02bVdMcGJVaWhHdkptV3ZLS0loQ1RDaVdwUWxGNmRocklYeXhPT0NOSzFWYzBLdGxFNlhCamJIMFk0dFdPQXZVanV6TjgrZStmRFg3ME8wTnkyRDYzT1NRYU1vZ3RxUUpkZ0c1TVpJU1ZPS1VuZlArcnUzRTVnb1NwcFd5S0VSRjFPb0MrdFQ5RDB4RkxiTTMxMm9mVHl2a3lob3h0UXVYSGZLMmI0akhrK2JwOEViYkd5dFNZUlhWaWJVWE0yZjZ2ZjFicmgwcy9MVHQwWWp6UjJjbXM3eHZBdzVQVUduWGZSS1NkZFJaakpYVEl1U3d5aFJSRTFHM1FTc2h5bEFJbTRNaTJnU3JPU3FZcjVBa3pqR3RGeStqaXlXRUJzd1p0MnNsdVI2bzZHYWFpYkxSVk9wM3YzOWpacjUyaHZEdVZ5VmdhWEJ2bFlOc0tkdVRUbnhGdktTcHM1eGtrVEpWb2NMQjBKZTBtRWkzSUk1NkFOcmdpclhYQ3dUSmoxMmFXeWtwRGRpVUhFWldiNVN2SGgxL3NJZHFWSmIwNTN3aGdQL2MzTDB5cUtpSVI0Y2hXRkx0NTA4dGpHWUFLWXErVERpNmNmdVIzUkRNelhiRFdOaEx3MUlhNkVxeFNuOFFCaWkzTXdyNS9VYlJjMkxHVDFlc0R2cDNydUJUUFpDa0Y3bEc2Yks2NlRGK1p4WHJEWXkwemQ3OTYvWnVIL3Y0b3cwYzN1U1JzaWJjL21KU2tNdzNPbGl2Y1R4VTZWNnRwamIzdUw5NGdQZGg1SkJVNnhsYXprWTlxVFRGUlMzY2RqOXlkazc1U3dvRnd5M1AxVFI0SmQvTjNuMWhwaEptMWlvSmR6U1hPZjBtdXpKNWRUaFM3ZkdwN0tqcytXK1ZOQWh3WXZYeHEvTzUvN2hweit4VWVQUzJadWFJSStNOFpUYjNkNUdHbUtWVHNXOVczc2cxTkFxOWJ2M3p0R1cyN1ptcnkvYytLU0VFVmhISHpzOVd2N2ptNnZ6WXl1M3owM2VPSDE5NithMS9Xdlh2Mzk1bkxjUjJrVmhLR3dhdW1VNDE5c3JjNVdOYTFMUEhuOEtPYkNsRHpWMDBqUVkxQlEwdWNBYmNaYnNJSFRTWm40elo4NldoRTRiMlJHbnQzUlNiZTA2RlRCRWh3RjF3NVlybEpqSHF3MDIyQnpxREZqeURjSmJPWHI4d05idUhxV1UzeHltQ1FzYkszTThqRmIxaG1PSm5VRmZDNjZ0Y1pPazkrNGJONVRGRlFRejF0M3BEYU1JN3F2enNWdDN5aU16NGxTMlZ0VHFGY1YzWlZTWVQrdGwxWloxcEZLR3BoYjBreC9OV0lLMk9wOEwwdWhmLzhYWDNoNlpldm1UTVZUSCtscDd5MVZ1YkhiV2NsVEV1Q0lSZDA4UDZ2UEFCQ29Eb3k0dEZjMkdoUVc5UHAzTkRDbm5iNXRiTnlXMjdpVm9ieG5yYmxzUzRGTlhlTVFmNUcxcDR0TGtNN3RTV3phdStmM2xVUU9DQ1FTaUNjekRzUFZTdy9Hb1AvL2FwL3hlRi9MQ3NSMndvY09XczZHZzFKQk0zZlpnQ0dKQmtoMDhWMWJTcGNaR2IzQnQyR2xJdVk0ZVFwRlV6U0E4elNGM3dtOFpvRHlkdDJuRTFlSTI3UXFvWktGcUtmckFudDNQSFF1SjFmNjJ6ZzgvR2VZTjJTWUpONFEyWVJBRHBIcTE2dDNRYlhWRStWcFI1QVhTNi9MSDNLZE8zYWFvN3NGTmc2ZXVEZzh2R28wNld4Tm9BWVZXakVxWnF4ZlQrZFhGSWkrWkhWMWQzWjBkL2dDemZ2M2dxVXRqcjV5KzJ0clp2YTI3NS9TcE14ZUhSM1FTazB5WXBvbmVObVQzUnRUbDFoMzJSem1oc2xJdVorVm92SFdlY2I5K0kwYzJYS2dObHdyTFF0R3hlZStXWTJ2bTA4ak5oYXcvNmNOc3ZGRXZzNUhJbGVtTW9Ga01qaElveHRVNG9TNzluNjgvZmUrOUIyNlBqaUY3dWdNRzRsbFlMQ2FUclM3V3oxZHFscXJLQmp4YTA0WlhTMDVXSmtJaHdGYzNibkczOTN0STNLdkJEQkVQS0M2M0ZlcEYzVkVoZTRmeVFacTcwMVJ3cTV5VkpoY0p4QTM4ak05TGI5dTQvZDF6STZxcU1EcVdvS0RCZ1ZBb2lDRW1wWnBVdHNEVFJNd0JtU3ZYRnovOGNPYkd0ZEg5Qi9vZmZPYXhrY25aMGZGaVNaWUZBbEl0MVkrd1RmNlllZmRIRWZUVzluaWhsRFlkTDhHSjAzZm1nSUY3YkNlYmhMeWhsamtPMkVDUU5JZmE5N1lFOW16eThLS0MwZjVHUHV2eUJwaEUxMkpPUkEyRFJ1RGxUUFc5YzdsM2J1a3JNMVFIVnd1ME93MjgrZlhUSTRMbXFaam8rWlhHeXgrUE84Y0orTjBJakRUcVlsbFEvdWxianp6Ly9NTWZmSFFwMWJvTytkU0pkWDg0ZVdjMFV6cTJlM05ubDV0MENpOE1aVmZycXpXaERsbVFhU0ljSDJEMXAwOXNXNWxNNTlORXZDT2xOU282eENLSmRTNlNoUEpUVU54UEp0WkxLS1lvSmF4UnRVczFHMWRvbUY5emFEdWhhRGR1ekpIQTh1dVNJV29zRzR4Rm82aDU5d1lKM1NMRzUxYW5GNnNuUHZQbkRVWCt5YzgvM05DLzQ5Nmp1NlJTUlNnMmJObUJEM2VJOVpRQnpEbkVMQ29ycFNKS3VvdTV1cE1Ya1Vpc3BhczEwaHlmWE0yT1ozSU1CcE1RSk9Gb1dZSFhhTkE5dTFqYmVabkFzQXhlY1phc3BkM0VhYkE4NWRYc3E3T05DZzR4bm9DTHNGQllNUE4yVmJSVjJIOWpaSG01eW5saTRVY2VlK0NKRS9jV3N1bEt2bFFUbEgvOGkrTi84ZVVuZi92K1c1NTQ5ejBQZkI3NSt2OTlJY0ZDNVpuWmxWd21ra1FPM3I5MzdlYU5uLzcwazBmMmJkQ0VaVllWMXpmNWcxRUlVczM2dFBmajE1ZmpFZUJDZU5SaFRTZVh1U1ZFTncxNkRkNStMNUY2aUFwL1JvZFhoY2Fza25QazFGVUE1ajM5eFBQSDFtN2QwTndhUU8rTVpyTjVxK0J3UkdsVmw3bElJdUR4NFNScnRIVEVFOG5ZOHV6QzVPM1RoKy92MmRtTGRTbHFGTUtSZ0dlNmtCOHZGSjBsRkEwYXByMFNSazNraS82bStNelM2dkRjbkVsakZNSEFDRnBIYktjUXNUWnFXM0RCMHRwQ1NHOEhoYm90Si9xVkJxZzRUWnZubEFyaWFKYXpuRDRRTjdsNk1xUU9EUGdnWGJHYzR3YVRJWCtnb3lkeTdKNDlxVkFvdTVvZEhyN05GOFh2dkhEb0cxOSs0bjlmZm9VSUp4NTc3azlOQjBRKzljeUovbFJzWFUvZzdPVnI3NS9QelU0TGN5dExrc21GQXV5aGJRTmVZSzZ1bEZ6QkZrY0NIcWQyMUNwR1BkL1RIN0lJVGxCcmxyT2xkRkN1QkpEa0JwTnRJcWdtQXEzTGxVODBBWFZ0ZVE1cTJ2VEpIMzdkR1hBTnJBK21ncVdEenh4dTZtNHhOZDduQ2M1TlZ6TjVhY2V1em9jZk9rRGdpc3VYT2ZGZ2JPOWVQT3liWXdOY2JIZDdwS2ZMczF6ejF2amQvZjA0NDU4dkZ5MUZuUzBYQk4yc2lnTHI4aTJYaXN2cFFqRmZjQU1FWUlnb09nQ2lVb2kyYXB1L3ZsekpGTEQ3OXlScHVDSFZqRkpScUdSSzVaSmV0OXl3dDNseFNaTnJwWllvNmZheUhNWDg5dUxNSHkrTUs4Qld1Y3JJemR2dnZuUCt2U3RqdHFoKzkyK2VmdTc1bzYvKzVsVnZxdXZFRjc1cEtjcnJQLzhKOHZ6ZXRUSkdwd1o3TjYrTnpzN01YNXBLenl3WHpsNmRldVBrVlJpU2FNS2RxOXFMcTZXQ0JEdEdLQUtNTm1uYk1waU9XSHo3RGtXQVNJRHBwU3FaU0Jqd25jckNMd2c1U3Vvcmpkb0M0MjhQZFI3SlovWHZ2UEJEMHFoM3hBSnpxNlNNZDY1bVM4VlNNWkhxdm41am1Tc3ZEWGFHRVJqMkpmd013ZUdnWXBxcVZxcFNtaHJzRzRnZjNwY3B6VmlaNm1mdTNSZEFOWTNuNzk3elorZzE1eXJWUkFoeFpJV3dCQnBpOExXaFNJS2xJQUpCTVNpRTZFa0hGelZyZlo4bkdNWlJVWUdBVFdDR0F1c0ZqVDMxQ2I5YXlSL2FIZTlzOVk4c1p2OTRwWmlYQW9DS0ZLcjF1eVhMZ3ZJbGVXTlA5THYvOEVMZmh0YTN6NXhwV2J2ajJEUGZLSmF6Ly92RGY3SnpFOGhmdnJCZTFZdTFlaldlNkRwMGVHZlFCeGFYc3B4b0dEWjJmVEk3TnJib0Q0Y0NZYStvNjdONWJsVXlMUWNiQ28xMXV6ZjZ1b042blVNVXFsZ3ZxckRwaTlSMHRRSkZkdEFrakM3bVZ5NVBDL0x3dW1PUG5UbzVjdlhNMkxvMWJlKzlmUHZVeC9QcGFuMWxKWU1UVE0wQ20zcWJVVXNnb2dPTk1vRUxNemFrUVUzM1FiNEJOVC9lR0RydjZWKy8rYlBmdmZEbTJUZGVlYnVuQ2Y3TGIyNy9rMGVTejk2L0ZyZlFkRTVzOTZZOG1OeldCSFhIdlNRUWd4NTRYWGQwUXpONlR6djl5R0M0TjRtdFpESlMxV2E5QVlLbU5ORmRGN3hYUitwcFFicjM0WTV0YTRPbHJFQ0U5K0NkRzY4TVQrcUtEa3hNa0N2SkdQN1l3N3VlZlBaK0M2Nk5EQS92My8vUXpzTlBmZmplaDYvOXk5K3gvRkxDMmZnV3FyUnhzSWZDcVZ5NmpsUDBzUWNQSGRpM1dWRnFNeE9yQmdBT1NLeVVDZzFCOW9iRG1WcGVRalRGUkdCSmE0NFNkbTRPQnFnN2RVQ3hUYnd4NzBGTnhwMGtpTTdWMjdQUWJQcm11M05MSzduQnh3YUN0dlRtNzBheWRSNkxCV2FXMHJ6RXQ3YWxhcVh5OEZLaGMvTytZUHVtOGtybXlsdW50ZnhDZXdSSEFLa0ZjTlhPdVdxRjFhdWp2cFoxZXg3Y2xsdTZ1aWFodDdmYStjbjV2dGI0dmNlYXVVeVpFZWxkM2RUMlRwYVFiVXNXTVVpbEljMEZ5MjRTRUF4UzR0WFpXZVBhbURDMENzWXkxRWlhT1QzZVNGdksrajFKdDlPQVRHMjJyRUNoL29XaU9Edzh4TmZsc2lodTM5RDhKNTkvSU5YS1RzemVjdHovMldjK0YwMTEvZWRMLy9iZXF5LzFodlZVQ0Y5Y3pTSUpzelk1UGgwTkJwdkN6WFZSTE5lWGdsSDJpU2VPNzltZkZMbnE2RXhhc3kxZEJyeURBQWJrQ0t1enR5Y2E4bzNOVDA5TzVnV1JTS1Myc0VqWktvMHpqclNBeEsvTTRnNDdiVXdZUUwzeTNpSlVXOTM5NEZZcEs3OTdhWDdGbHBhcUlvWlNEVW1kTGxYN0J6WW9DRHMxZHUyQmJmYnVIWGpZcTJCd3pXek13Wms4VUNsVllrVExGdmo1MWV4SXlBT0xLL2F2ZjdIdzBVa3V2MVRzYURVd2huenZqYUZZd01mUVdESE5oOXhoUzFEVm1rd1R0SzV6WlU2dVNVeE5JWlpONkdxNmNYbXlmSFd1K2ttZVM1ZU05R2o5MnUzNitJZ3dVNUNYQzN3alg4Mm1TK3U2ZlYvNnpKN0hqMitwbDVaeXBjejJuWnYzN2o4OFBwdjcxeC8rWk9uMnRhMHRvVTRmcWtuR1ZOWkdQclV0d1ZmcnQ2K1BhS3FaNnVuQnZVSzVVZVFhbnVibWdmdVA5bTVaSDRZVVpIWWw0OHhlMW5YVFpBTSt3dXVuYnk1bnlocVlteWpuNzl3WVROcEExOU9pUDdScEV3V3FLQXhoSGpzZWd4cFo2SjIzeGxOeC80NmRtMitQbDZ1V3h4bVZBd1p6bk1DWklOU3kxc2hOZk82UXZQZEJpL1htM0NFZlJudGdENFQ0ZGFkL2s1NldZTExKSFhJaGFzV1N5aFlCNGwxeE9tQlJqR2lxZFowTW5MbWl2Ym1VSHBvb0NiSlc1MVNocmdFRkVVUkowU1dNOVRRMDM1MmxVcDFpc0VCc2NlVnVDSGFrb2pzR3d6dTY2RzNyZ29GbVZ0YWNEcUYweFVQUFBMVHQ4VWZhMjFKMnBiU1NhbzF1M2I1UGxLbFgzL2pEcjM3ekI2c3ViNHlGV1Qzdk1wenVabzRXYk9oZjcySDlwSDh4MTFqZ0c4RTIzN3E5VzladDNVaGpRWVRzNEVCZDFjdXdqbVJYR2lPall5Yy92SFZoYU1WWnpTWTNIZ3Q0NUlvUUpCbXVVZjdNSTcxUDdtNHBWbVU5RlBUNE5GQ2U4VFZGM3owL3Bka2RJN2ZMdDY1UDk2M3RWbTFXTnBCOGNiVTVucFFnWnJwU21wd2JIZkRqSTYvdnNxa2gvZTROMzFHSThGdXdxVnVpRFZETThLR1FDOEpGQVBIQVVJRmhBcFlBRmdDNU9sK3Nsd1Y0cXRoOFl4WmN1VG81dk1DekZPaU0rWnNkd0lGMVRPTWlTZTljRlRGeEZ4WndaeGVtNzEzWHZtMUhaRzB2WU54MWdJaE9Cd0pRUjROcnUzb3RCNXVvTHd6WHBPVlkxTzhsb2t2bDdNVWJDME0zT0Y1UVUyR2t2NGwxR1RLaDVqMGU1bGJHSHEzNW9ML1pESGVGb2hBQVMzeGpwU0pxS0lnMWU3ZHYyTFRwNEFPZXp2NmlBdFVxQXFQd01GNHIxUW9PT1Z5Nk9IUCszSVZLM3NGbVhBR0VCc3lvMno2NkxyUnZUZGR5YlZveGxMcHpJTk5BNG4yVFMvVXI0eXVSdS9lRldzMFJ1THN0Vk02VjRva09tM0ZEb2ZCSE43UFM0dVRiMzIvdTNpQUlEZWVseFVrbURoUlRiNVFsdVFhak5BcDVMRTJFMFFhTzZYZC8vZ0xCRVlJQWtnSmdCUGh3NEVHQjFpeEFPNGVMN0R1Ly9mWDFzMk1ZNnVycUhHaUwrbFV6ZDIweS9jUXpuMDNGU0xjd3RLWWZCZlZWZFhtc0l0VGhZSlRIbUJybnF6ZWlNT0h5K0t2K1lFaVFzYVhGMWRIaCtkdWpqYW9BbWtLdU5wb08wcHlYcm51QXpnQXdqMkkzVm9GZWowQmZIWEMzTTNxVUJDcUVWRkJzUlpBcXZFcGlJTmJpYTkyNmNjczk5emUxZE9pWU81Zm45RklqQWhtYVZWL09MY3hPTHVaWGxkbUp1VUpCR3AwdkZRRG9CYURaWVZjYkNRYmFUWW90QzN4VE5MU211eTIzdkJEem9scGpvcU05RE5QQmE5ZnZlSlB4MW8yYi92ZFh3OW5wMGZmL2EyTlRsKzd3bmd6aFFMWG9odXp3cW8wQVlGS2FSRklzQmxsbFZhM2FKZ1JCTkxCaDVPNXR1UVRrQTRTNVlQRzQ0RDdLdGc3STlmemNzdjdpMzc4eGt3ZTlMUzJ4SnMzUlpyVm92L2lwSTNEeGZHSHloc2VGZWtKUkpCRGxDYWRUaUtabGU4T3VZSVNRZVdoaWhMODF0SkF0bEZ3dU53eTNtNXFlOUlzdENJVENEWUlRWVVVaGRLSVdqSjJicnhxeUI0bkNFSU1ZSkdUQUFMZ3dRS0EwUWpBUVJKUldhMU1qQzN4bVVsMFpVaXBqVHVYMXRnMEFkMWl3UEJaRU9GRTkwT1BadXFGbis3YmVOUU5ORE9Gd0hGaktxWk9pR1UwRS91dzdYNStaSHEzT0RMLzQxR0VDNXE5ZnZZaGdtaW9ycVZDTEYyZktoU3pMWU8xZHFXaUEzTnB0dStJdXczQVpkQUNTUldObFdtdlVXTm9uRnVFclp4WklockpOZUdZc3g1V0F4anNOVlNubkJMRWlvNXBvQUZ0Um1NWExDOE52blNwTVplWlgwWGV2NUpkRWJyRlk1T3FWNHc4ZlhwMGRtNXU1RVd4dXdzTXQza1NTalNWVXhtV3hqdUdTZmwrNDNsRFBucm45OXU4bnIzMlMwVlNvclQzUkZHMFMrVlVHcW5pUnUyOEw0UmdzU0VaVndiY2VmanJoN2I3OHlWQ1Z0YUNuZXFOUkVtZXRLbzNMWGdJTFVteGQxam1Za0d6ZzdLNkRuTkc0R3dFaTZxUFJhQmgzZTlaMERrYURlM1RERHpNU1JJaW1MZGRxR2E2V3N6aVI0NVZTdlZHcEZBL3VPTnk5YnVDZi8vbzdBVjRNdWQxNE1sWGlyZUd6d3kyeFdMVmVra1NlOEVLZGgvWVg1NVEyclBqSWZnekhMTkRjamJscE16TnRMaTJXYWxaREQ2Wno1dWgwdGlNVjZrblNmRFh0OXVBMDVlSTVweTFyRUlicUZMeVFVUmZtcEdMTnlEZWdjYWZ2b09qNnRiSHVRWDliQzd1anZ3KzNRVGEzeXJJMFJaT2kwbWlJNVdyRjZUbDRybEtZblNtdExITzJEWWREY1JlTjBwanFkYU13K1A5SXVKSVlTNUt6SEZ0bVJtNHYzMUwxYXVtdXF1bnU4YlM3N1JuTFpoakdIandnWXg4R0dYa2tCRmp5d1Z3QWNiQUVFZ2V1U056TUZjRUJjVUtDRTF4OHdiTGtFYmFSYmJ6TXlJdG0yajA5MDExVlhldmJjNDJNaFMvYUxWWHBkYjdNZkJGLy9OL3l2OHI0TFhQckpPQ0RLQmVrYkdlclZXMC8vNmQvK2VxZi93MVpxSC81aDY5Ly9aLytsYjQ0R1c5SDBhRnNEa2Y5Z0RUN3NaQ0NWVHhxVFZCMWJTZTd3N3ZUb1l5dnpwOXEzYXVHblQvdWttbTQvL0x2WmZ1M2R3L0hlN2R1c2l5ck95MTZBNGRaVlkrYjVhdzZiNWxrVWlwM05hOFg5TjVuWG4vNC91azMvdTBiZlNmT0w4L0g0K2pOTDMxaDd1emYvZU0zZm5HaHZ4eVRyLzJPcUNaNi8vVlBUUGMrK3RaL2ZQdWRkeTRyeHhhbGVQQkVmZlNJZk82MUkrR1dwaTI1R0p4Y2R5Zm5IZWRGTVkyVmlEbzkwRmFPOTVxOUkxcmt3K2YyeHJJUTU2Y2IxUHk5WFlZeW9JTEVTVGFic1IvLzhsZnZQYW11RjB6ckpKV1o5RThadUMzSklsYU9oeW9OZE9ySWN6ZUhTUUQ3MHkycmxnVEJaOTc4bzVkKy80OWJPN0hqbzRRay8vejNmMHNUSHRlbWVTRmtyOS9hSHJQTlh0QnREd0lERXUxOFM0bDRTOTI2UHc0eXNWaVhZSGRyZGs0MnN1cWVSTEpVbmJPdEdJd25MMzM2bGVjK2RvL3ZITWw0QzRXUTB1N1NubkpiajRDVjFXSnRUcy9PVG5JZURVUzRXU0lUQ1dkMGF6eFFqUHpnMGZMblA2OG12YnQvWTBINGZHOW5tc3Zkbno5Y25WM281VnJ6a0l5MmcxRkJaTlNGM09pS0tSZVdLTitqeExsTmhNcTZRQnpTUVI2YjdyeWNWZXR6dDE1ZW5Ld1d4NWZBck16emNUb2NOTVplTDllUG5seGRyWTFKcFJQWmRwZ21JbkJ1UFlqYlNVQUhra1pCQmFVZHk1Q3o2dVoyR0ltWURYYnVmL2ExclU5OCtycU5FejRsdTBjeTNjNUlSb2VESkV5eXpmbHNSTXlyTjRvN0NUdWNVTzAwTnlKazV0N2R3VWVlRDlmVmNhbkorU3k0bnVNdDJybWtjWUVKNGE2VVVpaENEYmZOdUxCYkIvdUQzVnZaem1HK2RUc1pqR1EwQWhFdWx6K2ptOWs0RUtaYldkSnd2OW1hcnV1MmFmV3Q0WlFIN3NMV0FDYXB3R285RGVzMHo0aWQ2cDZqNWhDaTcxdlhsYTExVGtSQjNWUyttNFV6dmQrMFFadTJVN1lwMSszcVVuWmwzTlliclZVVnNpYU11eTVTYlFJTGRsMlc2MDZoeGlBYzJtTUNvYmUxU0VrNGlOa3d4N0tWbVF3VGpNbFpGN2FqRWIyNUt3OTNkKy9jK3pqZDNxbkVkaDlNczJKbm1PenBJR2Q1Sml3KzF6WDc0K2xYdi9yQzh6TDgxcjkvNytrdjYrZU9rbUhPOE9tWHMyNENMU1k2SW5JWGNtNzFlbFBYbEc1ME05ZUc1d01URHphTGExclp1bzFQVjNQK1lFRzY3NitYQm5JeHlFa29SeTVHcFZUczdzWjVIdVNTQmNKU2JoenRDeElzTHg1MnVsdzFTMlU2NTBKWVh2aitFeGhsSnNNZ3FhcVNNK0VzQXNieFBuUzRMbHNSeEwxbGRVV3RJVTFubC9EOEc3Y0ErazJqS0syMU1KUlpydGUrZzRqRnZ4QU9PZUJFdUlpelljUXlFUlNvaDVpTEJhZEljaUZRKzFES1FGZ3BRc1pkMVhRZHMvaHZjN1h1UkJodERZV2daYk1Kak9pdEZvekhzODN5ODIrKzhOZGYvdGoxN0hpeS9kbzMvK3RuSngrZXU2NFp3UzlYaTZ0NW9Hd016UTVwSHdUNEdNSmN2eGVHaVhHc2JLdktSdGF3T0ZSaGhLcXNyTXBSTXJselAxekJ2MnRqKy83OHc1T0g3MzJBZ1NXU1Rnc1dJMTRSNDhLT1IzSXdUR1VzSTU0TnhCRDVwa3hyYkI2eDFGY0tOWUxCcnpkcVVYY1hhLy9YWnRQMmJVZWRKVlVuU21zYTdUY0tPNU9VbTE2Wm5nWnhiVjNEL1E3MGlCQkduQlEyQ3Jua05CVCsyWktBdUpqUkdGb2lZSHlScjVvNUN0UGZzYjRYZlFRcldEWFRQSC81cFUvdTM3cTVXQ3hka0dESjRsZ0dYTEF3aGR1Z3NNNFlHWUZMT21xNzVRZVhGNCtuZC9lKzhsZXZQdmpPMlpPZm5LNnZaOHNQKzZZV053NzNWTDlFdUFONDZ0NDU0aUpCQ3VhWVVqZXpSTXZncWxuRFdqZWJUbXNzTVpRekd1WFRzcTdUMFRnZHQ5V21YQzNCSG5TdVdOOW9TcXd4MWp3b0k2RTQ1NEVJZ3ppeXhDQ3huS1ZNKzI4OCtrN1hUYjlTZmVkNGJRSVNDdXZhWHB0T3FkNlNuampMOFp0eExqUXpHbDZHMHpRS3QwM0lyRXBDbW1leFlZWWlRQ0hncHhsZUFjbVc5dHJXV25QT0FrcXQwa1QzTWtKNmFjdnBaSGZyNXJUdzN6aVJJQnpmSUR6ZlByek4wMGxycUpSaDMxdGNUZmUyOWwvTWk2LzlXZkhSbHdwYnN4VmRWY0RabFRXZExKZmwrY1A1NDNldmlqRElNaGY2N2psaWpuY2RsVHdVVEVoSlU0SUY2bTBjckRiOVJlbFp4MnE4Ym1EYlJTcERHVE1jSXg0Y01va3RpekJqWnpCeXNyVEtOeVRTb3VyNmlvTlRHSTc2WGh3NDIxSVVxcFJ5RmdiRytFNHlZRVVLWllmYVI4eHZubXA3dnpVL3dMUlN3Z3h4T3ZJUDJZZTg2Z05KbVRUSzlvS05UZWNURXJ6ZFVXUWZiaHhhMzNXcFIzSTRiYlRxZ1pKUndRWUQ4K25mL28yRHZZRTVlUlFMVmhmRnpSYyt1YnQvUnlRVEVRK29LS2pJQWhtdHE0VzRXaTVPYVJlTzduQkJyOHRWMjNWMXRaYkNyMlM2NVY0ODJMMTVQNjVPUzlKVDFkUXRtQ21JMWd0QW9nMVppSnhjdEpBMU1oSnVmNXFNTXI3WmROYUpaVFM0bmpWNmFZbXNzVmJqb3FDazVscGhoazVRUlRGZE14SWNBbDBablhsT1lTQXpCQWVCeEcrQVRobkxlTmpxdmdHSis4NVhoR20vb3gwWWJsVW5hVUo5U3k0dEF1SEpwKzk3S0FKWUxWRWdQSkJhMDVpUVZ1Q2kzaitjNXhTT3FONmZhWi9sZGMvd2s4b296eWl5NTliUjBTdWZldm44dzUvRXFUbzZPcHliQVZhbDdxck5xZ1M4cCtORElRcHZVaVVWV25mWFRXK0ZNTDVkUU5tQktFRktXSjRrQ1JpSHRjcUdVUmJZSG1Oc3BIQkR5YkxWZkZXWE5lbGRyN25Ta2ZMYktQdE4xV1ZwT0p5RWJWc1BPakpNb3N1cmhuSWVwNVR4R3RjN2EyUVFoWkgwTzh1N05nMVlUbGxKYWQrUlFCdk1BK2NoK2s0aE1Gd3ozcWkyWnJhUEFGUmtDM09xVS9nY3ArSlFJSWQ2NStNSDVlbEI2c2IwZmc4NWNRSHYvSzUwUjBoWVdRVytzSXhhNm5yY1BPUkF1aWJXSzZ2UkJRc3d3c05iNUlWN3cxeHVWWnR1Zm5XVjB3MlMrODZ0ai9UOGFGV1d6RlVoVit2TEQ0Tnd4T01FaFRrSWtVeEdRL2pjdGwxbU9CUkV1a01TTlNEQUpJMlJhSnV5RVZSYlVhNTdWUytWYmxiRklBcUtFT2NRNVNCdTFQQXdTQk1XOEVDTGpLUkpSTmV0akZDbmpqWTFSRjRGdnRjWXRUMjFCT01HUnhvdjFwMEdkeFpTNklqVm5XdTZCcml6aEhoeThCbElOWGZDOXkvQWpNRk9BbzZCL2JvRkJuMjJEWjlpK2hRblAzTVRGc3dISmdXV2NUS0MxVnZYNFREQ0IveHJ1TWFRT2dMa2VWSWtabXRjYkV0eFl5ZCsrZFdEOWZKTWRXUlE1RkpHcnFYejVkeWxzOUhXN1NLTVY5V2FPZTNOSk83VDFSZzhnbVdIeFdoM2IxeGRmS2g2RjhtUU9XaEd3Rmc0Vzh3Qk41a21LZXljbGRxQ3FlbURzelB5ZERNWmhYa3N2QTQ2N2pnRVdBZXExWjFkekpzSU5VQ1dZdDJSSDRtMFlVZUp0cGcwOXlIamdJSHhqNE1GUkNFVUFBakNZb013cGtFRWJYYTRLQ0NOVXBaelloQVlCQWo0STRUQ0FnaWZKSDdPMWdmU041a2kzRGM3QU85YkZqREUydmtIOGtTbmdXUHJhVERnMXUrZ1ZWZ2FFR1VXSlZHWWpBZEJrU1oxTzR1ektPS0QyZVhqSnBoWDlYb0E5dHFzVjR1eWRJOTdteFpaYmpiTDYvbFZuSVhaME5RYjI1a0dHUjFPNU9pTFg1b2swcXhYcGdZWkJiR3pESExVTm43N0Y0aThxMnZkUTJPNUNPUndxMGdHY3RQV1phZTRZOVl5NUJiaHNDRU9CZGhxN2NyTzlRUWtZOEIrMXNEUCs3K0ZVcXdLRXdvSHRmYSswZ0psWFl2eVNmdk5WTkI2b0tmM3U0UEI4Y0FKNVNLRTIwQktJREpjU0RCN0QxOEJjb1krRUJ4SHhKbHZnNENBR21JUkc5OVF3OXRhU0tQdkRnRktjNUNnRUpUR0tFK2pwQmpuQkRvSUo3eS8zZFlMcmNyZmV1WGw3ZTNSZEd2aVRIMTJkc3hJSzFSNWZiNDhPVnZQTGs5ZFgrdFdQWHI0L25JeDMyeVdnenlGWFBPOWJIaTEybno4NCtPN3QzYm44eG1Ha3FZRHJTRlVObUNoSjF3aUxzK1dLTGk2VnRSTkl5S3pzMWRzYlJmNUtLNXNPZHQwd0dhOWRwMklTc2NyUjVYaGRkbER3Z0tSQ3BGdkZLYUp0WFlkTW9BS0pHOXZmQytENWJyMHpkNElFTWNWVUdOZ25iVG5ZMHU4ZjBLYU1HRUpPTkY1Tm1Nb1BVSFRPRzU5MHhHd3RJUDBJelQ2V2FRTVBJWlhTVURXTHczSENzRnhXU1N5Um5MRlpSODJ6aTlvbHFxRGcwUW1abWUvdUgxblA1S3VHSUF3SE5qV05TM0h5Rng0UGErYnpwUXd1blhYTnZyOCtIU3pXR1poTkNrS3Nkck1Ob1Q4NkczM3hjL3U1cVBUcnZPakNmd2RCQTFwRXRwZnZmdmc5SExSUWRiSUtoc1FHL0xydVM2SzRYQ1NrMER0M01ndmpydlRENjdWVlNWSGNUWk1SR1c2Tm1oQnIzMENDV2lNUWw3QjZJQmJLS0pDQW84Z3BBbE5mRGNEQzlLREpiSGVMamdRRWZjay9JeGZyRWNvbEJha2cydVZ6MDdRSTFDR3hHRzhWYjREUWlBbEFxeU1ocnZvVk05RDczZnJGZzVldWRncHFGRHJWMjVHM0NoaWYvakdwMTY1TC9Pa3FadWs2MVFZZ3pyRDBiaklVNWdpWjdZbWIzLy9od2IxcDVRMmdPT1c2MHFQaGx1cTdXQmJobW5heks3RTdXbit6bVg1Mzk5Njd5Lys1TzdXN3RhRGQ1OWdnQ0hqQTVuMldyMy8vZ2VMNVFZSzNURVV0QkVQNnlRdFlOM0Iyd2g4RnZzdnp1dkQ1bUJyL04zL3ZYejduZlBuRG5haXRjbjhsM1FtV201OGNVbzgyd2ptVXBsRUFzb09EdWJnS1NFeFFLT2dmWjZIQVNZQ2xQMDZhcDFYTDJRZllzSVJ1QlpBaGNGa3pQaXNZVVRFalNFMW5DaVh6UGZnd2dsdy84aGNCemVsZlphaGdFTk9VVlVwc1BzTE8vbUwrMk5vNnU1b2VEQXRvblFEb0FPYmVUN0trcEdEUkpUcTZkT1RXSVlxenEvWE04bkY3SEttbEN1S2tXODNsQTdhZW42NXVKb1VpZmpLRno1eStPUEw3N3o3K0FmZmYrK05OKzdFVWFuc2xTV2g2c2w4ZWQzMnphQVlnZlZuOHhXRWtuUHAyTE5TVm9kOUs2dWFyaDQ5M3RtZGR1dnJnM3VIcy96dS8vendCNUZ4b2FzQ29oUENjdjlJTk1Ycm1KbFJHcUd5aDJVS1FocktvR2ZBb0llVk53MWdOQnA0TzZxaG1WUnh6QmF4NEhCUFRkTTdHbXNZYXcwbVI0VDhKUUE5NnZBQXprcDNxQnFmdVZrTmc5YVFEbFlpZ2pUeUVMZWdJdnJTWjIvK3dXOU90N2VPeHZmdXhVbFNIaDhMc1p4TWg2ZzBUazlQTHMrdU5wdjExZFVWTG9BVDJKN3VMeGI2M2ZjZTMvQmJ3ZmxxWFY4dm4rUkpFa3Q2ZkRIclRDdjQvUEsxdTl0MjAzL3pQOS82Mk4zaXhzM3Q4OHQrT2EreVhNZzRPampjdTc1WUlwTU9iNDI2Vm5NV0dZSUNxSVREV1ZYTnFvUjFaazhlSFNkWmNHT2FOSHovUnovbFVVQmRhMnZuU21vdlZDMlVRRFVjY1J0V0pvQ01jZWdlanlTc2dQTnRqSkJqWUhLdmo4OTZPWUNxdkZ4eVlCSEVCUStKR0tITWhzUHl2WHk4YnFDQ3RyNWJFa0lNbzh1RUYwamZ1UVc4NXBXWitVWkEwRTBSMEhMdktILzlkMjhjanRaS1BiMDhLNVBoZ0JwVnlHUStuNy8xMW5mYnB0M2RuWlJsbWNBaXliQXBHMm8zQnpjUFZzdnUrT2tKWHNna1haeGRYcStiTEl2bGNCZ3FLZXF6MVlxWE42Zjc3ejVjZk8vYlAvM2NHd2VTN2s3eXpKZ1NvemR3R1lHT1U1U1VBdVZVbnVVWU9HYlExZ3BxWGd4U0JWRlQzVEJNblc1LzhmYi90VTJORXRzL0FzMWM2eCtSUXQwVmFrZFJ1UHBHR003N0hUQ1ZxMXRRRkFReVFBVUYxZVBRVDgvWitJR1g4UXlIbVQvekNRQU1rRVc4WFFKMFlGTTR6dVE4Z3VPeVJNTlljWitMQ0JUdlZBZjdSdUVaK21DNmRTQTVtMjY3Y203YklNNTNSTFU1Tzc3NjFXUTBXY3pkajMvMHk1UGo1ZjM3dCtNb2gzbENvQTBjTFJXUVBaUnV6ejEvYXpETVQwL09xazNqR0VxdVVEUDI2UGppOUVMOHZ3QURBRDRCQjM0Z09TNWRBQUFBQUVsRlRrU3VRbUNDXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFHUUFBQUJMQ0FJQUFBQUplclhnQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUF3OXBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU5TMWpNREUwSURjNUxqRTFNVFE0TVN3Z01qQXhNeTh3TXk4eE15MHhNam93T1RveE5TQWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZOekpEUVRGRE16UTRNVEkzTVRGRlFUbENORFZHTVRGQ09UUTVOREpCTlRBaUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNk56SkRRVEZETXpNNE1USTNNVEZGUVRsQ05EVkdNVEZDT1RRNU5ESkJOVEFpSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5ESUZkcGJtUnZkM01pUGlBOGVHMXdUVTA2UkdWeWFYWmxaRVp5YjIwZ2MzUlNaV1k2YVc1emRHRnVZMlZKUkQwaU5UUkRNRVJGTlRjNE9UWXhSVU01UkRZNVJqQkJPVGcxTTBZeVFUVkJOamtpSUhOMFVtVm1PbVJ2WTNWdFpXNTBTVVE5SWpVMFF6QkVSVFUzT0RrMk1VVkRPVVEyT1VZd1FUazROVE5HTWtFMVFUWTVJaTgrSUR3dmNtUm1Pa1JsYzJOeWFYQjBhVzl1UGlBOEwzSmtaanBTUkVZK0lEd3ZlRHA0YlhCdFpYUmhQaUE4UDNod1lXTnJaWFFnWlc1a1BTSnlJajgraFJzRXJ3QUFSOVJKUkVGVWVOcU12QWVjWEZkNU5uN3VQYmRPTHp1N3M3MzMxVXF5ZXJGa3lTb3VjcFViTmdZTUdBSUVRZ3Y1UXpDRUZreUFZQXdZTU4wT3hRVjNTNVpscTFpOXJxVFY5dDVuWnFlWDI4djNubG1Ia0MvazkvOUc4NU5HVSs0NTV5M1ArenluWENwQVkvU2ZEd29oeTdJTXlxWVFyZEZJdFMzYnBpajBmejlzeW9hL2FVd0xMTXR6RktJc0N0a1dzalRhMUJpS29tbmJzdUFMTEkwWm14Sm9HOVB3YmNUd05vdVJaVmdtWEJGZU95bUdaVVNIN1E1aHA4dk5NYnltSzVwSzgycHpnRzZwS0t1cHJhOXVhK3Vvckt5Q2huS1pRcjZRZzY1Z0docWdjbm41NkpIRFQvN3loK2xNd3V2eFFzYzVsblVFREJSSVkwRm5CRVFMakdaWXFteWJKckp0bTZacGlxR3hRR0hHb2huNE9sekp3aFNGTFlxMmJXVFlza0twQmFUbWtGS3dMY1hpRUhJNGFNelJ0bUVaS2lQTGRqNWhXUXJGMk1RZS84MGdWUEg1bDlkLzQyR1REeGpNc0N6TE1EU05NYklOdzFZd1dJMHFYb3o4akRJTVlrS2FoaEhhRk5oU3NTaWVZaGtLWStnZy9JZ0M4eUhLVkJXRG9rd1lJdmpBTXAyV3dScU1wV3JaYkM0NVB6K3ZLYWJUNmJSc2s2TGhEM25RNUVYeEw5S08vVzUvYkFxY1R2d2gwbUFzaXFNdHlsWlY4anZiL3M5dVd4WjQwU1JkZ25Dd2FSdnNTRmttTm5YZHRpaUdRWlFEZmtUcm1LRTBDejZFdGpDMFlrSFFGRnRBTmdNUFpJTEZMS3ZZc2dVOVFxUUJ1OWlJWGZ6elB4OWdBdkpMakhtV2czRmJ4UmpFRnMwU3cxRHdIM0NwcFppV1JvRUhvWFdPSVQ0MGRWdjBVaHhIMlJpYkNKTWZZSnMyS1VzekZWWEdER09iU05VdGxZTDRNMHhUMTNSVmxnb1FBaXpQMGlRRGloRnNzN1JkREJVd0Yvd0Eza0dZUE1Fd2xBV2pZVGl3cUFuaHBWQklneStZeFhHRGxmU2x1SUN1RTB2cjBJWUJiMXEyUWNHUE1hWnBrUkpZQ0NWYWxteGtFU3RnUklaRG15WVpFcUlnUG1qVGdwRVZyMk9UQ0RYQUJaUnQydTlHbHYwM2c2dDRMV2lVQTVkUXRFNnhKSnFoNHhSSlhoTWNweU9rSUZPSFM1T3JhSmoyY0JnellBQmJjRE5nYkJ0aHk2Uk5tMVpOVzFkWWl6STQzcUlSRGIwM3NLNGI4TkFJSklCanFLTC9vTHZRWVlaMEVud0RiOExvL2dzWUtCSW1jRFhUTWlDb2FPSnltMFZZTTB5am1BY2tpQ3lFRFVSQ1RxT2dWd2FZSGFMRWdBL0ErSkFvWkxEZ2VwNmxPSjRITjVzeWRNRTJDYUxZeFpac3hpcCtIY3dIc1dXUjBRSWdFVXVacEltaStmNUdGcEkvTk5pWFdJeWlTVnp6TEhpUkJvT1o0RFFEbktsQWFsSi8rWUZwV0xKaDh3N0lUVXJXQUx4SVNPZ0d0RUx3QkM0Q1QxV0ZPS2RFQ0VCVzBRMWRNMVRUVkV6d3BBbEdKZWtBMzhVMFMrSC9nZ2RpeFdMYWd4MkpWVXlJRjBUTEpFd2drbGpMWnNHUk5ray9HaUtjREF2Q2owUWFHWmxKc3NrMHlRQWc4Q0JjaWR0aFhKREVOb04wV3FkdEZYcW9rNXpnR09pR0JUa0lZUVdOV2NXQUlobXBVVXVnUlAwdlFVVStJcTFDZDRpejdTS01FSFNDRnhpc3JjR1RKakZQTEUvWjcySUdwU0lrNjRCUmxLWmFpS2MwVXpjQiswbU93cUJzVmRFQlVGbm9OT21LcVJxeXFpazZSSmhKb2d4YW9JdHhCUDRrM2dTcmtQNFZzUXVSOWdFQmtZNnBQRWViQmlOQTNsSThnUVd3Rm1KTUFIc1lwQUhtUWtXOElyMEYrNWtFM0VtLzM2MEFOc3NpRnQ3UXlPWGhmY3F3d2NUWXhyWmg4aGhLRlNZd29jUElhZHNzRmprSUxxTTRPdnAvc1JUNno4UWt6aTFpRmFKZ2tKQzhVRHlnU3liQmRadFl6dm9ydkNONWdDaXBlRmtEVUVrQmtBSExFajlETXFOaTJrdWFpcTJDQTV2Z050V1VOVjJDTkRRc1lqQUcyMHRBV1FSVGtqL3drVldNRUhpRDREVjB3c1o4bnVaa2loZmhpVXlMMWhHSGtRbndER1ZRWmd5VmhCK0NSTGFMNDZRSkhnR3dGOE9NeHNYZXduK2g1Nnh0c1JEYXBnb09vTUg2TUJZR2svUmxWTUIvQUZSaXpTSmtMY1hvLzhPREpDSXhBd0U3Z2lBbVI3eG55elJ4V2hGaC9sc3hYYXE0eExLQXd3UVFEWnQ0SG5pSERTaEhFVmRqeERLYTZTTDVaSmhnRDVKWjVDdWtYSkFNQXZjRFZHQk1rSjY4Lys1MUtZTHVsTTNhRkZpS2dkelBJc3pEdHcwd01XWVptd1NialEyTDRpaUpleGRaaXBXMW1CTUFuUVRrTE5JS1hGMkhVR0pzeEZMZ01vVzFBVkJOQStvMk9BUXlFNHhGT21JV2ZiU1VmLysvcGxwQ2ZkTXVBZ1ltUlp3VUxKTldMWWI4SDlxVWtmVnVNZjF2ZEFOWUE3RUlWRU9CNUp0T3FqQXdMNUxMNEM0U3k2VHlnSVBCUmxEK3VLVTJpbUZwTDZVejlTNDMrV3YwdElzK1E3eGxlM1FheTdhaEErclowQXBtNFRJYTFFY1l0UUhEQnd6Z0FMMWczQllaTExFUnVScFRoQXFBTkNoV3JNbGlnek10U0Qxc2FicHA2Q1FDQ2FZUjJ4SlAyTVJRcEZucS84RlM2RCsvQ2J3QkhNTUFXeUJWbkNRRFlKNEZMUUdZRjBucC8wUTZ4SkQ4Tk1tUUxkSVNKS0pwRVh5MWlKY2hzUUJuSUp1S1JtUElLTUFSUzlXUWxEZjZMOGFpL3N0bTlydTFyc2dkZU1ObThnVFhMQVVCd0RBOEdBQlNDa2FKSkFHSUt3a2dDWksrQ0hFMEE5VmxLVnhKR0FOaGRqQU1ienAwblFaS29TdTJvc0g3cEVYVk1pU04wblVnSlNLTHlEaHREWGlsYmk4RjZWOWhrLzNYL1BRdnBnVEFnWXFEeUNCdzBmU0VGVm9rUUFEYS93YmZXRXBKWU1ETVVwMGxPVXdSdWxMOFlqR2xTSTJBbWtFVksrMFNWYUFJVEJVRHN0amVrcjJXV0RSQmRqSld0a2doaU9IZ0ZXOGdGa2dGWVo4MDhEVlNaQUMwV0p0aGFSRThBZURJSTRhMVRJWUdNQ084RWhjcGhrMkQ3WURHUW81eUZFc3poa0hiaW1tblFGRGtiVUsvc0ZubFFJMFZtT0ZGR3RJZExpdG8yRkNBa2kzQmdWWGt4NlRPRUR3czVqZkpQT2gvTVdnb0VpT2tHaE9veEVXYVEweEZ5cnhwL20rbGdiQlZpMXlac0N4aVhxbzRicXRvM0NJS2dMdHBtbVdJRlFBZElEVjFDN0FOTUxBWXJaQlFNQTdvRXVFVGhxR0NldzN5eVZKWExFSzRNYkIzZytBbzZSVDBWRGVMbFZPeFdRTUxER1Z4RnNlRFhRbC9BNktEN1dMQklHNGt0dWFLR1EvVUtpVXJ5VVdOVWEwR1Ayb3VvYTZwOGJSWEd4VmxtT0djSkZhQkZHcVF5WkFFRENLMUV6TGJ4QVEyQUNTaGFDRENjeUI5TlIzS0ZsalRSRVdiRlQwS2ZpemlOUlE1VXIzMDRxZC9tM0JZaEUvYWpHbi9aMGJCU01pUWJPSmVpN0F6Q0hnVjZiRllJa1dwVXRiSkN3SW5ZTXdLZ2hjaWdoUjRHRkd4VVlnejBTR20wOEMyWmMzUWdJR0FGQlgwZ3FkSTU4R1ZYRkdQUW9NNlZHb0lIdGxtczhqSlUxaWtETllDamtBRVZESDd3Y29hc2xVZDVTMkRNZktzWnJTNWpQVXQ1c3Fxd0twbXhpSFFvbXNGaFRLVVBVS1Z0d2lNQTFvM05BbUI1TkJBcVVIdE55QjhTWGl6Z0RPUU1DQTdTWWJSa2c2YWt4QXMrTXpoRkoyaXd5bVFOQVl6RlF4VlV1VjhOcTlEMFViVS8rUVpKRTRCT0Z5SWM5allSZHNjUkllVnp5TWpnMUMrT01Rd3FpOXI3aWp2YXIvdTFzcnFjRnQxdUx1MlBPano4eHozTjYyZnp1UnkyVXcybTExTUpCS3hSSEptTmpOOE5kbmJFeCtmV0Z4WVRDSlVLTFlPRjNZczFVdEl0aEphRDl1Nm56WmNxT0FFVmdGQ0Mya2E4cGlvMVlVYW5jNHk3S2wyaHhzRHRJL1BpbzQybHpka21RT1MzYXpvalhyK09NTnlCazNRQi9RWGtWSGdjMU10aW5GQ3E2SEdVWGhKK1lBa29BeE1OSCt4ekFIeEJ3TEU2Q3BORzRTS0FuZlVWRlUxL3NwU3hieXk2U0lWZXJmR0EzRXhUVG1MckRUaE9ZNHkxTkpjMVZ6YnZXYjUrcWI2N3RMbU5UWERUNWIwUHVuZGRoT3FxWW1semVQOWM3WjhoVFZWU1NwQTNoV3ZRaWcveTNKT2h5c1lDRGljNEMreEs5enBXZXVrQlhZSjQzUkZTczNOUlVaSEp3YXVYRGwyc3UvazJkRklSRUkyWjlwQzFHSmRTQlBwaktITEZ2SzVVTDJEYmF1cFcrUEFEWUphNWlsM3NVN0Q4Z0FhTVh3ZUN3NEZoeEF0Q2xTQkZ6TnBaaDFWdjV3bFdZQ0pTdElWR0RTR2ZBTitRZWk4UmZFbW9ZdUVTTkVHMGZFSXhBcXRTWVQ4OEN6amNJREFaV2lHaUhmRnNMSUZCWmhSMFRwa1VGQW1nZXRoVW9JSVh3ZXl1dlNvN3c2dlhyMysyaTAzMURkMEJJT2xHenBhWlJPSkVBQzVIdlRreldoeVFaV0JkcVB4QlBwOXF2WVZzMk1rSGluRFJrRGt3VWlDMDhWeGdBMllZMWdlNEFkVER0SGhBSnM1blc2UHgrUDNlUVBCVURoVVcxTWJMQXVKQXM4ek5DWGxaL3I3emgwNGNQbk5RNWN2bnhzcnlPNWExTlJWMjlrUzZQU2t3bzdTcXRxN3lrcHJwT2hoT2IwZ3VqMWdpMncrRDRnQ0xxRVlUclg4dkwvRnlSYXlxUmhWQThZcXlrd2k1UXd5MzJRQWtWWUlRd05od0FCWUdhVE1rMGtxaklnNjFtbWxRSVFPVkJKUkFOSkhabWpnMTJBb1dTTVVvSWpWRnBqU3hRTjdzUXNGU3ltYUtWd1QzbmJkem5YcnRsWlYxY0tQNUlKNS90S3BEMzcwK3VZcTMvalFyMFBLalArNVovVUxLTDFobDRjYkZhYkhTZFcwNkxocjh4L01wajlPUWFvbFd6MHUwZVBtUU96U3RNdmhGZ1FSZXViMStNdktLbjNCVUdsbFJhaTB6T3ZpVlNXZHorWHlrZ3hKQ2xLUjh6Z3JxaXVySzZyOEltY3E4bER2MmN4MFQ4Z1JEQU1hWmk5cHhqeGlnNHA3dmNVSlRMNkhMWXd6UEF2NG9HVFN1dVhEM2dxc3orbzR6UGsyV3NZWVZiMk16QTFCQ1lQYVE4RFdJRVRNQUxTSHdtV1M1TU5FTUpPcUJUa1BvbFRUS0FsMFNMSGFBNmJ5SElGSk1yVkM5QmRWSkZnMmdBelAyM0tCS1B1eVV2ZmFkWnVYTFZ0VFU5ZkVZbTUrZm5LZ3IyOW1lbVowYlBHdUJ6YzgvdDM3cC92L1BiZ3c2cHdZMW41aUpidldpbDk3elBVdnU3Q1NOeldBQnd0QnRYR1Y5VHRibjNhMUhyZzB6V1NrNm5JbkJEclB1Zk1GU2RHVWt0SXluejlRRXFvSWxKYlUxTlIyZDNZMk5sZjhOV21abko0ZG41ek1wakxBZDBTbnE3YXF0cVdwbGhBUFRjdU85cHFKSzJ6dXFtN1FlY2NLUnZTTFNyK2h6SXNzcGNocFdUWm92aHdqVGk1a2Rkcmw5RlJUdGEwMFp1aGlOYUlBY1V3aVBhamlhd3lHbzhub1NVbGZJdVFRVVhCZFJiYUljU2xpU3BZUWVJZ2tpZ2huZ2tzUWpVQjlTVGRYZHJkdXUvNm01cFp1TU8zMDFPVFl5R2dxazRWQmxnVEtPY1k3SDUvNHl2ZnFWamRGVWpOWmZLTFUrL3dQcDE1QjFzdlBWdFppNis2OWZBV3JTUnlqYXRobjBWeXh2TGF2ZjZwNnhYT256a2ZpZkltcnhNM2lRS2pjSHdoUFRZMEZTaUFGQTE2Znp5R0tMcmMzSEs2cXJhc0pCTnhPbCtCd0VNNjhaRFpOVTY5Y3VYcjZ6UG5abVptYXV2b3QxMS9YMWR3STc2c1RQZnJvSVVWWjFOZ0sxbE5CNlJKdnptRTZLMHNwWGNwWWRpbUY2elUxU3RzcVZkZkkwVmdubXA2bTlLSU5scVlLeUNTeERrK0RVTVlpcXk2S0p4dVlUcEhqa2xrS29Fc0NtUTRobnhXWmpnWGxFcHJmdUdINVRUZmU3dytFSWd2elV4UGpJTnFhV2xmVzFyUTZSRTh5a1V3bG81TmpDd09qYjMzbkoxM2Q5UjJXc01uVU00T090ZUxkOTdUKzRIUEtyZXRvY21uZVVsa3pYUkFFSkpZejJBOFlabVZ2RHMvdDliMTFvUHhuQngyRGZZTlAvTnVuUC9yd1ExLzkyaVBIajAxMWRUVFZORFEwdDdhM2QzWldWUVJGNXQxQ25Fcm1WVlhqQlE1S2s4dmx4TVhhQXhuOTBndjdydlJlZG51Y203ZHYyYjV0T3pBc2MrS054TUFSbHZGVFlyV2hPNXpzSW1XUDYxSldWMlhENEMycVJzZCtIUFJEdlFOK0FEUVgwb3JpaWxNaFM0U1lSSXkxcENqZWxhekFWeXlMQ0JhYThEaWFCOUtNS1JiVEhJdDB3eXlZcUxPbDZVTWYvT2ptemJ2ajhVVFBwU3NzNTl1OTg4RmI3bnlvcTNzTlJZdFEzd0ZOMUh3K25wclljVVAzRGR2dmREaDNRMWpycjM5ZDFSYzgzLzZCWUdTMW9hdEdLbUpHVGZDMFVaeGxKRk1GRk1zd2xISXVpd2VkMXd6RnlzcFMvaTBkZSsrdERBY09YcDRjL3UxUGU2UEo0WXNYenB3N2ZmTFUyZE5YK3ZwbUYrYUJWekNZQ1pjRzNXNVJGS0VlY0F2UnhQVHNZanFaQ2daS3JsbTVNdWd2R3hrWk9YVHdqVE1uejZpSXJiOW1wN2QxTFVwRnRmZ2dKVHB0c1o2aGdjYnFRSVJwV2pWTm5XTGNWR2N0bVpXZ09SRG9SUjVONWpGSTRFQmRBOFFoczE5RStpK3BQZG95Z0QxRFVTUWFIZWdWU0hxS0o2K1RPVUppSHZqQSszZnQyanM0TW5qaC9MbWF5cFlONjI4VTNJSEZ4VWcwRnROVUdTbzlKM0NSK2FsRGJ4N28zbXorNVB0UEl5UWFhREh4cVd1REI4ZVpXd0phYlUzQjhqRWRLOVNuZjZleERXcTZRQjhlUkJLb1BNUzV5TFNvMjQyaFh1Y21qZkpLaEY3WWpkYXVIRkdmT250a3k4VjN0dXQwcEpDSXBRdnkzTmpNWW1RcVY4aWFGZ3FGU2x2YjIxYXZXYjFoL2JwcmxuY0h2RjRZdzl4ODR0elpjN0hJUE1kQVN0RVE1ejJYTHk4c0xOVFhOOTMzdm9lMmJWcU9rdjM1S3kvUllpM3JXNlVaY1N0MUJSVm1rQ1dScWJUbHRTeFJLMlMrQUJkbElUQmJERHBDVmtGMEw0RVhXYXl4aWhZa2tHWVFrVUNzQkhxTnR6VFpUQnRvN2ZMT3YvdmtQNXBZUEhqZ1ZTa3Z0N1d1QktUb3ZYcXh0Kzg4dG5GbjU2cUttanJOVk9ZWEppWW1yZzZPakxVM29QT25YM1VFOW1SUGY3bXcrVnVCYmdFWEFFTk52UTFSdGNBaDNBWDdldG1XeDVsWmorMFZFV3VldUVSZnlvZ2h4SWNSUFlGS01CNjl4dXg1NEtiQjB5Y3JTNjdmdFBPZm9vbUl0NmE2TURsUUtQRkVUTDg4UHFrVWdLWE9YcjV5K1dyZkVCQ1hpc3F5cnE2dWRXdlh3QiszS3pnOE5ERFFlem05RUFWQnB3SUJ0NjNaMmRsTUlyVjF4L1h2ZS9oakRSVitZL0RWZkZvUlFxdDBtdVZTSjlsTUQxRXlLOEJZUkFPeVJZbG5GUVVxQXNVbEc0UU5tQnFaRWdCakdUb0R4QjBxbmtVb0ZPSUprVFZTcXUzajBmM3YvN3NkZSs3dHZYcnB3TDRYM2J6RElUckhSdnI3aGdhQU9kVTFOWlNWVnBqWVNxUmkwWVdwZkY0WEhVeGp5K3JPaXRKUGY2T2hvL1A2K1YwZjRvN0g3QWF2MFpkeEJGanZKc3gyNHR4Wm5EK1V6U0UwL3UyZDlhMnJBcGRIWjE5K1BuY0owUlVsZ1pDelVPSHNPOTUvTG9md2ptNGhaYlNVcWF0Vk94TTM5QlhYK09wS083cGRjNFo3cEd5UG0yZklrcE9GSFNLYW41dDk1NTBUeDA0Y0h4MGQ1WG11dXh0cVpyZlA1OU55NmR4aUlsOG9xTWhrR0ZaUnBjbXBTYS9mLzlGUC9lT2R0K3hTNW52VTJjdTBvOUVWYk5iakoramtlV3B0Z3doMDBRQXJZZU12M0J2c0FnbFkwSUdtVXlhSVdUS1JTdVErbVVjRnBjOHdxcXFEbUxpbXVlNnpqenhXVWxINTFHOStPbmpsVXRBcHhLSnpFeE5UY0oyNjJyRFBWd2FkS0VpcFRENmptWFJsV2UzR0RadHYzSE43V2N2cVZKWUt0cjJSLytWRHJzK29GUjFjd2NEWmFjM0xJazhKN3lpbkI0WlVTYk1jeUdhcWF1Y1drdTZWTld4emM2em42SmJYbnAyOE9ETXhrNUVTRjVmZDhQNWxLMWI5NGh1ZkNISFBMTHZrVGgzU09iZGRIZzZrTGs5YjFhaW1QNXVNYWJHRnlHSXl3d1FDSGt3M1ZZWDlQcy9nd05EcnIrM2JmMkEveEJISGlSVVZGY0ZnQUpCWGt4VWRhanhRUjVaT0xVWWpDd3QzUFBDUnIvL0xQNEVReTF4OGlRUENWYm5DaWwybU5yYTRMYUtQTEowc3FWRkxFMjBRV2FwaGF5U21LQVVJcWthbWJvc1lUeHUybWJPUUM2RWI3N3oxVTUvOTJtSjA4U2MvL1c0cXRvQU5Pelk3Sjh0NWZ6RGc4YnRNcEdPV3kyczZ6d3BOVGQyN2J0cXorNFk5b3NONzVzeUpnU01Ibk5vYnQvN3p2YU1mMzg4OGQ3UytuY3ZUanVTVXdoaXFBMFBWUW9NeWtVTkJCek5YMExRNjk1MUgveHl1MlRseDVSODkzWXFDd2k2MEpZQ3VuWnY5L1F1UC9XVFBJM3NtZmpZMDljMW5YSG5WVjk5UzMxUS9kT0tvSkNuWFB2c2Y0YnNmV1BMOGxmUEhoL09hSXJxOU5OdFpWOVVRS29FM1R4dy9jZXpZcVZNblQ0RzJoQW9pOHB6TEtSYlRoc3lkNURPWitjakNUYmZmODYzdi9DdEhvOExFY1RzcFlSRHpOSmxtczNpb2V4ckFFeEZ6WkIyanVNaERBYzBFZVEvVmp5SXJRaEJXRXNRWVFwMU5kWGZjZWYrZXZlOGZtaGo3eFJPUEZ1SnhRMUhuRmhjNWxpbXRxalJ0S1pWYkJQRDNpdUd1bGxWN2IzL1AzdnR1QnlINzZvdXYvdWlIM3psODlNUlRkZWk5ajl3N0U1UnNhMGFHNnE2Qzlzc3ZxZ2F3amxJYUVKN2hPVW9FcVdtWWt3aFYzRk5lVm5NVUE2RU0zL3pDRHoreGFzMmFVeWRmS1dYYzlUYzk1RjkxMC9sZlB0LzN5RnlKcmdaNHBMTHNGZHZ5ZmVtTFB0cDk1QisrdUdwNnNJeTJWRm9JUGZaWTUvcjFxWFhyejFHT1g3NHFzK1dWdDk2OGU5UG1UZkNjbjQrZWhQcDU1bHhQVDgvRWJOVG5jYmdjQWhSOVg2QUVJUHpGWjM0WGo4NCsrdTgvS3F2ZnJMaW5sZWdRdGJVcldGenJzQXhOTHlpNmFtQ3lhbHNzZ0FEdFpJRURZUTFBUVlQYWlLb0N2azFidHE3ZGRIMzc4azNqb3dOL2Z2YTN5WGlVTXRsY01tRVlPWXFoWFFFL3c5Qzh5TmMzZGwrN1lkdjdQL3hCZ0l3bmYvbnpuei8yN3oxOXcrRFNqMTI3L0ltdjNhK0ZOcHo0M2c4enA0OXhFNHZlSUJJNFBwNHlZNUlWeEtoVXNCVndwbzU5REJyTDY4ZnIwY2JIMEgwMzNYN2haNzVMMy82VGo3SFZwRDJkMXg1NDZtNldYLy9qdlo4RDVGalpIQTRvY1QxcFRCUlErY2MvVWI3OTV1bmYvckx4L090c1JBWGdjNUc1R3VSQnFMWWhtRzlyM0cvU2g3M1ZjdnV5KzIrN2ZlZktaZEFsWFRjdlg3NjZiOSsrQTIrOFBqczdYVmRUR3k0dEE4UlppTTJNakZ5NTV6MFBQLzc0NDJSYXhqWnhZNmtMcEMvUUI3TDJqMnhJUnQwa2k0L28zYVVzTXR1YlVTMG5TMjFlditubTIrNnBiZXdvQ1ZVVjVOd3JML3h4Y1c0R1V5NlFRenB3TE5wdWJPMVl2MzU3VS9QeWhvYXVoeDcraHp0dTMvNzJrWU1mZk9DdUozNzZ5OFJpd2dHVyttckRkeDc1T1BKdW5QbnFWekovMkVlSmJveHREanJCa3lWYVJTWlRvUTRHQ1E2Y0xsalladmhLcCt6R2d6K2pMaDZlRnBQUkRWNVU1OHBCeW5ROTltMWg0ZUtSRC80aWkxQTV4WlJ1M2E0NWJEdVZBTm1veUVxcXR5OW5tUFgxbnZ4TU5LcGJDczhxUEJCRVpNVmxibVJ1ZVdSMnM3bW9EUGIrK3MwalBZbnN5czQydDlOUlVSSGV1dlhhcnM2dWJDWi83dnpGZERJZERwZTUzUzVBNnJHUmticUc1dWJtSnVCWHVEWHNJNHNWeFZVNVV1TElLckpONWlVSkZTU0FsVkZSUTBYdzlyMFBiTjV4cTQ0d3g0dkFYL2J2ZTJhbzc2TGJWY2J4cnBtWlFjd3h0OTF6MzNYYmJnQWlWOXZROFA0UGZCU3oxaGUvOFBIUGZ1YnppYmxJUzhCZHhwUzBMT04rK29lVmJyMHovdE0zOUJmL25NZGdKTXlZTm1PcFpCMnp1NXRMWnFFdUFkc0QvcFBWN2F4bHN6NjNwaXFSbUJvcGFPMGZLdmZ6ak51d1lnT0YwYmd2c3VBRGpWbHdCMVcxVUx0bVhXRGxzcmtqcHhqYUROWjM0Y1pPZlA3SWhtMUpKWXVHRnJRVVVHNmJWZ0NyV2JLQlJMSW9QcGJma00rczFsS1A5Vng0K3RESjJrQ2dxYVVaaGw5VlZYbkxyWHZhMnRyT25qM2IwM09wcnE2MnJMdzhrOHBjUEgxdTAzVmJBbjQvYnEvd1VrdkxKTVYvNk9MVHRMRnBvMHpPQW9lc1dMRnM1NTY3VzdyV1VSU3JLV3B6UzlQbHl4ZU9ISHJUNXcwNVhaVWpZejFWTldXZis4Slh1N3RXam95TXQ3WjN2UGU5dDc1ejdKMFAzWFg5b2NNbkczeU8xdXBxZ0FLbjRIRTNlbHU4NWE1aFRqNStESitiaTJ3dE53V0xIczNRSE1YeVBPOUNrTXhLM3A0MlVVYTJIQXhqUW5uSlNGeU5mMUt6WFQ1cTB5Y0tmY09VY3RReE9KbzlPTlEvMFhkMTA5ZHExMzNSSFV0UWN3ZEg2eHdaVGs4Z2pjLzYvU1BuVHRmUHpGYVhVTTZ1NnY2ejhYa2JmRTlXRlJXeTlJQVUyOWI4THAyaXl1TnlqWWhlVE9XZmZXMWZPcDNidW5WcmtUVWhDS0xiN3JoOWFucDYvNEUzR3VvYWFtdHFCZ2NIcG1abWJybjFGdHhWNlM0dU9SVG4wSXNLa0M1T3NCY0tpdFBqdUc3SGp1N2xHNE9sclF3bnpNOVBYYnQ1SzBpSG56eng3eHdybHBlMWo0NWRyYTRLUGZLMWZ5c3Jyeng1OG5SMzk3STc3dHoxeEE5LzlybUg3MDRtQ2swaGJ6aFVoazNrY2pwTko1dVhtYzF4VkVGbkJWbkpYSnl4UC9kUjBTUG9KMGRNbmlFN1BlSXB2YlVta2JWTFAvVXh0cmwwNU1JQVN6WTJNSnhUbU1Jb0l4V1czWTR2RGpyNlhvd21uSGpWTjd1di8wZFJNZWFpMnFMdENnL3NtNU5uNW0yREsxakNwZUZSSzVzVk9jNk0ybS9ONnpHRjV5d3JRMlFiMlgxUklPdlFaRDFEMXF3TVpmc0xXbzlOWmR5T3Z1UEhyd3dPYjkxK1BlUTRJdnVOSExmZGZtdWhrSC90dGRjNnU3b0Qvc0RGQ3hlcmE2dHhWMDJ3cVBxSUJDd3VyUUJnMFlxa3VEeStWUnUzdFhXdUQ1UlVlZnpCZUN5Q3NYWDNmWHRmZk9tbHM4ZFB0N1d1R2g0YktLOXlQLzZqWDBVaThULzk0WStiTjJ6ZXUzZlhQMy9wa1c5KytaOUtNS3FzQ1BFc0QyREdNNXpGNFhPalk4NkM4WENyQnpzRjYvTHMvR1RjZDg5dGJEZ1lmZkVkeHJZNHpTb0p1K2Q5QWYvSDc5cjF6OTl4YmFsNDdkLytBeFgzY3VtSkFsbmZibXRRc1AvdGx4UHczZTFQN3Ayb1ZOcGJ6SmtqenNYSjdwblhKK1dvY2xGRG1vemltTlpVTFFURDlYa1hOUHFMQzZsVk8zZTJoa3A2cHFjZ3RLQnNGVWh3MlN4d2F3cWx5TklHTTYrb3c2cmM2V2I3TDE5NDYvalJyVGZjNUhVNmx6akh0bTNiRkZWNzlkVjk2OWV0VjNPRjhkRVJ2S3pHVzF5L3RKY1dJUWcvMElCbk96dFhyZy9YZCtpR0ZTcXR0R3p6OHFYemE5YXVCQlgwMkdNL2FtdFpHWTFFL0NIMlowLytOaDdQUHZPblAyelpzdm1CQjI5LzRva252L0hGTDlRNCtiSlFHWFJOeVVzYVJmWVBqVTVPeFdUMUJwLzN0bTByTkozS1BYczA2eEdERHo4VWplVWpyNzd0czVHUHhZNUZ4ZG5hRmZqSWc0em41WkQ3aHNYRmsxZDY0eTByMXFmVWJGSXdGV2ZGZ2ZPTzZGVHMxZyt0a0wzT2w1ODVYeDVCSmFQZUZuZFpXR2FGbFJ0THlpcTlwV3piRis0djh3UXl2Y09LTEZjOStORkRZMk9Ua1dpRm5GL01aTWdxYkhISlRpUHJxV1JIVzk1Q0dhajNOSDFHMFhSVkNndlV3c2o0cWROdjdManRQcWNvTHRscjgrYk40eFBqVnk1ZGJxNXZTQ2NTTkNhN3k1WldNZDgxR2N1aHN1cUdZQVZnSG9DVWRyWDN3bHR2dmh4ZG5Pdm9iSHY5dFFOUWJuUlRrOVQwNHovK2NVTjl4ZGxUWjlhdFgvdkJEOTMzeXV2Ny91a1RINjBSc2QvcmwvSlNMcDJ4bmVJY1JaK2ZYa2hycGg4S2ZKVkgyTEVUSVdkQlJ2VlBQRmxhVVdFZVBtSkQyd0xyS2hISmtnMWsvcnc2K09jWHA4OStSbDljQ0ZiVWlLM0wrd1N4eitFNGU3NW5lUGpzUE5KZkhKNFk3M2xsKythNlNzYzYrOWh3NXRuRFRxWnkrVzBmdXVQei8ySms3ZTRidDYvNTJtY2FQL1lQemcxYkcrdjl2OTlVQVJsK0tLUG9OSldIZENPMW5zeU1aeERLbWtneTdRaEZKbEE4aUpreVVGclZ3MEYrOXRUVkwzNzhmWnI5WDR2RS8vYmQ3N2g4bnRuSWdodDAvTEs2QUthTDJFNDJITm1hcG5wY3psQmxweXRZNTNaNXEycnFWRVBMWlF0MzNISHI2clVybi9qSmt4aHg4VVRzbjcvOGhjMmIxbjMzdTArWXB2M0pUMzRJZVBEZE8zZjRLY1BuODh2WlpDWW5SVUFWWWU1OVpZN05UVUhPQ1RMTXVtK0Z0L25XMjVVWDlrbFhKMzNmK0ladzZBZXBaMTZhelRrQ2pPWDJtbndkd2tabVp1ajAyRURpbGMrZlZLYXNobzF0djNydW1aRmNQcHRHTTVTZEE3cGN4YTcrcFBONkgxTnR0TnZwcnNMNEhGdFdyZlQxUmcvOHVmL0F5L1BqNHdZU3B0NCtoeExTeGgwMytGWjJ0TFo2UHZUZ0NxNnRlLzhiSjBBOEFYZHhNQ3d1VHJoQVpCZ1VsYWFZTkdWUElEUnJRMGxCa0VDaDhwcnh2Z0VWS055R2pYOVp3Uk9kem4ydjd3dVhsNU1kaVF5SVBVeGJHQUZkWU1pV0VZRnplVnh1TUtpdnByYU9Gd1dBOHkyYnJ3VTlOVDgvUzFuTWxxMmJici9qNWorL3NxK3Z2Ly8yVzI3QkdEM3k1WCttWkNsY1ZyWXdPNTlWamU3ZDE0Zkh4Ny9RN3IwQnhFa2swb2V3elBoZE1qZjZteGZwRXlmRklKSi8vR2szZmNWZmlhaEoyUlRBL2lqQ2lET0x4c2o1a2F6SEl5QlVnNHpHZEVvVGhBa2dMMGlUVUhGUFhBNDNIck56K3hKOTg2ZEMvcU0xYmxwSXpzZWphWkFCS2tKK1JKLyt3YS9rNHNJWGMvajE2ejcxQlc1NUkvdml4M2R6enBOdTltcE9BeWp5MEZpd2pRSWhTV1NyUTk2MGs1U3RGOWVqQUI5VURQRmxWRlhVSC8venMvZmMvMEJGdUh6SlhqZmVjTU9oQTI5TmpJL2oxaEFQeGx2YVJXZUNTZ1pod2dtQnl0Yktxa2F5KzA3WFlwRm9ORHEvOWJwTi9YMEQrL2Z0aDNSLzlORnYrRU9oUC8zeDViSlE2Y01QUDNEZ3JZUGYvK2EzVzhMaHhmbnBtS3gvNml2Zk1qblhGbXZob1JWVlE4djNqTVpFNitCYlZTaDd1V2ZoVDhjdmlwN2dpdTFlM0h2WmpoZXlnWEJFOFRtTlF0YkNaMGIxM2dRaDNFaFZ5eEZkb1d2bDJZVnhqK3RNVHRYSmJoMHlHOXNzMHl2bVhJeW1sVXJwaWtxbGN2dHl2NWtzQytnaUl3bzZuVFdNc0pPdFhyNlNjUWx6czVIK0kyKzdubm14ZkU1emw2S3RIOWd6TUp3ZlNtWWNsSmsxckhSeDk0dHFVemxrcFNncWFWbGVuMWRnc0tGb0ZzdndEa0ZOSnAzQmtoV3IxLzVsMXRQcGRCNSs2eEJ0a3RRekM3S2R6S05FVG1Zb3d3bVVWOU5Zam5jNklYZ1J4L0dZYkxtalVzbWtWQ2lzWExHOG83UDk1SW5MSU42dXVXWTVHUG4zdjNtNnVhd0s2RVltci8zanR4OE50N1VOUHYza0poZWV5c3YybGJlOHpJSytaclhTM0ZHMUlnUWhjOVFRQjgwV3U4UTVlaDVwbXg2cXZIZnZSRXE3T3FmSXVoNm1xQ3BFZHlEY3dDS2ZRSVhyUXp2TC9XU2JIMW5mdDV3VTFjNWgyc0hVZWF6YVBXMmQzLzhOTXpxTnRuVlgzTnJSWG90Y2xBci9ORit6Zk5zWC9yL2JuM3p4UGZ2ZTJmejRFK1BWZFlmbjBNeUxzcWMvOGNGNkw5RDlTY091dXZPZTkvLzJEMXh6eDdCbEZTZ3NJYkpsc3BZMUhGTEJJRXZ4YWxvdVlKNjdlUGhRTmwvNEMzSjFkSFVBWldYeXNxbmJwdDhwZDFZd1RRSFo3OEl2amR1TDhTeXdlcDRqYTVrMEtGdVJDUVQ4bW1ZNG5kNXJyeVhKbkV4bXEydHFWcTVhM3RQYk96bzBXaGNLOUp6cTMzREgzcWFxMmkvY3YvZjlwV3hBejhjVW4xOUk1NU9EdHFjbDh2cjVobnJ2WGZYbFR5MHNQUG5LN0s0eWQwcEROZWN1elo4OG55OEt0d0NrRDB1TGxzM2Jsc3NObE5TY1hqVENBYnlUWlk5YlZ0NDBTbWlhYkYyWm1zMXhldHNMUDY4V2hQSHgrVUJwZkh3cXhGUmVKMnlTWEZWaGxtZFBQZjVZOVo3N1Y5NXp4NG9icjUwVGZaY2V2bit5WURGUEhqNGdzQUdhRWdCUk1JUUJ6M2k4ZWJJSkVNVnMwM1Jnck1yTjlSVlRpOUZvUmhKOHBaem9TTXhNRFYrK3RIclRKa1ZXMCtsQ3VEelEyZDVKTi9qbE8xWVVQcjVaK2RnbTlhNXVzOVloU3hyT0pCZGk4NU9PUURCWUhuWjdQSnFtUjJJeHI4L2YwYmxzMmJKdUNNWjBPc2xnWEY3cUd4MGVBVnVQenN6cy9mdS9mL0NUbi9qOEIrNHZRMmpybmJ1a2p1VXBJUmpMMnFvajRHcXFsN1pzdVRLUmNkUDJ4cnFBMkJiNjlhd1JLYStlZm5WLzZlNmJtN2J2NlBqVUo2cmFtOEttVmU2eXZTNWFoNkt1MmxOcFl6YXBOYklNWnVtbEhiK1NhZVJOM1huamRVM0x0eVJucHZQYk55OFlEZms4emxaMEIvZStYM0g3eHZxR2xsMS9VK0hNYTM5YzIvNTltdXY5MWMvOTEyMEdPUHNHRm42U04wMmFNU3o2emVkKy85WDM3RjI0Y05acldaTzJrWFh3WHFlUXpGZ2I3bnpQVTBmUENScVMwd3NJVWt2WEY2YW1vRjJPWjJkbll5UzRPdHFZM1UyR1FERnVXNDh1cUpxSHpLdXpBczVsMURNbjMyN3ZXaFd1S0FjV2xzdGxjOW44bXJXclVza0NWTkJrT2lkSmhmTFNVcmpFd3R3OEQvS1YwbTY2N2NicHMwZWpwdjJWbjMyMmRuZjFwUys5eUFkcmRGL0FUbXRjVytQMngzNS8vSU1QRC96bWwxNFA1K1ZkQVZHdnMzS2dUSGY4NkVlTTB3VnBkdVVERDhnRG8yNGZuOG5hbWF5dWtTMUlVaVJOUndBMndTME1sZ3dEcWo3MDJ0KzJMdHB6T1YvWlhmckVNZDVXNlM5OWV2S0gzeDdocWJ3dkVJc21FaG5KVE1SaThReWczTG1lVTF2Ky9rdVRReE92TGN6TlVxZ0E0azB4V0lTOExKTmwyT2FtNWRWWTZ4bTVpZ3F5azZOTHlpb0N6c0JkZTNlL2NPQkFSa3AzTlhkUTVydHpvYkpNOHJFS0dQeVhic1BKREZxSUk4d3pvQVRDSG1wR2doclVFSTlPR25MdTVodHY5UVpLRkVXcnFndzMxRmNEUjNVNlJlQmpzN09MSUpxcWEwcmZPbmhvZG1xdXNiUDk4QXQvT3ZUa1U0MDA0eTRwV1RoN3JrRTA5YXNqZEM3aFhiY3BlYkd2Yk5PdTl2dmZjL1dYUHpmakdSVTdWcnR0Y1NHYk4reTZEMzNZNmZmUFB2K0M5TXVmbG9nRkZYaEp5aVJiZFFEU0RSdFhWazJaeGxWSkFsM0JJNnFTd2kwaXpmWmVTUS8xWUVOTC8rcFg4Ui84WVBqUEw0SkNVVXcwVnBBWG9HT3gyRnl1UUlWQ0JRWktpT3Ayc1A2ZE84K2VPeGUxYklWc1lVV2dDZ3NXRmRVTm1hVWxROHFta3FXVXZhdzFHUEtXdkxQdmxVLys0aWtwTlhmcDdPWDFPL2RzM0wycnBEUmtGbGNlQWtGdktwTmxrR2EyTkZ0elVYRXE0b3pFWlVPWDF3bVRDeTdmdEdmWk95ZlBQUDdENzN6OVc5OWFtUGNQOUkvVTFwWlgxNFI1Z1orYW5wY2taV2wzbjJubzZWVDh3NS84aUJwYjhmMTNUbFpaMXNuZnZBeEZPbkRqc3RZV3Q1S3k4UFFVd3d1MEtCcVNrdE5BazZBeXZ4QllzMmJ1ZUUvajJ2VWxEUTBEZi9mZXpNOS8zOWlDYko4NDJDT1JtQ0pjRzZ1V1dTbzRnY3Irb2ZjaXZDZGl3YzlnSjZ1YXFZeDI0bno4K0hFb29sRFhsdjM2eWNRVHY4NmNQeDI0Ym5QSDhwWFJkODZXckYxN3pZZmZ2OWpiOS9ZM3YzVGk3WU9lOGQ3dExMMkI0NDlxeGl6WlhXSUxaUCtXRlptYmdnejFJdFRvUVpEek9Ublh0R21UeCtscWJWclpVRGZtTDY4dHE2Mmt5Qm9jYm15dUxxN1JVbmhIRlIvd0FrZFRPUjdGODQ1b2txc29zVnpXUXJMQTRtRHptZlBuSmtkR04yemNVRkNNUUNCUVZ1b1hlRDZlU0U5TlRFTmxiRzVwaXN6UFJ4YWpOOXh3Zlhhb3IvL3dVUlBaZmt5QXMyODBvY3BXcVZla1k4bUZxMzBkbjNsazlPWDlSMy83RzVhaFVxbXNqeFhDdElvN09qUjN5ZnluUGh2aUFkNzVkRUxUN3JqSFVBMHpEc0lDSjB3Z3Eyd29WSFYxZXRMUkZZQjR5TXNGWFNYVFNUN2docXF0YnQzYzlhK2ZEOGRtbVVzbnNhZTA3TDVQR2FZNmR1NjBOOXkwYXZjdDFZMnRmTEJpOXNLWmdibW9pME5iZzl3eWo2T2NkVGtsYVFaQjdRSVNhb3R1OTlhMXE5ak1iREp1bGJhMGxuZXRkZnZjRGdhbmNsVG5xblZkeTFxTE8xcEpNaG9HaUU0WjM3aW1uRExZa0VkamFhM01yNXM0RUpIcndzSHFlbkUrazU5alF0MFhMdlgyOS9mY2ROTk4xVldseFIwaVZENG5YKzBkQk5pcXFhNXNiR3ljblk5V1ZwUWVlZnJYOFlsWm1xSkIrTXFZU2RsV1R6d0huSjZWMU9SRU5qSThObmJzYUhwc0ZPS1JiVzJCYXVjY21VeGR1R3hYaGtTR254dWJpS1ROdUdTdlAzZU9zYWlKQXdjUVIvbjlZcnlnRFdVeUhjR2dzODJjbzh5aG1LRnpmTWpVS2lCSld4dTJmWE52NlV1L0dQM2V5dzQra3l2Z2QvYS8rc2FSZzJvNmxlazlkK1ZYdnp2MnZVY25MdldzdnVkZURUUDV1VmtnazltYzZsUFYzWHV1aXluV2pLb2F1dHJVVkw5cjUvWmdXWDB1dDZCa3N6WEwxNjNldGoxY1dmbld2Z1BsOVpWdDdXMS9vUTZHWVlraWo3OTFtelkySjhNTGg5T2dhU3NVVkYxT0ttUFdoMExkM2FWS05qNkpBMVdUQzVtZTgyZEtBaVdWVmRVTUExeUNHUjRjVVZUZDdYRlZWWmVOamswSUxIUDg1VDlINGltb0VDNGFnWElBSEFXR1dVYlJxNTJ5RnE2Wk9IWmlmbUNvYnZteTV2dnU3cCtjU0VvcThMcHdyYTgya0pVdURTM2s1SWlOSUVQcnQyMVd4OGNXRGgvaFJieGdXSU1adWIwdTZCWGRjeDVEcVJKa3cycS9wNGFla1QycVhkWmFtM3oxOWY2VDg5TUMxNXNYcGtYdlhDRmJvRzNWQW1HRXNyb2tJeU9WVDB1eFJObzBFOUVGTEpzWjNhcFoxYkxzMWp0SHpsM3RUUzNxaGhrU2NVMjRvcnQ3TFMrSW1lZzBMN3JiTjI4VkhZNVVKclZ1OHhxMzIvc1hZMkdNV1piRG43dlc4THZNd1VXV2R0UUVlT0RMT2tmbnlzVll6R3dRS3JlRmVUTS8xOFA3UW5NcDQ5aXhkd3hWYTJsdDluaGM4UHZSa1NuVHREcVh0YzdNekdieitlVG9ZR1JxMWtWanpyYWNORm1GQmRteFBlaFkwK1ozMXBjWFNrdjdSK2JyYnI3WnNXSEQ3Sk8vRGlPR3J5b3ZkVkNOem1SK1pqR1paN0x3SzVEUys5OUluVDFKYTFyU29LVHFWbVFiOGxUa1lqcDdJSzNPVDV1Q1U5dDBaN1VQaDF5cU1EMjNlR1E4MmEraktjMmN4YXh6Mi9xWVpjMGtNNkd5Y2lRNk5aYXhWYldBcVBsMDRsSThtaUxMZkF3NHd3eVVMRXpHVGs4TVJ5eTd2YmI2MmczcktrSmxxWVZJTU9CSmp3ODdTeXUzM25VWDRGbFRhN1BmSC95L05ocjI5US9qMWMxdGdmSlNsNU1aU2E5bUtIZEx1VlRJSzloU0dpcGl3K2JHTE5OMlEwUENpQnlTVlo0V1BJZE9uRFVzYXNQNjFlSHk4Smt6UFpGSXRLcTZ0aVRrWFV3blJkMjRlUFpzaUtRcE1HNUtRL1MxQWRlZWJUVkNteUM0MUpIUjFPSlVWdW50bmRyL1JwMmgxN1RVbUtVbDhZdjlMcFpOWnBHbDI2VEltaGFkTDloSUhkQ3B0R1dIL2I2WWJzMWd1ODNIOXNiVitVd2h0MmpsWjgzS3hWVEFraTZQeDJId1BNY0lDTE9HR21LQTIyUTBRL1cyTlBzYm1tYUdCMHVBck5GMENsTTNYTDllRW9RanNjVTh6ZlJFbzFQemsxbVBJQXI0emx0dXYrSFd1MzBWRmZWcnQ4cUxvME1IMzJqYXVMdCs3Um9ZZ0thcVBNLy90YVdPblRqOTdhOC9qdSs3ZnVzMHRWMDBvajcyb3VYcVdzelhWZ1FTS21JcEk5OVF5Y2V0YmpjOWZ0T0tiRDR4RDBFZENsY2VPOVB2RUlWbDNaM0FnL3Y3QWJua3JkZHR5Y3FGdDU1N0pqays0WWNCa1AwakNPcnhyUjJsZFIwQnpUWlB2TmFmbTgrdkVTeFJ0aW9hSzZvcWViK1FsV2RtcjJaUU1xZndBT1JPdWtTa0M1cWRZL0FDemVvMkVtbnU2bUswdDVELzErbnhiUndhZnV2RXhlS3U3dmhDdm9NWFN5VjVJYXNyTkdJeDJaQUxpcFlTUkRtWDlmS0dZbWs1QlNWUzZiUnRGbXpLZytrUGhvVU9Vem1iekVqWUZrUktaV3lub3RhWnBrZktLTE1UbGdUOHpHRlBubDQ0ZHlXUCthNGI5L2g5UHVCMjNGOXRaSDNsdFFNLysrbWZoTlFNL3NDZWF4TlpEM0RiRW1mRWk2OWtxR1ZabzdhcmpvTE04dGk5M29wbC9kTDJBSi9mdk00NU96TEVxNnJINTN2K3JiTkJiMkRIam10bFZUMTU0bFM0ckdMRnl1Vm5UaDJkdVhoSmhNSk10b09UNVZnL1Q4OU5wbC9jUHllbDZNMkN6VFUycUp1MytZZE9sNjlzRUJtWkttUWllU1puVW1VUXNnNHVHT0tUczRWZXc4b0Ewb21zcEpoVFBGdlYyTFNDdCtUZWthY3Y5VTBXdFRTTnFKV2NtODVaaHE2RGRrRWNtNWRVS0wvenFVSUdDOUcwSG1COEczZnRqVVNtSXRpYWxxUXF5NjdNR1dJcTQ2OElGblFORkU4Snk1Uml4R1pNd0NIVDd4czh1bS9peUJ2alp5K2tjNmoxcGozYjdycmJOQTJ5NWZmZDR4UFdiMy96cCtlZU9lZ3NSSVZDSDk2eTlucDM5bWk3KzV5R0c1UFJ5SXJTSVlWZWxwV29odEp4U2RaOERpa2R1R2QrYnJHeFBscGZFVGo5VG4rSncvYjVmYjk3NFUxVjBkLzM0SDBVeG0rKzhWWmpmYzJ0NzcxL2RPaktZTjlReUxaWkZodkJzdkYwNGNCOHhvT1lCMnJ4NUl6R1B2N3p1akEyemgxbVd6cnRUSlNXSk1Ga3BUdzFwNXBrRFpYbnBhM2I0eFJuUmFOekNBMFl4bzZkbSsrNVplZlZMM3pqVDVldnZrQmp1M2hTN2hZYitRc0ZtYVZFY3BLUkhQQXlkWU9jWFVSbzA2NzcycmZmZ1FzRmRmSnFYczNQNk9SWTZLNnRPMHhKSFl6Ri9JMU5zN05SVnJhZEJzVVZqR2tnYURmdC9kVFBuNXJ0SDU0ZUhITjNiU2k3ZHVlT0QzK2tMQnltbGs3RklqUXlOUHJFVDUrN2NtSE1rWm1nazcxSWkrRHJHcXZLOHZ1M2JxZ0d3RTltNlBoQ3JMMHVNWjVxamFYZERXR04xdWJjVUJ5WjlVenNjdG5LUnRiSVh6ZzNYaE5pSzh0Q3orNC9Oams1LytCNzcyMW9xSHRqLy83S2NOV1dleDRZT25WaVltcktwcWlFSkkrb1NtdGI4MGRxaEV4Zklucm5uYUcyWnVIRUc4NVZLMDFWWnVaR2JBUHBVTHBrZTRHc1Mrb3pDYW4xSzE4UHMrejgyS1JrSVJkdCtwSUo3Y2lSVTVyOWV4QWN4ZGxKcDIyL2grZGExNjdSNGlsZ2NRb3dhOTBBTGFRenRHSFpXTXFMRmJYbFZkWHF5SlVyMDVPOWVXblA2bzNiVjY0OGRYaC9IdHZEc1VSUzFTR1JEZE9DY3JuOTNucys4UFh2Tk5XRUFtVjFCNTUrT3ExYTcvM21OMWV1dWFaNGdCSDhtUC9kYi83d3hodFhDaW5kaXA2VTVrOUppZG5LaGxyOHlkdTdwaWRqM1MwZWxzbHdBaDNKaHN4OHJLUFYwWmRZSy9CMmFVQnlHTk5DOVkyRGtkSnkrMHI5NXVzblJrZEhCcWVEZ2xKZFdYR21iK3J3TzZmWHJlcmV1WFBIdWZQbjA3SGt6Z2MvY1BiYzZhTXpNNVJ0cmVycS9GQnRlZXlkeTlJblB0bXdlNHZ4L0JPaVQzU0VTOUg0RlpTSUd3amJscVdxTkd1eml6eEQ2UVkxTnhaUFo1WFN5dm4wb2tPVlVqbzlRamtPMnRhY1JUYWxnSFRZeURQYmxqVjNiZHVhUDNYT1ZWRlJWbFd0TGNZNHpFRE9ZQnZGczhueDNqUDYxSkJmWU1jMGRWb3pQTFMyY09uOGRDYmZaOXJEaGdrZzVLYVJXMENyYnRuemxUKytVQm55QUlOUHpFV2l5Y1RPQisvYmZlc3RTNG0zNy9XM2Z2WExGd3FxMStzVUo4OCtsWjg3TDZYU0ZJdSsvSnMzOGM4KzJkR1hhbVdsb2VyYU9zRmJWVkVSR0JoYUNQbjBaV3U2TG95SVNNMEZheXRkT01XRXJ4OGZYNmhzY0RTMFg5ZDc0WHhpTVk1dHBUcmswQXhxLytGTHNjWDQ4dVh0bFpYaFpES0RmY0hobmd2emhYeG5PcU9NejdvLytwR201UTNNQ3o5R2dtQzduUUt0V3dYVmpNd3hIRS9UU0pJdHkrQkI0cklpWDFsWkhoc2NIdTI3Y2xXUm9vWk5WVmFNdThUeFJLS0JvbTdqK0JVczVnMnRXZUFYanI0VHpVdDFWYUdhY2crM3VPZzJkQ2g4UGxBT0NEWEFrN1hUbE5HVGt4Y3QyOGpsSkZNYU1oRHcwb2MrL09GdHU3ZnZ2dS91OVh2ZjE3MTYxYjV2ZituVi8zZzZuaVZMTkR2djNidVJMQTZnZDQ2ZWZPSDVWeko1MU55eTFzck1ISC8rMy9qQ1pDR1RwUm4yVzgrOTNiSmlJLzcyQjl3VVZiSXdrYXV0ZGtBNUN2aVNpUFgyRFdUYlcxMXVYK21SUTJNQnI4OGJVcnhPT2VtNUszcnBXTjFLYjJYN1RUMW4zemJ5RXFXYmpMSG9ENFlIaHFZR2h5WmNYazhvNksxcmJBcVVsQUpwUGhHTnRLeGZ0ZlBtOWZFZmY0V1ZGaDNsMVZ3bXhuQUN5NGw2ZEZwWG9ZalJwczNtQzNwZVZnTnJWd1lyZzZrTFY2dGN2cUJ0NlpoT3l3VUh6VFJhOXZzWWVwbExPSmpOc1U3bk5YNTNSbGF5aXFIRUV0blpPYWdNUHBiUmRhUlpWcEJuUXNodVc3MW13aHM0TnorUEhTNUoxVEJGZTVzYXZ2SDl4Kys1OXo0bnp6YXMzTnJZVUhmMlY5OCs4TlFyVXd0ajE5Mzd2dDEzM3VJTEJNNmR1M2p3elNQVEU1RzZoczdLVVBqSTgwOGVlK214Z0VQSkoxS01pLy95VXkrc1dMOExJUjEvOFRhSGx4azcvYzRDZ3hXL2R3N1piTGk2TmpLYm01L05kR3lwOGJ2TGUzcnlwVUczNkVpVWhXdUdFdTMyME1zTk4rK3FxdGh6OGZBenVtRXpyRXRkNktzTWlIeXdaR3d5TWp1WE1FeHR4VFVyUC8vMXI5OTR5MjJGeUhUZkk5OHR5eGpoN2tvcmt6VGppL0ppbk9FTXpoZklKMlVwSytzMkxjdTBycGtaSkR0WXFtTE50VWhWRmhZWHd5SC9DbytuMWhFSXU1eDJQdnQwVGhKM1hQZStsZTJlMmVsOEptZlRPR2NBVXllSDBYT21IWU1VWmptdnlHbWdhWks1Z2RUaUtNMUNtcWMxeGNVSzMzdjAwYmJXemo5OThUT0xWOC9WcldoLzltdWZIdXp0LzhSUG52alMwMzl1N21nN2Z1emt2dGZlVHFkeTFlV05KU1VWUncrKzloOC8vbVoyOWx3b2lPZkdFcFh0VFk4K2Q2UjkrU1pOVGl2SlJmelpiWXJiWHoycWJORmx0THpaazhtbk9ONG9MVjh4QnppZDc2dmJ2WTJTbmFjdUM5VlZJTFQ3UW5WckJ4TlYvdmlacXV2dkRyanFSeTY4SE05WVRrODRKOFZUa2JGU240dmpYSWxrRXFUQjBPQmdhVzNsenZ2ZlY3dDd0K1F3NTg2Y3lWN0tnUHcwRGNzQUphSWFOTVdBRk5jTTIwZ1pXVVRqYlR2czZUbXRkL0RNMVBRVnl5cDFpQkR3VjZZbSs1S3BDN281NWhMdjIzeXQzSE9wMEZndElXNE9MTTVnbHVOeXVwRTFETXd3SEV2SmhwM1FURmtCb21MM0dWYXlBRlhCQmkwaGpZMFpHdG1Obm80bk9sWjNiZDc3d1AxZi9WNm9zL3ZndnFNWEx3eGtVNXJBZXoxdS8vRTNEejd6aThlbit3K1ZlUlFXeWRQam1XMzMzUGJOMyswUGxWY0Q3V0o1MEJjbS9xZmIzSXlqZWpMVE9uM2xaRmRiU0t5b1UxSnhkMVdOMjhWZU90Ymo0N1NhNWVWS1RsakllQ3FkMDV3OTY2eS81ZXB3cHR4OHMyYmpCeHJybXFKVGh5LzF4eG1ubjhkNGRud3NPVGNXRHJsOWdSTFZzSzcyOWZVUERndU5MZDRkdDNvMzNzVFhCTk1UVXduNHluaStNQU8wWGFKNXQ2NnpTWjBlMVUyNXRaTktwWE5UVTNHRTBwaVprN1N4bkJSbDhXWGJIQU4wOTd0NWlOdlJpWkxXem1oTzY1MmJ3enpyNHVrOE9VbkdzS0RiVlRWcm1LWnR6OWxvVkRNbkRGTXY3ckxPV1haOWZlMi8vL2JYTys2NWY4Mk5lOHFidTJYYTg5S0xiNzMwN0pGY2dmWTZ2V28yLzg1YisxNzQ0ODltQjQ4NWNjRXRvcG54aGJ5cWZleHJqMzc2V3ovbWVBRXVvK3Q2SnAxZ1JaRksvYUxlVStvOU10ZytjT1RzTGRkTWhWZXV0bTJlOWxhejlkZjBQUGViMGJPOXQzeHNyeEJ3WExsU1RkSDVydW9NVmRvK3BtMUlEQjljQ3hJNStMQSs4TlNoMTU3OGoxZW1jNWJEVitweHNieUZXTVBtdTlkc3FHOWZvZEtNenhkeStudzZDK1RHeUF6MCs1TnhhMjVDR2hoWUhCNkpUcyttRVFMckFCSDFWcFV2YjI5VkRoN0pJblFSVS8ybVRUYm84Y3lrYWxRS1lyVWlOeUcwZTEwRFB6eTVrTEl1QVJGRHFBb2hDYUhMeFkzb1pZam84QUpDSXFqT3R1YmFqdTZ1NXFaVmE5WjBMbDlXMjlTUXl4VUdyZzcxRFU4TURrNW9Db04wTHVCbjg3bnBTNmVQcHVJUkRxbE9sdVlaWTJacU5pZWgzWGZ1K2RnWHY5NjljbVZ4d3lpUU9iTFZIVFJnTHB1bVJ2NjFwTExPbzNDcjMzaGpibTNaR1gvQXNOd2xuc3FOVEdtRHFTUmYvZlZMSlFGaHk0TTc1YlIvWUt5NnRpd1ZGQVpReGRwQmRDOXo4UWROVzdlT0pwWTFaUjhkSFIzKzFVc0xaL3NqN21BNWlIV1c0a1duVTBjb0ZLNWR2bTVqVFhPelpkSVFhN1RiNi9UN2RkdWVIQnFhN3JtVW41cG1iSk9oclJJSHUzVHpoWE92dkRZMU96T0ViT0NsZkhFRjhGOGYrZUxkbi9qMGhVZS9GS3lyWThNbFU1LytHS3VnUVJ1ZktwaDZWVVBqOGcxOXFXbkI3YmkrcmNOZlh1YXBiZWxZdmxvRTlDSkw3SFMySUkyT1RadzZjZjVLejFBOEdUYzEzZWYyQkwxOExqay9NellBK1NvNkhCelBpQXl0eWRMa2RLeHJ6YXIzZnZ6VDl6enczcVdOdGFhcFk4d3U3YkZGUzNlVG1QMWhtYTNHZzFWdDcxd3U2YWlJVndaanlVVENwajNlMGhxdXJpT1RwSTg5djcrKzBkMTU5NzJGZU4zTUpGL2hQZTJ5Qi9YSzI4ZlNLOHZtZitCYSs2a0xGMlkzc0k5VDRlYTNEMDQ5OC9yVmlPbGwzSDYvNkdjcDFoY3FjUVJLREVOMU9YMTE5VzJWVFkwT3I4Y0dZRVlJTTd4SjdydENtUVZOa1V4VHl5dkpOT3R4V1pKQ1c2YW01Q3dsRHppeDY2RVAvMFdqbVpLMGVQWWRUMmxZNFJ5YXFvZ2xsWHdnYUJtYVJZNVdtcGxNTmhtUFRneU5qWXhNam8wUFQweFBweGF6aGlxN0JNRkpyS2ZwVWxMSnBRMHB5ekFVdy9JQ0s3SXNTek82bE10d3JQRGhMejkyOTRNUC9OY05VVkJ4SWRYVXlNMDBPSUhNU0ZNMmxmeDFpMjBsV2NaMStFcHRoVGV6ZXBXU21vbVI3VisyVy9BRStKWU5NejFqL2VldnJOcDFiY21xYmVtWjJvWEYyU3JyR1RlcnlJMGZPWGs2dGtKL1RscjNvNEVqdjF0RHYrQXBMNThhRzMvNWtEUlVjS1NSbXhNclJKZlBFd3o2L1NVMEFHMGhweWdtd3d1UWxhVWxwWUdTc012dHNpMDdJeHNaMVRTTHV6Wm9pL1lGdklJSXFnL1Q1QjQ1YUh4b0tKdExzeHh2RzRiRDZhWUNKZUJ4SUF1RlFsNlZjdmwwSXBWTXAxT3BXSHd4azBvWFpOa3lEQjRqZ1dmSktWdlEycXBrR2pLbVRJck1wUnNNVHo1Z1dYSy9KWlpoSlUyWFpSMEtUVzIxLzBzL2VyNTV3M1ppS0NscnN6ekY4c1hEMjdZQ2lveWlCWkczYlpYS1BOM0pZUjF5OXNwc1hTU2F1V0Z6SXBmV0RFM25lZEFTRk9mME9MeDh6THB1OHNwRVI3ZnRhbDQzUHVDTlRBOHM5KzkzT3BnSjcrZUhUNTNjMmhWL0ozK3pmZmFiVmZ5a3c4dnFCbnRwQUtkMWFTVGp5TkFWb3FmVUYyckJUc0UwRExJR3dUS2FwUmZrZ3BRdGFQa0NHSXNWZU43bDRFVVBsRGNJZDBYVk5VMnpnUExKVXE2UXkyZHpraVJ6QWcrV2xBcVNhcWprYUxsZHZHOFNWYndyRGJMSXVYSzd1QjJQM05SSUlRZTBkQ0F3QUdnR2lIb29tNWc4ZE5vMk9VekJsVmpMeWhsMFNqWWNscFhOMkY0SERuRzZSbEhiNzNqZnBwc2U2RnE3bnJNTE5oWXNwd05qamdSMExrc1dtdUVhLzdBckFHbmc5amt0M3Iwb2Q1VGdXZEhyZ0ZvQzFZcEJCWXBXRE5vaE9rdkdCdEtGK2JmS0t4Um51bWMrVno4NGhhdGRQU0dqNS9MaXF2R3poMXI1TjEvcUNYUlVZcGJLc2p4b05ZSFQrZFZOaGV4aU9qc1AvRE9xcU9RWXMwR3ppT0l0bW9HUjg4VTdTdEVzYitoNlBwT0l6bzdOVFF6TlR3MUdwL3VUODRQeDJlSFU0cVNXajFGYXpzbWFQS1ZTUnA0MkM1eVZ4M29PR1hsczVDazFhMnNGcEtTUm5MYlZIS1huS0N2RklvbkRHc2NZTERaQmZRdWN6Wk1UOVliQW1SQ3VqR2tYRkdNeGE4K2xLQmVOV2tzWmdjT1RTUXY0b3BzeWh5OWQ3ajEzTUJvdmVFV1hJTVhzWEZKWFpCb0x2TU9sU1hteU4vbVJlMXNUaVRsTFM5Rys3Y016aGtzWkN0WDZDL2xwQ2pkRk1qNktraWxXUkxrUndaNk9SUjJDR3ZPNjV6eGEzN0ZMZk85bHZhMWtJa0NkZS9ZTnFoVEhxa3NMTHgxeGR0VWFYb2ZsRU8ySkNMWXAzRkVyNUNLTWxJNXJtZWxDWWtMTlJaUmMzTkExRmpFTVRaRTdnNUNUaXpTRG5UUWtCcVl3elNOeXl4MXlUb0djMVFaY0pUZm9zbVUxbzZrRlF5OFlwcUlYajl5VHplWmsrNURPTWpUTFlUSUxLQ0JXNEVBb0ZvL1BVaHhEZXh5VXgwR1dUNEJnR0JxZHlkdXhIQlZQbVNDbGdPWlp0QmhpYWJlZ0MwNEdiSmN6ZUlIUkdUVi85ZHl4MDJmUFF2MXc4UUt2cWVRdVpCVGtMRWVyTXY3eTNZMkJFazR6MFhSdVdYeDJ2RGtjQWNGaXlZczVSWjlGZDZVeVRpWjMxU2RxZmlFK0UvWDBqZWsrWGl0eHB3Vjk2dmxYMVlVNTMrNk5sdHNoUFhmQTg1N3JJTEROaThOaWN4akdxSHY5MU1RVUZ3d1pmaDg5TjhxWCtLSFBzcDNQeU5tSW5oalZVaE5xUG1hb0dkTk1BVFJoVEE0T01aamNONGNoZzNjQXBqSXN1ZWtXVGRHNnJpRFRvc0M2NUpZMERBV1lRMjdhUmJHTURRSWNxQ2ttUzJTR2k3ZTlBdTFpYmM0Mk9OdmlJRWxOcHFEZ1ZNWk9acTFVbmtwSmhtN2E1VzV4ZFRYWk4zNXF4dENRV09uRVNOY3FmZXhNUnArUjdJcUE0S0ZSZENwMnBxOXZlQzRXY2xraWVFN1RiYkkra2NmdlhlOHZDN2xGVjhtVTFKQ0pwRHVyeGpDdGk2S1BRMmJNNkI3Sk5lUlZQcllnRjdLUzI1UHU2eTNNUnYxQm5xcXZNaW9yektQSHFNRko5ejEzWTEzVFg5cUhIcnJaUEQ4cEpISk1ReGhFbndaT25oNWptcHNsd1lldjlqdExRN3pKQ2VUT0RKWkYyMUNiTW9ZY00vSlJsSTlZOG94WmlERXFKRkdXcDJTZVVweU1MdElHUXhzaXRoaGJZMmxUWk1tdWJ3ZGplUVhEdzJsZ0hiZEFlUVhzRmZXZ1d3czZrWlBjbmdXZ3l0UlZKS2wyUnJHaldaVE9JVWtoNTdkTlpEYjYySFkzQXdnRDFiT2N0OHA0K2xKQ1ZTaStRcUNCd2RTRWFBVXhnd3VHeU5JTllhY2g1UzczVFp5NTJtZnBPUzgyV0FoWDA4TDNMbmR5dk9JSjBxeS9Zblppc2NFWHRSbER6bWd1WHNPY2VYbWFYK3kvbE03U3NSVFRHQUxtWmwzdWxadzhGUzZuYXlwd2FRaTljdEJJUm9YMzNLNU94TkhRR0wvcld1M2NWZHZCY0Y2bjVmR3F1UXd6TjhNdHYwYlA2MEltUVRFODdmTTduQUlWUzVQemVKWk5FZlJDUUJRTVdWWlVXYkpVaVRKbHlzcFRWZzQwQjBmcGxLV3dGSFRHZHZFV2l4U1JVbmthdW02NVJJdGpMSVl4UlhpZk1WWEpTcVNzUk5iSUs1YWtVd1hkVXNrWlpISUhEOU15eXdXMlN1Q0NKRnRwUzlmaU9UcFBjNDErNU1UNndLSkZDVUtKaURUTnJQWmdpT0RKakMwaTNjMmhjajlPTFJaT0Q0d2s1aWJjMEtLbkJIL3N1bkpKTWNxclJOVm1JMWxVd1NjOGZrY3lFczNGdGFBblBiWllxbytldVdIRmFDeUJqaDNUYXlvZDRZQTFQYWRpd0FUTWxZZXBsZ2J0bVQvYm1zdysrRjV6L3hsR3BQR0tldVdsdzZncXhBVGN1aTlFUlNKWWxlaTJabnQ4amc4NW1mOUR3cm4xdGxHRVlYaU9lN1ozYlNkeFlpV2tLVTF4MG9JRXJWQlJWYlc5b09KMHd4M1FPOVRmd0MrQW44QXRWd2h4MlVvSWJwQVFCWEZRVVVWRDFWREkwVTZheExWcnI5ZmUwK3pNOGsyNXRHUjU1ZG1aOTMwK3pmZTlsWUQ0TlJzcHUrR2tVRC9Id3NBRXAxTDN3dXZPZTBML3p6b3dUQTViSU0xVkJQc2lVeGFudWpFazExbDhjWXFBTkhRM2JTejEwS1FrZVlFbVV6VEpNSnhOS0JLRktrRlZRTFJGZ2cyRXEvQnJpTXg0QmhSRG93VGdrczdYeXM2a0dNVjBmVTRQV1Q0OHlRT2J6bFZZSVlxV2I4TEIzeDZYTGh4MWhCZG56REJTdjJ5UG5wM3NHMXpRejI2dFBoc3kyOGpjcXZsa3ZHQ0xmWWYxbzZkcTJFdkJhN285Tm95eWk2ZkNtVUFuRmZ4NFYvS0tYMi9rdlVNRjdIdHlXSzYzNmJtWDh5OXU0OW1hKzk0Vjh1VWQ4Y29xT3JWY2Z2Y3pPejFUT2xaUk1CYU9pVkZtam1zOHVFOHRHOU1LWFd4eVlJQWJsOUR4Z0I4ZjhiazZ0ejBEM0VyZjh6dk1zbldIYXh6amFhWW5ZelJrT3liNDZmUFVRZzZ1WkRJR3UxTEsvNlAva0JKSUNwMm5ZSENhRmxTSFNJSTNBQTVsV0dhbHpiaEdFYVJuM0RGOFYySDRPR3NDMytGUThKV2E4Z25hN29NZlduTlZPbzdUd05KWG83c1RJTE1TcW9zRjMzQU4vdHYrdUgrd1N6Kzk2VSt5T3JCMGZWNzBodmJSUVhTbThYUnpjOXJaNHVFSVhtTzYxVlZMczBJbFpMN0I1MXR5djVNallYbCtLcVR1eTl6ZFloZGVNeXN6OGVkZjI5ZGZNOCsyd3ErK05kKytqdUVzL1ByQXZiQ21URThtSXowaTNHemwzUzZjajRxZVExZWpRcG05bnZYbVpkVHRvc0dKTTR3UU4wa1NxYndBMXNZaUFURlc4T2NyRmdXTEF4d2pzRlFGb3FwMFRHSThueU9GbGRXcGRnVk5KdVVreFhyR0tNV1RpSTRtQUhPMGJzRjd3VUxxNEk2S1E3TlVKa0xmMDFVOUk5YTlOR1hUSmFPSUVCZXZOa21SNHExK1FUMDdvR2djNXkzZm1LUnlKNUoxd3pDVW5BMndnOVhHVVU0L3VlR1hsSTBIdURHVDFLdkY5bllkRHc2OUJ0MTdUUHBqNi9jOThkZWo4UEthT1ZQSER6ZDRhd0d2dG90K2orWElreWh1bnplR2ZmTGJUL0xxWlpKbTJkMC8yQWZ2UUNFOXZYT3Y4ZUc3OU4vOVl1Y2Y1OUs1Z2dmczZJa2hVdnpHQmZwNEI2bk1ub3pLODIzNTV5WXFZblR4dkR6dTB5aVVUNGZZSkdRNkV0dEhlQlFUejhKUFF4ckcxalFtNDdDQUpVZ3llQXFMRlIvSHVCZmlVV1NFSWVzY3E3U2tvcVJKaUZRdVFZWThoMDhGS0NHdVZUbUQvWkZKMTRUVnd5SXJLV1Zaa1ZjcnBtN0J4V2krQ2tBa3FTUGFMWUtTL08rVE1pLzVDdzJlRnNLak9FdlRFdzA1aHBYbnl3MWpzV2JTbTIzY21PWEhBMEtMUVowZkRKTGFvNzEwZlQ2dmVuaWE0bTgya0UzVXRYYTV1TXpETVIyT3NPZXg5bG0xZjhBbXduUk5GUVNtWVluZGYvbGJWL2pSTUxyemZmWFdSOEUwR2QvK3diMTVEZDNia0lkOWMvR0ZlRWFMbDUzR2FHMWQ3ZTNvREVYQjZFdG4xUDIvcmJWbG9nd1JPTld5VU15MDErYU5taTFPaGpvZURmeDBjMS8wSjZMSXltNG9oekVDUGZyblNkR1BDa3JRWUpBVG9lV0dTcnpTWkxOVkN1eGtnbW1Tc21GaGdPa2tVNzRMdTVBV2VXR2IxRGRwbWttQWxNQXhLemJ3YWVtNkNGYWdjOEk4MzE1YUFEOHJkZ2NLOUtWcFVDVWsxT1BqNlhRQU1vZDFNTm9wZU1ESEY2eXFXNmFTREk4akpoTWx4M3NIWk5hQWFoYk15M3o0dUZpdGlldFhPUlRYVGdVMEhmV09lVkExMm12cThFQjJPd2xJN2ZvNUF5Q3EwN1hmZUJWdGJrMDNIbG52WHkwZmRYRW50SysvSGovWTlWRkdhbTVlOGZsQngyd0VJRjVDSk40a2dxS2tYRjN6dDdyNHlybjg2Smx5SEI1R3FGYnhsZ0w2NGlLUFkzcDJpYTIwYURKQ3pRcGVhM0dMa2tVZm5XN0MvdURMRFhMcEpkUG5wQld3cGc4TXBwYVhqQ3JRaEk3MjB1Rk9aK2JZT01GeFFab05QYjQxR0Vvb2RGeW0weERMVW9CTlBrK2l4UTduZ2NWM2pnUXgyTW9DYVRqczNrRU1vRmZqVUVpaVZzMWpFb042KzJEd3FQaFBnQUVBRUVLY1RaVk51SUlBQUFBQVNVVk9SSzVDWUlJPVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxSMGxHT0RsaFpBQkxBUGNBQVA3M0J0aG1FK3ZsNUtxRGRISlBUUC8rL3U3azI1SkVFL0NOTUpoMGJFb1FCdS9McjhtRFdmdXFVT2x6RDNBM0tzcTV0YTEzWnVJSkJOVEN1dHpWMVRBR0JicGpON3lzcXZyMDg0OVVTZEtKVi8zUmpWTXRLZXEyaXRXV2F2cllDTVo4Vk9hV2E4ZGFGc2RyTktoWEtNbDJTWkZrVlhGQ091ZDhLcmhsUS9MczY4eUtZYTAwQkdsWVkrWFV5clJaSnZ6SGU2cFdOcGxGSjRnNkk5aDFOUW9CQXRxamRmbno2OGxrSk9UYjI4V1poL1M1aGNaVkNiVkpDSTRHRWRockgxWWVEL09GRi9meThXY1dCcnhWR05hY2NzZTByTFpaTmZtNEJLQklGTmk1cVA3aWtMcDJXK0hXMC9xd040WTdGS2RFQ1Z0SVRtUWlCY1dsbXQ1eUpLTkpKTVJvUmFTS2gvSHI0OE9ycHYzNitQeTZkSWMzQm5Sa2Jkck14TVZiS1BpWFB0ck96TlNNWWVlcGM3UktGZFRGd2JPZGw5bW5pZVRjMDlWN1JjN0Z4YjF5UjNZa0JIbzBIZXFqWjlLOXRheVVsTGlqbjNrMUNKZzNCYmFVaDk3U3p1ZWFXLzIxWnN4eU90ZFVCYWxkUkpnN0dwbEtNV0luRnFwbVNlUGU0cGhXTyt6ZDA5ZUVTN3RoS3NaREF0Ykx5b2dsQTZwUkdhUnFWemduS0lsQkplT0pXYW1TaTY1aE40VkhOL1R2OE51U1crYTRtK0xOdytPc2c5UjlXSjFTSi96MytQcXNYOEdJY3RLSUpNK1FZM01xRk9qZjN0VEp4UGlkVUpxRGdycFFDK2FHTzRZdUU4MTNZZTZ6ZktWT011MlZTcGtuQkZrOE84MkJUZGlZRk9uczh2V29kYlVCR3Y3dnBiVnJVT3pCTXZUV3Y5R3FsczIrdmR1eW1zOWVFc2lnanFSa0Z0amIzL2J4KzlWdFF0bk8wV1l2SUtkeFgvWDUvT08rcGRPdUZ0UkxBdm51N3VKZ0NmcnU0cldMcGMrVWU1cDdlZkhsNG9KUFFlUjVQakFZRjg1d0s3Qk5KdFpsTHZlTFBOKzRpZHJHdnUvMStQV09WWkZxSHFxTmpVa2JHZE9OY3J4c1BIOWNWL3FzaFcwdUJlTFkyTE9OZTZsME80ZGxaUERvNmNHenROSkZGOE5QRmRHd290WEd4NlZPRUpFeEhPKytqOWpJeC9YaXpoc1FGRDBkR0xBOUdZeGRRc1p4VWZqNzl0K09UN0p5U2VQTDNjblIxZkN4YThQRHlPall6N2VMRHVPcmtFSXhPV0pRV3JlQmxlUGw1OW5SRnAxaEp5SC9DMWhOVUNCRVlYUmhXRTFRUEQ5NGNHRmphMlYwSUdKbFoybHVQU0x2dTc4aUlHbGtQU0pYTlUwd1RYQkRaV2hwU0hweVpWTjZUbFJqZW10ak9XUWlQejRnUEhnNmVHMXdiV1YwWVNCNGJXeHVjenA0UFNKaFpHOWlaVHB1Y3pwdFpYUmhMeUlnZURwNGJYQjBhejBpUVdSdlltVWdXRTFRSUVOdmNtVWdOUzQxTFdNd01UUWdOemt1TVRVeE5EZ3hMQ0F5TURFekx6QXpMekV6TFRFeU9qQTVPakUxSUNBZ0lDQWdJQ0FpUGlBOGNtUm1PbEpFUmlCNGJXeHVjenB5WkdZOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2TURJdk1qSXRjbVJtTFhONWJuUmhlQzF1Y3lNaVBpQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlISmtaanBoWW05MWREMGlJaUI0Yld4dWN6cDRiWEJOVFQwaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTRZWEF2TVM0d0wyMXRMeUlnZUcxc2JuTTZjM1JTWldZOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXpWSGx3WlM5U1pYTnZkWEpqWlZKbFppTWlJSGh0Ykc1ek9uaHRjRDBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3THlJZ2VHMXdUVTA2Ukc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRveE5EZ3dPRU15TWpneE1qY3hNVVZCUVRNMU9VVTBORFF3TlRBeU1VRXhSU0lnZUcxd1RVMDZTVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG94TkRnd09FTXlNVGd4TWpjeE1VVkJRVE0xT1VVME5EUXdOVEF5TVVFeFJTSWdlRzF3T2tOeVpXRjBiM0pVYjI5c1BTSkJaRzlpWlNCUWFHOTBiM05vYjNBZ1EwTWdWMmx1Wkc5M2N5SStJRHg0YlhCTlRUcEVaWEpwZG1Wa1JuSnZiU0J6ZEZKbFpqcHBibk4wWVc1alpVbEVQU0kyT0VVd1FUUkdNRGxCTkVSR01UUTFRVVJFT0RsRFJEVTRNRVl6TVRsQ1JpSWdjM1JTWldZNlpHOWpkVzFsYm5SSlJEMGlOamhGTUVFMFJqQTVRVFJFUmpFME5VRkVSRGc1UTBRMU9EQkdNekU1UWtZaUx6NGdQQzl5WkdZNlJHVnpZM0pwY0hScGIyNCtJRHd2Y21SbU9sSkVSajRnUEM5NE9uaHRjRzFsZEdFK0lEdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6NEIvLzc5L1B2NitmajM5dlgwOC9MeDhPL3U3ZXpyNnVubzUrYmw1T1BpNGVEZjN0M2MyOXJaMk5mVzFkVFQwdEhRejg3TnpNdkt5Y2pIeHNYRXc4TEJ3TCsrdmJ5N3VybTR0N2ExdExPeXNiQ3ZycTJzcTZxcHFLZW1wYVNqb3FHZ241NmRuSnVhbVppWGxwV1VrNUtSa0krT2pZeUxpb21JaDRhRmhJT0NnWUIvZm4xOGUzcDVlSGQyZFhSemNuRndiMjV0Ykd0cWFXaG5abVZrWTJKaFlGOWVYVnhiV2xsWVYxWlZWRk5TVVZCUFRrMU1TMHBKU0VkR1JVUkRRa0ZBUHo0OVBEczZPVGczTmpVME16SXhNQzh1TFN3cktpa29KeVlsSkNNaUlTQWZIaDBjR3hvWkdCY1dGUlFURWhFUUR3NE5EQXNLQ1FnSEJnVUVBd0lCQUFBaCtRUUFBQUFBQUN3QUFBQUFaQUJMQUFBSS93QXREQ0p5eUp3NUVoWkcwS0NCaDhZZ0JWSU9rbmpScUZJU0tSVXlBcEhpbzZQSGo2MGtpQnhKa2tVbEVwV3FKRkZaUmM4ckpoRWl3R1NDcUVJTmRsMjZSRW0wYnQyeUN0WTJEaGx5N2h3Yk5nb01FZUVoZ29nSUVhQUMxSHBDSWdtVUE5dVNqQmpCREE4MnJsSnFBT0ZpTGttU1NwVU9LTWc0Uk02QkF4NWJkWlRybzFWSWtpUGIrVWxob2RHTEdDK2FWWW54U3FaaFJLOFUxYWpCSVdjWFZEd1hTMTVzczBZRk1qaWFFZ0VGQlJRb0hDOHNIREo3eUVJYVBDT3drUmhFb28wMXNYTGNtcXVFVWNFMkxwVWF5ZnNuNm1OY3ZDUDNlRnRqeFlvRjQwZGV2RGp5MGpBVFB6RmlBRmtjcFV1TEZsMzI2VXUwYk4za0d1czJpZjhZSkFJMEQxQzFsdjRZemVYUUNEd3ZzS2tlaEcxUWlSUzhLZ0RaeG4rYkZEbEpJR1JCSmRpc2tjSWV2czJGbHppVi9BTkNDUkNXb01zSVJKQkJSak14cFBBU0Uwem93VWNNbFhoWFFVN1hZV2ZkUGxHZ29nOHFVZXh6VGc5a01OVURLQ0xVVWw0QWgzREJCV3FyMVdlQkJRVU9FdDhUUkNyeWhCeVZwSkJDSXpMc1VZb0Y3MWdoeGp2dG5BSVNTVitBY0lnM3FhUWhDQ1ZwalBET0NtY29RUXN0c21DQ3lTdUFnTWdIQ1lyVllJMTFKVjVuM1oxZGNHQUlGRkNjQndvUHRZZ0N4UThCWUhQQUM2bVFjRVFKUUFvVUh6YUhvUFhQcEkxZ0lrOFZSMWlRUWhWOGxFREpFZTgwa2lrbHZkVWxqZ1FzV01HQUZZZWtJc2dpaTZUL0lVWWt5RHdpalRUOXJDTEVLblc4b1VNTVhNaHdVaCtMNlVObm5jZ3VveFFSTS81WkN4UTkxQkxBR28yQXNNWUwxTkpYVVJLTmtIQ0FXekg4QTVNZmlweGpHZ2hXOENGcUNrZGdxTXM3TXJEaHd5a0FmSkJKS3ZhU0FJa1k4Y1NURHplcjRNTE5MT0ZjY0FFRmYzRENEU2RlWUhJQWJwV3dzeGdxSnlKNzNUN0xzREVPVko1NUp1MVNhNnpCUUlIWUJLamFFN2w5dTQwY0pIUXpnQ0pjN1BGRUZWYWNJOE03ZTFSQlNRbFZsR0xGU2k4d293b0E5WDVRN3hxUXhCTUNPV3FvVVVnWk9WQVFSaFBjVU5CSkR0eEFVTWdqMGZDQjJ3RWlWbWZ4eFJtM3N4UVBQZlRBQXc4Qk9GQkx5SXgyZTBBbEwxUWlBd25teURGRUJlNGcvK0xJSG52SXdNY2V6YnhUUWlsSHBNQkhLWHhZRWNNNVZiQXhCQ3oxRW0xNVBLT0lZVXZCRUtDQlJTQmg1SUJNRHB3VVVvY3dPVXdBUVE3M0FPS1dISXV0czA5MkxleVQ3QkR0aVBDRnMzODY0QUFWYXhTNDVGc1duSldXM2hYMGtVVXlDc3d3UXh0OHNOdU1GWlFvRXNNUmVqQStneWhWYk1JRzVaVmIvZ0VzL0ZSalJEVHBjSUpNRTd1QWd3RW5BandDRHVrQzVHQUU2NHF3Y1FDeDRHRzNqKzBsNmtJaUtzQUNwOVNvRm1zamxBT0NaNEUxQUNJckZpREJrYmF4RmdWTVlRQ2I2SVB6MmlBcUs1U2lGQ0VZUlFwaVVBVkZsT0ljUU5pREtCU0FEOHNoUVJWR0l4b3NpakVMTDVTQmFzZ1FnaEJVSUFRTVlJQUMzSGpFSS84NDBZbFpJSU1jL0huQ2EycXdqSXNGc0F2NnFBRWIyaEVqdHEwdEFHMExHVUw0c0kxR1dFQUdUNkRnV2hKQWpnZUl3bmt2WU5jZTJzQ3VFaXppSFVmb1hpa1VVUUVGSU1VUVJWUEZPV2dnUG41a0lScGxxSU1CZUtnRkRHakJFa0tnZ0FwV2dRVTF4T0Y4R09pRkF1U3dEWW5WSUJGT2RFd0xhcUNBYyt5aFQ4T29SUzN5RUlBZ1dNdGJjbWpESU1Bb0J5a0FvUUljVUVJQ2VLR0lQV3hDY0RKdzNwTXNjSVRvcEVBUnR4eUNBaFFnQ2h4ODRBTU9rRUVHVklHRUdOb2dDNUtZd0FScVZRQjRhT0dRV25pRUNuSzFpbkIwd3dob0lJY1VwT0NmWlJTclJEdEJ4U2NTVVlNaGlHSVBNVUlnS1ZFQWdsUTBJZ25iYUVNbGp2VC9oRmRXd0FSVFNNWURaTkNHUGd4VEVVQ0kzaVlVMFlkU1VDSUdteGlDSXZnZ1RBVUFBd0JJWUlFMU10QTJKRml1Q1BPNFJ6VHVVWUFDUEVJSTE3UW1QTFJaZ0RCQUlCMlM0QVFneHJrUmM5WUFGYk5EeFRtOTA4a3E3RUVFNHlCRUFJWUJncUtTd0tEYk1KSWMxbEtCWG5RakdadUlRUi9ZWVkwMnhLQU5NamdDRUJUQUIwcThRaFFJRlVVU2ZGQ0JCeEF0Q09MSVFBVjg4QU9QMXFzZVlaQ0VGOEtBQVYrNHI2UmFLSUFXaEtBR1R1d2lEaEFJQXp3aVFFNVhBc0djNjJoUkM2TGduZTRzcG5reklGdzc4akFNQmxoMkRZcjRUMnkyOFVwckRDQUJHUURDQXhSaGpUNEFZUWE2MkFRZjJyQUpLNlJBQmo1ajdTYWN0d3gvLzJBVUNabGdSZy9hMmt3a0ZNRUZrZ2lFQVFRZ0JIaVVGSy9HNVFRRlptR0dkSGdCQ3hIWXJHRWxsdGpaUlRGMnNldERHOXFCcVMrc0FCTWd3QVlPY0lDM0EwaEJBWExxUmk5TVVNYzI4TUkxUUZDRUlualIwTVFoem5wSGFNTVQyQ0Fub24yZ21iZnRiUnBpZW84bVBNS2FXakN1U2VHQkFTR1VvMm1kZzRjT3VEQkJ3N0p6R2YrTFFrWnNrZ2gyV2dZSWJhaENNNHdCZ2hIZ1FGck1HTVFoNW5EZUJ3ekFCSWpnUVBOT0FBUU9QT0FCcHVYRkVGSVFBdVk0d2c5ODBNVU1iTklIRjdyMW1FUlRoUkpZMXdRQmdBTVhCU2l1SlRBQWovZ1ZJbW9YY0lHRURmRXRTcDRYQ095VTNUNGd3NDVocW1neXlXT0FhZElRQ21Zd1kvKzhnemdBR3dDUkFCT1k0QVFLNE1VTWVNR0JET2poQkk1NFFCdmFJSW9VV0NFRGprQ0VERjVaQTJvWTJXaElIdDhzQkhCREljanZtdGVzcGlXMHNEQk8xQ0VIQmREQkVLQ2dDRXI2WnlNY0FNLy9zSU1LbTBTaEJaRlpEQTVHSUloNHVHRUVoNkFCTTNETkJqblUyUjNKT093RFlzQUJSd0FpR1JuUUxvaXRjSUlFT01JUmVzaFBvLzM3M3lOL1lBZno0QVkzdklBR2JxaEFDeXJBUUFHb0hHNE1QT0lQczVqQVBiQUFqZ2ljZ2d0eUNPTkdVTzBkRnIxNko2K3VIV1NXTVFobXBJRVZnbmlCUXRMQWpCY2d4UVFKU0FZQmVLRUFhendBMEErL3NTTm04SUFVak1JWUNTQkFBaEF4SFY0QUF4akhoRFFBYnBHQVhHQmhmVmovd0FJRndKRk5iZVpWR2hpd1JBSCtFSTRtR0NBUUpWVUNGL1RIbjQyUWt4ZmVTVVFVWHAyZC93R3dCYlR1MTBSb2tJWkZNT01RNTVVQ0hSSndBbDc0MHhGOFNBU2dUMkJDUFNCQ0VYcjRSamJvYXcyZ0tJQURzRUJDRW00QkRGV0FRZ1oxa0lZdk9KRnlGWUJEQlpiUTVrbXpHWE51cU9FZWFNaGhTZXNnaWxPSUFpa1FXZGtEekxrTUZobjk4ZnZBd3lMc01BSnpqTUJMWVpMek1Ia3hkUmtQRThkQWNRUUhBSDJFUlBRaEF5Zmd3R3VzOFR4Rm5BSmFIUWxxTUFoQkJtTndBeGNVd0FJR3dBRU9sZ3BBRFRGSHFSb2dFQWpob2xUbWY1aURJYmlBRVhLNlJSRWUxa2VMSUwrUFFVeStDaStvOVRSRzhJSkR5QUVJZTl1RS93NCtvWkd0YnJqaDFsaExtV3RzalUySVFncUplTUFoOGtDSXFBekRkdzZnL3poU0FJRlZGQ0RjODZNQ0F2Z0lVMVlBZE5BTnhDQUEzMVlBbHBBTEJWQUhlekFIYzVBUnNmRUViOEVMaTdFTTAvZDQxamNDaWlCNVRNZDlTYkFIMjRBVVFNQUlMcEFObGpGTVphY0E1bFFCeTRCZTY0QUt2REFITE5BRDFyQU9pZEFGZk1BRFFlQTdaMEVGd3pBTTlQY0Y0WUFMdlNlQVZTTkVRc0FKMVRBQXdYVVBCcEJYRFNoejVBQXRtMUFCMjBBa1QyQU9QUUIwNEtFUGtQY1ZiMEVKZURBSTd6RUlnMkFPNDZRQXlXQVA5dUFDeC9CWTVuZCtOb0VLZkRBSGFTTUNYS0NEKzVBSW0xQUxPS0FZeXdBSlFSQUFLRUFGaERBT09rQVBGUCt3Y3R5QU5mMlFBK0V3QUM1UUFJTjBUVDZFVndVZ0Jta3pUSEtnQ0c5eENGQlFTWXZCRGkzU0lyd2tCekhBZlV5SEIrTmxEa2d4QkFOZ0M3T0FDOUlRQjZrR2d4dFdHUnd3QjZjd0krWUFDdWJBV2N1Z0Q5MXhBbzJ3RGtEZ0NRMkFBbmxBQmM3QUErTFFEWEFJQVp3UU5idWdCbVZ3QThKZ0FEWjNUWlpnQ1UzUUJDVjFEMDV4QUZwb2dlWkFCbnRnQ0ZMQURqYkZBZi96QWsvUUJ6SHdJMTNCZEMrUUJGelFQTGN3QjVVd0FOMXdEMldRRFRaRkdjdkFBYUl3QjlEaUdjSzRSQXVKQ2t4WEJhS1FCbUNBQWovd0F6aEFCdTB3QVBZd0M3dFFNQlRnT1lGd0R5NVFCNTV6QXlVMUN3bGdCRUpRQUNGQUk1c3dTWXFRQkQzL0FBVTdKd1hMRUJtTmR3Q2lKU1JvdUJWcm1BUnN3QUh5d0NlbllBaUdnQWpoVURCZDBCUEwwSGliOEhvemdqYm1FQUF6b0pBY1FBQURnWUdKZ0FPaGdBSlM0UXpqY0FTZjhBbGR3QWhvSUZ6SWdBeGU0QVZTaUFWNWhXQjFVQWdZSUFsUzhSQlM4QVE0U1FaeklBZjh4VVFleGdaOWNCTEtNUWlnVVJiL2VBV1NZQTVRMEMwVU5nREhrQUR1NEE0Y2tBZ2NBQVN2OXllaWNBQlFjQWhrb0FneDJBZkpxQXRzVUFIZWNRTFA4QU5VZ0FNY09acUxBUUdmNHdKU1dBZE5nQVkzZ0FVc0NRK2VVd0Jad3drTHdBd0JVQW1UbEFTZ1FBUkVvSk0yc1E1dHdCUCtjUUFCb29ZcVpnNXpNQVJBc0F0L1FBNDZZQVNOWUFqeFptclMvMVlCZTRJZWl0QVRUekFJVmFDWWg5QU1yc0VMYkNBRDZGVUJ6T0FKTk1DUnRmQUZ6Y0FHaVJBSDZuQVBnVkFHZ1lBRmRiQnVOM0FEdWxrQUFrQUJaUkNYV05BUEN5QUNOTkFIVXRBWlgrQU1JZ0FGUE1WOEhNQUFEeUFIaDBBQzNXSVFjbFlCMzVBTGFrQVBxMkFMaGlBNVhIQUxsRlFaQ3JBSE0xSUxmY0FUbTBCZXRZQUFnOUFJSTFBRnhCSUZYL0FGeWdBR3B2QUR6RUFEb0VFR0tYQVB4Q0FKTHVBQ2IxQUhOOUFKQm9BR25YQURBMXBOQldBR2pKQUFVeEFJdVhBTlA5QUlRREFITkVJRlNvcGU3Q0NZMjhBRWpmQVcwbGtXQjdBM0ZRQUI0RkFJdThBRVBpQk1XN1VOZHNwRWNxQ0hmMElzNjVBRUFYQUFST0FBQWYrd2E0YlFrNG5nQjJBQUJuakFES0dnYTh4d0JJY2dDd1pnQkJNUURWNXdBV1ZBREJQUUNYSHBBamVRWUZpUVNOeGdaemZIQ1RRUUNnOWdDRFNpQzgrQUF1YTBNcmZoQi84QUlselFaZWZsaGxoUU5WbkFLUmxnQnJzQUI1ZUpYcGF4RFZEUURwREpCVUR3Qklmd0FqOGxBbFJBQlRhaUFQcXdEaG1BQWdnQWkxVEFrVGh3Q0ppZ0JKTHdCdEh3cVcvZ0FvR0FBUmZ3WEdoQUREZlFCQ3A1QVhHUUFBTVFDQzRnQkdkZ0NuNHdCS0RnRENnd0RjL3dHbklBYjF3QUNHalJDQlVoQXdkZ2dWeGdDNnZRQ1dvd0M5eVFLK05ZQUl3VUJnSmtHYThIbWViUUZGQmdEa3VCaU5JWUNuZ3dVTEQ1REo2QUFCdUpBMFF3QjRCZ0MzTC9HVTF2Y0FWWkVBZzNNQUhjcGdVcTZUa3E4QWdROEEza3dLOHFFQWhwRUE5NzhnTUY2d212QVpwY0lLSXg0QWNPNjdEZTBDM3lNQUVVVUFoaFVBZjlnQVVLcUlBN2xGZFkwQVZsTmdka2NBaC8wZ1BLU1NOazZacWhrQVpVQUFacEVBQUlnQUNtZ0FBb01GNXpVQXBHNEFYdTZnVkdjQVdNWUtVRlZnWUdrSEs0S1FRUUFBRk5JQXVTSUlXK2dBMm1ZQVduOEFNdTJ3Q3ZSQVptZ1FjT2l3M3ljTFVXd0FRNk1BRzdzQXQxTURYZ0FEL2dFRDhOOXJvbDlRZU9vQUJrNFJsUFVTR0NLQUt1eVpFb2tKRy9Dd1pxT3E2ZzBBemRNQUZTbXBJWFVBZEdBRTVvNEFKaGdBYWNvQUlwVndCR1FBQlRZQXhLWUFESUFBOSt3QXlzLzhBQ3cvQU1sOEM1RmJDY2cyQUhWaXNQS1lBTmpZQU5tQkFPa2VpMXU4QU42OU5wNHlnL0NtZ0p5QkJsUU9BREJ0RVpBYUFaWDBBRUFUQ3VlWXVJVG9BQVZNREFyamtIZWxBSDZrWUhPd3NCY2FDdWRWQUhWcW9GaFJBSEtnQUIvWkFGQkdBTE5zQ3B3bEFBYThBRE82QU1lZkFNZDNBSFd6VU9VSUFIckJBeUlkTkF0bkFCVitaM3UxQUlDMU1IQXVCa0t1QnRsblpTRzVzRkNqQUhTYkFVNDhVRE9KQmk0MXBLR2trREtEQUQxa0FDS0tDUlVDQUt4d0FCYjRDOGtzQUlqRUNxUnJCdVdsWUhjQkFIRDhBSVY1QUFaOEFBT21BQUdFQU16dUFNTzhBS2VZQUFXM0FIUTBFR1VQQnZSUlZlMkdBTFpxQUc5aG9HdTlBRWhmOVFEazJnQWlZVnhIOVFVcFl3dElVa2N4a3dCSHNBQ2hheWthK3BES0h3QTZGd1luMUxWdFh4QlFQY0RBclFCMTdncy9kd0QwYkFDQTBLQVhWQURMT0FCaVdGZXNkd0REcHdEVmJRRFRpM0FJU0FCMjRBQTFrTUEzek1Cams1RFR2QUFLa1FNclpBQjNGUU5hbkxQaG5NQ2VZbUFOWmNUUVI0VXZYekNBV1FBMGxCaWs3eHhBZnNtalNBaUtFZ0FpeWdBSW1RRGVPUW44MVFBZG5nQlcvd0JrMXdENFNiQlY1Z0FKMHFDVEUxUDQ2UUFXcnlEb2dRQWJaTUNzRlFDOHB3eDgrd0JaY0FCSVl3STNld0JTdkFBR3RRQkdZd0FITjFsOXlneUUwd3ZaWVFpU2ZGUXozMENBMm1BdkZUQU4rZ0FOQktCamJpMGdHUUdUK1F0NFQvUWdYaklBck5vQXZPb0F0RHNBd244QWx4Y0FIMWJBWlpjQUhSUUF4b2dBYmh3QWdRY0FYSGNBWEZvQ1FkMGdzd2h3ZnBIQXpLc0FHa2NBZVhzQTAyK0FWTFVBUVZEUUsyMEExMDBBUUVBMFRjc0xvNThORTVrQU1Dc0h0Q01HVlRoZ0h4OHdoWU1JZVkzQXlpaEI2aFFBVkV3QXhaL0FNT29KSERvQXk2b0F1aWNFbmZZQVlUWUFhTmJRWndvQVJ2QUE5WWNLVUVjQXdFY0FKVElBdE1JQU85a0FFUlVBQ01jQXBnWUFWRE1BelRnQTRPN2RVc1FBT3V3QUFyQUFLYVFBY1JNQURoTUFzWGtBN2w4R2wxVURwaHNEQU4xa1BtRm54VXd3bE5FQWMyTVFSa3NESGowTHRVd0F3aWNNQ2hVTWM2TFE1WmVFbHhjQVZ4d0FqZi8yQUUyMzBDMVRCWFdBQUJ4OEFCZlpBQW1EQUtvM0FPR1FCUUJWQ0N5dkFNcUdBSURxQU5HMkFIYldDRG9lQUs3ckFDR29BSkE0QUl4NURiNVZBT2NSQU9iQjBHUTl2SUtzQUplaFhFaGNRSjRSQUhUV0FFSitBZFJORU1tK0hFUkVrR3VtQUZSMEFKbEhBS2l6RkFNL2dOYmR6RlJvQUttVTBBVnpBRm84Y0xHZkFLU3ZJS3o0WUk5ekFGUTdBTjQvQU1IZ0FFd2ZBTUcrQUdEY2tDcHVBS2dLQUpESUFKRVlBSWROQUpFRkFPeTZVR0ZOQUVPYUFHM0NBRXVxMENWMlpwS1AwSGoxQUh4MUFOeDZCd2xGRVU1L0FDQjFBS2htWm9JNjRMbEpBQ0dVQUFHOGJZa0IwRjM4QUJ4NUFOcUZBR2NGQldBNEFKTVZBS2dJQUlHZi93QUdIS0gyNVJDNTd3RG9Zd0REQmdCMnd3QjRSd0NVdWdDSnF3QXNZUUFZREFDSVZ3RE1oS0FRWXd2ZG5JRFFuekI3dFFPbW9BRGdwNjRBUVRCd1RBQVNiZ1lmb3hBNlVRQTRGRENkZXdCekV3Q250d0RkcXdDQllBQ0RxMURqQVlCUnpBQWFpUURYRmdCbVYrWTcyZ0F4MHlBNDVnQW9DUUFVM1lsOThDQmNQZ0NTbkFBcGRnQTFMQUFvU3dCUnZ3QkN1Z0NVNmU3V1lBQVduY0JEZUVOZHd3U0lYUXRlMHpQOHdWQnhSUURtRndCWDN3QUFTZ1UzTGlQSXJ3V2pNd1BTSStQV2V3QnlJK0RSMlFERFl4bFJ3d2xSWEFEdGtRYkJsZ0RHMVE0NERBQjRxUURNa1FEUVVRRGZxVEZuT1FCeWh3Q1M4ZzZYeHdDcUN3QWREL3dBWHJ2Z0s5NEFlT1FBQVhNQXRCZlFHNWpUVnFzS0RlNXZPRlVBM2ZjQXh4WURxelFBRHM4SERmc0E0S0VBUE9Jd1BheFVzM293dk5RQWxZdndpdnNBZlR3QW9TYnhtSmtIR2JiUTJPMEFhT0VBRVFsUUdBWUFJNE5nVWxSUTVzWUR4OVFnV200QWFYemdBK2dBTkxZQU9Hc082WWNQT0F3QXR3Y0FGbVlBYmg4R0NGQUFGUDJUUzdZREFYa0FCZC9Ba0VBQWZIWUhXb2NBTFpjQUlheEFkOE1BTkQwQWFsSUFPdllBWE9ZQUZ2OUE0aFFBays4QVdyM3d1VThRMG5nQXB1UDFyTkV3SHVoV2h0UUFkNVZRQzJ3QVluVVFtSHdEWlVjQWVDRUFCM2NBcFU0QXFhTUFjcnNBTFg4T1NJd0FzNmYvZ1hBQUVKOEFrSkVBNU4vMlA0UUgzZ2NGQU5ScDhORDFCakFzOTFuNjhJV05VdWUyTUJ6ZUQ2SDlRTWl6QUpKV0FGSVJBQytjQUkzakVaZlFBUWZYajFVZERHMFJBRkdjZ1ZZRmhnaGFGS0pFaUFDc2FEQ29wNklpN2hjT1pLSGdzR0RJeEZRRlN5QXE5UHgrSlVPNUVnd1pWQ25JN0J1ZkFOVHB4UDM2NWtxNkRBR2k5VUJQZ0FLY1dIanlKUk10aHNrdkhPeXJsM0tXYm9Xa1FwaEM1ZGZHSm9tOUJGWHcyd05TcU05ZmtnUXJjM0JUQllZZ2ppVktWR0pFUUU2QkVnZ0tkNG9ld29jOVdJRUlNVm1uVDBBb1RvZ1FJRjJlSWM2M1ZzeXBVck9NTmRlZm10MmpGOVl5dXc0M0FpR2E4SGZkb2diU05xMHlZK1IwTHdXbmRFeHA0UUtTaGhSY1NHVFA4c1NUTzdIUHVXTGNHeExBUHFHSUNIQmR6YUFyNEdzZURUcUJHT0FLQkExYUpTTDlTbExSdElCRnV4UXFTT2tvNFFBd0g2Q1U2Q2F0bXlaUWwzNHR1eG9CeDZqdVhBSzlzSmF5ZEVuOTV6Wklhak5vWklnWWsyM2lsbER5c29zV0lScDE1SlFSdEozQmtubEFnWTBZR2NLVUJBd1pOZktGQkJDT1J5NktFSHVKNzdvUlllZUtqRkZEdE0yUUFhTW9ZSmlZRVNaSW1ETUNBVTZNT2FDampZQnhVT3JFSGxCQUtzc1lZRGRzWmlSNEhOT0VEbEV3TGFlTUFSUFdRQVlwTVpabmpuaURZVVVLUVpTdlM0eGdKbnBubW5EMEJpd3lPV1dJWUpJZ0JVRXZpR0JVS0NDS0tlZmo1RVRna1dRS25DajBacU9SRVVFV3FweFk0R1htVC9BUVVRUW1wVWxpbTZPYUduZ1ppa2owY0Zsa0VzU2NRcVdFZUJPT1BRVDVGU1NwbWhqUmtRcWlLR29ZYXdvSmt2VkxOQW1WRXl3T1FhUGtySko1ZDZuQWhDa1U5a0lHUVlNSnpZZ0pOSE1OQkNpd0k4T0lXSEt2UUlOSUJhQ0dHR0NrS3VnMkdNYkpsZ0FvUnZHU2pDRmxsT3FFRkhJSUJncDRhZmNnVENtazZYcVVBc0FzeDQ0d3BlMmpqbkZSNUwyY1NhMC9RUVJaUVhLSm1CRFdWQ0dNVUtiWG9SYzVSM3psaGxDU2RxRWFVTkZ2Snd3QWxZRmdBSFJMWUtlSUVGRWN5UnRwWUFSSUNDQmxOUzlHU0pFZ2dCUXg1dkcxMEJoRlJzVUlLbm5vQ1l0d0lwMHMyeDAzbVhPY1lJQ013NGhwY3IrZUJsRXpZRWttR1RHR1k0LzJJUEdTaHA0NVVZUXFCa2xHdVl3T1NkUFNJcFlJRjJnaEhsMlFDb1FHQUJaSVFSQnJreURPbEJoRU1BYVdTdWNYcjQ0UkpuQ0lsbkNWTis4TVFQSnRaZ0FqREFTbGhCblRjSW1FK3NvVFVEYTUzMXNqQWhtd0VpUUFXSVBpbzQ1NGcrZ0ZERWdsU2xrT0dJRkVMUVk0aDNaa2dCRXhNUWtXRVVUS0lwNEpoVGdrQ0JqRHdDQ0tLQldNQVJCa1JtSS9DaGh5L0kwTnZRRVoyNTQ0VmErTUJtQXpzT2w0Zm1HYnNid1pZQzdxSERCUG5HQW1JWklUbklob0FFdWtuZ0FRN2NHWUFSQXFSUVJJRWFaT0Jqa3lPcTZFUFRJVlJCUVVkb2hoVm1zQWRLSUtJWGZCaUZFZ0toaFY3VXlRbktFSWVibktDTzQ0Q29BUEI0Z2lGWVFQOEVNamlpRWRRaVFnOVE0QVpSMEFBUW9wREhGZzczQ3NWaElpVGVLY0VJM3JDS2V3VGlEZDBZUUFJRzBBMDYyT0tIdlREQkF4NUFnR1I4SXc0RHlBWXZ6ckdqTDFEQ0VUSm9nN3lRSW9QVkxZSVBmUmhGcWE3eGptdm9JQkpZeUVVSjhoQUVKNEJoV0E2QXdTUGtoZ0VNRk9BWFF6QUVGSWd3amlmb2dWb2ljSVl5Um1BSVU5akFBeG93eFNYODhBcDVOQW9FM1dFQUNQQlFBZ3IwSXd4MUNFTVpKdkFHY3BpaGN5YW8zZVk0K1EwZDhIQlN2T0NGS0VxZ0IvaVpyZzhQT01jZUxNQUtWQ2hnRktnd1JBamdvSU16S0FFRGo2REJNQkRnaEFZRWc0M0N5TVhjNGxpQVJoaWlqa1Q0d2hOSVlLZ2ZoS0lCcnpBRUdEWmdneC8vZ09FUzIxdmNEQnZaU0J5QTRBOS9LRVFZQ2xHT1dVREFDQmVZZ2hub2NJVWV1c1FsdHVoR01wclVCMUhzb1JSdG9GcVd6bEdGYU9uaEhDSEl3RGtpQVlGUmpFSVNCWUJBblZEZ2hDMW9JeGJGbE5zTjJQS0xPVURCRU8wZ3d4ZjJjQWdhS01NVGQxZ0NJQXp4TWhJUXdoTU5vRm1qR0lBSjd6U3FCQ1VZQkFoeTBJOUNwQ01kWlpqRkJOUnBoRGpFd1ozZCtNUUFqbkVNVzVnQU1mWGhoU0txMEF4UkdDVXBSM2lCRmFaUk5Wb0lJeHFZc0FJVGJsQUFKckRBZDBHQWdUUnlZYnhjd0xFQVFzQURHVWpBaFRtUVlSTkFHSWN6Y0JDS083aWlFcWU0d3dZT0VRQXdlTUpiZ0FtTWR4aVFpaEtrQWc5ZkFJRWsrbEdIblpiQi81S1gvQ2s3eldBR1JrUkdDVDU3MTVIWW9ZZ2pQQUFJTXpnRUFiLzJpamFNWWdIWGlNRWV3TGNBNnFEQUxndXdoQXJlZU13aU1HTUVGampFSE5oUUFTQ0k0QURycUVBUzduQUVIbXhnREhOQWdTbnVBSUpGYWtJVEh1Z09KUklMZ3BrT0FodTA2QWM1SlZzR05VeEF2T2xVWnhheUlOUTNKT0JjdlBDSklxU1VKRDVrQUZWK2FBTWxiRkFLR2NSQUJvb1F3QUljZ0lCaUlXQVJhYjB0UXlLUmhrV2tBZ1RZbUlNVU5yRUhFZlFCTElZNHhCNVFzQVFHR09JWjJHbVVCelJSQk9yR05MR0luZWtJeEJDTmNlNUNEWmFVN0FSNE9vRjBHa0hHa2pBQldYanhpbVVzNHdHa05LSWpBQUdJVndCaUJqS1lnU0s4c0FDTjJhbFlNUC9BQUVXUEdZbDQyQ0VFSHJpR0pyQnhpQ1NRSUFselVNQVEyREFFS0lCaENYNDR4VFB1Y0FjR2ZQakRIdlpPS2lpQjNabW1JZzBqR0lFbWxFQ0JQK0JpRitYNDduZGg3Tk5PTEdBQTVUc0JreFNSQVY2Y3FzaUFFTmdtMnRDTFh4VGdEQnB6QUJVMkJvc2xGSk10OElpRUhkeGdnMC9id0FaRmFDUTJHbkVJVVVpaEQzSTQxQkprd0FJRVhPSU8wL1dBQjBDc0NjT21nZ0dDR0hGaTV6d0NjZEVpREhtbXdDNDZFUTJkZHFJVFplakVMQmFBam01d2dFbm5rZ0V2dHRFSEtZeEdFVko0UURlSUFROUpVQ0FlZVJqR01GRHd5dzBjMHdDa3NNTVlQajJHU2NSN0VxTVdReW9zUUlKL1ZPSVFWSURCQnJqUWcwTGV3ZFpGSUxqL2g4V2dnVnd6UUFPcFlEakRTNEFIT29QQUE3SjRReDF5TU00YzFNRUxHNmZBRzRxd0FHaGdJaG1KcU1BUTBqV2VCN1RCQkw5UUJ6R0VnQXh3VUVBRHdRaUdCVjJobGdXNG14UmpHQU1wSnRHQkRzaGJrQXh3VGx5SWdJTnRzYUVXWUxqREZnWmVjRTJJWVFVYW9IcElOS0J3aGk4OERZajlOUjVTTVhGeVRDQU0zQmpuT0NsZ0MwMHM0QmUvR0lBNzNLRUlkNWpBSGQyUUJadVFzU3hMV0VJWWZ6aURJR2lBQUJnUUl4YWtjQU1wRE85elVnQmQ4VUVudFFXY000aGFrT2NJaHFEQ05KcGVoRkdQV2hQWEVFUG5GYTd3ZzFkOTRRMFhSQ28wa0FhSTQyQUVlRmlrRFdSQkN5V0VJUnEwa0lVU0pyRUF0VWRpQVd4YWdEclUvMkdBaGdUZkY3NUFCdTRKWDQ4ZDdDRHh5dThBT3RDaCtIamJRQU9teHNZZ3VGQURLYkJoRGxRd0JReTJRSERNM3pycVUxZDRZSEE5ZFExUVl1RUtwM3I3QlNFSTFFTWNEL05QeFhRMWNZWXoyT0FYdEZDN0pPNnhBQmQ0QkMzQWdCc1FCbUpBQm5WZ2srY2poWG9naGVSN3dPYmJnZVo3UHFDRGhuanpBTVNTaHhjUUJUbUFBamFBQWhSZ2hTMkFBWUlUdFZyek1PbENQK2xhUVEzUWhLdDd3ZmFqdXM3VEFFR2d1bmpRZ0J1RXYxUVFBK21pQmYwN2cwbklCMEVTTlJzWWd5TGtPVGVvaHdaOHdPUkRoeVowdmdsVXZFaXd3Rkh6QUFiQUJteDRnWWdRZ1RUSURoaklQS2l6djRQandSV1VyaG5VQURHQUJCN3NQRFdFQkQ4TmdBUTRoQVFQc0lNNW5NTVFzSU1pc0FNYmdBUTdpRU03K0VNM0NFVERlMEFuWk1JZGNMNURkRDVGWER4b0NEcFIwNFExY0E0c3hBRktkSU1OQ0FnQU93PT1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUdRQUFBQkxDQUlBQUFBSmVyWGdBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQXlCcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TlMxak1ERTBJRGM1TGpFMU1UUTRNU3dnTWpBeE15OHdNeTh4TXkweE1qb3dPVG94TlNBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3UFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdklpQjRiV3h1Y3pwNGJYQk5UVDBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3TDIxdEx5SWdlRzFzYm5NNmMzUlNaV1k5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5elZIbHdaUzlTWlhOdmRYSmpaVkpsWmlNaUlIaHRjRHBEY21WaGRHOXlWRzl2YkQwaVFXUnZZbVVnVUdodmRHOXphRzl3SUVOVE5DQlhhVzVrYjNkeklpQjRiWEJOVFRwSmJuTjBZVzVqWlVsRVBTSjRiWEF1YVdsa09qSkJOa1ZHUkRVeE9ERXlOekV4UlVGQ1FqYzRRakZCTURjNVF6ZEJORFE0SWlCNGJYQk5UVHBFYjJOMWJXVnVkRWxFUFNKNGJYQXVaR2xrT2pKQk5rVkdSRFV5T0RFeU56RXhSVUZDUWpjNFFqRkJNRGM1UXpkQk5EUTRJajRnUEhodGNFMU5Pa1JsY21sMlpXUkdjbTl0SUhOMFVtVm1PbWx1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2TWtFMlJVWkVORVk0TVRJM01URkZRVUpDTnpoQ01VRXdOemxETjBFME5EZ2lJSE4wVW1WbU9tUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZNa0UyUlVaRU5UQTRNVEkzTVRGRlFVSkNOemhDTVVFd056bEROMEUwTkRnaUx6NGdQQzl5WkdZNlJHVnpZM0pwY0hScGIyNCtJRHd2Y21SbU9sSkVSajRnUEM5NE9uaHRjRzFsZEdFK0lEdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6NUhmd3g2QUFCR3FVbEVRVlI0Mmt5OEIzaGQxM1VtdXN2cDVmWUMzSXZlU0lKaUZ5bUt0RVJLb2tSTGxtUkZjbXpaamx1Y1RNcGtFcytMMC9QNTVZMlQrR1hHcVc4bVBaTzRQVHR1c2hYWmxpeFpFdFZJaVdJblFSSWdPaTZBMit2cFpjODZrUDBsSUVVUkJIRFBPV3V2OVplMTE3NzQ1RDIzWDV1WkM0S3cxdXk5NS9nMldhRGZlTzdHeEhDOEw0VTJXc3ozdUZSQzJxd1pIRWZ2T2JKRDE3aUxOM3I1MFdPOTlrcm9PUmlGNy82cEo4YjMzdk1Ibi82MWR2blMwUGdPdjNxUnMwb0lVK29GR0dHZUk1eEFLYy81dmsrWXozSEU5eGxDaENGR0VHWU12Z1VIRE9IQUp5akVCRk1lZm5HRVlFTEMwUGN4SmhMSEk0bzQ3S2QwUlZaRmh1QUxTQkFrQk4rRWtDQlNRYUNCSDhJck1jUXp6K2M1ZkdIRmZXdlpteG9mdkd0UDRmek00ZzlmbTl1eDkxQzlYbXV1TFh6Z3ZVYzlUdjN1YzZkcUcvV0VydWlLc0Y1cEl4UWlCUGNROHFyY045QXY4ZXJvVUYrOVk3anlTQ2dQb2NZckUrT1oyUGo5TnBtbVAvdit1eWZHOG5QenBVUk15MmYxRTRmRzRQSmRPK2oxN1BXeXVYMDhoNWc3UEpDNWZkZm96SzMxc3hkdWpBN2tHWmRNRjRZbmQrMVA5L2QvL25QLzd3T1BQRFk1bmtzazlNdHZ2NkhoRm5VY0dpQ0o1eVZWa0dPQ0xJc2lMMU9LT1o2bmlFTFFDWTNpSVFxWU1DZDBBdW9ISWdUU1FiN0hlQkl5R2dvaUozQVloMzVvK3h6MWRGMUpwRktTS2ttU29DcUNJaUtLZlI1K0hoUGZEbDNQcHhCbHdpRWlZSUVMUW5kYlZwZ3FhbFRnWmxZNlYyK1dZd281ZnQ5eFJ5b1k3U3J5M0xvWlZodVc0TGNRSmh2VnRzUmpYVUhWSml3dDZ2UzhXcU90NjVJU2o0VU1HWnRycmNwOG83cDg0L0xWUnVueWdkdVBjRi81N3V1amhlUytuY016QyszWlpST2poYzFLNStaOFpiQlBFNGcvT1pKNi9lenl6a2s1bjFJWGw5ZDJUSTgvOHREUlAvdUhNMzBPK2NESFB1NTU3cllkdThMQWZ1dnNXemN2dks3Wml4SUplRVhrYUNqeW5NZ1RRaWhqeEFzOUNrK0dzZTBIWnNmMmVraVBJVEhGUzhuK2JHR0VFRUhRZEE2U0VGRWlpSkJzOEN1QXRQSWR6N05jcTR0ZGcrY0NFbHBoeUZ3UGlid2dxeHdtb2U4R2J1aDVSSEJEWG9GNElUdUV6T0pGZ3docERjV0ZydUNoa2labnM4VWJiLzJ3WnVmdmV2ZWovL0Q1LzM3d3lPRzl0eDg4LzFKRjVZS0ozY1ZyczJXNDdtM2oydUphVjZNRVFuOWpabWxoYnFtL21LUjhlbUM0YjdQRStGVEtkY3phNmxrdW0wb2tFN0dweVlINzdsYis2QysvODlUc2tpQ1FPMjdyMjZ4YlBtSXo4NlZISHp4NitkS1ZXdDM4TDU4NGVXR20vTlZ2dlBHZmYrM1ROREhZckcvK3paOSsvbmYrNkk5eWhkSHpaMTU1NWRMWjdVVUVDeTRMU0lZVW9zaGpLSUJFd2E1djIyYmI5eTNFS3lnM1dPZ2IyVm1jMnBYTUR6QXNkSHVkWkRxWHpxWTdyWXBuMlNIeXdqREVVR09FUUpGQ2RvV2VEVkVMbkc1b2RibkF0RnFsWHFkcytZNHN4c1M0Uk4yZTZDTW5KSENoMEVlRXlvU0ZRUmlhQ1BFYzNWbms5a3prZWx6cUw3NDRxeVh4K3RybWtRY2ZLMTE1ZFhWbHpmVUpEaHpMSVpxcXlxcDA5T0NvNWQ4VWVWd3NEbDlmN2xrK0Y0cUMyamU2MmE3TVg2K2tpMXd5TTZvcS9mU0xmL0hMWjYrVnZ2ak5VenVuaXBYcXh0N3QvYnUyOVYyWnF5MlZXZ0pQUGJ0MzVNNERpaElYZVgvbnp2MDNGeHJ2T3ZIRTlONDcxaXFOci96VC95NE1EdTAvZUdqKzFzTHpYLzZjMU4yTUpRVlZ4akZWQ3BuZ2VMN0FFY0MxNnJMdGRNS0I4ZnlCazQ4ZGZ1L1A3Ny8vUTl2dWZGaEpEV0FlcnkzTWZmZWYvK2ZVcnNsemI3MWh0Q3NpSHhpOXVtazB1cTFxdDFYdU5FcEdwMjdaUFNkd01hOEo4VDRheTB2SmdWUnhwNTdvWTU3cHVXMUJTWEdDREVnWUJnR0RJR0g0VElrSzJIRUFNQU5lOG15VGQ3c0QvVWtUTXRWMjN2WFFCL3J6Q1IyM2k3c09yYXhXWjIrVmhnZXpzWlFNc09IWVFibHUzbm40d01qa2pqdU92MXZ0bTd4NWN3NHpEb0lhMCtXQmdlMHJhM1U2TVpKKys4S2NaZlZlZXVOcTZBZGg0TS9Pci9HOGtOQ0ZjdDEyTGFZbDB3KysrNEZTYVhtanJiN3ZpU2Z2ZU5leHYvM25yNTgvODZycnU0UVRXN1V5UnU0clgvbnI0Z0JPWkZJaUZBUEFFTWFTZ0d0clJyY1JqdS9aK2NBbmZ1V2VELzdtOFA2VFFxeVBFM2pUYW43anozOXJkZVpzWW5DMFovWThGcHc3Y3dieUtOZVhYRit2T0ZhTDQwTExiSGgyQjJvVGNvMTVkbUFiWnFmV2JXOVk4T29RdU1TQW1obVcxUndnbTlQZDREaWtKNU1BZ1JBazEvVXhINU5VM1lONEFYVndBUHBlSVNudDN6N01TL3pDNm5weTlOajVTK2ZIOTczSE5UdVZwZmx1MXlxVk81MnV3WHhiWUxabjEyWm1ybDg2L1ZKNy9mS1IvVHNrTlZzdGI4UVNxUUJ4Q2NtZ3JoODRQbS9ZN2ljL2RESmZuSkppazEwckdNbjZoZjVzdmRGVFpIeGcvODZYVGkveWduVGY4YnYyM0hIODVkTVh6N3o1NnNuM2ZpU2VHOTZ6Wi9xYlgvemJJUENuaWg0S09zd1BQVGRNeGVYQTdLN2Rzb2VudHovK3FUKzg1MmQvTnpWMnVONXFkR29idmViNmE4LytxNTdRenI1Kzl1YmNhbUV3M1plUHZmRGltVjI3eGxTWlBmM1VNOVZtWlhBd3dmT3UyYXNDeWxFT0FTQ0dnUmY0TGtRQ1NCSkl5eldhbmZxNjZkczBWbFRUSTdIMFdPQlpUbmRUajJjQjhtelRRb0huTVU2S3BZQmhmY3NnRUs4QU9XYW5rQkk5by9ueW1Vc24zL2VwL3JGRHAxLzhWbXR6RlZqRTlVUEtyR1BIanBDK3d6NmZ1WHoyZkx0bjg0SVlNdXZXMVZjOHp3N0R3RFc3aXNUUlJ4ODZmUGZ4RXdjUDNmbnhqLzFjdFUzZVBILzErTjEzV29FZ0pncS8vdXUvZGZlZHQ3LzR3bk9aNHVqTWxadXlyTi8xN3NkKzV6ZC82K1ZudjdXMHVMN3Rqc2VPdjJ0cTU5NDdibDQ1UTlyWFFpL0VqSUxPYUt4VkVlRWUvSVhmZSt6LytndGxhRityWGplYW03YlZBUlNyVnRlZmYrYnBkQnJnUmg0Y0g1cWFTQUx0Wk5QcGJDNHhOTnhmMmRqTVp6VUFVRjVndktEeXZBYnlnU0dmd1VzREVERVhWZ1V3REpnZVpBTlVnTldCbEtoeHNYeWl1RmRTODA2M1RKRWpTa3BJV0ZSeWhrMmtlQ3ladEhwZHdESFFLSzVseG9YdzNrT1RMREgxOW1yWW5IMWVkRXFNY3RrNG44bm9HM1hqMkNNLy80bFBmKzdFbysrOWV2R3RsVnZ6cGRXeTYzbzhZWXFpeEdMNmVtbUYxaHR0anJVZk9MYjdYNzcwemFlZmZSMzd0Y1dsaFdQSFQ5cTJuKzdmMFRWYUtjMTczL3VmMU5QamI1Ni84T0twcytPVFl4OTQ4b1BETzI1LzZndC8rdjJ2LzkydU80NXhYcnU3ZUZxa1BNUytzbFRlOTU2UC9zd2ZmbnZramdjcjlYWjdZMkY1N2dMaUNNL3pzRkFYWG50eGJHcE1GUDE4TnZIcXEyZXJsZGEyYmRPSldJNFF6blhkbmJ2R0dQT2F6UVlKQlVKa251ZWdqaWptS1lWUGdmNFFpK0xsUWdRUjgxRUlJYU9neHd5QXRtNWR5WTdIQzdlQkJFTjJSZEZqRUZwSUlnYWxHRkJOVndET1BNK0IxNEM2QnBhb3JzMVo2bzd5clRkTWVINkpHeGpNd3NMQVMzWEtOOCtkdi9HdW4vN29rZmYrd3N5Rk03WFZlVlZFbVlSbzlveG1vNnJLRXQwKzFuZnQ1dXJ1cVV5OXZIcmwrdnpuLy9oVFAvM29QYzg4ODhPMzMzNnJ1amI3NXVsWFhjODd1R2NialEyZmV1blV0V3RYb2ZMdmZ1Qit5SEEzbE1kdk8zamhyVGV2di9LMVhhTzZZUnQydC83azczOTVlTStSamRJc2xmc0MyNkkwck5YTHM5ZFBEeFFIUE0vMzdWWjVjNzF2Y0dwb2JCY0lpMXhhVTVTdUVaekQzRndZTHBqZTVZNDUyK3RVdSsyMWJCSnl4QVkwOUh6SUN3K3pTRW1CT0lPb2dhS0ZTR0htTS9pTlF3NFFDd1c5K2hKaktEbHlpQ3A5Zm10RmtaakRCTmZvY3FGdHVVaFVWWWlyMGJIZ1ZVekhMbXBzOTNpZk1IRnlZL0VzRGN5V0ZkYWJScUhRNXh2TmVubHQ3c3FNYWZrLzkvdWYxV243OUN0blFQdnFxdGp0T2dKUS9ILzY0SjFyNjUydlBYMkdJYTVjcnBsRzUrS2xTMDg5L1ZLdFZ0MDdxV1ppNGplL2YvYkEzc2tkZTQ2VTJ0NTdIbjNvYnovLzJXc1h6b3VDdEx4d00xOGNIeHlaR0VqWXkxZGUwMU45bi9qajU4VE0wTlZYdmlvck1TVlJiSmRuUEV3THhmSGE2c1ZHdlJwUEZOYzNsZ3JGMFlIQllxc3lNOURIeDlUMlp2bUg5YzY4WlZjN1pxTm5tTElRRWhwa2g4SjBBVGxPVlNCR0txWVNZakxVQ0ZtUGhTN2NPcVVpcUZvY1NYOFA0Z1dSQW1GR09jbDNPcjFXS2RZM29mZnZjVHNWQ2RRK3B6cWdMU0wvUUVWTmh4L3B0UXlDbVFXcWFmUFNIWWZ2cllmaXVkZGVFM2loWi91aW9ELyszZ2M3clkyM1gzeEtiTTlTUnRPN0hxdXQzVXg2QzZiUEU4ekZZaUpkVzY4ZDJEMzA1c1hsNVZJTk12L0t0WnZkZGtPUlJWMkxKK0pLcWRLT3kyeTF0UGt6di9qYkR6OXgveHV2WEJrWjNmVzUvL0VuODR1YlgvdmZmekc4N2NBamp6MzBveS8rUDVxVy9zUWZmcnZTN1B6b3J6NHdkZmVIUisvNFNPWDZjMlp6VVVqMlNWckdkVW05WGlrdG52T3Q4cTQ5RTkzR1JhYzdiM2RYZkx2Y3JkZjhqaXVKV0tSWUJkbmtVSWVHY2tZSUJRQkExL1RBaTNpRlZGb0M3VWNEUWZBeDZrTFVRTFVTS2hJcUVRWnl6QVoyaDB4SEJCNkpkc3R6V0ZFemsvYzRyVTBlZDRpVWRIcE5Ia01aK3BJbXdJZlpoUlhrZ1NpRXpoVlJ5VDU3NW9adEd2c1A3Z1d0OS9ycHM0Q09nS1BKVEhyMnJXZSs4VS8vK05pdi9IbmdkeHR6bDdMRi9NRzlrM1Nrb0pZMldpQWVkKzBvVG93a2Qwd1dEU3ZVRkRId3pMTlhTczJPb2NyQzdNTDY4ejg4ZGVHdDY0ZU9ubmo4UXgvODdqZS91VjR1LzlyLy9TZlpvYW0zbnYxSHlhbDg5cHR6U3JaLzZmTHA5TWh0SzVWT2FmNk4vdjRjSmp3RGxXUTBlRW15MnNzaWJveU5LSTY1N0xaWENUSmRyK2RhVmVTYWtoUm9lbGdjMDdTNDZwczJNMWhsSlRBTUY0c0I1WVcyWTFodUJ4U0pKZ0FBeURFTi9oOHkxZ2xEQXlGR3FVS29BQkFHK2hmc0hWUWw0U1NydFI0RVRtN2IvWFpyRXp0TlhrOWEzUVlFMGdXdHFhaWlycnVPeTJGcW1zM3hRbmI3M2tPbkw4NXd2TWc0YnFpdnZ6QTRPbjlyYm1La245Tnk2MHUzbG0vTkRCMzkySVBIZDd6d3ZlOFJVYUhEL1RGZHd2RzRMRXVjMmJOZDM2OVdtdlBMOVhySEFpM3UrVUdqN1JPSzNQcnk5cjFIVzB6ZFdIcjc2WC83MFpNZmYvKzlEeDc1eTg5OHVqWjM1ci84dDM5cTFEZDhWOTUxNUpESEZlMGVJSTRhMU9ldGphdUEwNkhmYzQzRjhzcjV2aXdXQk12cE5DQ0R3UG9GcU9iaUVpZmJRa3lvclFaQ2pQZ0JjeG8rYUFnK3BINFArUkFONEh4NFNBejJPWWlyTVFYTUpXUlFpQlJCNEhrb3dGNklUSUpseXVtUlIySXVJUUhnTk9VVTM2aTZicmQveDd2ZFZpbTBxMkk4YVJrbWlHUlFZY0FCQXNlQXZzQlFCWDV2My9TT2xxKy84TU5YUkVGSXBETmp3eVBONm5KR0oxaFFvZnJxODIrbkZQL0V6MzMrK29XWDNuampFaDN1azVwRzBKK0wrVjdZYU51cnExWEQ5UldSOW1mVXVDNXMxQndSTEtLUENobnlxNy85bTZXMThoLzh4bjl0MTVlbmR0Mys5TDkrWStIOEQzLzd2LzFOdWppNU5ITXBkTmQ5RktPNHB3bU9KdVZxMTc3VFhUMnQ1TWZsaE9UMDVrSjNYdFZhUUFvU3g4TVQ5dG9WVUlSU0g2WjZQUENSS0VOcGdKSzE5QmoxMmxqVVdicEkrbks4TENsZ0NnM1RCMHd4WGNOR2JUL2N4S0hMVVhnYWNFTVFSSXN4QTJpU2ovNkZRb3BSQ3JvQzZreHdyWWJ2Ty9sdEo5ejZ2R2ZWc0JBSEl5WHlVTnMyNUtHa2lMN2pnNWp3blBZOVJ3NWVXKy9WR2gzZjdMeHg1dnlKZTNaREpzN2VXa2xsMHp2Mkg3cDIrcm5YWDM3bGwvN3d5Nis5OUJ4dDk5amhYVG53eVMrL3RacE5DV05GNWNaOEo1RlFkMDdsNTFlN1l3T3E3NGV5d0trOHhEcEY5T0hSSGZzOHgvMzJsLzVtOGEwWC8vVHZ2N2ovN25mYm5qSzVlNWRsZExydFZVRlNlU1h2R0hYWGJJcXFRbFdYNTFydDFwcnZsQ1ZpQ1l5QVRXeTFyWlcxNW9YelhjdkVhcHpWSzdEY1lTd1dHOTZld2JxMXN1aEJGTko1TmpCQllubFl0YVFCR3RIeTVKamJydGpOSGs3RURZN0JreEtPd3dJbkNhQmNzZUV6aStQaVVKVkJZR01TUU1Tb0lJUDVoWXpMVHQ1bmIxNExRWHBEWVhzZUwxQVdCSlRqQ2JoejEvY2NrOGZ1L2ZlZE9ML1lBcHNWMS9YTlNtTjlzMTJydHNaSEJ3RVpieTNWak0zcmdBUEhudncxK29HSEQ4MHVWV3BOdUFZRGR2UkNZRXE4WTl2b0c1ZXE5eDBxalBicmM4dk5oKzhlcnJlNk16Zlhqejd3VTNlZmZGelZ0TlBmKytxbmZ1Tlhmdm1YUDFXSlRBV3BybHhsTk9SNGdVY0NGUk9lYjFCaWN4cFkyMDZ2dmQ1cmw3Rmhvcm9QZkc5MXpQbVZYbW5ETXAyd1hVY1V3TjhQV3hVY0wvTHBmaDZxVEVocTJkRWNsYjNTQ3BZVlQ4NndkRnFUT08vV0JicitJMERsTEI1U1E3UVJpQllJVndacndVV3VHeU16WUJaUFl5REtRRlJSUUg2TU9WRzFPeHVpbmtyMEh6REwxM2hKOEJ4QWNBOTRMUENabk1oS01zZ0x3M2JNd2I1a1FPUmI2OTJqaDI2N2NtV21MNm1raytycmI5MEF1NURLcEpHZytJMlp4V3ZuNmRod1lyMW1kYm91Q0orWXB2aU1QbkQzcmxiYjNqWWNFMFh4bTgvUDMzZG9jS3lvelpYY1ZJdzdldi85WC96N2YzajVuMzd2UFE4ZStoLy84SzA2UTdZTGNoMTVsbzA4Z3hNVXg2Z1o3V1cvdDhhOHVaQnRNcS9ybUwyb0FXRjBtb3U5YkhFSDVDaW9iM2c2V0Z0VlFYSVlna2tTZFJBempwcXlGV1d3ZjNSZ2ZjWDgvaGVzWi83V0E3bDI0R0UrOU5TdmZOSDczamZzRENaNnZjc3BOSFZVWHIvYVErZGJ1WDdaVnVEbEE0NEQ0ZW9GUVVmZzRwQU9mbUJURXZVSGVWRzFtaXRhL3c1ZXpEdVZ5Mm9zYVZrV1I2bHJtd0J0WWlJYit1QTZlNWJaM0QrOVhjaU1ycFdxVnJkV3pLdWFETGZIalJUemxPY0VFRXBxakpsVit0akp3NkJGQzRYazlIalI5YU1HMkdxNVM0anc1Q04zUFAzQ2xjVzE2dlJVUDRXWFIwRmhhR0p4dFh2dSsvK0xEOFBmK0t1dmFwcG8rTHhuKzNhamhMeWUxMTEzYXd1QUZKZ2publV0OEpaZG93WStEaE9ISVJQNHU3VFU1UU45Y0NUWGJGYVdLMVZCY29jSFNDWkRSQ0IyTzNCTXhHS1lacGhaZDc3NkJ5dlB2T0phWHJpMEZwcFY0UnRmYjh5L2JSMmM1aktENHZYWnNGdXlDSmE2WjlBdzgwRGllVG5KQ0ltQUltU0hSUFZEaytjMGpncmd3S0ZXQVBjNVRuS056ZHpZWWJmYjhjd05RaFUvOUNWWnRqc3RvdlpKa29EQUcxa21EYnA5d3hOelpjdXNiN2E2UGM5bmlpenQyamF3WHF1bHNxbXIxNVl3Nkx2Ky9yNzdqdTdaczJQZ2hkZG1qaHljZk45REI4K2NYN2s0VTJwMjdiT1hsaWFIMG5DNWhiVXVRV2l0amFZRzFldXZYdm5FYi8vT0p6N3lDU0RNMnVKc1ZMdUNqbGpRV3o3Vm12MCsrSnFBMUFuYVlGNmoxVmxybWlzOXF5ekZ1VmgvYnJOUldWOHJlMTV6czdwT3NUYzRJZzV1UTFJc1RHYVNJMU1GRWZ3cVhDbnV2UFMxek5xNXZHWFZXZ2hKQ0YyNWFhOVh3bTFKbkVDNDNQRXFuVkRXTldzdDNKNDJ0UXp5VnZ4a3pHcm1DSElqSVEvS0MyRVhoUTR2Nm9TakdBWEFBNVFUV0FCRVNXTjllN3JyVjBSSmNKd1FsaC9vRUs0Sk5TL3dKcUIrdTlYTUp4UWhWVHgzOFdwTzQyT2F6QW5jM01MNnpmbHl0d2Z5blpEUXAxUGJ0dDkvNHA1VGIxeG9HOEZtdFh2M2tUMkNxQlVLT1lsblYyNnMzdmV1N2ZmZnRkTUM5ZU1Ga2lpc1hUb2RTMnIvOVkvL3JGdSttQnc3QUlxYXdjb3A4ZEJwbTZ0djJBRGt2SW00WmtqYVhYZTFhYXlZVGtkVitjS1lucDlJY2JxdzJHc0I1Y1N3SXFacGFnZW45MU1sSzJOWVpZNmtDM0w3Y3Z1bEw0VnZ6NlR5ZlNteldqTEExbEJzTTFTUWNJSm5OWXN5bjUvZUhsZUxYR0Zjdm1PU1ZNdk8zRG95bC94NDJyTHpJaGVJRUIrT2lpSEVDL2tjRC9VWTlmVkRobmxCYzNvVnZXOGJDa1c3ZGsyRWdyY3NXZFdzVHBYd2FWbFRTZGgxSU1oV3ZUQzBhN1Z0MTBvTG1xcU9GT0tuejgvWEduWTZvVXh2RzlaVlJvOGUyYlc4VkVvazlBZFBIUDMvL3Y3YlR6MTNmbWhrME9nWmF4dmx5YkdCeFkzbVV6KzROSkJSKzFJUzZtN2NPRi83NEtjK3RlL3d2bHVYdnc4cW1aZFZ0MVBIb1FQQXpPQWVneHJSQVVCcWxmYWxtakVMVEYzSUZCSVpRMVE3anU4azgvR3BxVDVJeEdxekUyUThyZUIxSEh4aHlkanNkR3ZOZXFWaW5qa2x6MjBvVld0TmNwdHBESy9IQko3RWRaemltVVZrSlBHeFhEdzNHRzhMb3NrVW5wZHNHcHl2aDIvTmh1cEttTXdiaG1wS1JPV0ZxRVhQbUFPcFJIa0preEM0RlNoSUVOUWdzTlQwaEFtU1JlWTlzSnNNa0o0WTdaYVNIQ1lJWEFFMmVyMUNVcVN4d1IrOWRzN3NtYk1ydFhMZEttUjFvTjByMXhiYXJRNDFtaFhtZHRlV2x6YVdaOGFHTkdSM3luUFhTbk5MV1RWZ3RoRjA2bkZzOEc3ZHFHMVdTKzFzZ2Z2VlAvbEhQVDFDVXZ2a3VCSVhDS2NuYUFpRUtQazR0SnliaERvOXE5THNMcnArSUZHZUIzY1NtR0Q2TGNmbEtiOWphdi9nNkg0dnNhcklRcjg2RUlzbHU0RFhBcSttdGRlZWQ5NjhFT3k4OTk2eHNmRzFjOWM2WHVoaTRvVTRuVVNRS2oxUGpyYUd1S0RoV0lzbDQ4Wjg4L3FHN2ZERUpXN0ZEZGRXMGNFN0p3ZU9qSlNYWnNBVkNFS0tVRWhMbS9JeHhQSEFqQ0M4Q0pWOXF4MHI3a1NoM0YxL1M0MmxPMDNJZXBBWExTOGtzaG9qZ1IwRWdkRmVHeG1idmw0eTNNNUdMSjV3UFRlWDBDd25LTmZhc2lqU2V0dWFYNjBuZUdPajByaHhxL1dmM2pQKzZLRTA5WnV0bW1VMGphVGtqeFJ4MXdEbmhjd1dPLzVUNy92Z3ovekMxUnR2TGM5ZEIvbXpVVjMzV1dCMFBRRFJYdk5DdC9xVzFhMllSZ3R4dldyRDZuV2NxQTluWU9BTlNkUlZPZWFISGNMdFljam96L0FZODRIYjJEKzFQeUdLVm0vVmFvcWwxdzFkVDk1MjE1TXpsMDdQTmswTUV0MFBwN2RKdWdhcHhWM2ZORXYxSG1GMnZleVliYi9lY3NjRi8wTWZHNW0rTzc5cDFqSjcyZjY3N29sbmp2cWVFckpMSENjSE5rZVFMeW9KQmlVSnVZRjVqc29vY0dPNXFmcnFIRU11UnBCZklMazV4N0pndVRnZ29qQjBMVGVYeTdUREdNZGFJdVU2UGVlMjdRT2RiaS8wV1RhajBYUmM2a3Z4Zm9nM2F1RFI1Ri82OEwyNkhwZDBYcGQ5Z2JqcHZnU0lOOU5EcVpqaU9NNUhmKy9QeDBmSFljbUdKbmFwdXQ2b041c2Jtd0NQSXJhNjFkZGRZOW5zbEszR211TzJtbFpZcTJFd3ZCZ3hMK0JqK2c1S0pOTmVDMUNkaGtPdGVybFd2MXFyOVJyTkZnNWxNK3lkL2w1dmFRazFWdFlVdnZmRXozOWc0ZklsMEs2REZEa2MwakxrNU8zeHNXMzlXb0svZWF0cnVwRzM0UmtxRXRhbmN5ZC9iblQzL2ZtVmpVcTMvVVorUkIzZDhjbGszMDR0UThXNEJtdkFYTVpMS2xnaHdESk10cElyTnhHNFlYUDlTanlaN2htMkYvb2NDekNWV2VCeGZMUjc1UGVhMjNmdWJqdm8zMzd3cWlpcStieXVLcEttU1lidDBsMURnc3dGbXVCTGlEMTAzL1N4dTQvVm14YWluTVNEMC9mMW1FZ3dBSUhhNnpheWc4Ty84Sm0vQW80UkZBM29KS2JLSThYQ3lPaG9zamhRdWZXVzJYaVZCUjJyVmZaTkwvQWN3NFpiSXEwbXE5VnhMcVBuVThsb2cwL1NYQWJ4d2lITys1YnNXdTFXbzJPNHJWWkpQL1gvR3lhZ0ZEaVhUdjNSeDQ3dXVTMTU3dXppTGRPdDlQQ282SjA3MzFsMzNZY2ZucnB0SkgvbHhubzhoZnZBcHljNXA2K25pTXNqUmIwNDlXU2pMdlI2THdYZXR4S3hnOG4wbzNMYTAvTkozeWs2eGtiVTFRSEpUZ1NDQkY2TXlYcSt1M1lKZU1WMW9xWWdmQ0VNUXFyb1BQQkp6M0xNN3NEQThMVTFROGFkUnNkdHRDeE5WK3lRN3BtZW9FZW5rRUJDa1BPV3lVN2NkOGZVNUJTSTlTQkV0Z21DQlNtYTVQc2lNRnA1cVhMZ2dTZnVQZkZvRnlISER3V0NGNVpMcGJYS3RjV1ZHeGZPTkZkZVlPNFNDbVk5MjNXRndBMHNDNEg0WVdhMFUwd244eVFJYTYxV3M5cGFZNFQ2eUxYc2JnQ2x5YVVaU0lsdTc5d3BZLzRXVVRtVUlHdzZ6cDg0c2NQUTR5dUJZRlJXQmhJQnhlVE5EYlpSY2M1ZEtELzR5TUY3RCtlV044cGFQSzROa0treDFId3R1UHhNZmZxZWp3OU5uV0RCb0dmbnF0Vi85SjJuTlA2a29qK1M2Qi8yZmMxczM4TGdqamlSOEtwbm0zcG0wbXJYUXF2S2l4cVVIakFtQ3htVllwN2pDOVJ6WFU4VVJGNUpLSnF3dkxJQktqL2ZsOWsyc2UzSWdkdm90Z0lIWUFneEpnVGRmL0pZUXRjN2hzMHc2VFUyQ1VkRWNGZys0NURkTERWTy9NeXZURTd2TXhpUUM5WXBQbnYyN016VmM2UGoyN01KVmNBYlFWQXh1aldBR1lQVTJyd3JBTkFnNW1MY0FZUnZoOVBicFpHSkFrZENnckRDZXh5elFodGVGdW9NNG1YY1BHZjVOUkx0c29aSXNqd2ZtMHR0KytxTm16Sm5PQjVacndVN0IvVkNESU1MN3RoQklkMnRtODFiODBhQ3VIamVYM3dMSmFRODNWNVI0a1pmNXBjVjVSR2ZqZG5HS3ZQUEVLUUxZajQ5ZEk4RCtObTRJUWd4U2tUZmQ3WGtjT0FFdmMzcldqelpiUGJjSU9RZ1hFUUl3MEFVc1djN21EbkY0YW1uWDU2Wlg2azgvc2dKaG9WejU2NHZyMjNReVg0YUJneUNsYzNIamg4L0R0N1NEVkRvZTJDTUl5YkJuTy81Ym52VENkejMvUHhuMDVtY0IrcUg0STE2cjkweGpyLzc1SGdoRy9oZWFNOHgzQXg5QkY3Qng1YlBZOHNLUXNJMlc2QW5oUDBUY2lFT01lK29la2FpdHNSY2lkZXdCMGJSTksydWFkcFd4U0ZMQWVjeVMwQUxDdnIrdWZLdHM3ZmF6ZDVhZzdSZGYzb2dOVDZZbWw5dTdSNVBiZHVldmJKNHpYTDVkbHZKMEFEeW8xWkZ1U1NmUHh6RDBteXJkbFlRZ1VEdmpDYytIS0l4UDJnVGtoTVZLWjQ3MXE3ZTlPMHFUMVVPUzRLY1JWaHNyMTJXVmRWMWZJb0QwQ2tSWVVaN3d6VHduVER3RXVuQ2NpTzhjdTBXVktJc2tPRmlKdkpKUEh5UHdEb3RsTTMxYVhxeVZhMkFrZ1l0b0VnNm9yN1piU1B3ZDFhM2YzeDZhSElhSVFRZVAwQklGUG5LK3V5aXpxbTc5bXlzWEd5VnI2T3dUYkdGT2J0dHVZNk5tazNHYWNJZDJ3dDVVazlKbm9OT1lQY1dwU1pvTXR1eGdhb3BZaHhlVTZoaFF2clZrWjlMdTZXNkdpQStLVzNYYmM3RHJ6ZEk2SHE1akpCU2hSZGUzNnpad1pFY0tHdzUzNG9mTDZqSnd3WEl3c0pJNGV6VEY4KytNcXNyZXliSEh0d296YlJiODRIVDVpQ3hoVDZDNzNOOWc3bDZ3KzhoSmNmYXk0SGdVZ3FVVjVHMVlTSmxBVm9WOEQyV0grMS9NTVNMQ2dwTVRsUmMwOEIrZC9mMnNabVo4VmZmT0p0SzNudi9QZnUvOWQwZmNwTEFHeUJlUXkrVlRnSEIrMEVGWkVuVXBLVVVQRlRnZ3RJUEE4ZExaWVlsOEtaYkgwN0laRlc4L3ozdkJmVzBPRHZmcVY0UmVNODBWbjJ1UlNUWjNHeDBRMUF6cE5GQms4a0dJY1pUYjZPK2tkSWRFNlJWVzRXRjZGcUFlb3VkWnVnNGdTUlFDcnk4eFBSZGh6L3h6QmRtZi9DTmIvN09MOGxGWEtkNE1PN3QzakhHSjZZdXYveWpMT2Z0UGlUT0xKWGV2TFl4QlA1MmUxaFUxZ2NLcVkxcVdOdmM2RStoOWJtdjVTYmNaT3lZSUJ5RVVpQzhERS9oTzh0ZGEzbWw5bHg1ODF6YUs0aGkyb2RxUXg2eTZySGtkbG52ZDlwWEpTMXRSczdhZzJBQngwTE1RTmE2Z0x4VzEzZjh3c2pBWXluMXdxV3I5Y1BqZTZlSHdGRWhpWUMxUnNsVU9ocjFJU0RpYUxRYmpuME1PczEzSWZlQWdPT1o0anVSZ3FlRlVJSit5OHBLalNyTGxRdnBlTjJ4RitydUxhSVFMWnRQMXBPTmxhYkwwRWJaL1pmVHJpcndEVDRJNWk4dUxNbnZ2U1BuZHFxMUtxczFIY05Ddm90Y0Y1UUZwaTZhbEZGL2pBK1AzVHQ1MTcwWFgzMHhVOEFmdjRNT2FvMnZ6NitsVkxSckdyMjU2aXpYSlYwVnp0YzZpYVRBWVcreHhSWkVrVXgzZHc0Z1RpV2xXOC9VdU9kMVBjdEx5VjRQKzdZUDdISjUvcXdYV0xmM0h3VVZhZ1VXajZQdE5haXlFQ014bmpLcXZrWjV3b3ZBSWFFYkJxNkZHUUVtSUNnRUh0QjRybFN1dk8rK0ExQ1lWNjR2K3BDd0VYRWlqNmRJbHFRQVpET0lEa1k4MzRtY0l5RkJOSUxCSUtWU3VTaFlJWUpyUVNWR0hoL0FxOXRoc1JnejE2NzNHamVjWHRlcUlZWXREaXdyUjhvTmx0VzR0WGJRdElPNzdpTkxpNnkwYU5kM0FBdW5lYWtweXdGa3FRTm9FYUtORGlxTVlHM205Uy90UzkrVVpESzZMeVJSYXI4NHcvS3NsWW0zK25kSlY1YjhLN01zSFEvN2hsTUxGenVWaXZ1OU9vcnRHL25GMy9zOHRXL1UxaytsNVNUMlczNVlDc01XeUdSWkt5NHVuVEpxallLY1Q4YkdPYVpZdmhuZE9vMytpTVF1eUNzcERzOEJhY0ZCWW1FR3RwcmhNTnJmaE1KaVlhZlhHeCtiM0RQUnZuYnQ4cjZkdzE5NzVuVklWSTVFMm9NVCtXaVVCMmcwZ1BxTjdEcG9KVmgwUitBQ0xtclVJbG5UMFZha0lqeUxYbzZGNy95ZGlVR1FYM3FEWTRJYUptMlFqUGxoamgva3U5ZGNzeGtlMmMyQlVuYnRVSlZ4U2tDdnZGQlRZbnloUDlveWpjY0JrVUpSSUMwYmNYbEVLaTJoalNydDdscjVsVUdaYm5iREcxVTBFTWRIc3hTVTJ2bFp3bEJRYTN2cTVkTDlkeFd2THpVMzJ1WnZQWHd3cmZFMCtiT1M4cERiK0Nha01HUUZ6L0VpWnljS0R5WDd5K2QrOEQ3QmJRRm91NEZEbytFY0lReFFRTUtvSDhIY3Jic25XRkNJNnhOSUVVeDhoUDBnK21mQ1VjWUNCZlNuMWZ2K0MrY0pZWTdqeTRyRUNSenhDWklFUUhRcEdoSWdVYXNEZ3VYN3B1K1lJQk14a0FRRUZBenFUK3FRUlRGaVc4TnlnZE9ydDIvVmNGdk85STBIWWhtUlcxQ2lXakxzVHhHL3h3d3Z6RStRbFZVR1lMNWNZWXMzOFlGdG5rNEFzNkRTTWJCdE1vRlNTcmkyZ0RvQmZ3NEhhMEJMQ0ZldHFHY3JFclRlWmhmbS9TUVhpSlFDMm1RSnkzUzk5My95eUd5VExKNjdPRG1VYm16ZWlnbW5WUHcybFYyR1B3bUl3ckFEVmMxY001M2RPM25rTTZ1dmZ3YVduOUdBUmRzWk1pdzN3ZkJCR1BNeEw3Sm8rakFrVkdRKzVGY0lOQWpSQzBJSGhCZEJUSlZBcktKU3VYTndWNkhWOFRhcjFhZ1Z6R3hiVlhoQmtseklBWUFRS09DUUFXREIwb1BFd09DcmZoSW5ieXUzU0NUQm8rMU5TYWExNjY5MWwyYUc5NHhSaUc1YkFjM2ZEdHRhaG1FSlBFQm85VUl3dTVrY2JWd0dyY3l5ZzhUbkFlYVoxd2dhZFZTM1NTekY0aEtyMVBHRmFsQUYvYnBGdFRha0sxUk1nSTBRcnpjUVdIUXVEUGZkamdjWkEvR3NKTHNqSnBQRzg5Z1BxZHYyTzUvbCtRN1NQOXd4bjFXbGdjQVhRaCtLelJKaXpXMTdQaHBVWjByWHZpd0xDUlIxdTZKQVJhQU1QanNNZURuR0VPZTdGc0VVMUJFRzRPWWhxL3hvVDVLRDhIbTlYamNmNStFSEw5M1loRXBWUmNpakxZOFJ3VGFOTnVRZ3hvaURjQU1NWW9wOElrVTFDR2tMNkllaWtvL3NiZVJRZzJoV1RaWUIrNzFlMC9JNlM4a1VIeC9aVTF2MTNXWFRuT0ZxUGRJSURXa2VkUzU1N1FJU05ScWxwc1JxWGJhMHhvUUtBUXB4Y1ZCZXgxRTVpMGlOb1YxeG91Z0lJTlAySUsyWXFHSWNSN1ZWUm5wNGV3eWw4MkU2eTVJOE92VnZ6MUl4dGYzUUl3cGxmTGpHeE4xSU95QW9IMGU5djJwVXZwWkt2RnNnMDJ1bEw4alY3aUQrc3VlR2tFSFJkQndHd0luNnFXRFVva203cUE4bklNSjdqZ2NaNW05Qk1kQWNQSDRBVlVDanY0U2VrMHdLRUMyQUMvaXRVUGlPclowMkRtQ0VSUllKU0I5aUZBWjJsS0VzQktzT05RbHdDK3dRTGM0V2JtMkZMeHFjamJRSnBlM2x1aWo1dWVKQWMrMkdhUHFwekdIUFhtazNWdjI0ZU45UDd4RXM2ODJYcjUyOUZiZ0psRXl3UkJ6UHIrRnlSRWNNa3FpREdGd0pPMHdDaHVWUlRFT2F3bklwRkU4UnBaKzFLaEFkakZWQ3hCQXFTWW5KUk1tS1dtWjAyMmc2bFF6Y3FxTDZldVpqRG44UXlxdFErUFhxK3RkOEQ0eDVBWkVCdzE0Nisrd3ZtcDBWU1IzQUNFQ1NSaE5MMFo4Y0JBcGNGekFlR0IwU01SeU5TdElGaHZjb0w5REFqWklIdnNRQ2lZdDRMS054aC9jVmtva1laQllXUkM3MFdDVExjRFROR1UwVHc0TkVHVWVBSklpRTRTdWQ1dVk3d1NMdkVDS1VOUUowUW83dGN3TE5UZVM3MWJYeVNuWG80TkhFd0tEWHIrd2QwSWJ2ZnFKNDhBR0JqNW5LcCtubHM4SlE4ZHpwcTZiQjRvVFU0RTRCREFsMm9xdEd6VG5UWSt2MTBLcmo0V0U4TWhLbDl0SjFaRlZKVXNSYUVJeE1pZkZwdmVhRncrT0Q2Y3lVcXNVVlhwVmtWVmVMREUxdVFVeE4xUThGL3NueXlyL3lXcUNvNzlLU1R6THZ2Tm42Rzd3VkVvb0ZrRVdSZWlSUnV3WndLZ3hOa0tkVVZ3RjVJNGlCN0xFTXpHWGd2cmF3akhtaGwwbnFDWTBnbmp0OFlIdXAwb21lR3BJUXZnQ0JqWW82cWtDSVNEU2pRbWdZNFRnd09ZZTY1WlYzTkZZVXhDaW9pSSs0SDdWYUpoRm9wN1RhV0cxdmY5OFQyWkdjMVc3NmZIYmc4UGJzanFPT2s3ZUNoRDR5OGVEdDAvRjhZVER6bmVlK2QzcTFHazZPOHlEa3JpNTRzRllBRktvUVRjcUlJTWtKVVZSbU9YajVNcnExakhTZHRYRFk1N0ZkQ1cvSjlsNWNNUHNTWnc0ZHU5RS9wQWtDVldOaVBKSFNrNGQ1dFNCd1Vrd0hER281TGlXOVRjYzRrKzMvZUtadmYzVXVRdHhvOW9hS2lBalJyaElJSzBhanhqd0EvOVlqZXhIdk15cXFQSlk1VGdIWFNPUWtZMjNQN0NDaWZmajlENEFCWEcvUjh6Y3FVSURBcWxBRExOaWFPNCtHeDRCZW9XakI5VVRUUFJTS0dBeFhyNzVzZ2dlQ0MyOUZhMnN0a0FxY29lUm5abnV5Z3lhTzdSbTY0NmpiYW5MSmROQmVBNXlzTEY5UjBvSmh6aXM4bGVKeHcyWHZldngzRFBkL3ZuanV1U3hqZC9XeG5FOW51NEdnWU42TFlHUjhnbVJ6S0dwckNxeTlpUUhtcWNkY25tM2ZUczY1NGRlZWFjRVZaeEZLRGRUYlRsMVJvYWhSd2tCNVZJMEhRMFFlWTZZbmtRRS9WRHVOYzZMUWJwVmZyeXhjNHNRWW9STEhTZEVVQ1lrRTFSYUVSSHV3MGN3dWxSR1ZjTEMxS1J0VmtFMXhTQ05SQkJDdjRnaXE2YldGQnJJN0o0L3ZqU3RUVU15WUI2aERvV1gxb3NUeEhjUkpnSDdNZ2R5T0dyc1FIa25WTzVzTHpZMGxwVEJDSVZJL2xsdlJSdFBPWTAvY092MEZlM045K1BCUlRzeFl1TmRhUFI4WTlWamYzV0FZUFp5QzlWbCs0K25XMG5EeDBNTkdJcDBiN0RzNGhQaWUzMWxCMjBMYXArTTNqVkRKMHc4OXllbEtvTXBNZ0h2eFNVckJHMThLdXg2T3hWbmR3eHNOclBJUjhCODhTRWJHUWs0SVkwa1VqOHVKMkpTRWkzeWdhdkl3THh6djJTM0lzTkQzQ01xczNualI3cTFMY2ovVUtNZHIwVVJjVkNNaXdEeEhCSjVYSU1YQVRHQ09wbUNKUWg4U2pBSTJjSkVnaHZJRUhBdVFZUGZjaTFkblIvUEtyWVdGY3EzRndkYzRDdW5GMldZMzZoOUU4eEpid1FpajVJeUdIM1ZaaWlVMlYxZHFDeGVLaFJHMlZZMlJjb015Ukdobzk5NkREMzVrNmMydllHdTljdW1GVHZuNnh0V3p2WTZnRCswQjNEYWF5OGJHV3FmWmNsMHlmbS9lRFNCcjFNTzdwTjZ5alR1b2FqT3JxS2h1ck9lMk5tdGVIWE9ycStGQVArdnZ4N3pHcHFZak55NHB1T3VoWkpLTkRDRXRoZ2Vud29RV3FuRk9pU1UwTFJYVDRyRjRWdVFWU1pqVVUzdHV6djNONnJVL1RhZDJtWkVHQ2lRcFM5QldFWElxQlRHRklJTmtTa1F4MnNpUXJQWkdUS2R4WFlobUlUbCtTNGhGWnp1QXQxQjB0QUY3bHVrSDZpYy9jTytaTXhmbWx6YzN5aTBPUHNJZ2NrU1cwWXJJTUpxMzhPRlR4NE1nUmpOMjhGVlpWUURZMW05ZDJmT3VuNkpiQmJqbGV6Q09TaFgxVFJ4dFhQM1d4dmxUVnJQSkt3UzhWcmZoTHJ6OTJ1Z2RCNExHektVZm5abzQvSGhSS0NITFRSUlRhM3dzYUlWQkJmWDE0OEoyL05XeVV3SXdkYlVmUFYzWmt3dHVicEpuV3dCZHJKQWw0OFVnSFVPUUVMS09zQkJLTVJUUFlDM0JSQWtVc2krU3JraGszaS81dFZ1WWs1R2NCMldTeWg1bHR1VjB5NktVNGtHYVI2MVJIdUxDQy9GbzhDUWFVWksyQklUaWg2elQya3pHRTNGZDM2aTdSQUFZQXUwa1JBT05BVHlhQ3lIbHR1WXFHMjJ6MEorZVc5aG9HMUhIQmNTREwwcThZNWtoNUNta1grQkZRMThoSmp5RURnU1dEMDZUbDlIc2haZFBmdnd6OUNlQUJUVUxhUW02Uzh0R3hidzQxOXgyN09qVWppSEg3Y2EzbDBvM2JpeGNGRUtYL2ZEWnl1NUhoM1pPRDVUcUxiTjVzL3JhMDNqZEhackNmSWFzdFZsbDNtdXpqZmZjTHUvTDhubnFHKzF3RnNwemlteWJRTk1UZkhVVGwxdmg5UDVBMW1TUFFYWTBWUjIwWTFhUUJnUlJVdFFZQ1A1dWQ5bnRiVmJEZjF0c0FqVzRpZFFPS2tnUUZFcDRZRURnRDBvMFVVeEprZ2IrbVFPRVFvUVQwNTVsMloxV1FrOTRFS1hBZytjSUFxaHVKWERCSnI3aklIMVo0anhUdkxIU0dzcndqaGM4Y3QvK2lDeUFtRVJKTnRybFRxZXBxS2xPdDRFaU91Y0Qzd0piQk9aZDVIZzlLYTllZm5WbGVXNWtlSExMa0VaaUVrQUxzbGFKalloeWFzZVI3WGMrOGI1ZXZSVDBVQklwN1ZadDdmTFpHNWZZdW9XV1gvaDJhcFphYWhKTjlsalEwRWZSc29Vdm5ndXYxOGxJa2g1SkJFT2hsUXhvSitEZW5BVm5qZlFFYWx2bzFXdFFEYUVXWnkwUHR4b0V1RlRrQXh0NG5tVTVFbXRVL0JzTFovTUZOTGd0SXc4OXZuajllV0gyZDNQS21LRGxBYXBKRkNNQi9nSjFKMG01TUtRTGM5Y3ptVnd5bVNKRWttTDk5YzBWNURhbFRMYmJia1FVeWN1dTJZb01ORHc0WWZENTFqd1RjUmwvNXgySGtHOEljaXFWbENLQWoxUXBGWHZ0UnE5YlNSUUdXODBOQkhxWDQ4T2dDOFlVOGxyUTRucW1iMk5wY2VhVmI0eDg1SGZwbHRRS3Q4NkxpREtFTFpTVlZQOTQzQ2hkMmFoMGVVRjFUSkJ5WXE0UTd6VmF0VGFhZWZNS1YwRkNLcE1PdUJhU3ZyMkExamJacG9YRUJKclVvcG11dmhTK3RjeWVPUmYyTUI3YUUvWDROWXFjSUN6WFdCcVI3aXpJWUtOalh0UjFTWkFsUVZuMmVyYzhXbkFvTzMrbEl1cmxuQ1l4djVxSURjblNZUFE0VVZJSllTZzREc01zU0tVTDFYS2x2TG51MjExS1U4VytBY3BycmMwRlNTUWhrZndnbXF6Yk9wMFJIVFBEZ1VzaWx3aEtnb2hLNHVyVkMwKy9lT21uSDN2WWRyemxCbzM2V2RFd2F4ak4reHZ0SmgwYTI2Sk94c3VxRDUveW1IbVFZYTRnOGVCSXJqei96L2Q4K0hkbGd0eG9hejFxUGtTNm1BOVRoUW0vOWxwUEh1QzBmc2Z1ZUZJQ1FOUnFHMEVYSGI0OU5ua2IzMmc2b1M5ZCt1N3pNeDNVdExHU1JhTWN5SFJtY1hqVmgzRGdoVlZFWXV4ZGgzRm1HSlNqSW1sK051ZHRyT0pXT3dJcElnR0pSL212YVAxeExhUEhCVDdldC8vdzluTVhmdEJ5M3hTYmN5bVcwWVEra0p6d0FiY0cwQXpRdy9OeHdpZWE5YzFrTWpsOC93Y1dyMThXK0lTb3BpM1g2cFJuRlVsQmdlczR0aUp6aVBFOFhDYTB0em9PZkJDQXZmUTRVVmtxdGRiWFcvLzYxUzhUS28rT2owZTdCRUFUMFlBMDVkZlhGaWQzN0piVXBHMjF3QUc0UHBORk1BYk1OVXlDUXpXakwxMjhkZldWcng4OC92NTNNSXZmQWkrN3ZiNzgrZzlVa2VVbSs1RnA5RFpYZXEybVowRkc4b3dQcG5ZS3NiVHF5L21OcW5kK0RSWEgwTjEzRWN0RG15YXI5cERCeVBhZFRMV1l2d0RsekFTTkdUMjRYNmZaeGNrTTNYMjd0NzZNZ0Vsck5vSms1WndPNXdEajg5UVdNakdsbUw0cjJHdWZ1L20yMUIzSWlBTlVnTlVEelVodE13aDlYaEJFRVhBK05XQnNMTGQ3NjZxc0FwYjRucWVreHpadWdsOWRKcGtNZUh1UTRoelZYTmVQWnRzY08yb1NSMTFpWCtEeFd0Vm85TnlQUDM3SXR1cFBQVGRmcVYybHgzZG5nR1hCN0VUTzFyWDdoOFpVVFRXYVpYQThydEhqZUNBSllsbSsyWW02ZXQyMllScWxRdzkrOGgyWUI1Y0ZITlB1dHM5Lys4L1dadGVzZXNrb1gyK3VMMXEyN1FTczBUWHlZOW5Cd1VTelV1TlRRMVJMdFdlV3FJMVM0MlI4Tzg2bkkvdWtLV0hQUm5zUGsvRnRVREloQ0FYUHg1WWJ0bHRCdFl6R0p0S2NqR2RMQUIxRVZSRXZncm0zV09UdnNSOGQ4eFI4Ymx5d0NHOTJSVlVGNUkrTzY5bndLR0k2MThjTE1TaXQzdktWK29YdjhYb3ExamR0R0U1Y1RjZjc5NnhjZjhscnpndHlBc3hLNUJVcDcvczlnUWM5WUVHWkE4SFQwT25QWnk3TzE3L3cxWmUzaldWSEo2YzdoaU5Ta3g3YkZRUE1aRnVnM1dtM1U2bHNYNkhRcnBaUU5KNFA2cXpIU3lLa2RLOW5nVTBBNkZ5NHROQzMrL2JpMEJUN1NaYzVrVXh3eGIyVmFxbGp1QjJ6SElnYWxoVFB0VHpiR04xeG02QVhPNHRYRWtNN0oyNi9mOGRFdkhwNWJuWXhzR1FtNlRpVlJOa01FaVRzV216M1RxVEU1VjRYMUNZZ0lCb29ScHZFbFhvK250bDU2Zm9TaUhWUXA0S0VSRW5uMWFTZW5VNFZQdHJzTE1uNmtFYTF3TG5KU3duTUlrUzNMZGR6Y1NLUkJTQ054VVk3S3hkQUJ3enRmWnpYdGxXV2JvN3R2TTltdUhUK0cwTGtmMlJ3Z3lEcUdWdythamNKam1tS2FwSkY1Mlk3bVd6aC9NM1MrVGRuNStjMno4MHNQL0hFZmJGVVA3MXZiNDZMeGpJQnBwbm5nVXJnQ3YwRGp0bjFmVWhGMG11Mm9rT1dVYytkZUY0MFlOaHJtdlhTeFFPUC9HY1JET1NQN1NJcURrOE1uL2hZY3RmalNuWW50bFlvdGlSRjFCSTZ6NlU0NGNiNHdjTmpSMzQxa1J2Z3RSQTNaNjFlTzR6aHJvbTh5RWhqTUlQZ3NHeVBxREVBaE5CSFlYR0FGb2RvdzJUMWxyVnQremJNMWhUZWsyWEVSZWllaUtmekEyTWZrSlJpNk5hd3QrbDJyd2k4eWxNVk1VNlFWTXQwR3RWT2YvODBDelNlaUZwNk9ERnlFTFRDMnNJY2NZM3hkMzE0K2ZKejF2cDVRWWxEeFZtV0M0cmVkVTNNU2I1cGlaSWdLYnhqT0ZETlRFaGN2WHlsdWw0aUhHcDF2TUNzM1hYc0FMMXZmeTQ2Umh1ZFV1Ymh5WTF1TjlmWHIra3hveE54YW5RY0Mzd0FnQ3ZoalM1VUl0Z3B1bkpsWGM0Q2JOOFo2ZnlJR1NNZkdlTlJOcWRsaG5kSnlvQnZMRVBaZzFKdTF6Y3o4WEJ3ZE5wMWFhZDZ3MjAybXExMVE2bU1iSTlFWEtQT0RJdjFMR3o1YUtNU3JteDRJY1YyaUEyUHJWZVpiZU5jenB1YS9xa3czR2gzNnBJVW5TcFI0M2xGVGFxeEFRSk8yRjBJdXl2Z1hRVXhEbG9ob21mWEJDYThjZmxpTWpVMXZlOXh5M1pncGJzZHEyMmkxYXN2VGU1OVZNdE16TC8wdnlBMG1FclJUa25Jb2dubjBLTW9DTDFBU2VjUTVJaGo2SWxrMTFObkxwMFZ3aVlvVVJEblM0dTlYbnVkM3JNN0Z4bnByVTBiM3d1YTlWWXlreDBvRkRxTmlnZlZML0ptb3g0ZFdRYVZGbURQY1RtSnQyeHorY3JyVXljK25vcnBVVjluNjFlNDFlY0VaeWRvb3lUa2ZITTU5QjBXOWpMSnZieVU2WlN2ZWthYk1tRzF1MnlncXFKRlZhL0Y0UG1qamdqZTZtUTRWalNtNi9uVUFxNWxZUlNOQUUzZjl0TkRvdytVUzk4UkpRcUFMY2k4b3Vaa01hTm80MzV2TVRTcWdwVGhxSUl4WjNjclRuVlRWbE9PUStibVZ4TzVZV3YxVkdQdWhkVFFIYzE2VlZGeSt4Lys1ZGxUWDJvdXZobEU0a3V3dWkxTmthR1lRQ053T09BRW5rVXpzUVlKdTZsMGZubXplM1BtZkZ3VmFGUS9JWmk3dFpKQjc5bWJBVnIyUUI5RVRTOE1tUW1HY0dDb0FJRHZPVFo0Sk04Mkk4OE1FZ0Z6aG1sRmMreThXRnZxVmxaZU8vand6d3M0UW5xNnRZMnhGYTlvN3pURVJZNlpkcmNrRWh4TFpFSVUrS2JyTmJzZHY5ZkVMVVgyUWNUUjZHQStNRGJBRUZKa3BDaEkwNEhzb1JCRGdXSlJpQnFaNENpWXQ3VC84T2RTMlRHemUwSGt3Yk00b0o4MWRWcFN4bHlqVEh5YkUwRm5xaUExVVhRZ0k1Ykk3aHZmK1ppc0Yyc2IxOUp5a08rYlJrb2ZHTjdiVDM2NlZkMllQZldYMGVoOVBCRk5nR05CRkVUYjgyTHhaT2dhRURMZk5ueWp4UWxVVVJQWGw5YnJsYklzY2xHckZFRk1JQUtJbmppUTkzMFBzZzhDQXVLRW83amRxQUVzNUhMNVRyTUNLY056eExFc0lvZ2dRNElRZzRTSjZZb1QycHZYVngzaTNIYndSTFFadE5VM2ZLZlBCWThhY0NLSWYyUXN3TEtvcVdMVTZ1NVZVUUJrUVpHRTlIaEJsTktTbk9MNW1NQnBJaStER0lEZ2lBSVdwQ0RDcGdnUEFvS1lMaW1WMnJyalhEcHc1MTlveWR0UTJCVjVEYU1Hejd1S09zNllIQVp0ams4UkpGTWFGK1E4d2hraWpLY3lrK1BqdXdyOVF4NmZNMGpLdG14azlSQ25ySjcvcnROWVVSSjVUUU5JNmFTenVWNm5EYmhPRUNnSUx5UzgxMjRTNUtTU1d0dVZMOThzUmIwYWdOTWdsRVR3blM0b0JwQU9XVWdpZUVvZmloZFVDcVk5dzRMaUdob1k5S3kyRjRTVWtzQzJRTE9pNkhnODZYWmNCSVplVmJxR3VYTHVOV2xvKzlqa2JlUW44WW9PYUNFa1EyREZGRGc5WS8wU283S1lHQlFrNGxIbVNISXNPeWdwTVNnb3lCeEJVQVZCNHptNDN4aFB3VXpJd09JQ3dIU2trYWdvUkllc1lXWHIxUnVCZVc1MDhsT1p3a09TTkNUeEtZNXJDT29FQ3JPZVdjRUVYaVRGMGJpaURQUGlFRWdiUU5odXE3eThNZ3RDVDlleWt6dU9pYW5kbDEvNk85eVpsNlMwSHBkNlJnZGVuQmRrb0RSRjV0MmV5U3U2YTBNcHRHUmRUaVRpMTVlTnBaV1NMSXVSRnd3Y2tOOENCMkNCNkYyNzB3QVFVR0lPMUtFYjlRREIvTlNxNWY2aDBXUmNOOXIxU0lkQUhkY2FrRndDSC8xTXEyUEVkQUZFck5XeFoxLy9WbmIzUFFQRmtYZkFIcU4zdGpLUnJuQjYvN1NEbEpzdmZoMFFNdURsVnZWNmJQU0FtaHFIU0VVdUxIQWtSZWZBM0VkN2ZWc2ZSQkpvRkxYbzdSOXc5Tyt3UEpxU1RTWUw5ZHJybmRwTG9waFI5VEZaNjh2bVA0UzRuZTNHR2FBZnN4ZnlXRWNvcG1nanBiWDVabVhOc1kyZTFjdjNUMHVZcVR3VzAxT1YxWnZORzArQmZaRzFHSlNUNjZKRVBOV3FiaVl6TVI4ZUcyMGR4NGdJelkvcllzK1JMOHlXZktjbjBFZ0FjeHlMOG01TFVkSzdia3VFVzVyVWo4N1lScWNnT1k2YWhva0pHeHdaZGN3ZVZDZ3ZSSnRqdlhhUGx5RmVnRTJrMXpIU1dkMEtrZDkyTDUvNlNtN2ZBd1A5QTJTcmQwTzIyb0lRTlprbnVlSHAvSjZIbE9JZWxKamd4QXpvSTE1TWNoeUlhVUdRZFY2TTBTaE9LczhwS0lvUS9EMktYSFQ0SlFvWkVLWVkrUVF1QmxsajJhVkc1WWZkNWt1NnB1dkp1eEZXTzgwNW5zOUlVcUhYY2JYNE9LWUszRnc4bVY5ZXV2SGNVLzhkTUNXWFVoT2pkMVZLYTdNdi9xRVd6d0pNODByQzlsZ3FwclpyRFZualZGWHU5VnhPVmdQTDhNeWVyUEV4Ulp4ZEQ1WkxEVlhpdDJ3bXg0R2I4ejBndnlpejd0bVQyOXFOcDlHZVRYU0tJMnJzOGJ5d3ViR1J5L1duRWxxM1dRL0JyYW5VYnZkOEFIZUJSRERyRTd2YlRtWmpYUkNCSGUvYzgxL3MzMzlmc1g4d01xUFJSdVpXenl0aUJSVFg0N2xzOUdZWG1lMTNVcjRJaEFtUEQxWldFSFNPeWh5bmViaHBzM1daNytPaUZqZjhCdXlIOVlJa2xnUmVobnYxdlFnV0JDblBDUW1FWFVFcytDemh1a0MxVUVxNVdHSWkyemV0YXpuSWdWZ3NFNC8zVFc0L21rcU9Eb3pzdWV2WUUwdXIxVXZmK1gxVmpVbEtVbFEwMDNhU0d1Y2FodTliMlVLdTE3YWpOeThCdmRDcmNwS29pTmpGc2FzbEU1Z055Q1N5bDZFZnZRTk05STRrOEZnQnZSdktNTnFxd1dCMzNwbVNDYUxUSGNRdzNYYXpPVFUxUVh6RE1td0lzcXJ3M1hLTjhHQU1vbDJTYnRkbmJrL1ZaZFB4cU91Ly9leVgxT0Y5bytOVGtTMlBtamRiTFh3VzdRd0ZPQ3BNQUVsRmsrUm9jQ05Gc0laWTFLNGtSQXlRVGFtc2dBMk9Edlp1ZVdFU1ZVQVVPQjRnUU9KNE9YcjNGR0E3S29ueXRvQ011S0VDUDY3cW82bzJBRmtKdVF4MEd4MmlpemJNUUhpaFhmdjJqd3lOdlhIdTR0VWZmQTZIWGp3V2o2VlN0YnFoQzU1SWNhUFY2aHNxT2dhSVNGZVFSYi9YZ0IrUmRRbDB3czBOUEw5U1ZiYXVIKzNlc0hjZWhJdW1TVnlibmp6UUg0M29CY0dXdUFUQVlWNWtmekRReEdabFU5RlRFOFBGWHFmbWVrU1FLY2d6bzlFbWtvaERYNUNWWnRNU0tkZ0tyV3ZhbkIrY2VlYXJuaFM3YmYrZFpLdUgrazcvK1IwVVExdk5yeWhrTkRxK3BzU1NvcG9EMXNkVUZiZ2hXUmdCb1VTSlNqa1JWQ1VoVWVNUlI0ZGdRQ3lJUEsrQUkxYlZZVDJ4VjBzZTE5UEhFK25kZW5JQVVvSGJtalFBd3RvNmNTNUVlMXhZMEJKS3dLRzMzM2o5MnJOL0ZSajFaQ29keStSTDZ3MWRESk54dWJ4UkxveU13QUkwcWxVK1VsRTJlSDQzWkxLQXJFQTlQMWNIRVI2TmQwUzdHM1RyV0RHc0FTalc2SVFVL3V3bmJvdDBRd0E2Sy9TM2FOSDFnUmJCam9mZ0IzM1hlZmlSazVvUVZqYzJmQjhJVzJpWFNrYlg1UFVZTExYdHNuS3Bua2dLcm8vS1pWUGlnMllEN1h2a3d4LzV2Yi9MeHRXdGFaVXR5TWMvSGltSlRqUC9PRzVSN3hCdUJIN1FzVDBISU1QdWVIYkxkNXVCMHd6OGVoajJ3c0JEc0doVUpKd0dZUlhsZmw0cGlGcVJibTJTLzdpakJqY0tkam1NemdVQTBjUGphZkhJU0oxOS9xdUxiLzRyRnpycGJDWlRIQzZ0VkRRRkxGVC84cTNGZURLUlNPVnE1VTJlQkdEa0hLT05PVmtHNllmSXBSVnVhYk9yQ1FEb0RvQTRwRFVEdUhKNnpQZWl5M2h0L0ptUDdvamVCaUI2MndRUHFoSGk1SGdlM0FVOEF3ajdlcU9XeTJZZWZ1aWhYbU1ONklQZ0VPSlZYVnAzL1ZEUVJBaXc1YUhxWmptYjBTeVBySysxZFowMHkwRnFiUGg5bi82SEk4ZnZmNmRiRDhRQkZSbDFncUkzZmtJL01aUS95Yml0cUFXUlEwQ0JDNy85S0V5aEYwYmZEcmZHWVVBd2pvOG1MQ0x0c29XR1c4NS9pNDZpa1QyMjlaWk9paHJOUWkydXJKOS85bCtxODZjVkZkeExQbFVjSzgzZFVxbFRHQjdhWEYrWEpFNlN0RzY3QTZ3dWlkU1AzcStFeGxNQXlIaXBqcy9PR3p4R1VqVC9ZSUwyaE10R2lzbzJZREdqWlVNT3ZmOUFQeUF4YUM5QVZiYTFWaEhDYjVVa2NLWW9LcFhOQ3FEL3JuMEhQTE50ZEkwdzlQVlUzT3AwZkJkd1A5cFY1aVM1V2Uzb0dwRTB1Vlp6b01MY2R2MzB2MzFwZVgyamIvSjIwQitSdnQ4U0Z1VGZwNWIrUFdSNDZ4L0FLb0ZmanlhZkpDTEpQSUN0ck1oUXNPQnZCREU2cWdFNFRLT0VpdWFmbzgyL3lGRzg4d3BZVWpBb21hWVJuRC8xbmN2UC9iWGRYbFQxZE4vUVJHYnlybGJMbGYxTnlLL3FSbFhWbFdRNmEzWXRIRHFneXdQYmNGeWs2a0M5UWR2a3JxNEZsbWxMQWdsOEx3S3M2TldqZHdHS3NDdlkrbUNNM3JVbkU4MldRQWkzV21GYjN3WDJoQVZSd0NBTlhTamV4Y1dWZENZek5qbldiVmVNWG5TVVR3VUoxbW1IUGhnVUdyMWZreURWcXFZaXNWUW1Cc0R2STZycHdkS2I1MTUvN2gvcmJhY3dkVkFINGJrRllPRi9qTk4veUs5b3JveHRLVFg4NzBIODl4d01mL3pmT3dNOWVNdGR3ZjhVQWFzY01nSjA5YTFUWjc3NzF5c3pMd1BZcDNQRG1iNEJuNGxHMTlHNWxvRE5acjJYNmk5Q0FOdjFCdk1CTGdCVFhjc0dhVTJUY2VvNjhzVlZWbTdZbWhSdDlFZGJzT0JYQWE2MjlubTJRRDRDYzZBRGVueFBKdHFVOXJZeU96b3VFNzFkRUpRYjNOcVdZZHpLT0ladlhMOHhQRG8yV0N4ME82MWV4eExnTG1PSzJXNEhBSWVST2tLOExEZnJOc1Z1UEtPNFBvaXlNSm5oQldaZS9OSExiLzdvUy9XR29XY0hVNm5rT3pNNS95RkdVVGpJTzZNOCtNZWFOdXJ0bzNjbXdINzhiVnZMaktKM2luckhVWEZFb2NEUHFOcXhadDUrNWZUVGYzL3IzSGM0N0lDSVMrV0d0SmpjYVRhc2Jqdk9kMEszMitsNDJlRnRpcXIxbWh1QjB3VTNocG5uaDlGMmZTTE9IT3YvRUhJbHZYRVVVYmlYNnFyZVpxWm54bU9QRllkc1VtSkJCQktRSDVBYlFvSUlpZTJBQkw4RUR2d0pKSDRDOTNCQ0hEZ2drSUFJa0xQWjJmQXlkandlVCsvZDFkWE45OHFKT0RLeVBDTzdwMVg5NmkzZjk5NnJ4M1lXN3RQakZwR0tpb1VHYUNzaWpFa1ZVOVhnTTQyWWFwcU9KbFVwRU9rSkZ0TEFZVUNaOUxZU2w2VjJMMnJzd3RlaGZUWW9kRkU4ZmZ4azg5WFhKeXZETWsrenJIQ0VGUXo2ZVpJMlNqZmMyYTBmK21tbTRrVThpUndCa3p5QjE3T21yL1NNNHVqT0R6LytmUHViQi9lMmFvT0gwMHNoMTZueWx6L2RpN2hKUXJKZWFwMytiSngxbzhBWmNjUDA4RnNiWUN5Tm5lMTd2LzEwKzlmdnY5Mys1YnV1V29TajgzNjBzanBkaFl4UDV6TkljN28reXRPbGJQMXoxMjR3eTB5T0huVlZMSVRYcWFveE9QZmQxVEdUYVhWLzE3ZzdBOG1USG1kdzZqQVRTNHRLYjVNaWZkWk9rZnBYUUl5Ly9Hd1RORWJCb1ZFekxBVEx3S29sdFltUW42bHIwSEtvRnh5WitYeStHQTJpano3K2tCdjU3cE1IVlpVRG93UGhuSjRzQVhHQmhMVERZNUJqdGt3WkVMakRscWNxVFVwc2RUVHFsY1hpOEdtRmdEaTlldTNTR3pjdmJMNTkrZnFONmVYckk4K3lqUDk1bFlhUlZNYnljUC9vNE9IenZlM2ovVWVMdlhzeTJROEhRMjkwTHVoTnVvYU9INE1oMWNYSklCcEgwVENMRjdJc3B4YzI4ZlY0OXRCc0NtcGhWTUJJcGhzNnc4aFJtYno3WlBIM29ZYzQ2THJrbmtndkdBRThHcGtoYy9nZ1BKRkdDVGtjV1YyV2lJYXZZYkVTT01vODY0dGpUVlVCcmRXdERzdXFxeVdDbFlTc29Zd0hSeWZUeWZpVFR6K3dtL2hnYjcvSUY0ek9rUElsUEZQVndCY0NoR0xycTlwY25xYXF6b0ZDSzhWbWh5bDJwdy8yTmdDWWJMUFRvMlJCSXh2OGxjSEt1YXZCOVBMNksxZEhrNDFndEJLRUE5QTBFQjQ2b0lWNFhCWjFrZEg0c2ZnNG5mOURCNE9hQW1FVE4ySWlCQ3IxZ1BGN1VXT0k5SGdmMFUwRWc5R3dyMVNkekdtaTFIVDlBaDR4bmU5Wk5NS0E0WTZ0aWV2Tm5zamEybmswYTMvZjFZU21MWVViZHBRQzFHTTB0QmpBbndFYkNFRFJTbExFelVZMTVsZWZYNmNpdld3NlhUS2xIa2xZTkw0S1lVcXFPYlk2RUJBVWc2MHFPWi9IcTJ2UnJmZmZEWjF1Tm5zR3pBVWRCbWFCOVpVMTRvTXRLMmtSVCtkWjJvQllNTHZGcHNmZ1hnZytyU21FMCsrSFhEaFFRbXgwbVM0V2lZUldla0dBS0NIQTlIdDBobHQ3RHdGblFPalE2UWlYZ3JLRVBkdnhxY05WVVlyTjY0MXQyTGx0NDA0Z3JKUHBLampJNGV3b1dTWUI3OWJXcG5EWFpYd0lRa0VqOFJTWW9lZjNlY0RUT2xXN1IrMGZoNnp0Uk1oaFhuaGV3QlpGWjdpNHE3U2JSdENud1VpZEtSc2E0RlZsTVFDWCtmVVhFQlprZ1p1WnJhYUxjUERVOU5kUjR4TGxUeUhjUnBYZ1NUUXFEb0JCblN6aThTQzg5ZDQ3cThOZ2RyQ2JGYlhSSkxaUmwzbWRKMGt0OWN3K3NCUHUxSTFWNUFYRVRtYmVxcXhzOFpkYUdxT1JvOHUzSGVQTTgzM3VlaVlOekxLWUVOd2ZFRW9RdnVORkNGb21LQi96ckk0Uk9KUTFsZUFGVFloaWppQmF4SmdlTWVuQ3Y2WTVZcitVWmRZTGZXaHhXK1ZRYlZ4akVzVHZET0g3bzhDM2kvbzBlM2FzL2p6MjRUcDY0T2wwRnRFaWhWWFU0TmhScHcycEd5V2RaRTFDb1RFUVZabkdWWllBT3F4Unl4cTF2RGRuekV3SEhzcWhnSFpRektRM1NZa3dTb3BTbndNQTcySVozMyt3TTF4ZHYzVHhQSUZiUTNTMjY5aUdFRVRpVEpxcG9IdWZWZTI2SHVPaUpiNW9BVDk0Z2daTWhqM2hoVUZSTllMT3Rqa2d6NVp1ektLYVhGTmFscVB6YmhCTlJ6Q0hZSUkwWlE2WFR5a0owRVUzN0EvN295Z1FEbDBQSXBGWGdObGR6K2RyWXdRUE9oZ0NoUUlyTkdRQmZPc01KZzUyaEZWeVdlOGRkMzhkdTQzbGg0SW1pMURCbEFwaUZudy8vSW51STZLc05yMUlPd3liNlU1VXJLd0JrWDV6ZzczQVhhM3RjTkFlV2h4Smx6cEdsSzRwMHNOYkRvbXJvOVVUWFBhOU5DdTJ0dTVEQmE1Y3VjSU5xSXZEZ2pGd2wvREEyRUhYcVpWVlEwaXdDc1AxZkVlNGxOcXpvVW9NLzVKWkNYTWNEUHBSUHd4N2RLZ2M4Tm9QSUFqdmJJT1k3dnV4NkpscjIrcThzTmVQNExnaFpDR0ltMVo1VVpjVjF1UmJEbWlGRlFXVzFhUlVxb0ZzNFY5bFpjZ0tNVXlNeGw2UDg2NHBUNUx0V1gxbjdqSFI5NnhhNTBUZ2VGcnNsdVlNc0xzU2VnTE9xMkJOMUZoYjRYbWhjTmc4ZUgzYXpKdHZiY0RLcUMvYzdHaHRSTjZwclJiM1V2OUJIN290R2JabVk3YXUzSE5PTkdscjYvRXlqdGMzTmp4Ym1qUkRZV0NCQndVaHBhYmdWSmtqcVEvY2REbWwwUnp1K0dIZ0JDRVc1UGQ3M0hYMU5GelNLZ2E3d3lYY2hRa0VIZ0NDWUVSenBlUDYwZXJGSVBBRUxqYnR1a2lyR3N4TU5CSkJIazRzaUNJZkNxdktwTWxqWGJaaGdOY21udFBvM0w3SEF4ZFJycTFVdWtoMjV2YkRkS0NrQ2pnTjNLSlVrcDVsWUZHVGZZMk5wY1p5YlVBd2M2d1ArdzN3UWFkZ0hjcFdJdWI5SzhBQTh5UUNMc0ZoeXUwQUFBQUFTVVZPUks1Q1lJST1cIiIsImV4cG9ydCBkZWZhdWx0IHtcImFwcGlkXCI6XCJcIn0iXSwic291cmNlUm9vdCI6IiJ9
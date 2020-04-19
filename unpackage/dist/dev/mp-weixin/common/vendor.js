(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
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

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

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


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

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
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
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
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
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
      var returnValue = wx[options.name || methodName].apply(wx, args);
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
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


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
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
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
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
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

  _vue.default.prototype.mpHost = "mp-weixin";

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
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
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

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

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

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
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

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

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

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

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
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
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
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
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

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

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
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

  return platformList["mp-weixin"];
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

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
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "印记菜谱", "enablePullDownRefresh": false, "usingComponents": { "search-view": "/components/search/search", "swiper-view": "/components/swiper/swiper", "groom-view": "/components/groom/groom", "goods-view": "/components/goods/goods", "share-view": "/components/share/share" }, "usingAutoImportComponents": {} }, "pages/classify/classify": { "navigationBarTitleText": "分类", "enablePullDownRefresh": false, "usingComponents": { "search-view": "/components/search/search", "share-view": "/components/share/share" }, "usingAutoImportComponents": {} }, "pages/search/search": { "navigationBarTitleText": "搜索", "enablePullDownRefresh": false, "usingComponents": { "search-view": "/components/search/search", "goods-item-view": "/components/goods/item", "share-view": "/components/share/share" }, "usingAutoImportComponents": {} }, "pages/detail/detail": { "navigationBarTitleText": "详情", "enablePullDownRefresh": false, "usingComponents": { "share-view": "/components/share/share" }, "usingAutoImportComponents": {} } }, "globalStyle": { "navigationBarTextStyle": "white", "navigationBarTitleText": "看图", "navigationBarBackgroundColor": "#333333", "backgroundColor": "#EFEFEF" } };exports.default = _default;

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
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
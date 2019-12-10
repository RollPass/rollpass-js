"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.function.name");

require("core-js/modules/es.map");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebController = exports.WebException = exports.ErrorMessage = exports.ErrorCode = exports.AuthenticationState = void 0;

require("regenerator-runtime/runtime");

var _ClientController = require("./ClientController");

var _qs = require("qs");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AuthenticationState;
exports.AuthenticationState = AuthenticationState;

(function (AuthenticationState) {
  AuthenticationState["UNAUTHENTICATED"] = "UNAUTHENTICATED";
  AuthenticationState["SESSION_EXPIRED"] = "SESSION_EXPIRED";
  AuthenticationState["AUTHENTICATED"] = "AUTHENTICATED";
})(AuthenticationState || (exports.AuthenticationState = AuthenticationState = {}));

var ErrorCode;
/**
 * @ignore
 */

exports.ErrorCode = ErrorCode;

(function (ErrorCode) {
  ErrorCode["UNINITIALIZED_CLIENT"] = "UNINITIALIZED_CLIENT";
  ErrorCode["NO_STORED_SESSION"] = "NO_STORED_SESSION";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));

var ErrorMessage;
exports.ErrorMessage = ErrorMessage;

(function (ErrorMessage) {
  ErrorMessage["UNINITIALIZED_CLIENT"] = "RollPass was not initialized. See https://rollpass.io/docs/js/enums/errorcode#UNINITIALIZED_CLIENT for more information.";
  ErrorMessage["NO_STORED_SESSION"] = "No local session found. See https://rollpass.io/docs/js/enums/errorcode#NO_STORED_SESSION for more information.";
})(ErrorMessage || (exports.ErrorMessage = ErrorMessage = {}));

var WebException =
/*#__PURE__*/
function (_Error) {
  _inherits(WebException, _Error);

  function WebException(name, message) {
    var _this;

    _classCallCheck(this, WebException);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebException).call(this));
    _this.name = name;
    _this.message = message;
    return _this;
  }

  return WebException;
}(_wrapNativeSuper(Error));
/**
 * @category Browser
 */


exports.WebException = WebException;

var WebController =
/*#__PURE__*/
function () {
  function WebController(clientOptions) {
    var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.localStorage;
    var apiOptions = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, WebController);

    _defineProperty(this, "sessionKey", "__rollpass_session_id__");

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "clientController", void 0);

    this.storage = storage;
    this.clientController = new _ClientController.ClientController(clientOptions, apiOptions);
  }

  _createClass(WebController, [{
    key: "getUser",
    value: function getUser() {
      var authenticationState;
      return regeneratorRuntime.async(function getUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.getAuthenticationState());

            case 2:
              authenticationState = _context.sent;

              if (!(authenticationState === AuthenticationState.AUTHENTICATED)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", this.clientController.getUser(this.getSessionCodeOrThrow()));

            case 7:
              throw authenticationState;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "sendChallenge",
    value: function sendChallenge(emailAddress) {
      return regeneratorRuntime.async(function sendChallenge$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.clientController.sendChallenge(emailAddress));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getStoreValue",
    value: function getStoreValue(key) {
      return regeneratorRuntime.async(function getStoreValue$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.clientController.getKeyValue(key));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "setStoreValue",
    value: function setStoreValue(key, value) {
      return regeneratorRuntime.async(function setStoreValue$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", this.clientController.putKeyValue(key, value));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "signOut",
    value: function signOut() {
      var sessionCode = this.getSessionCode();

      if (sessionCode) {
        this.clientController.deleteSession(this.getSessionCode()).then(function (_) {});
        this.storage.removeItem(this.sessionKey);
      }
    }
  }, {
    key: "getAuthenticationState",
    value: function getAuthenticationState() {
      var currentUrl,
          code,
          storedSessionCode,
          _ref,
          session,
          _args5 = arguments;

      return regeneratorRuntime.async(function getAuthenticationState$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              currentUrl = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : window.location.search;
              // try to obtain a challenge code from url if present
              code = parseCodeFromUrl(currentUrl); // try to get last session code from storage

              storedSessionCode = this.getSessionCode();

              if (!code) {
                _context5.next = 16;
                break;
              }

              _context5.next = 6;
              return regeneratorRuntime.awrap(this.clientController.verifyChallenge(code));

            case 6:
              _ref = _context5.sent;
              session = _ref.session;

              if (!session) {
                _context5.next = 13;
                break;
              }

              this.storage.setItem(this.sessionKey, session.code);
              return _context5.abrupt("return", AuthenticationState.AUTHENTICATED);

            case 13:
              return _context5.abrupt("return", AuthenticationState.UNAUTHENTICATED);

            case 14:
              _context5.next = 23;
              break;

            case 16:
              if (!storedSessionCode) {
                _context5.next = 22;
                break;
              }

              _context5.next = 19;
              return regeneratorRuntime.awrap(this.getSessionState(storedSessionCode));

            case 19:
              return _context5.abrupt("return", _context5.sent);

            case 22:
              return _context5.abrupt("return", AuthenticationState.UNAUTHENTICATED);

            case 23:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getSessionCode",
    value: function getSessionCode() {
      return coalesce(this.storage.getItem(this.sessionKey));
    }
  }, {
    key: "getSessionState",
    value: function getSessionState(sessionCode) {
      var currentSession;
      return regeneratorRuntime.async(function getSessionState$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.clientController.getSession(sessionCode));

            case 2:
              currentSession = _context6.sent;
              return _context6.abrupt("return", currentSession.status === 'VALID' ? AuthenticationState.AUTHENTICATED : AuthenticationState.SESSION_EXPIRED);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getSessionCodeOrThrow",
    value: function getSessionCodeOrThrow() {
      var storedSessionCode = this.getSessionCode();

      if (storedSessionCode == null) {
        throw new WebException(ErrorCode.NO_STORED_SESSION, ErrorMessage.NO_STORED_SESSION);
      }

      return storedSessionCode;
    }
  }]);

  return WebController;
}();
/**
 * @ignore
 */


exports.WebController = WebController;

function coalesce(value) {
  if (!value || value == "undefined" || value == "null") {
    return null;
  } else {
    return value;
  }
}
/**
 * @ignore
 */


function parseCodeFromUrl(currentUrl) {
  var _parse = (0, _qs.parse)(currentUrl, {
    ignoreQueryPrefix: true
  }),
      code = _parse.code;

  return coalesce(code);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wdWJsaWMvY29udHJvbGxlcnMvV2ViQ29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJBdXRoZW50aWNhdGlvblN0YXRlIiwiRXJyb3JDb2RlIiwiRXJyb3JNZXNzYWdlIiwiV2ViRXhjZXB0aW9uIiwibmFtZSIsIm1lc3NhZ2UiLCJFcnJvciIsIldlYkNvbnRyb2xsZXIiLCJjbGllbnRPcHRpb25zIiwic3RvcmFnZSIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImFwaU9wdGlvbnMiLCJjbGllbnRDb250cm9sbGVyIiwiQ2xpZW50Q29udHJvbGxlciIsImdldEF1dGhlbnRpY2F0aW9uU3RhdGUiLCJhdXRoZW50aWNhdGlvblN0YXRlIiwiQVVUSEVOVElDQVRFRCIsImdldFVzZXIiLCJnZXRTZXNzaW9uQ29kZU9yVGhyb3ciLCJlbWFpbEFkZHJlc3MiLCJzZW5kQ2hhbGxlbmdlIiwia2V5IiwiZ2V0S2V5VmFsdWUiLCJ2YWx1ZSIsInB1dEtleVZhbHVlIiwic2Vzc2lvbkNvZGUiLCJnZXRTZXNzaW9uQ29kZSIsImRlbGV0ZVNlc3Npb24iLCJ0aGVuIiwiXyIsInJlbW92ZUl0ZW0iLCJzZXNzaW9uS2V5IiwiY3VycmVudFVybCIsImxvY2F0aW9uIiwic2VhcmNoIiwiY29kZSIsInBhcnNlQ29kZUZyb21VcmwiLCJzdG9yZWRTZXNzaW9uQ29kZSIsInZlcmlmeUNoYWxsZW5nZSIsInNlc3Npb24iLCJzZXRJdGVtIiwiVU5BVVRIRU5USUNBVEVEIiwiZ2V0U2Vzc2lvblN0YXRlIiwiY29hbGVzY2UiLCJnZXRJdGVtIiwiZ2V0U2Vzc2lvbiIsImN1cnJlbnRTZXNzaW9uIiwic3RhdHVzIiwiU0VTU0lPTl9FWFBJUkVEIiwiTk9fU1RPUkVEX1NFU1NJT04iLCJpZ25vcmVRdWVyeVByZWZpeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7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QUFDRDs7O29DQUU2Qk4sVzs7Ozs7Ozs4Q0FDQyxLQUFLYixnQkFBTCxDQUFzQmlDLFVBQXRCLENBQWlDcEIsV0FBakMsQzs7O0FBQXZCcUIsY0FBQUEsYztnREFDQ0EsY0FBYyxDQUFDQyxNQUFmLEtBQTBCLE9BQTFCLEdBQ0hoRCxtQkFBbUIsQ0FBQ2lCLGFBRGpCLEdBRUhqQixtQkFBbUIsQ0FBQ2lELGU7Ozs7Ozs7Ozs7OzRDQUdXO0FBQ25DLFVBQU1YLGlCQUFpQixHQUFHLEtBQUtYLGNBQUwsRUFBMUI7O0FBQ0EsVUFBSVcsaUJBQWlCLElBQUksSUFBekIsRUFBK0I7QUFDN0IsY0FBTSxJQUFJbkMsWUFBSixDQUNKRixTQUFTLENBQUNpRCxpQkFETixFQUVKaEQsWUFBWSxDQUFDZ0QsaUJBRlQsQ0FBTjtBQUlEOztBQUNELGFBQU9aLGlCQUFQO0FBQ0Q7Ozs7O0FBR0g7Ozs7Ozs7QUFHQSxTQUFTTSxRQUFULENBQWtCcEIsS0FBbEIsRUFBOEI7QUFDNUIsTUFBSSxDQUFDQSxLQUFELElBQVVBLEtBQUssSUFBSSxXQUFuQixJQUFrQ0EsS0FBSyxJQUFJLE1BQS9DLEVBQXVEO0FBQ3JELFdBQU8sSUFBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU9BLEtBQVA7QUFDRDtBQUNGO0FBRUQ7Ozs7O0FBR0EsU0FBU2EsZ0JBQVQsQ0FBMEJKLFVBQTFCLEVBQThDO0FBQUEsZUFDN0IsZUFBTUEsVUFBTixFQUFrQjtBQUFDa0IsSUFBQUEsaUJBQWlCLEVBQUU7QUFBcEIsR0FBbEIsQ0FENkI7QUFBQSxNQUNyQ2YsSUFEcUMsVUFDckNBLElBRHFDOztBQUU1QyxTQUFPUSxRQUFRLENBQUNSLElBQUQsQ0FBZjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlPcHRpb25zfSBmcm9tIFwiLi4vLi4vcHJvdGVjdGVkL0FwaUNvbnRyb2xsZXJcIjtcbmltcG9ydCB7Q2xpZW50Q29udHJvbGxlciwgQ2xpZW50T3B0aW9uc30gZnJvbSBcIi4vQ2xpZW50Q29udHJvbGxlclwiO1xuaW1wb3J0IHtwYXJzZX0gZnJvbSBcInFzXCI7XG5cbmV4cG9ydCBlbnVtIEF1dGhlbnRpY2F0aW9uU3RhdGUge1xuICBVTkFVVEhFTlRJQ0FURUQgPSBcIlVOQVVUSEVOVElDQVRFRFwiLFxuICBTRVNTSU9OX0VYUElSRUQgPSBcIlNFU1NJT05fRVhQSVJFRFwiLFxuICBBVVRIRU5USUNBVEVEID0gXCJBVVRIRU5USUNBVEVEXCJcbn1cblxuZXhwb3J0IGVudW0gRXJyb3JDb2RlIHtcbiAgVU5JTklUSUFMSVpFRF9DTElFTlQgPSBcIlVOSU5JVElBTElaRURfQ0xJRU5UXCIsXG4gIC8qKlxuICAgKiBObyBzZXNzaW9uIHdhcyBmb3VuZCBsb2NhbGx5LiBUaGlzIGNvdWxkIG1lYW4gdGhhdCB5b3UgaGF2ZW4ndCBhdXRoZW50aWNhdGVkIHRoZSB1c2VyIHlldC5cbiAgICogWW91IHNob3VsZCBjYWxsIGBnZXRBdXRoZW50aWNhdGlvblN0YXRlYCBvbmNlIGF0IGFwcGxpY2F0aW9uIGxvYWQgdG8gZ2V0IGEgbG9jYWwgc2Vzc2lvbiBiZWZvcmUgY2FsbGluZyBzZXNzaW9uIGRlcGVuZGVudCBtZXRob2RzLlxuICAgKi9cbiAgTk9fU1RPUkVEX1NFU1NJT04gPSBcIk5PX1NUT1JFRF9TRVNTSU9OXCJcbn1cblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBlbnVtIEVycm9yTWVzc2FnZSB7XG4gIFVOSU5JVElBTElaRURfQ0xJRU5UID0gXCJSb2xsUGFzcyB3YXMgbm90IGluaXRpYWxpemVkLiBTZWUgaHR0cHM6Ly9yb2xscGFzcy5pby9kb2NzL2pzL2VudW1zL2Vycm9yY29kZSNVTklOSVRJQUxJWkVEX0NMSUVOVCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cIixcbiAgTk9fU1RPUkVEX1NFU1NJT04gPSBcIk5vIGxvY2FsIHNlc3Npb24gZm91bmQuIFNlZSBodHRwczovL3JvbGxwYXNzLmlvL2RvY3MvanMvZW51bXMvZXJyb3Jjb2RlI05PX1NUT1JFRF9TRVNTSU9OIGZvciBtb3JlIGluZm9ybWF0aW9uLlwiXG59XG5cbmludGVyZmFjZSBJU3RvcmFnZSB7XG4gIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBhbnk7XG5cbiAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQ7XG5cbiAgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBXZWJFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IEVycm9yQ29kZSwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cbn1cblxuLyoqXG4gKiBAY2F0ZWdvcnkgQnJvd3NlclxuICovXG5leHBvcnQgY2xhc3MgV2ViQ29udHJvbGxlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvbktleSA9IFwiX19yb2xscGFzc19zZXNzaW9uX2lkX19cIjtcbiAgcHJpdmF0ZSByZWFkb25seSBzdG9yYWdlOiBJU3RvcmFnZTtcbiAgcHJpdmF0ZSByZWFkb25seSBjbGllbnRDb250cm9sbGVyOiBDbGllbnRDb250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNsaWVudE9wdGlvbnM6IENsaWVudE9wdGlvbnMsXG4gICAgc3RvcmFnZTogSVN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlLFxuICAgIGFwaU9wdGlvbnM/OiBQYXJ0aWFsPEFwaU9wdGlvbnM+XG4gICkge1xuICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgdGhpcy5jbGllbnRDb250cm9sbGVyID0gbmV3IENsaWVudENvbnRyb2xsZXIoY2xpZW50T3B0aW9ucywgYXBpT3B0aW9ucylcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXIoKTogUHJvbWlzZTxhbnk+IHtcblxuICAgIGNvbnN0IGF1dGhlbnRpY2F0aW9uU3RhdGUgPSBhd2FpdCB0aGlzLmdldEF1dGhlbnRpY2F0aW9uU3RhdGUoKTtcbiAgICBpZiAoYXV0aGVudGljYXRpb25TdGF0ZSA9PT0gQXV0aGVudGljYXRpb25TdGF0ZS5BVVRIRU5USUNBVEVEKSB7XG4gICAgICByZXR1cm4gdGhpcy5jbGllbnRDb250cm9sbGVyLmdldFVzZXIodGhpcy5nZXRTZXNzaW9uQ29kZU9yVGhyb3coKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGF1dGhlbnRpY2F0aW9uU3RhdGVcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZW5kQ2hhbGxlbmdlKGVtYWlsQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnRDb250cm9sbGVyLnNlbmRDaGFsbGVuZ2UoZW1haWxBZGRyZXNzKTtcbiAgfVxuXG4gIGFzeW5jIGdldFN0b3JlVmFsdWUoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNsaWVudENvbnRyb2xsZXIuZ2V0S2V5VmFsdWUoa2V5KTtcbiAgfVxuXG4gIGFzeW5jIHNldFN0b3JlVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNsaWVudENvbnRyb2xsZXIucHV0S2V5VmFsdWUoa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBzaWduT3V0KCk6IHZvaWQge1xuICAgIGNvbnN0IHNlc3Npb25Db2RlID0gdGhpcy5nZXRTZXNzaW9uQ29kZSgpO1xuICAgIGlmIChzZXNzaW9uQ29kZSkge1xuICAgICAgdGhpcy5jbGllbnRDb250cm9sbGVyLmRlbGV0ZVNlc3Npb24odGhpcy5nZXRTZXNzaW9uQ29kZSgpKS50aGVuKF8gPT4ge1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnNlc3Npb25LZXkpO1xuICAgIH1cbiAgfVxuXG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRBdXRoZW50aWNhdGlvblN0YXRlKGN1cnJlbnRVcmw6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpOiBQcm9taXNlPEF1dGhlbnRpY2F0aW9uU3RhdGU+IHtcblxuICAgIC8vIHRyeSB0byBvYnRhaW4gYSBjaGFsbGVuZ2UgY29kZSBmcm9tIHVybCBpZiBwcmVzZW50XG4gICAgY29uc3QgY29kZSA9IHBhcnNlQ29kZUZyb21VcmwoY3VycmVudFVybCk7XG5cbiAgICAvLyB0cnkgdG8gZ2V0IGxhc3Qgc2Vzc2lvbiBjb2RlIGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JlZFNlc3Npb25Db2RlID0gdGhpcy5nZXRTZXNzaW9uQ29kZSgpO1xuXG4gICAgaWYgKGNvZGUpIHtcbiAgICAgIC8vIGlmIGNvZGUgaXMgaW4gdXJsIG1lYW5zIHdlIGFyZSByZWNlaXZpbmcgYSBjaGFsbGVuZ2UgcmVkaXJlY3RcbiAgICAgIC8vIHRyeSB0byB2ZXJpZnkgdGhlIGNoYWxsZW5nZSBmb3IgYSBzZXNzaW9uXG4gICAgICBjb25zdCB7c2Vzc2lvbn0gPSBhd2FpdCB0aGlzLmNsaWVudENvbnRyb2xsZXIudmVyaWZ5Q2hhbGxlbmdlKGNvZGUpO1xuICAgICAgaWYgKHNlc3Npb24pIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0odGhpcy5zZXNzaW9uS2V5LCBzZXNzaW9uLmNvZGUpO1xuICAgICAgICByZXR1cm4gQXV0aGVudGljYXRpb25TdGF0ZS5BVVRIRU5USUNBVEVEO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEF1dGhlbnRpY2F0aW9uU3RhdGUuVU5BVVRIRU5USUNBVEVEO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RvcmVkU2Vzc2lvbkNvZGUpIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldFNlc3Npb25TdGF0ZShzdG9yZWRTZXNzaW9uQ29kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEF1dGhlbnRpY2F0aW9uU3RhdGUuVU5BVVRIRU5USUNBVEVEO1xuICAgIH1cbiAgfVxuXG4gIGdldFNlc3Npb25Db2RlKCk6IGFueSB7XG4gICAgcmV0dXJuIGNvYWxlc2NlKHRoaXMuc3RvcmFnZS5nZXRJdGVtKHRoaXMuc2Vzc2lvbktleSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRTZXNzaW9uU3RhdGUoc2Vzc2lvbkNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IGN1cnJlbnRTZXNzaW9uID0gYXdhaXQgdGhpcy5jbGllbnRDb250cm9sbGVyLmdldFNlc3Npb24oc2Vzc2lvbkNvZGUpO1xuICAgIHJldHVybiBjdXJyZW50U2Vzc2lvbi5zdGF0dXMgPT09ICdWQUxJRCdcbiAgICAgID8gQXV0aGVudGljYXRpb25TdGF0ZS5BVVRIRU5USUNBVEVEXG4gICAgICA6IEF1dGhlbnRpY2F0aW9uU3RhdGUuU0VTU0lPTl9FWFBJUkVEO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTZXNzaW9uQ29kZU9yVGhyb3coKTogYW55IHtcbiAgICBjb25zdCBzdG9yZWRTZXNzaW9uQ29kZSA9IHRoaXMuZ2V0U2Vzc2lvbkNvZGUoKTtcbiAgICBpZiAoc3RvcmVkU2Vzc2lvbkNvZGUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFdlYkV4Y2VwdGlvbihcbiAgICAgICAgRXJyb3JDb2RlLk5PX1NUT1JFRF9TRVNTSU9OLFxuICAgICAgICBFcnJvck1lc3NhZ2UuTk9fU1RPUkVEX1NFU1NJT05cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBzdG9yZWRTZXNzaW9uQ29kZTtcbiAgfVxufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gY29hbGVzY2UodmFsdWU6IGFueSkge1xuICBpZiAoIXZhbHVlIHx8IHZhbHVlID09IFwidW5kZWZpbmVkXCIgfHwgdmFsdWUgPT0gXCJudWxsXCIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ29kZUZyb21VcmwoY3VycmVudFVybDogc3RyaW5nKSB7XG4gIGNvbnN0IHtjb2RlfSA9IHBhcnNlKGN1cnJlbnRVcmwsIHtpZ25vcmVRdWVyeVByZWZpeDogdHJ1ZX0pO1xuICByZXR1cm4gY29hbGVzY2UoY29kZSk7XG59XG4iXX0=
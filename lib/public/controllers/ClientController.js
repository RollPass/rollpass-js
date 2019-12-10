"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientController = void 0;

require("regenerator-runtime/runtime");

var _ApiController2 = require("../../protected/ApiController");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * ClientController
 * @category Common
 */
var ClientController =
/*#__PURE__*/
function (_ApiController) {
  _inherits(ClientController, _ApiController);

  function ClientController(clientOptions, apiOptions) {
    var _this;

    _classCallCheck(this, ClientController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClientController).call(this, apiOptions));

    _defineProperty(_assertThisInitialized(_this), "clientOptions", void 0);

    _this.clientOptions = clientOptions;
    return _this;
  }

  _createClass(ClientController, [{
    key: "getSession",
    value: function getSession(sessionCode) {
      return regeneratorRuntime.async(function getSession$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.request("GET", "/session", _objectSpread({}, this.clientOptions, {
                sessionCode: sessionCode
              })));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteSession",
    value: function deleteSession(sessionCode) {
      return regeneratorRuntime.async(function deleteSession$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.request("DELETE", "/session", _objectSpread({}, this.clientOptions, {
                sessionCode: sessionCode
              })));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "sendChallenge",
    value: function sendChallenge(emailAddress) {
      return regeneratorRuntime.async(function sendChallenge$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.request("POST", "/challenge/send", _objectSpread({}, this.clientOptions, {
                emailAddress: emailAddress
              })));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyChallenge",
    value: function verifyChallenge(challengeCode) {
      return regeneratorRuntime.async(function verifyChallenge$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", this.request("GET", "/challenge/verify", _objectSpread({}, this.clientOptions, {
                challengeCode: challengeCode
              })));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUser",
    value: function getUser(sessionCode) {
      return regeneratorRuntime.async(function getUser$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", this.request("GET", "/user", _objectSpread({}, this.clientOptions, {
                sessionCode: sessionCode
              })));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getKeyValue",
    value: function getKeyValue(key) {
      return regeneratorRuntime.async(function getKeyValue$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", this.request("GET", "/key-value", _objectSpread({}, this.clientOptions, {
                key: key
              })));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "putKeyValue",
    value: function putKeyValue(key, value) {
      return regeneratorRuntime.async(function putKeyValue$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", this.request("PUT", "/key-value", _objectSpread({}, this.clientOptions, {
                key: key
              }), value));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteKeyValue",
    value: function deleteKeyValue(key, value) {
      return regeneratorRuntime.async(function deleteKeyValue$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", this.request("DELETE", "/key-value", _objectSpread({}, this.clientOptions, {
                key: key
              })));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ClientController;
}(_ApiController2.ApiController);

exports.ClientController = ClientController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wdWJsaWMvY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJDbGllbnRDb250cm9sbGVyIiwiY2xpZW50T3B0aW9ucyIsImFwaU9wdGlvbnMiLCJzZXNzaW9uQ29kZSIsInJlcXVlc3QiLCJlbWFpbEFkZHJlc3MiLCJjaGFsbGVuZ2VDb2RlIiwia2V5IiwidmFsdWUiLCJBcGlDb250cm9sbGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOzs7O0lBSWFBLGdCOzs7OztBQUdULDRCQUFZQyxhQUFaLEVBQTBDQyxVQUExQyxFQUE0RTtBQUFBOztBQUFBOztBQUN4RSwwRkFBTUEsVUFBTjs7QUFEd0U7O0FBRXhFLFVBQUtELGFBQUwsR0FBcUJBLGFBQXJCO0FBRndFO0FBRzNFOzs7OytCQUVnQkUsVzs7Ozs7K0NBQ04sS0FBS0MsT0FBTCxDQUFhLEtBQWIsRUFBb0IsVUFBcEIsb0JBQ0EsS0FBS0gsYUFETDtBQUVIRSxnQkFBQUEsV0FBVyxFQUFYQTtBQUZHLGlCOzs7Ozs7Ozs7OztrQ0FNU0EsVzs7Ozs7Z0RBQ1QsS0FBS0MsT0FBTCxDQUFhLFFBQWIsRUFBdUIsVUFBdkIsb0JBQ0EsS0FBS0gsYUFETDtBQUVIRSxnQkFBQUEsV0FBVyxFQUFYQTtBQUZHLGlCOzs7Ozs7Ozs7OztrQ0FNU0UsWTs7Ozs7Z0RBQ1QsS0FBS0QsT0FBTCxDQUFhLE1BQWIsRUFBcUIsaUJBQXJCLG9CQUNBLEtBQUtILGFBREw7QUFFSEksZ0JBQUFBLFlBQVksRUFBWkE7QUFGRyxpQjs7Ozs7Ozs7Ozs7b0NBTVdDLGE7Ozs7O2dEQUNYLEtBQUtGLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLG1CQUFwQixvQkFDQSxLQUFLSCxhQURMO0FBRUhLLGdCQUFBQSxhQUFhLEVBQWJBO0FBRkcsaUI7Ozs7Ozs7Ozs7OzRCQU1HSCxXOzs7OztnREFDSCxLQUFLQyxPQUFMLENBQWEsS0FBYixFQUFvQixPQUFwQixvQkFDQSxLQUFLSCxhQURMO0FBRUhFLGdCQUFBQSxXQUFXLEVBQVhBO0FBRkcsaUI7Ozs7Ozs7Ozs7O2dDQU1PSSxHOzs7OztnREFDUCxLQUFLSCxPQUFMLENBQWEsS0FBYixFQUFvQixZQUFwQixvQkFDQSxLQUFLSCxhQURMO0FBRUhNLGdCQUFBQSxHQUFHLEVBQUhBO0FBRkcsaUI7Ozs7Ozs7Ozs7O2dDQU1PQSxHLEVBQWFDLEs7Ozs7O2dEQUNwQixLQUFLSixPQUFMLENBQWEsS0FBYixFQUFvQixZQUFwQixvQkFDQSxLQUFLSCxhQURMO0FBRUhNLGdCQUFBQSxHQUFHLEVBQUhBO0FBRkcsa0JBR0pDLEtBSEksQzs7Ozs7Ozs7Ozs7bUNBTVVELEcsRUFBYUMsSzs7Ozs7Z0RBQ3ZCLEtBQUtKLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLFlBQXZCLG9CQUNBLEtBQUtILGFBREw7QUFFSE0sZ0JBQUFBLEdBQUcsRUFBSEE7QUFGRyxpQjs7Ozs7Ozs7Ozs7O0VBMUR1QkUsNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwaUNvbnRyb2xsZXIsIEFwaU9wdGlvbnN9IGZyb20gXCIuLi8uLi9wcm90ZWN0ZWQvQXBpQ29udHJvbGxlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsaWVudE9wdGlvbnMge1xuICAgIGNsaWVudFRva2VuOiBzdHJpbmc7XG4gICAgcHJvamVjdElkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XG4gICAgaWQ6IHN0cmluZyxcbiAgICB1c2VySGFzaDogc3RyaW5nLFxuICAgIGVtYWlsQWRkcmVzczogc3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogRGF0ZSxcbiAgICB1cGRhdGVkQXQ6IERhdGVcbn1cblxuXG4vKipcbiAqIENsaWVudENvbnRyb2xsZXJcbiAqIEBjYXRlZ29yeSBDb21tb25cbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudENvbnRyb2xsZXIgZXh0ZW5kcyBBcGlDb250cm9sbGVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNsaWVudE9wdGlvbnM6IENsaWVudE9wdGlvbnM7XG5cbiAgICBjb25zdHJ1Y3RvcihjbGllbnRPcHRpb25zOiBDbGllbnRPcHRpb25zLCBhcGlPcHRpb25zPzogUGFydGlhbDxBcGlPcHRpb25zPikge1xuICAgICAgICBzdXBlcihhcGlPcHRpb25zKTtcbiAgICAgICAgdGhpcy5jbGllbnRPcHRpb25zID0gY2xpZW50T3B0aW9ucztcbiAgICB9XG5cbiAgICBhc3luYyBnZXRTZXNzaW9uKHNlc3Npb25Db2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiR0VUXCIsIFwiL3Nlc3Npb25cIiwge1xuICAgICAgICAgICAgLi4udGhpcy5jbGllbnRPcHRpb25zLFxuICAgICAgICAgICAgc2Vzc2lvbkNvZGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZGVsZXRlU2Vzc2lvbihzZXNzaW9uQ29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcIkRFTEVURVwiLCBcIi9zZXNzaW9uXCIsIHtcbiAgICAgICAgICAgIC4uLnRoaXMuY2xpZW50T3B0aW9ucyxcbiAgICAgICAgICAgIHNlc3Npb25Db2RlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIHNlbmRDaGFsbGVuZ2UoZW1haWxBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiUE9TVFwiLCBcIi9jaGFsbGVuZ2Uvc2VuZFwiLCB7XG4gICAgICAgICAgICAuLi50aGlzLmNsaWVudE9wdGlvbnMsXG4gICAgICAgICAgICBlbWFpbEFkZHJlc3NcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5Q2hhbGxlbmdlKGNoYWxsZW5nZUNvZGU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJHRVRcIiwgXCIvY2hhbGxlbmdlL3ZlcmlmeVwiLCB7XG4gICAgICAgICAgICAuLi50aGlzLmNsaWVudE9wdGlvbnMsXG4gICAgICAgICAgICBjaGFsbGVuZ2VDb2RlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGdldFVzZXIoc2Vzc2lvbkNvZGU6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiR0VUXCIsIFwiL3VzZXJcIiwge1xuICAgICAgICAgICAgLi4udGhpcy5jbGllbnRPcHRpb25zLFxuICAgICAgICAgICAgc2Vzc2lvbkNvZGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0S2V5VmFsdWUoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiR0VUXCIsIFwiL2tleS12YWx1ZVwiLCB7XG4gICAgICAgICAgICAuLi50aGlzLmNsaWVudE9wdGlvbnMsXG4gICAgICAgICAgICBrZXlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgcHV0S2V5VmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiUFVUXCIsIFwiL2tleS12YWx1ZVwiLCB7XG4gICAgICAgICAgICAuLi50aGlzLmNsaWVudE9wdGlvbnMsXG4gICAgICAgICAgICBrZXlcbiAgICAgICAgfSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGFzeW5jIGRlbGV0ZUtleVZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcIkRFTEVURVwiLCBcIi9rZXktdmFsdWVcIiwge1xuICAgICAgICAgICAgLi4udGhpcy5jbGllbnRPcHRpb25zLFxuICAgICAgICAgICAga2V5XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19
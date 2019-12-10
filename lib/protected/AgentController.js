"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgentController = void 0;

require("regenerator-runtime/runtime");

var _ApiController2 = require("./ApiController");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 * @ignore
 *
 * For advanced applications interacting with RollPass dashboard
 */
var AgentController =
/*#__PURE__*/
function (_ApiController) {
  _inherits(AgentController, _ApiController);

  function AgentController(agentOptions, apiOptions) {
    var _this;

    _classCallCheck(this, AgentController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AgentController).call(this, apiOptions));

    _defineProperty(_assertThisInitialized(_this), "agentOptions", void 0);

    _this.agentOptions = agentOptions;
    return _this;
  }

  _createClass(AgentController, [{
    key: "getOrCreateAgentForSession",
    value: function getOrCreateAgentForSession(sessionCode) {
      return regeneratorRuntime.async(function getOrCreateAgentForSession$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.request("POST", "/agent", {
                sessionCode: sessionCode
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getAgentProjectsForSession",
    value: function getAgentProjectsForSession(sessionCode) {
      return regeneratorRuntime.async(function getAgentProjectsForSession$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.request("GET", "/agent/projects", {
                sessionCode: sessionCode
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createAgentProjectForSession",
    value: function createAgentProjectForSession(sessionCode, createProjectDto) {
      return regeneratorRuntime.async(function createAgentProjectForSession$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.request("POST", "/agent/projects", {
                sessionCode: sessionCode
              }, createProjectDto));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return AgentController;
}(_ApiController2.ApiController);

exports.AgentController = AgentController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm90ZWN0ZWQvQWdlbnRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbIkFnZW50Q29udHJvbGxlciIsImFnZW50T3B0aW9ucyIsImFwaU9wdGlvbnMiLCJzZXNzaW9uQ29kZSIsInJlcXVlc3QiLCJjcmVhdGVQcm9qZWN0RHRvIiwiQXBpQ29udHJvbGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7SUFLYUEsZTs7Ozs7QUFHWCwyQkFBWUMsWUFBWixFQUF3Q0MsVUFBeEMsRUFBMEU7QUFBQTs7QUFBQTs7QUFDeEUseUZBQU1BLFVBQU47O0FBRHdFOztBQUV4RSxVQUFLRCxZQUFMLEdBQW9CQSxZQUFwQjtBQUZ3RTtBQUd6RTs7OzsrQ0FFZ0NFLFc7Ozs7OytDQUN4QixLQUFLQyxPQUFMLENBQWEsTUFBYixFQUFxQixRQUFyQixFQUErQjtBQUFDRCxnQkFBQUEsV0FBVyxFQUFYQTtBQUFELGVBQS9CLEM7Ozs7Ozs7Ozs7OytDQUd3QkEsVzs7Ozs7Z0RBQ3hCLEtBQUtDLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLGlCQUFwQixFQUF1QztBQUFDRCxnQkFBQUEsV0FBVyxFQUFYQTtBQUFELGVBQXZDLEM7Ozs7Ozs7Ozs7O2lEQUcwQkEsVyxFQUFxQkUsZ0I7Ozs7O2dEQUMvQyxLQUFLRCxPQUFMLENBQWEsTUFBYixFQUFxQixpQkFBckIsRUFBd0M7QUFBQ0QsZ0JBQUFBLFdBQVcsRUFBWEE7QUFBRCxlQUF4QyxFQUF1REUsZ0JBQXZELEM7Ozs7Ozs7Ozs7OztFQWpCMEJDLDZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlDb250cm9sbGVyLCBBcGlPcHRpb25zfSBmcm9tIFwiLi9BcGlDb250cm9sbGVyXCI7XG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuaW50ZXJmYWNlIEFnZW50T3B0aW9ucyB7fVxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmludGVyZmFjZSBBZ2VudFNlc3Npb25EdG8ge1xuICBhZ2VudDogYW55LFxuICBzdGF0dXM6ICdDUkVBVEVEJyB8ICdFWElTVElORydcbn1cbi8qKlxuICogQGlnbm9yZVxuICpcbiAqIEZvciBhZHZhbmNlZCBhcHBsaWNhdGlvbnMgaW50ZXJhY3Rpbmcgd2l0aCBSb2xsUGFzcyBkYXNoYm9hcmRcbiAqL1xuZXhwb3J0IGNsYXNzIEFnZW50Q29udHJvbGxlciBleHRlbmRzIEFwaUNvbnRyb2xsZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IGFnZW50T3B0aW9uczogQWdlbnRPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKGFnZW50T3B0aW9uczogQWdlbnRPcHRpb25zLCBhcGlPcHRpb25zPzogUGFydGlhbDxBcGlPcHRpb25zPikge1xuICAgIHN1cGVyKGFwaU9wdGlvbnMpO1xuICAgIHRoaXMuYWdlbnRPcHRpb25zID0gYWdlbnRPcHRpb25zO1xuICB9XG5cbiAgYXN5bmMgZ2V0T3JDcmVhdGVBZ2VudEZvclNlc3Npb24oc2Vzc2lvbkNvZGU6IHN0cmluZyk6IFByb21pc2U8QWdlbnRTZXNzaW9uRHRvPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcIlBPU1RcIiwgXCIvYWdlbnRcIiwge3Nlc3Npb25Db2RlfSk7XG4gIH1cblxuICBhc3luYyBnZXRBZ2VudFByb2plY3RzRm9yU2Vzc2lvbihzZXNzaW9uQ29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiR0VUXCIsIFwiL2FnZW50L3Byb2plY3RzXCIsIHtzZXNzaW9uQ29kZX0pO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlQWdlbnRQcm9qZWN0Rm9yU2Vzc2lvbihzZXNzaW9uQ29kZTogc3RyaW5nLCBjcmVhdGVQcm9qZWN0RHRvOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJQT1NUXCIsIFwiL2FnZW50L3Byb2plY3RzXCIsIHtzZXNzaW9uQ29kZX0sIGNyZWF0ZVByb2plY3REdG8pXG4gIH1cbn1cbiJdfQ==
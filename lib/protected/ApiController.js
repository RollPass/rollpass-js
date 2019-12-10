"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiController = void 0;

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @ignore
 *
 * Abstract class for other controllers
 */
var ApiController =
/*#__PURE__*/
function () {
  function ApiController(apiOptions) {
    _classCallCheck(this, ApiController);

    _defineProperty(this, "api", void 0);

    this.api = getAxios(_objectSpread({}, _config.defaultApiOptions, apiOptions));
  }

  _createClass(ApiController, [{
    key: "request",
    value: function request(method, path) {
      var params,
          data,
          extractData,
          _args = arguments;
      return regeneratorRuntime.async(function request$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              data = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
              extractData = _args.length > 4 && _args[4] !== undefined ? _args[4] : true;
              return _context.abrupt("return", this.api.request({
                method: method,
                url: path,
                data: data,
                params: params
              }).then(function (res) {
                return extractData ? res.data : res;
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ApiController;
}();
/**
 * @ignore
 */


exports.ApiController = ApiController;

function getAxios(apiOptions) {
  return _axios["default"].create({
    baseURL: apiOptions.baseURL,
    timeout: apiOptions.timeout,
    headers: {
      'x-client': apiOptions.name
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm90ZWN0ZWQvQXBpQ29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJBcGlDb250cm9sbGVyIiwiYXBpT3B0aW9ucyIsImFwaSIsImdldEF4aW9zIiwiZGVmYXVsdEFwaU9wdGlvbnMiLCJtZXRob2QiLCJwYXRoIiwicGFyYW1zIiwiZGF0YSIsImV4dHJhY3REYXRhIiwicmVxdWVzdCIsInVybCIsInRoZW4iLCJyZXMiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJ0aW1lb3V0IiwiaGVhZGVycyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFRQTs7Ozs7SUFLc0JBLGE7OztBQUdwQix5QkFBc0JDLFVBQXRCLEVBQXdEO0FBQUE7O0FBQUE7O0FBQ3RELFNBQUtDLEdBQUwsR0FBV0MsUUFBUSxtQkFBS0MseUJBQUwsRUFBMkJILFVBQTNCLEVBQW5CO0FBQ0Q7Ozs7NEJBR0NJLE0sRUFDQUMsSTs7Ozs7Ozs7O0FBQ0FDLGNBQUFBLE0sMkRBQWMsRTtBQUNkQyxjQUFBQSxJLDJEQUFZLEk7QUFDWkMsY0FBQUEsVywyREFBdUIsSTsrQ0FFaEIsS0FBS1AsR0FBTCxDQUFTUSxPQUFULENBQWlCO0FBQ3RCTCxnQkFBQUEsTUFBTSxFQUFOQSxNQURzQjtBQUV0Qk0sZ0JBQUFBLEdBQUcsRUFBRUwsSUFGaUI7QUFHdEJFLGdCQUFBQSxJQUFJLEVBQUpBLElBSHNCO0FBSXRCRCxnQkFBQUEsTUFBTSxFQUFOQTtBQUpzQixlQUFqQixFQUtKSyxJQUxJLENBS0MsVUFBQUMsR0FBRztBQUFBLHVCQUFJSixXQUFXLEdBQUdJLEdBQUcsQ0FBQ0wsSUFBUCxHQUFjSyxHQUE3QjtBQUFBLGVBTEosQzs7Ozs7Ozs7Ozs7OztBQVNYOzs7Ozs7O0FBR0EsU0FBU1YsUUFBVCxDQUFrQkYsVUFBbEIsRUFBeUQ7QUFDdkQsU0FBT2Esa0JBQU1DLE1BQU4sQ0FBYTtBQUNsQkMsSUFBQUEsT0FBTyxFQUFFZixVQUFVLENBQUNlLE9BREY7QUFFbEJDLElBQUFBLE9BQU8sRUFBRWhCLFVBQVUsQ0FBQ2dCLE9BRkY7QUFHbEJDLElBQUFBLE9BQU8sRUFBRTtBQUFDLGtCQUFZakIsVUFBVSxDQUFDa0I7QUFBeEI7QUFIUyxHQUFiLENBQVA7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcywge0F4aW9zSW5zdGFuY2UsIE1ldGhvZH0gZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQge2RlZmF1bHRBcGlPcHRpb25zfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBpT3B0aW9ucyB7XG4gIGJhc2VVUkw6IHN0cmluZztcbiAgdGltZW91dDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGlnbm9yZVxuICpcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBvdGhlciBjb250cm9sbGVyc1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpQ29udHJvbGxlciB7XG4gIHByb3RlY3RlZCByZWFkb25seSBhcGk6IEF4aW9zSW5zdGFuY2U7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGFwaU9wdGlvbnM/OiBQYXJ0aWFsPEFwaU9wdGlvbnM+KSB7XG4gICAgdGhpcy5hcGkgPSBnZXRBeGlvcyh7Li4uZGVmYXVsdEFwaU9wdGlvbnMsIC4uLmFwaU9wdGlvbnN9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyByZXF1ZXN0PFQ+KFxuICAgIG1ldGhvZDogTWV0aG9kLFxuICAgIHBhdGg6IHN0cmluZyxcbiAgICBwYXJhbXM6IGFueSA9IHt9LFxuICAgIGRhdGE6IGFueSA9IG51bGwsXG4gICAgZXh0cmFjdERhdGE6IGJvb2xlYW4gPSB0cnVlXG4gICk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5yZXF1ZXN0KHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybDogcGF0aCxcbiAgICAgIGRhdGEsXG4gICAgICBwYXJhbXNcbiAgICB9KS50aGVuKHJlcyA9PiBleHRyYWN0RGF0YSA/IHJlcy5kYXRhIDogcmVzKTtcbiAgfVxufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gZ2V0QXhpb3MoYXBpT3B0aW9uczogQXBpT3B0aW9ucyk6IEF4aW9zSW5zdGFuY2Uge1xuICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiBhcGlPcHRpb25zLmJhc2VVUkwsXG4gICAgdGltZW91dDogYXBpT3B0aW9ucy50aW1lb3V0LFxuICAgIGhlYWRlcnM6IHsneC1jbGllbnQnOiBhcGlPcHRpb25zLm5hbWV9XG4gIH0pO1xufVxuIl19
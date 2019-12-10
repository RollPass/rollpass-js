"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressMiddleware = void 0;

require("regenerator-runtime/runtime");

var _ClientController = require("../controllers/ClientController");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @ignore
 */
var COOKIE = "__rollpass_session_code__";
/**
 * @ignore
 */

var NAME = "RollPass Middleware";
/**
 * RollPass middleware for express.
 *
 * [[include:express-middleware.md]]
 *
 * @param userOptions
 * @category Backend
 */

var ExpressMiddleware =
/*#__PURE__*/
function () {
  function ExpressMiddleware() {
    _classCallCheck(this, ExpressMiddleware);
  }

  _createClass(ExpressMiddleware, null, [{
    key: "getInstance",
    value: function getInstance(userOptions) {
      var options = _objectSpread({
        authenticatedRoutes: [/.*/]
      }, userOptions);

      function log(value) {
        if (options.debug) {
          console.log("".concat(NAME, " - ").concat(value));
        }
      }

      function fatal(value) {
        log("FATAL ".concat(value));
        throw Error(value);
      }

      var clientToken = options.clientToken,
          projectId = options.projectId;

      if (!clientToken) {
        fatal("requires clientToken");
      }

      if (!projectId) {
        fatal("requires projectId");
      }

      var clientController = new _ClientController.ClientController({
        clientToken: clientToken,
        projectId: projectId
      });

      function pathIsAuthenticated(path) {
        return options.authenticatedRoutes.filter(function (r) {
          return r.test(path);
        }).length > 0;
      }

      function redirectLogin(response) {
        log("redirecting to loginPath");
        response.locals.redirect = true;
        response.locals.authenticated = false;
        response.locals.session = null;
        response.clearCookie(COOKIE);
        response.redirect(options.paths.login);
      }

      function authenticatedNext(sessionCode, user, response, next) {
        log('authenticated next()');
        response.locals.redirect = false;
        response.locals.authenticated = true;
        response.locals.user = user;
        response.locals.session = sessionCode;
        response.cookie(NAME, sessionCode);
        next();
      }

      function accessNext(email, response, next) {
        log('access next()');
        response.locals.redirect = false;
        response.locals.session = null;
        response.locals.authenticated = false;
        response.locals.email = email;
        next();
      }

      return function _callee(request, response, next) {
        var _options$paths, access, login, redirect, signOut, code, _ref, session, status, user, email, sessionCode, _user;

        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _options$paths = options.paths, access = _options$paths.access, login = _options$paths.login, redirect = _options$paths.redirect, signOut = _options$paths.signOut;

                if (!(request.path === login)) {
                  _context.next = 5;
                  break;
                }

                next();
                _context.next = 82;
                break;

              case 5:
                if (!(request.path === redirect)) {
                  _context.next = 32;
                  break;
                }

                log('redirect path triggered');
                code = request.query.code;

                if (!code) {
                  _context.next = 28;
                  break;
                }

                log('challenge code found in query');
                _context.next = 12;
                return regeneratorRuntime.awrap(clientController.verifyChallenge(code));

              case 12:
                _ref = _context.sent;
                session = _ref.session;
                status = _ref.status;

                if (!(status === 'VERIFIED')) {
                  _context.next = 24;
                  break;
                }

                log('challenge verified');
                _context.next = 19;
                return regeneratorRuntime.awrap(clientController.getUser(session.code));

              case 19:
                user = _context.sent;
                response.locals.user = user;
                authenticatedNext(session.code, user, response, next);
                _context.next = 26;
                break;

              case 24:
                log("challenge found but in a bad state ".concat(status));
                redirectLogin(response);

              case 26:
                _context.next = 30;
                break;

              case 28:
                log("no challenge code found in redirect path query params");
                redirectLogin(response);

              case 30:
                _context.next = 82;
                break;

              case 32:
                if (!(request.path === signOut)) {
                  _context.next = 39;
                  break;
                }

                log('signOut route triggered');
                response.clearCookie(COOKIE);
                response.locals.authenticated = false;
                next();
                _context.next = 82;
                break;

              case 39:
                if (!(request.path === access)) {
                  _context.next = 54;
                  break;
                }

                log("access route triggered");
                email = request.query.email;

                if (!email) {
                  _context.next = 50;
                  break;
                }

                log("email address ".concat(email, " found in parameters"));
                log("sending access link to ".concat(email));
                _context.next = 47;
                return regeneratorRuntime.awrap(clientController.sendChallenge(email));

              case 47:
                accessNext(email, response, next);
                _context.next = 52;
                break;

              case 50:
                log("no email address found in parameters");
                redirectLogin(response);

              case 52:
                _context.next = 82;
                break;

              case 54:
                if (!pathIsAuthenticated(request.path)) {
                  _context.next = 80;
                  break;
                }

                log("".concat(request.path, " is authenticated path"));
                sessionCode = null;

                if (request.cookies && request.cookies[COOKIE]) {
                  sessionCode = request.cookies[COOKIE];
                }

                if (!sessionCode) {
                  _context.next = 76;
                  break;
                }

                log("session cookie found");
                _context.prev = 60;
                response.locals.authenticated = false;
                log("getting user for session");
                _context.next = 65;
                return regeneratorRuntime.awrap(clientController.getUser(sessionCode));

              case 65:
                _user = _context.sent;
                response.locals.user = _user;
                next();
                _context.next = 74;
                break;

              case 70:
                _context.prev = 70;
                _context.t0 = _context["catch"](60);
                log("failed to get user for session");
                redirectLogin(response);

              case 74:
                _context.next = 78;
                break;

              case 76:
                log("no session cookie found");
                redirectLogin(response);

              case 78:
                _context.next = 82;
                break;

              case 80:
                response.locals.authenticated = false;
                next();

              case 82:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[60, 70]]);
      };
    }
  }]);

  return ExpressMiddleware;
}();

exports.ExpressMiddleware = ExpressMiddleware;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wdWJsaWMvcGx1Z2lucy9leHByZXNzLW1pZGRsZXdhcmUudHMiXSwibmFtZXMiOlsiQ09PS0lFIiwiTkFNRSIsIkV4cHJlc3NNaWRkbGV3YXJlIiwidXNlck9wdGlvbnMiLCJvcHRpb25zIiwiYXV0aGVudGljYXRlZFJvdXRlcyIsImxvZyIsInZhbHVlIiwiZGVidWciLCJjb25zb2xlIiwiZmF0YWwiLCJFcnJvciIsImNsaWVudFRva2VuIiwicHJvamVjdElkIiwiY2xpZW50Q29udHJvbGxlciIsIkNsaWVudENvbnRyb2xsZXIiLCJwYXRoSXNBdXRoZW50aWNhdGVkIiwicGF0aCIsImZpbHRlciIsInIiLCJ0ZXN0IiwibGVuZ3RoIiwicmVkaXJlY3RMb2dpbiIsInJlc3BvbnNlIiwibG9jYWxzIiwicmVkaXJlY3QiLCJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbiIsImNsZWFyQ29va2llIiwicGF0aHMiLCJsb2dpbiIsImF1dGhlbnRpY2F0ZWROZXh0Iiwic2Vzc2lvbkNvZGUiLCJ1c2VyIiwibmV4dCIsImNvb2tpZSIsImFjY2Vzc05leHQiLCJlbWFpbCIsInJlcXVlc3QiLCJhY2Nlc3MiLCJzaWduT3V0IiwiY29kZSIsInF1ZXJ5IiwidmVyaWZ5Q2hhbGxlbmdlIiwic3RhdHVzIiwiZ2V0VXNlciIsInNlbmRDaGFsbGVuZ2UiLCJjb29raWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUE0RUE7OztBQUdBLElBQU1BLE1BQU0sR0FBRywyQkFBZjtBQUNBOzs7O0FBR0EsSUFBTUMsSUFBSSxHQUFHLHFCQUFiO0FBRUE7Ozs7Ozs7OztJQVNhQyxpQjs7Ozs7Ozs7O2dDQUNVQyxXLEVBQWdDO0FBRS9DLFVBQU1DLE9BQU87QUFDVEMsUUFBQUEsbUJBQW1CLEVBQUUsQ0FBQyxJQUFEO0FBRFosU0FFTkYsV0FGTSxDQUFiOztBQUtBLGVBQVNHLEdBQVQsQ0FBYUMsS0FBYixFQUF5QjtBQUNyQixZQUFJSCxPQUFPLENBQUNJLEtBQVosRUFBbUI7QUFDZkMsVUFBQUEsT0FBTyxDQUFDSCxHQUFSLFdBQWVMLElBQWYsZ0JBQXlCTSxLQUF6QjtBQUNIO0FBQ0o7O0FBRUQsZUFBU0csS0FBVCxDQUFlSCxLQUFmLEVBQTJCO0FBQ3ZCRCxRQUFBQSxHQUFHLGlCQUFVQyxLQUFWLEVBQUg7QUFDQSxjQUFNSSxLQUFLLENBQUNKLEtBQUQsQ0FBWDtBQUNIOztBQWhCOEMsVUFrQnhDSyxXQWxCd0MsR0FrQmRSLE9BbEJjLENBa0J4Q1EsV0FsQndDO0FBQUEsVUFrQjNCQyxTQWxCMkIsR0FrQmRULE9BbEJjLENBa0IzQlMsU0FsQjJCOztBQW9CL0MsVUFBSSxDQUFDRCxXQUFMLEVBQWtCO0FBQ2RGLFFBQUFBLEtBQUssd0JBQUw7QUFDSDs7QUFDRCxVQUFJLENBQUNHLFNBQUwsRUFBZ0I7QUFDWkgsUUFBQUEsS0FBSyxzQkFBTDtBQUNIOztBQUVELFVBQU1JLGdCQUFnQixHQUFHLElBQUlDLGtDQUFKLENBQXFCO0FBQUNILFFBQUFBLFdBQVcsRUFBWEEsV0FBRDtBQUFjQyxRQUFBQSxTQUFTLEVBQVRBO0FBQWQsT0FBckIsQ0FBekI7O0FBRUEsZUFBU0csbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW9EO0FBQ2hELGVBQU9iLE9BQU8sQ0FBQ0MsbUJBQVIsQ0FBNEJhLE1BQTVCLENBQW1DLFVBQUFDLENBQUM7QUFBQSxpQkFBSUEsQ0FBQyxDQUFDQyxJQUFGLENBQU9ILElBQVAsQ0FBSjtBQUFBLFNBQXBDLEVBQXNESSxNQUF0RCxHQUErRCxDQUF0RTtBQUNIOztBQUVELGVBQVNDLGFBQVQsQ0FBdUJDLFFBQXZCLEVBQTJDO0FBQ3ZDakIsUUFBQUEsR0FBRyw0QkFBSDtBQUNBaUIsUUFBQUEsUUFBUSxDQUFDQyxNQUFULENBQWdCQyxRQUFoQixHQUEyQixJQUEzQjtBQUNBRixRQUFBQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JFLGFBQWhCLEdBQWdDLEtBQWhDO0FBQ0FILFFBQUFBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQkcsT0FBaEIsR0FBMEIsSUFBMUI7QUFDQUosUUFBQUEsUUFBUSxDQUFDSyxXQUFULENBQXFCNUIsTUFBckI7QUFDQXVCLFFBQUFBLFFBQVEsQ0FBQ0UsUUFBVCxDQUFrQnJCLE9BQU8sQ0FBQ3lCLEtBQVIsQ0FBY0MsS0FBaEM7QUFDSDs7QUFFRCxlQUFTQyxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBZ0RDLElBQWhELEVBQTJEVixRQUEzRCxFQUErRVcsSUFBL0UsRUFBMEY7QUFDdEY1QixRQUFBQSxHQUFHLENBQUMsc0JBQUQsQ0FBSDtBQUNBaUIsUUFBQUEsUUFBUSxDQUFDQyxNQUFULENBQWdCQyxRQUFoQixHQUEyQixLQUEzQjtBQUNBRixRQUFBQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JFLGFBQWhCLEdBQWdDLElBQWhDO0FBQ0FILFFBQUFBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQlMsSUFBaEIsR0FBdUJBLElBQXZCO0FBQ0FWLFFBQUFBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQkcsT0FBaEIsR0FBMEJLLFdBQTFCO0FBQ0FULFFBQUFBLFFBQVEsQ0FBQ1ksTUFBVCxDQUFnQmxDLElBQWhCLEVBQXNCK0IsV0FBdEI7QUFDQUUsUUFBQUEsSUFBSTtBQUNQOztBQUVELGVBQVNFLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQW1DZCxRQUFuQyxFQUF1RFcsSUFBdkQsRUFBa0U7QUFDOUQ1QixRQUFBQSxHQUFHLENBQUMsZUFBRCxDQUFIO0FBQ0FpQixRQUFBQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JDLFFBQWhCLEdBQTJCLEtBQTNCO0FBQ0FGLFFBQUFBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQkcsT0FBaEIsR0FBMEIsSUFBMUI7QUFDQUosUUFBQUEsUUFBUSxDQUFDQyxNQUFULENBQWdCRSxhQUFoQixHQUFnQyxLQUFoQztBQUNBSCxRQUFBQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JhLEtBQWhCLEdBQXdCQSxLQUF4QjtBQUNBSCxRQUFBQSxJQUFJO0FBQ1A7O0FBRUQsYUFBTyxpQkFBZ0JJLE9BQWhCLEVBQWtDZixRQUFsQyxFQUFzRFcsSUFBdEQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUN3QzlCLE9BQU8sQ0FBQ3lCLEtBRGhELEVBQ0lVLE1BREosa0JBQ0lBLE1BREosRUFDWVQsS0FEWixrQkFDWUEsS0FEWixFQUNtQkwsUUFEbkIsa0JBQ21CQSxRQURuQixFQUM2QmUsT0FEN0Isa0JBQzZCQSxPQUQ3Qjs7QUFBQSxzQkFFQ0YsT0FBTyxDQUFDckIsSUFBUixLQUFpQmEsS0FGbEI7QUFBQTtBQUFBO0FBQUE7O0FBR0NJLGdCQUFBQSxJQUFJO0FBSEw7QUFBQTs7QUFBQTtBQUFBLHNCQUtNSSxPQUFPLENBQUNyQixJQUFSLEtBQWlCUSxRQUx2QjtBQUFBO0FBQUE7QUFBQTs7QUFNQ25CLGdCQUFBQSxHQUFHLENBQUMseUJBQUQsQ0FBSDtBQUNPbUMsZ0JBQUFBLElBUFIsR0FPZ0JILE9BQU8sQ0FBQ0ksS0FQeEIsQ0FPUUQsSUFQUjs7QUFBQSxxQkFRS0EsSUFSTDtBQUFBO0FBQUE7QUFBQTs7QUFTS25DLGdCQUFBQSxHQUFHLENBQUMsK0JBQUQsQ0FBSDtBQVRMO0FBQUEsZ0RBVXFDUSxnQkFBZ0IsQ0FBQzZCLGVBQWpCLENBQWlDRixJQUFqQyxDQVZyQzs7QUFBQTtBQUFBO0FBVVlkLGdCQUFBQSxPQVZaLFFBVVlBLE9BVlo7QUFVcUJpQixnQkFBQUEsTUFWckIsUUFVcUJBLE1BVnJCOztBQUFBLHNCQVdTQSxNQUFNLEtBQUssVUFYcEI7QUFBQTtBQUFBO0FBQUE7O0FBWVN0QyxnQkFBQUEsR0FBRyxDQUFDLG9CQUFELENBQUg7QUFaVDtBQUFBLGdEQWE0QlEsZ0JBQWdCLENBQUMrQixPQUFqQixDQUF5QmxCLE9BQU8sQ0FBQ2MsSUFBakMsQ0FiNUI7O0FBQUE7QUFhZVIsZ0JBQUFBLElBYmY7QUFjU1YsZ0JBQUFBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQlMsSUFBaEIsR0FBdUJBLElBQXZCO0FBQ0FGLGdCQUFBQSxpQkFBaUIsQ0FBQ0osT0FBTyxDQUFDYyxJQUFULEVBQWVSLElBQWYsRUFBcUJWLFFBQXJCLEVBQStCVyxJQUEvQixDQUFqQjtBQWZUO0FBQUE7O0FBQUE7QUFpQlM1QixnQkFBQUEsR0FBRyw4Q0FBdUNzQyxNQUF2QyxFQUFIO0FBQ0F0QixnQkFBQUEsYUFBYSxDQUFDQyxRQUFELENBQWI7O0FBbEJUO0FBQUE7QUFBQTs7QUFBQTtBQXFCS2pCLGdCQUFBQSxHQUFHLENBQUMsdURBQUQsQ0FBSDtBQUNBZ0IsZ0JBQUFBLGFBQWEsQ0FBQ0MsUUFBRCxDQUFiOztBQXRCTDtBQUFBO0FBQUE7O0FBQUE7QUFBQSxzQkF5Qk1lLE9BQU8sQ0FBQ3JCLElBQVIsS0FBaUJ1QixPQXpCdkI7QUFBQTtBQUFBO0FBQUE7O0FBMEJDbEMsZ0JBQUFBLEdBQUcsQ0FBQyx5QkFBRCxDQUFIO0FBQ0FpQixnQkFBQUEsUUFBUSxDQUFDSyxXQUFULENBQXFCNUIsTUFBckI7QUFDQXVCLGdCQUFBQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JFLGFBQWhCLEdBQWdDLEtBQWhDO0FBQ0FRLGdCQUFBQSxJQUFJO0FBN0JMO0FBQUE7O0FBQUE7QUFBQSxzQkErQk1JLE9BQU8sQ0FBQ3JCLElBQVIsS0FBaUJzQixNQS9CdkI7QUFBQTtBQUFBO0FBQUE7O0FBZ0NDakMsZ0JBQUFBLEdBQUcsQ0FBQyx3QkFBRCxDQUFIO0FBQ08rQixnQkFBQUEsS0FqQ1IsR0FpQ2lCQyxPQUFPLENBQUNJLEtBakN6QixDQWlDUUwsS0FqQ1I7O0FBQUEscUJBa0NLQSxLQWxDTDtBQUFBO0FBQUE7QUFBQTs7QUFtQ0svQixnQkFBQUEsR0FBRyx5QkFBa0IrQixLQUFsQiwwQkFBSDtBQUNBL0IsZ0JBQUFBLEdBQUcsa0NBQTJCK0IsS0FBM0IsRUFBSDtBQXBDTDtBQUFBLGdEQXFDV3ZCLGdCQUFnQixDQUFDZ0MsYUFBakIsQ0FBK0JULEtBQS9CLENBckNYOztBQUFBO0FBc0NLRCxnQkFBQUEsVUFBVSxDQUFDQyxLQUFELEVBQVFkLFFBQVIsRUFBa0JXLElBQWxCLENBQVY7QUF0Q0w7QUFBQTs7QUFBQTtBQXdDSzVCLGdCQUFBQSxHQUFHLENBQUMsc0NBQUQsQ0FBSDtBQUNBZ0IsZ0JBQUFBLGFBQWEsQ0FBQ0MsUUFBRCxDQUFiOztBQXpDTDtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkE0Q01QLG1CQUFtQixDQUFDc0IsT0FBTyxDQUFDckIsSUFBVCxDQTVDekI7QUFBQTtBQUFBO0FBQUE7O0FBNkNDWCxnQkFBQUEsR0FBRyxXQUFJZ0MsT0FBTyxDQUFDckIsSUFBWiw0QkFBSDtBQUNJZSxnQkFBQUEsV0E5Q0wsR0E4Q21CLElBOUNuQjs7QUErQ0Msb0JBQUlNLE9BQU8sQ0FBQ1MsT0FBUixJQUFtQlQsT0FBTyxDQUFDUyxPQUFSLENBQWdCL0MsTUFBaEIsQ0FBdkIsRUFBZ0Q7QUFDNUNnQyxrQkFBQUEsV0FBVyxHQUFHTSxPQUFPLENBQUNTLE9BQVIsQ0FBZ0IvQyxNQUFoQixDQUFkO0FBQ0g7O0FBakRGLHFCQWtES2dDLFdBbERMO0FBQUE7QUFBQTtBQUFBOztBQW1ESzFCLGdCQUFBQSxHQUFHLENBQUMsc0JBQUQsQ0FBSDtBQW5ETDtBQXFEU2lCLGdCQUFBQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JFLGFBQWhCLEdBQWdDLEtBQWhDO0FBQ0FwQixnQkFBQUEsR0FBRyxDQUFDLDBCQUFELENBQUg7QUF0RFQ7QUFBQSxnREF1RDRCUSxnQkFBZ0IsQ0FBQytCLE9BQWpCLENBQXlCYixXQUF6QixDQXZENUI7O0FBQUE7QUF1RGVDLGdCQUFBQSxLQXZEZjtBQXdEU1YsZ0JBQUFBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQlMsSUFBaEIsR0FBdUJBLEtBQXZCO0FBQ0FDLGdCQUFBQSxJQUFJO0FBekRiO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBMkRTNUIsZ0JBQUFBLEdBQUcsQ0FBQyxnQ0FBRCxDQUFIO0FBQ0FnQixnQkFBQUEsYUFBYSxDQUFDQyxRQUFELENBQWI7O0FBNURUO0FBQUE7QUFBQTs7QUFBQTtBQWdFS2pCLGdCQUFBQSxHQUFHLENBQUMseUJBQUQsQ0FBSDtBQUNBZ0IsZ0JBQUFBLGFBQWEsQ0FBQ0MsUUFBRCxDQUFiOztBQWpFTDtBQUFBO0FBQUE7O0FBQUE7QUFvRUNBLGdCQUFBQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JFLGFBQWhCLEdBQWdDLEtBQWhDO0FBQ0FRLGdCQUFBQSxJQUFJOztBQXJFTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFQO0FBd0VIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSBcImV4cHJlc3NcIlxuaW1wb3J0IHtDbGllbnRDb250cm9sbGVyfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlclwiO1xuXG5pbnRlcmZhY2UgTWlkZGxld2FyZVBhdGhzIHtcbiAgICAvKipcbiAgICAgKiBQYXRoIHRvIHdoaWNoIHVuYXV0aGVudGljYXRlZCB1c2VycyB3aWxsIGJlIHJlZGlyZWN0XG4gICAgICpcbiAgICAgKiBSZW5kZXIgYSBmb3JtIG9uIHRoaXMgcGFnZSB3aXRoIGFuIGVtYWlsIGFkZHJlc3MgaW5wdXRcbiAgICAgKiB3aXRoIGBuYW1lPVwiZW1haWxcImAgdGhhdCBzdWJtaXRzIHZpYSBHRVQgdG8geW91ciBhY2Nlc3MgcGF0aFxuICAgICAqXG4gICAgICogYGBgaHRtbFxuICAgICAqIDxmb3JtIGFjdGlvbj1cIi9hY2Nlc3NcIiBtZXRob2Q9XCJHRVRcIj5cbiAgICAgKiAgIDxpbnB1dCBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgZW1haWxcIi8+XG4gICAgICogICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgKiA8L2Zvcm0+XG4gICAgICogYGBgXG4gICAgICovXG4gICAgbG9naW46IHN0cmluZyxcbiAgICAvKipcbiAgICAgKiBQYXRoIHRvIHdoaWNoIGFjY2VzcyBlbWFpbCBxdWVyeSBwYXJhbWV0ZXIgd2lsbCBiZSBzdWJtaXR0ZWRcbiAgICAgKlxuICAgICAqIEFkZCBhbiBleHByZXNzIHJvdXRlIGZvciB0aGUgYWNjZXNzIHBhdGggaWYgeW91IHdpc2ggdG8gaGFuZGxlIHRoZSByZXNwb25zZVxuICAgICAqIGFmdGVyIHRoZSBtaWRkbGV3YXJlIGhhcyBleGVjdXRlZC5cbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiBhcHAuZ2V0KCcvYWNjZXNzJywgKHJlcyxyZXEpID0+IHJlcy5zZW5kKCdDaGVjayB5b3VyIGVtYWlsJykpXG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWNjZXNzOiBzdHJpbmcsXG4gICAgLyoqXG4gICAgICogWW91ciBwcm9qZWN0IHJlZGlyZWN0VXJsIHBhdGguIFJvbGxQYXNzIGxpbmtzIHdpbGwgcmVkaXJlY3QgdXNlcnNcbiAgICAgKiB0byB0aGlzIHBhdGggd2l0aCBhIGA/Y29kZT17Y2hhbGxlbmdlQ29kZX1gIHF1ZXJ5LlxuICAgICAqXG4gICAgICogWW91IGNhbiBhZGQgYSByb3V0ZSBmb3IgdGhpcyBwYXRoIGlmIHlvdSB3aXNoIHRvIGhhbmRsZSB0aGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIG1pZGRsZXdhcmVcbiAgICAgKiBoYXMgZXhlY3V0ZWQuXG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogYXBwLmdldCgnLycsIChyZXMscmVxKSA9PiByZXMuc2VuZCgnV2VsY29tZSEnKSlcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICByZWRpcmVjdDogc3RyaW5nLFxuICAgIC8qKlxuICAgICAqIFBhdGggdGhhdCBzaG91bGQgdHJpZ2dlciBhIHNpZ24gb3V0XG4gICAgICpcbiAgICAgKiBZb3UgY2FuIGF0dGFjaCBhbiBleHByZXNzIHJvdXRlIHRvIHRoaXMgcGF0aCBpbiBvcmRlciB0byBoYW5kbGUgdGhlIHJlc3BvbnNlXG4gICAgICogYWZ0ZXIgdGhlIG1pZGRsZXdhcmUgaGFzIGV4ZWN1dGVkXG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogYXBwLmdldCgnL3NpZ25PdXQnLCAocmVzLHJlcSkgPT4gcmVzLnNlbmQoJ0dvb2RieWUnKSlcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBzaWduT3V0OiBzdHJpbmcsXG59XG5cbmludGVyZmFjZSBNaWRkbGV3YXJlT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogWW91ciBjbGllbnRUb2tlblxuICAgICAqL1xuICAgIGNsaWVudFRva2VuOiBzdHJpbmcsXG4gICAgLyoqXG4gICAgICogUm9sbFBhc3MgcHJvamVjdElkXG4gICAgICovXG4gICAgcHJvamVjdElkOiBzdHJpbmcsXG4gICAgLyoqXG4gICAgICogUGF0aCBjb25maWdcbiAgICAgKi9cbiAgICBwYXRoczogTWlkZGxld2FyZVBhdGhzLFxuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIHJvdXRlcyB0aGF0IHJlcXVpcmUgYXV0aGVudGljYXRpb25cbiAgICAgKi9cbiAgICBhdXRoZW50aWNhdGVkUm91dGVzPzogUmVnRXhwW10sXG4gICAgLyoqXG4gICAgICogRW5hYmxlIGNvbnNvbGUgbG9nZ2luZ1xuICAgICAqL1xuICAgIGRlYnVnPzogYm9vbGVhblxufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuY29uc3QgQ09PS0lFID0gXCJfX3JvbGxwYXNzX3Nlc3Npb25fY29kZV9fXCI7XG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuY29uc3QgTkFNRSA9IFwiUm9sbFBhc3MgTWlkZGxld2FyZVwiO1xuXG4vKipcbiAqIFJvbGxQYXNzIG1pZGRsZXdhcmUgZm9yIGV4cHJlc3MuXG4gKlxuICogW1tpbmNsdWRlOmV4cHJlc3MtbWlkZGxld2FyZS5tZF1dXG4gKlxuICogQHBhcmFtIHVzZXJPcHRpb25zXG4gKiBAY2F0ZWdvcnkgQmFja2VuZFxuICovXG5cbmV4cG9ydCBjbGFzcyBFeHByZXNzTWlkZGxld2FyZSB7XG4gICAgc3RhdGljIGdldEluc3RhbmNlKHVzZXJPcHRpb25zOiBNaWRkbGV3YXJlT3B0aW9ucykge1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBhdXRoZW50aWNhdGVkUm91dGVzOiBbLy4qL10sXG4gICAgICAgICAgICAuLi51c2VyT3B0aW9uc1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9nKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7TkFNRX0gLSAke3ZhbHVlfWApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmYXRhbCh2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICBsb2coYEZBVEFMICR7dmFsdWV9YClcbiAgICAgICAgICAgIHRocm93IEVycm9yKHZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge2NsaWVudFRva2VuLCBwcm9qZWN0SWR9ID0gb3B0aW9uc1xuXG4gICAgICAgIGlmICghY2xpZW50VG9rZW4pIHtcbiAgICAgICAgICAgIGZhdGFsKGByZXF1aXJlcyBjbGllbnRUb2tlbmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvamVjdElkKSB7XG4gICAgICAgICAgICBmYXRhbChgcmVxdWlyZXMgcHJvamVjdElkYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGllbnRDb250cm9sbGVyID0gbmV3IENsaWVudENvbnRyb2xsZXIoe2NsaWVudFRva2VuLCBwcm9qZWN0SWR9KVxuXG4gICAgICAgIGZ1bmN0aW9uIHBhdGhJc0F1dGhlbnRpY2F0ZWQocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoZW50aWNhdGVkUm91dGVzLmZpbHRlcihyID0+IHIudGVzdChwYXRoKSkubGVuZ3RoID4gMFxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVkaXJlY3RMb2dpbihyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGxvZyhgcmVkaXJlY3RpbmcgdG8gbG9naW5QYXRoYClcbiAgICAgICAgICAgIHJlc3BvbnNlLmxvY2Fscy5yZWRpcmVjdCA9IHRydWU7XG4gICAgICAgICAgICByZXNwb25zZS5sb2NhbHMuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVzcG9uc2UubG9jYWxzLnNlc3Npb24gPSBudWxsO1xuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXJDb29raWUoQ09PS0lFKTtcbiAgICAgICAgICAgIHJlc3BvbnNlLnJlZGlyZWN0KG9wdGlvbnMucGF0aHMubG9naW4pXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGVkTmV4dChzZXNzaW9uQ29kZTogc3RyaW5nLCB1c2VyOiBhbnksIHJlc3BvbnNlOiBSZXNwb25zZSwgbmV4dDogYW55KSB7XG4gICAgICAgICAgICBsb2coJ2F1dGhlbnRpY2F0ZWQgbmV4dCgpJylcbiAgICAgICAgICAgIHJlc3BvbnNlLmxvY2Fscy5yZWRpcmVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVzcG9uc2UubG9jYWxzLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzcG9uc2UubG9jYWxzLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgcmVzcG9uc2UubG9jYWxzLnNlc3Npb24gPSBzZXNzaW9uQ29kZVxuICAgICAgICAgICAgcmVzcG9uc2UuY29va2llKE5BTUUsIHNlc3Npb25Db2RlKVxuICAgICAgICAgICAgbmV4dCgpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhY2Nlc3NOZXh0KGVtYWlsOiBzdHJpbmcsIHJlc3BvbnNlOiBSZXNwb25zZSwgbmV4dDogYW55KSB7XG4gICAgICAgICAgICBsb2coJ2FjY2VzcyBuZXh0KCknKVxuICAgICAgICAgICAgcmVzcG9uc2UubG9jYWxzLnJlZGlyZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXNwb25zZS5sb2NhbHMuc2Vzc2lvbiA9IG51bGw7XG4gICAgICAgICAgICByZXNwb25zZS5sb2NhbHMuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVzcG9uc2UubG9jYWxzLmVtYWlsID0gZW1haWw7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKHJlcXVlc3Q6IFJlcXVlc3QsIHJlc3BvbnNlOiBSZXNwb25zZSwgbmV4dDogYW55KSB7XG4gICAgICAgICAgICBjb25zdCB7YWNjZXNzLCBsb2dpbiwgcmVkaXJlY3QsIHNpZ25PdXR9ID0gb3B0aW9ucy5wYXRocztcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnBhdGggPT09IGxvZ2luKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5wYXRoID09PSByZWRpcmVjdCkge1xuICAgICAgICAgICAgICAgIGxvZygncmVkaXJlY3QgcGF0aCB0cmlnZ2VyZWQnKVxuICAgICAgICAgICAgICAgIGNvbnN0IHtjb2RlfSA9IHJlcXVlc3QucXVlcnk7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nKCdjaGFsbGVuZ2UgY29kZSBmb3VuZCBpbiBxdWVyeScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzZXNzaW9uLCBzdGF0dXN9ID0gYXdhaXQgY2xpZW50Q29udHJvbGxlci52ZXJpZnlDaGFsbGVuZ2UoY29kZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ1ZFUklGSUVEJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nKCdjaGFsbGVuZ2UgdmVyaWZpZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGNsaWVudENvbnRyb2xsZXIuZ2V0VXNlcihzZXNzaW9uLmNvZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5sb2NhbHMudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRoZW50aWNhdGVkTmV4dChzZXNzaW9uLmNvZGUsIHVzZXIsIHJlc3BvbnNlLCBuZXh0KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nKGBjaGFsbGVuZ2UgZm91bmQgYnV0IGluIGEgYmFkIHN0YXRlICR7c3RhdHVzfWApXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdExvZ2luKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nKFwibm8gY2hhbGxlbmdlIGNvZGUgZm91bmQgaW4gcmVkaXJlY3QgcGF0aCBxdWVyeSBwYXJhbXNcIilcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RMb2dpbihyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LnBhdGggPT09IHNpZ25PdXQpIHtcbiAgICAgICAgICAgICAgICBsb2coJ3NpZ25PdXQgcm91dGUgdHJpZ2dlcmVkJylcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jbGVhckNvb2tpZShDT09LSUUpO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmxvY2Fscy5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5wYXRoID09PSBhY2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBsb2coXCJhY2Nlc3Mgcm91dGUgdHJpZ2dlcmVkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHtlbWFpbH0gPSByZXF1ZXN0LnF1ZXJ5O1xuICAgICAgICAgICAgICAgIGlmIChlbWFpbCkge1xuICAgICAgICAgICAgICAgICAgICBsb2coYGVtYWlsIGFkZHJlc3MgJHtlbWFpbH0gZm91bmQgaW4gcGFyYW1ldGVyc2ApXG4gICAgICAgICAgICAgICAgICAgIGxvZyhgc2VuZGluZyBhY2Nlc3MgbGluayB0byAke2VtYWlsfWApXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNsaWVudENvbnRyb2xsZXIuc2VuZENoYWxsZW5nZShlbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc05leHQoZW1haWwsIHJlc3BvbnNlLCBuZXh0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2coXCJubyBlbWFpbCBhZGRyZXNzIGZvdW5kIGluIHBhcmFtZXRlcnNcIilcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RMb2dpbihyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYXRoSXNBdXRoZW50aWNhdGVkKHJlcXVlc3QucGF0aCkpIHtcbiAgICAgICAgICAgICAgICBsb2coYCR7cmVxdWVzdC5wYXRofSBpcyBhdXRoZW50aWNhdGVkIHBhdGhgKVxuICAgICAgICAgICAgICAgIGxldCBzZXNzaW9uQ29kZSA9IG51bGxcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5jb29raWVzICYmIHJlcXVlc3QuY29va2llc1tDT09LSUVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25Db2RlID0gcmVxdWVzdC5jb29raWVzW0NPT0tJRV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25Db2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZyhcInNlc3Npb24gY29va2llIGZvdW5kXCIpXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5sb2NhbHMuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nKFwiZ2V0dGluZyB1c2VyIGZvciBzZXNzaW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgY2xpZW50Q29udHJvbGxlci5nZXRVc2VyKHNlc3Npb25Db2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UubG9jYWxzLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCgpXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nKFwiZmFpbGVkIHRvIGdldCB1c2VyIGZvciBzZXNzaW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdExvZ2luKHJlc3BvbnNlKVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2coXCJubyBzZXNzaW9uIGNvb2tpZSBmb3VuZFwiKVxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdExvZ2luKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UubG9jYWxzLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
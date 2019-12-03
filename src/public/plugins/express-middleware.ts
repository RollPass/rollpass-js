import {Request, Response} from "express"
import {ClientController} from "../controllers/ClientController";

interface MiddlewarePaths {
    /**
     * Path to which unauthenticated users will be redirect
     *
     * Render a form on this page with an email address input
     * with `name="email"` that submits via GET to your access path
     *
     * ```html
     * <form action="/access" method="GET">
     *   <input name="email" type="email" placeholder="Enter your email"/>
     *   <button type="submit">Submit</button>
     * </form>
     * ```
     */
    login: string,
    /**
     * Path to which access email query parameter will be submitted
     *
     * Add an express route for the access path if you wish to handle the response
     * after the middleware has executed.
     *
     * ```javascript
     * app.get('/access', (res,req) => res.send('Check your email'))
     * ```
     */
    access: string,
    /**
     * Your project redirectUrl path. RollPass links will redirect users
     * to this path with a `?code={challengeCode}` query.
     *
     * You can add a route for this path if you wish to handle the response after the middleware
     * has executed.
     *
     * ```javascript
     * app.get('/', (res,req) => res.send('Welcome!'))
     * ```
     */
    redirect: string,
    /**
     * Path that should trigger a sign out
     *
     * You can attach an express route to this path in order to handle the response
     * after the middleware has executed
     *
     * ```javascript
     * app.get('/signOut', (res,req) => res.send('Goodbye'))
     * ```
     */
    signOut: string,
}

interface MiddlewareOptions {
    /**
     * Your clientToken
     */
    clientToken: string,
    /**
     * RollPass projectId
     */
    projectId: string,
    /**
     * Path config
     */
    paths: MiddlewarePaths,
    /**
     * Array of regular expressions for routes that require authentication
     */
    authenticatedRoutes?: RegExp[],
    /**
     * Enable console logging
     */
    debug?: boolean
}

/**
 * @ignore
 */
const COOKIE = "__rollpass_session_code__";
/**
 * @ignore
 */
const NAME = "RollPass Middleware";

/**
 * RollPass middleware for express.
 *
 * [[include:express-middleware.md]]
 *
 * @param userOptions
 * @category Backend
 */

export class ExpressMiddleware {
    static getInstance(userOptions: MiddlewareOptions) {

        const options = {
            authenticatedRoutes: [/.*/],
            ...userOptions
        }

        function log(value: any) {
            if (options.debug) {
                console.log(`${NAME} - ${value}`)
            }
        }

        function fatal(value: any) {
            log(`FATAL ${value}`)
            throw Error(value)
        }

        const {clientToken, projectId} = options

        if (!clientToken) {
            fatal(`requires clientToken`);
        }
        if (!projectId) {
            fatal(`requires projectId`);
        }

        const clientController = new ClientController({clientToken, projectId})

        function pathIsAuthenticated(path: string): boolean {
            return options.authenticatedRoutes.filter(r => r.test(path)).length > 0
        }

        function redirectLogin(response: Response) {
            log(`redirecting to loginPath`)
            response.locals.redirect = true;
            response.locals.authenticated = false;
            response.locals.session = null;
            response.clearCookie(COOKIE);
            response.redirect(options.paths.login)
        }

        function authenticatedNext(sessionCode: string, user: any, response: Response, next: any) {
            log('authenticated next()')
            response.locals.redirect = false;
            response.locals.authenticated = true;
            response.locals.user = user;
            response.locals.session = sessionCode
            response.cookie(NAME, sessionCode)
            next()
        }

        function accessNext(email: string, response: Response, next: any) {
            log('access next()')
            response.locals.redirect = false;
            response.locals.session = null;
            response.locals.authenticated = false;
            response.locals.email = email;
            next();
        }

        return async function (request: Request, response: Response, next: any) {
            const {access, login, redirect, signOut} = options.paths;
            if (request.path === login) {
                next();
            }
            else if (request.path === redirect) {
                log('redirect path triggered')
                const {code} = request.query;
                if (code) {
                    log('challenge code found in query')
                    const {session, status} = await clientController.verifyChallenge(code)
                    if (status === 'VERIFIED') {
                        log('challenge verified')
                        const user = await clientController.getUser(session.code)
                        response.locals.user = user;
                        authenticatedNext(session.code, user, response, next)
                    } else {
                        log(`challenge found but in a bad state ${status}`)
                        redirectLogin(response)
                    }
                } else {
                    log("no challenge code found in redirect path query params")
                    redirectLogin(response)
                }
            }
            else if (request.path === signOut) {
                log('signOut route triggered')
                response.clearCookie(COOKIE);
                response.locals.authenticated = false;
                next();
            }
            else if (request.path === access) {
                log("access route triggered");
                const {email} = request.query;
                if (email) {
                    log(`email address ${email} found in parameters`)
                    log(`sending access link to ${email}`)
                    await clientController.sendChallenge(email);
                    accessNext(email, response, next);
                } else {
                    log("no email address found in parameters")
                    redirectLogin(response)
                }
            }
            else if (pathIsAuthenticated(request.path)) {
                log(`${request.path} is authenticated path`)
                let sessionCode = null
                if (request.cookies && request.cookies[COOKIE]) {
                    sessionCode = request.cookies[COOKIE]
                }
                if (sessionCode) {
                    log("session cookie found")
                    try {
                        response.locals.authenticated = false;
                        log("getting user for session")
                        const user = await clientController.getUser(sessionCode)
                        response.locals.user = user;
                        next()
                    } catch {
                        log("failed to get user for session")
                        redirectLogin(response)

                    }
                } else {
                    log("no session cookie found")
                    redirectLogin(response)
                }
            } else {
                response.locals.authenticated = false;
                next();
            }
        }
    }
}

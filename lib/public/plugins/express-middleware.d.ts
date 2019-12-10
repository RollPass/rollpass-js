import { Request, Response } from "express";
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
    login: string;
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
    access: string;
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
    redirect: string;
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
    signOut: string;
}
interface MiddlewareOptions {
    /**
     * Your clientToken
     */
    clientToken: string;
    /**
     * RollPass projectId
     */
    projectId: string;
    /**
     * Path config
     */
    paths: MiddlewarePaths;
    /**
     * Array of regular expressions for routes that require authentication
     */
    authenticatedRoutes?: RegExp[];
    /**
     * Enable console logging
     */
    debug?: boolean;
}
/**
 * RollPass middleware for express.
 *
 * [[include:express-middleware.md]]
 *
 * @param userOptions
 * @category Backend
 */
export declare class ExpressMiddleware {
    static getInstance(userOptions: MiddlewareOptions): (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response, next: any) => Promise<void>;
}
export {};

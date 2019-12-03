[rollpass](../README.md) › [ExpressMiddleware](expressmiddleware.md)

# Class: ExpressMiddleware

RollPass middleware for express.

```javascript
const rollpassMiddleware = require('rollpass').middleware
const express = require('express')
const app = express()

/**
 * Configure express to use RollPass middleware
 */
const config = {
 clientToken: 'xxxx',
 projectId: 'xxxx',
 paths: {
   login: "/login",
   access: "/access",
   redirect: "/",
   signOut: "/signOut",
 },
 authenticatedRoutes: [/\/.*/],
 debug: true
}

app.use(rollpassMiddleware(config))

/**
 * Create a route for your login path
 * that renders a form that asks the user for an email address
 * Let the form submit the email address to your access path
 */
app.get(config.paths.login, (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form action="${config.paths.access}" method="GET">
      <input name="email" type="email" placeholder="Enter your email"/>
      <button type="submit">Submit</button>
    </form>
  `)
});

/**
 * Add a route for your access path to render a message
 * telling the user to check their email address
 */
app.get(config.paths.access, (req, res) => {
  res.send(`
    <h2>Check you email</h2>
    <div>Access link sent to ${res.locals.email}</div>
  `)
})

/**
 * Now any authenticated route
 * will only execute your handler if the user is authenticated
 */
app.get('/', (req, res) => {
  res.send(`
    <h2>User</h2>
    <div>Authenticated: ${res.locals.authenticated}</div>
    <div>User: <code>${res.locals.user.emailAddress}</code></div>
    <a href="/signOut">Logout</a>
  `);
})

/**
 * Lastly, handle sign-outs with a message
 */
app.get(config.paths.signOut, (req, res) => {
  res.send(`
    <h2>Goodbye</h2>
    <div>Authenticated: ${res.locals.authenticated}</div>
    <a href="/login">Login</a>
  `)
})

app.listen(3000, () => console.log("Express running on http://localhost:3000"))
```

**`param`** 

## Hierarchy

* **ExpressMiddleware**

## Index

### Methods

* [getInstance](expressmiddleware.md#static-getinstance)

## Methods

### `Static` getInstance

▸ **getInstance**(`userOptions`: [MiddlewareOptions](../interfaces/middlewareoptions.md)): *(Anonymous function)*

Defined in src/public/plugins/express-middleware.ts:97

**Parameters:**

Name | Type |
------ | ------ |
`userOptions` | [MiddlewareOptions](../interfaces/middlewareoptions.md) |

**Returns:** *(Anonymous function)*

const { ExpressMiddleware } = require('../../lib/index');
const express = require('express')
const app = express()

app.use(ExpressMiddleware.getInstance({
  clientToken: "client_d07a47d758bce000833c644e90c528d61e241051ca1bfba5b393c15a88f6732d4e1828db926c881c6d45dae95918f6d2128e50fdc009cd630655b1f0860214b205337e19de4b69b9a2ee3c1b62a95b0b3a819c472287f1a4a2ee63c5606a4ba0fdf9a3f2e3f5e24d9fe64df579ccda5de198e616af1cd873e9e91ee145d17c6947a4c6ea7fbf99fb6cbec94dc21dbc70a20d37803c891f37ca8a8dc7793284d5e3c6431a9d09f93118e64817d36c15f818526a3423f8211bf55f0647522b05707ca4bcd41741fec9e336013b50dc92a119bd10053c25fdd4fa76c32a9d3cb54e031ae8466497b7cd6456baed91c0fdf11bcddb9d0a8a96a613d832ce63b396af",
  projectId: "cb6f4f52-88e0-4dd7-89ea-509261d6b334",
  paths: {
    login: "/login",
    access: "/access",
    redirect: "/",
    signOut: "/signOut",
  },
  authenticatedRoutes: [/\/.*/],
  debug: true
}))

app.get('/', (req, res) => {
  res.send(`
    <h2>User</h2>
    <div>Authenticated: ${res.locals.authenticated}</div>
    <div>User: <code>${res.locals.user.emailAddress}</code></div>
    <a href="/signOut">Logout</a>
  `);
})

app.get('/login', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <div>${res.locals.redirect ? 'Route authenticated. Please login.' : ''}</div>
    <form action="/access" method="GET">
      <input name="email" type="email" placeholder="Enter your email"/>
      <button type="submit">Submit</button>
    </form>
  `)
});

app.get('/access', (req, res) => {
  res.send(`
    <h2>Check you email</h2>
    <div>Access link sent to ${res.locals.email}</div>
  `)
})

app.get('/signOut', (req, res) => {
  res.send(`
    <h2>Goodbye</h2>
    <div>Authenticated: ${res.locals.authenticated}</div>
    <a href="/login">Login</a>
  `)
})

app.listen(3000, () => console.log("Express running on http://localhost:3000"))
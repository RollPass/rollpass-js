[rollpass](../README.md) › [MiddlewarePaths](middlewarepaths.md)

# Interface: MiddlewarePaths

## Hierarchy

* **MiddlewarePaths**

## Index

### Properties

* [access](middlewarepaths.md#access)
* [login](middlewarepaths.md#login)
* [redirect](middlewarepaths.md#redirect)
* [signOut](middlewarepaths.md#signout)

## Properties

###  access

• **access**: *string*

Defined in src/public/plugins/express-middleware.ts:29

Path to which access email query parameter will be submitted

Add an express route for the access path if you wish to handle the response
after the middleware has executed.

```javascript
app.get('/access', (res,req) => res.send('Check your email'))
```

___

###  login

• **login**: *string*

Defined in src/public/plugins/express-middleware.ts:18

Path to which unauthenticated users will be redirect

Render a form on this page with an email address input
with `name="email"` that submits via GET to your access path

```html
<form action="/access" method="GET">
  <input name="email" type="email" placeholder="Enter your email"/>
  <button type="submit">Submit</button>
</form>
```

___

###  redirect

• **redirect**: *string*

Defined in src/public/plugins/express-middleware.ts:41

Your project redirectUrl path. RollPass links will redirect users
to this path with a `?code={challengeCode}` query.

You can add a route for this path if you wish to handle the response after the middleware
has executed.

```javascript
app.get('/', (res,req) => res.send('Welcome!'))
```

___

###  signOut

• **signOut**: *string*

Defined in src/public/plugins/express-middleware.ts:52

Path that should trigger a sign out

You can attach an express route to this path in order to handle the response
after the middleware has executed

```javascript
app.get('/signOut', (res,req) => res.send('Goodbye'))
```

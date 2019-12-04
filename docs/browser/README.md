[RollPass Browser](README.md)

# RollPass Browser

## Object literals

### `Const` RollPassBrowser

### ▪ **RollPassBrowser**: *object*

*Defined in [static/browser.ts:76](https://github.com/RollPass/rollpass-js/blob/0cb2eb5/static/browser.ts#L76)*

RollPass Browser library for use in frontend apps or static HTML.

## About
RollPass lets you sign-up and login users without a server, database, or backend. Simply create a free RollPass account, include the Javascript CDN link on your page and call `RollPass.getUser()`.

RollPass will handle user authentication, session management, and key-value storage. If a user is not logged in you will need to ask for their email address in Javascript and then send them an access email using `RollPass.sendAccessLink(emailAddress)`.

Once a user clicks an access link they will be redirected to your project `redirectUrl` which should be the same URL as your HTML file. The same `RollPass.getUser()` will now verify and authenticate the user. Once `getUser` returns you have access to the users `emailAddress` and `id`. You can read and write data for the using using RollPass's simple data store.

## Quick Start

### Create free account
[Sign up](https://rollpass.io/sign-up/) for RollPass and create a free account.
Find your `clientToken` and `projectId` in [your dashboard](https://rollpass.io/dashboard).

### Add CDN Script
Include the RollPass Browser library in your HTML by placing a `<script>` tag inside the `<body>`.

```html
<!doctype html>
<html>
<body>
  <script src="https://cdn.rollpass.io/js/rollpass.min.js"></script>
</body>
</html>
```

### Configure RollPass
Create another `<script>` tag after this and configure the global RollPass object using your `clientToken` and `projectId`.

```html
<script>
RollPass.init({
  clientToken: 'xxxx',
  projectId: 'xxxx'
});
</script>
```

### Authenticate a user

Now user `RollPass.getUser()` to authenticate visitors to your page. `getUser` is an asynchronous function that returns a `Promise<User>` if the user is logged in. It throws an error if the session has expired or the user is not known.

> **Note:** When an error is thrown you must ask the user to login. Obtain their email address and send them an access link using `RollPass.sendAccessLink(emailAddress)`.

```html
<script>
/**
 * Call `getUser` to authenticate a user on your page
 *
 * - Returns a Promise<User> if user is logged in
 * - Throws an error if session expired or user not known 
 *
 * When an error is throw you should catch and ask user to login
 */
RollPass.getUser()
.then(function (user) {
  alert("Hello " + user.emailAddress);
  /**
   * now we can get and set data for the user
   */
  RollPass.getKeyValue("birthday").then(birhday => {
    // etc
  });          
}).catch(err => {
  /**
   * When errors are thrown you should prompt the user to enter their
   * email address and then use RollPass to send them an access link
   */
  const emailAddress = prompt("Please enter email address");
  
  // send access link to email address
  RollPass.sendAccessLink(emailAddress);
  
  // tell the user to check their email
  alert("Please check your email address")
});
</script>
```

## Methods

###  getKeyValue

▸ **getKeyValue**(`key`: string): *Promise‹any›*

*Defined in [static/browser.ts:101](https://github.com/RollPass/rollpass-js/blob/0cb2eb5/static/browser.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

###  getUser

▸ **getUser**(): *Promise‹[User](interfaces/user.md)›*

*Defined in [static/browser.ts:93](https://github.com/RollPass/rollpass-js/blob/0cb2eb5/static/browser.ts#L93)*

Authenticate a user. Expect method to throw exception when user is not logged in. Handle this exception by asking for the users email address
and sending them an access link via email using `RollPass.sendAccessLink(emailAddress)`.

```html
<script>
/**
 * Call `getUser` to authenticate a user on your page
 *
 * - Returns a Promise<User> if user is logged in
 * - Throws an error if session expired or user not known 
 *
 * When an error is throw you should catch and ask user to login
 */
RollPass.getUser()
.then(function (user) {
  alert("Hello " + user.emailAddress);
  /**
   * now we can get and set data for the user
   */
  RollPass.getKeyValue("birthday").then(birhday => {
    // etc
  });          
}).catch(err => {
  /**
   * When errors are thrown you should prompt the user to enter their
   * email address and then use RollPass to send them an access link
   */
  const emailAddress = prompt("Please enter email address");
  
  // send access link to email address
  RollPass.sendAccessLink(emailAddress);
  
  // tell the user to check their email
  alert("Please check your email address")
});
</script>
```

**Returns:** *Promise‹[User](interfaces/user.md)›*

###  init

▸ **init**(`clientOptions`: [ClientOptions](interfaces/clientoptions.md)): *void*

*Defined in [static/browser.ts:84](https://github.com/RollPass/rollpass-js/blob/0cb2eb5/static/browser.ts#L84)*

Initialize RollPass for your `clientToken` and `projectId`. You can find these in [your dashboard](https://rollpass.io/dashboard).

> **Note:** Your project `redirectUrl` should be configured so that users will be redirected to your HTML page after clicking an access link.

```html
<script>
RollPass.init({
  clientToken: 'xxxx',
  projectId: 'xxxx'
});
</script>
```

**Parameters:**

Name | Type |
------ | ------ |
`clientOptions` | [ClientOptions](interfaces/clientoptions.md) |

**Returns:** *void*

###  sendAccessLink

▸ **sendAccessLink**(`emailAddress`: string): *Promise‹any›*

*Defined in [static/browser.ts:97](https://github.com/RollPass/rollpass-js/blob/0cb2eb5/static/browser.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

###  setKeyValue

▸ **setKeyValue**(`key`: string, `value`: any): *Promise‹any›*

*Defined in [static/browser.ts:105](https://github.com/RollPass/rollpass-js/blob/0cb2eb5/static/browser.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹any›*

###  signOut

▸ **signOut**(): *void*

*Defined in [static/browser.ts:109](https://github.com/RollPass/rollpass-js/blob/0cb2eb5/static/browser.ts#L109)*

**Returns:** *void*

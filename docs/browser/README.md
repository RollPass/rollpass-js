[RollPass Browser](README.md)

# RollPass Browser

## Object literals

### `Const` RollPassBrowser

### ▪ **RollPassBrowser**: *object*

*Defined in [static/browser.ts:67](https://github.com/RollPass/rollpass-js/blob/7ab3f54/static/browser.ts#L67)*

RollPass Browser library for use in frontend apps or static HTML.

### Quick Start

#### Create free account
[Sign up](https://rollpass.io/sign-up/) for RollPass and create a free account.
Find your `clientToken` and `projectId` in [your dashboard](https://rollpass.io/dashboard).

#### Add CDN Script
Include the RollPass Browser library in your HTML by placing a `<script>` tag inside the `<body>`.

```html
<!doctype html>
<html>
<body>
  <script src="https://cdn.rollpass.io/js/rollpass.min.js"></script>
</body>
</html>
```

#### Configure RollPass
Create another `<script>` tag after this and configure the global RollPass object using your `clientToken` and `projectId`.

```html
<script>
RollPass.init({
  clientToken: 'xxxx',
  projectId: 'xxxx'
});
</script>
```

#### Authenticate a user

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

###  getKeyValue

▸ **getKeyValue**(`key`: string): *Promise‹any›*

*Defined in [static/browser.ts:92](https://github.com/RollPass/rollpass-js/blob/7ab3f54/static/browser.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

###  getUser

▸ **getUser**(): *Promise‹[User](interfaces/user.md)›*

*Defined in [static/browser.ts:84](https://github.com/RollPass/rollpass-js/blob/7ab3f54/static/browser.ts#L84)*

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

*Defined in [static/browser.ts:75](https://github.com/RollPass/rollpass-js/blob/7ab3f54/static/browser.ts#L75)*

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

*Defined in [static/browser.ts:88](https://github.com/RollPass/rollpass-js/blob/7ab3f54/static/browser.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

###  setKeyValue

▸ **setKeyValue**(`key`: string, `value`: any): *Promise‹any›*

*Defined in [static/browser.ts:96](https://github.com/RollPass/rollpass-js/blob/7ab3f54/static/browser.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹any›*

###  signOut

▸ **signOut**(): *void*

*Defined in [static/browser.ts:100](https://github.com/RollPass/rollpass-js/blob/7ab3f54/static/browser.ts#L100)*

**Returns:** *void*

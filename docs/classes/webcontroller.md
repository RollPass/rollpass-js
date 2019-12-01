[rollpass-js](../README.md) › [WebController](webcontroller.md)

# Class: WebController

For use with client-side applications that interact with RollPass.

## Install

To use RollPass create a new WebController instance in your application using the [clientToken](https://rollpass.io/dashboard) and [projectId](https://rollpass.io/dashboard) found in your [dashboard](https://rollpass.io/dashboard).

### For browser environments
You can include RollPass in HTML projects using the CDN script href.

```html
<script href="https://cdn.rollpass.io/rollpass-js/latest.min.js"></script>
```

Then in a script tag access the WebController like so:
```html
<script type="javascript">
const webController = new RollPass.WebController({
  clientToken: 'xxxx';
  projectId: 'xxxx';
});
</script>
```
### Node environments

`npm install --save rollpass-js`

```typescript
import { WebController } from "rollpass-js";

const webController = new WebController({
  clientToken: 'xxxx';
  projectId: 'xxxx';
});
```
## Authenticate users
The `WebController` makes it easy to authenticate users with one method: `getAuthenticationState()`. This method
checks to see if a user is either:
- anonymous
- arriving via an access link
- returning with a session that is valid or invalid

Based on the returned state of `getAuthenticationState()` you should either:
- `if(state === 'AUTHENTICATED')` prompt the user to login by asking for their email address and sending them a challenge
- `else` called authenticated user methods such as `getUser()`

### Promises
```typescript
webController.getAuthenticationState().then(state => {
 if (state === 'AUTHENTICATED') {
      // call user related methods such as `getUser()`
  else {
      // prompt user to enter an email address and then send them an access link
      // via
  }
})
```

### Async await
```typescript
async created() {
  const state = await webController.getAuthenticationState()
  if (state === 'AUTHENTICATED') {
      // call user related methods such as `getUser()`
  else {
      // prompt user to enter an email address and then send a challenge
  }
}
```

## Hierarchy

* **WebController**

## Index

### Constructors

* [constructor](webcontroller.md#constructor)

### Methods

* [getAuthenticationState](webcontroller.md#getauthenticationstate)
* [getSessionCode](webcontroller.md#getsessioncode)
* [getStoreValue](webcontroller.md#getstorevalue)
* [getUser](webcontroller.md#getuser)
* [sendChallenge](webcontroller.md#sendchallenge)
* [setStoreValue](webcontroller.md#setstorevalue)
* [signOut](webcontroller.md#signout)

## Constructors

###  constructor

\+ **new WebController**(`clientOptions`: [ClientOptions](../interfaces/clientoptions.md), `storage`: [IStorage](../interfaces/istorage.md), `apiOptions?`: Partial‹[ApiOptions](../interfaces/apioptions.md)›): *[WebController](webcontroller.md)*

Defined in src/public/WebController.ts:123

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/clientoptions.md) | - |
`storage` | [IStorage](../interfaces/istorage.md) |  window.localStorage |
`apiOptions?` | Partial‹[ApiOptions](../interfaces/apioptions.md)› | - |

**Returns:** *[WebController](webcontroller.md)*

## Methods

###  getAuthenticationState

▸ **getAuthenticationState**(`currentUrl`: string): *Promise‹[AuthenticationState](../enums/authenticationstate.md)›*

Defined in src/public/WebController.ts:146

Get the current authentication state. Use the authentication state to determine your next action.

Method first checks the current url for the presence of a challenge code. If that is found
the challenge is verified and a session is created in localStorage. Authentication state returned in this case is `AUTHENTICATED`. You can then use the `getUser()` and user datastore methods safely.

If no code is present the method checks for a session in localStorage and tries to validate the session. If the session is still valid then `AUTHENTICATED` is returned. If not `NO_STORED_SESSION` is returned.

If no code or session is found `UNAUTHENTICATED` is returned. In this case (or when `NO_STORED_SESSION`) you should prompt the user to enter their email address and use it to send a challenge with `sendChallenge(emailAddress)`.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`currentUrl` | string |  window.location.search | Optional URL or string in which to find a `code={challengeCode}` parameter  |

**Returns:** *Promise‹[AuthenticationState](../enums/authenticationstate.md)›*

___

###  getSessionCode

▸ **getSessionCode**(): *any*

Defined in src/public/WebController.ts:171

**Returns:** *any*

___

###  getStoreValue

▸ **getStoreValue**(): *Promise‹any›*

Defined in src/public/WebController.ts:224

**Returns:** *Promise‹any›*

___

###  getUser

▸ **getUser**(): *Promise‹any›*

Defined in src/public/WebController.ts:219

```typescript
try {
  const user = await getUser()
} catch(e) {
  if (e.name === 'NO_STORED_SESSION') {
    // prompt user to log in
  } else {
    throw e;
  }
}

```

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in src/public/WebController.ts:201

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  setStoreValue

▸ **setStoreValue**(): *Promise‹any›*

Defined in src/public/WebController.ts:229

**Returns:** *Promise‹any›*

___

###  signOut

▸ **signOut**(): *void*

Defined in src/public/WebController.ts:193

**Returns:** *void*

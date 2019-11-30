[rollpass-js](../README.md) › ["WebController"](../modules/_webcontroller_.md) › [WebController](_webcontroller_.webcontroller.md)

# Class: WebController

WebController

For use with client-side applications that interact with RollPass.

Typical usage:

```typescript
const webController = new WebController({
  clientToken: 'xxxx';
  projectId: 'xxxx';
});
```

## Hierarchy

* **WebController**

## Index

### Constructors

* [constructor](_webcontroller_.webcontroller.md#constructor)

### Methods

* [getAuthenticationState](_webcontroller_.webcontroller.md#getauthenticationstate)
* [getSessionCode](_webcontroller_.webcontroller.md#getsessioncode)
* [getUser](_webcontroller_.webcontroller.md#getuser)
* [sendChallenge](_webcontroller_.webcontroller.md#sendchallenge)
* [signOut](_webcontroller_.webcontroller.md#signout)

## Constructors

###  constructor

\+ **new WebController**(`clientOptions`: [ClientOptions](../interfaces/_clientcontroller_.clientoptions.md), `storage`: [IStorage](../interfaces/_webcontroller_.istorage.md), `apiOptions?`: Partial‹[ApiOptions](../interfaces/_apicontroller_.apioptions.md)›): *[WebController](_webcontroller_.webcontroller.md)*

Defined in WebController.ts:37

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/_clientcontroller_.clientoptions.md) | - |
`storage` | [IStorage](../interfaces/_webcontroller_.istorage.md) |  window.localStorage |
`apiOptions?` | Partial‹[ApiOptions](../interfaces/_apicontroller_.apioptions.md)› | - |

**Returns:** *[WebController](_webcontroller_.webcontroller.md)*

## Methods

###  getAuthenticationState

▸ **getAuthenticationState**(`currentUrl`: string): *Promise‹[AuthenticationState](../enums/_webcontroller_.authenticationstate.md)›*

Defined in WebController.ts:52

Get the current authentication state. Use the authentication state to determine your next action

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`currentUrl` | string |  window.location.search | Optional URL or string in which to find a `code={challengeCode}` parameter  |

**Returns:** *Promise‹[AuthenticationState](../enums/_webcontroller_.authenticationstate.md)›*

___

###  getSessionCode

▸ **getSessionCode**(): *any*

Defined in WebController.ts:80

**Returns:** *any*

___

###  getUser

▸ **getUser**(): *Promise‹any›*

Defined in WebController.ts:92

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in WebController.ts:88

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  signOut

▸ **signOut**(): *void*

Defined in WebController.ts:84

**Returns:** *void*

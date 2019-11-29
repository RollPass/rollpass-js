[rollpass-js](../README.md) › ["index"](../modules/_index_.md) › [WebController](_index_.webcontroller.md)

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

* [constructor](_index_.webcontroller.md#constructor)

### Methods

* [getAuthenticationState](_index_.webcontroller.md#getauthenticationstate)
* [getSessionCode](_index_.webcontroller.md#getsessioncode)
* [getUser](_index_.webcontroller.md#getuser)
* [sendChallenge](_index_.webcontroller.md#sendchallenge)
* [signOut](_index_.webcontroller.md#signout)

## Constructors

###  constructor

\+ **new WebController**(`clientOptions`: [ClientOptions](../interfaces/_index_.clientoptions.md), `storage`: [IStorage](../interfaces/_index_.istorage.md), `apiOptions?`: [ApiOptions](../interfaces/_index_.apioptions.md)): *[WebController](_index_.webcontroller.md)*

Defined in index.ts:25

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/_index_.clientoptions.md) | - |
`storage` | [IStorage](../interfaces/_index_.istorage.md) |  window.localStorage |
`apiOptions?` | [ApiOptions](../interfaces/_index_.apioptions.md) | - |

**Returns:** *[WebController](_index_.webcontroller.md)*

## Methods

###  getAuthenticationState

▸ **getAuthenticationState**(`currentUrl`: string): *Promise‹[AuthenticationState](../enums/_index_.authenticationstate.md)›*

Defined in index.ts:42

Get the current authentication state. Use the authentication state to determine your next action

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`currentUrl` | string |  window.location.search | Optional URL or string in which to find a `code={challengeCode}` parameter  |

**Returns:** *Promise‹[AuthenticationState](../enums/_index_.authenticationstate.md)›*

___

###  getSessionCode

▸ **getSessionCode**(): *any*

Defined in index.ts:70

**Returns:** *any*

___

###  getUser

▸ **getUser**(): *Promise‹any›*

Defined in index.ts:82

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in index.ts:78

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  signOut

▸ **signOut**(): *void*

Defined in index.ts:74

**Returns:** *void*

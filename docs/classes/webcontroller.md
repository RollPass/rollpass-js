[rollpass-js](../README.md) › [WebController](webcontroller.md)

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

* [constructor](webcontroller.md#constructor)

### Methods

* [getAuthenticationState](webcontroller.md#getauthenticationstate)
* [getSessionCode](webcontroller.md#getsessioncode)
* [getUser](webcontroller.md#getuser)
* [sendChallenge](webcontroller.md#sendchallenge)
* [signOut](webcontroller.md#signout)

## Constructors

###  constructor

\+ **new WebController**(`clientOptions`: [ClientOptions](../interfaces/clientoptions.md), `storage`: [IStorage](../interfaces/istorage.md), `apiOptions?`: Partial‹[ApiOptions](../interfaces/apioptions.md)›): *[WebController](webcontroller.md)*

Defined in public/WebController.ts:40

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

Defined in public/WebController.ts:63

Get the current authentication state. Use the authentication state to determine your next action.

Method first checks the current url for the presence of a challenge code. If that is found
the challenge is verified and a session is created in localStorage. Authentication state returned in this case is `AUTHENTICATED`.

If no code is present the method checks for a session in localStorage and tries to validate the session. If the session is still valid then `AUTHENTICATED` is returned. If not `SESSION_EXPIRED` is returned.

If no code or session is found `UNAUTHENTICATED` is returned. In this case you should prompt the user to enter their email address and use it to send a challenge with `sendChallenge(emailAddress).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`currentUrl` | string |  window.location.search | Optional URL or string in which to find a `code={challengeCode}` parameter  |

**Returns:** *Promise‹[AuthenticationState](../enums/authenticationstate.md)›*

___

###  getSessionCode

▸ **getSessionCode**(): *any*

Defined in public/WebController.ts:91

**Returns:** *any*

___

###  getUser

▸ **getUser**(): *Promise‹any›*

Defined in public/WebController.ts:103

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in public/WebController.ts:99

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  signOut

▸ **signOut**(): *void*

Defined in public/WebController.ts:95

**Returns:** *void*

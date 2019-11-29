[rollpass-js](../README.md) › ["index"](../modules/_index_.md) › [ClientController](_index_.clientcontroller.md)

# Class: ClientController

ClientController

## Hierarchy

* ApiController

  ↳ **ClientController**

## Index

### Constructors

* [constructor](_index_.clientcontroller.md#constructor)

### Methods

* [getSession](_index_.clientcontroller.md#getsession)
* [getUser](_index_.clientcontroller.md#getuser)
* [request](_index_.clientcontroller.md#request)
* [sendChallenge](_index_.clientcontroller.md#sendchallenge)
* [verifyChallenge](_index_.clientcontroller.md#verifychallenge)

## Constructors

###  constructor

\+ **new ClientController**(`clientOptions`: [ClientOptions](../interfaces/_index_.clientoptions.md), `apiOptions?`: [ApiOptions](../interfaces/_index_.apioptions.md)): *[ClientController](_index_.clientcontroller.md)*

*Overrides void*

Defined in index.ts:143

**Parameters:**

Name | Type |
------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/_index_.clientoptions.md) |
`apiOptions?` | [ApiOptions](../interfaces/_index_.apioptions.md) |

**Returns:** *[ClientController](_index_.clientcontroller.md)*

## Methods

###  getSession

▸ **getSession**(`sessionCode`: string): *Promise‹any›*

Defined in index.ts:150

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  getUser

▸ **getUser**(`sessionCode`: string): *Promise‹any›*

Defined in index.ts:174

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  request

▸ **request**<**T**>(`method`: Method, `path`: string, `params`: any, `data`: any, `extractData`: boolean): *Promise‹T›*

*Inherited from void*

Defined in index.ts:101

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`method` | Method | - |
`path` | string | - |
`params` | any | - |
`data` | any |  null |
`extractData` | boolean | true |

**Returns:** *Promise‹T›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in index.ts:158

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  verifyChallenge

▸ **verifyChallenge**(`challengeCode`: string): *Promise‹any›*

Defined in index.ts:166

**Parameters:**

Name | Type |
------ | ------ |
`challengeCode` | string |

**Returns:** *Promise‹any›*

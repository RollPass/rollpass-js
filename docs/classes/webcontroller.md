[rollpass-js](../README.md) › [WebController](webcontroller.md)

# Class: WebController

## Hierarchy

* **WebController**

## Index

### Constructors

* [constructor](webcontroller.md#constructor)

### Methods

* [getSessionCode](webcontroller.md#getsessioncode)
* [getStoreValue](webcontroller.md#getstorevalue)
* [getUser](webcontroller.md#getuser)
* [sendChallenge](webcontroller.md#sendchallenge)
* [setStoreValue](webcontroller.md#setstorevalue)
* [signOut](webcontroller.md#signout)

## Constructors

###  constructor

\+ **new WebController**(`clientOptions`: [ClientOptions](../interfaces/clientoptions.md), `storage`: [IStorage](../interfaces/istorage.md), `apiOptions?`: Partial‹[ApiOptions](../interfaces/apioptions.md)›): *[WebController](webcontroller.md)*

Defined in src/public/WebController.ts:50

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/clientoptions.md) | - |
`storage` | [IStorage](../interfaces/istorage.md) |  window.localStorage |
`apiOptions?` | Partial‹[ApiOptions](../interfaces/apioptions.md)› | - |

**Returns:** *[WebController](webcontroller.md)*

## Methods

###  getSessionCode

▸ **getSessionCode**(): *any*

Defined in src/public/WebController.ts:117

**Returns:** *any*

___

###  getStoreValue

▸ **getStoreValue**(`key`: string): *Promise‹any›*

Defined in src/public/WebController.ts:74

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

___

###  getUser

▸ **getUser**(): *Promise‹any›*

Defined in src/public/WebController.ts:61

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in src/public/WebController.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  setStoreValue

▸ **setStoreValue**(`key`: string, `value`: string): *Promise‹any›*

Defined in src/public/WebController.ts:78

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | string |

**Returns:** *Promise‹any›*

___

###  signOut

▸ **signOut**(): *void*

Defined in src/public/WebController.ts:82

**Returns:** *void*

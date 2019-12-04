[RollPass JS](../README.md) › [WebController](webcontroller.md)

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

*Defined in [src/public/controllers/WebController.ts:50](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L50)*

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

*Defined in [src/public/controllers/WebController.ts:118](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L118)*

**Returns:** *any*

___

###  getStoreValue

▸ **getStoreValue**(`key`: string): *Promise‹any›*

*Defined in [src/public/controllers/WebController.ts:75](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

___

###  getUser

▸ **getUser**(): *Promise‹any›*

*Defined in [src/public/controllers/WebController.ts:61](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L61)*

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

*Defined in [src/public/controllers/WebController.ts:71](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  setStoreValue

▸ **setStoreValue**(`key`: string, `value`: string): *Promise‹any›*

*Defined in [src/public/controllers/WebController.ts:79](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | string |

**Returns:** *Promise‹any›*

___

###  signOut

▸ **signOut**(): *void*

*Defined in [src/public/controllers/WebController.ts:83](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L83)*

**Returns:** *void*

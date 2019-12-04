[rollpass](../README.md) › [ClientController](clientcontroller.md)

# Class: ClientController

ClientController

## Hierarchy

* ApiController

  ↳ **ClientController**

## Constructors

###  constructor

\+ **new ClientController**(`clientOptions`: [ClientOptions](../interfaces/clientoptions.md), `apiOptions?`: Partial‹[ApiOptions](../interfaces/apioptions.md)›): *[ClientController](clientcontroller.md)*

*Defined in [src/public/controllers/ClientController.ts:22](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/clientoptions.md) |
`apiOptions?` | Partial‹[ApiOptions](../interfaces/apioptions.md)› |

**Returns:** *[ClientController](clientcontroller.md)*

## Methods

###  deleteKeyValue

▸ **deleteKeyValue**(`key`: string, `value`: any): *Promise‹any›*

*Defined in [src/public/controllers/ClientController.ts:78](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹any›*

___

###  deleteSession

▸ **deleteSession**(`sessionCode`: string): *Promise‹any›*

*Defined in [src/public/controllers/ClientController.ts:36](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  getKeyValue

▸ **getKeyValue**(`key`: string): *Promise‹any›*

*Defined in [src/public/controllers/ClientController.ts:64](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

___

###  getSession

▸ **getSession**(`sessionCode`: string): *Promise‹any›*

*Defined in [src/public/controllers/ClientController.ts:29](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  getUser

▸ **getUser**(`sessionCode`: string): *Promise‹[User](../interfaces/user.md)›*

*Defined in [src/public/controllers/ClientController.ts:57](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹[User](../interfaces/user.md)›*

___

###  putKeyValue

▸ **putKeyValue**(`key`: string, `value`: any): *Promise‹any›*

*Defined in [src/public/controllers/ClientController.ts:71](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

*Defined in [src/public/controllers/ClientController.ts:43](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  verifyChallenge

▸ **verifyChallenge**(`challengeCode`: string): *Promise‹any›*

*Defined in [src/public/controllers/ClientController.ts:50](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/controllers/ClientController.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`challengeCode` | string |

**Returns:** *Promise‹any›*

[rollpass-js](../README.md) › [ClientController](clientcontroller.md)

# Class: ClientController

ClientController

## Hierarchy

* ApiController

  ↳ **ClientController**

## Index

### Constructors

* [constructor](clientcontroller.md#constructor)

### Methods

* [deleteSession](clientcontroller.md#deletesession)
* [getKeyValue](clientcontroller.md#getkeyvalue)
* [getSession](clientcontroller.md#getsession)
* [getUser](clientcontroller.md#getuser)
* [putKeyValue](clientcontroller.md#putkeyvalue)
* [sendChallenge](clientcontroller.md#sendchallenge)
* [verifyChallenge](clientcontroller.md#verifychallenge)

## Constructors

###  constructor

\+ **new ClientController**(`clientOptions`: [ClientOptions](../interfaces/clientoptions.md), `apiOptions?`: Partial‹[ApiOptions](../interfaces/apioptions.md)›): *[ClientController](clientcontroller.md)*

Defined in src/public/ClientController.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/clientoptions.md) |
`apiOptions?` | Partial‹[ApiOptions](../interfaces/apioptions.md)› |

**Returns:** *[ClientController](clientcontroller.md)*

## Methods

###  deleteSession

▸ **deleteSession**(`sessionCode`: string): *Promise‹any›*

Defined in src/public/ClientController.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  getKeyValue

▸ **getKeyValue**(`key`: string): *Promise‹any›*

Defined in src/public/ClientController.ts:64

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

___

###  getSession

▸ **getSession**(`sessionCode`: string): *Promise‹any›*

Defined in src/public/ClientController.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  getUser

▸ **getUser**(`sessionCode`: string): *Promise‹[User](../interfaces/user.md)›*

Defined in src/public/ClientController.ts:57

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹[User](../interfaces/user.md)›*

___

###  putKeyValue

▸ **putKeyValue**(`key`: string, `value`: any): *Promise‹any›*

Defined in src/public/ClientController.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in src/public/ClientController.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  verifyChallenge

▸ **verifyChallenge**(`challengeCode`: string): *Promise‹any›*

Defined in src/public/ClientController.ts:50

**Parameters:**

Name | Type |
------ | ------ |
`challengeCode` | string |

**Returns:** *Promise‹any›*

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

* [getSession](clientcontroller.md#getsession)
* [getUser](clientcontroller.md#getuser)
* [sendChallenge](clientcontroller.md#sendchallenge)
* [verifyChallenge](clientcontroller.md#verifychallenge)

## Constructors

###  constructor

\+ **new ClientController**(`clientOptions`: [ClientOptions](../interfaces/clientoptions.md), `apiOptions?`: Partial‹[ApiOptions](../interfaces/apioptions.md)›): *[ClientController](clientcontroller.md)*

Defined in public/ClientController.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/clientoptions.md) |
`apiOptions?` | Partial‹[ApiOptions](../interfaces/apioptions.md)› |

**Returns:** *[ClientController](clientcontroller.md)*

## Methods

###  getSession

▸ **getSession**(`sessionCode`: string): *Promise‹any›*

Defined in public/ClientController.ts:20

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  getUser

▸ **getUser**(`sessionCode`: string): *Promise‹any›*

Defined in public/ClientController.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in public/ClientController.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  verifyChallenge

▸ **verifyChallenge**(`challengeCode`: string): *Promise‹any›*

Defined in public/ClientController.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`challengeCode` | string |

**Returns:** *Promise‹any›*

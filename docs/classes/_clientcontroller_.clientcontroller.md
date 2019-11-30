[rollpass-js](../README.md) › ["ClientController"](../modules/_clientcontroller_.md) › [ClientController](_clientcontroller_.clientcontroller.md)

# Class: ClientController

## Hierarchy

* ApiController

  ↳ **ClientController**

## Index

### Constructors

* [constructor](_clientcontroller_.clientcontroller.md#constructor)

### Methods

* [getSession](_clientcontroller_.clientcontroller.md#getsession)
* [getUser](_clientcontroller_.clientcontroller.md#getuser)
* [sendChallenge](_clientcontroller_.clientcontroller.md#sendchallenge)
* [verifyChallenge](_clientcontroller_.clientcontroller.md#verifychallenge)

## Constructors

###  constructor

\+ **new ClientController**(`clientOptions`: [ClientOptions](../interfaces/_clientcontroller_.clientoptions.md), `apiOptions?`: Partial‹[ApiOptions](../interfaces/_apicontroller_.apioptions.md)›): *[ClientController](_clientcontroller_.clientcontroller.md)*

Defined in ClientController.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`clientOptions` | [ClientOptions](../interfaces/_clientcontroller_.clientoptions.md) |
`apiOptions?` | Partial‹[ApiOptions](../interfaces/_apicontroller_.apioptions.md)› |

**Returns:** *[ClientController](_clientcontroller_.clientcontroller.md)*

## Methods

###  getSession

▸ **getSession**(`sessionCode`: string): *Promise‹any›*

Defined in ClientController.ts:20

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  getUser

▸ **getUser**(`sessionCode`: string): *Promise‹any›*

Defined in ClientController.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`sessionCode` | string |

**Returns:** *Promise‹any›*

___

###  sendChallenge

▸ **sendChallenge**(`emailAddress`: string): *Promise‹any›*

Defined in ClientController.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

___

###  verifyChallenge

▸ **verifyChallenge**(`challengeCode`: string): *Promise‹any›*

Defined in ClientController.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`challengeCode` | string |

**Returns:** *Promise‹any›*

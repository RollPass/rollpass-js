[rollpass](../README.md) › [MiddlewareOptions](middlewareoptions.md)

# Interface: MiddlewareOptions

## Hierarchy

* **MiddlewareOptions**

## Index

### Properties

* [authenticatedRoutes](middlewareoptions.md#optional-authenticatedroutes)
* [clientToken](middlewareoptions.md#clienttoken)
* [debug](middlewareoptions.md#optional-debug)
* [paths](middlewareoptions.md#paths)
* [projectId](middlewareoptions.md#projectid)

## Properties

### `Optional` authenticatedRoutes

• **authenticatedRoutes**? : *RegExp[]*

*Defined in [src/public/plugins/express-middleware.ts:71](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/plugins/express-middleware.ts#L71)*

Array of regular expressions for routes that require authentication

___

###  clientToken

• **clientToken**: *string*

*Defined in [src/public/plugins/express-middleware.ts:59](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/plugins/express-middleware.ts#L59)*

Your clientToken

___

### `Optional` debug

• **debug**? : *undefined | false | true*

*Defined in [src/public/plugins/express-middleware.ts:75](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/plugins/express-middleware.ts#L75)*

Enable console logging

___

###  paths

• **paths**: *[MiddlewarePaths](middlewarepaths.md)*

*Defined in [src/public/plugins/express-middleware.ts:67](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/plugins/express-middleware.ts#L67)*

Path config

___

###  projectId

• **projectId**: *string*

*Defined in [src/public/plugins/express-middleware.ts:63](https://github.com/RollPass/rollpass-js/blob/e91670a/src/public/plugins/express-middleware.ts#L63)*

RollPass projectId

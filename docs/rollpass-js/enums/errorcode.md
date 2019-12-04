[RollPass JS](../README.md) › [ErrorCode](errorcode.md)

# Enumeration: ErrorCode

## Index

### Enumeration members

* [NO_STORED_SESSION](errorcode.md#no_stored_session)
* [UNINITIALIZED_CLIENT](errorcode.md#uninitialized_client)

## Enumeration members

###  NO_STORED_SESSION

• **NO_STORED_SESSION**: = "NO_STORED_SESSION"

*Defined in [src/public/controllers/WebController.ts:17](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L17)*

No session was found locally. This could mean that you haven't authenticated the user yet.
You should call `getAuthenticationState` once at application load to get a local session before calling session dependent methods.

___

###  UNINITIALIZED_CLIENT

• **UNINITIALIZED_CLIENT**: = "UNINITIALIZED_CLIENT"

*Defined in [src/public/controllers/WebController.ts:12](https://github.com/RollPass/rollpass-js/blob/24d55ba/src/public/controllers/WebController.ts#L12)*

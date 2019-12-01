[rollpass-js](../README.md) › [ErrorCode](errorcode.md)

# Enumeration: ErrorCode

## Index

### Enumeration members

* [NO_STORED_SESSION](errorcode.md#no_stored_session)

## Enumeration members

###  NO_STORED_SESSION

• **NO_STORED_SESSION**: = "NO_STORED_SESSION"

Defined in src/public/WebController.ts:19

No session was found locally. This could mean that you haven't authenticated the user yet.
You should call `getAuthenticationState` once at application load to get a local session before calling session dependent methods.

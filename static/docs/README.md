[rollpass](README.md)

# rollpass

## Object literals

### `Const` RollPassBrowser

### ▪ **RollPassBrowser**: *object*

*Defined in [static/browser.ts:56](https://github.com/RollPass/rollpass-js/blob/e91670a/static/browser.ts#L56)*

RollPass Browser library for use in frontend apps or static HTML.

### Browser installation
Include the RollPass Browser library in your HTML using a script tag.

```html
<!doctype html>
<html>
<body>
  <script src="https://cdn.rollpass.io/js/rollpass.min.js"></script>
</body>
</html>
```

### Configure RollPass
Next configure the global RollPass object using your clientToken and projectId.

```html
<script>
RollPass.init({
  clientToken: 'xxxx',
  projectId: 'xxxx'
});
</script>
```

### Now authenticate a user or ask them to login

###  getKeyValue

▸ **getKeyValue**(`key`: string): *Promise‹any›*

*Defined in [static/browser.ts:72](https://github.com/RollPass/rollpass-js/blob/e91670a/static/browser.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

###  getUser

▸ **getUser**(): *Promise‹[User](interfaces/user.md)›*

*Defined in [static/browser.ts:64](https://github.com/RollPass/rollpass-js/blob/e91670a/static/browser.ts#L64)*

**Returns:** *Promise‹[User](interfaces/user.md)›*

###  init

▸ **init**(`clientOptions`: [ClientOptions](interfaces/clientoptions.md)): *void*

*Defined in [static/browser.ts:61](https://github.com/RollPass/rollpass-js/blob/e91670a/static/browser.ts#L61)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`clientOptions` | [ClientOptions](interfaces/clientoptions.md) |   |

**Returns:** *void*

###  sendAccessLink

▸ **sendAccessLink**(`emailAddress`: string): *Promise‹any›*

*Defined in [static/browser.ts:68](https://github.com/RollPass/rollpass-js/blob/e91670a/static/browser.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`emailAddress` | string |

**Returns:** *Promise‹any›*

###  setKeyValue

▸ **setKeyValue**(`key`: string, `value`: any): *Promise‹any›*

*Defined in [static/browser.ts:76](https://github.com/RollPass/rollpass-js/blob/e91670a/static/browser.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹any›*

###  signOut

▸ **signOut**(): *void*

*Defined in [static/browser.ts:80](https://github.com/RollPass/rollpass-js/blob/e91670a/static/browser.ts#L80)*

**Returns:** *void*

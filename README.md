# RollPass JS

Official [RollPass.io](https://rollpass.io) Javascript library for frontend, backend, and more.

> Faster sign-ups mean more conversions.

## Features
- Password-less authentication
- User key-value data store
- Browser CDN
- Node and Typescript support
- **Free for personal use**

## Quick Start

### Create an account
RollPass is free for personal use. First, [create an account](https://rollpass.io/sign-up). Then find your 
`clientToken` and `projectId` in the RollPass [dashboard](https://rollpass.io/dashboard).

### Browser Installation
RollPass let's you create authenticated frontend apps without a database or server!
Simply include the RollPass CDN script in your HTML and use `getUser` to authenticate.

```html
<script src="https://cdn.rollpass.io/js/rollpass.min.js"></script>
<script>
RollPass.init({
  clientToken: 'xxxx',
  projectId: 'xxxx'
});
  
RollPass.getUser().then(function (user) {
  // user is authenticated
  console.log(user);
}).catch(err => {
  // no current user session
  var email = prompt("Please enter email address");
  RollPass.sendAccessLink(email);
  // tell user to check email
});
</script>
```

### NodeJS Environments
RollPass works well with NodeJS, Typescript, and WebPack. Install the package with npm or yarn.

`npm install --save rollpass`

The library exports several Controller classes that correspond to RollPass REST API actions. 
Configure the Controllers you wish to use in your application. See the documentation  for extensive notes and examples.

```typescript
import { ClientController } from "rollpass";

const clientController = new ClientController({
  clientToken: 'xxxx',
  projectId: 'xxxx'
});

async created() {
  try {
    const user = await clientController.getUser();
  } catch (e) {
    // no session, get user email address
    const email = prompt("Please enter email address");

    // send the user an access link
    clientController.sendChallenge(email);

    // ask user to check email 
  }
}
```

## Documentation

- [Full method documentation](./docs/README.md)
- [WebController](./docs/classes/webcontroller.md)
- [ClientController](./docs/classes/clientcontroller.md)
- [ProjectController](./docs/classes/projectcontroller.md)

## Testing
RollPass recommends using a free MailSlurp [test email account](https://www.mailslurp.com) to test passwordless authentication flows.
You can see how we test this library using MailSlurp in [browser.spec.js](./integration/wdio/browser.spec.js).

## Issues

- Please email [contact@rollpass.io](mailto:contact@rollpass.io)
- Or open a GitHub issue and include code samples

## Examples

- [Browser HelloWorld](./static/index.html)

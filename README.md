# RollPass JS

Official [RollPass.io](https://rollpass.io) Javascript library for frontend, backend, and more.

## Features
- Passwordless authentication
- User key-value data store
- Browser CDN
- Node and Typescript support

## Getting started

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
});
</script>
```

### NodeJS Environments
RollPass works well with NodeJS, Typescript, and WebPack. Install the package with npm or yarn.

`npm install --save rollpass`

The library exports several Controller classes that correspond to RollPass REST API actions. 
Configure the Controllers you wish to use in your application. See the documentation for extensive notes and examples.

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
    
    // ask user to check email 
  }
}
```

### Documentation
See [full method documentation](./docs/README.md)

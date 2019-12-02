# RollPass JS

Official [RollPass.io](https://rollpass.io) Javascript library for frontend, backend, and more.

## Features
- Passwordless authentication
- User key-value data store
- Browser CDN
- Node and Typescript support

## Getting started

### Browser Installation
For frontend and static HTML projects use include the RollPass CDN script in your HTML and use `getUser` to authenticate.

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
Install RollPass with npm or yarn.

`npm install --save rollpass`

You have access to all RollPass API features from this package. Configure the Controllers you wish to use in your application. See the documentaion for extensive notes and examples.

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

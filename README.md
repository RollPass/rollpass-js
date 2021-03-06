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
RollPass is free for personal use. First, [create an account](https://rollpass.io/sign-up). Then find your 
`clientToken` and `projectId` in the RollPass [dashboard](https://rollpass.io/dashboard). Next, choose how you want to use RollPass:

### Browser
RollPass let's you create authenticated frontend apps without a database or server. All you need is an HTML file.

#### Include script
Add a script tag that includes RollPass on your page.

```html
<script src="https://cdn.rollpass.io/js/rollpass.min.js"></script>
```

#### Configure RollPass
Next configure RollPass using the clientToken and projectId shown in your [account dashboad](https://rollpass.io/dashboard).
Make sure the `redirectUrl` of your project matches the localhost or location of your HTML file.

```html
<script>
RollPass.init({
  clientToken: 'xxxx',
  projectId: 'xxxx'
});
</script>
```

#### Authenticate User
RollPass for the browser works wih one promise-based method. Call `getUser` when you app is loaded and RollPass will determine if a user is anonymous, logged in, or arriving via an access link. 

```html
<script>
RollPass.getUser().then(function (user) {
  // user is authenticated
  alert("Hello " + user.emailAddress);
}).catch(err => {
  // no current user session
  const emailAddress = prompt("Please enter email address");
  RollPass.sendAccessLink(emailAddress);
  alert("Please check your email address")
});
</script>
```

If `getUser` throws an error this means the user could not be authenticated. In this case you must obtain the users email address and send an access link to them using `sendAccessLink`. When the user clicks the link and is redirected to your page let the same script execute and `getUser` will succeed and return the user to you. 

### NodeJS Environments
RollPass works well with NodeJS, Typescript, and WebPack. Install the package with npm or yarn.

`npm install --save rollpass`

#### Import Controllers
RollPass exposes several controllers that map closely to the REST API functionality. Controllers typically require either a clientToken or a secretToken.

- `clientToken`: for use in front-end or public environments
- `secretToken`: for use server-side in secure environments

```typescript
// for frontend apps with localStorage
import { WebController } from "rollpass";

// for isomorphic or server proxy
import { ClientController } from "rollpass";

// for server or secure only
import { ProjectController } from "rollpass";

```

#### Configure
First configure your controller instance with a clientToken or secretToken and a projectId. If your project uses a redirectUrl this should either point ot your application or proxy server. (You can create localhost and production projects.)

```typescript

const webController = new WebController({
  clientToken: 'xxxx',
  projectId: 'xxxx'
});
```

#### Authenticate 
When your app is ready *OR* when your user loads the redirectUrl for your project you can authenticate a user like so:

```typescript
async created() {
  try {
    const user = await webController.getUser();
  } catch (e) {
    // user is not authenticated so get user email address
    const email = prompt("Please enter email address");

    // send the user an access link
    clientController.sendChallenge(email);

    // ask user to check email 
  }
}
```

## Redirect URL (CORS Policy)
Most RollPass projects require a `redirectUrl`. This will be combined with a `?code={challengeCode}` parameter and sent to the a given email address each time you issue a challenge or accessLink. 

You can use `getUser` to automatically parse and validate the challenge code in your application. For fine control you can also validate challenge codes yourself with the `ClientController`. For frontend applications it is important that your projects `allowedOrigin` matches the base URL of you application or your HTTP calls will fail.

## App Lifecycles
TODO

## Key Value Store
TODO

## Documentation

- [Full method documentation](./docs/README.md)
- [WebController](./docs/classes/webcontroller.md)
- [ClientController](./docs/classes/clientcontroller.md)
- [ProjectController](./docs/classes/projectcontroller.md)

## Examples

- [Browser HelloWorld](./static/index.html)

## Testing
RollPass recommends using a free MailSlurp [test email account](https://www.mailslurp.com) to test passwordless authentication flows.
You can see how we test this library using MailSlurp in [browser.spec.js](./integration/wdio/browser.spec.js).

## Issues

- Please email [contact@rollpass.io](mailto:contact@rollpass.io)
- Or open a GitHub issue and include code samples

## REST API
If you prefer to call the RollPass API directly see [REST API Endpoints](https://api.rollpass.io/docs)

## Other Languages
There are RollPass SDKs available in a range of [other languages](https://rollpass.io/install). You can also generate your own client
using the RollPass [Swagger Spec](https://api.rollpass.io/spec).


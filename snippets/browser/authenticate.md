```html
<script>
/**
 * Call `getUser` to authenticate a user on your page
 *
 * - Returns a Promise<User> if user is logged in
 * - Throws an error if session expired or user not known 
 *
 * When an error is throw you should catch and ask user to login
 */
RollPass.getUser()
.then(function (user) {
  alert("Hello " + user.emailAddress);
  /**
   * now we can get and set data for the user
   */
  RollPass.getKeyValue("birthday").then(birhday => {
    // etc
  });          
}).catch(err => {
  /**
   * When errors are thrown you should prompt the user to enter their
   * email address and then use RollPass to send them an access link
   */
  const emailAddress = prompt("Please enter email address");
  
  // send access link to email address
  RollPass.sendAccessLink(emailAddress);
  
  // tell the user to check their email
  alert("Please check your email address")
});
</script>
```

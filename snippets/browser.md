```html
<!doctype html>
<html>
<body>
  <script src="https://cdn.rollpass.io/js/rollpass.min.js"></script>
  <script>
    RollPass.init({
      clientToken: 'xxxx',
      projectId: 'xxxx'
    });
    RollPass.getUser().then(function (user) {
      // user is authenticated
      alert("Hello " + user.emailAddress);
      // now we can get and set data for the user
      //RollPass.getKeyValue("")            
    }).catch(err => {
      // no current user session
      const emailAddress = prompt("Please enter email address");
      RollPass.sendAccessLink(emailAddress);
      alert("Please check your email address")
    });
  </script>
</body>
</html>
```
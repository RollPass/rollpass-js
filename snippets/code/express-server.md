```javascript
const { ClientController } = require('rollpass')
const express = require('express')
const app = express()

const clientController = new ClientController({
    clientToken: 'xxxx',
    projectId: 'xxxx'
})

app.post('/login', async (req, res) => {
  await clientController.sendChallenge(req.params.emailAddress);
  res.send("Please check email for link")
});

app.get('/auth_callback', async (req, res) => {
  const { session } = await clientController.verifyChallenge(req.params.code);
});

app.get('/user', async () => {})




app.listen(3000, () => {})
```

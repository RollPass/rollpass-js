const assert = require('assert')
const MailSlurp = require('mailslurp-client').default;
const mailSlurp = new MailSlurp({ apiKey: "test" });

describe('static browser test', () => {

  async function stateEquals(value) {
    const element = await $('#state');
    const state = await element.getValue();
    return Promise.resolve(state === value);
  }

  it('should have the right title', async () => {
    await browser.url('/index.html')
    const title = await browser.getTitle()
    assert.strictEqual(title, 'RollPass Browser')
  })

  it('can submit when unauthenticated', async () => {
    await browser.waitUntil(() => stateEquals('UNAUTHENTICATED'));
    const {id, emailAddress} = await mailSlurp.createInbox();
    await $("#email").then(i => i.setValue(emailAddress));
    await $("#submit").then(a => a.click());
    await browser.waitUntil(() => stateEquals('LINK_SENT'));
    await browser.setTimeout({ script: 20000 });
    const {body} = await mailSlurp.waitForLatestEmail(id, 20000);
    const [_, code] = /\?code&#x3D;([^'"]+)/g.exec(body)
    assert.strictEqual(!!code, true);
    await browser.url("/index.html?code=" + code);
    await browser.pause(120000);
    await browser.waitUntil(() => stateEquals('AUTHENTICATED'));
  });

});
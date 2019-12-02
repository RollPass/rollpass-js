exports.config = {
    runner: 'local',
    path: '/',
    specs: [
        './integration/wdio/**/*.spec.js'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:3000',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['static-server', 'chromedriver'],
    staticServerFolders: [
        { mount: '/', path: './static' },
    ],
    staticServerPort: 3000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}

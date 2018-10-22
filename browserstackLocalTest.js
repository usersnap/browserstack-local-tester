const browserstack = require('browserstack-local')
const webdriver = require('selenium-webdriver')
const path = require('path')

const { startServer, stopServer } = require('./server')
const { BROWSERSTACK_KEY, BROWSERSTACK_USER } = require('./browserstack.config')


// creates an instance of Local
const bsLocal = new browserstack.Local()


if (BROWSERSTACK_KEY === '<put your browserstack key here>') {
  throw 'You need to edit your browserstack user & key in `browserstack.config.js`!'
}

const bsLocalArgs = {
  key: BROWSERSTACK_KEY,
  verbose: true,
  forceLocal: true,
  local: true,
  f: path.resolve(__dirname, './localFolder'),
  // localProxyHost: '127.0.0.1',
  // localProxyPort: '3128',
  // proxyUser: 'user',
  // proxyPass: 'password',
}

startServer()

// starts the Local instance with the required arguments
bsLocal.start(bsLocalArgs, async (error) => {
  if (error) {
    throw error
  }
  console.log('Started BrowserStackLocal')

  // Input capabilities
  const capabilities = {
    browserName: 'Chrome',
    browser_version: '62.0',
    os: 'Windows',
    os_version: '10',
    resolution: '1024x768',
    'browserstack.user': BROWSERSTACK_USER,
    'browserstack.key': BROWSERSTACK_KEY,
  }

  const driver = new webdriver.Builder()
    .usingServer('http://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build()
  console.log('Built driver')

  try {
    const navigateAndCheckTitle = async (url, expectedTitle) => {
      console.log(`Navigating to ${url}`)
      await driver.get(url)

      const title = await driver.getTitle()
      if (title == expectedTitle) {
        console.log(`> SUCCESS loading ${url}`)
      } else {
        console.log(`> ERROR loading ${url}: expected title "${expectedTitle}", found "${title}"`)
      }
    }

    // navigate to a public url - works
    await navigateAndCheckTitle('https://usersnap.com', 'Usersnap – Smart Feedback to Build Great Digital Products')

    // navigate to a local url - I did not get it running
    await navigateAndCheckTitle('http://localhost:3000', 'Hello world from server!')
    await navigateAndCheckTitle('http://127.0.0.1:3000', 'Hello world from server!')

    // navigate to the folder referenced in `bsLocalArgs` – I did not get it running, no idea on what url this is served…
    await navigateAndCheckTitle('http://localhost', 'Hello world from local folder!')
    await navigateAndCheckTitle('http://127.0.0.1', 'Hello world from local folder!')
    await navigateAndCheckTitle('http://my-local-box', 'Hello world from local folder!')

  } finally {
    driver.quit()
    console.log('Quit driver')

    // stop the Local instance
    bsLocal.stop(() => {
      console.log('Stopped BrowserStackLocal')
    })
    stopServer()
  }
})

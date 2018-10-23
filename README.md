# browserstack-local-tester

## Goal
Establish a connection to browserstack to test a local server & a local folder using `selenium-webdriver` and `browserstack-local`.

- [x] Navigate to public url
- [ ] Navigate to local url
  - Why is the local url not available?
  - Is it possible without a public proxy?
- [ ] Navigate to local folder
  - Which url is generated for the browserstack webserver? (https://www.browserstack.com/local-testing#config-html)

## Prepare
Edit your browserstack user & key in `browserstack.config.js`

## Run
``` bash
npm install
npm run start
```

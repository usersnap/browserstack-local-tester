# browserstack-local-tester

## Prepare
Edit your browserstack user & key in `browserstack.config.js`

## Run
``` bash
npm install
npm run start
```

## Goal
Establish a connection to browserstack to test a local server & a local folder using `selenium-webdriver` and `browserstack-local`.

- [x] Navigate to public url
- [x] Navigate to local url
- [x] Navigate to local folder

### Learnings
- Automated local testing only works (at least in this sample) if a local identifier is set.
- The local folder is available on `http://${BROWSERSTACK_USER}.browserstack.com/index.html`

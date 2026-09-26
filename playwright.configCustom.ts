import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  testDir: './tests',

  retries : 2,   // to fix the flaky test execution, 2 means the failed test cases may run 2 more time

  workers : 10,   // to overide the default workers for  tests execution

  timeout: 30 * 1000,

  expect: {

    timeout: 5000,

  },

  reporter: 'html',

  // under the project option  we can setup/define the multiple project configurations inside array

  projects: [
    {
      name: 'WebkitTest',
      use: {

        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'off',
        ...devices['iPhone 14 Pro'],
        actionTimeout: 20 * 1000,
        navigationTimeout: 30 * 1000,

      }
    },

    {
      name: 'ChromeTest',
      use: {

        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video : 'retain-on-failure',       // to record the video in case test failure
        trace: 'on',
        
        //...devices['Galaxy S24'],                 // to run the test on specific mobile device
        // viewport : {width: 720 , height:720}, // to overide the default size of browser
        // permissions : ['geolocation'] ,       // to allow the location permissions
        // ignoreHTTPSErrors : true              // to accept the ssl certificate in case showing 'your connection is not secure' in browser

      }
    },

     {
      name: 'FirefoxTest',
      use: {

        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        actionTimeout: 20 * 1000,
        navigationTimeout: 30 * 1000,
      }
    }

  ]
  

});

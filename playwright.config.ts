import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

   testDir: './tests',    // to detect and execute the tests 

   //retries : 2,   // to fix the flaky test execution, 2 means the failed test cases may run 2 more time

   timeout: 30  *1000 ,  // Timeout for test -->default timeout for tests is 30 sec
  
   expect : {

     timeout: 30000 ,    //  Timeout for Assertions/verifications(default timeout for Expect assertions is 5 sec)
     //timeout: 10000,  //  override the default value at global level
    },

   reporter : 'html' , // to generate the reports

  use: {

    // There is no default timeout for actions(like click.fill) and navigations if follws the test level timeoutof 30s sec .we can override and set globaly as follows
   actionTimeout: 20 * 1000,
   navigationTimeout: 30 * 1000,

   screenshot : 'on',     // To capture and attach the scrrensot for failed step in report without writing the any code
   trace      :  'on',    // To generate detail report logs for each and every step, we can set it as "on","off" and "retain-on-failure" --> to generate it only on test failure
                           // it generates the trace file in test output folder    
   headless   : false,   // to run the tests in headed mode by default
   browserName : 'chromium'
   //browserName : 'firefox'
   //browserName : 'webkit'   // to run tests on safari
  
  
  },

});

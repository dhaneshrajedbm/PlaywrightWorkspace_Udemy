const {test,expect} = require ('playwright/test')

/*
  ******* Setup / create Project Configurations ***************

  To setup our customised project Configurations we can use customised playwrite.config.js file 
  1. create customised playwrite.config.js file by simply copy paste the default one and rename it as like playwright.configCustom.ts
  2. setup/define the customised project configurations under the project option
  3. we can execute tests with specific project configurations so can run test on different browsers, 
     mobile devices,headed,non headed mode, we can allow location permissions, ssl certificates.
     , we can also capture scrrenshots, record video,and generate logs.
  5. we can do cross browser execution by defining customised project configurations
  6. cmd to execute test on specific configuration->

  npx playwright test B_CreateProjectConfigurations.spec.js --config playwright.configCustom.ts 
  --project=SafariTest

  7. cmd to execute test on multiple configurations on multiple browsers->
  npx playwright test B_CreateProjectConfigurations.spec.js --config playwright.configCustom.ts 



  ******* Flaky Test case execution *************

  we can also fix the flaky test case execution by defining test retries option in config file as - " retries: 1 '
 flaky test are failed in first run due to some resons like test data instability, env issue, of objects  not 
 loaded/identified properly , synchronisation issues.
 so we define test retries option as ' retries: 1 '  config file to run failed test case one or more time
 if test case pass in next run then it sowing as flaky in test report.



 ******* Parallel Test case execution *************

 By default playwright provides the 5 workers for parallel test cases execution.
 worker is nothing but the environment for the test execution. we can also consider it as browser.
 if we executed 1 spec file containing 5 tests then test executed sequentially on only 1 worker 
 if we executed 5 diff spec files then each spec file working on separate worker and its respective tests run sequentially in respective worker.
 
 we can overide the default worker execution by simply define "worker : 3" in config file.



 ************** Parralel Execution of tests in spec file ***************

 we know the tests of spec file are run sequentially on respectve workerr
 We can also run the tests parallely if spec file contains multiple tests

 just we have to describe and configure the mode of execution of  that spec file tests like in file itself ---> 

                 test.describe.configure ( {mode : 'parallel'} );



 ************** InterDependancy of Execution of tests in spec file ***************

 we can set the interDependancy of Execution of tests. so that execution  test cases depends on another test cases like -->

                test.describe.configure( {mode : 'serial'} )

 for eg if file contains 5 test case and if 2nd test case is failed then remaining are skipped.




 ************** Tagging of test cases and control execution from cmd line***************

 we make tagging of test cases simply just adding fo eg - "@Web" ,"@smoke" in the test title
 and use cmd to execute tests with specific tags

 npx playwright test --grep=smoke


 **********************Generate Allure report****************************************
 steps->
 1. install allure report plugin bu using cmd -           : npm install -D allure-playwright
 2. Run the tests to generate allure report folder        : npm playwright test --reporter=allure-playwright
 3. run the cmd to generete the allure repor              : allure generate ./allure-results --clean 
 4. run cmd to oper report                                : allure open ./allure-report



 *********** Create custom scripts to trigger the tests execution from package.json *****************

 we can create custom script in package.json in script option like as below so we no need to remember the cmd every time
 just run the cmd -> "npm run APITest"   so cmd under APITest script will run
 we can also configure these scrpts in jenkins to run the tests

  "scripts": {
    "Regression" : "npx playwright test",
    "WebTest"    : "npx playwright test --grep=WEBTEST",
    "APITest"    : "npx playwright test --grep=APITest",
    "WebkitTest" : "npx playwright test --config playwright.configCustom.ts"
  }



*/




test('Test Execution with customized project configurations ' , async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const uName = page.locator('input[id="username"]');
    const pass  = page.locator('input[name="password"]');
    const signin = page.locator('input[id="signInBtn"]');

    await uName.fill("");                // Clear Text
    await uName.fill("rahulshettyacademy");
    await pass.clear();
    await pass.fill("Learning@830$3mK2");
    await signin.click();

    let Title = await page.title();
    console.log(Title)
    await expect(page).toHaveTitle(Title);

    // Handle multiple matching webelemts


    const productTitles = page.locator('[class="card-title"] >a');  // Matching 4 elements


   await page.waitForLoadState('networkidle');
         // OR in case above not working
   await productTitles.last().waitFor();   //it waits until the last matching elemnt to load
   const AllProduct = await productTitles.allTextContents();
   console.log(AllProduct);

   //await expect(productTitles).toBeHidden();

})
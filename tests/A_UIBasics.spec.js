const {test , expect} = require('@playwright/test');

// or

 // import {test ,expect} from '@playwright/test';

// In the above import statement we importing the different Annotations ,packages like test,expect
//  from playwright node modules which launches the browser and provides the fresh page for 
// each test case and provides the different assertions/verifications from expect package

test('First program' , async ({page})=>{

/*
https://playwright.dev/docs/test-assertions  = Playwright documentaion

# JS Is a unsynchronous lang in which the code statements are not executed sequentially
# So that we have to use the “Await” keyword to tell the JS to wait for the current step to be executed before going to next step.
# When we using “await” keyword in a test function we saying that the code is asynchronous that’s 
why we have represent the test function with the “async”
#Await is only activated  with the “async” 

There are 4 inbuild fixtures in Playwright module lik ebrowser,page which are globaly available 
// page is fixture which provides the default browser context and a fresh page 

Configuration file- Playwright.config.js- Test Runner
Config.js is the heart for the entire project in which we define configurations
like - what test to run and which browser to trigger and what are the timeouts

 PW provides the timeout of 30 sec by default for each test

 We cannot execute the tests direcly
 first we have to trigger tests from the playwright config.js file. for that wehave to use diff cmds

1.  npx playwright test    -> npx is the path of the playwright module in the node modules
 
*/

await page.goto("https://www.google.com/");

console.log(await page.title());
//Assertions
await expect(page).toHaveTitle("Google");
});


test('Launch Application' , async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())
})

test('Abort/Block API call Execution ' , async({page})=>{

    /* Route method is used to intercept any request and response of api calls 
       route method can used to block the any API url which ends with '.css'
          await page.route( 'URL Info', route=> route.abort()); // abort method is action used to block api
    */
    //await page.route( '**/*.css', route=> route.abort());

    // It blocks the imges to load on the page
      await page.route('**/*.{jpg,png,jpeg}' , route=> route.abort());

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
    await page.pause();
})

test('Print APIs Executed and its ststus code  ' , async({page})=>{

     // On method is used as listner to playwright it will invoke and notify when event is occured 
     // which we define as 1st argument and second parameter we pass the what action we perform on that event
     // when event of request calls occur then action is to print the url and statuscodes
    await page.on('request' , request=> 
                                       console.log(request.url() )); 
    
    await page.on('response' , response=> 
                                          console.log(response.url(), response.status() )); 

    
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
})
import {test , expect} from '@playwright/test'


    /* 
     CMd to run test

     1. npx playwright test
     2. npx playwright test --ui

     1. npx playwright test --->Runs the end-to-end tests.

     2. npx playwright test --ui  --> Starts the interactive UI mode.

     3. npx playwright test --project=chromium  ->>  Runs the tests only on Desktop Chrome.

     4, npx playwright test <example>      -   npx playwright test  A_FirstProgram.spec.js --headed  -->Runs the tests in a specific file in headed mode.

     5. npx playwright test --debug  --> Runs the tests in debug mode. where we can debug tests and find locators for webelements 

     6. npx playwright codegen <Test application URL>  ---> Auto generate tests with Codegen. i.e Record and Playback test scripts
  
     7. npx playwright test --grep=smoke    ----> to run test with specific tag

     8. cmd to execute test on specific configuration->

  npx playwright test B_CreateProjectConfigurations.spec.js --config playwright.configCustom.ts 
  --project=SafariTest  
    
    
    locator.textContent() /     ---> To get the text of element / multiple element which are attached/present in DOM
    locator.inputValue()        ---> Get the user enterd input values from edit fields
     locator..allTextContents;  -->  o get the text of  multiple matching elements , This method returns the array of elemnts
     
     .isVisible()   --> verify the elment visible or not returns true/false
     locator.pressSequentially("abc",{delay: 150})  --->  type the chars sequentially in text box
     locator.count()   --> count the options/matching elements 

     expect.toContainText() ---> to verify the text of webelemnt
     expect.toHaveTitle()   ---> to compare the title of webpage

     expct().toBeVisible()
     expect().toBeHidden();
     */
test('login Test with Incorrect Credentials' , async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    let title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //Locators

    // FILL and Type methods are used to enter the value in the edit/text field

    // await page.locator('input[id="username"]').fill("rahulshettyacademy");
    // await page.locator('input[name="password"]').fill("@830$3mK2");
    // await page.locator('input[id="signInBtn"]').click();

    const uName = page.locator('input[id="username"]');
    const pass  = page.locator('input[name="password"]');
    const signin = page.locator('input[id="signInBtn"]');

    await uName.fill("rahulshettyacademy");
    await pass.fill("@830$3mK2");
    await signin.click();
    //Error msg
    // Error msg is taking some time to display. so playwright will automatically wait forthe element to
    //  be display based on the wait time we have define in config.js file

    let errormsg = await page.locator('[style="display: block;"]').textContent();
    console.log(errormsg);
    await expect(page.locator('[style="display: block;"]')).toContainText('Incorrect'); 
});

test('Login Test with correct credentials' , async({page})=>{

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

//    const firstTitle = await productTitles.first().textContent();  //  returns text of 1st element
//    console.log(firstTitle);
//    const secondTitle = await productTitles.nth(2).textContent();  // returns text of 2nd element
//    console.log(secondTitle);

//############ Wait machanism in case of Multiple elements are returned #################

// ######### print text of all products ##########
// Playwright does not wait until the loading of all the products/elements and API calls on the page 
// so it returns the empty list while performing certain actions on Webelemets 
//so we heve to use one method --> "waitForLoadState('networkidle'/'domcontentloaded')"  -> This method 
// wait until the all the Api calls in the network tab is run and network tab is come to idle state so that we can see all the products on page and it so can be handled by playwright correctly
   
   await page.waitForLoadState('networkidle');
         // OR in case above not working
   await productTitles.last().waitFor();   //it waits until the last matching elemnt to load
   const AllProduct = await productTitles.allTextContents();
   console.log(AllProduct);

})

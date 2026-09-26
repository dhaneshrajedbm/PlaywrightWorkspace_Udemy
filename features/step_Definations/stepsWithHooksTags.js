const { Given, When, Then } = require('@cucumber/cucumber')
const { test, expect } = require('@playwright/test');

//setDefaultTimeout(20 * 1000); 


//Import Page Objects 
const { A_loginPage } = require('../../tests/PageObjects/A_LoginPage');
const { B_DashboardPage } = require('../../tests/PageObjects/B_DashboardPage');
const { C_CartPage } = require('../../tests/PageObjects/C_CartPage').default
const { D_ShippingInfo } = require('../../tests/PageObjects/D_ShippingInfo').default;

/* we are gettin the error while running the feature file with hooks because cucumber is ignoring the 
// hooks file or he dont know the where the hooks file is
// so fix this we have created on custom script in package.json file by explicitly adding/defining 
// the path of feature ,path of step definations and path of Hooks
*/  //as -
//   "scripts": {
//   //  "CucumberTestWithHooks": "cucumber-js features/**/*.feature --require features/step_Definations/stepsWithHooks.js --require features/support/*.js"
//      },

// to run it use cmd - npm run CucumberTestWithHooks

// or we can run directly specific feature with specific steps and hooks wih cmd

//npx cucumber-js --require features/step_Definations/stepsWithHooks.js --require features/support/hooks.js
  
// Run Feature file with specific tag--> 

// npx cucumber-js --tags "@Regression" --require features\step_Definations\stepsWithHooks.js --require features\support\hooks.js


Given('User is login to Application with Uname {string} and Pword {string}', { timeout: 10000 }, async function (username, password) {

   
    // Browser related code we defined in the before hook in hooks.js file


    this.LoginPage = new A_loginPage(this.page);  // creating obj of Pom class

    await this.LoginPage.LaunchAppn();
    await this.LoginPage.ValidLoginToApp(username, password);


});

When('user add the product {string} to the cart', async function (productName) {

    this.DashboardPage = new B_DashboardPage(this.page);

    await this.DashboardPage.searchProductAndAddToCart(productName);
    await this.DashboardPage.navigateToCart();
});

Then('verify the product {string} displayed in cart', async function (productName) {
    this.CartPage = new C_CartPage(this.page);

    await this.CartPage.verifyProductAddedInCart(productName);
    await this.CartPage.clickBtnCheckout();
});

When('user verify email as {string} and provide valid shipping info and place the Order', async function (username) {

    this.ShippingInfo = new D_ShippingInfo(this.page);

    await this.ShippingInfo.provideShippingInfo();
    await this.ShippingInfo.verifyShippingInfo(username);
    await this.ShippingInfo.clickBtnPlaceOrder();
});

Then('verify the orderid present in the order history table', async function () {

    const sucessMsg = this.page.locator('[class="hero-primary"]');
    await expect(sucessMsg).toBeVisible();
    await expect(sucessMsg).toHaveText(' Thankyou for the order. ');


    const orderId = this.page.locator('[class="em-spacer-1"] [class="ng-star-inserted"]');
    const orderIdValue = await orderId.textContent();
    console.log("Product OrderId value is= " + orderIdValue);

    //click on Orders button and verify our product orderId in Your orders table dynamically and click to view btn to view order details

    const btn_Orders = this.page.locator('button[routerlink="/dashboard/myorders"]');
    await btn_Orders.click();

    // Search our order id dynamically in the table 

    const tbl_rows = this.page.locator('tbody tr');
    await tbl_rows.last().waitFor();          // wait for to all tablerows to be load
    const tbl_body = this.page.locator('table tbody');
    await tbl_body.waitFor();                 // wait for all table body content to be load

    for (let i = 0; i < await tbl_rows.count(); i++) {  // iterate through table

        const tbl_orderId = await tbl_rows.nth(i).locator('th').textContent();

        if (orderIdValue.includes(tbl_orderId)) {

            await tbl_rows.nth(i).locator('button').first().click();   // click on view button     
        }
    }
    // naviate to orderdetails/summary page and verify orderId and shipping email, product name

    const summary_orderId = this.page.locator('[class="col-text -main"]');
    const summary_billingEmail = this.page.locator('[class="row"]:nth-child(3) p:nth-child(2)').first();
    const summary_productName = this.page.locator('[class="title"]')

    const summary_orderIdValue = await summary_orderId.textContent();
    const summary_billingEmailValue = await summary_billingEmail.textContent();
    const summary_productNameValue = await summary_productName.textContent();
    console.log(summary_productNameValue);
    //console.log(data.productName);

    await expect(orderIdValue.includes(summary_orderIdValue)).toBeTruthy();
    //await expect(summary_billingEmailValue.includes(data.username)).toBeTruthy();
    //await expect(summary_productNameValue.includes(data.productName)).toBeTruthy();

});

// Error Validations steps

Given('User login to Application with invalid Uname {string} and Pword {string}', async function (username,password) {
  
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    let title = await this.page.title();
    console.log(title);
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

     const uName = this.page.locator('input[id="username"]');
    const pass  = this.page.locator('input[name="password"]');
    const signin = this.page.locator('input[id="signInBtn"]');

    await uName.fill(username);
    await pass.fill(password);
    await signin.click();
   
});

When('verify error message is displayed', {timeout:30000}, async function () {
  
    //Error msg
    // Error msg is taking some time to display. so playwright will automatically wait forthe element to
    //  be display based on the wait time we have define in config.js file

    console.log("Error MSg is displayed");
    let errormsg = await this.page.locator('[style="display: block;"]').textContent();
    console.log(errormsg);
    await expect(this.page.locator('[style="display: block;"]')).toContainText('Incorrect'); 
});
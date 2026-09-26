import {test , expect} from '@playwright/test'

const {A_loginPage} = require ('../PageObjects/A_LoginPage');  // import the po classes
const {B_DashboardPage} = require ('../PageObjects/B_DashboardPage');
const {C_CartPage} =  require ('../PageObjects/C_CartPage')
const {D_ShippingInfo} = require('../PageObjects/D_ShippingInfo');

const dataset = JSON.parse(JSON.stringify(require("../A_Utils/ParametizationTestData.json")));

/*    **********  Prameterization - Run Test with diff set of testdata ***************

we have created set of testdata in A_Utils->ParametizationTestData.json file in form of json array
to run test with set of data we have to wrap whole test under the for of loop
*/

for(const data of dataset){

test(`Place order feature for ${data.productName}` ,async ({page})=>{

    const LoginPage = new A_loginPage(page);  // creating obj of Pom class

    await LoginPage.LaunchAppn();
    await LoginPage.ValidLoginToApp(data.username, data.password);


    const DashboardPage = new B_DashboardPage(page);

    await DashboardPage.searchProductAndAddToCart(data.productName);
    await DashboardPage.navigateToCart();

    const CartPage = new C_CartPage(page);

    await CartPage.verifyProductAddedInCart(data.productName);
    await CartPage.clickBtnCheckout();
  
    const ShippingInfo = new D_ShippingInfo(page);
    await ShippingInfo.provideShippingInfo();
    await ShippingInfo.verifyShippingInfo(data.username);
    await ShippingInfo.clickBtnPlaceOrder();

    

    const sucessMsg = page.locator('[class="hero-primary"]');
    await expect(sucessMsg).toBeVisible();
    await expect(sucessMsg).toHaveText(' Thankyou for the order. ');
   

    const orderId = page.locator('[class="em-spacer-1"] [class="ng-star-inserted"]');
    const orderIdValue = await orderId.textContent();
    console.log("Product OrderId value is= "+orderIdValue);

    //click on Orders button and verify our product orderId in Your orders table dynamically and click to view btn to view order details

    const btn_Orders = page.locator('button[routerlink="/dashboard/myorders"]');
    await btn_Orders.click();

    // Search our order id dynamically in the table 

    const tbl_rows = page.locator('tbody tr');
    await tbl_rows.last().waitFor();          // wait for to all tablerows to be load
    const tbl_body = page.locator('table tbody');
    await tbl_body.waitFor();                 // wait for all table body content to be load

    for(let i=0;i<await tbl_rows.count(); i++){  // iterate through table

        const tbl_orderId = await tbl_rows.nth(i).locator('th').textContent();
        
        if(orderIdValue.includes(tbl_orderId)){

            await tbl_rows.nth(i).locator('button').first().click();   // click on view button     
        }
    }
     // naviate to orderdetails/summary page and verify orderId and shipping email, product name

     const summary_orderId      = page.locator('[class="col-text -main"]');
     const summary_billingEmail = page.locator('[class="row"]:nth-child(3) p:nth-child(2)').first();
     const summary_productName  = page.locator('[class="title"]')

     const summary_orderIdValue      = await summary_orderId.textContent();
     const summary_billingEmailValue = await summary_billingEmail.textContent();
     const summary_productNameValue  = await summary_productName.textContent();
     console.log(summary_productNameValue);
     console.log(data.productName);

     await expect(orderIdValue.includes(summary_orderIdValue)).toBeTruthy();
     await expect(summary_billingEmailValue.includes(data.username)).toBeTruthy();
     await expect(summary_productNameValue.includes(data.productName)).toBeTruthy();

     await page.pause();
})

}
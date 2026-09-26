import {test , expect} from '@playwright/test'

//const {A_loginPage} = require ('../PageObjects/A_LoginPage');  // for JS - import the po classes

import {A_loginPage} from '../PageObjects/A_LoginPage';  // For TS 
import {B_DashboardPage} from '../PageObjects/B_DashboardPage';
import {C_CartPage}  from '../PageObjects/C_CartPage';
import {D_ShippingInfo} from '../PageObjects/D_ShippingInfo';

const dataset = JSON.parse(JSON.stringify(require("../A_Utils/PlaceOrderTestData.json")));


/*    ********** Fetch data from external Json File ***************

     instead of hardcore the test data we can store and fetch it from external Json File 
     we create it in utils folder
Json Object -> string -> javascript object
we have stored the testdata in file at A_Utils -> PlaceOrderTestData.json
for ease of use in case if it contains special chars -we fist convert the json data to string using "JSON.stringify" method and 
then it further convert to javascript object using JSON.parse() method
*/

test('Place order feature' ,async ({page:any})=>{

    //Place order for product "Zara Coat"

   
     //const productName = 'ZARA COAT 3';
    // const username = 'at@gmail.comtdm';
    // const password = 'Attdm@1234'

    

    const LoginPage = new A_loginPage(page);  // creating obj of Pom class

    await LoginPage.LaunchAppn();
    await LoginPage.ValidLoginToApp(dataset.username, dataset.password);


    const DashboardPage = new B_DashboardPage(page);

    await DashboardPage.searchProductAndAddToCart(dataset.productName);
    await DashboardPage.navigateToCart();

    const CartPage = new C_CartPage(page);

    CartPage.verifyProductAddedInCart(dataset.productName);
    CartPage.clickBtnCheckout();
  
    const ShippingInfo = new D_ShippingInfo(page);
    await ShippingInfo.provideShippingInfo();
    await ShippingInfo.verifyShippingInfo(dataset.username);
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
     console.log(dataset.productName);

     await expect(orderIdValue.includes(summary_orderIdValue)).toBeTruthy();
     await expect(summary_billingEmailValue.includes('at@gmail.comtdm')).toBeTruthy();
     await expect(summary_productNameValue.includes(dataset.productName)).toBeTruthy();

     await page.pause();
})
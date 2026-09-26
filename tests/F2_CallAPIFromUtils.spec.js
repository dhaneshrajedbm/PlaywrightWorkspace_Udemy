import {test , expect, request} from '@playwright/test'

const {APIUtils} = require('./A_Utils/APIUtils');   // importing the utils class from api utils
/* 
************ Itegrate Api Automation with Web Automation ***********************

Fort this scenario, we maintain out API calls in utils class and calling them in beforeAll hook to run them as a prerequisites for test
*/

// Request Payloads-----> we maintain respective sceanrio payloads in respective test class

const loginPayload      = {userEmail:"at@gmail.comtdm",   // in JS key should be paseed without double coat
                           userPassword:"Attdm@1234"};

const placeOrderPayload = {"orders":[
                                       {country:"Mali",
                                        productOrderedId:"6960eae1c941646b7a8b3ed3"}
                                    ]}                      
// let tokenValue;   
// let orderIdValue; 
let dummyRespObj;       // declared the dummy obj to store the token and orderid values              



test.beforeAll( async ()=>{    //we are using await in block so define it with the async 

   const requestContext = await request.newContext();
   const  utilsApi = new APIUtils(requestContext , loginPayload);   // object of classs from utils and  trigger the login API
   dummyRespObj = await utilsApi.placeOrder(placeOrderPayload)       //run  placeorder api  and itreturns order id and we store it in dummy obj

});



test('feature : call login and place order Api from utils to Verify orderId in Order History page Table' ,async ({page})=>{

    /*
    In this test our job is only verifying palced order id in order history table in ordrr history page,
    Steps --->
    1. we are login to app  through the automated login Api extract token and inject in ApplicationTab->storage->localstorage
    2. Then we directly place the order through the place ordr API in before All 
    3. so we directly navigate to order history page
    4. verifying palced order id in order history table in ordrr history page 
    */

     await page.addInitScript( Tvalue=>  // Here we are execute the javsript by using .addIniteScript() function
        {                                // to inject/set token value in localStorage in aplication tab in browserwindow
        window.localStorage.setItem( 'token' , Tvalue)  
        } , 
        dummyRespObj.tokenValue ,   // value of token to set extracted from api call which is stored in dummy obj
    );

    await page.goto('https://rahulshettyacademy.com/client/');

     const productName = 'ADIDAS ORIGINAL';
    
     // WE place order through the place ordr API in before All 

    //click on Orders button and verify our product orderId in Your orders table dynamically and click to view btn to view order details

    const btn_Orders = page.locator('button[routerlink="/dashboard/myorders"]');
    await btn_Orders.click();

    // Search our order id dynamically in the table 

    const tbl_rows = page.locator('tbody tr');
    await tbl_rows.last().waitFor();          // wait for to all tablerows to be load
    const tbl_body = page.locator('table tbody');
    await tbl_body.waitFor();                 // wait for all table body content to be load

    for(let i=0;i<await tbl_rows.count(); i++){  // iterate through table

        const tbl_orderId = await tbl_rows.nth(i).locator('th').textContent();  // OrderId value extracted from order history table
        
        if(dummyRespObj.orderIdValue.includes(tbl_orderId)){      // orderIdValue extracted from Placeorder Api

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
     console.log(productName);

     await expect(dummyRespObj.orderIdValue.includes(summary_orderIdValue)).toBeTruthy();
     await expect(summary_billingEmailValue.includes('at@gmail.comtdm')).toBeTruthy();
     await expect(summary_productNameValue.includes(productName)).toBeTruthy();

     await page.pause();
})
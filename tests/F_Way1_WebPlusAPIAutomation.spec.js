import {test , expect , request} from '@playwright/test'

/*  ******** Way to reduce Test execution Time**********


************ Way 1  = Itegrate Api Automation with Web Automation ***********************

For Api automation we have import the liabrary as 'request' from plywright packages

to reduce the test execution time , instead of running the login api every time we can automate it and save/extract 
 the cookies and tokens. and use them for login.
like manually when we login we no need to enetr uname,pass everytime,because  login api returns the token
 which is saved in Application tab --> Storage --> local storage
*/

const loginPayload      = {userEmail:"at@gmail.comtdm",   // in JS key should be paseed without double coat
                           userPassword:"Attdm@1234"};

const placeOrderPayload = {"orders":[
                                       {country:"Mali",
                                        productOrderedId:"6960eae1c941646b7a8b3ed3"}
                                    ]}                      
let tokenValue;   
let orderIdValue;                   

// BeforeAll block is executed before execution of all test cases

test.beforeAll( async ()=>{    //we are using await in block so define it with the async 

   const requestContext = await request.newContext()   // create the fresgnew  request context to run the api 
 
   // Login To App API

   const loginResponseObject = await requestContext.post( "https://rahulshettyacademy.com/api/ecom/auth/login" ,
                                                         {
                                                           data : loginPayload 
                                                         }
                                                     );
                         await expect(loginResponseObject.ok()).toBeTruthy();  // ok method returns successful resp status codes like 200/201/203/204
                         const responseJson       = await loginResponseObject.json();      // store login response json in one object
                         tokenValue               = responseJson.token;              // extract the token value from response jason
                         console.log(tokenValue);


   // Place Oreder Api
   
   const placeOrderResponse = await requestContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                                                      {
                                                        data : placeOrderPayload,
                                                        headers:{
                                                                  'authorization' : tokenValue ,
                                                                  'content-type'  : 'application/json'
                                                                }
                                                     });
                           await expect(placeOrderResponse.ok()).toBeTruthy();
                           const placeOrderJson = await placeOrderResponse.json(); 
                                 orderIdValue   = await placeOrderJson.orders[0];  
                           const successmsg     = await  placeOrderJson.message;  

                           console.log("Extracted Order Id = "+orderIdValue);
                           console.log(successmsg);
                           console.log(placeOrderJson);
});



test('@APITEST feature : Place Product order' ,async ({page})=>{

    //Place order for product "Zara Coat"

    /* we are using the above tokenvalue extracted from api and inject into the broserWindow-->Application Tab --> storage --> Local storage
    so that we can bypass the below login steps and directly redirect to home page
    in such way we can reduce flakyness of test case execution by integrating Api automation whenever required
    because ui/web have more flacky execution
    */


     await page.addInitScript( Tvalue=>  // Here we are execute the javsript by using .addIniteScript() function
        {                                // to inject/set token value in localStorage in aplication tab in browserwindow
        window.localStorage.setItem( 'token' , Tvalue)  
        } , 
        tokenValue ,   // value of token to set extracted from api call
    );

    // await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    // let text_eamil = page.locator('input[id="userEmail"]');
    // let text_passwod = page.locator('input[id="userPassword"]')
    // let btn_login = page.locator('input[id="login"]');
    // await text_eamil.fill('at@gmail.comtdm')
    // await text_passwod.fill('Attdm@1234')
    // await btn_login.click();

    await page.goto('https://rahulshettyacademy.com/client/');

    let products = page.locator('[class="card-body"]');  // matching all products
    let productTitles = page.locator('[class="card-body"]>h5>b');

    await productTitles.last().waitFor();  // wait for all the products to display/visible
    let Titles = await productTitles.allTextContents();
    console.log(Titles);

    const productName = 'ZARA COAT 3';

    //write logic to search the ZARA COAT 3 and click add to cart

    for(let i=0; i< await products.count(); i++){

        if(await products.nth(i).locator('b').textContent() === productName ){  // locatot for product text

            await products.nth(i).locator('text=" Add To Cart"').click();
            break;
        }  
    }

    //check product added in cart
    
    let btn_Cart = page.locator('button[routerlink="/dashboard/cart"]');
    await btn_Cart.click();
    // Wait for cart products to be loaded
    let cartproducts = page.locator('[class="cart"]>ul>li')
    await cartproducts.last().waitFor();
    // verify our added product is present in cart or not
    let addedProduct = page.locator('h3:has-text("ZARA COAT 3")');
    let bool = await addedProduct.isVisible();
    await expect(bool).toBeTruthy();

    // Cick checkout and provide shipping information

    const btn_Checkout = page.locator('text="Checkout"');
    await btn_Checkout.click();

    // **************** handle Auto suggetion dropdown to select country ****************************

    const dropdown = page.locator('input[placeholder="Select Country"]');
    await dropdown.pressSequentially("ind" , {delay: 150}); // dropdown values are visible only when we inter chars sequentially
    
    const ddOptions = page.locator('section[class="ta-results list-group ng-star-inserted"]');
    await ddOptions.waitFor();
    const optionsCount     = await ddOptions.locator('button').count();  // no of options

    for(let i=0; i<optionsCount; i++){

        const optionToSelect = await ddOptions.locator('button').nth(i).textContent();
        if(optionToSelect === " India"){

            await ddOptions.locator('button').nth(i).click()
            break;
        }
    }
    // Verify the email used for shipping  then click place order button and verify and print the ordrrid and success msg

    const shippingEmail = page.locator('[class="user__name mt-5"]>label');
    await expect(shippingEmail).toHaveText('at@gmail.comtdm');

    const btn_placeOrder = page.locator('a[class="btnn action__submit ng-star-inserted"]');
    await btn_placeOrder.click();

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
     console.log(productName);

     await expect(orderIdValue.includes(summary_orderIdValue)).toBeTruthy();
     await expect(summary_billingEmailValue.includes('at@gmail.comtdm')).toBeTruthy();
     await expect(summary_productNameValue.includes(productName)).toBeTruthy();

     //await page.pause();
})




test('@APITEST feature : Verify orderId in Order History page Table' ,async ({page})=>{

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
        tokenValue ,   // value of token to set extracted from api call
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
        
        if(orderIdValue.includes(tbl_orderId)){      // orderIdValue extracted from Placeorder Api

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

     await expect(orderIdValue.includes(summary_orderIdValue)).toBeTruthy();
     await expect(summary_billingEmailValue.includes('at@gmail.comtdm')).toBeTruthy();
     await expect(summary_productNameValue.includes(productName)).toBeTruthy();

     await page.pause();
})
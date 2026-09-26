import {test , expect } from '@playwright/test'


      /* 
      we Have 2 ways to reduce the execution time

      1.Run the required API(for e.g Login) before actual test to capture token and inject it in local storage 
      in browser application tab  by integrating API automation with Web Automation that we have seen in way1.spec.js
     
      2. another way is like -->
        step1-  we login once in 1 browser context and capture all the browser cookies ,tokens , storages
               from that brower instance/context and store in 1 state.json file.
        step2 - then create another browser instance  by injecting all previous browser cookies ,tokens , 
                storages which are stored in state.json file. 
                so when we run test cases with this new browser instance it will bypass the login step since it has
                all cookies,storages,tokens
      
    */          

let newBrContext;  //it is declared golabally to acceess for another test cases

test.beforeAll( async ({browser})=>{  
    
    /*
    1. in this case we login once with 1browser context and capture all cookies,tokens,storages and create and store in state.json file
    2. then create/open another browser context with that stored cookies.tokens,storages which are stored in state.json
    */
    const browserContext = await browser.newContext();
    const page          =  await browserContext.newPage();
    
    await page.goto('https://rahulshettyacademy.com/client');
    let text_eamil = page.locator('input[id="userEmail"]');
    let text_passwod = page.locator('input[id="userPassword"]')
    let btn_login = page.locator('input[id="login"]');
    await text_eamil.fill('at@gmail.comtdm')
    await text_passwod.fill('Attdm@1234')
    await btn_login.click();
    await page.waitForLoadState('networkidle');

    /* here we use .storageState({path:'state.json'}) which Returns/creates state.json file which contains 
     all storage state for this browser context, contains current cookies, local storage snapshot,  IndexedDB snapshot and virtual WebAuthn credentials.
    
    */
    await browserContext.storageState( {path: 'state.json'}) ;
 
//2. then create/open another new browser context with that stored cookies.tokens,storages which are stored in state.json

 
       newBrContext = await browser.newContext({storageState:'state.json'});
   //  newBrContextWithstorageState = await browser.newContext({storageState:'state.json'});
   
})



test('feature : Place Product order' ,async () =>{

    //Place order for product "Zara Coat"
    const productName = 'ZARA COAT 3';

    //Then in actual test case we create  browser page in newBrContextWithstorageState
    const page = await newBrContext.newPage();   

    await page.goto('https://rahulshettyacademy.com/client/'); // on hiiting this url login step is bypass and navigate to home

    let products = page.locator('[class="card-body"]');  // matching all products
    let productTitles = page.locator('[class="card-body"]>h5>b');

    await productTitles.last().waitFor();  // wait for all the products to display/visible
    let Titles = await productTitles.allTextContents();
    console.log(Titles);

    

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




test('feature : Print Product Title' ,async ()=>{

    
    //Then in actual test case we create  browser page in newBrContextWithstorageState
    const page = await newBrContext.newPage();   

    await page.goto('https://rahulshettyacademy.com/client/');

    let products = page.locator('[class="card-body"]');  // matching all products
    let productTitles = page.locator('[class="card-body"]>h5>b');

    await productTitles.last().waitFor();  // wait for all the products to display/visible
    let Titles = await productTitles.allTextContents();
    console.log(Titles);
    
})
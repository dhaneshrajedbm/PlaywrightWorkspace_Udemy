import {test , expect} from '@playwright/test'

test('Place order feature' ,async ({page})=>{

    /*
    advance feature of playwright to locate the elements based on text
    1. page.locator('text= "Text value"')
    2. page.locator("tagname:has-text('text value')") // locate the elment with specific tagname based on text  
    */
    //Place order for product "Zara Coat"

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    let text_eamil = page.locator('input[id="userEmail"]');
    let text_passwod = page.locator('input[id="userPassword"]')
    let btn_login = page.locator('input[id="login"]');

    await text_eamil.fill('at@gmail.comtdm')
    await text_passwod.fill('Attdm@1234')
    await btn_login.click();

    await page.waitForLoadState('networkidle');

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

     await page.pause();
})
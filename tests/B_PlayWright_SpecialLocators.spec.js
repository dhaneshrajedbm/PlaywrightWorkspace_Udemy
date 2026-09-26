import {test , expect} from '@playwright/test'

test('Special Locators' , async({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/') 

    // 1.  page.getByLebal("lebalname")
    
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Female');

        // 2. page.getByPlaceholder('Placeholdervalue')
    await page.getByPlaceholder('Password').fill("Dm@1234");

    //3. page.getByRole("role" ,{name: 'element name'})
    await page.getByRole("button" , {name: 'Submit'}).click();

 /*
    advance feature of playwright to locate the elements based on text
    1. page.locator('text= "Text value"') // textvalue is the text of webelement 
    2. page.locator("tagname:has-text('text value')") // locate the elment with specific tagname based on text  
    */
       await page.locator("button:has-text('Submit')");

    //4. page.getByText('textValue');
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    // ############ Override the default value of Assertions timeout on step level ###############

    // default timeout for assert assertions is 5 sec. in case if any element is loaded in 8 sec 
    // then we have to override the default value 8 sec -->.toBeVisible({timeout: 10_000});
    

    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout: 10_000});
    

    await page.getByRole('link' , {name: 'Shop'}).click();

    //5.locator.filter("")
    // filter the product from matching elements based on elementtext and click add btn to add to cart
    await page.locator('[class="col-lg-3 col-md-6 mb-3"]').filter({hasText: 'Nokia Edge'}).getByRole("button", {name: "Add"}).click();
    await page.pause();
})

test('Playwright Test level  timeout' , async({page})=>{

    /* We can set timeout at 1. global level(in config .js file) , 2. Test level , 3. step level
     ############## Override the default value of timeout for tests at test level ###########
     default value of timeout for tests  is 30 sec we can overrid eit as followe
     --> test.setTimeout(60000);

        // ############ Override the default value of Assertions timeout on test level ###############
    If there are multiple assertions are in test and which requires more timeout than its default value due to page loading slowly
    Then we can set/override its  value at test level as follows
    -->At Test level---> const  slowExpect = await expect.configure({timeout: 10000});
    --->At stp level----> assert().toBeVisible({timeout: 10000})

    // ########## Timeout for Actions and navigationns #########
    ther is no default timeout for actions and navigation actions. so it follows the default test timeout=30 sec
    we can override it as
    -->at step level---> .click({timeout: 7000})
    --->At step level---> page.setDefaultTimeout(8000)
    */
    test.setTimeout(60000);
    const  slowExpect = await expect.configure({timeout: 10000});
    page.setDefaultTimeout(8000);

    await page.goto('https://rahulshettyacademy.com/angularpractice/') 

     await page.getByRole("button" , {name: 'Submit'}).click({timeout:9000});

    const successMsg=  page.locator('[class="alert alert-success alert-dismissible"] strong')
    await slowExpect(successMsg).toHaveText('Success!');
    //await expect(successMsg).toBeVisible({timeout: 12000});  // step level

    const link_shop = page.getByRole("link", {name: 'Shop'});
    await slowExpect(link_shop).toBeVisible();
    await link_shop.click();

    const text = page.locator('[class="my-4"]');
    await slowExpect(text).toBeVisible();
    await slowExpect(text).toHaveText('Shop Name');
})
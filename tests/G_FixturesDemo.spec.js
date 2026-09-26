//import { expect} from '@playwright/test'

const { expect} = require('@playwright/test');

const {customTest}= require("../tests/A_Utils/Fixtures.js");


/* 
    page,browser are the inbuilt playwright fixtures
    so instead of that we can create the customised fixture and use it like for e.g - authenticatedPage
    we created the "authenticatedPage" customized fixture which take care of login stps

    To built the customized fixture 1st we need to extend the "test" capabilities. because test componants 
    cannot accept custom fixtures but only accept default playwright fixtures like page,browser
    thats why we have to extend the default behaviour of test so that it can accept the customised fixture 
    */
     
customTest("Fixture demo" , async ({authenticatedPage ,  createOrder , TestDataForTest})=>{

    //Login to Appn -> Create order -> verify oredr Id in history page
   // when we run this test ,Before running the code inside this block 1st playwright will check 
   // the fixture'authenticatedPage' and execute it first to login so we can actually bypass the login steps

       console.log("Test dat from fixture file"+TestDataForTest.productName);

   await authenticatedPage.goto("https://rahulshettyacademy.com/client")
    
    const btn_Orders = authenticatedPage.locator('button[routerlink="/dashboard/myorders"]');
    await btn_Orders.click();
    const tbl_body = authenticatedPage.locator('table tbody');
    await tbl_body.waitFor(); 

    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

    })
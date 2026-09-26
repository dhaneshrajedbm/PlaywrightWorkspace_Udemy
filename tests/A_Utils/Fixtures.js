const base = require ('playwright/test');  // insted of base we use any keyword
import {request} from '@playwright/test';
const {APIUtils} = require ('./APIUtils.js');
/*
fIXTURES ARE NOTHING BUT THE REUSABLE unit of CUSTOMISED FUNCTION or block of code WHICH WE CAN REUSE
 AND RUN/set BEFORE and after  THE ACTUAL TEST to setup and teardown AS PRE or post REQUeSiTES.
playwright injects it in test by matching names. it run before the test and runs after the code as teardown
 post 'use' function

 To built the customized fixture 1st we need to extend the  default "test" capabilities. 
 because test componants cannot accept custom fixtures but only accept default playwright fixtures
  like page,browser
    thats why we have to extend the behaviour of test so that it can accept the customised fixture 
    */
// Extending origional behaviour of test  with fixtures by creating customized test function
//extending original behaviour of test and store in variable customTest. so insted of test wecan write custotest in actaul test case
// whenever we call authenticatedPage fixture all the code inside it is executed

const loginPayload      = {userEmail:"at@gmail.comtdm",   // in JS key should be paseed without double coat
                           userPassword:"Attdm@1234"};

const placeOrderPayload = {"orders":[
                                       {country:"Mali",
                                        productOrderedId:"6960eae1c941646b7a8b3ed3"}
                                    ]}  



    exports.customTest = base.test.extend(   // export to use in test
    {
        authenticatedPage : async({browser} ,use)=> {

            const browserContext = await browser.newContext();
            const page = await browserContext.newPage();

            await page.goto('https://rahulshettyacademy.com/client');
            let text_eamil = page.locator('input[id="userEmail"]');
            let text_passwod = page.locator('input[id="userPassword"]')
            let btn_login = page.locator('input[id="login"]');
            await text_eamil.fill('at@gmail.comtdm')
            await text_passwod.fill('Attdm@1234')
            await btn_login.click();
            await page.waitForLoadState('networkidle');

            await use(page); // this assign /set back the value of page to authenticatedPage so we can use it instead of page in actual test  
             
            await browserContext.close();
        },

        createOrder : async({},use)=>{

            const requestContext = await request.newContext();
            const utilsApi = new APIUtils(requestContext, loginPayload);   // object of classs from utils and  trigger the login API
            const dummyRespObj = await utilsApi.placeOrder(placeOrderPayload)       //run  placeorder api  and itreturns order id and we store it in dummy obj
            await use(dummyRespObj);

            // Whatever the code written after use function is act as teardown code
            await requestContext.dispose(); 
        },

        // We can also setup the test data as fixture and use it in actual test to achieve Data Driven Testing

        TestDataForTest : {

            productName : 'ADIDAS ORIGIONAL'
        }
    }

    )    


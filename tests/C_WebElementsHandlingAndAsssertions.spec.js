import {test , expect} from '@playwright/test';

//test.describe.configure( {mode: 'parallel'});   // for parallel tests execution

test.describe.configure( {mode: 'serial'});   // for interDependancy of tests execution

test(" @WEBTEST Static Dropdown Handling" , async({page})=>{

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        //dropdown.selectOption('value') ---> selct the option from dd
        let dropdown =  page.locator('select[class="form-control"]');
        await dropdown.selectOption('consult');

        //select radio button
        let btn = page.locator('input[value="user"]');
        await btn.click();
        let okBtn = page.locator('button[id="okayBtn"]')
        await okBtn.click();

        //expect(locator).toBeChecked() --> verify the btn is checked or not
        //locator.isChecked() 
        // expect().toBeFalsy() / .toBeTruthy() ---> verify the condition is true/false      --> returns true/false based on btn is checked/unchecked
        //expect(locator).toHaveAttribute("Aname","AValue");  --> to verify the element contains Aname and Avalue

        await expect(btn).toBeChecked();
        let b= await btn.isChecked();
        console.log(b);

        const checkbox = page.locator('input[id="terms"]');
        await checkbox.click();
        await expect(checkbox).toBeChecked();

        // Uncheck and verify
        await checkbox.uncheck();
         expect(await checkbox.isChecked()).toBeFalsy();

         //verify the document link is blinking or not
         // for that verify the link is contains atribute as class='blinkingtext'

         let doclink = page.locator('[href="https://rahulshettyacademy.com/documents-request"]')
         await expect(doclink).toHaveAttribute("class","blinkingText");

        //await page.pause();  // pause the execution for some time

})

test(' @SMOKE Verify Hidden Elements', async({page})=>{

        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        const element  = page.locator('[placeholder="Hide/Show Example"]');
        const btn_Hide = page.locator('[id="hide-textbox"]');

        await expect(element).toBeVisible();
        await btn_Hide.click();
        await expect(element).toBeHidden();

})

test(' @WEBTEST Handle java Popups', async({page})=>{

        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        /*
        The On method is used to tell the playwright that specific event(eg-dialog) is going to happen. it is specified as 1st argument
        and second argument is the action that we have to perform on event
        */
        await page.pause();
        await page.on('dialog' , dialog=> dialog.accept());
        await page.locator('[id="confirmbtn"]').click();
       
})

test(' @WEBTEST Mouse Hover action', async({page})=>{

        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
        
        await page.locator('[id="mousehover"]').hover();
})

test(' @SMOKE Iframes', async({page})=>{

        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
        /*
        To handle Iframes first we have switch the focus to iframe
        we use  page.frameLocator('frmaeId/frameName') which returns the new page object
        */
       const framePage =  page.frameLocator('[id="courses-iframe"]')

       // for below locatorther is matching 2 elements and 1 is invisible. so we telling that only deal with visible elemnt
       // for that write':visible' after the locator
       const link_AllAccessPlan =  framePage.locator('li [href="lifetime-access"]:visible');
       await link_AllAccessPlan.click();

       const text = await framePage.locator('[class="text"] h2').textContent();
       console.log(text);   // Join 13,522 Happy Subscibers!
       // print only 13,522
       const no = text.split(" ")[1];
       console.log(no) ;
})


test('Capture Screenshot and Visual Testing', async({page})=>{

        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        const element  = page.locator('[placeholder="Hide/Show Example"]');
        const btn_Hide = page.locator('[id="hide-textbox"]');

        await expect(element).toBeVisible();
 
        // capture ss pf specific element

        await element.screenshot({path: 'SpecificelEleScreenshot.png'})
      
        await btn_Hide.click();
        await expect(element).toBeHidden();

          // Capture ss of entire page
        await page.screenshot( {path: 'screenshot.png'});    // we have to provide path to store the ss
})


test('Visual comparison Testing' , async({page})=>{

        await page.goto('https://www.google.com/')

        //when we landing on the google page evry time it captures ss and compare it with ExpectedLandingSS.png
        // it creates  the folder in test results folder to store and compsre actual and expected ss
         expect( await page.screenshot() ).toMatchSnapshot('ExpectedLandingSS.png');
})
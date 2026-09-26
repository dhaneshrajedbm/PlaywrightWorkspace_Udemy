import {test , expect} from '@playwright/test';

test('Child Windows Handling',async({browser})=>{

    const context = await browser.newContext(); // creates the new browser context
    const page    = await context.newPage();    // creates the fresh new page in browser context
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //on click of doc link the doc is open in new tab
    let doclink = page.locator('[href="https://rahulshettyacademy.com/documents-request"]')
    
    /*
    on click of doc link the doc is open in new tab. we cannot handle/peform action on it directly.
    so before click the doclink we have to tell the playwright that the new event is performed on click of that link 
    i.e the new tab is opened so we have to wait for that event. 
    for that we have to perform these 2 actions parallely or asynchronously.(i.e wait for event and click on link)
    
    Promise.all([]) is used to perform the multiple  actions parallely or asynchronously which to ensure actions completed before proceed further and it returns array of promises
    promise is the state returned after the certain action /step is pefrmormed i.e
     there are 3 states/promises =  pending , rejected, fulfilled
    */
    const [newPage] = await Promise.all(  

        [
           context.waitForEvent('page'), // this step is returns the newPage or new browser page in new tab if 2 tabs are open the  it returns [newPage1,newPage2]
           doclink.click(),              // this step does not returm anything
        ]
    )
    // verify the text on page opened in new tab

   const text=  newPage.locator('p[class="im-para red"]');
   const textcontent = await text.textContent();
   console.log(textcontent);

   // extrct mailid from text and pass in username field in login page

   const stringarray =  textcontent.split('@');
   const email =  stringarray[1].split(' ')[0];
   console.log(email);
   

   const uname = page.locator('[id="username"]');
   await uname.clear();
   await uname.fill(email);

    // Text content does not return the user inputvalues since they are not attached to DOM
    // thats why we have to use .inputValue() method
   
//     const enterdtext = await uname.textContent(); 
//    console.log(enterdtext);
    
    const enterdtext = await uname.inputValue(); 
    console.log("Enterd Username is = "+enterdtext);
})
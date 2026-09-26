/* In Hooks we can define the perequisites and post requisites code steps which can run before, after
// or before and after every step in feature file
// In After we can define code to close browser, clear test data, cookies, but it is done
//  automatically by playwright
1. Before   -> runs before every scenario
2. After    -> runs after every scenario
3. BeforAll .-> runs before all scenarios
4. AfterAll  -> runs after all scenarios
5. BeforeStep
6. AfterStep
*/

const playwright = require('@playwright/test');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');



Before(async function () {

    // throw new Error("💥 HOOK IS RUNNING! 💥");

    this.browser = await playwright.chromium.launch({

        headless: false
    });
    this.browserContext = await this.browser.newContext();
    this.page = await this.browserContext.newPage();
})

// BeforeStep and AfterStep are executed after evry step execution
// We can use AfterStep hook to check the result of step and capture the SS if the step is failed
// since the step execution result is goes to after step hook 

BeforeStep(async function () {
    console.log("****BeforeStep Is Executing***")
})

AfterStep(async function ({ result }) {

    console.log("****AfterStep Is Executing***")

    if (result.status === Status.FAILED) {

        await this.page.screenshot({ path: 'FailedStep.png' });
    }
})






After(async function () {
    console.log("After hook is executed")
})

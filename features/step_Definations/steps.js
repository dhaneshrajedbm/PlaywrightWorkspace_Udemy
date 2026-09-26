//import {test,expect,playwright} from '@playwright/tests';
//import { Given , When, Then } from "@cucumber/cucumber"; 

const { Given, When, Then } = require('@cucumber/cucumber')
const { test, expect } = require('@playwright/test');
const playwright = require('@playwright/test');

//Import Page Objects 
const { A_loginPage } = require('../../tests/PageObjects/A_LoginPage');
const { B_DashboardPage } = require('../../tests/PageObjects/B_DashboardPage');
const { C_CartPage } = require('../../tests/PageObjects/C_CartPage').default
const { D_ShippingInfo } = require('../../tests/PageObjects/D_ShippingInfo').default;

// here we are not using the test fixture. so to get new browser context and new page object
//here we are import the playwright from playwright node modules and from that weget ->browser context->new page

let browser;
let browserContext;
let page;

Given('User is login to Application with Uname {string} and Pword {string}', { timeout: 10000 }, async function (username, password) {

    browser = await playwright.chromium.launch({

        headless: false
    });
    browserContext = await browser.newContext();
    page = await browserContext.newPage();


    this.LoginPage = new A_loginPage(page);  // creating obj of Pom class

    await this.LoginPage.LaunchAppn();
    await this.LoginPage.ValidLoginToApp(username, password);


});

When('user add the product {string} to the cart', async function (productName) {

    this.DashboardPage = new B_DashboardPage(page);

    await this.DashboardPage.searchProductAndAddToCart(productName);
    await this.DashboardPage.navigateToCart();
});

Then('verify the product {string} displayed in cart', async function (productName) {
    this.CartPage = new C_CartPage(page);

    await this.CartPage.verifyProductAddedInCart(productName);
    await this.CartPage.clickBtnCheckout();
});

When('user verify email as {string} and provide valid shipping info and place the Order', async function (username) {

    this.ShippingInfo = new D_ShippingInfo(page);

    await this.ShippingInfo.provideShippingInfo();
    await this.ShippingInfo.verifyShippingInfo(username);
    await this.ShippingInfo.clickBtnPlaceOrder();
});

Then('verify the orderid present in the order history table', async function () {

    const sucessMsg = page.locator('[class="hero-primary"]');
    await expect(sucessMsg).toBeVisible();
    await expect(sucessMsg).toHaveText(' Thankyou for the order. ');


    const orderId = page.locator('[class="em-spacer-1"] [class="ng-star-inserted"]');
    const orderIdValue = await orderId.textContent();
    console.log("Product OrderId value is= " + orderIdValue);

    //click on Orders button and verify our product orderId in Your orders table dynamically and click to view btn to view order details

    const btn_Orders = page.locator('button[routerlink="/dashboard/myorders"]');
    await btn_Orders.click();

    // Search our order id dynamically in the table 

    const tbl_rows = page.locator('tbody tr');
    await tbl_rows.last().waitFor();          // wait for to all tablerows to be load
    const tbl_body = page.locator('table tbody');
    await tbl_body.waitFor();                 // wait for all table body content to be load

    for (let i = 0; i < await tbl_rows.count(); i++) {  // iterate through table

        const tbl_orderId = await tbl_rows.nth(i).locator('th').textContent();

        if (orderIdValue.includes(tbl_orderId)) {

            await tbl_rows.nth(i).locator('button').first().click();   // click on view button     
        }
    }
    // naviate to orderdetails/summary page and verify orderId and shipping email, product name

    const summary_orderId = page.locator('[class="col-text -main"]');
    const summary_billingEmail = page.locator('[class="row"]:nth-child(3) p:nth-child(2)').first();
    const summary_productName = page.locator('[class="title"]')

    const summary_orderIdValue = await summary_orderId.textContent();
    const summary_billingEmailValue = await summary_billingEmail.textContent();
    const summary_productNameValue = await summary_productName.textContent();
    console.log(summary_productNameValue);
    //console.log(data.productName);

    await expect(orderIdValue.includes(summary_orderIdValue)).toBeTruthy();
    //await expect(summary_billingEmailValue.includes(data.username)).toBeTruthy();
    //await expect(summary_productNameValue.includes(data.productName)).toBeTruthy();

});
//import {expect} from '@playwright/test'
import {Page,test,Locator,expect} from '@playwright/test';


export class C_CartPage {

    page :Page;
    cartproducts :Locator
    btn_Checkout : Locator;

    constructor(page : Page) {

        this.page = page;
        this.cartproducts = page.locator('[class="cart"]>ul>li')
        //this.addedProduct = page.locator('h3:has-text("ZARA COAT 3")');
        this.btn_Checkout = page.locator('text="Checkout"');
    }

    async verifyProductAddedInCart(productName : string) {

        // Wait for cart products to be loaded
        await this.cartproducts.last().waitFor();

        // verify our added product is present in cart or not
       // let bool = await this.addedProduct.isVisible();
       let bool = await this.page.locator('h3:has-text("'+productName+'")').isVisible();
        await expect(bool).toBeTruthy();
    }

    async clickBtnCheckout() {

        await this.btn_Checkout.click();
    }

}
//module.exports = { C_CartPage };
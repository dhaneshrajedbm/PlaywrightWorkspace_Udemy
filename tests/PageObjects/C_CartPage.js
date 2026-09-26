//import {expect} from '@playwright/test'
import { expect } from '@playwright/test';

class C_CartPage {


    constructor(page) {

        this.page = page;
        this.cartproducts = page.locator('[class="cart"]>ul>li')
        //this.addedProduct = page.locator('h3:has-text("ZARA COAT 3")');
        this.btn_Checkout = page.locator('text="Checkout"');
    }

    async verifyProductAddedInCart(productName) {

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
//module.exports = {C_CartPage};
//module.exports = {C_CartPage};
export default {C_CartPage}; 
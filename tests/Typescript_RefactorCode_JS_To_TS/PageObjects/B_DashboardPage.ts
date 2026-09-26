import {Page,test,Locator,expect} from '@playwright/test';

export class B_DashboardPage{

    page : Page;
    products : Locator
    productTitles : Locator
    btn_Cart : Locator;

    constructor(page : Page){

        this.page           = page;
        this.products       = page.locator('[class="card-body"]');  // matching all products
        this.productTitles  = page.locator('[class="card-body"]>h5>b');
        this.btn_Cart       = page.locator('button[routerlink="/dashboard/cart"]');
    }
    

    async searchProductAndAddToCart(productName:string) {

        await this.productTitles.last().waitFor();  // wait for all the products to display/visible
        let Titles = await this.productTitles.allTextContents();
        console.log(Titles);

        //write logic to search the ZARA COAT 3 and click add to cart

        for (let i = 0; i < await this.products.count(); i++) {

            if (await this.products.nth(i).locator('b').textContent() === productName) {  // locatot for product text

                await this.products.nth(i).locator('text=" Add To Cart"').click();
                break;
            }
        }
    }

    async navigateToCart(){

        await this.btn_Cart.click();
    }
}
//module.exports = {B_DashboardPage};
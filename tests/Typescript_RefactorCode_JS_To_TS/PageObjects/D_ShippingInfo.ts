//import {expect} from '@playwright/test'
import {test,expect,Page,Locator} from '@playwright/test'

export class D_ShippingInfo{

    page : Page;
    dropdown :Locator
    ddOptions :Locator
    shippingEmail : Locator
    btn_placeOrder :Locator

    constructor(page : Page){

        this.page = page;

        this.dropdown = page.locator('input[placeholder="Select Country"]');
        this.ddOptions = page.locator('section[class="ta-results list-group ng-star-inserted"]');
        this.shippingEmail = page.locator('[class="user__name mt-5"]>label');
        this.btn_placeOrder = page.locator('a[class="btnn action__submit ng-star-inserted"]');

    }

    async provideShippingInfo(){

            // **************** handle Auto suggetion dropdown to select country ****************************

            await this.dropdown.pressSequentially("ind" , {delay: 150}); // dropdown values are visible only when we inter chars sequentially
            
            await this.ddOptions.waitFor();
            const optionsCount     = await this.ddOptions.locator('button').count();  // no of options
        
            for(let i=0; i<optionsCount; i++){
        
                const optionToSelect = await this.ddOptions.locator('button').nth(i).textContent();
                if(optionToSelect === " India"){
        
                    await this.ddOptions.locator('button').nth(i).click();
                    break;
                }
            }
        
    }

    async verifyShippingInfo(username:string){

        // Verify the email used for shipping  then click place order button and verify and print the ordrrid and success ms 
         await expect(this.shippingEmail).toHaveText(username);
    }

    async clickBtnPlaceOrder(){

         await this.btn_placeOrder.click();
    }

}
//module.exports = {D_ShippingInfo};
import {Page,test,Locator,expect} from '@playwright/test';

export class A_loginPage{  // for TS we need to add export keyword with the class but in JS we add it at the end

   page : Page;
   text_eamil : Locator;   // Here we have define type of variables
   text_password : Locator;
   btn_login     : Locator;

 constructor(page:Page){

    this.page = page;
    this.text_eamil = page.locator('input[id="userEmail"]');
    this. text_password = page.locator('input[id="userPassword"]')
    this. btn_login = page.locator('input[id="login"]');

}

async LaunchAppn(){

    await this.page.goto('https://rahulshettyacademy.com/client/');
}

async ValidLoginToApp(username: string , password : string){

    await this.text_eamil.fill(username);
    await this.text_password.fill(password);
    await this.btn_login.click();
    await this.page.waitForLoadState('networkidle');

}  

}
//module.exports = {A_loginPage};   // export it make it public and made avilable throughout workspace classes
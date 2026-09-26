class A_loginPage{

constructor(page){

    this.page = page;
    this.text_eamil = page.locator('input[id="userEmail"]');
    this. text_password = page.locator('input[id="userPassword"]')
    this. btn_login = page.locator('input[id="login"]');

}

async LaunchAppn(){

    await this.page.goto('https://rahulshettyacademy.com/client/');
}

async ValidLoginToApp(username , password){

    await this.text_eamil.fill(username);
    await this.text_password.fill(password);
    await this.btn_login.click();
    await this.page.waitForLoadState('networkidle');

}  

}
module.exports = {A_loginPage};   // export it make it public and made avilable throughout workspace classes
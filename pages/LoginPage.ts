import { expect, Locator, Page } from "@playwright/test";
import UserCredentials from "../helpers/UserCredentials";
import ApplicationURL from "../helpers/ApplicationURL";

export default class LoginPage {

    usernameField:Locator;
    passwordField:Locator;
    loginButton:Locator;
    
    constructor(protected page:Page){
        this.usernameField = page.locator('[data-test="username"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

   public async loginToApplication(username=UserCredentials.STANDARD_USER , password=UserCredentials.CORRECT_PASSWORD,url=ApplicationURL.BASE_URL){
    await this.page.goto(url);
    await this.validatePageUrl(ApplicationURL.BASE_URL);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await this.validatePageUrl(`${ApplicationURL.BASE_URL}inventory.html`);

 }
    public async validatePageUrl(url:string){
        await expect(this.page).toHaveURL(url);
    }
}
import { Locator, Page } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import { ErrorMessages } from "../helpers/ErrorMessages";
import { BasePage } from "./BasePage";
import UserCredentials from "../helpers/UserCredentials";

export default class LoginPage extends BasePage {

    private usernameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;
    private default_username = UserCredentials.STANDARD_USER;
    private default_password = UserCredentials.CORRECT_PASSWORD;

    constructor(protected page: Page) {
        super(page);
        this.usernameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        this.errorMessage = this.page.locator('[data-test="error"]');
    }

    public async loginToApplication(
        username = this.default_username,
        password = this.default_password,
        url = ApplicationURL.BASE_URL,
    ) {
        await this.page.goto(url);
        await this.validatePageUrl(ApplicationURL.BASE_URL);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.clickElement(this.loginButton);

    }

    public async validateErrorMessage(errorMessage: ErrorMessages) {
        await this.validateElementText(this.errorMessage, errorMessage.valueOf());
    }

}
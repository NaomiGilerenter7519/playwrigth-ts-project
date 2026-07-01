import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import { ErrorMessages } from "../../helpers/ErrorMessages";
import ApplicationURL from '../../helpers/ApplicationURL';
import UserCredentials from '../../helpers/UserCredentials';

test.describe('Negative Login Scenarios', () => {
    let loginPage: LoginPage;
    const lockedOutUser = process.env.LOCKED_OUT_USER || UserCredentials.LOCKED_OUT_USER;
    const standardUser = process.env.STANDARD_USER || UserCredentials.STANDARD_USER;
   
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
    })
    
    test('Login with locked_out_user', async () => {
     await loginPage.loginToApplication(lockedOutUser);
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })
    test('Login with incorrect username', async () => {
            await loginPage.loginToApplication("useruser");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })

    test('Login with incorrect password', async () => {
        await loginPage.loginToApplication(standardUser, "wrong_password");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })

})

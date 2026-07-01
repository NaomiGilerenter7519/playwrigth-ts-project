import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import ApplicationURL from "../../helpers/ApplicationURL";
import ProductsPage from "../../pages/ProductsPage";
import PageTitles from "../../helpers/PageTitles";
import UserCredentials from "../../helpers/UserCredentials";


test.describe("Positive Login Scenarios", () => {
    
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    const standardUser = process.env.STANDARD_USER || UserCredentials.STANDARD_USER;
    const problemUser = process.env.PROBLEM_USER || UserCredentials.PROBLEM_USER;
    const performanceGlitchUser = process.env.PERFORMANCE_GLITCH_USER || UserCredentials.PERFORMANCE_GLITCH_USER;
    const correctPassword = process.env.CORRECT_PASSWORD || UserCredentials.CORRECT_PASSWORD;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
    })

    test.afterEach(async() => {
        await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    })

    test("Login with standard_user", async() => {
        await loginPage.loginToApplication(standardUser, correctPassword);
        await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    })

    test("Login with problem_user", async() => {
        await loginPage.loginToApplication(problemUser);
        await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
    })

    test("Login with performance_glitch_user", async() => {
        await loginPage.loginToApplication(performanceGlitchUser);
        await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
    })
})
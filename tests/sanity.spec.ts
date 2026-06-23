import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import UserCredentials from '../helpers/UserCredentials';
import ApplicationURL from '../helpers/ApplicationURL';

test('sanity test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(UserCredentials.PERFORMANCE_GLITCH_USER, UserCredentials.CORRECT_PASSWORD);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="title"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('dfd');
  await page.locator('[data-test="lastName"]').fill('ddd');
  await page.locator('[data-test="postalCode"]').fill('ddd');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="complete-header"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});

test('demo test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(UserCredentials.PROBLEM_USER, UserCredentials.CORRECT_PASSWORD);

});

test('demo test 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication();
});
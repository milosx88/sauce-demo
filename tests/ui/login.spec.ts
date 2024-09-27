/**
 * Since i skipped logging-in for "checkout_sort.spec.ts" file in order to speed-up the test execution, i created this one
 * in order to demonstrate how testing of login form should look like.
 * Note that there are only two automated scenarios, but will additional not that a big effort other scenarios can be covered by tests
 */

import { test } from '@playwright/test';
import { BASE_URL, PageTitles, Users, USER_PASSWORD } from '../../data/uiConstants';
import { UiTasks } from '../../helper/UiTasks';
import { InvertoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

let uiTasks: UiTasks;
let invertoryPage: InvertoryPage;
let loginPage: LoginPage;

test.describe('Sauce Demo tests', () => {
  test.beforeEach('Initializing pages and insert user cookies', async ({ page }) => {
    uiTasks = new UiTasks(page);
    invertoryPage = new InvertoryPage(page);
    loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
  });

  test.afterEach('Take full-page screenshot on failure', async () => {
    await uiTasks.takeScreenshot();
  });

  test('Login with Standard user', async () => {
    await loginPage.submitLogin(Users.STANDARD, USER_PASSWORD);
    await invertoryPage.verifyPageTile(PageTitles.PRODUCTS);
  });

  test('Login with Locked-out user', async () => {
    await loginPage.submitLogin(Users.LOCKED_OUT, USER_PASSWORD);
    await loginPage.verifyLockerUserError();
  });
});

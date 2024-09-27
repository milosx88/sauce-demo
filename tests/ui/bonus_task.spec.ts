/**
 * NOTE: For callback function, i used .hover() method in order to avoid leaving the page by using .click() method
 * Click is also possible to implement, but it requires more effort
 * There are several different elements in test block, so you can use them for testing purpose
 */

import { test } from '@playwright/test';
import { INVERTORY_PAGE, PageTitles, SortOptions, UserDetails, Users } from '../../data/uiConstants';
import { UiTasks } from '../../helper/UiTasks';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { InvertoryPage } from '../../pages/InventoryPage';

let uiTasks: UiTasks;
let invertoryPage: InvertoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.describe('Sauce Demo tests', () => {
  test.beforeEach('Initializing pages and insert user cookies', async ({ page }) => {
    uiTasks = new UiTasks(page);
    invertoryPage = new InvertoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await uiTasks.insertUserCookies(Users.STANDARD);
    await page.goto(INVERTORY_PAGE);
  });

  test.afterEach('Take full-page screenshot on failure', async () => {
    await uiTasks.takeScreenshot();
  });

  test('Task: Bonus task with callback function', async ({ page }) => {
    await invertoryPage.verifyPageTile(PageTitles.PRODUCTS);

    // const element = await page.$('[data-test*=add-to-cart-sauce-labs-backpack]');
    // const element = await page.$('[data-test*=inventory-item-name]');
    // const element = await page.$('[data-test*=inventory-item-description]');
    // const element = await page.$('[data-test*=inventory-item]');
    const element = await page.$('[data-test*=inventory-list]');
    // const element = await page.$('[class*=inventory_item_label]');
    // const element = await page.$('.social')

    if (element) {
      await invertoryPage.visitElementAndDescendants(element, async (el) => {
        await el.hover();
        console.log('Hovered element: ' + (await el.evaluate((tag) => tag.tagName.toLowerCase())));
      });
    }

    await invertoryPage.comment('All nested elements are covered by callback function.');
  });
});

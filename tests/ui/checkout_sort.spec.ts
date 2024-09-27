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

  test('Task: Verify an item can be added to the cart and complete checkout process', async () => {
    //Verify that an item can be added to the cart and is visible on the cart page.
    await invertoryPage.verifyPageTile(PageTitles.PRODUCTS);
    let productTitle = await invertoryPage.selectRandomProduct();
    await invertoryPage.proceedToCartPage();
    await cartPage.verifyPageTile(PageTitles.CART);
    await cartPage.verifyProductVisibility(productTitle);
    //Ensure the user can complete the purchase/checkout process.
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyPageTile(PageTitles.CHECKOUT_INFO);
    await checkoutPage.enterUserDetails(UserDetails.FIRST_NAME, UserDetails.LAST_NAME, UserDetails.ZIP_CODE);
    await checkoutPage.proceedToOverviewStep();
    await checkoutPage.verifyPageTile(PageTitles.CHECKOUT_OVERVIEW);
    await checkoutPage.verifyProductVisibility(productTitle);
    await checkoutPage.submitOrder();
    await checkoutPage.verifyPageTile(PageTitles.CHECKOUT_COMPLETE);
    await checkoutPage.verifyThankYouMessage();
  });

  test('Task: Verify that inventory items can be sorted by price, high-to-low, and the sorting is correct.', async () => {
    await invertoryPage.verifyPageTile(PageTitles.PRODUCTS);
    await invertoryPage.selectSortOption(SortOptions.HIGH_TO_LOW);
    await invertoryPage.verifyArrayIsDescSorted(await invertoryPage.generatePricesArray());
  });

  test('Task: Ensure that inventory can be sorted by name, Z-to-A, and the sorting is correct', async () => {
    await invertoryPage.verifyPageTile(PageTitles.PRODUCTS);
    await invertoryPage.selectSortOption(SortOptions.Z_TO_A);
    await invertoryPage.verifyArrayIsDescSorted(await invertoryPage.generateTitlesArray());
  });
});

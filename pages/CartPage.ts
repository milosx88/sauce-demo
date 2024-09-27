import { expect, Locator, Page } from '@playwright/test';
import { CommonPage } from './CommonPage';

export class CartPage extends CommonPage {
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = this.page.getByTestId('checkout');
  }

  //Method perfroms click on "Checkout" button
  async proceedToCheckout() {
    await this.clickOnElement(this.checkoutButton);
  }
}

import { Locator, Page } from '@playwright/test';
import { CommonPage } from './CommonPage';

export class InvertoryPage extends CommonPage {
  readonly addToCartBtns: Locator;
  readonly shoppingCartLink: Locator;
  readonly sortContainer: Locator;
  readonly productPrices: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartBtns = this.page.locator(`//div[@data-test='inventory-item']//button[text()='Add to cart']`);
    this.shoppingCartLink = this.page.getByTestId('shopping-cart-link');
    this.sortContainer = this.page.getByTestId('product-sort-container');
    this.productPrices = this.page.getByTestId('inventory-item-price');
    this.productTitles = this.page.getByTestId('inventory-item-name');
  }

  sortOption(option: string) {
    return this.page.locator(`//option[text()='${option}']`);
  }

  /**
   * Method selects random product from invertory
   * @returns - The title of selected product for later verification
   */
  async selectRandomProduct() {
    let randomIndex = await this.getRandomNumberInRange(0, (await this.addToCartBtns.count()) - 1);
    let productTitle = await this.getElementText(this.productTitles.nth(randomIndex));
    this.comment(`Product "${productTitle}" is selected.`);
    await this.clickOnElement(this.addToCartBtns.nth(randomIndex));

    return productTitle;
  }

  //Method performs click on "Shopping Cart Link/Icon"
  async proceedToCartPage() {
    await this.clickOnElement(this.shoppingCartLink);
  }

  /**
   * Method sorts invertory products based on provided option
   * @param option - Desired sort option
   */
  async selectSortOption(option: string) {
    await this.sortContainer.selectOption({ label: option });
  }

  async verifyArrayIsDescSorted(array: any[]) {
    let sorted = true;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] < array[i + 1]) {
        sorted = false;
        break;
      }
    }

    sorted
      ? await this.comment('Array is sorted in DESC order properly.')
      : (function () {
          throw new Error('Array is not sorted in DESC order properly.');
        })();
  }

  async generatePricesArray() {
    let array: any[] = [];

    //generate prices array after Z-A sort is applied and convert it to float values
    for (let i = 0; i < (await this.productPrices.count()); i++) {
      array.push(parseFloat((await this.getElementText(this.productPrices.nth(i)))?.replace('$', '')));
    }
    return array;
  }

  async generateTitlesArray() {
    let array: any[] = [];

    //generate array of available product titles
    for (let i = 0; i < (await this.productTitles.count()); i++) {
      array.push(await this.getElementText(this.productTitles.nth(i)));
    }

    return array;
  }
}

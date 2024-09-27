import { expect, Locator, Page, ElementHandle } from '@playwright/test';
import { UiTasks } from '../helper/UiTasks';

export class CommonPage extends UiTasks {
  readonly productTitle: Locator;
  readonly invertoryItemDesc: Locator;
  readonly parentElement;

  constructor(page: Page) {
    super(page);
    this.productTitle = this.page.getByTestId('inventory-item-name');
    this.invertoryItemDesc = this.page.getByTestId('inventory-item-description').first();
  }

  /**
   * Generates locator based on provided page title
   * @param title - Page title
   * @returns - Page title locator
   */
  pageTitle(title: string) {
    return this.page.locator(`//span[@data-test='title' and text()='${title}']`);
  }

  /**
   * Method verifies if the page with provided title is loaded
   * @param title - Page title (located below the burger menu)
   */
  async verifyPageTile(title: string) {
    await this.expectToBeVisible(this.pageTitle(title));
    await this.comment(`Page "${title}" is loaded.`);
  }

  /**
   * Method verifies if product is visible on shopping cart / checkout pages
   * @param title - Product title
   */
  async verifyProductVisibility(title: any) {
    expect(await this.getElementText(this.productTitle)).toEqual(title);
  }

  async visitElementAndDescendants(element: ElementHandle, callback) {
    //Call callback for parent element
    await callback(element);

    // Get all descendant elements
    let descendants = await element.$$('>*');

    //Iterate through descendants and call callback
    for (let descendant of descendants) {
      await this.visitElementAndDescendants(descendant, callback);
    }
  }
}

/**
 * This file includes all basic (wrapped) web actions in order to reduce code lines and build more reusable code.
 */

import { Page, expect, Locator } from '@playwright/test';
export class WebActions {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
    // this.page.setViewportSize({
    //   width: 1600,
    //   height: 900,
    // });
  }

  /**
   * Method opens the page by provided URL
   * @param url - Page URL
   */
  async navigateToUrl(url: string) {
    await this.page.goto(url);
  }

  /**
   * Method waits the element to be visible
   * @param locator - page locator based on Xpath or CSS selector
   */
  async waitForVisible(locator: Locator): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    await this.expectToBeVisible(locator);
  }

  /**
   * Method clicks on the element
   * @param locator - page locator based on Xpath or CSS selector
   */
  async clickOnElement(locator: Locator): Promise<void> {
    await this.waitForVisible(locator);
    await locator.click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
  }

  /**
   * Method enters provided text into selected input field
   * @param locator - page locator based on Xpath or CSS selector
   * @param inputText - Input text
   */
  async enterText(locator: Locator, inputText: string): Promise<void> {
    await this.waitForVisible(locator);
    await locator.fill(inputText);
  }

  /**
   * Method returns text of element
   * @param locator - page locator based on Xpath or CSS selector
   */
  async getElementText(locator: Locator): Promise<any | null> {
    await this.waitForVisible(locator);
    return locator.textContent();
  }

  /**
   * Method validates element text whether it's equal to expected text or not
   * @param locator - page locator based on Xpath or CSS selector
   * @param text - Expected text to compare with actual element text
   */
  async validateElementText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }

  /**
   * Method expects visibility of element
   * @param locator Element locator
   * @param visible Possible values: 'true' or 'false'. Default value 'true'
   */
  async expectToBeVisible(locator: Locator, visible = true) {
    await expect(locator).toBeVisible({ timeout: 15000, visible: visible });
  }

  /**
   * Method expects two values to be equal
   * @param value Value to be compared
   * @param expected Value to compare
   * @param equality Boolean, can be true or false. Defaul value is true. True means toEqual, false means not.toEqual
   */
  async expectValuesEquality(value: number, expected: number, equality = true) {
    if (equality) {
      expect(value).toEqual(expected);
    } else {
      expect(value).not.toEqual(expected);
    }
  }

  //Method takes full-page screenshot
  async takeScreenshot() {
    await this.page.screenshot({ fullPage: true });
  }

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
}

import { expect, Locator, Page } from '@playwright/test';
import { CommonPage } from './CommonPage';

export class CheckoutPage extends CommonPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly completeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.page.getByTestId('firstName');
    this.lastNameInput = this.page.getByTestId('lastName');
    this.zipCodeInput = this.page.getByTestId('postalCode');
    this.continueBtn = this.page.getByTestId('continue');
    this.finishBtn = this.page.getByTestId('finish');
    this.completeMessage = this.page.getByTestId('complete-header');
  }

  /**
   * Method which enters user details (first and last name, zip code)
   * @param firstname - User first name
   * @param lastname - User last name
   * @param zipcode - User zipcode
   */
  async enterUserDetails(firstname: string, lastname: string, zipcode: string) {
    await this.enterText(this.firstNameInput, firstname);
    await this.enterText(this.lastNameInput, lastname);
    await this.enterText(this.zipCodeInput, zipcode);
  }

  //Method performs click on "Continue" button in order to proceed to the next checkout step
  async proceedToOverviewStep() {
    await this.clickOnElement(this.continueBtn);
  }

  //Method performs click on the "Finish" button in order to submit the order
  async submitOrder() {
    await this.clickOnElement(this.finishBtn);
  }

  //Method verifies the "Thank you" message is visible after submission
  async verifyThankYouMessage() {
    await this.expectToBeVisible(this.completeMessage);
    await this.comment(`"Thank you for your order!" message is displayed.`);
  }
}

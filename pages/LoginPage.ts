import { expect, Locator, Page } from '@playwright/test';
import { CommonPage } from './CommonPage';

export class LoginPage extends CommonPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.getByTestId('username');
    this.passwordInput = this.page.getByTestId('password');
    this.loginBtn = this.page.getByTestId('login-button');
    this.errorMsg = this.page.getByTestId('error');
  }

  //Method enters username and password and submit the login form
  async submitLogin(username: string, password: string) {
    await this.enterText(this.usernameInput, username);
    await this.enterText(this.passwordInput, password);
    await this.clickOnElement(this.loginBtn);
  }

  //Method verifies error message after unsuccessful login
  async verifyLockerUserError() {
    expect(await this.getElementText(this.errorMsg)).toContain('Sorry, this user has been locked out.');
  }
}

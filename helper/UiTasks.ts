/**
 * This file contains some useful methods for setting-up browser cookies, random data and printing out passed steps
 */

import { Page } from '@playwright/test';
import { WebActions } from '../core/WebActions';

let step = 1;

export class UiTasks extends WebActions {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Method for importing cookies into browser, in order to skip logging-in
   * @param username - Desired username
   */
  async insertUserCookies(username: string) {
    await this.page.context().addCookies([
      {
        name: 'session-username',
        value: username,
        domain: 'www.saucedemo.com',
        path: '/',
      },
    ]);
  }

  /**
   * Method returns random number in range from - to
   * @param min - minimum value (FROM number)
   * @param max - maximum value (TO number)
   * @returns - Random number within min-max
   */
  async getRandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Method generates step as output based on provided message
   * @param message - Desired message
   */
  async comment(message: string) {
    console.log(`Step ${step} - ${message}`);
    step++;
  }
}

/**
 * This file includes some useful methods to generate testing data
 */

import { faker } from '@faker-js/faker';

export class Helper {
  /**
   * Method generates random string by provided length
   * @param {*} length string length
   * @returns
   */
  async generateRandomString(length: number): Promise<string> {
    if (typeof length != 'number' || length < 1) throw Error('Provide valid numeric value > 0');
    return faker.string.alpha({ length, casing: 'lower' });
  }

  /**
   * Method generates random string based on prefix string and random generated one
   * @param prefix - Static prefix
   * @param generated - Random generated string
   * @returns - Return generated string
   */
  async generateRandomName(prefix: string, generated: number): Promise<string> {
    return `${prefix}${await this.generateRandomString(generated)}`;
  }

  /**
   * Method generates random nunber by provided length
   * @param {*} length number length
   * @returns - Generated number
   */
  async generateRandomNumber(length: number): Promise<number> {
    if (typeof length != 'number' || length < 1) throw Error('Provide valid numeric value > 0');
    return faker.number.int();
  }
}

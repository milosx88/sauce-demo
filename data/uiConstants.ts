/**
 * This file contains variables and data used for UI tests
 */

export const BASE_URL = 'https://www.saucedemo.com';
export const INVERTORY_PAGE = `${BASE_URL}/inventory.html`;

export const Users = {
  STANDARD: 'standard_user',
  LOCKED_OUT: 'locked_out_user',
  PROBLEM: 'problem_user',
  PERFORMANCE_GLITCH: 'performance_glitch_user',
  ERROR: 'error_user',
  VISUAL: 'visual_user',
};

export const USER_PASSWORD = 'secret_sauce';

export const PageTitles = {
  PRODUCTS: 'Products',
  CART: 'Your Cart',
  CHECKOUT_INFO: 'Checkout: Your Information',
  CHECKOUT_OVERVIEW: 'Checkout: Overview',
  CHECKOUT_COMPLETE: 'Checkout: Complete!',
};

export const UserDetails = {
  FIRST_NAME: 'Sauce Demo First Name',
  LAST_NAME: 'Sauce Demo Last Name',
  ZIP_CODE: '100001',
};

export const SortOptions = {
  A_TO_Z: 'Name (A to Z)',
  Z_TO_A: 'Name (Z to A)',
  LOW_TO_HIGH: 'Price (low to high)',
  HIGH_TO_LOW: 'Price (high to low)',
};

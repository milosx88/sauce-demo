/**
 * This file contains variables, data and headers used for API tests
 */

export const BASE_URL = 'https://petstore.swagger.io/v2';

export const PetStatuses = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  SOLD: 'sold',
};

export const contentTypeHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const formDataHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
};

export const apiKeyHeaders = {
  api_key: 'special-key',
  Accept: 'application/json',
};

export async function generatePetFormData(petName: string, status: string) {
  return `name=${petName}&status=${status}`;
}

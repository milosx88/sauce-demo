/**
 * This file contains variables, data and headers used for API tests
 */

import { expect, request } from '@playwright/test';
import {
  apiKeyHeaders,
  BASE_URL,
  contentTypeHeaders,
  formDataHeaders,
  generatePetFormData,
} from '../data/apiConstants';
import Ajv from 'ajv';
import { NewPetSchema, PetUpdateFormDataSchema } from '../data/jsonSchemas';
import { Helper } from './Helper';
const ajv = new Ajv();

let response, jsonResponse, URL, payload;

export class ApiTasks extends Helper {
  /**
   * Method validates if JSON response meets defined schema
   * @param response - JSON response provided by api request
   * @param schema - Defined schema
   */
  async validateJsonSchema(response: object, schema: object) {
    const valid = ajv.validate(schema, response);

    // Output the errors text
    if (!valid) {
      console.error('AJV Validation Errors:', ajv.errorsText());
    }
    // If the JSON is valid, the variable is "true"
    expect(valid).toBe(true);
  }

  /**
   * Method creates new pet by provided payload
   * @param payload - Desired payload
   * @returns - Pet ID and Name
   */
  async createNewPet(payload: object) {
    URL = `${BASE_URL}/pet`;
    response = await (await request.newContext()).post(URL, { data: payload, headers: contentTypeHeaders });
    jsonResponse = await response.json();
    console.log(jsonResponse);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    await this.validateJsonSchema(jsonResponse, NewPetSchema);

    //this is an example how we can grab some details from the response
    return {
      id: jsonResponse.id,
      name: jsonResponse.name,
    };
  }

  /**
   * Method updates Pet details by provided payload
   * @param payload - Desired payload
   */
  async updatePetName(payload: object) {
    URL = `${BASE_URL}/pet`;
    response = await (await request.newContext()).put(URL, { data: payload, headers: contentTypeHeaders });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, NewPetSchema);
  }

  /**
   * Method gets all pets by provided status
   * @param status - Desired status (possible values: available, pending, sold)
   */
  async getPetsByStatus(status: string) {
    URL = `${BASE_URL}/pet/findByStatus?status=${status}`;
    response = await (await request.newContext()).get(URL, { headers: contentTypeHeaders });
    await this.validateResponse();
  }

  /**
   * Method gets pet details by provided PetId
   * @param petId - Desired PetId
   */
  async getPetById(petId: number) {
    URL = `${BASE_URL}/pet/${petId}`;
    response = await (await request.newContext()).get(URL, { headers: contentTypeHeaders });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, NewPetSchema);
  }

  /**
   * Method updates pet details by using FormData
   * @param petId - Desired PetId
   * @param petName - Desired PetName
   * @param petStatus - Desired status (possible values: available, pending, sold)
   */
  async updatePetDetailsByFormData(petId: number, petName: string, petStatus: string) {
    URL = `${BASE_URL}/pet/${petId}`;
    payload = await generatePetFormData(petName, petStatus);
    response = await (await request.newContext()).post(URL, { data: payload, headers: formDataHeaders });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, PetUpdateFormDataSchema);
  }

  /**
   * Method deletes pet by provided PetId
   * @param petId - Desired PetId
   */
  async deletePetById(petId: number) {
    URL = `${BASE_URL}/pet/${petId}`;
    response = await (await request.newContext()).delete(URL, { headers: apiKeyHeaders });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, PetUpdateFormDataSchema);
  }

  //Method prints json response and checks if response fulfills set criteria
  async validateResponse() {
    jsonResponse = await response.json();
    console.log(jsonResponse);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  }
}

/**
 * I created one test which includes all CRUD operations in order to create full flow from create to delete phase
 * Also, you have each request in separate test
 */

import { test } from '@playwright/test';
import { PetStatuses } from '../../data/apiConstants';
import { newPetPayload, updatePetPayload } from '../../data/apiPayloads';
import { ApiTasks } from '../../helper/ApiTasks';

let apiTasks: ApiTasks;
let randomPetId, randomPetName;

test.describe('Pet CRUD operations', () => {
  test.beforeAll('Generate auth token', async () => {
    apiTasks = new ApiTasks();
    //Generate random petId and pet name
    randomPetId = await apiTasks.generateRandomNumber(10);
    randomPetName = await apiTasks.generateRandomName('pet_', 5);
  });

  test('Task: Create tests for API calls (POST, GET, PUT, DELETE), setting headers, body, andmaking proper assertions', async () => {
    //create new pet with provided petId and petName (method returns petId and petName from response)
    console.log('------- Create New Pet response -------');
    let petId = await apiTasks.createNewPet(await newPetPayload(randomPetId, randomPetName));

    //update previously created pet by chaning pet name
    console.log('------- Update Pet Name response -------');
    await apiTasks.updatePetName(await updatePetPayload(petId.id, `${petId.name}_updated`));

    //get all pets with provided status
    console.log('------- Get all pets by Status response -------');
    await apiTasks.getPetsByStatus(PetStatuses.SOLD);

    //get pet by provided petId
    console.log('------- Get pet by ID response -------');
    await apiTasks.getPetById(randomPetId);

    //update previously created pet by using form data
    console.log('------- Update Pet by FormData response -------');
    await apiTasks.updatePetDetailsByFormData(randomPetId, `${petId.name}_formData`, PetStatuses.SOLD);

    //delete previously created pet
    console.log('------- Delete pet by ID response -------');
    await apiTasks.deletePetById(randomPetId);
  });

  //The test above splitted into small ones

  test('Create new pet', async () => {
    await apiTasks.createNewPet(await newPetPayload(randomPetId, randomPetName));
  });

  test('Update pet name by Id', async () => {
    await apiTasks.updatePetName(await updatePetPayload(randomPetId, `${randomPetName}_updated`));
  });

  test('Get all pets by Status', async () => {
    await apiTasks.getPetsByStatus(PetStatuses.SOLD);
  });

  test('Get pet details by Id', async () => {
    await apiTasks.getPetById(randomPetId);
  });

  test('Update pet details by FormData', async () => {
    await apiTasks.updatePetDetailsByFormData(randomPetId, `${randomPetName}_formData`, PetStatuses.SOLD);
  });

  test('Deletepet by Id', async () => {
    await apiTasks.deletePetById(randomPetId);
  });
});

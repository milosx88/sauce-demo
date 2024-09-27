/**
 * This file contains functions for generating payloads used for API tests
 */

export async function newPetPayload(petId: number, petname: string) {
  return {
    id: petId,
    category: {
      id: 0,
      name: 'string',
    },
    name: petname,
    photoUrls: ['string'],
    tags: [
      {
        id: 0,
        name: 'string',
      },
    ],
    status: 'available',
  };
}

export async function updatePetPayload(petId: number, petname: string) {
  return {
    id: petId,
    category: {
      id: 0,
      name: 'string',
    },
    name: petname,
    photoUrls: ['string'],
    tags: [
      {
        id: 0,
        name: 'string',
      },
    ],
    status: 'available',
  };
}

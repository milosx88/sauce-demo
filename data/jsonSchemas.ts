/**
 * This file contains schemas for verifying API responses
 */

export const NewPetSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    category: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
      },
      required: ['id', 'name'],
    },
    name: { type: 'string' },
    photoUrls: {
      type: 'array',
      items: { type: 'string' },
    },
    tags: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
        required: ['id', 'name'],
      },
    },
    status: { type: 'string' },
  },
  required: ['id', 'category', 'name', 'photoUrls', 'tags', 'status'],
};

export const PetUpdateFormDataSchema = {
  type: 'object',
  properties: {
    code: { type: 'number' },
    type: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['code', 'type', 'message'],
};

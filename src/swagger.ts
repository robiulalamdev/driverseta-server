import { Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js API with Swagger and TypeScript',
    version: '1.0.0',
    description: 'A simple CRUD API application with Swagger documentation',
    contact: {
      name: 'Your Name',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
    },
  ],
};

// Swagger options
const options = {
  swaggerDefinition,
  apis: ['./src/app/modules/**/*.route.ts'], // Point to where your route files are
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerSetup = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerSetup;

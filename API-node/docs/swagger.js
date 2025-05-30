// docs/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Auth API",
      version: "1.0.0",
      description: "A simple Express Auth API"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./routes/*.js"], // scan all route files
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };

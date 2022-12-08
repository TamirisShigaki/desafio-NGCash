const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/doc/swaggerLogin.json';
const endpointsFiles = ['./src/routes/userRoutes.ts'];

swaggerAutogen(outputFile, endpointsFiles);

const express = require('express');
const authRouter = require('./authRouter');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
const swaggerJCDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const options = {
    definition: {
      openapi : '3.0.0',
      info : {
          title: 'Swagger',
          version: '1.0.0'
      },
      servers:[
          {
            url:'http://localhost:3000/'
          }
      ]
    },
    apis: ['./authController.js']
};
app.use(express.json());

const swaggerSpec = swaggerJCDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app;
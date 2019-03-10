import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import apiRoutes from './routes/api';


const app = express();

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.use('/', apiRoutes);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.get('/', (req, res) => {
//   res.status(200).send({
//     status: 200,
//     data: { message: 'Welcome to Epic Mail. visit /api/v1 for api.' },
//   });
// });

app.get('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'This url does not exist',
  });
});

app.listen(PORT);

export default app;

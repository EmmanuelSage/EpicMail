import express from 'express';
import apiRoutes from './routes/api';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    data: { message: 'Welcome to Epic Mail. visit /api/v1 for api.' },
  });
});

app.get('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'This url does not exist',
  });
});

app.listen(PORT);

export default app;

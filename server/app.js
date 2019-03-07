import express from 'express';

const app = express();

const PORT = process.env.PORT || 3001;

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

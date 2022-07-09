import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
  { id: 1, name: 'Douglas Fernandes', age: 30 },
  { id: 2, name: 'Rafael Ribeiro', age: 31},
];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  return res.send('<h1> Trabalhando com servidor express </h1>');
});

app.get('/users', (req, res) => {
  return res.send(users);
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = users.find(user => (user.id === Number(userId)));
  return res.send(user);
});

app.post('/users', (req, res) => {
  const newUser = req.body;

  users.push(newUser);

  return res.status(201).send(newUser);
});

app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedUser = req.body;

  users = users.map(user => {
    Number(userId) === user.id ? updatedUser : user;
  });
  return res.send(updatedUser);
});

app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  users = users.filter((user) => user.id !== Number(userId));

  return res.status(StatusCodes.NO_CONTENT).send();
});


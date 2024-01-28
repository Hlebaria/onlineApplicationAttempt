const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

const client = new Client({
  user: 'alex',
  host: 'database',
  database: 'tues',
  password: 'alex',
  port: 5432,
});

client.connect();

app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT clicks FROM clicker');
    const count = result.rows[0].clicks;
    res.send(`<h1>Click Count: ${count}</h1>`);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/increment', async (req, res) => {
  try {
    await client.query('UPDATE clicker SET clicks = clicks + 1');
    res.send('Incremented!');
  } catch (error) {
    console.error('Error updating the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
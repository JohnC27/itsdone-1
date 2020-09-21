const express = require('express');
const tasks = require('./api/tasks');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Not found' 
  });
});

app.use('/tasks', tasks);

app.listen(PORT);

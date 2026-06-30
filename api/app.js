const express = require('express');
const app = express();
const port = 8081;

app.get('/', (req, res) => {
  res.send('API is up and running!');
});

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
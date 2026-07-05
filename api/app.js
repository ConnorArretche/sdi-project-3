const express = require('express');
const app = express();
const port = 8081;
const cors = require('cors');
app.use(cors());
app.use(express.json());
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions')
const categoryRoutes = require('./routes/categories')


app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes)
app.use('/categories', categoryRoutes)


app.get('/', (req, res) => {
  res.send('API is up and running!');
  console.log('Cookies:', req.cookies)
});

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});


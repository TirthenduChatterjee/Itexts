const express = require('express');
const connectToMongo = require('./db.js');
const app = express();
const env = require('dotenv');
const port = 5000;
env.config({ path: './.env' }); 
connectToMongo();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello Tirtho');
})
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Auth-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/api/auth',require('./routes/Auth_routes.js'));
app.use('/api/notes',require('./routes/Notes_routes.js'));

app.listen(port, () => {
  console.log(`App listening on port ${port} ....`);
})
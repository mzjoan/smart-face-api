const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//Import
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

//Database
const db = knex({
  client: 'pg',
  connection: {
  connectionString : process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send('success')})
//Signin route ---> POST = success/fail
app.post('/signin', signin.handleSignin(db, bcrypt))
//Register ---> POST = user
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
//Homescreen Profile/:userId ---> GET = user
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
//image ---> PUT ---> This will updadte users entries count everytime an image is submitted.
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
	console.log(`Running on port 3000 ${process.env.PORT}`);
})
/*const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
console.log(PORT)*/


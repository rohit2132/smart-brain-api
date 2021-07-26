const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Dragon@987',
      database : 'smart-brain'
    }
  });


  /* db.select('*').from('users').then(data => {
      console.log(data);
  });
 */



const app = express();

app.use(express.json());
app.use(cors()); 



app.get('/', (req, res) => {
    res.send(database.users);
})


// SIGN IN 
app.post('/signin/', signin.handleSignin(db, bcrypt) )

// REGISTER
app.post('/register', (req, res) =>{ register.handleRegister(req, res, db, bcrypt) } )

// PROFILE
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) } );
    
// IMAGE
app.put('/image', (req, res) => { image.handleImage(req, res, db) } );
// API HANDLING
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) } );

app.listen(3000, () => {
    console.log('app is running on port 3000');
})



/* 
   / --> res = this is working
   /signin --> POST = success/fail
   /register --> POST = user
  /profile:userId --> GET = user
   /image --> PUT = user

*/
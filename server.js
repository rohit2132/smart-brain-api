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
        connectionString: process.env.DATABASE_URL,
        ssl: true
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
    res.send('it is working');
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

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
    console.log(`app is running on port ${PORT || 3000}`);
})

/* 

⬢ salty-shelf-04472

https://salty-shelf-04472.herokuapp.com/ 

https://git.heroku.com/salty-shelf-04472.git

*/

/* 
   / --> res = this is working
   /signin --> POST = success/fail
   /register --> POST = user
  /profile:userId --> GET = user
   /image --> PUT = user

*/
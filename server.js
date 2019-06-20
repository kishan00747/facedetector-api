const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const knex = require('knex');

const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'admin',
		database: 'facedetector'
	}
});



// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());


// app.get('/', (req, res) => {

// 	res.json(database.users);

// });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });


app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt)});


app.post('/signup', (req, res) => { signup.handleSignUp(req, res, db, bcrypt)} );

app.put('/image', (req, res) => { profile.handleImage(req, res, db) });



app.listen(3001, () => {
	console.log("Server is running at 3001");
});
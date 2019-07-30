const express=require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex =require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const app = express();

const db=knex({
	client:'pg',
	connection:{
		host:'postgresql-reticulated-29302',
		user:'postgres',
		password:'root',
		database:'smartbrain'
	}
})

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
	res.send("It is working");
})

app.post('/signin',(req,res)=>{ signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{ register.handleRegister(req,res, db,bcrypt) })

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})




/*bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    // res == false
});*/


app.listen(process.env.PORT,()=>{
	console.log(`App is running on port ${process.env.PORT}`);
})
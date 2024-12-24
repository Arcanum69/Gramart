// Libraries
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initializations / Global Variables
const app = express();
app.use(bodyParser.json());
const port = 3000;

const userSecretKey = process.env.USER_SECRET_KEY;

// Authentication Middleware / Functions
const generateJWTusertoken = user => {
    const payload = {username: user.username};
    return jwt.sign(payload, userSecretKey, {expiresIn: '1h'});
};

const authenticateJWTuser = (req, res, next) => {
    // authorization will be in the format of: BEARER [token]
    const authHeader = req.headers.authorization
    if (authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, userSecretKey, (err, user) => {
            if (err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    };
};

// ---------------------------------------------------------------
// -------------------------ROUTES--------------------------------
// ---------------------------------------------------------------

USERS = [];

// For user to signup
// app.get('/user_signup', (req, res) => {
// });

app.post('/user_signup', (req, res) => {
    const user = req.body;
    const existingUser = USERS.some(a => a.username == user.username);
    if (existingUser){
        res.status(403).send("User already exists.")
    }
    USERS.push(user);
    const token = generateJWTusertoken(user)
    res.json({message: 'User created.', token})
});

// For user to login
// app.get('/user_login', (req, res) =>{
// });
app.post('/user_login', (req, res) =>{
    const { username , password } = req.headers;
    const existingUser = USERS.some(a => a.username == username);
    const passwordCheck = USERS.some(a => a.password == password);
    if (!existingUser){
        res.status(404).send("User Does not exist");
    }
    if (!passwordCheck){
        res.status(403).send("Wrong Password");
    }
    const token = generateJWTusertoken(username);
    res.status(200).send({message: 'User signed in successfully', token});
});

// For seller to register
app.get('/seller_signup', (req, res) =>{

});
app.post('/seller_signup', (req, res) =>{

});

// home page
app.get('/home', (req, res) =>{

});

// Specific user page
app.get('/:user', (req, res) =>{

});

// Specific Category page
app.get('/:category', (req, res) =>{

});

// Specific Product page
app.get('/:category/:product', (req, res) =>{

});

// For contacting seller and buyer
app.get('/:category/:product/purchase', (req, res) =>{

});
app.post('/:category/:product/purchase', (req, res) =>{

});

// For uploading a product
app.get('/product_sell', (req, res) => {

});
app.post('/product_sell', (req, res) => {

});









app.listen(port, () => {
    console.log(`App opened at port: ${port}`);
});
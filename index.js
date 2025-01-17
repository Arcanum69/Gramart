// Libraries
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Importing Modules
const { USER, PRODUCT, CATEGORY } = require("./config")

// Initializations / Global Variables
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

const userSecretKey = process.env.USER_SECRET_KEY;

// Authentication Middleware / Functions
const generateJWTusertoken = (user) => {
    const payload = {
        username: user.username,
        iat: Math.floor(Date.now() / 1000)
    };
    return jwt.sign(payload, userSecretKey, {expiresIn: '1h'});
};

const authenticateJWTuser = (req, res, next) => {
    // authorization will be in the format of: BEARER [token]
    const authHeader = req.headers.authorization
    if (authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, userSecretKey, (err, data) => {
            if (err){
                return res.sendStatus(403);
            }
            req.user = data;
            next();
        });
    }else {
        return res.status(401).json({ message: 'Authorization header missing.' }); }
};

// ---------------------------------------------------------------
// -------------------------ROUTES--------------------------------
// ---------------------------------------------------------------

// For user to signup
// app.get('/user_signup', (req, res) => {
// });

// Additions: to check if email also exists, check username unique and email unique seperately. Also update front-end likewise.
app.post('/user_signup', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await USER.findOne({username});
    if (existingUser){
        return res.status(403).json({ message: 'User already exists.' });
    }
    const newUser = new USER({username, password});
    await newUser.save();
    const token = generateJWTusertoken({username});
    return res.status(200).json({message: 'User created.', token});
});

// For user to login
// app.get('/user_login', (req, res) =>{
// });
app.post('/user_login', async (req, res) =>{
    const { username , password } = req.headers;
    const existingUser = await USER.findOne({username});
    const credentialsCheck = await USER.findOne({username, password});
    if (!existingUser){
        return res.status(404).send("User does not exist");
    }
    else if (!credentialsCheck) {
        return res.status(403).send("Wrong Username or Password");
    };
    const token = generateJWTusertoken({username});
    return res.status(200).send({message: 'User logged in successfully', token});
});

// For vendor to register
// app.get('/vendor_signup', (req, res) =>{
// });
app.post('/vendor_signup', authenticateJWTuser, async (req, res) => {
    try {
        const local_user = req.user.username;
        const existing_user = await USER.findOne({ username: local_user });
        if (!existing_user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (existing_user.isVendor) {
            return res.status(400).json({ message: 'User is already a vendor.' });
        }

        const maxVendor = await USER.findOne({ isVendor: true })
            .sort({ vendor_id: -1 })
            .select('vendor_id');
        const nextVendorId = maxVendor ? maxVendor.vendor_id + 1 : 1;

        const global_user = await USER.findOneAndUpdate(
            { username: local_user },
            { isVendor: true, vendor_id: nextVendorId },
            { new: true }
        );

        return res.status(200).json({
            message: 'You are now a vendor.',
            vendor_id: nextVendorId,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
});

// Route to show user details
app.get('/user', authenticateJWTuser, async (req, res) => {
    try {
        const username = req.user.username;
        const userDetails = await USER.findOne({username});
        if (!username){
            return res.status(404).send("User not Found");
        }
        res.status(200).json(userDetails);  
    } catch (error) {
        console.error("Error fetching user", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
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
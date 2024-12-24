const express = require('express');

const app = express();
const port = 3000;



// ---------------------------------------------------------------
// -------------------------ROUTES--------------------------------
// ---------------------------------------------------------------

// For user to signup
app.get('/user_signup', (req, res) => {

});

app.post('/user_signup', (req, res) => {

});

// For user to login
app.get('/user_login', (req, res) =>{

});
app.post('/user_login', (req, res) =>{

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

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import {createProduct,getProductList,searchProduct,ProductDetails} from '../controllers/productController.js';
import {signUp,signIn,userProfile} from '../controllers/userController.js';
import {checkOut} from '../controllers/orderController.js';
import {authorizationCheck} from  './authCheck.js'
import { upload } from './multer.js'; 
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import {createNewNewOrder,getOrders} from '../models/orderModels.js';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';


const port = 3000;
const app = express();


app.use(cors());
app.use('/api/1.0/static', express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use('/.well-known/pki-validation/', express.static(__dirname + '/Auth'));
app.use('/api/1.0/admin', express.static('admin'));
app.use('/api/1.0/midterm/admin', express.static('midterm/admin'));
app.use('/api/1.0/midterm/utils', express.static('midterm/utils'));
app.get('/api/1.0/data', async (req, res) => {
  try {
    const fetchAPI = process.env.dataAPI
   
    const response = await fetch(fetchAPI);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching order data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/1.0/products/details',ProductDetails);
app.get('/api/1.0/products/search',searchProduct);
app.get('/api/1.0/products/:category',getProductList);
app.post('/api/1.0/createProduct',upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'image', maxCount: 10 }]), createProduct);
app.post('/api/1.0/user/signup',signUp);
app.post('/api/1.0/user/signin',signIn);
app.get('/api/1.0/user/profile',authorizationCheck,userProfile);
app.post('/api/1.0/order/checkout',authorizationCheck,checkOut);


app.get('/auth/facebook',
    passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/api/1.0/user/signin' }),
    function(req, res) {
        res.redirect('/');
    });


const options = {
  customCss: '.swagger-ui .topbar { display: none }', 
};
app.use('/api/1.0/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

export { app}; 


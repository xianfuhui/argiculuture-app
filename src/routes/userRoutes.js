const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/about', userController.getAbout);

router.get('/contact', userController.getContact);

router.get('/feature', userController.getFeature);

router.get('/home', userController.getHome);

router.get('/blog', userController.getBlog);

router.get('/product', userController.getProduct);

router.get('/testimonial', userController.getTestimonial);

router.post('/add-contact', userController.postAddContact);

module.exports = router;

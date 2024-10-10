const crypto = require('crypto');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Admin = require('../models/adminModel');
const Product = require('../models/productModel');

// Lấy thông tin trang chủ
const getAbout = async (req, res) => {
    try {
        res.render('user/user_About');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin trang chủ
const getContact = async (req, res) => {
    try {
        res.render('user/user_Contact');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin trang chủ
const getFeature = async (req, res) => {
    try {
        res.render('user/user_Feature');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin trang chủ
const getHome = async (req, res) => {
    try {
        const list_product = await Product.find(); 

        res.render('user/user_Home', { list_product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin trang chủ
const getBlog = async (req, res) => {
    try {
        res.render('user/user_Blog');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin trang chủ
const getProduct = async (req, res) => {
    try {
        const list_product = await Product.find(); 

        res.render('user/user_Product', { list_product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin trang chủ
const getTestimonial = async (req, res) => {
    try {
        res.render('user/user_Testimonial');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAbout,
    getContact,
    getFeature,
    getHome,
    getBlog,
    getProduct,
    getTestimonial,
};
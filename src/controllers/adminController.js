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

// Hiển thị đăng nhập 
const getLoginAdmin = async (req, res) => {
    try {
        if (req.session.admin) {
            res.redirect('/admin/index');
        } else {
            res.render('admin/admin_Login');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Gửi thông tin đăng nhập
const postLoginAdmin = async (req, res) => {
    const { admin_name, admin_password } = req.body;

    try {
        const admin = await Admin.findOne({ admin_name, admin_password });

        if (!admin) {
            req.flash('error', 'Incorrectly entered administrator name or password');
            return res.redirect('/admin/login')
        } else {
            req.session.admin = admin;
            return res.redirect('/admin/index')
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Đăng xuất 
const getLogoutAdmin = async (req, res) => {
    try {
        req.session.admin = null; 

        res.redirect('/admin/login'); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Hiển thị trang phân tích báo cáo
const getIndexAdmin = async (req, res) => {
    try {
        const list_product = await Product.find();

        const topicCount = 0;
        const userCount = 0;
        const productCount = await Product.countDocuments();
        let favoriteVocabularyCount = 0;

        res.render('admin/admin_Index.ejs', { topicCount, userCount, productCount, favoriteVocabularyCount});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin profile
const getProfileAdmin = async (req, res) => {
    try {
        res.render('admin/admin_Profile');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Chỉnh sửa mật khẩu
const postChangePasswordAdmin = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.session.admin._id); 

    try {
        if (currentPassword !== admin.admin_password) {
            req.flash('error', 'Current password is incorrect');
            return res.redirect('/admin/profile'); 
        }

        admin.admin_password = newPassword;
        await admin.save();

        req.flash('success', 'Password changed successfully');
        return res.redirect('/admin/profile'); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin tất cả chủ đề = done
const getListProduct = async (req, res) => {
    try {
        const list_product = await Product.find();
        res.render('admin/admin_ListProduct', { list_product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy data danh sách chủ đề để đưa vô EDIT MODAL
const getProductByID = async (req, res) => {
    const productID = await Product.findById(req.params.productID);

    try {
        res.json(productID);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy data chủ đề chi tiết để đưa vô EDIT MODAL
const getDetailProductByID = async (req, res) => {
    const productID = await Product.findById(req.params.productID);

    try {
        const list_product = await Product.findById(productID)

        res.render('admin/admin_DetailProduct.ejs', { list_product })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Thêm sản phẩm vào database  ==> DONE
const postAddProduct = async (req, res) => {
    try {
        const {
            product_name,
            product_price,
            product_description,
        } = req.body;

        const product_image = req.file.filename;
        
        const newProduct = new Product({
            product_name,
            product_price,
            product_description,
            product_image,
        });

        await newProduct.save();

        res.status(200).json({ message: 'Added product successfully', product: newProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Chỉnh sửa sản phẩm vào database
const putEditProduct = async (req, res) => {
    const productID = req.params.productID;
    const {
        product_name,
        product_price,
        product_description,
    } = req.body;

    const product_image = req.file.filename;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productID, {
            product_name,
            product_price,
            product_description,
            product_image,
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Please try again' });
        }

        res.status(200).json({ message: 'Edit product successfully', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa sản phẩm vào database
const deleteDeleteProduct = async (req, res) => {
    const productID = req.params.productID;
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(productID);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Topic and associated references deleted successfully.', data: deletedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getLoginAdmin,
    postLoginAdmin,
    getLogoutAdmin,
    getIndexAdmin,
    getProfileAdmin,
    postChangePasswordAdmin,
    getListProduct,
    getProductByID,
    getDetailProductByID,
    postAddProduct,
    putEditProduct,
    deleteDeleteProduct,
};
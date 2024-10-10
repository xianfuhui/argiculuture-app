const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Route để get đăng nhập = done 100%
router.get('/login', adminController.getLoginAdmin);

// Route để post đăng nhập = done 100%
router.post('/login', adminController.postLoginAdmin);

// Route để get đăng xuất = done 100%
router.get('/logout', adminMiddleware.sessionAdmin, adminController.getLogoutAdmin);

// Route để get index = done 100%
router.get('/index', adminMiddleware.sessionAdmin, adminController.getIndexAdmin);

// Route để get thông tin profile = done 100%
router.get('/profile', adminMiddleware.sessionAdmin, adminController.getProfileAdmin);

// Route để get thông tin profile = done 100%
router.post('/change-password', adminMiddleware.sessionAdmin, adminController.postChangePasswordAdmin);

// Route để get danh sách chủ đề = done 100%
router.get('/list-product', adminMiddleware.sessionAdmin, adminController.getListProduct);

// Route để lấy thông tin topic theo ID  = done 100%
router.get('/product/:productID', adminMiddleware.sessionAdmin, adminController.getProductByID);

// Route để hiện thị chi tiết chủ đề theo ID = done 50%
router.get('/detail-product/:productID', adminMiddleware.sessionAdmin, adminController.getDetailProductByID);

// Route để post thêm chủ đề = done 100%
router.post('/add-product', adminMiddleware.sessionAdmin, adminMiddleware.uploadImage.single('product_image'), adminController.postAddProduct);

// Route để put thay đổi chủ đề = done 100%
router.put('/edit-product/:productID', adminMiddleware.sessionAdmin, adminMiddleware.uploadImage.single('product_image'), adminController.putEditProduct);

// Route để delete xóa chủ đề = done 100%
router.delete('/delete-product/:productID', adminMiddleware.sessionAdmin, adminController.deleteDeleteProduct);

// Route để get danh sách chủ đề = done 100%
router.get('/list-contact', adminMiddleware.sessionAdmin, adminController.getListContact);

// Route để delete xóa chủ đề = done 100%
router.delete('/delete-contact/:contactID', adminMiddleware.sessionAdmin, adminController.deleteDeleteContact);

module.exports = router;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: String,
    product_price: Number,
    product_description: String,
    product_image: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

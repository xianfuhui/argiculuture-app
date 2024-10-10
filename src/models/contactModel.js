const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    contact_name: String,
    contact_email: String,
    contact_subject: String,
    contact_message: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

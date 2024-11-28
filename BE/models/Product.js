const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    product_name: {type: String, required: true},
    product_image: {type: String, required: true},
    product_attributes: {type: String, required: true},
    product_size: {type: String, default:"L"},
    product_origin: {type: String, default: "VietNam"},
    product_available: {type: Number, default: 99},
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    product_price: {type: String, required: true},
}, { collection: 'Product' })

module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: [1, 'Số lượng tối thiểu là 1'],
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);


cartSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    next();
});

module.exports = mongoose.model('Cart', cartSchema);

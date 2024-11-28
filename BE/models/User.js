const mongoose = require('mongoose');

// Định nghĩa mô hình người dùng
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Kiểm tra độ dài mật khẩu trên Front-End là tốt nhất
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        // match: [/^\d{10}$/, 'Please enter a valid phone number']
    },
    address: {
        type: String,
        required: false,
        trim: true
    },
    role: {
        type: String,
        default: 'customer', // Các vai trò có thể là 'admin' hoặc 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Tạo model User
const User = mongoose.model('User', UserSchema);

module.exports = User;

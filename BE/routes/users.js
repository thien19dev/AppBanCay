const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Route đăng ký người dùng mới (Register)
router.post('/register/', async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Tạo và lưu người dùng mới
    const newUser = new User({ username, email, password, phoneNumber });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route đăng nhập người dùng (Signin)
router.post('/signin/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra mật khẩu (mật khẩu không mã hóa, chỉ so sánh với mật khẩu trên frontend)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, 'your_jwt_secret', {
      expiresIn: '1h', // Token hết hạn sau 1 giờ
    });

    // Trả về thông tin người dùng và token
    res.status(200).json({
      message: 'Signin successful',
      token: token,
      user: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
    });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

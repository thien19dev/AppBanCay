// const express = require('express');
// const router = express.Router();
// const Cart = require('../models/Cart'); // Model Cart
// const Product = require('../models/Product'); // Model Product
// const { authMiddleware } = require('../middleware/auth'); // Middleware xác thực
//
// // Lấy giỏ hàng của người dùng
// router.get('/', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user._id; // Lấy userId từ middleware
//         const cart = await Cart.findOne({ userId }).populate('items.productId');
//         if (!cart) return res.status(404).json({ message: 'Cart not found' });
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// // Thêm sản phẩm vào giỏ hàng
// router.post('/add', authMiddleware, async (req, res) => {
//     const { productId, quantity } = req.body;
//
//     try {
//         const userId = req.user._id;
//         const product = await Product.findById(productId);
//         if (!product) return res.status(404).json({ message: 'Product not found' });
//
//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             // Nếu giỏ hàng chưa tồn tại, tạo mới
//             cart = new Cart({ userId, items: [] });
//         }
//
//         // Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
//         const productIndex = cart.items.findIndex((item) => item.productId.equals(productId));
//
//         if (productIndex >= 0) {
//             // Nếu sản phẩm đã tồn tại, tăng số lượng
//             cart.items[productIndex].quantity += quantity;
//         } else {
//             // Nếu chưa, thêm sản phẩm mới
//             cart.items.push({
//                 productId,
//                 quantity,
//                 price: product.price,
//             });
//         }
//
//         await cart.save();
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// // Cập nhật số lượng sản phẩm
// router.put('/update', authMiddleware, async (req, res) => {
//     const { productId, quantity } = req.body;
//
//     try {
//         const userId = req.user._id;
//         const cart = await Cart.findOne({ userId });
//         if (!cart) return res.status(404).json({ message: 'Cart not found' });
//
//         const productIndex = cart.items.findIndex((item) => item.productId.equals(productId));
//         if (productIndex === -1) return res.status(404).json({ message: 'Product not found in cart' });
//
//         if (quantity > 0) {
//             cart.items[productIndex].quantity = quantity;
//         } else {
//             // Nếu số lượng là 0, xóa sản phẩm
//             cart.items.splice(productIndex, 1);
//         }
//
//         await cart.save();
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// // Xóa sản phẩm khỏi giỏ hàng
// router.delete('/remove/:productId', authMiddleware, async (req, res) => {
//     const { productId } = req.params;
//
//     try {
//         const userId = req.user._id;
//         const cart = await Cart.findOne({ userId });
//         if (!cart) return res.status(404).json({ message: 'Cart not found' });
//
//         cart.items = cart.items.filter((item) => !item.productId.equals(productId));
//         await cart.save();
//
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// // Xóa toàn bộ giỏ hàng
// router.delete('/clear', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const cart = await Cart.findOne({ userId });
//         if (!cart) return res.status(404).json({ message: 'Cart not found' });
//
//         cart.items = [];
//         await cart.save();
//
//         res.status(200).json({ message: 'Cart cleared', cart });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Cart = require('../models/Cart'); // Model Cart
// const Product = require('../models/Product'); // Model Product
//
// // Lấy giỏ hàng của người dùng (theo userId truyền vào request)
// router.get('/:userId', async (req, res) => {
//     const { userId } = req.params;
//
//     try {
//         const cart = await Cart.findOne({ userId }).populate('items.productId');
//         if (!cart) return res.status(404).json({ message: 'Cart not found' });
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// // Thêm sản phẩm vào giỏ hàng
// router.post('/add', async (req, res) => {
//     const { userId, productId, quantity } = req.body;
//
//     try {
//         const product = await Product.findById(productId);
//         if (!product) return res.status(404).json({ message: 'Product not found' });
//
//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             // Nếu giỏ hàng chưa tồn tại, tạo mới
//             cart = new Cart({ userId, items: [] });
//         }
//
//         // Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
//         const productIndex = cart.items.findIndex((item) => item.productId.equals(productId));
//
//         if (productIndex >= 0) {
//             // Nếu sản phẩm đã tồn tại, tăng số lượng
//             cart.items[productIndex].quantity += quantity;
//         } else {
//             // Nếu chưa, thêm sản phẩm mới
//             cart.items.push({
//                 productId,
//                 quantity,
//                 price: product.price,
//             });
//         }
//
//         await cart.save();
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// // Cập nhật số lượng sản phẩm
// router.put('/update', async (req, res) => {
//     const { userId, productId, quantity } = req.body;
//
//     try {
//         const cart = await Cart.findOne({ userId });
//         if (!cart) return res.status(404).json({ message: 'Cart not found' });
//
//         const productIndex = cart.items.findIndex((item) => item.productId.equals(productId));
//         if (productIndex === -1) return res.status(404).json({ message: 'Product not found in cart' });
//
//         if (quantity > 0) {
//             cart.items[productIndex].quantity = quantity;
//         } else {
//             // Nếu số lượng là 0, xóa sản phẩm
//             cart.items.splice(productIndex, 1);
//         }
//
//         await cart.save();
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// // Xóa sản phẩm khỏi giỏ hàng
// router.delete('/remove', async (req, res) => {
//     const { userId, productId } = req.body;
//
//     try {
//         const cart = await Cart.findOne({ userId });
//         if (!cart) return res.status(404).json({ message: 'Cart not found' });
//
//         cart.items = cart.items.filter((item) => !item.productId.equals(productId));
//         await cart.save();
//
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// // Xóa toàn bộ giỏ hàng
// router.delete('/clear', async (req, res) => {
//     const { userId } = req.body;
//
//     try {
//         const cart = await Cart.findOne({ userId });
//         if (!cart) return res.status(404).json({ message: 'Cart not found' });
//
//         cart.items = [];
//         await cart.save();
//
//         res.status(200).json({ message: 'Cart cleared', cart });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// module.exports = router;

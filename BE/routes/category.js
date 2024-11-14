const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/Category');

// Tạo mới Category
router.post('/', async (req, res) => {
    try {
        const Category = new CategoryModel(req.body);
        await Category.save();
        res.status(201).json(Category);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
});

// Lấy danh sách Category
router.get('/', async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
});

// Cập nhật Category theo ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Xóa Category theo ID
router.delete('/:id', async (req, res) => {
    try {
        await CategoryModel.findByIdAndDelete(req.params.id);
        res.json({ msg: "Category deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

const Category = require('../models/model-categorys');

module.exports = {
    findAllCategories: async (req, res) => {
        try {
            const data = await Category.find({})

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    findCategoryById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Category.findById(id);

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    saveCategory: async (req, res) => {
        const category = new Category(req.body);

        try {
            const data = await category.save();

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    updateCategory: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedCategory = await Category.findByIdAndUpdate(id, updates, { new: true });
            
            return res.status(200).json({ "state": true, "data": updatedCategory });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    }
};

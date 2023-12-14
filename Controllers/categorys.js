const Category = require('../models/model-categorys');

module.exports = {
    findAllCategories: async (req, res) => {
        try {
            const data = await Category.find({})

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message })
        }
    },

    findCategoryById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Category.findById(id);

            return res.status(200).json({ "state": true, "data": data})
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message })
        }
    },

    saveCategory: async (req, res) => {
        const category = new Category(req.body);

        try {
            const data = await category.save();

            return res.status(200).json({ "state": true, "data": data, message: `Categoria guardada: ${data.name}` })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message })
        }
    },

    updateCategory: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedCategory = await Category.findByIdAndUpdate(id, updates, { new: true });
            
            return res.status(200).json({ "state": true, "data": updatedCategory, message: `Categoria actualizada: ${updatedCategory.name}` });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    }
};

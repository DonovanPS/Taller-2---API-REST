const Product = require('../models/model-products');


module.exports = {
    findAllProducts: async (req, res) => {
        try {
            const data = await Product.find({}).populate('category');
    
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    findProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Product.findById(id).populate('category');

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    saveProduct: async (req, res) => {
        const product = new Product(req.body);
    
        try {
            const data = await product.save();
            await data.populate('category').execPopulate();
    
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
            
            return res.status(200).json({ "state": true, "data": updatedProduct });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    }
};

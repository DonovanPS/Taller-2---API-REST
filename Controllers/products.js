const Product = require('../models/model-products');


module.exports = {
    findAllProducts: async (req, res) => {
        try {
            const data = await Product.find({}).populate('category');

            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    },

    findProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Product.findById(id).populate('category');

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message })
        }
    },

    saveProduct: async (req, res) => {
        const product = new Product(req.body);

        try {
            const savedProduct = await product.save();
            const data = await Product.findOne({ _id: savedProduct._id }).populate('category').exec();

            return res.status(200).json({ "state": true, "data": data, "message": `Producto guardado: ${data.name}` });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
            return res.status(200).json({ "state": true, "data": updatedProduct, message: `Producto actualizado: ${updatedProduct.name}` });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                return res.status(404).json({ "state": false, "message": "Producto no encontrado" });
            }
            return res.status(200).json({ "state": true, "message": `Producto desactivado: ${deletedProduct.name}` });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    },

    updateProductState: async (req, res) => {
        const { id } = req.params;
        try {
            // Encuentra el producto por ID
            const product = await Product.findById(id);
    
            // Si no se encuentra el producto, devuelve un error 404
            if (!product) {
                return res.status(404).json({ state: false, message: 'Producto no encontrado' });
            }
    
            // Cambia el valor del campo state
            product.state = !product.state;
    
            // Guarda el producto actualizado en la base de datos
            const updatedProduct = await product.save();
    
            // Devuelve el resultado
            return res.status(200).json({
                state: true,
                message: `Estado del producto: ${updatedProduct.name} actualizado`,
            });
        } catch (error) {
            // Manejo de errores
            return res.status(500).json({ state: false, error: error, message: error.message });
        }
    }
    
};

const Sale = require('../models/model-sales');
const Product = require('../models/model-products');

module.exports = {
    findAllSales: async (req, res) => {
        try {
            const data = await Sale.find({})

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    findSaleById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Sale.findById(id).populate('products.product');

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    saveSale: async (req, res) => {
        const sale = new Sale(req.body);

        try {
            // Verificar si los productos existen antes de guardar la venta
            const productIds = req.body.products.map(product => product.product);
            const existingProducts = await Product.find({ _id: { $in: productIds } });

            if (existingProducts.length !== productIds.length) {
                return res.status(400).json({ "state": false, "error": "Uno o más productos no existen." });
            }

            // Calcular el totalAmount
            const totalAmount = req.body.products.reduce((total, product) => {
                const productDetails = existingProducts.find(p => p._id.toString() === product.product);
                return total + productDetails.price * product.quantity;
            }, 0);

            // Asignar el totalAmount calculado a la venta
            sale.totalAmount = totalAmount;

     
            const savedSale = await sale.save();

            
            const populatedSale = await Sale.findById(savedSale._id).populate('products.product');

            return res.status(200).json({ "state": true, "data": populatedSale });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },


    updateSale: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedSale = await Sale.findByIdAndUpdate(id, updates, { new: true });
            
            return res.status(200).json({ "state": true, "data": updatedSale });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    }
};
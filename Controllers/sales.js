const Sale = require('../models/model-sales');
const Product = require('../models/model-products');

module.exports = {

    findAllSales: async (req, res) => {
        try {
            const data = await Sale.find({})
                .populate({
                    path: 'products.product',
                    populate: {
                        path: 'category',
                    },
                });
    
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    },
    

    findSaleById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Sale.findById(id).populate('products.product');

            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message })
        }
    },

    saveSale: async (req, res) => {
        const sale = new Sale(req.body);
    
        try {
            // Verificar si los productos existen antes de guardar la venta y comprobar el stock
            const productQuantities = req.body.products;


            let totalAmount = 0;
            for (const product of productQuantities) {
                const existingProduct = await Product.findById(product.product);
                if (!existingProduct || existingProduct.stock < product.quantity) {
                    return res.status(400).json({ "state": false, "error": "Producto no encontrado o cantidad insuficiente en stock." });
                }
    
                // Disminuir la cantidad en stock
                existingProduct.stock -= product.quantity;
                await existingProduct.save();
    
                // Calcular el monto total considerando el precio y cantidad del producto
                totalAmount += existingProduct.price * product.quantity;
            }
    
            // Asignar el totalAmount calculado a la venta
            sale.totalAmount = totalAmount;
    
            const savedSale = await sale.save();
    
            // Obtener la venta con detalles de productos y categorías
            const populatedSale = await Sale.findById(savedSale._id).populate({
                path: 'products.product',
                populate: {
                    path: 'category',
                },
            });
    
            return res.status(200).json({ "state": true, "data": populatedSale, "message": `Venta guardada: ${populatedSale._id}` });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    },        

  /*  updateSale: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedSale = await Sale.findByIdAndUpdate(id, updates, { new: true });
            
            return res.status(200).json({ "state": true, "data": updatedSale, message: `Venta actualizada: ${updatedSale.name}` });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    }*/

    findSalesByDate: async (req, res) => {
        const { date } = req.params;

        try {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1); // Incrementa la fecha en un día para obtener ventas hasta el final del día

            const data = await Sale.find({
                date: { $gte: startDate, $lt: endDate }
            }).populate('products.product');

            // Crear un objeto para almacenar la cantidad de cada producto vendido
            const productCountMap = new Map();
            data.forEach(sale => {
                sale.products.forEach(productSold => {
                    const productName = productSold.product.name;

                    // Incrementar la cantidad vendida del producto en el mapa
                    if (productCountMap.has(productName)) {
                        productCountMap.set(productName, productCountMap.get(productName) + productSold.quantity);
                    } else {
                        productCountMap.set(productName, productSold.quantity);
                    }
                });
            });

            // Convertir el mapa a un arreglo de objetos con el nombre del producto y la cantidad vendida
            const result = Array.from(productCountMap, ([productName, quantity]) => ({ productName, quantity }));

            return res.status(200).json({ "state": true, "data": result });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error, "message": error.message });
        }
    }
};
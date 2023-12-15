const productRoutes = require('express').Router();

const {
    findAllProducts,
    findProductById,
    saveProduct,
    updateProduct,
    deleteProduct 
} = require('../Controllers/products');

productRoutes.get("/", findAllProducts);
productRoutes.get("/:id", findProductById);
productRoutes.post("/", saveProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

module.exports = productRoutes;

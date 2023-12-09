const productRoutes = require('express').Router();

const {
    findAllProducts,
    findProductById,
    saveProduct,
    updateProduct
} = require('../Controllers/products');

productRoutes.get("/", findAllProducts);
productRoutes.get("/:id", findProductById);
productRoutes.post("/", saveProduct);
productRoutes.put("/:id", updateProduct);

module.exports = productRoutes;

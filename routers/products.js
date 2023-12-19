const productRoutes = require('express').Router();

const {
    findAllProducts,
    findProductById,
    saveProduct,
    updateProduct,
    deleteProduct, 
    updateProductState
} = require('../Controllers/products');

productRoutes.get("/", findAllProducts);
productRoutes.get("/:id", findProductById);
productRoutes.post("/", saveProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);
productRoutes.put("/state/:id", updateProductState);

module.exports = productRoutes;

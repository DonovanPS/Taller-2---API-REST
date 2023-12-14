const saleRoutes = require('express').Router();
const {
    findAllSales,
    findSaleById,
    saveSale,
    updateSale
} = require('../Controllers/sales');

saleRoutes.get("/", findAllSales);
saleRoutes.get("/:id", findSaleById);
saleRoutes.post("/", saveSale);
//saleRoutes.put("/:id", updateSale);

module.exports = saleRoutes;

const saleRoutes = require('express').Router();
const {
    findAllSales,
    findSaleById,
    saveSale,
    findSalesByDate,
    updateSale
} = require('../Controllers/sales');

saleRoutes.get("/", findAllSales);
saleRoutes.get("/:id", findSaleById);
saleRoutes.post("/", saveSale);
saleRoutes.get("/byDate/:date",findSalesByDate)
//saleRoutes.put("/:id", updateSale);

module.exports = saleRoutes;

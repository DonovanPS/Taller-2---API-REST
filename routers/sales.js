const saleRoutes = require('express').Router();
const {
    findAllSales,
    findSaleById,
    saveSale,
    findSalesByDate,
    updateSale,
    getMonthlyStatistics
} = require('../Controllers/sales');

saleRoutes.get("/", findAllSales);
saleRoutes.get("/:id", findSaleById);
saleRoutes.post("/", saveSale);
saleRoutes.get("/byDate/:date",findSalesByDate)
//saleRoutes.put("/:id", updateSale);
saleRoutes.get("/statistics/:month",getMonthlyStatistics)

module.exports = saleRoutes;

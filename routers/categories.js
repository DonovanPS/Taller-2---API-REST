const categoryRoutes = require('express').Router();
const {
    findAllCategories,
    findCategoryById,
    saveCategory,
    updateCategory
} = require('../Controllers/categorys');

categoryRoutes.get("/", findAllCategories);
categoryRoutes.get("/:id", findCategoryById);
categoryRoutes.post("/", saveCategory);
categoryRoutes.put("/:id", updateCategory);

module.exports = categoryRoutes;

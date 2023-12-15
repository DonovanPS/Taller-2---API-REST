const categoryRoutes = require('express').Router();
const {
    findAllCategories,
    findCategoryById,
    saveCategory,
    updateCategory,
    deleteCategory
} = require('../Controllers/categorys');

categoryRoutes.get("/", findAllCategories);
categoryRoutes.get("/:id", findCategoryById);
categoryRoutes.post("/", saveCategory);
categoryRoutes.put("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory); 

module.exports = categoryRoutes;

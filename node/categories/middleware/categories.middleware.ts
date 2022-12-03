import express from "express";
import categoriesService from "../services/categories.service";
 

 class categoriesMiddleware {
    async validateCategoryExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const category = await categoriesService.readById(req.params.categoryId);
        if (category) {
            next();
        } else {
            res.status(404).send({
                errors: [`Category ${req.params.categoryId} not found`],
            });
        }
    }
    
 }
 export default new categoriesMiddleware();
import { Application } from "express";
import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import categoriesController from "./controllers/categories.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import categoriesMiddleware from "./middleware/categories.middleware";

export class CategoriesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "CategoriesRoutes");
    }

    configureRoutes(): Application {

        this.app.route(`/categories`)
            .get(
                jwtMiddleware.validJWTNeeded,
                categoriesController.listCategories
            )
            .post(
                body("name").exists().withMessage("name required."),
                body("color").exists().matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$").withMessage("Invalid color"),
                bodyValidationMiddleware.verifyBodyFieldsErrors,
                jwtMiddleware.validJWTNeeded,
                categoriesController.createCategory
            );

        this.app.route(`/my-categories`)
            .get(
                jwtMiddleware.validJWTNeeded,
                categoriesController.getCategoriesByUserId
            );

        this.app.route(`/categories/:categoryId`)
            .all(categoriesMiddleware.validateCategoryExists, jwtMiddleware.validJWTNeeded)
            .delete(categoriesController.removeCategory)
            .get(categoriesController.getCategoryById);

        this.app.put(`/categories/:categoryId`, [
            body("name").exists().withMessage("name required."),
            body("color").matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            categoriesController.put,
        ]);

        this.app.patch(`/categories/:categoryId`, [
            body("name").optional(),
            body("color").optional(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            categoriesController.patch,
        ]);

        return this.app;
    }


}
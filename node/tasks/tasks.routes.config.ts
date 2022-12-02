import express from "express";
import { body } from "express-validator";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import tasksController from "./controllers/tasks.controller";
import tasksMiddleware from "./middleware/tasks.middleware";

export class TasksRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, "UsersRoutes");
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/tasks`)
            .get(
                jwtMiddleware.validJWTNeeded,
                tasksController.listTasks,
            )
            .post(
                body("title").exists().withMessage("title required."),
                body("startDate").isISO8601().toDate(),
                body("categoryId").exists().withMessage("category required."), // TODO: check if category is valid
                bodyValidationMiddleware.verifyBodyFieldsErrors,
                jwtMiddleware.validJWTNeeded,
                tasksController.createTask,
            );
        this.app.param(`userId`, tasksMiddleware.extractTaskId);
        this.app
            .route(`/tasks/:taskId`)
            .all(tasksMiddleware.validateTaskExists, jwtMiddleware.validJWTNeeded)
            .get(tasksController.getTaskById)
            .delete(tasksController.removeTask);
        
        return this.app;
    }

}
import express from "express";
import categoriesService from "../../categories/services/categories.service";
import tasksService from "../services/tasks.service";


class TasksMiddleware {
    async validateTaskExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const task = await tasksService.readById(req.params.taskId);
        if (task) {
            next();
        } else {
            res.status(404).send({
                errors: [`Task ${req.params.taskId} not found`],
            });
        }
    }

    async validateCategoryExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const category = await categoriesService.readById(req.body.categoryId);
        if (category) {
            next();
        } else {
            res.status(404).send({
                errors: [`Category ${req.body.categoryId} not found`],
            });
        }
    }
    
}
export default new TasksMiddleware();
import express from "express";
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
    
    async extractTaskId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.taskId;
        next();
    }
}
export default new TasksMiddleware();
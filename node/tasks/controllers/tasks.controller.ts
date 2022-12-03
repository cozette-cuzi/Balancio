import express from "express";
import debug from 'debug';
import tasksService from "../services/tasks.service";

const log: debug.IDebugger = debug('app:tasks-controller');

class TasksController {
    async listTasks(req: express.Request, res: express.Response) {
        /* TODO: implement pagination */
        const tasks = await tasksService.list(100, 0); 
        res.status(200).send(tasks);
    }

    async getTaskById(req: express.Request, res: express.Response) {
        const task = await tasksService.readById(req.params.taskId);
        res.status(200).send(task);
    }

    async getTasksByUserId(req: express.Request, res: express.Response) {
        const tasks = await tasksService.getTasksByUserId(res.locals.jwt.userId);
        res.status(200).send(tasks);
    }

    async createTask(req: express.Request, res: express.Response) {
        req.body.userId = res.locals.jwt.userId;
        const taskId = await tasksService.create(req.body);
        res.status(201).send({ id: taskId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await tasksService.patchById(req.params.taskId, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        log(await tasksService.putById(req.params.taskId, req.body));
        res.status(204).send();
    }

    async removeTask(req: express.Request, res: express.Response) {
        log(await tasksService.deleteById(req.params.taskId));
        res.status(204).send();
    }
}
export default new TasksController();
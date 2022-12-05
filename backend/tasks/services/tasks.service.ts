import { CRUD } from "../../common/interfaces/crud.interface";
import tasksDao from "../dao/tasks.dao";
import { CreateTaskDto } from "../dto/create.task.dto";
import { PutTaskDto } from "../dto/put.task.dto";

class TasksService implements CRUD {
    async list(limit: number, page: number) {
        return tasksDao.getTasks(limit, page);
    }

    async create(resource: CreateTaskDto) {
        return tasksDao.addTask(resource);
    }
    async putById(id: string, resource: PutTaskDto): Promise<any> {
        return tasksDao.updateTaskById(id, resource);
    }

    async readById(id: string) {
        return tasksDao.getTaskById(id);
    }

    async getTasksByUserId(userId: string) {
        return tasksDao.getTasksByUserId(userId);
    }

    async deleteById(id: string) {
        return tasksDao.removeTaskById(id);
    }
    async patchById(id: string, resource: PutTaskDto): Promise<any> {
        return tasksDao.updateTaskById(id, resource);
    }

}

export default new TasksService();
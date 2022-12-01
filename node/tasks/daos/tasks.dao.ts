import mongooseService from "../../common/services/mongoose.service";
import { TaskDocument } from "./task.document";
import debug from "debug";
import { CreateTaskDto } from "../dto/create.task.dto";
import { PutTaskDto } from "../dto/put.task.dto";
import { PatchTaskDto } from "../dto/patch.task.dto";

const log: debug.IDebugger = debug("app:tasks-dao");

class TasksDao {

    Schema = mongooseService.getMongoose().Schema;

    mongoose = mongooseService.getMongoose();

    taskSchema = new this.Schema(
        {
            _id: String,
            title: String,
            details: String,
            startDate: Date,
            endDate: Date,
            done: Boolean,
            userId: String,
            categoryId: String,
        },
        { id: false }
    );

    Task = mongooseService
        .getMongoose()
        .model<TaskDocument>("Tasks", this.taskSchema);

    constructor() {
        log("Created new instance of TasksDao");
    }

    async addTask(taskFields: CreateTaskDto) {
        const taskId = new this.mongoose.Types.ObjectId();
        const task = new this.Task({
            _id: taskId,
            ...taskFields,
        });
        await task.save();
        return taskId;
    }

    getTaskById(id: string) {
        return this.Task.findOne({ _id: id })
            .exec();
    }

    async getTasksByUserId(userId: String, limit = 25, page = 0) {
        return this.Task.find({ userId: userId })
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getTasks(limit = 25, page = 0) {
        return this.Task.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async updateTaskById(taskId: string, taskFields: PatchTaskDto | PutTaskDto) {
        const existingTask = await this.Task.findOneAndUpdate(
            { _id: taskId },
            { $set: taskFields },
            { new: true }
        ).exec();

        return existingTask;
    }

    async removeTaskById(taskId: string) {
        return this.Task.deleteOne({ _id: taskId }).exec();
    }
}

export default new TasksDao();
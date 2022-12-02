import mongoose from "mongoose";

interface TaskDocument extends mongoose.Document {
    title: string;
    details?: string;
    startDate: Date;
    endDate?: Date;
    done: boolean;
    userId: string;
    categoryId: string
}

export { TaskDocument };

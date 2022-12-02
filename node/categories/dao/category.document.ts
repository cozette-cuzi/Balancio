import mongoose from "mongoose";

interface CategoryDocument extends mongoose.Document {
    name: string;
    color: string;
    userId: string;
}

export { CategoryDocument };
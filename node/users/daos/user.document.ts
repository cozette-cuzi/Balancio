import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
    [x: string]: any;
    email: String,
    password: { type: String, select: false },
    name: String,
}

export { UserDocument };

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "titulo es requerido"],
        },
        completed: {
            type: Boolean,
            default:false,
        },
        user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
                },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
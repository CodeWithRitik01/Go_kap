import mongoose, {Schema, Types} from "mongoose";

const taskSchema = new Schema({
    title:{
        type:String,
    },
    description: {
        type: String
    },
    status:{
        type:String,  
        default: "Todo",
        enum: ["Todo", "In Progress", "Done"]
    },
    priority:{
        type:String
    },
    due_date:{
        type: Date
    },
    user:{
        type: Types.ObjectId,
        ref:"User",
    }
}, {
    timestamps:true
})



export const Task = mongoose.model("Task", taskSchema);
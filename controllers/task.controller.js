import { Task } from "../models/task.js";

const createTask = async(req, res, next) =>{
    try {
        const { title, description, priority, due_date } = req.body;
        const userId = req.user;
        const task = await Task.create({ title, description, priority, due_date, user:userId});
        
        return res.status(201).json({
            success: true,
            message:"Task created successfully",
            task

        })
    } catch (error) {
        return res.status(404).json(error)
    }
}

const getTasks = async(req, res, next) =>{
    try {
        const tasks = await Task.find({user:req.user});
        const {status, priority, due_date} = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = 5;

        const skip = (page-1) * limit;

        if(tasks.length == 0){
            return next(res.status(201).json("No task in you list"))
        }

        let filteredTask = tasks;

        if(status){
            filteredTask = tasks.filter(element => element.status == status)
        }
        
        if(priority){
            filteredTask = tasks.filter(element => element.priority == priority)
        }

        if(due_date){
            const dueDate = new Date(due_date);
            console.log(dueDate)
            filteredTask = tasks.filter(element => element.due_date <= dueDate)
        }

        filteredTask = filteredTask.slice(skip, skip + limit);
        const totalPages = Math.ceil(tasks.length / limit)

        return res.status(201).json({
            success: true,
            message:"Task retrieved successfully",
            pageNo : page,
            totalPages,
            filteredTask

        })
    } catch (error) {
        return res.status(404).json(error)
    }
}

const updateTask = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const {title, description, status, priority} = req.body;

        const task = await Task.findOne({_id:id});

        if(!task){
            return next(res.status(400).json("Task not found"))
        }

        if(task.user != req.user){
            return next(res.status(400).json("You are not authorized to update"))

        }

        if(title){
            task.title = title;
        }
        if(description){
            task.description = description;
        }
        if(status){
            task.status = status;
        }
        if(priority){
            task.priority = priority;
        }

        await task.save();
        
        return res.status(201).json({
            success: true,
            message:"Task updated successfully",
            task

        })
    } catch (error) {
        return res.status(404).json(error)
    }
}

const deleteTask = async(req, res, next) =>{
    try {
        const {id} = req.params;

        const task = await Task.findOne({_id:id});

        if(!task){
            return next(res.status(400).json("Task not found"))
        }

        if(task.user != req.user){
            return next(res.status(400).json("You are not authorized to delete this task"))

        }

        await Task.deleteOne({_id:id});
        

        return res.status(201).json({
            success: true,
            message:"Task deleted successfully",

        })
    } catch (error) {
        return res.status(404).json(error)
    }
}

const searchTask = async(req, res, next) =>{
    try {
        const tasks = await Task.find({user:req.user});
        const {title} = req.body;

        if(tasks.length == 0){
            return next(res.status(201).json("No task in you list"))
        }

        let filteredTask = tasks.filter(element => element.title == title)

        return res.status(201).json({
            success: true,
            message:"Task retrieved successfully",
            filteredTask

        })
    } catch (error) {
        return res.status(404).json(error)
    }
}

export {createTask, getTasks, updateTask, deleteTask, searchTask}
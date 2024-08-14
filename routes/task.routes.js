import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { createTask, deleteTask, getTasks, searchTask, updateTask } from "../controllers/task.controller.js";

const app = express.Router();

app.use(isAuthenticated)

app.get("/tasks", getTasks)
app.post("/tasks", createTask);
app.put("/tasks/:id", updateTask)
app.delete("/tasks/:id", deleteTask)
app.get("/tasks/search", searchTask)

export default app;
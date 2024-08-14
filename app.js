import "./env.js";

import express from "express";
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger-output.json" assert {type:'json'}

import { connectDb } from "./dbConfig.js";

import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"

import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGOURL;

connectDb(mongoUrl);

const app = express();
app.use(cookieParser())
app.use(express.json());


app.use("/api", userRoutes)
app.use("/api", taskRoutes)


app.get("/", (req, res) =>{
    res.send("hello")
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})
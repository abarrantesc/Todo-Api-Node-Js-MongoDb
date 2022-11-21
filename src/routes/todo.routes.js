import express from "express";
import todoController from "../controller/todo.controller.js";

const todoRouter = express.Router();


todoRouter.post("/createTask",todoController.createTask)
todoRouter.get("/getAllTask",todoController.getAllTask)
todoRouter.get("/getTaskById/:idTask",todoController.getTaskById)
todoRouter.delete("/deleteTask/:idTask",todoController.deleteTask)
todoRouter.put("/updateTask",todoController.updateTask)
todoRouter.post("/addCommentTask",todoController.addCommentTask)
todoRouter.put("/updateCommentTask",todoController.updateCommentTask)
todoRouter.post("/deleteCommentTask",todoController.deleteCommentTask)

export default todoRouter;
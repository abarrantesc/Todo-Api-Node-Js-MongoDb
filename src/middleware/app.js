import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "../routes/todo.routes.js";
const app = express();


app.set("port", process.env.PORT || 3000);


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/apiV1/todo",router)


export default app;
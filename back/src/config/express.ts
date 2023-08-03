import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import newsRoutes from "../routes/newsRoutes";
import commentRoutes from "../routes/commentRoutes";
import authRoutes from "../routes/authRoutes";
import session from "express-session";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/news", newsRoutes);
app.use("/comments", commentRoutes);
app.use("/auth", authRoutes);

export default app;

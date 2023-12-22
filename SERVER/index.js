import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import helmet from "helmet";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import User from "./models/user.js";
import Post from "./models/post.js";
import {users ,posts} from "./data/index.js";

/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* ROUTES WITH FILES*/

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", upload.single("picture"), verifyToken, createPost);
/* ROUTES WITHOUT FILES */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);




/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        //ADD DATA ONE TIME */

    })
    .catch((err) => console.error(err));

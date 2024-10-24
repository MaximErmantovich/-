// npm run start
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  registerValidation,
  loginValidation,
  carCreateValidation,
} from "./validations.js";
import { UserController, CarController } from "./controllers/index.js";
import { handleValidationErrors, checkAuth, checkRole } from "./utils/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose
  .connect("mongodb+srv://admin:admin123@cluster0.etn108z.mongodb.net/blog")
  .then(() => console.log("БД подключена успешно"))
  .catch((err) => console.log("Ошибка в подключении БД", err));

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json()); //читать json http-запросы
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/cars", carCreateValidation, CarController.create);
app.get("/cars", CarController.getAll);
app.get("/cars/:name", CarController.getOne);
app.post("/cars/:name", CarController.remove);
app.post(
  "/cars/change/:name",
  handleValidationErrors,
  carCreateValidation,
  CarController.update
);
app.get("/cars/sort/:sortBy", CarController.sort);

app.get("/main", (req, res) => {
  res.sendFile("pages/main.html", { root: path.resolve(__dirname) });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Сервер запущен успешно");
});

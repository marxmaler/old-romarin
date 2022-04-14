import "dotenv/config";
import "./db";
import "./models/Word";
import "./models/User";
import express, { Request, Response } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import path from "path";
import apiRouter from "./router/apiRouter";
import helmet from "helmet";

const app = express();
const buildAddress = path.join(__dirname, "..", "client/build/");

//전역 middleware 선언부
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET + "",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use("/api", apiRouter);

app.use(express.static(buildAddress));

app.get("*", (req: Request, res: Response) => {
  return res.sendFile(buildAddress + "index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 4000🛡️
  ################################################
`);
});

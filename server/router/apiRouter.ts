import express from "express";
import { postJoin, postLogin, getLogout } from "../controllers/userController";
import { postAddWord, getWordsToReview } from "../controllers/wordController";
import { mustLogin, mustNotLogin } from "../middlewares";

const apiRouter = express.Router();

apiRouter.route("/user/login").all(mustNotLogin).post(postLogin);
apiRouter.route("/user/logout").all(mustLogin).get(getLogout);
apiRouter.route("/user/join").all(mustNotLogin).post(postJoin);
apiRouter.route("/word/add").all(mustLogin).post(postAddWord);
apiRouter.route("/word/review/:date").all(mustLogin).get(getWordsToReview);

export default apiRouter;

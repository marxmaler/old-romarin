import express from "express";
import { postJoin, postLogin } from "../controllers/userController";
import { postAddWord, getWordsToReview } from "../controllers/wordController";

const apiRouter = express.Router();

apiRouter.route("/user/login").post(postLogin);
apiRouter.route("/user/join").post(postJoin);
apiRouter.route("/word/add").post(postAddWord);
apiRouter.route("/word/review/:date").get(getWordsToReview);

export default apiRouter;

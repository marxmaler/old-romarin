import express from "express";
import { postJoin, postLogin, getLogout } from "../controllers/userController";
import {
  postWord,
  getWords,
  patchGradedWords,
  putWords,
  getMatchedWords,
} from "../controllers/wordController";
import { mustLogin, mustNotLogin } from "../middlewares";

const apiRouter = express.Router();

apiRouter.route("/users/login").all(mustNotLogin).post(postLogin);
apiRouter.route("/users/logout").all(mustLogin).get(getLogout);
apiRouter.route("/users/join").all(mustNotLogin).post(postJoin);
apiRouter
  .route("/words")
  .all(mustLogin)
  .post(postWord)
  .put(putWords)
  .patch(patchGradedWords);
apiRouter
  .route("/words/:userId/:queryBasis/:query")
  .all(mustLogin)
  .get(getMatchedWords);
apiRouter.route("/words/:userId/:date").all(mustLogin).get(getWords);

export default apiRouter;

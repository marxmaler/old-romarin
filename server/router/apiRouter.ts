import express from "express";
import {
  postJoin,
  postLogin,
  getLogout,
  getUser,
  getGithubLogin,
  postGithubAuthLogin,
} from "../controllers/userController";
import {
  postWord,
  getWords,
  patchGradedWords,
  putWords,
  getMatchedWords,
  getWeeklyWords,
} from "../controllers/wordController";
import { mustLogin, mustNotLogin } from "../middlewares";

const apiRouter = express.Router();

apiRouter.route("/users/login").all(mustNotLogin).post(postLogin);
apiRouter
  .route("/users/login/github")
  .all(mustNotLogin)
  .get(getGithubLogin)
  .post(postGithubAuthLogin);

apiRouter.route("/users/logout").all(mustLogin).get(getLogout);
apiRouter.route("/users/join").all(mustNotLogin).post(postJoin);
apiRouter.route("/users/:userId").all(mustLogin).get(getUser);
apiRouter
  .route("/words")
  .all(mustLogin)
  .post(postWord)
  .put(putWords)
  .patch(patchGradedWords);
apiRouter.route("/words/weekly/:date").all(mustLogin).get(getWeeklyWords);
apiRouter.route("/words/:userId/:date").all(mustLogin).get(getWords);
apiRouter
  .route("/words/:userId/:langNum/:queryBasis/:query")
  .all(mustLogin)
  .get(getMatchedWords);

export default apiRouter;

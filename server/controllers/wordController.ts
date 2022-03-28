import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { getRegRev, getZeroTime } from "../functions/time";
import User from "../models/User";
import Word from "../models/Word";

export const postWord = async (req: Request, res: Response) => {
  const {
    today,
    lang,
    data: {
      spelling: rawSpelling,
      pronunciation: rawPronunciation,
      meaning: rawMeaning,
      collocation: rawCol,
      association: rawAss,
      ex: rawEx,
      syn: rawSyn,
      ant: rawAnt,
    },
  } = req.body;

  const userId = req.session.user?._id;

  const collocation =
    rawCol !== ""
      ? String(rawCol)
          .split(",")
          .map((col) => {
            const trimmedWord = col.trim();
            if (trimmedWord.length > 0) {
              return trimmedWord;
            }
          })
      : [];
  const syn =
    rawSyn !== ""
      ? String(rawSyn)
          .split(",")
          .map((syn) => {
            const trimmedWord = syn.trim();
            if (trimmedWord.length > 0) {
              return trimmedWord;
            }
          })
      : [];
  const ant =
    rawAnt !== ""
      ? String(rawAnt)
          .split(",")
          .map((ant) => {
            const trimmedWord = ant.trim();
            if (trimmedWord.length > 0) {
              return trimmedWord;
            }
          })
      : [];

  const spelling = rawSpelling.trim();
  const pronunciation = rawPronunciation.trim();
  const meaning = rawMeaning.trim();
  const association = rawAss.trim();
  const ex = rawEx.trim();

  let ltmsPoint = 0;
  ltmsPoint += collocation.length > 0 ? 10 : 0;
  ltmsPoint += association !== "" ? 50 : 0;
  ltmsPoint += ex !== "" ? 20 : 0;
  ltmsPoint += syn.length > 0 ? 10 : 0;
  ltmsPoint += ant.length > 0 ? 10 : 0;

  const regRev = getRegRev(new Date(today));
  const addedAt = getZeroTime(new Date(today));
  const newWord = await Word.create({
    user: userId,
    lang,
    spelling,
    pronunciation,
    meaning,
    collocation,
    association,
    ex,
    syn,
    ant,
    regRev,
    ltmsPoint,
    addedAt,
  });
  const user = await User.findById(userId);
  if (user) {
    lang === "English"
      ? (user.stat.En.total += 1)
      : lang === "Español"
      ? (user.stat.Es.total += 1)
      : lang === "Français"
      ? (user.stat.Fr.total += 1)
      : lang === "Deutsch"
      ? (user.stat.De.total += 1)
      : lang === "日本語"
      ? (user.stat.Jp.total += 1)
      : lang === "中文"
      ? (user.stat.Ch.total += 1)
      : (user.stat.Ru.total += 1);
  }
  user?.save();

  console.log(newWord);
  return res.sendStatus(200);
};

export const getWords = async (req: Request, res: Response) => {
  const today = new Date(req.params.date);
  const userId = req.params.userId;

  const words = userId
    ? await Word.find({
        user: userId,
        $or: [
          {
            regRev: { $lte: today },
          },
          { wrong: true },
        ],
      })
    : [];
  return res.status(200).send({ words });
};

export interface IWord {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  lang: string;
  spelling: string;
  pronunciation: string;
  meaning: string;
  collocation?: string[];
  association?: string;
  ex?: string;
  syn?: string[];
  ant?: string[];
  regRev?: Date[]; //정규 복습 스케쥴
  wrong: boolean;
  ltmsPoint: number;
  addedAt: Date;
}

export interface ITestResult {
  wordId: string;
  wrong: boolean;
  wrongAnswer: string;
  originalWord: IWord;
}

export const patchGradedWords = (req: Request, res: Response) => {
  const testResults: ITestResult[] = req.body;
  console.log(testResults);
  testResults.forEach(async (testResult) => {
    const { wordId, wrong } = testResult;
    const word = await Word.findById(wordId);
    if (word && wrong) {
      word.wrong = wrong;
    } else if (word && !wrong) {
      word.wrong ? (word.wrong = wrong) : word.regRev?.splice(0, 1);
    }
    word?.save();
    console.log(word);
  });
  return res.sendStatus(200);
};

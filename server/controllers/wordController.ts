import { Request, Response, NextFunction } from "express";

import { getRegRev, getZeroTime } from "../functions/time";
import {
  getLtmsPoint,
  getNthRev,
  getStatLang,
  stringToArray,
} from "../functions/word";
import { ITestResult } from "../interfaces/interfaces";
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

  const [collocation, syn, ant] = [rawCol, rawSyn, rawAnt].map((raw) =>
    stringToArray(raw)
  );

  const [spelling, pronunciation, meaning, association, ex] = [
    rawSpelling,
    rawPronunciation,
    rawMeaning,
    rawAss,
    rawEx,
  ].map((raw) => raw.trim());

  const ltmsPoint = getLtmsPoint({ collocation, association, ex, syn, ant });

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
    const statLang = getStatLang(lang);
    user.stat[statLang].total += 1;
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

export const getMatchedWords = async (req: Request, res: Response) => {
  const { userId, query, queryBasis } = req.params;

  const words = userId
    ? await Word.find({
        user: userId,
        $or: [
          {
            [queryBasis]: { $regex: query },
          },
        ],
      })
    : [];
  return res.status(200).send({ words });
};

export const patchGradedWords = (req: Request, res: Response) => {
  const testResults: ITestResult[] = req.body;

  testResults.forEach(async (testResult) => {
    const { wordId, wrong } = testResult;
    const word = await Word.findById(wordId);
    if (word && wrong) {
      //문제를 틀렸음
      word.wrong = wrong;
    } else if (word && !wrong) {
      //문제를 맞췄음
      if (word.wrong) {
        //이미 틀린 적 있는 단어일 때
        word.wrong = wrong;
      } else {
        word.regRev?.splice(0, 1);
        const nthRev = getNthRev(word.regRev);
        const statLang = getStatLang(word.lang);
        const user = await User.findById(word.user);

        if (user) {
          nthRev === "twice"
            ? (user.stat[statLang].once -= 1)
            : nthRev === "threeTimes"
            ? (user.stat[statLang].twice -= 1)
            : nthRev === "fourTimes"
            ? (user.stat[statLang].threeTimes -= 1)
            : null;
          user.stat[statLang][nthRev] += 1;
        }

        console.log(user);
      }
    }
    word?.save();
    if (word?.regRev?.length === 0) {
      await Word.deleteOne({ _id: word._id });
    }

    // console.log(word);
  });
  return res.sendStatus(200);
};

export const putWords = async (req: Request, res: Response) => {
  const {
    data: {
      lang,
      spelling: rawSpelling,
      pronunciation: rawPronunciation,
      meaning: rawMeaning,
      collocation: rawCol,
      association: rawAss,
      ex: rawEx,
      syn: rawSyn,
      ant: rawAnt,
    },
    wordId,
  } = req.body;

  const [collocation, syn, ant] = [rawCol, rawSyn, rawAnt].map((raw) =>
    stringToArray(raw)
  );

  const [spelling, pronunciation, meaning, association, ex] = [
    rawSpelling,
    rawPronunciation,
    rawMeaning,
    rawAss,
    rawEx,
  ].map((raw) => raw.trim());

  const ltmsPoint = getLtmsPoint({ collocation, association, ex, syn, ant });

  const oldWord = await Word.findById(wordId);
  const oldLang = oldWord?.lang;

  const updatedWord = await Word.findByIdAndUpdate(
    wordId,
    {
      lang,
      spelling,
      pronunciation,
      meaning,
      collocation,
      association,
      ex,
      syn,
      ant,
      ltmsPoint,
    },
    { new: true }
  );

  if (updatedWord && oldLang && oldLang !== lang) {
    const user = await User.findById(updatedWord?.user);
    const nthRev = getNthRev(updatedWord.regRev);

    const oldStatLang = getStatLang(oldLang);
    const newStatLang = getStatLang(updatedWord.lang);

    if (user) {
      nthRev === "once"
        ? (user.stat[oldStatLang].once -= 1)
        : nthRev === "twice"
        ? (user.stat[oldStatLang].twice -= 1)
        : nthRev === "threeTimes"
        ? (user.stat[oldStatLang].threeTimes -= 1)
        : null;
      user.stat[newStatLang][nthRev] += 1;

      user.stat[oldStatLang].total -= 1;
      user.stat[newStatLang].total += 1;
    }
    user?.save();
  }

  console.log(updatedWord);
  return res.status(200).send({ word: updatedWord });
};

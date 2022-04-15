import { Request, Response, NextFunction } from "express";

import { getEightDaysAgo, getRegRev, getZeroTime } from "../util/time";
import {
  getLtmsPoint,
  getNthRev,
  getlangFomLanguage,
  stringToArray,
  languages,
} from "../util/word";
import { ITestResult } from "../interfaces/interfaces";
import User from "../models/User";
import Word from "../models/Word";

// GET Methods

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
  const { userId, langNum, query, queryBasis } = req.params;

  const language =
    Number(langNum) === 0 ? null : languages[Number(langNum) - 1];

  const filter = language
    ? {
        user: userId,
        language,
        [queryBasis]: { $regex: query },
      }
    : {
        user: userId,
        [queryBasis]: { $regex: query },
      };

  const words = userId ? await Word.find(filter) : [];
  return res.status(200).send({ words });
};

export const getWeeklyWords = async (req: Request, res: Response) => {
  const { date } = req.params;

  // 이러지 말고 1주일 치 단어를 한꺼번에 find로 가져오기, 가져오고 addedAt으로 프론트 쪽에서 솎아도 됨
  const weeklyWords = await Word.find({
    addedAt: { $gte: getEightDaysAgo(new Date(date)), $lte: new Date(date) },
  });

  // console.log(weeklyWords);
  // console.log(weeklyWords.length);
  return res.status(200).send({
    result: weeklyWords,
  });
};

// POST Methods

export const postWord = async (req: Request, res: Response) => {
  const {
    today,
    language,
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
    language,
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
    const statLang = getlangFomLanguage(language);
    user.stat[statLang].total += 1;
  }
  user?.save();

  console.log(newWord);
  return res.sendStatus(200);
};

// PATCH Methods

export const patchGradedWords = async (req: Request, res: Response) => {
  const testResults: ITestResult[] = req.body;

  for (let i = 0; i < testResults.length; i++) {
    const { wordId, wrong } = testResults[i];
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
        console.log(`${word.spelling}의 regRev:${word.regRev}`);
        word.regRev?.splice(0, 1);
        console.log(`${word.spelling}의 regRev:${word.regRev}`);
        const nthRev = getNthRev(word.regRev);
        console.log("nthRev:", nthRev);
        const statLang = getlangFomLanguage(word.language);
        const user = await User.findById(word.user);
        console.log("조작 전:", user?.stat[statLang]);
        if (user) {
          if (
            nthRev === "twice" ||
            nthRev === "threeTimes" ||
            nthRev === "fourTimes"
          ) {
            nthRev === "twice"
              ? (user.stat[statLang].once -= 1)
              : nthRev === "threeTimes"
              ? (user.stat[statLang].twice -= 1)
              : nthRev === "fourTimes"
              ? (user.stat[statLang].threeTimes -= 1)
              : null;
          }
          if (nthRev !== "never") {
            user.stat[statLang][nthRev] += 1;
            user.save();
          }
        }
        console.log("조작 후:", user?.stat[statLang]);
      }
    }
    word?.save();
    if (word?.regRev?.length === 0) {
      await Word.deleteOne({ _id: word._id });
    }
  }

  // console.log(word);

  return res.sendStatus(200);
};

// PUT Methods

export const putWords = async (req: Request, res: Response) => {
  const {
    data: {
      language,
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
  const oldLanguage = oldWord?.language;

  const updatedWord = await Word.findByIdAndUpdate(
    wordId,
    {
      language,
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

  if (updatedWord && oldLanguage && oldLanguage !== language) {
    const user = await User.findById(updatedWord?.user);
    const nthRev = getNthRev(updatedWord.regRev);

    const oldStatLang = getlangFomLanguage(oldLanguage);
    const newStatLang = getlangFomLanguage(updatedWord.language);

    if (user) {
      if (nthRev === "once" || nthRev === "twice" || nthRev === "threeTimes") {
        user.stat[oldStatLang][nthRev] -= 1;
        user.stat[newStatLang][nthRev] += 1;
      }

      user.stat[oldStatLang].total -= 1;
      user.stat[newStatLang].total += 1;
    }
    user?.save();
  }

  console.log(updatedWord);
  return res.status(200).send({ word: updatedWord });
};

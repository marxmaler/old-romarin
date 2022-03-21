import { Request, Response, NextFunction } from "express";
import { getRegRev } from "../functions/time";
import Word from "../models/Word";

export const postAddWord = async (req: Request, res: Response) => {
  const {
    today,
    data: { spelling, meaning, syn: rawSyn, ant: rawAnt },
  } = req.body;

  const syn = String(rawSyn)
    .split(",")
    .map((syn) => syn.trim());
  const ant = String(rawAnt)
    .split(",")
    .map((ant) => ant.trim());

  const regRev = getRegRev(new Date(today));
  const newWord = await Word.create({
    spelling,
    meaning,
    syn,
    ant,
    regRev,
  });
  console.log(newWord);
  return res.sendStatus(200);
};

export const getWordsToReview = async (req: Request, res: Response) => {
  const today = new Date(req.params.date);
  const words = await Word.find({
    $or: [
      {
        regRev: { $lte: today },
      },
      { wrong: true },
    ],
  });
  return res.status(200).send({ words });
};

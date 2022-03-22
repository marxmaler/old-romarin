import { Request, Response, NextFunction } from "express";
import { getRegRev } from "../functions/time";
import Word from "../models/Word";

export const postWord = async (req: Request, res: Response) => {
  const {
    today,
    data: { spelling, meaning, syn: rawSyn, ant: rawAnt },
  } = req.body;

  const userId = req.session.user?._id;

  const syn = String(rawSyn)
    .split(",")
    .map((syn) => syn.trim());
  const ant = String(rawAnt)
    .split(",")
    .map((ant) => ant.trim());

  const regRev = getRegRev(new Date(today));
  const newWord = await Word.create({
    user: userId,
    spelling,
    meaning,
    syn,
    ant,
    regRev,
  });
  console.log(newWord);
  return res.sendStatus(200);
};

export const getWords = async (req: Request, res: Response) => {
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

import { Types } from "mongoose";

export interface IWord {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  language: string;
  spelling: string;
  pronunciation: string;
  meaning: string;
  collocation: string[];
  association: string;
  ex: string;
  syn: string[];
  ant: string[];
  regRev: Date[]; //정규 복습 스케쥴
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

export interface IGetLtmsPointProps {
  collocation: (string | undefined)[];
  association: string;
  ex: string;
  syn: (string | undefined)[];
  ant: (string | undefined)[];
}

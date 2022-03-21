import { atom } from "recoil";
import { Types } from "mongoose";

export interface IWord {
  spelling: string;
  meaning: string;
  regRev?: Date[];
  wrong: boolean;
  syn?: string[];
  ant?: string[];
}

export const wordsState = atom<IWord[]>({
  key: "words",
  default: [],
});

interface User {
  email: string;
  name: string;
  password: string;
  socialOnly: boolean;
  words?: Types.ObjectId[];
}

interface ILogIn {
  loggedIn: boolean;
  user: User | null;
}

export const loginState = atom<ILogIn>({
  key: "login",
  default: {
    loggedIn: false,
    user: null,
  },
});

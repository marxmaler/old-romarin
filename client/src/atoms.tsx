import { atom } from "recoil";
import { Types } from "mongoose";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface IWord {
  user: Types.ObjectId;
  spelling: string;
  meaning: string;
  regRev?: Date[]; //정규 복습 스케쥴
  wrong: boolean;
  syn?: string[];
  ant?: string[];
}

export const wordState = atom<IWord[]>({
  key: "words",
  default: [],
  effects_UNSTABLE: [persistAtom],
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
  effects_UNSTABLE: [persistAtom],
});

import { atom } from "recoil";
import { Types } from "mongoose";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
}

export const wordState = atom<IWord[]>({
  key: "words",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

interface User {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  socialOnly: boolean;
  stat: {
    En: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Es: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Fr: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    De: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Jp: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Ch: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Ru: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
  };
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

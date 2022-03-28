import { atom, selector } from "recoil";
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
  collocation: string[];
  association: string;
  ex: string;
  syn: string[];
  ant: string[];
  regRev?: Date[]; //정규 복습 스케쥴
  wrong: boolean;
  ltmsPoint: number;
  addedAt: Date;
}

export const wordsState = atom<IWord[]>({
  key: "words",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const wordsSelector = selector({
  key: "wordsSelector",
  get: ({ get }) => {
    const words = get(wordsState);
    const lang = get(languageState);
    return words.filter((word) => lang === "All" || word.lang === lang);
  },
});

export const synSelector = selector({
  key: "synSelector",
  get: ({ get }) => {
    const words = get(wordsState);
    const lang = get(languageState);
    const wordsWithSyn = words
      .filter((word) => word.lang === lang && word.syn && word.syn.length > 0)
      .map((word) => word);

    let syn: string[] = [];
    if (wordsWithSyn.length > 0) {
      wordsWithSyn.forEach((word) => {
        if (word.syn) syn = [...syn, ...word.syn];
      });
    }
    return syn;
  },
});

export const antSelector = selector({
  key: "antSelector",
  get: ({ get }) => {
    const words = get(wordsState);
    const lang = get(languageState);
    const wordsWithAnt = words
      .filter((word) => word.lang === lang && word.ant && word.ant.length > 0)
      .map((word) => word);

    let ant: string[] = [];
    if (wordsWithAnt.length > 0) {
      wordsWithAnt.forEach((word) => {
        if (word.ant) ant = [...ant, ...word.ant];
      });
    }
    return ant;
  },
});

export const colSelector = selector({
  key: "colSelector",
  get: ({ get }) => {
    const words = get(wordsState);
    const lang = get(languageState);
    const wordsWithCol = words
      .filter(
        (word) =>
          word.lang === lang && word.collocation && word.collocation.length > 0
      )
      .map((word) => word);

    let col: string[] = [];
    if (wordsWithCol.length > 0) {
      wordsWithCol.forEach((word) => {
        if (word.collocation) col = [...col, ...word.collocation];
      });
    }
    return col;
  },
});

export const languageState = atom<string>({
  key: "languages",
  default: "English",
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

export interface ITestSetting {
  numQ: number;
  selectedWords: IWord[];
}

export const testSettingState = atom<ITestSetting>({
  key: "testSetting",
  default: {
    numQ: 0,
    selectedWords: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export interface ITestResult {
  wordId: string;
  wrong: boolean;
  myAnswer: string;
  originalWord: IWord;
}

export const testResultsState = atom<ITestResult[]>({
  key: "testResults",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ILogIn, ITestResult, ITestSetting, IWord } from "./interfaces";
import { getZeroTime } from "./util/time";

const { persistAtom } = recoilPersist();

export const wordsState = atom<IWord[]>({
  key: "words",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const wordsSelector = selector({
  key: "wordsSelector",
  get: ({ get }) => {
    const words = get(wordsState);
    const language = get(languageState);
    return words.filter(
      (word) => language === "All" || word.language === language
    );
  },
});

export const synSelector = selector({
  key: "synSelector",
  get: ({ get }) => {
    const words = get(wordsState);
    const language = get(languageState);
    const wordsWithSyn = words
      .filter(
        (word) => word.language === language && word.syn && word.syn.length > 0
      )
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
    const language = get(languageState);
    const wordsWithAnt = words
      .filter(
        (word) => word.language === language && word.ant && word.ant.length > 0
      )
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
    const language = get(languageState);
    const wordsWithCol = words
      .filter(
        (word) =>
          word.language === language &&
          word.collocation &&
          word.collocation.length > 0
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
  key: "language",
  default: "English",
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom<ILogIn>({
  key: "login",
  default: {
    loggedIn: false,
    user: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const testSettingState = atom<ITestSetting>({
  key: "testSetting",
  default: {
    numQ: 0,
    selectedWords: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const enTestWordSelector = selector({
  key: "enTestWordSelector",
  get: ({ get }) => {
    const { selectedWords } = get(testSettingState);
    return selectedWords.filter((word) => word.language === "English");
  },
});

export const esTestWordSelector = selector({
  key: "esTestWordSelector",
  get: ({ get }) => {
    const { selectedWords } = get(testSettingState);
    return selectedWords.filter((word) => word.language === "Español");
  },
});

export const frTestWordSelector = selector({
  key: "frTestWordSelector",
  get: ({ get }) => {
    const { selectedWords } = get(testSettingState);
    return selectedWords.filter((word) => word.language === "Français");
  },
});

export const deTestWordSelector = selector({
  key: "deTestWordSelector",
  get: ({ get }) => {
    const { selectedWords } = get(testSettingState);
    return selectedWords.filter((word) => word.language === "Deutsch");
  },
});

export const jpTestWordSelector = selector({
  key: "jpTestWordSelector",
  get: ({ get }) => {
    const { selectedWords } = get(testSettingState);
    return selectedWords.filter((word) => word.language === "日本語");
  },
});

export const chTestWordSelector = selector({
  key: "chTestWordSelector",
  get: ({ get }) => {
    const { selectedWords } = get(testSettingState);
    return selectedWords.filter((word) => word.language === "中文");
  },
});

export const ruTestWordSelector = selector({
  key: "ruTestWordSelector",
  get: ({ get }) => {
    const { selectedWords } = get(testSettingState);
    return selectedWords.filter((word) => word.language === "Русский");
  },
});

export const testResultsState = atom<ITestResult[]>({
  key: "testResults",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const weeklyWordsState = atom<IWord[]>({
  key: "weeklyWords",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const weeklyWordsBeforeTodaySelector = selector({
  key: "weeklyWordsBeforeTodaySelector",
  get: ({ get }) => {
    const weeklyWords = get(weeklyWordsState);
    if (weeklyWords.length > 0) {
      return weeklyWords.filter(
        (word) => new Date(word.addedAt).getDate() !== getZeroTime().getDate()
      );
    } else {
      return [];
    }
  },
});

export const weeklyWordsCntState = atom<number[]>({
  key: "weeklyWordsCnt",
  default: [0, 0, 0, 0, 0, 0, 0, 0],
});

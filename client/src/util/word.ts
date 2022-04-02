import { ILanguageWords, ILanguageWordsCnt, IWord } from "../interfaces";

export const koPropToEnProp = (koProp: string) => {
  const enProp =
    koProp === "철자"
      ? "spelling"
      : koProp === "뜻"
      ? "meaning"
      : koProp === "유의어"
      ? "syn"
      : "ant";
  return enProp;
};

export const getStringifiedArrayProps = (word: IWord) => {
  let stringifiedCol = "";
  let stringifiedSyn = "";
  let stringifiedAnt = "";
  word.collocation.length > 0 &&
    word.collocation.forEach((col, index) => {
      index !== word.collocation.length - 1
        ? (stringifiedCol += col + ", ")
        : (stringifiedCol += col);
    });
  word.syn.length > 0 &&
    word.syn.forEach((syn, index) => {
      index !== word.syn.length - 1
        ? (stringifiedSyn += syn + ", ")
        : (stringifiedSyn += syn);
    });
  word.ant.length > 0 &&
    word.ant.forEach((ant, index) => {
      index !== word.ant.length - 1
        ? (stringifiedAnt += ant + ", ")
        : (stringifiedAnt += ant);
    });

  return { stringifiedCol, stringifiedSyn, stringifiedAnt };
};

export const getLanguageWordsAndCntArr = (
  words: IWord[],
  eightDateArr: Date[]
) => {
  const languageWords: ILanguageWords = {
    En: [],
    Es: [],
    Fr: [],
    De: [],
    Jp: [],
    Ch: [],
    Ru: [],
  };

  words.forEach((word) => {
    word.language === "English"
      ? languageWords.En.push(word)
      : word.language === "Español"
      ? languageWords.Es.push(word)
      : word.language === "Français"
      ? languageWords.Fr.push(word)
      : word.language === "Deutsch"
      ? languageWords.De.push(word)
      : word.language === "日本語"
      ? languageWords.Jp.push(word)
      : word.language === "中文"
      ? languageWords.Ch.push(word)
      : languageWords.Ru.push(word);
  });

  // console.log("languageWords:", languageWords);

  const languageWordsCnt: ILanguageWordsCnt = {
    En: [0, 0, 0, 0, 0, 0, 0, 0],
    Es: [0, 0, 0, 0, 0, 0, 0, 0],
    Fr: [0, 0, 0, 0, 0, 0, 0, 0],
    De: [0, 0, 0, 0, 0, 0, 0, 0],
    Jp: [0, 0, 0, 0, 0, 0, 0, 0],
    Ch: [0, 0, 0, 0, 0, 0, 0, 0],
    Ru: [0, 0, 0, 0, 0, 0, 0, 0],
  };

  const langs = Object.keys(languageWordsCnt);

  for (let i = 0; i < langs.length; i++) {
    const langWordsCntArr = languageWordsCnt[langs[i]];
    const languageWordsArr = languageWords[langs[i]];
    languageWordsArr.forEach((word) => {
      for (let j = 0; j < eightDateArr.length; j++) {
        if (new Date(word.addedAt).getDate() === eightDateArr[j].getDate())
          langWordsCntArr[j] += 1;
      }
    });
  }

  return { languageWords, languageWordsCnt };
};

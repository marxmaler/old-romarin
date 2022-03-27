import { ITestSetting, IWord } from "../atoms";

interface IGetQuestionTypeProps {
  questionConfig: ITestSetting;
  word: IWord;
}

interface IQuestionType {
  [key: string]: boolean;
  spelling_short: boolean;
  spelling_multi: boolean;
  meaning: boolean;
  ant: boolean;
  syn: boolean;
  ex: boolean;
  collocation: boolean;
}

export const getQuestionType = ({
  questionConfig,
  word,
}: IGetQuestionTypeProps) => {
  const { selectedWords } = questionConfig;
  const questionType: IQuestionType = {
    spelling_short: true,
    spelling_multi: selectedWords.length >= 4,
    meaning: selectedWords.length >= 4,
    ant: Boolean(
      word.ant && word.syn
        ? word.syn.length + word.ant.length + selectedWords.length >= 4
        : word.ant && word.ant.length + selectedWords.length >= 4
    ),
    syn: Boolean(
      word.ant && word.syn
        ? word.syn.length + word.ant.length + selectedWords.length >= 4
        : word.syn && word.syn.length + selectedWords.length >= 4
    ),
    ex: Boolean(
      word.ex &&
        word.ex.match(/[(]+/g)?.length === 1 &&
        word.ex.match(/[)]+/g)?.length === 1
    ),
    collocation: Boolean(
      word.collocation &&
        selectedWords.length >= 4 &&
        !word.collocation
          .map((col) => col.match(/[(]+/g)?.length === 1)
          .includes(false) &&
        !word.collocation
          .map((col) => col.match(/[)]+/g)?.length === 1)
          .includes(false)
    ),
  };
  return questionType;
};

interface IGenerateQuestionsProps {
  questionConfig: ITestSetting;
}

export const generateQuestions = ({
  questionConfig,
}: IGenerateQuestionsProps) => {
  const { numQ, selectedWords } = questionConfig;

  //   const questions = selectedWords.map((word) => {
  //     const questionType = getQuestionType({ questionConfig, word });
  //     const keys = Object.keys(questionType);
  //     const possibleQuestions = keys
  //       .filter((key) => questionType[key] === true)
  //       .map((key) => key);
  //     const selectedQuestion =
  //       possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)];
  //     const question = {};
  //     const instruction = instructions[selectedQuestion];
  //     if (
  //       ["spelling_multi", "ant", "syn", "collocation"].includes(selectedQuestion)
  //     ) {
  //       const randomNumbers: number[] = [];
  //       while (randomNumbers.length <= 3) {
  //         const randomNumber = Math.floor(Math.random() * selectedWords.length);
  //         !randomNumbers.includes(randomNumber) &&
  //           randomNumbers.push(randomNumber);
  //       }

  //       const antArr = [];
  //       const synRandomNumbers: number[] = [];

  //       if (word.syn && word.syn.length <= 3) {
  //         word.syn.forEach((syn) => antArr.push(syn));
  //       } else if (word.syn) {
  //         while (synRandomNumbers.length <= 3) {
  //           const randomNumber = Math.floor(Math.random() * word.syn.length);
  //           !synRandomNumbers.includes(randomNumber) &&
  //             synRandomNumbers.push(randomNumber);
  //         }
  //         synRandomNumbers.forEach((num) => antArr.push(word.syn[num]));
  //       }

  //       const options =
  //         selectedQuestion === "spelling_multi"
  //           ? [
  //               word.spelling,
  //               ...randomNumbers.map((num) => selectedWords[num].spelling),
  //             ]
  //           : word.ant && selectedQuestion === "ant"
  //           ? [word.ant[Math.floor(Math.random() * word.ant?.length)]]
  //           : "";
  //random spelling 3개 채워넣기
  //     }
  //   });

  //   Math.floor(Math.random() * selectedWords.length);
};

interface IInstructions {
  [key: string]: string;
  spelling_short: string;
  spelling_multi: string;
  meaning: string;
  ant: string;
  syn: string;
  ex: string;
  collocation: string;
}
const instructions: IInstructions = {
  spelling_short: "빈 칸에 들어갈 알맞은 단어를 쓰세오.",
  spelling_multi: "빈 칸에 들어갈 알맞은 단어를 고르세요.",
  meaning: "위 단어의 뜻으로 알맞은 것을 고르세요",
  ant: "위 단어의 반의어로 알맞은 것을 고르세요",
  syn: "위 단어의 반의어로 알맞은 것을 고르세요",
  ex: "빈 칸에 들어갈 알맞은 단어를 문법에 맞게 써주세요",
  collocation: "빈 칸에 들어갈 알맞은 단어를 고르세요",
};

const getPassage = () => {};

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IWord, testSettingState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import Question from "../components/Question";
import TestResult from "../components/TestResult";

const TestSheet = styled.div`
  min-height: 50vh;
  max-width: 100vw;
`;

const Form = styled(motion.form)`
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  h1 {
    color: white;
    font-size: 30px;
    font-weight: 900;
  }
  ul {
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    margin-top: -30px;
  }
`;

const testSheetVar = {
  hidden: {
    y: -30,
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
  exit: {
    y: -30,
    opacity: 0,
    transition: { duration: 0.7 },
  },
};

//TO DO :
// 1. 단순 철자 묻기 문제

interface IForm {
  [key: string]: string;
}

export interface IGradedWord {
  wordId: string;
  wrong: boolean;
  wrongAnswer: string;
  originalWord: IWord;
}

function Test() {
  const { numQ, selectedWords } = useRecoilValue(testSettingState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm();

  const [gradedWords, setGradedWords] = useState<IGradedWord[]>([]);
  const onValid = (data: IForm) => {
    const wordIds = Object.keys(data);
    wordIds.forEach((id) => {
      const word = selectedWords
        .filter((word) => String(word._id) === id)
        .map((word) => word)
        .pop();
      if (word)
        word?.spelling === data[id]
          ? setGradedWords((prev) => [
              {
                wordId: id,
                wrong: false,
                originalWord: word,
                wrongAnswer: data[id],
              },
              ...prev,
            ])
          : setGradedWords((prev) => [
              {
                wordId: id,
                wrong: true,
                originalWord: word,
                wrongAnswer: data[id],
              },
              ...prev,
            ]);
    });
    // console.log(gradedWords);
    fetch("/api/words", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gradedWords),
    });

    wordIds.forEach((key) => setValue(key, ""));
  };
  return (
    <>
      <HeaderMenu />
      <TestSheet>
        <AnimatePresence exitBeforeEnter>
          {isSubmitted ? (
            <TestResult
              key={"testResult"}
              isSubmitted={isSubmitted}
              gradedWords={gradedWords}
            ></TestResult>
          ) : (
            <Form
              key={"testSheet"}
              variants={testSheetVar}
              initial="hidden"
              animate="show"
              exit="exit"
              onSubmit={handleSubmit(onValid)}
            >
              <h1>단어 시험</h1>
              <ul>
                {selectedWords.map((word, index) => (
                  <Question
                    key={`question${index}`}
                    word={word}
                    register={register}
                    errors={errors}
                  />
                ))}
              </ul>
              <button>답안 제출하기</button>
            </Form>
          )}
        </AnimatePresence>
      </TestSheet>
    </>
  );
}

export default Test;

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { testResultsState, testSettingState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import Question from "../components/Question";
import { ITestResult } from "../interfaces";

const TestSheet = styled.div`
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(16, 14, 25, 1)
  );

  min-height: 100vh;
  width: 100%;
  padding: 50px;
`;

const Form = styled(motion.form)`
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

function Test() {
  const { selectedWords } = useRecoilValue(testSettingState);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [testResults, setTestResults] = useRecoilState(testResultsState);
  const tempTestResults: ITestResult[] = [];
  const onValid = (data: IForm) => {
    console.log("onValidData:", data);
    const wordIds = Object.keys(data);
    wordIds.forEach((id) => {
      const word = selectedWords
        .filter((word) => String(word._id) === id)
        .map((word) => word)
        .pop();

      if (word) {
        console.log("word:", word);
        word.spelling === data[id]
          ? tempTestResults.push({
              wordId: id,
              wrong: false,
              myAnswer: data[id],
              originalWord: word,
            })
          : tempTestResults.push({
              wordId: id,
              wrong: true,
              myAnswer: data[id],
              originalWord: word,
            });
      }
    });
    setTestResults(tempTestResults);
    fetch("/api/words", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempTestResults),
    });

    wordIds.forEach((key) => setValue(key, ""));
    navigate("/words/test/result");
  };

  useEffect(() => {
    if (selectedWords.length === 0) {
      navigate("/words/test/setting");
    }
  }, [selectedWords, testResults]);

  return (
    <>
      <HeaderMenu />
      <TestSheet>
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
      </TestSheet>
    </>
  );
}

export default Test;

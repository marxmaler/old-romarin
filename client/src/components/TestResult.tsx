import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IGradedWord } from "../routes/Test";

const TestResultBox = styled(motion.div)`
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

const Li = styled.li`
  width: 60%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;

  h3 {
    /* background-color: red; */
    font-size: 20px;
    display: block;
    font-weight: 700;
    span {
      font-weight: 500;
      line-height: 1.5em;
      margin: 1em 0;
      display: block;
      font-size: 16px;
      background-color: tomato;
      max-width: 80%;
      padding: 1em;
      color: white;
      border-radius: 10px;
    }
    input {
    }
  }
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:last-child {
      margin-top: 1em;
    }
  }
`;

const testResultSheetVar = {
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
    transition: { duration: 0.7 },
  },
};

interface IProps {
  isSubmitted: boolean;
  gradedWords: IGradedWord[];
}

function TestResult({ isSubmitted, gradedWords }: IProps) {
  const controls = useAnimation();
  const wrongWords = gradedWords
    .filter((word) => word.wrong)
    .map((word) => word);

  useEffect(() => {
    console.log(gradedWords, wrongWords);
    isSubmitted && controls.start("show");
  }, [controls, isSubmitted]);
  return (
    <TestResultBox
      variants={testResultSheetVar}
      initial="hidden"
      animate={controls}
    >
      <ul>
        {wrongWords &&
          wrongWords.map((word) => (
            <Li key={String(word.originalWord._id)}>
              <h3>
                보기에 제시된 뜻을 가진 단어의 철자를 빈 칸에 써주세요.
                <span>{word.originalWord.meaning}</span>
              </h3>
              <Answers>
                <span>{`내가 쓴 답 : ${word.wrongAnswer}`}</span>
                <span>{`정답 : ${word.originalWord.spelling}`}</span>
              </Answers>
            </Li>
          ))}
      </ul>
      <Link to={"/"}>
        <button>돌아가기</button>
      </Link>
    </TestResultBox>
  );
}

export default TestResult;

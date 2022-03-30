import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { testResultsState, testSettingState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import { getLanguageInKorean } from "../util/language";

const TestSheet = styled.div`
  min-height: 50vh;
  max-width: 100vw;
`;

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
  min-width: 15em;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;

  h3 {
    /* background-color: red; */
    font-size: 20px;
    display: block;
    font-weight: 700;
    line-height: 1.5em;
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

function TestResult() {
  const navigate = useNavigate();
  const testResults = useRecoilValue(testResultsState);
  const resetTestSetting = useResetRecoilState(testSettingState);
  const wrongWords = testResults
    .filter((word) => word.wrong)
    .map((word) => word);

  useEffect(() => {
    resetTestSetting();
    if (testResults.length === 0) navigate("/");
  }, [testResults]);

  return (
    <>
      <HeaderMenu></HeaderMenu>
      <TestSheet>
        <TestResultBox
          variants={testResultSheetVar}
          initial="hidden"
          animate="show"
        >
          <h1>{wrongWords.length > 0 ? "틀린 문제" : "채점 결과"}</h1>
          <ul>
            {wrongWords.length > 0 ? (
              wrongWords.map((word) => (
                <Li key={String(word.originalWord._id)}>
                  <h3>
                    보기에 제시된 뜻을 가진{" "}
                    {getLanguageInKorean(word.originalWord.language)} 단어의
                    철자를 빈 칸에 써주세요.
                    <span>{word.originalWord.meaning}</span>
                  </h3>
                  <Answers>
                    <span>{`내가 쓴 답 : ${word.myAnswer}`}</span>
                    <span>{`정답 : ${word.originalWord.spelling}`}</span>
                  </Answers>
                </Li>
              ))
            ) : (
              <Li key={"congratulation"}>
                <h3>축하합니다, 만점입니다! 🥳</h3>
              </Li>
            )}
          </ul>
          <Link to={"/"}>
            <button>돌아가기</button>
          </Link>
        </TestResultBox>
      </TestSheet>
    </>
  );
}

export default TestResult;

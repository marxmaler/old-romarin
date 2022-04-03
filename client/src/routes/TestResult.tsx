import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { testResultsState, testSettingState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import { getLanguageInKorean } from "../util/language";

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

const TestResultBox = styled(motion.div)`
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
  background-color: ${(props) => props.theme.periwinkleTint50};
  border: 1px solid ${(props) => props.theme.periwinkleTint90};
  color: ${(props) => props.theme.periwinkleShade50};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;

  h3 {
    font-size: 20px;
    display: block;
    font-weight: 700;
    line-height: 1.5em;
    span {
      font-weight: 500;
      line-height: 1.5em;
      font-size: 16px;
      max-width: 80%;
      color: white;
    }
    input {
    }
  }
`;

const Answers = styled.div``;

const DarkBox = styled.div`
  background-color: ${(props) => props.theme.periwinkleShade30};
  padding: 20px;
  border-radius: 10px;
  max-width: 50vw;
  margin: 10px 0px;
  color: ${(props) => props.theme.periwinkleTint90};
  border: ${(props) => props.theme.periwinkleTint90} 1px solid;
  span {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    strong {
      margin-bottom: 10px;
    }
  }
`;

const TransparentBox = styled.div`
  background-color: transparent;
  padding: 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.periwinkleShade50};
  display: flex;
  flex-direction: column;
  span {
    &:last-child {
      margin-top: 10px;
    }
    strong {
      margin-bottom: 10px;
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
                    <DarkBox>
                      <span>{word.originalWord.meaning}</span>
                    </DarkBox>
                  </h3>
                  <TransparentBox>
                    <span>{`내가 쓴 답 : ${word.myAnswer}`}</span>
                    <span>{`정답 : ${word.originalWord.spelling}`}</span>
                  </TransparentBox>
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

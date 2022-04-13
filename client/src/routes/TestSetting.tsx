import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { testSettingState, wordsSelector } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import LanguageSetter from "../components/LanguageSetter";
import { ITestSettingFormProps, IWord } from "../interfaces";

// const Container = styled(motion.div)`
//   background: linear-gradient(
//     to right bottom,
//     rgba(156, 136, 255, 1),
//     rgba(16, 14, 25, 1)
//   );

//   min-height: 100vh;
//   width: 100%;
//   color: white;
//   padding: 50px;
// `;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  color: white;
  padding: 50px;
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(16, 14, 25, 1)
  );
  h3 {
    text-shadow: 1px 1px 1px ${(props) => props.theme.periwinkleShade90};
    text-align: center;
    margin-bottom: 30px;
    font-size: 23px;
    font-weight: 700;
  }
`;

const Form = styled(motion.form)`
  background-color: ${(props) => props.theme.periwinkleTint50};
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  min-width: max-content;
  min-height: max-content;
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  border-radius: 20px;
  ul {
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0.5em;
      &:last-child {
        margin-bottom: 0;
      }
      input {
        margin-top: 10px;
        width: 100%;
        border-radius: 10px;
        padding: 10px;
        border: 0;
        background-color: ${(props) => props.theme.periwinkleTint90};
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        color: ${(props) => props.theme.periwinkleShade50};
        font-size: 24px !important;
        font-weight: 900 !important;
        &::placeholder {
          text-align: center;
        }
      }
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
`;

const ErrorMessage = styled.li`
  color: ${(props) => props.theme.periwinkleTint90};
  font-size: 12px;
  span {
    padding: 1em;
  }
`;

const WordNum = styled.h3`
  color: ${(props) => props.theme.periwinkleShade50};
  text-shadow: none !important;
`;

const DarkBox = styled.div`
  background-color: ${(props) => props.theme.periwinkleShade30};
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0px;
  color: ${(props) => props.theme.periwinkleTint90};
  border: ${(props) => props.theme.periwinkleTint90} 1px solid;
  label {
    strong {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 600;
      display: block;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: max-content;
`;

const settingFormVar = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.7,
    },
  },
};

function TestSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ITestSettingFormProps>();
  const [langNum, setLangNum] = useState(0);
  const selectedWords = useRecoilValue(wordsSelector);
  const setTestSetting = useSetRecoilState(testSettingState);
  const navigate = useNavigate();

  useEffect(() => {
    setValue("numQ", selectedWords.length);
  }, [setValue, selectedWords]);

  const onValid = ({ numQ }: ITestSettingFormProps) => {
    //numQ 갯수만큼 random index 뽑아서 단어 섞기
    const reselectedWords: IWord[] = [];
    while (reselectedWords.length < numQ) {
      const randomIndex = Math.floor(Math.random() * selectedWords.length);
      const reselectedWord = selectedWords[randomIndex];
      !reselectedWords.includes(reselectedWord) &&
        reselectedWords.push(reselectedWord);
    }
    setTestSetting({ numQ, selectedWords: reselectedWords });

    navigate("/words/test");
  };

  return (
    <>
      <HeaderMenu />
      <FormContainer>
        <h3>시험 언어</h3>
        <LanguageSetter
          page="testSetting"
          langNum={langNum}
          setLangNum={setLangNum}
        />
        <Form
          onSubmit={handleSubmit(onValid)}
          variants={settingFormVar}
          initial="hidden"
          animate="show"
        >
          <WordNum>단어 갯수 : {selectedWords.length}개</WordNum>
          <ul>
            <DarkBox>
              {" "}
              <li>
                <label>
                  <strong>시험 문항수</strong>
                </label>
                <input
                  type="number"
                  disabled={selectedWords.length > 0 ? false : true}
                  {...register("numQ", {
                    required: "시험 문항수를 입력해주세요.",
                    min: {
                      value: 1,
                      message: "0보다 큰 자연수를 입력해주세요.",
                    },
                    max: {
                      value: selectedWords.length,
                      message:
                        "복습할 단어 수와 같거나 그보다 작은 자연수를 입력해주세요.",
                    },
                  })}
                ></input>
              </li>
              {errors?.numQ?.message && (
                <ErrorMessage>
                  <span>{errors.numQ.message}</span>
                </ErrorMessage>
              )}
            </DarkBox>
          </ul>
          <ButtonContainer>
            {selectedWords.length > 0 && <button>시험 시작</button>}
          </ButtonContainer>
        </Form>
      </FormContainer>
    </>
  );
}

export default TestSetting;

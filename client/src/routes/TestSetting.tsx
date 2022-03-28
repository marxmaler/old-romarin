import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IWord, testSettingState, wordsSelector, wordsState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import LanguageSetter from "../components/LanguageSetter";

const FormContainer = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 50vh;
  color: white;
  h3 {
    text-shadow: 1px 1px 1px rgba(189, 195, 199, 0.7);
    text-align: center;
    margin-bottom: 30px;
    font-size: 23px;
    font-weight: 700;
    color: rgba(0, 0, 0, 1);
  }
`;

const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  min-width: max-content;
  min-height: max-content;
  border: 1px solid rgba(0, 0, 0, 0.4);
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
      label {
        display: inline-block;
        text-align: start;
        span {
          display: block;
          font-size: 12px;
        }
      }
      input {
        width: 40em;
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
  color: red;
  font-size: 12px;
  span {
    padding: 1em;
  }
`;

const WordNum = styled.h3`
  color: rgba(255, 255, 255, 0.8) !important;
`;

interface IForm {
  numQ: number;
}

function TestSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const [langNum, setLangNum] = useState(0);
  const selectedWords = useRecoilValue(wordsSelector);
  const setTestSetting = useSetRecoilState(testSettingState);
  const navigate = useNavigate();

  useEffect(() => {
    setValue("numQ", selectedWords.length);
  }, [selectedWords]);

  const onValid = (data: IForm) => {
    //numQ 갯수와 selectedWords 갯수가 다르면 random index 뽑아서 새로운 selectedWord로 교체하기
    if (data.numQ === selectedWords.length) {
      setTestSetting({ numQ: data.numQ, selectedWords });
    } else {
      const numQ = data.numQ;
      const reselectedWords: IWord[] = [];
      while (reselectedWords.length < numQ) {
        const randomIndex = Math.floor(Math.random() * selectedWords.length);
        const reselectedWord = selectedWords[randomIndex];
        !reselectedWords.includes(reselectedWord) &&
          reselectedWords.push(reselectedWord);
      }
      setTestSetting({ numQ: data.numQ, selectedWords: reselectedWords });
    }
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
        <Form onSubmit={handleSubmit(onValid)}>
          <WordNum>단어 갯수 : {selectedWords.length}개</WordNum>
          <ul>
            <li>
              <label>시험 문항수</label>
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
          </ul>
          {selectedWords.length > 0 && <button>시험 시작</button>}
        </Form>
        <Link to={"/"}>
          <button>뒤로 가기</button>
        </Link>
      </FormContainer>
    </>
  );
}

export default TestSetting;
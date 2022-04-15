import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  chTestWordSelector,
  deTestWordSelector,
  enTestWordSelector,
  esTestWordSelector,
  frTestWordSelector,
  jpTestWordSelector,
  ruTestWordSelector,
  testSettingState,
} from "../atoms";
import { IQuestionProp, IWord } from "../interfaces";
import { getLanguageInKorean } from "../util/language";
import InputWithKeyboard from "./InputWithKeyboard";

const Li = styled.li`
  width: 100%;
  max-width: 50vw;
  background-color: ${(props) => props.theme.periwinkleTint50};
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 20px;
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  h3 {
    color: ${(props) => props.theme.periwinkleShade50};
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
  }
  label {
    margin-top: 10px;
    strong {
      font-size: 20px;
      font-weight: 600;
      display: block;
    }
  }
  input {
    margin-top: 10px;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    border: 0;
    &::placeholder {
      text-align: center;
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  display: block;
  margin-top: 1em;
`;

const DarkBox = styled.div`
  background-color: ${(props) => props.theme.periwinkleShade30};
  padding: 20px;
  border-radius: 10px;
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

const Option = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  input[type="radio"] {
    width: max-content;
  }
  label {
    display: inline;
    cursor: pointer;
  }
`;

function Question({ word, register, errors }: IQuestionProp) {
  const languageInKo = getLanguageInKorean(word.language);
  const selector =
    languageInKo === "영어"
      ? enTestWordSelector
      : languageInKo === "스페인어"
      ? esTestWordSelector
      : languageInKo === "프랑스어"
      ? frTestWordSelector
      : languageInKo === "독일어"
      ? deTestWordSelector
      : languageInKo === "일본어"
      ? jpTestWordSelector
      : languageInKo === "중국어"
      ? chTestWordSelector
      : ruTestWordSelector;
  const selectedWords = useRecoilValue(selector);
  const questionType =
    selectedWords.length >= 4 ? Math.floor(Math.random() * 2) : 0;
  const [shuffledArr, setShuffledArr] = useState<IWord[]>([]);

  //0번은 철자 쓰기, 1번은 뜻 보고 보기에서 단어 고르기
  useEffect(() => {
    if (questionType === 1) {
      const randomWordsArr: IWord[] = [];
      const indexArr = [...Array(selectedWords.length).keys()];
      while (randomWordsArr.length < 3) {
        const randomIndex = Math.floor(Math.random() * indexArr.length);
        const randomWord = selectedWords[indexArr[randomIndex]];
        if (randomWord !== word) {
          randomWordsArr.push(randomWord);
          indexArr.splice(randomIndex, 1);
        }
      }
      randomWordsArr.push(word);
      const shuffleIndexArr = [...Array(4).keys()];
      const temp = [];
      while (shuffleIndexArr.length > 0) {
        const randomIndex = Math.floor(Math.random() * shuffleIndexArr.length);
        const randomWord = randomWordsArr[shuffleIndexArr[randomIndex]];
        temp.push(randomWord);
        shuffleIndexArr.splice(randomIndex, 1);
      }
      setShuffledArr(temp);
    }
  }, []);

  return (
    <>
      {questionType === 0 ? (
        <Li>
          <h3>
            보기에 제시된 뜻을 가진 {`${languageInKo}`} 단어의 철자를 빈 칸에
            써주세요.
            <DarkBox>
              <span>{word.meaning}</span>
            </DarkBox>
          </h3>
          <TransparentBox>
            <label>
              <strong>답</strong>
              <InputWithKeyboard
                register={register}
                language={word.language}
                inputName={`${word._id}`}
                placeholder="required"
                isRequired={true}
                defaultValue=""
              />
            </label>
            <ErrorMessage>
              {errors[`${String(word._id)}`]
                ? errors[`${String(word._id)}`].message
                : null}
            </ErrorMessage>
          </TransparentBox>
        </Li>
      ) : (
        <Li>
          <h3>
            보기에 제시된 뜻을 가진 {`${languageInKo}`} 단어를 보기에서
            골라주세요.
            <DarkBox>
              <span>{word.meaning}</span>
            </DarkBox>
          </h3>
          <TransparentBox>
            <label>
              <strong>보기</strong>
              {shuffledArr.map((shuffledWord, index) => (
                <Option>
                  <input
                    id={`question_${word._id}_option_${shuffledWord._id}_${index}`}
                    type={"radio"}
                    value={shuffledWord.spelling}
                    {...register(`${word._id}`, {})}
                  />
                  <label
                    htmlFor={`question_${word._id}_option_${shuffledWord._id}_${index}`}
                  >
                    {shuffledWord.spelling}
                  </label>
                </Option>
              ))}
            </label>
            <ErrorMessage>
              {errors[`${String(word._id)}`]
                ? errors[`${String(word._id)}`].message
                : null}
            </ErrorMessage>
          </TransparentBox>
        </Li>
      )}
    </>
  );
}

export default Question;

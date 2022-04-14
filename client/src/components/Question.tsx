import styled from "styled-components";
import { IQuestionProp } from "../interfaces";
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

function Question({ word, register, errors }: IQuestionProp) {
  const languageInKo = getLanguageInKorean(word.language);

  return (
    <>
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
            />
          </label>
          <ErrorMessage>
            {errors[`${String(word._id)}`]
              ? errors[`${String(word._id)}`].message
              : null}
          </ErrorMessage>
        </TransparentBox>
      </Li>
    </>
  );
}

export default Question;

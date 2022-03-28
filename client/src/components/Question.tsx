import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { IWord } from "../atoms";

interface IProp {
  word: IWord;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
}

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

const ErrorMessage = styled.span`
  color: red;
  display: block;
  margin-top: 1em;
`;

function Question({ word, register, errors }: IProp) {
  const transLang =
    word.lang === "English"
      ? "영어"
      : word.lang === "Español"
      ? "스페인어"
      : word.lang === "Français"
      ? "프랑스어"
      : word.lang === "Deutsch"
      ? "독일어"
      : word.lang === "日本語"
      ? "일본어"
      : word.lang === "中文"
      ? "중국어"
      : "러시아어";
  //의미 보고 철자 쓰기 문제
  return (
    <>
      <Li>
        <h3>
          보기에 제시된 뜻을 가진 {`${transLang}`} 단어의 철자를 빈 칸에
          써주세요.
          <span>{word.meaning}</span>
        </h3>
        <label htmlFor={String(word._id) + "_answer"}>답: </label>
        <input
          id={String(word._id) + "_answer"}
          {...register(`${word._id}`, { required: "답안을 작성해주세요." })}
        ></input>
        <ErrorMessage>
          {errors[`${String(word._id)}`]
            ? errors[`${String(word._id)}`].message
            : null}
        </ErrorMessage>
      </Li>
    </>
  );
}

export default Question;
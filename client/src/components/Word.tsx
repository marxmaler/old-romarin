import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IWord, wordsState } from "../atoms";
import { languages } from "../util/constant";

const Form = styled.form``;

const Li = styled(motion.li)`
  list-style: none;
  background-color: rgba(192, 57, 43, 1);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  span {
    max-width: 50vw;
    display: block;
    margin: 0.5em;

    input {
      width: 40em;
      &::placeholder {
        text-align: center;
      }
    }
    textarea {
      width: 40em;
      font-family: inherit;
      resize: none;
      &::placeholder {
        text-align: center;
      }
    }

    ul {
      padding: 0px 30px;
      li {
        list-style: square;
        margin-top: 5px;
        &:last-child {
          margin-bottom: 10px;
        }
      }
    }
  }
`;

const Meter = styled.meter<{ point: number }>`
  margin-left: 1em;

  &::-webkit-meter-bar {
    background: none; /* Required to get rid of the default background property */
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px #333 inset;
  }

  &::-webkit-meter-optimum-value {
    box-shadow: 0 5px 5px -5px #999 inset;
    background-color: ${(props) =>
      props.point <= 33
        ? "rgba(231, 76, 60,1.0)"
        : props.point <= 66
        ? "rgba(241, 196, 15,1.0)"
        : "rgba(39, 174, 96,1.0)"};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  button {
  }
`;

interface IProps {
  word: IWord;
}

const wordVar = {
  hidden: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
  show: {
    opacity: 1,
    y: 10,
    transition: {
      duration: 0.7,
    },
  },
};

const getStringifiedArrayProps = (word: IWord) => {
  let stringifiedCol = "";
  let stringifiedSyn = "";
  let stringifiedAnt = "";
  word.collocation.length > 0 &&
    word.collocation.forEach((col, index) => {
      index !== word.collocation.length - 1
        ? (stringifiedCol += col + ", ")
        : (stringifiedCol += col);
    });
  word.syn.length > 0 &&
    word.syn.forEach((syn, index) => {
      index !== word.syn.length - 1
        ? (stringifiedSyn += syn + ", ")
        : (stringifiedSyn += syn);
    });
  word.ant.length > 0 &&
    word.ant.forEach((ant, index) => {
      index !== word.ant.length - 1
        ? (stringifiedAnt += ant + ", ")
        : (stringifiedAnt += ant);
    });

  return { stringifiedCol, stringifiedSyn, stringifiedAnt };
};

const Word = ({ word }: IProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [wordState, setWordState] = useState<IWord>(word);
  const [isEditting, setIsEditting] = useState(false);
  const setWords = useSetRecoilState(wordsState);
  const { stringifiedAnt, stringifiedCol, stringifiedSyn } =
    getStringifiedArrayProps(wordState);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    inView && controls.start("show");
  }, [controls, inView]);

  const onValid = async (data: Object) => {
    console.log(data);
    const { word: updatedWord } = await (
      await fetch("/api/words", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, wordId: String(word._id) }),
      })
    ).json();
    console.log(updatedWord);
    setWordState(() => updatedWord);
    setWords((prev) => {
      return prev.map((word) =>
        word._id === updatedWord._id ? updatedWord : word
      );
    });
    setIsEditting((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      {isEditting ? (
        <Li variants={wordVar} initial="hidden" animate={controls} ref={ref}>
          <span>
            언어
            <br />
            <select
              {...register("lang", {
                required: true,
                value: wordState.lang,
              })}
            >
              {languages.map((language) => (
                <option value={language} key={`language_option_${language}`}>
                  {language}
                </option>
              ))}
            </select>
          </span>
          <span>
            철자
            <br />
            <input
              {...register(`spelling`, {
                required: true,
                value: wordState.spelling,
              })}
              placeholder="required"
            />
          </span>

          <span>
            발음
            <br />
            <input
              {...register(`pronunciation`, {
                value: wordState.pronunciation,
              })}
              placeholder="optional"
            />
          </span>

          <span>
            뜻
            <br />
            <input
              {...register(`meaning`, {
                required: true,
                value: wordState.meaning,
              })}
              placeholder="required"
            />
          </span>

          <span>
            활용
            <br />
            <input
              {...register(`collocation`, {
                value: stringifiedCol,
              })}
              placeholder="optional(,로 구분)"
            />
          </span>

          <span>
            기억 단서
            <br />
            <input
              {...register(`association`, {
                value: wordState.association,
              })}
              placeholder="optional"
            />
          </span>

          <span>
            예문
            <br />
            <textarea
              rows={3}
              {...register(`ex`, { value: wordState.ex })}
              placeholder="optional"
            />
          </span>
          <span>
            유의어
            <br />
            <input
              {...register(`syn`, {
                value: stringifiedSyn,
              })}
              placeholder="optional(,로 구분)"
            />
          </span>
          <span>
            반의어
            <br />
            <input
              {...register(`ant`, {
                value: stringifiedAnt,
              })}
              placeholder="optional(,로 구분)"
            />
          </span>
          <ButtonContainer>
            <button>변경 사항 저장</button>
          </ButtonContainer>
        </Li>
      ) : (
        <Li variants={wordVar} initial="hidden" animate={controls} ref={ref}>
          <span>철자 : {wordState.spelling}</span>

          {wordState.pronunciation !== "" && (
            <span>발음 : {wordState.pronunciation}</span>
          )}

          <span>뜻 : {wordState.meaning}</span>

          {wordState.collocation?.length > 0 && (
            <span>
              활용
              <br />
              <ul>
                {wordState.collocation.map((col, index) => (
                  <li key={`${String(wordState._id)}col_${index}`}>{col}</li>
                ))}
              </ul>
            </span>
          )}
          {wordState.association !== "" && (
            <span>기억 단서 : {wordState.association}</span>
          )}

          {wordState.ex?.length > 0 && (
            <span>
              예문
              <br />
              {wordState.ex.split("\n").length > 1 ? (
                wordState.ex
                  .split("\n")
                  .map((line, index) => (
                    <span key={String(wordState._id) + `_ex${index}`}>
                      {line}
                    </span>
                  ))
              ) : (
                <span>{wordState.ex}</span>
              )}
            </span>
          )}
          {wordState.syn.length > 0 && (
            <span>
              유의어 :{" "}
              {wordState.syn.map((syn, index) =>
                wordState.syn && index < wordState.syn.length - 1
                  ? syn + ", "
                  : syn
              )}
            </span>
          )}
          {wordState.ant.length > 0 && (
            <span>
              반의어 :{" "}
              {wordState.ant.map((ant, index) =>
                wordState.ant && index < wordState.ant.length - 1
                  ? ant + ", "
                  : ant
              )}
            </span>
          )}
          <span>
            장기기억 촉진 점수 :{" "}
            {wordState.ltmsPoint <= 33
              ? `낮음(${wordState.ltmsPoint})`
              : wordState.ltmsPoint <= 66
              ? `중간(${wordState.ltmsPoint})`
              : `높음(${wordState.ltmsPoint})`}
            <Meter
              min={0}
              max={100}
              optimum={wordState.ltmsPoint}
              value={wordState.ltmsPoint}
              point={wordState.ltmsPoint}
            />
          </span>
          <ButtonContainer>
            <button
              onClick={(event: React.FormEvent) => {
                event.preventDefault();
                setIsEditting((prev) => !prev);
              }}
            >
              {"단어 수정"}
            </button>
          </ButtonContainer>
        </Li>
      )}
    </form>
  );
};

export default Word;

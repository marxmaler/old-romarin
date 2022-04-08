import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { wordsState } from "../atoms";
import { IWord, IWordProps } from "../interfaces";
import { languages } from "../util/language";
import { getStringifiedArrayProps } from "../util/word";

const Li = styled(motion.li)`
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  list-style: none;
  background-color: ${(props) => props.theme.periwinkleTint50};
  border-radius: 20px;
  padding: 20px 30px;
  margin-bottom: 20px;
  span {
    max-width: 30vw;
    display: block;
    margin: 0.5em;
    line-height: 1.5em;

    strong {
      font-size: 20px;
      font-weight: 600;
      display: block;
    }

    input {
      margin-bottom: 10px;
      width: 100%;
      border-radius: 10px;
      padding: 10px;
      border: 0;
      color: ${(props) => props.theme.periwinkleShade50};
      &::placeholder {
        text-align: center;
      }
    }
    textarea {
      margin-bottom: 10px;
      border: 0;
      border-radius: 10px;
      padding: 10px;
      width: 100%;
      font-family: inherit;
      resize: none;
      color: ${(props) => props.theme.periwinkleShade50};
      &::placeholder {
        text-align: center;
      }
    }

    select {
      margin-bottom: 10px;
    }

    ul {
      max-width: 30vw;
      padding: 0px 30px;
      li {
        list-style: square;
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

const ButtonContainerTop = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: max-content;

  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
    &:hover {
      transform: scale(1.3);
      opacity: 0.5;
      transition: 0.7s;
    }
    path {
      fill: ${(props) => props.theme.periwinkleShade50};
    }
  }
`;

const ButtonContainerBottom = styled.div`
  display: flex;
  justify-content: center;
  min-height: max-content;
  button {
  }
`;

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

const DarkBox = styled.div`
  background-color: ${(props) => props.theme.periwinkleShade30};
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0px;
  color: ${(props) => props.theme.periwinkleTint90};
  border: ${(props) => props.theme.periwinkleTint90} 1px solid;

  span {
    margin-bottom: 10px;

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
  padding: 10px 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.periwinkleShade50};
  span {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    strong {
      margin-bottom: 10px;
    }
  }
`;

const PointBox = styled.div`
  background-color: transparent;
  padding: 0px 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.periwinkleShade50};
`;

const Spelling = styled.span`
  background-color: ${(props) => props.theme.periwinkleTint90};
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  strong {
    color: ${(props) => props.theme.periwinkleShade50};
    font-size: 24px !important;
    font-weight: 900 !important;
  }
`;

const SpellingInput = styled.input`
  font-size: 24px !important;
  font-weight: 900 !important;
  &::placeholder {
    font-size: 14px;
    font-weight: 100;
    transform: translate3d(0, -4px, 0);
  }
`;

const Ex = styled.span`
  line-height: 1.5em;
`;

const Word = ({ word }: IWordProps) => {
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
          <DarkBox>
            <span>
              <strong>
                언어{" "}
                <select
                  {...register("language", {
                    required: true,
                    value: wordState.language,
                  })}
                >
                  {languages.map((language) => (
                    <option
                      value={language}
                      key={`language_option_${language}`}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </strong>
            </span>
            <span>
              <strong>철자</strong>
              <SpellingInput
                {...register(`spelling`, {
                  required: true,
                  value: wordState.spelling,
                })}
                placeholder="required"
              />
            </span>

            <span>
              <strong>발음</strong>
              <input
                {...register(`pronunciation`, {
                  value: wordState.pronunciation,
                })}
                placeholder="optional"
              />
            </span>

            <span>
              <strong>뜻</strong>
              <input
                {...register(`meaning`, {
                  required: true,
                  value: wordState.meaning,
                })}
                placeholder="required"
              />
            </span>
          </DarkBox>
          <TransparentBox>
            <span>
              <strong>활용</strong>
              <input
                {...register(`collocation`, {
                  value: stringifiedCol,
                })}
                placeholder="optional(,로 구분)"
              />
            </span>
          </TransparentBox>
          <DarkBox>
            <span>
              <strong>기억 단서</strong>
              <input
                {...register(`association`, {
                  value: wordState.association,
                })}
                placeholder="optional"
              />
            </span>
          </DarkBox>
          <DarkBox>
            <span>
              <strong>예문</strong>
              <textarea
                rows={3}
                {...register(`ex`, { value: wordState.ex })}
                placeholder="optional"
              />
            </span>
          </DarkBox>
          <TransparentBox>
            <span>
              <strong>유의어</strong>
              <input
                {...register(`syn`, {
                  value: stringifiedSyn,
                })}
                placeholder="optional(,로 구분)"
              />
            </span>
            <span>
              <strong>반의어</strong>
              <input
                {...register(`ant`, {
                  value: stringifiedAnt,
                })}
                placeholder="optional(,로 구분)"
              />
            </span>
          </TransparentBox>
          <ButtonContainerBottom>
            <button>변경 사항 저장</button>
          </ButtonContainerBottom>
        </Li>
      ) : (
        <Li variants={wordVar} initial="hidden" animate={controls} ref={ref}>
          <ButtonContainerTop>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={(event: React.FormEvent) => {
                event.preventDefault();
                setIsEditting((prev) => !prev);
              }}
              viewBox="0 0 512 512"
            >
              <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
            </motion.svg>
          </ButtonContainerTop>
          <DarkBox>
            <Spelling>
              <strong>{wordState.spelling}</strong>
            </Spelling>

            {wordState.pronunciation !== "" && (
              <span>
                <strong>발음</strong>
                {wordState.pronunciation}
              </span>
            )}

            <span>
              <strong>뜻</strong>
              {wordState.meaning}
            </span>
          </DarkBox>

          {wordState.collocation?.length > 0 && (
            <TransparentBox>
              <span>
                <strong>활용</strong>
                <ul>
                  {wordState.collocation.map((col, index) => (
                    <li key={`${String(wordState._id)}col_${index}`}>{col}</li>
                  ))}
                </ul>
              </span>
            </TransparentBox>
          )}

          {wordState.association !== "" && (
            <DarkBox>
              <span>
                <strong>기억 단서</strong>
                {wordState.association}
              </span>
            </DarkBox>
          )}

          {wordState.ex?.length > 0 && (
            <DarkBox>
              <span>
                <strong>예문</strong>
                {wordState.ex.split("\n").length > 1 ? (
                  wordState.ex
                    .split("\n")
                    .map((line, index) => (
                      <Ex key={String(wordState._id) + `_ex${index}`}>
                        {line}
                      </Ex>
                    ))
                ) : (
                  <Ex>{wordState.ex}</Ex>
                )}
              </span>
            </DarkBox>
          )}

          {(wordState.syn.length > 0 || wordState.ant.length > 0) && (
            <TransparentBox>
              {wordState.syn.length > 0 && (
                <span>
                  <strong>유의어</strong>
                  {wordState.syn.map((syn, index) =>
                    wordState.syn && index < wordState.syn.length - 1
                      ? syn + ", "
                      : syn
                  )}
                </span>
              )}
              {wordState.ant.length > 0 && (
                <span>
                  <strong>반의어</strong>
                  {wordState.ant.map((ant, index) =>
                    wordState.ant && index < wordState.ant.length - 1
                      ? ant + ", "
                      : ant
                  )}
                </span>
              )}
            </TransparentBox>
          )}

          <PointBox>
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
          </PointBox>
        </Li>
      )}
    </form>
  );
};

export default Word;

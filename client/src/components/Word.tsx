import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import { wordsState } from "../atoms";
import { IWord, IWordProps } from "../interfaces";
import {
  ButtonContainerBottom,
  ButtonContainerTop,
  Ex,
  Li,
  Meter,
  PointBox,
  Spelling,
  WordDarkBox,
  WordTransparentBox,
  wordVar,
} from "../styles/wordStyle";
import { languages } from "../util/language";
import { getStringifiedArrayProps } from "../util/word";
import InputWithKeyboard from "./InputWithKeyboard";

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
          <WordDarkBox>
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
              <InputWithKeyboard
                register={register}
                language={wordState.language}
                inputName="spelling"
                placeholder="required"
                isRequired={true}
                defaultValue={wordState.spelling}
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
          </WordDarkBox>
          <WordTransparentBox>
            <span>
              <strong>활용</strong>
              <InputWithKeyboard
                register={register}
                language={wordState.language}
                inputName="collocation"
                placeholder="optional(,로 구분)"
                isRequired={false}
                defaultValue={stringifiedCol}
              />
            </span>
          </WordTransparentBox>
          <WordDarkBox>
            <span>
              <strong>기억 단서</strong>
              <input
                {...register(`association`, {
                  value: wordState.association,
                })}
                placeholder="optional"
              />
            </span>
          </WordDarkBox>
          <WordDarkBox>
            <span>
              <strong>예문</strong>
              <textarea
                rows={3}
                {...register(`ex`, { value: wordState.ex })}
                placeholder="optional"
              />
            </span>
          </WordDarkBox>
          <WordTransparentBox>
            <span>
              <strong>유의어</strong>
              <InputWithKeyboard
                register={register}
                language={wordState.language}
                inputName="syn"
                placeholder="optional(,로 구분)"
                isRequired={false}
                defaultValue={stringifiedSyn}
                isUpper={true}
              />
            </span>
            <span>
              <strong>반의어</strong>
              <InputWithKeyboard
                register={register}
                language={wordState.language}
                inputName="ant"
                placeholder="optional(,로 구분)"
                isRequired={false}
                defaultValue={stringifiedAnt}
                isUpper={true}
              />
            </span>
          </WordTransparentBox>
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
          <WordDarkBox>
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
          </WordDarkBox>

          {wordState.collocation?.length > 0 && (
            <WordTransparentBox>
              <span>
                <strong>활용</strong>
                <ul>
                  {wordState.collocation.map((col, index) => (
                    <li key={`${String(wordState._id)}col_${index}`}>{col}</li>
                  ))}
                </ul>
              </span>
            </WordTransparentBox>
          )}

          {wordState.association !== "" && (
            <WordDarkBox>
              <span>
                <strong>기억 단서</strong>
                {wordState.association}
              </span>
            </WordDarkBox>
          )}

          {wordState.ex?.length > 0 && (
            <WordDarkBox>
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
            </WordDarkBox>
          )}

          {(wordState.syn.length > 0 || wordState.ant.length > 0) && (
            <WordTransparentBox>
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
            </WordTransparentBox>
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

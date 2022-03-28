import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { IWord } from "../atoms";

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

const Word = ({ word }: IProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isEditting, setIsEditting] = useState(false);
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

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    inView && controls.start("show");
  }, [controls, inView]);

  const editWord = () => {
    setIsEditting((prev) => !prev);
  };

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      {isEditting ? (
        <Li variants={wordVar} initial="hidden" animate={controls} ref={ref}>
          <span>
            철자
            <br />
            <input
              {...register("spelling", {
                required: true,
                value: word.spelling,
              })}
              placeholder="required"
            />
          </span>

          <span>
            발음
            <br />
            <input
              {...register("pronunciation", { value: word.pronunciation })}
              placeholder="optional"
            />
          </span>

          <span>
            뜻
            <br />
            <input
              {...register("meaning", {
                required: true,
                value: word.meaning,
              })}
              placeholder="required"
            />
          </span>

          <span>
            활용
            <br />
            <input
              {...register("collocation", {
                value: stringifiedCol,
              })}
              placeholder="optional(,로 구분)"
            />
          </span>

          <span>
            기억 단서 :{" "}
            <input
              {...register("association", {
                value: word.association,
              })}
              placeholder="optional"
            />
          </span>

          <span>
            예문
            <br />
            <textarea
              rows={3}
              {...register("ex", { value: word.ex })}
              placeholder="optional"
            />
          </span>
          <span>
            유의어 :{" "}
            <input
              {...register("syn", { value: stringifiedSyn })}
              placeholder="optional(,로 구분)"
            />
          </span>
          <span>
            반의어 :{" "}
            <input
              {...register("ant", { value: stringifiedAnt })}
              placeholder="optional(,로 구분)"
            />
          </span>
          <ButtonContainer>
            <button onClick={editWord}>변경 사항 저장</button>
          </ButtonContainer>
        </Li>
      ) : (
        <Li variants={wordVar} initial="hidden" animate={controls} ref={ref}>
          <span>철자 : {word.spelling}</span>

          {word.pronunciation !== "" && (
            <span>발음 : {word.pronunciation}</span>
          )}

          <span>뜻 : {word.meaning}</span>

          {word.collocation?.length > 0 && (
            <span>
              활용 :{" "}
              {word.collocation.map((col, index) =>
                word.collocation && index < word.collocation.length - 1
                  ? col + ", "
                  : col
              )}
            </span>
          )}
          {word.association !== "" && (
            <span>기억 단서 : {word.association}</span>
          )}

          {word.ex?.length > 0 && (
            <span>
              예문
              <br />
              {word.ex.split("\n").length > 1 ? (
                word.ex
                  .split("\n")
                  .map((line, index) => (
                    <span key={String(word._id) + `_ex${index}`}>{line}</span>
                  ))
              ) : (
                <span>{word.ex}</span>
              )}
            </span>
          )}
          {word.syn.length > 0 && (
            <span>
              유의어 :{" "}
              {word.syn.map((syn, index) =>
                word.syn && index < word.syn.length - 1 ? syn + ", " : syn
              )}
            </span>
          )}
          {word.ant.length > 0 && (
            <span>
              반의어 :{" "}
              {word.ant.map((ant, index) =>
                word.ant && index < word.ant.length - 1 ? ant + ", " : ant
              )}
            </span>
          )}
          <span>
            장기기억 촉진 점수 :{" "}
            {word.ltmsPoint <= 33
              ? `낮음(${word.ltmsPoint})`
              : word.ltmsPoint <= 66
              ? `중간(${word.ltmsPoint})`
              : `높음(${word.ltmsPoint})`}
            <Meter
              min={0}
              max={100}
              optimum={word.ltmsPoint}
              value={word.ltmsPoint}
              point={word.ltmsPoint}
            />
          </span>
          <ButtonContainer>
            <button onClick={editWord}>{"단어 수정"}</button>
          </ButtonContainer>
        </Li>
      )}
    </form>
  );
};

export default Word;

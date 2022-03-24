import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
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
    meter {
      margin-left: 1em;
      &::-webkit-meter-even-less-good-value {
        background-color: rgba(192, 57, 43, 1);
      }
      &::-webkit-meter-optimum-value {
        background-color: rgba(241, 196, 15, 1);
      }
      &::-webkit-meter-suboptimum-value {
        background-color: rgba(46, 204, 113, 1);
      }
    }
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
      //   ease: [0.78, 0.14, 0.15, 0.86],
      duration: 0.7,
    },
  },
  show: {
    opacity: 1,
    y: 10,
    transition: {
      //   ease: [0.78, 0.14, 0.15, 0.86],
      duration: 0.7,
    },
  },
  //   hide: {
  //     opacity: 0,
  //     y: -30,
  //     transition: {
  //       //   ease: [0.78, 0.14, 0.15, 0.86],
  //       duration: 0.7,
  //     },
  //   },
};

const Word = ({ word }: IProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      //   controls.start("hide");
    }
  }, [controls, inView]);

  return (
    <Li variants={wordVar} initial="hidden" animate={controls} ref={ref}>
      <span>철자 : {word.spelling}</span>
      {word.pronunciation && word.pronunciation !== "" && (
        <span>발음 : {word.pronunciation}</span>
      )}
      <span>뜻 : {word.meaning}</span>
      {word.collocation && word.collocation?.length > 0 && (
        <span>
          활용 :{" "}
          {word.collocation.map((col, index) =>
            word.collocation && index < word.collocation.length - 1
              ? col + ", "
              : col
          )}
        </span>
      )}
      {word.association && word.association !== "" && (
        <span>기억 단서 : {word.association}</span>
      )}
      {word.ex && word.ex?.length > 0 && (
        <span>
          예문 :{" "}
          {word.ex.split("\n").length > 1
            ? word.ex
                .split("\n")
                .map((line, index) => (
                  <span key={String(word._id) + `_ex${index}`}>{line}</span>
                ))
            : word.ex}
        </span>
      )}
      {word.syn && word.syn?.length > 0 && (
        <span>
          동의어 :{" "}
          {word.syn.map((syn, index) =>
            word.syn && index < word.syn.length - 1 ? syn + ", " : syn
          )}
        </span>
      )}
      {word.ant && word.ant?.length > 0 && (
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
        <meter
          min={0}
          max={100}
          low={33}
          high={67}
          value={word.ltmsPoint}
        ></meter>
      </span>
    </Li>
  );
};

export default Word;

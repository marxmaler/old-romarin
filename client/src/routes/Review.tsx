import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { wordState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import Word from "../components/Word";
import { LangSwitchVar } from "../components/WordForm";
import { lang } from "../util/constant";

const Container = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.9);
  min-height: 50vh;
  max-width: 100%;
  color: rgba(255, 255, 255, 1);
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ul {
    width: max-content;
  }
`;

const Lang = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  svg {
    width: 1em;
    cursor: pointer;
    path {
      fill: white;
    }
  }
  h3 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 23px;
    width: 7em;
    font-weight: 700;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  }
`;

const wordListVar = {
  hidden: {
    y: -30,
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.7,
    },
  },
  hide: {
    y: -30,
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
};

function Review() {
  const words = useRecoilValue(wordState);
  const langSettingMenu = ["All", ...lang];
  const [langNum, setLangNum] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevLang = () => {
    setDirection(-1);
    setLangNum((prev) => (prev > 0 ? prev - 1 : langSettingMenu.length - 1));
  };
  const nextLang = () => {
    setDirection(1);
    setLangNum((prev) => (prev < langSettingMenu.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <HeaderMenu />
      <Container>
        <Lang>
          <svg
            onClick={prevLang}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
          </svg>
          <AnimatePresence exitBeforeEnter custom={direction}>
            <motion.h3
              key={langNum}
              custom={direction}
              variants={LangSwitchVar}
              initial="fadeIn"
              animate="stay"
              exit="fadeOut"
              transition={{ duration: 0.7 }}
            >
              {langSettingMenu[langNum]}
            </motion.h3>
          </AnimatePresence>
          <svg
            onClick={nextLang}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
          </svg>
        </Lang>
        <AnimatePresence exitBeforeEnter>
          <motion.ul
            key={langSettingMenu[langNum] + "_wordList"}
            variants={wordListVar}
            initial="hidden"
            animate="show"
            exit="hide"
          >
            {words.map((word) =>
              langSettingMenu[langNum] === "All" ? (
                <Word key={String(word._id)} word={word} />
              ) : (
                word.lang === langSettingMenu[langNum] && (
                  <Word key={String(word._id)} word={word} />
                )
              )
            )}
          </motion.ul>
        </AnimatePresence>
      </Container>
    </>
  );
}

export default Review;

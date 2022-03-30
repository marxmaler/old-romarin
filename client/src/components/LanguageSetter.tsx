import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { languageState } from "../atoms";
import { languages } from "../util/language";

const Lang = styled.div<{ page: string }>`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  svg {
    width: 1em;
    cursor: pointer;
    path {
      fill: ${({ page }) => {
        return page === "review" ? "white" : "black";
      }};
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

export const LangSwitchVar = {
  fadeIn: (direction: number) => ({
    x: 25 * -direction,
    opacity: 0,
  }),
  fadeOut: (direction: number) => ({
    x: 25 * direction,
    opacity: 0,
  }),
  stay: {
    x: 0,
    opacity: 1,
  },
};

interface IProp {
  page: string;
  langNum: number;
  setLangNum: React.Dispatch<React.SetStateAction<number>>;
}

function LanguageSetter({ page, langNum, setLangNum }: IProp) {
  const [direction, setDirection] = useState(1);
  const languageOptions = ["review", "testSetting"].includes(page)
    ? ["All", ...languages]
    : languages;

  const [language, setLanguage] = useRecoilState(languageState);

  useEffect(() => {
    setLanguage(languageOptions[langNum]);
  }, [langNum]);

  const prevLanguage = () => {
    setDirection(-1);
    setLangNum((prev) => (prev > 0 ? prev - 1 : languageOptions.length - 1));
  };
  const nextLanguage = () => {
    setDirection(1);
    setLangNum((prev) => (prev < languageOptions.length - 1 ? prev + 1 : 0));
  };

  return (
    <Lang page={page}>
      <svg
        onClick={prevLanguage}
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
          {language}
        </motion.h3>
      </AnimatePresence>
      <svg
        onClick={nextLanguage}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
      </svg>
    </Lang>
  );
}

export default LanguageSetter;

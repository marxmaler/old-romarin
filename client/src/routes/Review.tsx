import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { languageState, wordsSelector, wordsState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import LanguageSetter from "../components/LanguageSetter";
import Word from "../components/Word";

const Container = styled(motion.div)`
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(16, 14, 25, 1)
  );
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
  const [langNum, setLangNum] = useState(0);
  const language = useRecoilValue(languageState);
  const words = useRecoilValue(wordsSelector);

  return (
    <>
      <HeaderMenu />
      <Container>
        <LanguageSetter
          page={"review"}
          langNum={langNum}
          setLangNum={setLangNum}
        />
        <AnimatePresence exitBeforeEnter>
          <motion.ul
            key={language + "_wordList"}
            variants={wordListVar}
            initial="hidden"
            animate="show"
            exit="hide"
          >
            {words.map((word) => (
              <Word key={String(word._id)} word={word} />
            ))}
          </motion.ul>
        </AnimatePresence>
        <Link to={"/"}>
          <button>뒤로 가기</button>
        </Link>
      </Container>
    </>
  );
}

export default Review;

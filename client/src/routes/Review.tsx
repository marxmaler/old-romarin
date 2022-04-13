import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { languageState, wordsSelector } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import LanguageSetter from "../components/LanguageSetter";
import Word from "../components/Word";
import { NoWords, ReviewContainer, wordListVar } from "../styles/routeStyle";

function Review() {
  const [langNum, setLangNum] = useState(0);
  const language = useRecoilValue(languageState);
  const words = useRecoilValue(wordsSelector);

  return (
    <>
      <HeaderMenu />
      <ReviewContainer>
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
            {words.length > 0 ? (
              words.map((word) => <Word key={String(word._id)} word={word} />)
            ) : (
              <NoWords>복습할 단어가 없습니다.</NoWords>
            )}
          </motion.ul>
        </AnimatePresence>
        <Link to={"/"}>
          <button>뒤로 가기</button>
        </Link>
      </ReviewContainer>
    </>
  );
}

export default Review;

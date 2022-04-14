import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { languageState, testSettingState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import Word from "../components/Word";
import { ReviewContainer } from "../styles/containerStyle";
import { NoWords } from "../styles/formStyle";
import { wordListVar } from "../styles/motionVariants";

function ReviewBeforeTest() {
  const language = useRecoilValue(languageState);
  const { selectedWords } = useRecoilValue(testSettingState);

  return (
    <>
      <HeaderMenu />
      <ReviewContainer>
        <AnimatePresence exitBeforeEnter>
          <motion.ul
            key={language + "_wordList"}
            variants={wordListVar}
            initial="hidden"
            animate="show"
            exit="hide"
          >
            {selectedWords.length > 0 ? (
              selectedWords.map((word) => (
                <Word key={String(word._id)} word={word} />
              ))
            ) : (
              <NoWords>복습할 단어가 없습니다.</NoWords>
            )}
          </motion.ul>
        </AnimatePresence>
        <Link to={"/words/test"}>
          <button>시험 보기</button>
        </Link>
      </ReviewContainer>
    </>
  );
}

export default ReviewBeforeTest;

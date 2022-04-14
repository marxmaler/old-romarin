import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, testSettingState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import Word from "../components/Word";
import { IWord } from "../interfaces";
import { ReviewContainer } from "../styles/containerStyle";
import { NoWords } from "../styles/formStyle";
import { wordListVar } from "../styles/motionVariants";

function ReviewBeforeTest() {
  const language = useRecoilValue(languageState);
  const [testSetting, setTestSetting] = useRecoilState(testSettingState);
  const { selectedWords } = testSetting;
  //   const setTestSetting = useSetRecoilState(test)
  const navigate = useNavigate();
  const reShuffleWords = () => {
    const shuffledArr: IWord[] = [];
    const indexArr = [...Array(selectedWords.length).keys()];
    while (shuffledArr.length < selectedWords.length) {
      const randomIndex = Math.floor(Math.random() * indexArr.length);
      shuffledArr.push(selectedWords[indexArr[randomIndex]]);
      indexArr.splice(randomIndex, 1);
    }
    setTestSetting((prev) => ({ ...prev, selectedWords: shuffledArr }));

    navigate("/words/test");
  };

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
        {/* <Link to={"/words/test"}> */}
        <button onClick={reShuffleWords}>시험 보기</button>
      </ReviewContainer>
    </>
  );
}

export default ReviewBeforeTest;

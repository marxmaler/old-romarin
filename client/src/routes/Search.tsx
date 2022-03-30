import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IWord, loginState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import Word from "../components/Word";
import { koPropToEnProp } from "../util/word";

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

const Form = styled.form`
  span {
    display: block;
    input {
      margin-bottom: 1em;
    }
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

interface IForm {
  query: string;
  queryBasis: string;
}

function Search() {
  const { user } = useRecoilValue(loginState);
  const [words, setWords] = useState<IWord[]>([]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<IForm>();

  const onValid = async ({ query, queryBasis }: IForm) => {
    const { words: matchedWords } = await (
      await fetch(`/api/words/${String(user?._id)}/${queryBasis}/${query}`)
    ).json();

    setWords(() => matchedWords);

    console.log(matchedWords);
  };
  return (
    <>
      <HeaderMenu />
      <Container>
        <Form onSubmit={handleSubmit(onValid)}>
          <span>
            검색 기준 :{" "}
            <select
              {...register("queryBasis", { required: true, value: "spelling" })}
            >
              {["철자", "뜻", "유의어", "반의어"].map((basis) => (
                <option value={koPropToEnProp(basis)}>{basis}</option>
              ))}
            </select>
          </span>
          <span>
            검색어 : <input {...register("query", { required: true })} />
            <button>검색</button>
          </span>
        </Form>
        <AnimatePresence exitBeforeEnter>
          <motion.ul
            key={"wordList"}
            variants={wordListVar}
            initial="hidden"
            animate="show"
            exit="hide"
          >
            {isSubmitSuccessful &&
              words.map((word) => <Word key={String(word._id)} word={word} />)}
          </motion.ul>
        </AnimatePresence>
        {isSubmitSuccessful && (
          <Link to={"/"}>
            <button>뒤로 가기</button>
          </Link>
        )}
      </Container>
    </>
  );
}

export default Search;

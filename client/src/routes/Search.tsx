import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import Word from "../components/Word";
import { IWord } from "../interfaces";
import { koPropToEnProp } from "../util/word";

const Container = styled(motion.div)`
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(62, 54, 102, 1)
  );
  min-height: 85vh;
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
    strong {
      font-size: 20px;
      font-weight: 600;
      display: block;
      margin-top: 10px;
    }
    input {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      margin-top: 10px;
      border: 0;
      color: ${(props) => props.theme.periwinkleShade50};
      &::placeholder {
        text-align: center;
      }
    }
  }
`;

const Select = styled.select`
  background-color: transparent;
  border: 1px solid white;
  border-radius: 10px;
  outline: 0 none;
  padding: 0 5px;
  text-align: center;
  font-size: 16px;
  color: white;
  cursor: pointer;
  option {
    color: white;
    background-color: ${(props) => props.theme.periwinkleTint30};
    padding: 3px 0;
    font-size: 16px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: max-content;
  margin-top: 10px;

  button {
    background-color: ${(props) => props.theme.periwinkleShade10};
  }
`;

const Input = styled(motion.input)``;

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
    setFocus,
  } = useForm<IForm>();

  useEffect(() => {
    setTimeout(() => {
      setFocus("query");
    }, 700);
  }, [setFocus]);

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
            <Select
              {...register("queryBasis", { required: true, value: "spelling" })}
            >
              {["철자", "뜻", "유의어", "반의어"].map((basis, index) => (
                <option
                  key={`queryBasisOption_${index}`}
                  value={koPropToEnProp(basis)}
                >
                  {basis}
                </option>
              ))}
            </Select>
          </span>
          <span>
            <strong>검색어</strong>
            <Input
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7 }}
              {...register("query", { required: true })}
            />
            <ButtonContainer>
              <button>검색</button>
            </ButtonContainer>
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
          <ButtonContainer>
            <Link to={"/"}>
              <button>뒤로 가기</button>
            </Link>
          </ButtonContainer>
        )}
      </Container>
    </>
  );
}

export default Search;

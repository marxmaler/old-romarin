import WordForm from "../components/WordForm";
import HeaderMenu from "../components/HeaderMenu";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(16, 14, 25, 1)
  );
  min-height: 100vh;
  width: 100%;
  color: white;
  padding: 50px;
`;

function AddWords() {
  return (
    <>
      <HeaderMenu />
      <Container>
        <WordForm></WordForm>
      </Container>
    </>
  );
}

export default AddWords;

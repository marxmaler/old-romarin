import { motion } from "framer-motion";
import styled from "styled-components";
import HeaderMenu from "../components/HeaderMenu";
import JoinForm from "../components/JoinForm";
import OauthBox from "../components/OauthBox";

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

function Join() {
  return (
    <>
      <HeaderMenu />
      <Container>
        <JoinForm></JoinForm>
        <OauthBox></OauthBox>
      </Container>
    </>
  );
}

export default Join;

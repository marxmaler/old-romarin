import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
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

export const ReviewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ul {
    width: max-content;
  }
`;

export const SearchContainer = styled(Container)`
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(62, 54, 102, 1)
  );
  display: flex;
  flex-direction: column;
  align-items: center;

  h3:first-child {
    font-size: 23px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

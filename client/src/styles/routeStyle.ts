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

export const NoWords = styled.span`
  display: block;
  margin-bottom: 50px;
  font-size: 20px;
`;

export const wordListVar = {
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

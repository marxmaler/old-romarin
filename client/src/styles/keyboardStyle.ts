import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

export const keyPressAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(2px);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const KeyboardWrapper = styled(motion.div)`
  position: absolute;
  background-color: ${(props) => props.theme.periwinkleShade50};
  border: 1px solid ${(props) => props.theme.periwinkleTint90};
  color: ${(props) => props.theme.periwinkleTint90};
  width: max-content;
  padding: 10px;
  border-radius: 10px;
  left: 0;
  right: 0;
  margin: 0 auto !important;
  z-index: 1;
  &.upper {
    bottom: 10vh;
  }
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

export const Key = styled.div`
  width: 40px;
  height: 40px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.periwinkleTint90};
  border-radius: 5px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: 3px ${(props) => props.theme.periwinkleTint70} solid;
  transition: 0.1s all;
  &:hover {
    opacity: 0.7;
    transform: translateY(2px);
  }
  &.pressed {
    animation: ${keyPressAnimation} 0.1s ease-in-out;
  }
`;

export const BACKSPACEKey = styled(Key)`
  font-size: 30px;
  width: 80px;
`;

export const TABKey = styled(Key)`
  font-size: 12px;
  width: 65px;
`;

export const BackSlashKey = styled(Key)`
  width: 55px;
`;

export const CAPSLOCKKey = styled(Key)`
  font-size: 11px;
  width: 75px;
  line-height: 1em;
`;
export const SHIFTKey = styled(Key)`
  font-size: 12px;
  width: 100px;
`;

export const RightSHIFTKey = styled(Key)`
  font-size: 12px;
  width: 110px;
`;

export const ENTERKey = styled(Key)`
  font-size: 12px;
  width: 90px;
`;

export const keyBoardVar = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  appear: {
    y: 10,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  disappear: {
    y: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

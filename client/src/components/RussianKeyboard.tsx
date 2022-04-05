import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useRef } from "react";
import styled, { keyframes } from "styled-components";

const keyPressAnimation = keyframes`
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

const Wrapper = styled(motion.div)`
  position: absolute;
  background-color: ${(props) => props.theme.periwinkleShade50};
  border: 1px solid ${(props) => props.theme.periwinkleTint90};
  color: ${(props) => props.theme.periwinkleTint90};
  width: max-content;
  padding: 10px;
  border-radius: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1;
`;
const Row = styled.div`
  display: flex;
  margin-bottom: 5px;
  &:nth-child(2) {
    /* padding-left: 29px; */
  }
  &:nth-child(3) {
    /* padding-left: 38px; */
  }
  &:last-child {
    /* padding-left: 55px; */
  }
`;
const Key = styled.div`
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

const BACKSPACEKey = styled(Key)`
  font-size: 30px;
  width: 80px;
`;

const TABKey = styled(Key)`
  font-size: 12px;
  width: 65px;
`;

const BackSlashKey = styled(Key)`
  width: 55px;
`;

const CAPSLOCKKey = styled(Key)`
  font-size: 11px;
  width: 75px;
`;
const SHIFTKey = styled(Key)`
  font-size: 12px;
  width: 100px;
`;

const RightSHIFTKey = styled(Key)`
  font-size: 12px;
  width: 110px;
`;

const ENTERKey = styled(Key)`
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

interface IKeyboardProps {
  lastInput: string;
  keyboardRef: React.RefObject<HTMLDivElement>;
  setLastInput: React.Dispatch<React.SetStateAction<string>>;
  shiftOn: boolean;
  capsLockOn: boolean;
}

function RussianKeyboard({
  lastInput,
  setLastInput,
  keyboardRef,
  shiftOn,
  capsLockOn,
}: IKeyboardProps) {
  const cap = (!shiftOn && capsLockOn) || (shiftOn && !capsLockOn);

  // const onKeyClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   //input을 ref나 get으로 찾아서 input창 value에 key 이어붙이기
  //   // event.currentTarget.classList.add("pressed");
  // };

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  // let timeoutId: NodeJS.Timeout | null = null;
  //만약 inputValue가 해당 key content과 일치한다면 click 이벤트 강제로 발동 시키기

  useEffect(() => {
    // console.log(lastInput[0]);
    const pressedKey = document.getElementById(`rus_key_${lastInput}`);
    // console.log(pressedKey);
    if (pressedKey?.classList.contains("pressed") && timeoutId.current) {
      clearTimeout(timeoutId.current);
      pressedKey.classList.remove("pressed");
    }
    pressedKey?.classList.add("pressed");
    timeoutId.current = setTimeout(() => {
      pressedKey?.classList.remove("pressed");
    }, 100);
    setLastInput("");
  }, [lastInput, setLastInput]);
  return (
    <Wrapper
      ref={keyboardRef}
      variants={keyBoardVar}
      initial="hidden"
      animate="appear"
      exit="disappear"
    >
      <Row>
        {cap
          ? [
              "Ё",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "0",
              "-",
              "Ъ",
            ].map((key) => (
              <Key key={`rus_key_${key}`} id={`rus_key_${key}`}>
                {key}
              </Key>
            ))
          : [
              "ё",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "0",
              "-",
              "ъ",
            ].map((key) => (
              <Key key={`rus_key_${key}`} id={`rus_key_${key}`}>
                {key}
              </Key>
            ))}
        <BACKSPACEKey>←</BACKSPACEKey>
      </Row>
      <Row>
        <TABKey>TAB</TABKey>
        {cap
          ? ["Я", "Ш", "Е", "Р", "Т", "Ы", "У", "И", "О", "П", "Ю", "Щ"].map(
              (key) => (
                <Key key={`rus_key_${key}`} id={`rus_key_${key}`}>
                  {key}
                </Key>
              )
            )
          : ["я", "ш", "е", "р", "т", "ы", "у", "и", "о", "п", "ю", "щ"].map(
              (key) => (
                <Key key={`rus_key_${key}`} id={`rus_key_${key}`}>
                  {key}
                </Key>
              )
            )}
        <BackSlashKey>{cap ? "Э" : "э"}</BackSlashKey>
      </Row>
      <Row>
        <CAPSLOCKKey>
          CAPS
          <br />
          LOCK
        </CAPSLOCKKey>
        {cap
          ? ["А", "С", "Д", "Ф", "Г", "Ч", "Й", "К", "Л", "Ь", "Ж"].map(
              (key) => (
                <Key key={`rus_key_${key}`} id={`rus_key_${key}`}>
                  {key}
                </Key>
              )
            )
          : ["а", "с", "д", "ф", "г", "ч", "й", "к", "л", "ь", "ж"].map(
              (key) => (
                <Key key={`rus_key_${key}`} id={`rus_key_${key}`}>
                  {key}
                </Key>
              )
            )}
        <ENTERKey>ENTER</ENTERKey>
      </Row>
      <Row>
        <SHIFTKey>SHIFT</SHIFTKey>
        {cap
          ? ["З", "Х", "Ц", "В", "Б", "Н", "М", ",", ".", "/"].map((key) => (
              <Key key={`rus_key_${key}`} id={`rus_key_${key}`}>
                {key}
              </Key>
            ))
          : ["з", "х", "ц", "в", "б", "н", "м", ",", ".", "/"].map((key) => (
              <Key key={`rus_key_${key}`} id={`rus_key_${key}`}>
                {key}
              </Key>
            ))}
        <RightSHIFTKey>SHIFT</RightSHIFTKey>
      </Row>
    </Wrapper>
  );
}

export default RussianKeyboard;

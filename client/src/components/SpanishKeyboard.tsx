import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { onKeyClick } from "../util/keyboard";

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

const titles = [
  "~(shift + `) + n",
  "'(작은 따옴표) + a",
  "'(작은 따옴표) + e",
  "'(작은 따옴표) + i",
  "'(작은 따옴표) + o",
  "'(작은 따옴표) + u",
  '"(큰 따옴표) + u',
];

interface IKeyboardProps {
  keyboardRef: React.RefObject<HTMLDivElement>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  lastInput: string;
  setLastInput: React.Dispatch<React.SetStateAction<string>>;
  shiftOn: boolean;
  setShiftOn: React.Dispatch<React.SetStateAction<boolean>>;
  capsLockOn: boolean;
  setCapsLockOn: React.Dispatch<React.SetStateAction<boolean>>;
  //   apostropheOn: boolean;
  //   setApostropheOn: React.Dispatch<React.SetStateAction<boolean>>;
  //   quotaionMarkOn: boolean;
  //   setQuotaionMarkOn: React.Dispatch<React.SetStateAction<boolean>>;
  //   tildeOn: boolean;
  //   setTildeOn: React.Dispatch<React.SetStateAction<boolean>>;
  //   altOn: boolean;
  //   setAltOn: React.Dispatch<React.SetStateAction<boolean>>;
  specialKeyOnRef: React.MutableRefObject<{
    apostropheOn: boolean;
    quotaionMarkOn: boolean;
    tildeOn: boolean;
    altOn: boolean;
  }>;
}

function SpanishKeyboard({
  lastInput,
  setLastInput,
  keyboardRef,
  inputRef,
  shiftOn,
  setShiftOn,
  capsLockOn,
  setCapsLockOn,
  specialKeyOnRef,
}: //   apostropheOn,
//   setApostropheOn,
//   quotaionMarkOn,
//   setQuotaionMarkOn,
//   tildeOn,
//   setTildeOn,
//   altOn,
//   setAltOn,
IKeyboardProps) {
  const [cap, setCap] = useState(
    (!shiftOn && capsLockOn) || (shiftOn && !capsLockOn)
  );
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // console.log(lastInput[0]);
    const pressedKey = document.getElementById(`esp_key_${lastInput}`);
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

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      setCapsLockOn(event.getModifierState("CapsLock"));
      setShiftOn(event.getModifierState("Shift"));
      if (specialKeyOnRef) {
        if (event.key === "'") {
          specialKeyOnRef.current.apostropheOn = true;
          //   console.log(event.key);
          event.preventDefault();
        }
        if (event.key === '"') {
          specialKeyOnRef.current.quotaionMarkOn = true;
          event.preventDefault();
        }
        if (event.key === "~") {
          specialKeyOnRef.current.tildeOn = true;
          event.preventDefault();
        }
        //크롬에서 alt키 누를때마다 자꾸 설정창 focus되게 하는 거 막기
        if (event.altKey === true) {
          specialKeyOnRef.current.altOn = event.altKey;
          event.preventDefault();
        }
      }
    });
    document.addEventListener("keyup", (event) => {
      setShiftOn(event.getModifierState("Shift"));
    });
  }, [setCapsLockOn, setShiftOn, specialKeyOnRef]);

  useEffect(() => {
    setCap((!shiftOn && capsLockOn) || (shiftOn && !capsLockOn));
  }, [shiftOn, capsLockOn, setCap]);

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
          ? ["Ñ", "Á", "É", "Í", "Ó", "Ú", "Ü", "¿", "¡"].map((key, index) => (
              <Key
                key={`esp_key_${key}`}
                id={`esp_key_${key}`}
                title={titles[index]}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))
          : ["ñ", "á", "é", "í", "ó", "ú", "ü", "¿", "¡"].map((key, index) => (
              <Key
                key={`esp_key_${key}`}
                id={`esp_key_${key}`}
                title={titles[index]}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))}
      </Row>
    </Wrapper>
  );
}

export default SpanishKeyboard;

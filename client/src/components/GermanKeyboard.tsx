import { useEffect, useRef, useState } from "react";
import { IKeyboardProps } from "../interfaces";
import {
  Key,
  keyBoardVar,
  Row,
  KeyboardWrapper,
} from "../styles/keyboardStyle";
import { onKeyClick } from "../util/keyboard";

const titles = [
  "alt + s",
  '"(큰 따옴표) + a',
  '"(큰 따옴표) + o',
  '"(큰 따옴표) + u',
];

const capTitles = [
  "alt + S",
  '"(큰 따옴표) + A',
  '"(큰 따옴표) + O',
  '"(큰 따옴표) + U',
];

function GermanKeyboard({
  lastInput,
  setLastInput,
  keyboardRef,
  inputRef,
  shiftOn,
  setShiftOn,
  capsLockOn,
  setCapsLockOn,
  specialKeyOnRef,
  className,
}: IKeyboardProps) {
  const [cap, setCap] = useState(
    (!shiftOn && capsLockOn) || (shiftOn && !capsLockOn)
  );
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // console.log(lastInput[0]);
    const pressedKey = document.getElementById(`deu_key_${lastInput}`);
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
        if (event.key === '"') {
          if (!specialKeyOnRef.current.quotaionMarkOn) {
            specialKeyOnRef.current.quotaionMarkOn = true;
            event.preventDefault();
          }
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
    <KeyboardWrapper
      className={className}
      ref={keyboardRef}
      variants={keyBoardVar}
      initial="hidden"
      animate="appear"
      exit="disappear"
    >
      <Row>
        {cap
          ? ["ẞ", "Ä", "Ö", "Ü"].map((key, index) => (
              <Key
                key={`deu_key_${key}`}
                id={`deu_key_${key}`}
                title={capTitles[index]}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))
          : ["ß", "ä", "ö", "ü"].map((key, index) => (
              <Key
                key={`deu_key_${key}`}
                id={`deu_key_${key}`}
                title={titles[index]}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))}
      </Row>
    </KeyboardWrapper>
  );
}

export default GermanKeyboard;

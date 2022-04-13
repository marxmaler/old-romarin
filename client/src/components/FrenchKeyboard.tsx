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
  ",(쉼표) + c",
  "'(작은 따옴표) + e",
  "`(~ 밑에 있는 따옴표) + a",
  "`(~ 밑에 있는 따옴표) + e",
  "`(~ 밑에 있는 따옴표) + u",
  "^(shift + 6) + a",
  "^(shift + 6) + e",
  "^(shift + 6) + i",
  "^(shift + 6) + o",
  "^(shift + 6) + u",
  '"(큰 따옴표) + e',
  '"(큰 따옴표) + i',
  '"(큰 따옴표) + u',
  '"(큰 따옴표) + y',
  "alt + a + e",
  "alt + o + e",
];

const capTitles = [
  ",(쉼표) + C",
  "'(작은 따옴표) + E",
  "`(~ 밑에 있는 따옴표) + A",
  "`(~ 밑에 있는 따옴표) + E",
  "`(~ 밑에 있는 따옴표) + U",
  "^(shift + 6) + A",
  "^(shift + 6) + E",
  "^(shift + 6) + I",
  "^(shift + 6) + O",
  "^(shift + 6) + U",
  '"(큰 따옴표) + E',
  '"(큰 따옴표) + I',
  '"(큰 따옴표) + U',
  '"(큰 따옴표) + Y',
  "alt + A + E",
  "alt + O + E",
];

function FrenchKeyboard({
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
        if (event.key === "'") {
          if (!specialKeyOnRef.current.apostropheOn) {
            specialKeyOnRef.current.apostropheOn = true;
            event.preventDefault();
          }
        }
        if (event.key === '"') {
          if (!specialKeyOnRef.current.quotaionMarkOn) {
            specialKeyOnRef.current.quotaionMarkOn = true;
            event.preventDefault();
          }
        }
        //크롬에서 alt키 누를때마다 자꾸 설정창 focus되게 하는 거 막기
        if (event.altKey) {
          if (!specialKeyOnRef.current.altOn) {
            specialKeyOnRef.current.altOn = event.altKey;
          }
          event.preventDefault();
        } else if (
          specialKeyOnRef.current.altOn &&
          specialKeyOnRef.current.altBuffer === "" &&
          ["a", "o", "A", "O"].includes(event.key)
        ) {
          specialKeyOnRef.current.altBuffer = event.key;
          event.preventDefault();
        }

        if (event.key === ",") {
          if (!specialKeyOnRef.current.commaOn) {
            specialKeyOnRef.current.commaOn = true;
            event.preventDefault();
          }
        }
        if (event.key === "`") {
          if (!specialKeyOnRef.current.backtickOn) {
            specialKeyOnRef.current.backtickOn = true;
            event.preventDefault();
          }
        }
        if (event.key === "^") {
          if (!specialKeyOnRef.current.caretOn) {
            specialKeyOnRef.current.caretOn = true;
            event.preventDefault();
          }
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
          ? [
              "Ç",
              "É",
              "À",
              "È",
              "Ù",
              "Â",
              "Ê",
              "Î",
              "Ô",
              "Û",
              "Ë",
              "Ï",
              "Ü",
              "Ÿ",
              "Æ",
              "Œ",
            ].map((key, index) => (
              <Key
                key={`fr_key_${key}`}
                id={`fr_key_${key}`}
                title={capTitles[index]}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))
          : [
              "ç",
              "é",
              "à",
              "è",
              "ù",
              "â",
              "ê",
              "î",
              "ô",
              "û",
              "ë",
              "ï",
              "ü",
              "ÿ",
              "æ",
              "œ",
            ].map((key, index) => (
              <Key
                key={`fr_key_${key}`}
                id={`fr_key_${key}`}
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

export default FrenchKeyboard;

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { onInputChange, onKeyDown } from "../util/keyboard";
import FrenchKeyboard from "./FrenchKeyboard";
import GermanKeyboard from "./GermanKeyboard";
import RussianKeyboard from "./RussianKeyboard";
import SpanishKeyboard from "./SpanishKeyboard";

const Wrapper = styled.div`
  position: relative;
`;

interface ITextareaWithKeyboardProps {
  register: UseFormRegister<any>;
  language: string;
  inputName: string;
  placeholder: string;
  isRequired: boolean;
  defaultValue?: string;
  isUpper?: boolean;
}

function TextareaWithKeyboard({
  register,
  language,
  inputName,
  placeholder,
  isRequired,
  defaultValue,
  isUpper,
}: ITextareaWithKeyboardProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [lastInput, setLastInput] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [shiftOn, setShiftOn] = useState(false);
  const specialKeyOnRef = useRef({
    apostropheOn: false,
    quotaionMarkOn: false,
    tildeOn: false,
    altOn: false,
    commaOn: false,
    backtickOn: false,
    caretOn: false,
    altBuffer: "",
  });
  const keyboardRef = useRef<HTMLDivElement>(null);
  const [hoverKeyboard, setHoverKeyboard] = useState(false);
  const [inputBlur, setInputBlur] = useState(true);
  const [backSpaceOn, setBackSpaceOn] = useState(false);

  const onInputFocus = () => {
    setInputBlur(false);
    if (["Español", "Français", "Deutsch", "Русский"].includes(language)) {
      setShowKeyboard(true);
    }
  };
  const onInputBlur = () => {
    setInputBlur(true);
    if (!hoverKeyboard) {
      setShowKeyboard(false);
    }
  };

  useEffect(() => {
    keyboardRef.current?.addEventListener("mouseover", () => {
      setHoverKeyboard(true);
    });
    keyboardRef.current?.addEventListener("mouseleave", () => {
      setHoverKeyboard(false);
      if (inputBlur) {
        setShowKeyboard(false);
      }
    });
  }, [setHoverKeyboard, setShowKeyboard, inputBlur, keyboardRef]);

  const { ref, ...rest } = register(inputName, {
    required: isRequired ? true : false,
    value: defaultValue ? defaultValue : "",
    onChange: (event: React.FormEvent<HTMLTextAreaElement>) => {
      onInputChange({
        event,
        language,
        setLastInput,
        capsLockOn,
        shiftOn,
        specialKeyOnRef,
        backSpaceOn,
        setBackSpaceOn,
      });
    },
    onBlur: onInputBlur,
  });

  return (
    <Wrapper>
      <textarea
        rows={3}
        {...rest}
        placeholder={placeholder}
        onFocus={onInputFocus}
        onKeyDown={(event) =>
          onKeyDown({
            event,
            language,
            setCapsLockOn,
            setShiftOn,
            specialKeyOnRef,
            setBackSpaceOn,
          })
        }
        onKeyUp={(event: React.KeyboardEvent) => {
          setShiftOn(event.getModifierState("Shift"));
        }}
        ref={(element) => {
          ref(element);
          inputRef.current = element;
        }}
      />
      <AnimatePresence exitBeforeEnter>
        {showKeyboard && language === "Español" ? (
          <SpanishKeyboard
            className={isUpper ? "upper" : ""}
            lastInput={lastInput}
            setLastInput={setLastInput}
            keyboardRef={keyboardRef}
            inputRef={inputRef}
            shiftOn={shiftOn}
            setShiftOn={setShiftOn}
            capsLockOn={capsLockOn}
            setCapsLockOn={setCapsLockOn}
            specialKeyOnRef={specialKeyOnRef}
          />
        ) : showKeyboard && language === "Français" ? (
          <FrenchKeyboard
            className={isUpper ? "upper" : ""}
            lastInput={lastInput}
            setLastInput={setLastInput}
            keyboardRef={keyboardRef}
            inputRef={inputRef}
            shiftOn={shiftOn}
            setShiftOn={setShiftOn}
            capsLockOn={capsLockOn}
            setCapsLockOn={setCapsLockOn}
            specialKeyOnRef={specialKeyOnRef}
          />
        ) : showKeyboard && language === "Deutsch" ? (
          <GermanKeyboard
            className={isUpper ? "upper" : ""}
            lastInput={lastInput}
            setLastInput={setLastInput}
            keyboardRef={keyboardRef}
            inputRef={inputRef}
            shiftOn={shiftOn}
            setShiftOn={setShiftOn}
            capsLockOn={capsLockOn}
            setCapsLockOn={setCapsLockOn}
            specialKeyOnRef={specialKeyOnRef}
          />
        ) : (
          showKeyboard &&
          language === "Русский" && (
            <RussianKeyboard
              className={isUpper ? "upper" : ""}
              keyboardRef={keyboardRef}
              inputRef={inputRef}
              lastInput={lastInput}
              setLastInput={setLastInput}
              shiftOn={shiftOn}
              setShiftOn={setShiftOn}
              capsLockOn={capsLockOn}
              setCapsLockOn={setCapsLockOn}
              backSpaceOn={backSpaceOn}
              setBackSpaceOn={setBackSpaceOn}
            />
          )
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default TextareaWithKeyboard;

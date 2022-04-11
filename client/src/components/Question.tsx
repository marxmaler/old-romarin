import { useRef, useState } from "react";
import styled from "styled-components";
import { IQuestionProp } from "../interfaces";
import { onInputChange, onKeyDown } from "../util/keyboard";
import {
  getLanguageInKorean,
  languages,
  languagesInKo,
} from "../util/language";
import FrenchKeyboard from "./FrenchKeyboard";
import RussianKeyboard from "./RussianKeyboard";

const Li = styled.li`
  width: 60%;
  background-color: ${(props) => props.theme.periwinkleTint50};
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 20px;
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  h3 {
    color: ${(props) => props.theme.periwinkleShade50};
    font-size: 20px;
    display: block;
    font-weight: 700;
    line-height: 1.5em;
    span {
      font-weight: 500;
      line-height: 1.5em;
      font-size: 16px;
      max-width: 80%;
      color: white;
    }
  }
  label {
    margin-top: 10px;
    strong {
      font-size: 20px;
      font-weight: 600;
      display: block;
    }
  }
  input {
    margin-top: 10px;
    width: 80%;
    border-radius: 10px;
    padding: 10px;
    border: 0;
    &::placeholder {
      text-align: center;
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  display: block;
  margin-top: 1em;
`;

const DarkBox = styled.div`
  background-color: ${(props) => props.theme.periwinkleShade30};
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0px;
  color: ${(props) => props.theme.periwinkleTint90};
  border: ${(props) => props.theme.periwinkleTint90} 1px solid;
  span {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    strong {
      margin-bottom: 10px;
    }
  }
`;

const TransparentBox = styled.div`
  background-color: transparent;
  padding: 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.periwinkleShade50};
  span {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    strong {
      margin-bottom: 10px;
    }
  }
`;

function Question({ word, register, errors }: IQuestionProp) {
  const languageInKo = getLanguageInKorean(word.language);

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [lastInput, setLastInput] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [shiftOn, setShiftOn] = useState(false);
  const keyboardRef = useRef<HTMLDivElement>(null);
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
  const questionInputRef = useRef<HTMLInputElement | null>(null);

  const onQuestionInputFocus = () => {
    if (languageInKo === "프랑스어" || languageInKo === "러시아어") {
      setShowKeyboard(true);
    }
  };
  const onQuestionInputBlur = () => {
    setShowKeyboard(false);
  };

  const { ref, ...registerRest } = register(`${word._id}`, {
    required: "답안을 작성해주세요.",
    onChange: (event: React.FormEvent<HTMLInputElement>) =>
      onInputChange({
        event,
        language: languages[languagesInKo.indexOf(languageInKo)],
        setLastInput,
        capsLockOn,
        shiftOn,
        specialKeyOnRef,
      }),
    onBlur: onQuestionInputBlur,
  });
  return (
    <>
      <Li>
        <h3>
          보기에 제시된 뜻을 가진 {`${languageInKo}`} 단어의 철자를 빈 칸에
          써주세요.
          <DarkBox>
            <span>{word.meaning}</span>
          </DarkBox>
        </h3>
        <TransparentBox>
          <label htmlFor={String(word._id) + "_answer"}>
            <strong>답</strong>
          </label>
          <input
            id={String(word._id) + "_answer"}
            {...registerRest}
            onFocus={onQuestionInputFocus}
            onKeyDown={(event) =>
              onKeyDown({
                event,
                language: word.language,
                setCapsLockOn,
                setShiftOn,
                specialKeyOnRef,
              })
            }
            onKeyUp={(event: React.KeyboardEvent) => {
              setShiftOn(event.getModifierState("Shift"));
            }}
            ref={(element) => {
              ref(element);
              questionInputRef.current = element;
            }}
          />
          {showKeyboard && word.language === "Français" ? (
            <FrenchKeyboard
              lastInput={lastInput}
              setLastInput={setLastInput}
              keyboardRef={keyboardRef}
              inputRef={questionInputRef}
              shiftOn={shiftOn}
              setShiftOn={setShiftOn}
              capsLockOn={capsLockOn}
              setCapsLockOn={setCapsLockOn}
              specialKeyOnRef={specialKeyOnRef}
            />
          ) : (
            showKeyboard &&
            word.language === "Русский" && (
              <RussianKeyboard
                keyboardRef={keyboardRef}
                inputRef={questionInputRef}
                lastInput={lastInput}
                setLastInput={setLastInput}
                shiftOn={shiftOn}
                setShiftOn={setShiftOn}
                capsLockOn={capsLockOn}
                setCapsLockOn={setCapsLockOn}
              />
            )
          )}
          <ErrorMessage>
            {errors[`${String(word._id)}`]
              ? errors[`${String(word._id)}`].message
              : null}
          </ErrorMessage>
        </TransparentBox>
      </Li>
    </>
  );
}

export default Question;

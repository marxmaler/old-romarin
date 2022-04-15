interface IConvertKeyProps {
  key: string;
  language: string;
  cap: boolean;
  specialKeyOnRef: React.MutableRefObject<{
    apostropheOn: boolean;
    quotaionMarkOn: boolean;
    tildeOn: boolean;
    altOn: boolean;
    commaOn: boolean;
    backtickOn: boolean;
    caretOn: boolean;
    altBuffer: string;
  }>;
}
export const convertKey = ({
  key,
  language,
  cap,
  specialKeyOnRef,
}: IConvertKeyProps) => {
  const {
    apostropheOn,
    quotaionMarkOn,
    tildeOn,
    altOn,
    commaOn,
    backtickOn,
    caretOn,
    altBuffer,
  } = specialKeyOnRef.current;

  if (language === "Русский") {
    // console.log(cap);
    const convertedKey =
      key === "~" || (cap && key === "`")
        ? "Ё"
        : key === "`"
        ? "ё"
        : key === "+" || (cap && key === "=")
        ? "Ъ"
        : key === "="
        ? "ъ"
        : key === "Q"
        ? "Я"
        : key === "q"
        ? "я"
        : key === "W"
        ? "Ш"
        : key === "w"
        ? "ш"
        : key === "E"
        ? "Е"
        : key === "e"
        ? "е"
        : key === "R"
        ? "Р"
        : key === "r"
        ? "р"
        : key === "T"
        ? "Т"
        : key === "t"
        ? "т"
        : key === "Y"
        ? "Ы"
        : key === "y"
        ? "ы"
        : key === "U"
        ? "У"
        : key === "u"
        ? "у"
        : key === "I"
        ? "И"
        : key === "i"
        ? "и"
        : key === "O"
        ? "О"
        : key === "o"
        ? "о"
        : key === "P"
        ? "П"
        : key === "p"
        ? "п"
        : key === "{" || (cap && key === "[")
        ? "Ю"
        : key === "["
        ? "ю"
        : key === "}" || (cap && key === "]")
        ? "Щ"
        : key === "]"
        ? "щ"
        : key === "|" || (cap && key === "\\")
        ? "Э"
        : key === "\\"
        ? "э"
        : key === "A"
        ? "А"
        : key === "a"
        ? "а"
        : key === "S"
        ? "С"
        : key === "s"
        ? "с"
        : key === "D"
        ? "Д"
        : key === "d"
        ? "д"
        : key === "F"
        ? "Ф"
        : key === "f"
        ? "ф"
        : key === "G"
        ? "Г"
        : key === "g"
        ? "г"
        : key === "H"
        ? "Ч"
        : key === "h"
        ? "ч"
        : key === "J"
        ? "Й"
        : key === "j"
        ? "й"
        : key === "K"
        ? "К"
        : key === "k"
        ? "к"
        : key === "L"
        ? "Л"
        : key === "l"
        ? "л"
        : key === ":" || (cap && key === ";")
        ? "Ь"
        : key === ";"
        ? "ь"
        : key === '"' || (cap && key === "'")
        ? "Ж"
        : key === "'"
        ? "ж"
        : key === "Z"
        ? "З"
        : key === "z"
        ? "з"
        : key === "X"
        ? "Х"
        : key === "x"
        ? "х"
        : key === "C"
        ? "Ц"
        : key === "c"
        ? "ц"
        : key === "V"
        ? "В"
        : key === "v"
        ? "в"
        : key === "B"
        ? "Б"
        : key === "b"
        ? "б"
        : key === "N"
        ? "Н"
        : key === "n"
        ? "н"
        : key === "M"
        ? "М"
        : key === "m"
        ? "м"
        : key;

    return convertedKey;
  } else if (language === "Español") {
    const convertedKey =
      tildeOn && key === "N"
        ? "Ñ"
        : tildeOn && key === "n"
        ? "ñ"
        : tildeOn && key === "~"
        ? "~"
        : apostropheOn && key === "A"
        ? "Á"
        : apostropheOn && key === "a"
        ? "á"
        : apostropheOn && key === "E"
        ? "É"
        : apostropheOn && key === "e"
        ? "é"
        : apostropheOn && key === "I"
        ? "Í"
        : apostropheOn && key === "i"
        ? "í"
        : apostropheOn && key === "O"
        ? "Ó"
        : apostropheOn && key === "o"
        ? "ó"
        : apostropheOn && key === "U"
        ? "Ú"
        : apostropheOn && key === "u"
        ? "ú"
        : apostropheOn && key === "'"
        ? "'"
        : quotaionMarkOn && key === "U"
        ? "Ü"
        : quotaionMarkOn && key === "u"
        ? "ü"
        : quotaionMarkOn && key === '"'
        ? '"'
        : altOn && key === "?"
        ? "¿"
        : altOn && key === "!"
        ? "¡"
        : key;
    if (convertedKey !== key || ["'", '"', "~"].includes(key)) {
      //만약 convert가 발생했으면 각종 state 다 false로 reset하기
      specialKeyOnRef.current.tildeOn = false;
      specialKeyOnRef.current.apostropheOn = false;
      specialKeyOnRef.current.quotaionMarkOn = false;
      specialKeyOnRef.current.altOn = false;
    }

    return convertedKey;
  } else if (language === "Deutsch") {
    const convertedKey =
      quotaionMarkOn && key === "A"
        ? "Ä"
        : quotaionMarkOn && key === "a"
        ? "ä"
        : quotaionMarkOn && key === "O"
        ? "Ö"
        : quotaionMarkOn && key === "o"
        ? "ö"
        : quotaionMarkOn && key === "U"
        ? "Ü"
        : quotaionMarkOn && key === "u"
        ? "ü"
        : altOn && key === "S"
        ? "ẞ"
        : altOn && key === "s"
        ? "ß"
        : key;
    if (convertedKey !== key || ['"'].includes(key)) {
      //만약 convert가 발생했으면 각종 state 다 false로 reset하기
      specialKeyOnRef.current.quotaionMarkOn = false;
      specialKeyOnRef.current.altOn = false;
    }

    return convertedKey;
  } else if (language === "Français") {
    const convertedKey =
      commaOn && key === "C"
        ? "Ç"
        : commaOn && key === "c"
        ? "ç"
        : commaOn && key === ","
        ? ","
        : quotaionMarkOn && key === "E"
        ? "Ë"
        : quotaionMarkOn && key === "e"
        ? "ë"
        : quotaionMarkOn && key === "I"
        ? "Ï"
        : quotaionMarkOn && key === "i"
        ? "ï"
        : quotaionMarkOn && key === "U"
        ? "Ü"
        : quotaionMarkOn && key === "u"
        ? "ü"
        : quotaionMarkOn && key === "Y"
        ? "Ÿ"
        : quotaionMarkOn && key === "y"
        ? "ÿ"
        : quotaionMarkOn && key === '"'
        ? '"'
        : apostropheOn && key === "E"
        ? "É"
        : apostropheOn && key === "e"
        ? "é"
        : apostropheOn && key === "'"
        ? "'"
        : backtickOn && key === "A"
        ? "À"
        : backtickOn && key === "a"
        ? "à"
        : backtickOn && key === "E"
        ? "È"
        : backtickOn && key === "e"
        ? "è"
        : backtickOn && key === "U"
        ? "Ù"
        : backtickOn && key === "u"
        ? "ù"
        : backtickOn && key === "`"
        ? "`"
        : caretOn && key === "A"
        ? "Â"
        : caretOn && key === "a"
        ? "â"
        : caretOn && key === "E"
        ? "Ê"
        : caretOn && key === "e"
        ? "ê"
        : caretOn && key === "I"
        ? "Î"
        : caretOn && key === "i"
        ? "î"
        : caretOn && key === "O"
        ? "Ô"
        : caretOn && key === "o"
        ? "ô"
        : caretOn && key === "U"
        ? "Û"
        : caretOn && key === "u"
        ? "û"
        : caretOn && key === "^"
        ? "^"
        : altOn && altBuffer === "A" && key === "E"
        ? "Æ"
        : altOn && altBuffer === "a" && key === "e"
        ? "æ"
        : altOn && altBuffer === "O" && key === "E"
        ? "Œ"
        : altOn && altBuffer === "o" && key === "e"
        ? "œ"
        : key;
    if (
      convertedKey !== key ||
      ["'", '"', "`", ",", "^"].includes(key) ||
      (specialKeyOnRef.current.altOn &&
        !["a", "o", "A", "O"].includes(specialKeyOnRef.current.altBuffer)) ||
      (specialKeyOnRef.current.altOn &&
        specialKeyOnRef.current.altBuffer !== "" &&
        !["e", "E"].includes(key))
    ) {
      //만약 convert가 발생했으면 각종 state 다 false로 reset하기
      specialKeyOnRef.current.apostropheOn = false;
      specialKeyOnRef.current.quotaionMarkOn = false;
      specialKeyOnRef.current.backtickOn = false;
      specialKeyOnRef.current.commaOn = false;
      specialKeyOnRef.current.caretOn = false;
      specialKeyOnRef.current.altOn = false;
      specialKeyOnRef.current.altBuffer = "";
    }

    return convertedKey;
  }

  return key;
};

interface IOnInputChangeProps {
  event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>;
  language: string;
  setLastInput: React.Dispatch<React.SetStateAction<string>>;
  capsLockOn: boolean;
  shiftOn: boolean;
  specialKeyOnRef: React.MutableRefObject<{
    apostropheOn: boolean;
    quotaionMarkOn: boolean;
    tildeOn: boolean;
    altOn: boolean;
    commaOn: boolean;
    backtickOn: boolean;
    caretOn: boolean;
    altBuffer: string;
  }>;
  backSpaceOn: boolean;
  setBackSpaceOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const onInputChange = ({
  event,
  language,
  setLastInput,
  capsLockOn,
  shiftOn,
  specialKeyOnRef,
}: IOnInputChangeProps) => {
  const cap = (!shiftOn && capsLockOn) || (shiftOn && !capsLockOn);
  let input = event.currentTarget.selectionStart
    ? event.currentTarget.value[event.currentTarget.selectionStart - 1]
    : "";

  const selectStart = event.currentTarget.selectionStart;
  const convertedKey = convertKey({
    key: input,
    language,
    cap,
    specialKeyOnRef,
  });

  if (
    event.currentTarget.value.length > 0 &&
    event.currentTarget.selectionStart
  ) {
    const stringArray = [...event.currentTarget.value];
    stringArray[event.currentTarget.selectionStart - 1] = convertedKey;
    event.currentTarget.value = stringArray.join("");
  } else if (convertedKey && input !== "") {
    event.currentTarget.value = convertedKey;
  }
  event.currentTarget.selectionStart = Number(selectStart);
  event.currentTarget.selectionEnd = Number(selectStart);
  setLastInput(convertedKey);
};

export const onKeyClick = (
  event: React.MouseEvent<HTMLDivElement>,
  inputRef:
    | React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>
    | undefined
) => {
  const clickedKey = event.currentTarget.textContent;
  // console.log(inputRef?.current?.value);
  if (inputRef?.current) {
    const stringArr = [...inputRef?.current?.value];
    const selectionStart = inputRef?.current?.selectionStart;
    if (selectionStart !== null) {
      let newValue = "";
      if (clickedKey && inputRef.current.value.length < 1) {
        //아무 값도 없을 때
        newValue = clickedKey;
      } else if (selectionStart !== inputRef.current.value.length) {
        //중간에서 입력할 때
        const formerPart = stringArr.slice(0, selectionStart);
        const latterPart = stringArr.slice(selectionStart);
        newValue = [...formerPart, clickedKey, ...latterPart].join("");
      } else if (selectionStart === inputRef.current.value.length) {
        //맨 뒤에서 입력할 때
        newValue = [...stringArr, clickedKey].join("");
      } else {
      }
      inputRef.current.value = newValue;
      inputRef.current.selectionStart = selectionStart + 1;
      inputRef.current.selectionEnd = selectionStart + 1;
    }
  }
};

interface IOnKeyDownProps {
  language: string;
  event:
    | React.KeyboardEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLTextAreaElement>;
  setCapsLockOn?: React.Dispatch<React.SetStateAction<boolean>>;
  setShiftOn?: React.Dispatch<React.SetStateAction<boolean>>;
  specialKeyOnRef: React.MutableRefObject<{
    apostropheOn: boolean;
    quotaionMarkOn: boolean;
    tildeOn: boolean;
    altOn: boolean;
    commaOn: boolean;
    backtickOn: boolean;
    caretOn: boolean;
    altBuffer: string;
  }>;
  setBackSpaceOn: React.Dispatch<React.SetStateAction<boolean>>;
}
export const onKeyDown = ({
  event,
  language,
  setCapsLockOn,
  setShiftOn,
  specialKeyOnRef,
  setBackSpaceOn,
}: IOnKeyDownProps) => {
  if (setCapsLockOn && setShiftOn) {
    setCapsLockOn(event.getModifierState("CapsLock"));
    setShiftOn(event.getModifierState("Shift"));
  }

  if (specialKeyOnRef) {
    if (event.key === "'" && ["Español", "Français"].includes(language)) {
      if (!specialKeyOnRef.current.apostropheOn) {
        specialKeyOnRef.current.apostropheOn = true;
        event.preventDefault();
      }
    }
    if (
      event.key === '"' &&
      ["Español", "Deutsch", "Français"].includes(language)
    ) {
      if (!specialKeyOnRef.current.quotaionMarkOn) {
        specialKeyOnRef.current.quotaionMarkOn = true;
        event.preventDefault();
      }
    }
    if (event.key === "~" && language === "Español") {
      if (!specialKeyOnRef.current.tildeOn) {
        specialKeyOnRef.current.tildeOn = true;
        event.preventDefault();
      }
    }

    //크롬에서 alt키 누를때마다 자꾸 설정창 focus되게 하는 거 막기
    if (event.altKey && ["Deutsch", "Français", "Español"].includes(language)) {
      if (!specialKeyOnRef.current.altOn) {
        specialKeyOnRef.current.altOn = event.altKey;
      }
      event.preventDefault();
    } else if (
      language === "Français" &&
      specialKeyOnRef.current.altOn &&
      specialKeyOnRef.current.altBuffer === "" &&
      ["a", "o", "A", "O"].includes(event.key)
    ) {
      specialKeyOnRef.current.altBuffer = event.key;
      event.preventDefault();
    }

    if (event.key === "," && language === "Français") {
      if (!specialKeyOnRef.current.commaOn) {
        specialKeyOnRef.current.commaOn = true;
        event.preventDefault();
      }
    }
    if (event.key === "`" && language === "Français") {
      if (!specialKeyOnRef.current.backtickOn) {
        specialKeyOnRef.current.backtickOn = true;
        event.preventDefault();
      }
    }
    if (event.key === "^" && language === "Français") {
      if (!specialKeyOnRef.current.caretOn) {
        specialKeyOnRef.current.caretOn = true;
        event.preventDefault();
      }
    }

    if (event.key === "Backspace") {
      setBackSpaceOn(true);
      const currentValue = event.currentTarget.value;
      const selectionStart = event.currentTarget.selectionStart;
      if (selectionStart) {
        const formerPart = currentValue.slice(0, selectionStart - 1);
        const latterPart = currentValue.slice(selectionStart);
        const newValue = [...formerPart, ...latterPart].join("");
        event.currentTarget.value = newValue;
        event.currentTarget.selectionStart = selectionStart - 1;
        event.currentTarget.selectionEnd = selectionStart - 1;
      }
      event.preventDefault();
    }
  }
};

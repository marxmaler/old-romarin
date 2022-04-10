interface IConvertKeyProps {
  key: string;
  language: string;
  cap: boolean;
  specialKeyOnRef: React.MutableRefObject<{
    apostropheOn: boolean;
    quotaionMarkOn: boolean;
    tildeOn: boolean;
    altOn: boolean;
  }>;
}
export const convertKey = ({
  key,
  language,
  cap,
  specialKeyOnRef,
}: IConvertKeyProps) => {
  const tildeOn = specialKeyOnRef.current.tildeOn;
  const apostropheOn = specialKeyOnRef.current.apostropheOn;
  const quotaionMarkOn = specialKeyOnRef.current.quotaionMarkOn;
  const altOn = specialKeyOnRef.current.altOn;
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
        : ["["].includes(key)
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
      (tildeOn && key === "N") || (tildeOn && cap && key === "ㅜ")
        ? "Ñ"
        : tildeOn && ["n", "ㅜ"].includes(key)
        ? "ñ"
        : tildeOn && key === "~"
        ? "~"
        : (apostropheOn && key === "A") || (apostropheOn && cap && key === "ㅁ")
        ? "Á"
        : apostropheOn && ["a", "ㅁ"].includes(key)
        ? "á"
        : (apostropheOn && key === "E") || (apostropheOn && cap && key === "ㄷ")
        ? "É"
        : apostropheOn && ["e", "ㄷ"].includes(key)
        ? "é"
        : (apostropheOn && key === "I") || (apostropheOn && cap && key === "ㅑ")
        ? "Í"
        : apostropheOn && ["i", "ㅑ"].includes(key)
        ? "í"
        : (apostropheOn && key === "O") || (apostropheOn && cap && key === "ㅐ")
        ? "Ó"
        : apostropheOn && ["o", "ㅐ"].includes(key)
        ? "ó"
        : (apostropheOn && key === "U") || (apostropheOn && cap && key === "ㅕ")
        ? "Ú"
        : apostropheOn && ["u", "ㅕ"].includes(key)
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
        : quotaionMarkOn && key === '"'
        ? '"'
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
  }

  return key;
};

interface IOnInputChangeProps {
  event: React.FormEvent<HTMLInputElement>;
  language: string;
  setLastInput: React.Dispatch<React.SetStateAction<string>>;
  capsLockOn: boolean;
  shiftOn: boolean;
  specialKeyOnRef: React.MutableRefObject<{
    apostropheOn: boolean;
    quotaionMarkOn: boolean;
    tildeOn: boolean;
    altOn: boolean;
  }>;
}

export const onInputChange = ({
  event,
  language,
  setLastInput,
  capsLockOn,
  shiftOn,
  specialKeyOnRef,
}: IOnInputChangeProps) => {
  console.log("onInputChange:", specialKeyOnRef);
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
    event.currentTarget.value.length > 1 &&
    event.currentTarget.selectionStart
  ) {
    // console.log(convertedResult);
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
  inputRef: React.MutableRefObject<HTMLInputElement | null> | undefined
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
  event: React.KeyboardEvent;
  setCapsLockOn?: React.Dispatch<React.SetStateAction<boolean>>;
  setShiftOn?: React.Dispatch<React.SetStateAction<boolean>>;
  specialKeyOnRef: React.MutableRefObject<{
    apostropheOn: boolean;
    quotaionMarkOn: boolean;
    tildeOn: boolean;
    altOn: boolean;
  }>;
}
export const onKeyDown = ({
  event,
  setCapsLockOn,
  setShiftOn,
  specialKeyOnRef,
}: IOnKeyDownProps) => {
  if (setCapsLockOn && setShiftOn) {
    setCapsLockOn(event.getModifierState("CapsLock"));
    setShiftOn(event.getModifierState("Shift"));
  }

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
    if (event.key === "~") {
      if (!specialKeyOnRef.current.tildeOn) {
        specialKeyOnRef.current.tildeOn = true;
        event.preventDefault();
      }
    }

    //크롬에서 alt키 누를때마다 자꾸 설정창 focus되게 하는 거 막기
    if (event.altKey === true) {
      specialKeyOnRef.current.altOn = event.altKey;
      event.preventDefault();
    }
  }
};

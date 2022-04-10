import { disassemble } from "hangul-js";

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
  // console.log(specialKeyOnRef);
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
        : key === "Q" || (cap && key === "ㅂ")
        ? "Я"
        : ["q", "ㅂ"].includes(key)
        ? "я"
        : key === "W" || (cap && key === "ㅈ")
        ? "Ш"
        : ["w", "ㅈ"].includes(key)
        ? "ш"
        : key === "E" || (cap && key === "ㄷ")
        ? "Е"
        : ["e", "ㄷ"].includes(key)
        ? "е"
        : key === "R" || (cap && key === "ㄱ")
        ? "Р"
        : ["r", "ㄱ"].includes(key)
        ? "р"
        : key === "T" || (cap && key === "ㅅ")
        ? "Т"
        : ["t", "ㅅ"].includes(key)
        ? "т"
        : key === "Y" || (cap && key === "ㅛ")
        ? "Ы"
        : ["y", "ㅛ"].includes(key)
        ? "ы"
        : key === "U" || (cap && key === "ㅕ")
        ? "У"
        : ["u", "ㅕ"].includes(key)
        ? "у"
        : key === "I" || (cap && key === "ㅑ")
        ? "И"
        : ["i", "ㅑ"].includes(key)
        ? "и"
        : key === "O" || (cap && key === "ㅐ")
        ? "О"
        : ["o", "ㅐ"].includes(key)
        ? "о"
        : key === "P" || (cap && key === "ㅔ")
        ? "П"
        : ["p", "ㅔ"].includes(key)
        ? "п"
        : key === "{" || (cap && key === "[")
        ? "Ю"
        : ["["].includes(key)
        ? "ю"
        : key === "}" || (cap && key === "]")
        ? "Щ"
        : ["]"].includes(key)
        ? "щ"
        : key === "|" || (cap && key === "\\")
        ? "Э"
        : ["\\"].includes(key)
        ? "э"
        : key === "A" || (cap && key === "ㅁ")
        ? "А"
        : ["a", "ㅁ"].includes(key)
        ? "а"
        : key === "S" || (cap && key === "ㄴ")
        ? "С"
        : ["s", "ㄴ"].includes(key)
        ? "с"
        : key === "D" || (cap && key === "ㅇ")
        ? "Д"
        : ["d", "ㅇ"].includes(key)
        ? "д"
        : key === "F" || (cap && key === "ㄹ")
        ? "Ф"
        : ["f", "ㄹ"].includes(key)
        ? "ф"
        : key === "G" || (cap && key === "ㅎ")
        ? "Г"
        : ["g", "ㅎ"].includes(key)
        ? "г"
        : key === "H" || (cap && key === "ㅗ")
        ? "Ч"
        : ["h", "ㅗ"].includes(key)
        ? "ч"
        : key === "J" || (cap && key === "ㅓ")
        ? "Й"
        : ["j", "ㅓ"].includes(key)
        ? "й"
        : key === "K" || (cap && key === "ㅏ")
        ? "К"
        : ["k", "ㅏ"].includes(key)
        ? "к"
        : key === "L" || (cap && key === "ㅣ")
        ? "Л"
        : ["l", "ㅣ"].includes(key)
        ? "л"
        : key === ":" || (cap && key === ";")
        ? "Ь"
        : key === ";"
        ? "ь"
        : key === '"' || (cap && key === "'")
        ? "Ж"
        : key === "'"
        ? "ж"
        : key === "Z" || (cap && key === "ㅋ")
        ? "З"
        : ["z", "ㅋ"].includes(key)
        ? "з"
        : key === "X" || (cap && key === "ㅌ")
        ? "Х"
        : ["x", "ㅌ"].includes(key)
        ? "х"
        : key === "C" || (cap && key === "ㅊ")
        ? "Ц"
        : ["c", "ㅊ"].includes(key)
        ? "ц"
        : key === "V" || (cap && key === "ㅍ")
        ? "В"
        : ["v", "ㅍ"].includes(key)
        ? "в"
        : key === "B" || (cap && key === "ㅠ")
        ? "Б"
        : ["b", "ㅠ"].includes(key)
        ? "б"
        : key === "N" || (cap && key === "ㅜ")
        ? "Н"
        : ["n", "ㅜ"].includes(key)
        ? "н"
        : key === "M" || (cap && key === "ㅡ")
        ? "М"
        : ["m", "ㅡ"].includes(key)
        ? "м"
        : key;

    return convertedKey;
  } else if (language === "Español") {
    const tildeOn = specialKeyOnRef.current.tildeOn;
    const apostropheOn = specialKeyOnRef.current.apostropheOn;
    const quotaionMarkOn = specialKeyOnRef.current.quotaionMarkOn;
    const altOn = specialKeyOnRef.current.altOn;

    console.log(specialKeyOnRef);
    console.log("altOn:", altOn);
    const convertedKey =
      (tildeOn && key === "N") || (tildeOn && cap && key === "ㅜ")
        ? "Ñ"
        : tildeOn && ["n", "ㅜ"].includes(key)
        ? "ñ"
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
        : (quotaionMarkOn && key === "U") ||
          (quotaionMarkOn && cap && key === "ㅕ")
        ? "Ü"
        : quotaionMarkOn && ["u", "ㅕ"].includes(key)
        ? "ü"
        : altOn && ["/", "?"].includes(key)
        ? "¿"
        : altOn && ["1", "!"].includes(key)
        ? "¡"
        : key;
    console.log("convertedKey:", convertedKey);
    if (convertedKey !== key) {
      //만약 convert가 발생했으면 각종 state 다 false로 reset하기
      console.log("did you?");
      specialKeyOnRef.current.tildeOn = false;
      specialKeyOnRef.current.apostropheOn = false;
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

  if (input !== "") {
    const disassembledInput = disassemble(input);
    let lastParticle = disassembledInput[disassembledInput.length - 1];
    if (["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"].includes(lastParticle)) {
      lastParticle =
        lastParticle === "ㄲ"
          ? "ㄱ"
          : lastParticle === "ㄸ"
          ? "ㄷ"
          : lastParticle === "ㅃ"
          ? "ㅂ"
          : lastParticle === "ㅆ"
          ? "ㅅ"
          : "ㅈ";
    }
    input = lastParticle;
  }
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
      specialKeyOnRef.current.apostropheOn = true;
      // console.log(event.key);
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
};

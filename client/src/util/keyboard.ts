import { disassemble } from "hangul-js";

export const convertKey = (key: string, language: string, cap: boolean) => {
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

    return {
      key: convertedKey,
      converted: true,
    };
  }

  return {
    key,
    converted: false,
  };
};

export const onInputChange = (
  event: React.FormEvent<HTMLInputElement>,
  language: string,
  setLastInput: React.Dispatch<React.SetStateAction<string>>,
  capsLockOn: boolean,
  shiftOn: boolean
) => {
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
  const convertResult = convertKey(input, language, cap);
  if (
    event.currentTarget.value.length > 1 &&
    event.currentTarget.selectionStart
  ) {
    // console.log(convertedResult);
    const stringArray = [...event.currentTarget.value];
    stringArray[event.currentTarget.selectionStart - 1] = convertResult.key;
    event.currentTarget.value = stringArray.join("");
  } else if (convertResult && input !== "") {
    event.currentTarget.value = convertResult.key;
  }
  event.currentTarget.selectionStart = Number(selectStart) + 1;
  event.currentTarget.selectionEnd = Number(selectStart) + 1;
  setLastInput(convertResult.key);
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
  setCapsLockOn: React.Dispatch<React.SetStateAction<boolean>>;
  setShiftOn: React.Dispatch<React.SetStateAction<boolean>>;
  setApostropheOn?: React.Dispatch<React.SetStateAction<boolean>>;
  setQuotaionMarkOn?: React.Dispatch<React.SetStateAction<boolean>>;
  setTildeOn?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const onKeyDown = ({
  event,
  setCapsLockOn,
  setShiftOn,
  setApostropheOn,
  setQuotaionMarkOn,
  setTildeOn,
}: IOnKeyDownProps) => {
  setCapsLockOn(event.getModifierState("CapsLock"));
  setShiftOn(event.getModifierState("Shift"));
  if (setApostropheOn) {
    if (event.key === "'") {
      setApostropheOn(true);
    } else {
      setApostropheOn(false);
    }
  }

  if (setQuotaionMarkOn) {
    if (event.key === '"') {
      setQuotaionMarkOn(true);
    } else {
      setQuotaionMarkOn(false);
    }
  }

  if (setTildeOn) {
    if (event.key === "~") {
      setTildeOn(true);
    } else {
      setTildeOn(false);
    }
  }
};

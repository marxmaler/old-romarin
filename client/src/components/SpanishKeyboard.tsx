import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.periwinkleShade50};
  border: 1px solid ${(props) => props.theme.periwinkleTint90};
  width: max-content;
  padding: 10px;
  border-radius: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
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
  &:hover {
    opacity: 0.8;
    transition: 0.2s all;
    transform: translateY(2px);
  }
`;

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
  lastInput: string;
  keyboardRef: React.RefObject<HTMLDivElement>;
  setLastInput: React.Dispatch<React.SetStateAction<string>>;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
}

function SpanishKeyboard({
  lastInput,
  setLastInput,
  keyboardRef,
  inputRef,
}: IKeyboardProps) {
  const onKeyClick = (event: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <Wrapper>
      <Row>
        {["ñ", "á", "é", "í", "ó", "ú", "ü"].map((key, index) => (
          <Key key={`esp_key_${key}`} title={titles[index]}>
            {key}
          </Key>
        ))}
      </Row>
    </Wrapper>
  );
}

export default SpanishKeyboard;

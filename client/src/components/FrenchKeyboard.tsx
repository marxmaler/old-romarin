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

function FrenchKeyboard() {
  return (
    <Wrapper>
      <Row>
        {[
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
          <Key key={`fr_key_${key}`} title={titles[index]}>
            {key}
          </Key>
        ))}
      </Row>
    </Wrapper>
  );
}

export default FrenchKeyboard;

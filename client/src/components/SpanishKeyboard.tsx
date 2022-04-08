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

function SpanishKeyboard() {
  return (
    <Wrapper>
      <Row>
        {["ñ", "á", "é", "í", "ó", "ú", "ü"].map((key) => (
          <Key>{key}</Key>
        ))}
      </Row>
    </Wrapper>
  );
}

export default SpanishKeyboard;

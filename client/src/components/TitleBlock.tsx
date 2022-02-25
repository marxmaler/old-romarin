import styled from "styled-components";

const OldBlock = styled.div`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  display: flex;
  position: relative;
  font-size: 40px;
  font-weight: 900;
  max-width: fit-content;
  color: rgba(232, 65, 24, 0.8);
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
`;

const AvocadoImage = styled.img`
  position: absolute;
  width: 150%;
  z-index: -1;
  left: 10%;
  top: 0px;
  transform: scale(4);
`;

function TitleBlock() {
  return (
    <OldBlock>
      AvocA
      <AvocadoImage src="/avocado.png" />
    </OldBlock>
  );
}

export default TitleBlock;

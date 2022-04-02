import styled from "styled-components";

const Title = styled.div`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  display: flex;
  font-size: 60px;
  font-weight: 900;
  max-width: fit-content;
  text-shadow: 2px 2px 2px ${(props) => props.theme.periwinkleShade90};
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  color: ${(props) => props.theme.periwinkle};
`;

function TitleBlock() {
  return <Title>Romarin</Title>;
}

export default TitleBlock;

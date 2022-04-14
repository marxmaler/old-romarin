import styled from "styled-components";

export const Lang = styled.div<{ page: string }>`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  svg {
    width: 1em;
    cursor: pointer;
    path {
      fill: ${(props) =>
        props.page === "addWords"
          ? props.theme.periwinkleShade50
          : props.theme.periwinkleTint90};
    }
  }
  h3 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 23px;
    width: 7em;
    font-weight: 700;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
    color: ${(props) => props.theme.periwinkleTint90};
  }
`;

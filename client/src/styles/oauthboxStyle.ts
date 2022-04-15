import styled from "styled-components";

export const OauthWrapper = styled.div`
  background-color: ${(props) => props.theme.periwinkleTint50};
  color: white;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  min-height: max-content;
  max-width: 50vw;
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  border-radius: 20px;
`;

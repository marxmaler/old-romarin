import styled from "styled-components";

export const DarkBox = styled.div`
  background-color: ${(props) => props.theme.periwinkleShade30};
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0px;
  color: ${(props) => props.theme.periwinkleTint90};
  border: ${(props) => props.theme.periwinkleTint90} 1px solid;
  &:first-child {
    margin-top: -30px;
  }
  span {
    margin-bottom: 10px;
  }
  strong {
    margin-bottom: 10px;
  }
`;

export const TransparentBox = styled.div`
  background-color: transparent;
  padding: 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.periwinkleShade50};
  &:nth-child(1) {
    padding-bottom: 0;
  }
  span {
    margin-bottom: 10px;
  }
  strong {
    margin-bottom: 10px;
  }
  input {
    background-color: ${(props) => props.theme.periwinkleTint80} !important;
  }
`;

export const TestSettingDarkBox = styled(DarkBox)`
  label {
    strong {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 600;
      display: block;
    }
  }
`;

export const OauthDarkBox = styled(DarkBox)`
  width: 50%;
`;

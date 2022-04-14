import styled from "styled-components";
import { ButtonContainer } from "./formStyle";

export const overlay = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

export const content = {
  right: "0",
  left: "0",
  top: "0",
  bottom: "0",
  margin: "auto",
  height: "200px",
  width: "500px",
  borderRadius: "20px",
  backgroundColor: "rgba(245, 243, 255, 0.9)",
  border: "solid 1.5px rgba(78, 68, 128, 1)",
};

export const ModalText = styled.span`
  display: flex;
  justify-content: center;
  padding: 30px;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${(props) => props.theme.periwinkleShade50};
`;

export const ModalButtonContainer = styled(ButtonContainer)`
  button:first-child {
    margin-right: 10px;
  }
`;

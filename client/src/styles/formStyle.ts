import { motion } from "framer-motion";
import styled from "styled-components";

export const FormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 100px;
  h3 {
    text-shadow: 1px 1px 1px rgba(189, 195, 199, 0.7);
    text-align: center;
    margin-bottom: 30px;
    font-size: 23px;
    font-weight: 700;
    color: ${(props) => props.theme.periwinkleShade50};
  }
`;

export const TestSettingFormContainer = styled(FormContainer)`
  padding: 50px;
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(16, 14, 25, 1)
  );
  h3 {
    text-shadow: none;
    color: white;
  }
`;

export const Form = styled.form`
  background-color: ${(props) => props.theme.periwinkleTint50};
  color: white;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  min-height: max-content;
  max-width: 50vw;
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  border-radius: 20px;
  ul {
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0.5em;
      &:last-child {
        margin-bottom: 0;
      }
      label {
        display: inline-block;
        text-align: start;
        strong {
          font-size: 20px;
          font-weight: 600;
          display: block;
        }
        span {
          display: block;
          font-size: 12px;
        }
      }
      input {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: 0;
        background-color: ${(props) => props.theme.periwinkleTint90};
        color: ${(props) => props.theme.periwinkleShade50};
        &[name="spelling"] {
          font-size: 24px !important;
          font-weight: 900 !important;
          &::placeholder {
            font-size: 14px;
            font-weight: 100;
            transform: translate3d(0, -4px, 0);
          }
        }
        &::placeholder {
          text-align: center;
        }
      }
      textarea {
        font-family: inherit;
        width: 100%;
        resize: none;
        padding: 10px;
        border-radius: 10px;
        margin-top: 10px;
        border: 0;
        background-color: ${(props) => props.theme.periwinkleTint90};
        color: ${(props) => props.theme.periwinkleShade50};
        &::placeholder {
          text-align: center;
          transform: translate3d(0, 15px, 0);
        }
      }
    }
  }
`;

export const TestSettingForm = styled(motion.form)`
  background-color: ${(props) => props.theme.periwinkleTint50};
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  min-width: max-content;
  min-height: max-content;
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  border-radius: 20px;
  h3 {
    color: ${(props) => props.theme.periwinkleShade50};
  }
  ul {
    margin-top: 20px;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0.5em;
      &:last-child {
        margin-bottom: 0;
      }
      input {
        margin-top: 10px;
        width: 100%;
        border-radius: 10px;
        padding: 10px;
        border: 0;
        background-color: ${(props) => props.theme.periwinkleTint90};
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        color: ${(props) => props.theme.periwinkleShade50};
        font-size: 24px !important;
        font-weight: 900 !important;
        &::placeholder {
          text-align: center;
        }
      }
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: max-content;
`;

export const ErrorMessage = styled.li`
  color: ${(props) => props.theme.periwinkleTint90};
  font-size: 12px;
  span {
    padding: 1em;
  }
`;

export const NoWords = styled.span`
  display: block;
  margin-bottom: 50px;
  font-size: 20px;
`;

export const SearchNoWords = styled(NoWords)`
  margin-top: 40px;
  font-weight: 600;
  margin-bottom: 40px;
`;

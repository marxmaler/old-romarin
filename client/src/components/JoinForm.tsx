import styled from "styled-components";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms";
import { useEffect } from "react";
import { motion } from "framer-motion";

const FormContainer = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 50vh;
  color: white;
  h3 {
    text-align: center;
    margin-bottom: 50px;
    font-size: 40px;
    font-weight: 700;
    color: ${(props) => props.theme.periwinkleShade50};
  }
`;

const Form = styled(motion.form)`
  background-color: ${(props) => props.theme.periwinkleTint50};
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  min-width: max-content;
  min-height: max-content;
  border: 1px solid ${(props) => props.theme.periwinkleTint90};
  border-radius: 20px;

  ul {
    border-radius: 5px;
    padding: 10px;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;

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
      }
      span {
        font-size: 12px;
        margin-bottom: 0.5em;
      }
      input {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: 0;
        background-color: ${(props) => props.theme.periwinkleTint90};
        color: ${(props) => props.theme.periwinkleShade50};
        &::placeholder {
          text-align: center;
        }
      }
    }
  }
  button {
    margin-top: 0.5em;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.li`
  color: red;
  font-size: 12px;
  span {
    padding: 1em;
  }
`;

const DarkBox = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: max-content;
`;

const ConfirmStrong = styled.strong`
  margin-top: 10px;
`;

const joinFormVar = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

interface IForm {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

function JoinForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<IForm>();
  const navigate = useNavigate();

  const [login, setLogin] = useRecoilState(loginState);
  if (login.loggedIn) {
    fetch("/api/users/logout");
    setLogin({
      loggedIn: false,
      user: null,
    });
  }

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onValid = (data: IForm) => {
    if (
      !validator.isStrongPassword(data.password, {
        minUppercase: 0,
      })
    ) {
      setError("password", {
        message:
          "최소 8자 이상, 알파벳 소문자, 숫자, 특수문자가 포함된 비밀번호를 입력해주세요.",
      });
    } else if (data.password !== data.passwordConfirm) {
      setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
    } else if (!validator.isEmail(data.email)) {
      setError("email", { message: "이메일 주소를 확인해주세요." });
    } else {
      fetch("/api/users/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      }).then((response) => {
        const status = response.status;
        if (status === 400) {
          setError("email", { message: "이미 가입된 이메일입니다." });
        } else {
          navigate("/login");
        }
      });
    }

    setValue("email", "");
    setValue("name", "");
    setValue("password", "");
    setValue("passwordConfirm", "");
  };
  return (
    <>
      <FormContainer>
        <Form
          onSubmit={handleSubmit(onValid)}
          variants={joinFormVar}
          initial="hidden"
          animate="show"
        >
          <h3>가입</h3>
          <ul>
            <DarkBox>
              <li>
                <label>
                  <strong>이메일</strong>
                </label>
                <input
                  type={"email"}
                  {...register("email", { required: true })}
                  placeholder="이메일"
                />
              </li>
              <ErrorMessage>
                {errors?.email?.message && (
                  <span>{errors?.email?.message}</span>
                )}
              </ErrorMessage>
            </DarkBox>
            <DarkBox>
              <li>
                <label>
                  <strong>닉네임</strong>
                </label>
                <input
                  type={"text"}
                  {...register("name", {
                    required: true,
                  })}
                  placeholder="닉네임"
                ></input>
              </li>
            </DarkBox>
            <DarkBox>
              <li>
                <label>
                  <strong>비밀번호</strong>
                </label>
                <span>
                  최소 8자 이상, 알파벳 소문자, 숫자, 특수문자가 포함되어야
                  합니다.
                </span>
                <input
                  type={"password"}
                  {...register("password", { required: true })}
                  placeholder="비밀번호"
                ></input>
              </li>
              <ErrorMessage>
                {errors?.password?.message && (
                  <span>{errors?.password?.message}</span>
                )}
              </ErrorMessage>
              <li>
                <label>
                  <ConfirmStrong>비밀번호 확인</ConfirmStrong>
                </label>
                <input
                  type={"password"}
                  {...register("passwordConfirm", { required: true })}
                  placeholder="비밀번호 확인"
                ></input>
              </li>
              <ErrorMessage>
                {errors?.passwordConfirm?.message && (
                  <span>{errors?.passwordConfirm?.message}</span>
                )}
              </ErrorMessage>
            </DarkBox>
          </ul>
          <ButtonContainer>
            <button>가입</button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </>
  );
}

export default JoinForm;

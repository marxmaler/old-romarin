import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import { useNavigate } from "react-router-dom";
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
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  border-radius: 20px;

  ul {
    li {
      display: flex;
      justify-content: center;
      margin-bottom: 0.5em;
      &:last-child {
        margin-bottom: 0;
      }
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 6em;
        margin-right: 0.5em;
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
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
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

const loginFormVar = {
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
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<IForm>();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onValid = async (data: IForm) => {
    console.log(data);
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    console.log(response.status);
    if (response.status === 404) {
      setError("email", { message: "등록되지 않은 이메일입니다." });
    } else if (response.status === 400) {
      setError("password", { message: "비밀번호가 일치하지 않습니다." });
    } else if (response.status === 401) {
      const { user } = await response.json();
      if (user.email === data.email) {
        const { password, ...rest } = user;
        setLogin({
          loggedIn: true,
          user: rest,
        });

        navigate("/");
      } else {
        await fetch("/api/users/logout");
        setLogin({ loggedIn: false, user: null });
        const { user } = await (
          await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
          })
        ).json();
        const { password, ...rest } = user;
        setLogin({
          loggedIn: true,
          user: rest,
        });

        navigate("/");
      }
    } else {
      const { user } = await response.json();
      const { password, ...rest } = user;
      setLogin({
        loggedIn: true,
        user: rest,
      });

      navigate("/");
    }
    setValue("email", "");
    setValue("password", "");
  };
  return (
    <>
      <FormContainer>
        <Form
          onSubmit={handleSubmit(onValid)}
          variants={loginFormVar}
          initial="hidden"
          animate="show"
        >
          <h3>로그인</h3>
          <ul>
            <DarkBox>
              <li>
                <label>이메일</label>
                <input
                  type={"email"}
                  {...register("email", { required: true })}
                  placeholder="Email"
                ></input>
              </li>
              <ErrorMessage>
                {errors?.email?.message && (
                  <span>{errors?.email?.message}</span>
                )}
              </ErrorMessage>
              <li>
                <label>비밀번호</label>
                <input
                  type={"password"}
                  {...register("password", { required: true })}
                  placeholder="Password"
                ></input>
              </li>
            </DarkBox>

            <ErrorMessage>
              {errors?.password?.message && (
                <span>{errors?.password?.message}</span>
              )}
            </ErrorMessage>
          </ul>
          <ButtonContainer>
            <button>로그인</button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </>
  );
}

export default LoginForm;

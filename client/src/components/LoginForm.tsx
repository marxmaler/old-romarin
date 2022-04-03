import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import { useNavigate } from "react-router-dom";

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

const Form = styled.form`
  background-color: ${(props) => props.theme.periwinkleTint50};

  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  min-width: max-content;
  min-height: max-content;
  border: 1px solid rgba(0, 0, 0, 0.4);
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
  } = useForm<IForm>();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);

  const onValid = async (data: IForm) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (response.status === 404) {
      setError("email", { message: "등록되지 않은 이메일입니다." });
    } else if (response.status === 400) {
      setError("password", { message: "비밀번호가 일치하지 않습니다." });
    } else if (response.status === 401) {
      const { user } = await response.json();
      if (user.email === data.email) {
        setLogin({
          loggedIn: true,
          user,
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

        setLogin({
          loggedIn: true,
          user,
        });

        navigate("/");
      }
    } else {
      const { user } = await response.json();
      setLogin({
        loggedIn: true,
        user,
      });

      navigate("/");
    }
    setValue("email", "");
    setValue("password", "");
  };
  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmit(onValid)}>
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

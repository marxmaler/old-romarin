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
    color: rgba(0, 0, 0, 1);
  }
`;

const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.8);
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
        display: inline-block;
        text-align: center;
        width: 4em;
        margin-right: 0.5em;
      }
      input {
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
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (response.status === 404) {
      setError("email", { message: "등록되지 않은 이메일입니다." });
    } else if (response.status === 400) {
      setError("password", { message: "비밀번호가 일치하지 않습니다." });
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
        <h3>로그인</h3>
        <Form onSubmit={handleSubmit(onValid)}>
          <ul>
            <li>
              <label>이메일</label>
              <input
                type={"email"}
                {...register("email", { required: true })}
                placeholder="Email"
              ></input>
            </li>
            <ErrorMessage>
              {errors?.email?.message && <span>{errors?.email?.message}</span>}
            </ErrorMessage>
            <li>
              <label>비밀번호</label>
              <input
                type={"password"}
                {...register("password", { required: true })}
                placeholder="Password"
              ></input>
            </li>
            <ErrorMessage>
              {errors?.password?.message && (
                <span>{errors?.password?.message}</span>
              )}
            </ErrorMessage>
          </ul>
          <button>로그인</button>
        </Form>
      </FormContainer>
    </>
  );
}

export default LoginForm;

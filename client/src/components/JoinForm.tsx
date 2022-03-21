import styled from "styled-components";
import { useForm } from "react-hook-form";
import validator from "validator";
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
    border: 1px solid white;
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
        width: 7em;
        margin-bottom: 0.5em;
      }
      span {
        font-size: 12px;
        margin-bottom: 0.5em;
      }
      input {
        margin-bottom: 0.5em;
        border-radius: 5px;
        padding: 5px;
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
  } = useForm<IForm>();
  const navigate = useNavigate();
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
      fetch("/api/user/join", {
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
        <h3>가입</h3>
        <Form onSubmit={handleSubmit(onValid)}>
          <ul>
            <li>
              <label>이메일</label>
              <input
                type={"email"}
                {...register("email", { required: true })}
                placeholder="이메일"
              ></input>
            </li>
            <ErrorMessage>
              {errors?.email?.message && <span>{errors?.email?.message}</span>}
            </ErrorMessage>
            <li>
              <label>닉네임</label>
              <input
                type={"text"}
                {...register("name", {
                  required: true,
                })}
                placeholder="닉네임"
              ></input>
            </li>
            <li>
              <label>비밀번호</label>
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
              <label>비밀번호 확인</label>
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
          </ul>
          <button>가입</button>
        </Form>
      </FormContainer>
    </>
  );
}

export default JoinForm;

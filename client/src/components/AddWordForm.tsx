import styled from "styled-components";
import { useForm } from "react-hook-form";

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
  display: grid;
  grid-template-columns: 0.9fr 0.1fr;
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
        width: 3em;
        margin-right: 0.5em;
      }
      input {
        &::placeholder {
          text-align: center;
        }
      }
    }
  }
`;

const PlusBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  padding: 0px 20px;
  margin-left: 15px;
`;

const Plus = styled.svg`
  width: 50px;
  height: 50px;
`;

interface IForm {
  spelling: string;
  meaning: string;
  syn?: string;
  ant?: string;
}

function AddWordForm() {
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const today = new Date();
    fetch("/api/word/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, today }),
    });
    setValue("spelling", "");
    setValue("meaning", "");
    setValue("syn", "");
    setValue("ant", "");
  };
  return (
    <>
      <FormContainer>
        <h3>새 단어</h3>
        <Form onSubmit={handleSubmit(onValid)}>
          <ul>
            <li>
              <label>철자</label>
              <input
                {...register("spelling", { required: true })}
                placeholder="Spelling"
              ></input>
            </li>
            <li>
              <label>뜻</label>
              <input
                {...register("meaning", { required: true })}
                placeholder="Meaning"
              ></input>
            </li>
            <li>
              <label>유의어</label>
              <input {...register("syn")} placeholder="Synonym"></input>
            </li>
            <li>
              <label>반의어</label>
              <input {...register("ant")} placeholder="Antonym"></input>
            </li>
          </ul>
          <PlusBtn>
            <Plus xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="white"
                stroke="black"
                strokeWidth={5}
                d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
              />
            </Plus>
          </PlusBtn>
        </Form>
      </FormContainer>
    </>
  );
}

export default AddWordForm;

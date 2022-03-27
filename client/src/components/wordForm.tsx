import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { languages } from "../util/constant";
import LanguageSetter from "./LanguageSetter";

const FormContainer = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 50vh;
  color: white;
  h3 {
    text-shadow: 1px 1px 1px rgba(189, 195, 199, 0.7);
    text-align: center;
    margin-bottom: 30px;
    font-size: 23px;
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
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0.5em;
      &:last-child {
        margin-bottom: 0;
      }
      label {
        display: inline-block;
        text-align: start;
        span {
          display: block;
          font-size: 12px;
        }
      }
      input {
        width: 40em;
        &::placeholder {
          text-align: center;
        }
      }
      textarea {
        font-family: inherit;
        width: 40em;
        resize: none;
        &::placeholder {
          text-align: center;
        }
      }
    }
  }
`;

interface IForm {
  spelling: string;
  pronunciation: string;
  meaning: string;
  collocation?: string;
  association?: string;
  ex?: string;
  syn?: string;
  ant?: string;
}

export type inputNames =
  | "spelling"
  | "pronunciation"
  | "meaning"
  | "collocation"
  | "association"
  | "ex"
  | "syn"
  | "ant";

function WordForm() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [numWords, setNumWords] = useState(0);
  const [langNum, setLangNum] = useState(0);

  const onValid = (data: IForm) => {
    const today = new Date();
    fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: languages[langNum], data, today }),
    });
    Object.keys(data).forEach((key) => setValue(key as inputNames, ""));
    setNumWords((prev) => prev + 1);
  };

  return (
    <>
      <FormContainer>
        <h3>새로 추가된 단어: {numWords}개</h3>
        <h3>학습 언어</h3>
        <LanguageSetter
          page="addWords"
          langNum={langNum}
          setLangNum={setLangNum}
        />
        <Form onSubmit={handleSubmit(onValid)}>
          <ul>
            <li>
              <label>
                철자*
                <span>
                  단어 시험 유형 중에 Spelling 맞추기가 있으므로, 쓰는 법이 여러
                  가지여도 하나만 적어주세요.
                </span>
                <span>
                  기억해두고 싶은 다른 철자법이 있다면 기억 단서란에 써주세요.
                </span>
              </label>
              <input
                {...register("spelling", { required: true })}
                placeholder="required"
              ></input>
            </li>
            <li>
              <label>발음</label>
              <input
                {...register("pronunciation")}
                placeholder="optional"
              ></input>
            </li>
            <li>
              <label>뜻*</label>
              <input
                {...register("meaning", { required: true })}
                placeholder="required"
              ></input>
            </li>
            <li>
              <label>
                활용
                <span>함께 자주 쓰이는 단어나 표현이 있으면 추가해주세요.</span>
                <span>
                  ( )로 이 단어가 들어가는 부분을 표시해두면 단어 시험에서
                  알맞은 단어 고르기 문제가 출제됩니다.
                </span>
                <span>(장기기억 촉진 점수 10점)</span>
              </label>
              <input
                {...register("collocation")}
                placeholder="optional(,로 구분)"
              ></input>
            </li>
            <li>
              <label>
                기억 단서
                <span>
                  단어를 기억하는데 도움이 되는 상상, 농담, 배경 지식, 발음 및
                  철자상의 특징, TMI를 추가해주세요.
                </span>
                <span>
                  웃기고, 섹시하고, 생생하고, 아름답고, 초현실적인 내용일수록
                  기억에 오래남습니다.
                </span>
                <span>(장기기억 촉진 점수 50점)</span>
              </label>
              <input
                {...register("association")}
                placeholder="optional(,로 구분)"
              ></input>
            </li>
            <li>
              <label>
                예문
                <span>
                  직접 보고 들은 문장이나 손수 쓴 예문을 적어주세요. 기왕이면
                  재밌고 흥미로운 걸로 부탁해요.
                </span>
                <span>
                  ( )로 이 단어가 들어가는 부분을 표시해두면, 단어 시험에서 빈칸
                  채우기 문제가 출제됩니다.
                </span>
                <span>(장기기억 촉진 점수 20점)</span>
              </label>
              <textarea
                rows={3}
                {...register("ex")}
                placeholder="optional"
              ></textarea>
            </li>
            <li>
              <label>
                유의어
                <span>(장기기억 촉진 점수 10점)</span>
              </label>
              <input
                {...register("syn")}
                placeholder="optional(,로 구분)"
              ></input>
            </li>
            <li>
              <label>
                반의어
                <span>(장기기억 촉진 점수 10점)</span>
              </label>
              <input
                {...register("ant")}
                placeholder="optional(,로 구분)"
              ></input>
            </li>
          </ul>
          <button>추가</button>
        </Form>
      </FormContainer>
    </>
  );
}

export default WordForm;

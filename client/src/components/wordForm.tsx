import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { languages } from "../util/language";
import LanguageSetter from "./LanguageSetter";

const FormContainer = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 50vh;
  h3 {
    text-shadow: 1px 1px 1px rgba(189, 195, 199, 0.7);
    text-align: center;
    margin-bottom: 30px;
    font-size: 23px;
    font-weight: 700;
    color: ${(props) => props.theme.periwinkleShade50};
  }
`;

const Form = styled.form`
  background-color: ${(props) => props.theme.periwinkleTint50};

  color: white;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  min-height: max-content;
  max-width: 50vw;
  border: 1px solid rgba(255, 255, 255, 0.4);
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

const TransparentBox = styled.div`
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
`;

const SpellingInput = styled.input`
  font-size: 24px !important;
  font-weight: 900 !important;
  &::placeholder {
    font-size: 14px;
    font-weight: 100;
    transform: translate3d(0, -4px, 0);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: max-content;
`;

export interface IForm {
  spelling: string;
  pronunciation: string;
  meaning: string;
  collocation: string;
  association: string;
  ex: string;
  syn: string;
  ant: string;
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
      body: JSON.stringify({ language: languages[langNum], data, today }),
    });
    Object.keys(data).forEach((key) => setValue(key as inputNames, ""));
    setNumWords((prev) => prev + 1);
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmit(onValid)}>
          <TransparentBox>
            <h3>새로 추가된 단어: {numWords}개</h3>
            <h3>학습 언어</h3>
            <LanguageSetter
              page="addWords"
              langNum={langNum}
              setLangNum={setLangNum}
            />
          </TransparentBox>

          <ul>
            <DarkBox>
              <li>
                <label>
                  <strong>철자*</strong>
                  <span>
                    단어 시험 유형 중에 Spelling 맞추기가 있으므로, 쓰는 법이
                    여러 가지여도 하나만 적어주세요.
                  </span>
                  <span>
                    기억해두고 싶은 다른 철자법이 있다면 기억 단서란에 써주세요.
                  </span>
                </label>
                <SpellingInput
                  {...register("spelling", { required: true })}
                  placeholder="required"
                ></SpellingInput>
              </li>
              <li>
                <label>
                  <strong>발음</strong>
                </label>
                <input
                  {...register("pronunciation")}
                  placeholder="optional"
                ></input>
              </li>
              <li>
                <label>
                  <strong>뜻*</strong>
                </label>
                <input
                  {...register("meaning", { required: true })}
                  placeholder="required"
                ></input>
              </li>
            </DarkBox>
            <TransparentBox>
              <li>
                <label>
                  <strong>활용</strong>
                  <span>
                    함께 자주 쓰이는 단어나 표현이 있으면 추가해주세요.
                  </span>
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
            </TransparentBox>
            <DarkBox>
              <li>
                <label>
                  <strong>기억 단서</strong>
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
                  placeholder="optional"
                ></input>
              </li>
            </DarkBox>

            <DarkBox>
              <li>
                <label>
                  <strong>예문</strong>
                  <span>
                    직접 보고 들은 문장이나 손수 쓴 예문을 적어주세요. 기왕이면
                    재밌고 흥미로운 걸로 부탁해요.
                  </span>
                  <span>
                    ( )로 이 단어가 들어가는 부분을 표시해두면, 단어 시험에서
                    빈칸 채우기 문제가 출제됩니다.
                  </span>
                  <span>(장기기억 촉진 점수 20점)</span>
                </label>
                <textarea
                  rows={3}
                  {...register("ex")}
                  placeholder="optional"
                ></textarea>
              </li>
            </DarkBox>
            <TransparentBox>
              <li>
                <label>
                  <strong>유의어</strong>
                  <span>(장기기억 촉진 점수 10점)</span>
                </label>
                <input
                  {...register("syn")}
                  placeholder="optional(,로 구분)"
                ></input>
              </li>
              <li>
                <label>
                  <strong>반의어</strong>
                  <span>(장기기억 촉진 점수 10점)</span>
                </label>
                <input
                  {...register("ant")}
                  placeholder="optional(,로 구분)"
                ></input>
              </li>
            </TransparentBox>
          </ul>
          <ButtonContainer>
            <button>추가</button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </>
  );
}

export default WordForm;

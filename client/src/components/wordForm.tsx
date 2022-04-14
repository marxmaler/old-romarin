import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { languages } from "../util/language";
import LanguageSetter from "./LanguageSetter";
import InputWithKeyboard from "./InputWithKeyboard";
import { ButtonContainer, Form, FormContainer } from "../styles/formStyle";
import { basicShowVariants } from "../styles/motionVariants";
import { DarkBox, TransparentBox } from "../styles/boxStyle";
import TextareaWithKeyboard from "./TextareaWithKeyboard";

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
  const { register, handleSubmit, setValue, setFocus } = useForm<IForm>();
  const [numWords, setNumWords] = useState(0);
  const [langNum, setLangNum] = useState(0);

  useEffect(() => {
    setFocus("spelling");
  }, [setFocus]);

  const onValid = (data: IForm) => {
    const today = new Date();
    fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: languages[langNum], data, today }),
    });
    Object.keys(data).forEach((key) => setValue(key as inputNames, ""));
    setNumWords((prev) => prev + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setFocus("spelling");
  };

  return (
    <>
      <FormContainer
        variants={basicShowVariants}
        initial="hidden"
        animate="show"
      >
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
                <InputWithKeyboard
                  register={register}
                  language={languages[langNum]}
                  inputName="spelling"
                  placeholder="required"
                  isRequired={true}
                />
              </li>

              <li>
                <label>
                  <strong>발음</strong>
                </label>
                <input {...register("pronunciation")} placeholder="optional" />
              </li>
              <li>
                <label>
                  <strong>뜻*</strong>
                </label>
                <input
                  {...register("meaning", { required: true })}
                  placeholder="required"
                />
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
                    ( )로 해당 단어가 들어가는 부분을 표시해두면 단어 시험에서
                    알맞은 단어 고르기 문제가 출제됩니다.
                  </span>
                  <span>(장기기억 촉진 점수 10점)</span>
                </label>
                <InputWithKeyboard
                  register={register}
                  language={languages[langNum]}
                  inputName="collocation"
                  placeholder="optional(,로 구분)"
                  isRequired={false}
                />
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
                  placeholder="optional(,로 구분)"
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
                <TextareaWithKeyboard
                  register={register}
                  language={languages[langNum]}
                  inputName="ex"
                  isRequired={false}
                  placeholder={"optional"}
                />
              </li>
            </DarkBox>
            <TransparentBox>
              <li>
                <label>
                  <strong>유의어</strong>
                  <span>(장기기억 촉진 점수 10점)</span>
                </label>
                <InputWithKeyboard
                  register={register}
                  language={languages[langNum]}
                  inputName="syn"
                  placeholder="optional(,로 구분)"
                  isRequired={false}
                  isUpper={true}
                />
              </li>

              <li>
                <label>
                  <strong>반의어</strong>
                  <span>(장기기억 촉진 점수 10점)</span>
                </label>
                <InputWithKeyboard
                  register={register}
                  language={languages[langNum]}
                  inputName="ant"
                  placeholder="optional(,로 구분)"
                  isRequired={false}
                  isUpper={true}
                />
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

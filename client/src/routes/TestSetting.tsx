import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { testSettingState, wordsSelector } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import LanguageSetter from "../components/LanguageSetter";
import { ITestSettingFormProps, IWord } from "../interfaces";
import { TestSettingDarkBox } from "../styles/boxStyle";
import {
  ButtonContainer,
  ErrorMessage,
  TestSettingForm,
  TestSettingFormContainer,
} from "../styles/formStyle";
import { basicShowVariants } from "../styles/motionVariants";
import Modal from "react-modal";
import {
  content,
  ModalButtonContainer,
  ModalText,
  overlay,
} from "../styles/modalStyle";

function TestSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
  } = useForm<ITestSettingFormProps>();
  const [langNum, setLangNum] = useState(0);
  const selectedWords = useRecoilValue(wordsSelector); //언어에 따라 선택된 단어들
  const setTestSetting = useSetRecoilState(testSettingState);
  Modal.setAppElement("#root");

  useEffect(() => {
    console.log(selectedWords);
    setValue("numQ", selectedWords.length);
  }, [setValue, selectedWords]);

  const onValid = ({ numQ }: ITestSettingFormProps) => {
    //numQ 갯수만큼 random index 뽑아서 단어 섞기
    const shuffledArr: IWord[] = [];
    const indexArr = [...Array(selectedWords.length).keys()];
    while (shuffledArr.length < numQ) {
      const randomIndex = Math.floor(Math.random() * indexArr.length);
      shuffledArr.push(selectedWords[indexArr[randomIndex]]);
      indexArr.splice(randomIndex, 1);
    }
    setTestSetting({ numQ, selectedWords: shuffledArr });
  };

  return (
    <>
      <HeaderMenu />
      <TestSettingFormContainer>
        <h3>시험 언어</h3>
        <LanguageSetter
          page="testSetting"
          langNum={langNum}
          setLangNum={setLangNum}
        />
        <TestSettingForm
          onSubmit={handleSubmit(onValid)}
          variants={basicShowVariants}
          initial="hidden"
          animate="show"
          custom={{ delay: 0.3 }}
        >
          <h3>단어 갯수 : {selectedWords.length}개</h3>
          <ul>
            <TestSettingDarkBox>
              <li>
                <label>
                  <strong>시험 문항수</strong>
                </label>
                <input
                  type="number"
                  disabled={selectedWords.length > 0 ? false : true}
                  {...register("numQ", {
                    required: "시험 문항수를 입력해주세요.",
                    min: {
                      value: 1,
                      message: "0보다 큰 자연수를 입력해주세요.",
                    },
                    max: {
                      value: selectedWords.length,
                      message:
                        "복습할 단어 수와 같거나 그보다 작은 자연수를 입력해주세요.",
                    },
                  })}
                />
              </li>
              {errors?.numQ?.message && (
                <ErrorMessage>
                  <span>{errors.numQ.message}</span>
                </ErrorMessage>
              )}
            </TestSettingDarkBox>
          </ul>
          <ButtonContainer>
            {selectedWords.length > 0 && <button>시험 보기</button>}
          </ButtonContainer>
        </TestSettingForm>
        {isSubmitted && (
          <Modal
            isOpen={true}
            style={{
              overlay,
              content,
            }}
          >
            <ModalText>시험 전에 단어를 복습하시겠습니까?</ModalText>
            <ModalButtonContainer>
              <Link to={"/words/test/review"}>
                <button>예 </button>
              </Link>

              <Link to={"/words/test"}>
                <button>아니오</button>
              </Link>
            </ModalButtonContainer>
          </Modal>
        )}
      </TestSettingFormContainer>
    </>
  );
}

export default TestSetting;

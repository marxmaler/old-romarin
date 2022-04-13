import { UseFormRegister } from "react-hook-form";
import { onInputChange } from "../util/keyboard";

interface IInputWithKeyboardProps {
  register: UseFormRegister<any>;
}

function InputWithKeyboard({ register }: IInputWithKeyboardProps) {
  //   const { ref: synRegisterRef, ...synRegisterRest } = register("syn", {
  //     required: true,
  //     onChange: (event: React.FormEvent<HTMLInputElement>) => {
  //       onInputChange({
  //         event,
  //         language: languages[langNum],
  //         setLastInput,
  //         capsLockOn,
  //         shiftOn,
  //         specialKeyOnRef,
  //         backSpaceOn,
  //         setBackSpaceOn,
  //       });
  //     },
  //     onBlur: onInputBlur,
  //   });
  return (
    <>
      {/* <input
        {...synRegisterRest}
        placeholder="optional(,로 구분)"
        onFocus={onInputFocus}
        onKeyDown={(event) =>
          onKeyDown({
            event,
            language: languages[langNum],
            setCapsLockOn,
            setShiftOn,
            specialKeyOnRef,
            setBackSpaceOn,
          })
        }
        onKeyUp={(event: React.KeyboardEvent) => {
          setShiftOn(event.getModifierState("Shift"));
        }}
        ref={(element) => {
          synRegisterRef(element);
          synInputRef.current = element;
        }}
      /> */}
      ;
    </>
  );
}

export default InputWithKeyboard;

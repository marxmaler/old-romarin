import { Types } from "mongoose";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface IWord {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  language: string;
  spelling: string;
  pronunciation: string;
  meaning: string;
  collocation: string[];
  association: string;
  ex: string;
  syn: string[];
  ant: string[];
  regRev: Date[]; //정규 복습 스케쥴
  wrong: boolean;
  ltmsPoint: number;
  addedAt: Date;
}

export interface User {
  _id: Types.ObjectId;
  email: string;
  name: string;
  socialOnly: boolean;
  stat: {
    [key: string]: ILangStat;
    En: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Es: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Fr: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    De: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Jp: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Ch: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Ru: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
  };
}

export interface ILogIn {
  loggedIn: boolean;
  user: User | null;
}

export interface ITestSetting {
  numQ: number;
  selectedWords: IWord[];
}

export interface ITestResult {
  wordId: string;
  wrong: boolean;
  myAnswer: string;
  originalWord: IWord;
}

export interface IWeeklyWords {
  today: number;
  yesterday: number;
  twoDaysAgo: number;
  threeDaysAgo: number;
  fourDaysAgo: number;
  fiveDaysAgo: number;
  sixDaysAgo: number;
  aWeekAgo: number;
}

export interface IChartProps {
  labels: string[];
  series: number[];
}

export interface IWordProps {
  word: IWord;
}

export interface IQuestionProp {
  word: IWord;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
}

export interface ITestSettingFormProps {
  numQ: number;
}

export interface ILangStat {
  [key: string]: number;
  total: number;
  once: number;
  twice: number;
  threeTimes: number;
  fourTimes: number;
}

export interface ILanguageWords {
  [key: string]: IWord[];
  En: IWord[];
  Es: IWord[];
  Fr: IWord[];
  De: IWord[];
  Jp: IWord[];
  Ch: IWord[];
  Ru: IWord[];
}

export interface ILanguageWordsCnt {
  [key: string]: number[];
  En: number[];
  Es: number[];
  Fr: number[];
  De: number[];
  Jp: number[];
  Ch: number[];
  Ru: number[];
}

export interface IKeyboardProps {
  keyboardRef: React.RefObject<HTMLDivElement>;
  inputRef: React.MutableRefObject<
    HTMLInputElement | HTMLTextAreaElement | null
  >;
  lastInput: string;
  setLastInput: React.Dispatch<React.SetStateAction<string>>;
  shiftOn: boolean;
  setShiftOn: React.Dispatch<React.SetStateAction<boolean>>;
  capsLockOn: boolean;
  setCapsLockOn: React.Dispatch<React.SetStateAction<boolean>>;
  specialKeyOnRef: React.MutableRefObject<{
    apostropheOn: boolean;
    quotaionMarkOn: boolean;
    tildeOn: boolean;
    altOn: boolean;
    commaOn: boolean;
    backtickOn: boolean;
    caretOn: boolean;
    altBuffer: string;
  }>;
  className?: string;
}

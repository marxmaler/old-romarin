export const languages = [
  "English",
  "Español",
  "Français",
  "Deutsch",
  "日本語",
  "中文",
  "Русский",
];

export const langs = ["En", "Es", "Fr", "De", "Jp", "Ch", "Ru"];
export const languagesInKo = [
  "영어",
  "스페인어",
  "프랑스어",
  "독일어",
  "일본어",
  "중국어",
  "러시아어",
];

export const abbreviateLanguage = (language: string) => {
  const lang =
    language === "English"
      ? "En"
      : language === "Español"
      ? "Es"
      : language === "Français"
      ? "Fr"
      : language === "Deutsch"
      ? "De"
      : language === "日本語"
      ? "Jp"
      : language === "中文"
      ? "Ch"
      : "Ru";

  return lang;
};

export const getLanguageInKorean = (language: string) => {
  const languageInKorean =
    language === "English"
      ? "영어"
      : language === "Español"
      ? "스페인어"
      : language === "Français"
      ? "프랑스어"
      : language === "Deutsch"
      ? "독일어"
      : language === "日本語"
      ? "일본어"
      : language === "中文"
      ? "중국어"
      : "러시아어";
  return languageInKorean;
};

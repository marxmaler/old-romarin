import { IGetLtmsPointProps } from "../interfaces/interfaces";

export const languages = [
  "English",
  "Español",
  "Français",
  "Deutsch",
  "日本語",
  "中文",
  "Русский",
];

export const stringToArray = (stringData: string) => {
  const array =
    stringData !== ""
      ? String(stringData)
          .split(",")
          .map((particle) => {
            const trimmedParticle = particle.trim();
            if (trimmedParticle.length > 0) {
              return trimmedParticle;
            }
          })
      : [];

  return array;
};

export const getlangFomLanguage = (language: string) => {
  const statLang =
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

  return statLang;
};

export const getLanguageFromLang = (lang: string) => {
  const language =
    lang === "En"
      ? "English"
      : lang === "Es"
      ? "Español"
      : lang === "Fr"
      ? "Français"
      : lang === "De"
      ? "Deutsch"
      : lang === "Jp"
      ? "日本語"
      : lang === "Ch"
      ? "中文"
      : "Русский";

  return language;
};

export const getLtmsPoint = ({
  collocation,
  association,
  ex,
  syn,
  ant,
}: IGetLtmsPointProps) => {
  let ltmsPoint = 0;
  ltmsPoint += collocation.length > 0 ? 10 : 0;
  ltmsPoint += association !== "" ? 50 : 0;
  ltmsPoint += ex !== "" ? 20 : 0;
  ltmsPoint += syn.length > 0 ? 10 : 0;
  ltmsPoint += ant.length > 0 ? 10 : 0;
  return ltmsPoint;
};

export const getNthRev = (regRev: Date[]) => {
  const nthRev =
    regRev?.length === 4
      ? "never"
      : regRev?.length === 3
      ? "once"
      : regRev?.length === 2
      ? "twice"
      : regRev?.length === 1
      ? "threeTimes"
      : "fourTimes";

  return nthRev;
};

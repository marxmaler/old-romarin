import { IGetLtmsPointProps } from "../interfaces/interfaces";

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

export const getStatLang = (lang: string) => {
  const statLang =
    lang === "English"
      ? "En"
      : lang === "Español"
      ? "Es"
      : lang === "Français"
      ? "Fr"
      : lang === "Deutsch"
      ? "De"
      : lang === "日本語"
      ? "Jp"
      : lang === "中文"
      ? "Ch"
      : "Ru";

  return statLang;
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
    regRev?.length === 3
      ? "once"
      : regRev?.length === 2
      ? "twice"
      : regRev?.length === 1
      ? "threeTimes"
      : "fourTimes";

  return nthRev;
};

import { yyyymmdd } from "./functions/time";

export const fetchWords = async () => {
  return await (await fetch(`/api/words/${yyyymmdd(new Date())}`)).json();
};

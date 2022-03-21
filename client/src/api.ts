import { yyyymmdd } from "./functions/time";
import axios from "axios";

export const fetchWords = () => {
  return axios.get(`/api/word/review/${yyyymmdd(new Date())}`);
};

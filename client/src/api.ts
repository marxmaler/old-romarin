import { Types } from "mongoose";
import { yyyymmdd } from "./util/time";

export const fetchWords = async (userId: Types.ObjectId | undefined) => {
  return await (
    await fetch(`/api/words/${String(userId)}/${yyyymmdd(new Date())}`)
  ).json();
};

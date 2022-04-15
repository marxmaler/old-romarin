import { Types } from "mongoose";
import { yyyymmdd } from "./util/time";

export const fetchWords = async (userId: Types.ObjectId | undefined) => {
  return await (
    await fetch(`/api/words/${String(userId)}/${yyyymmdd(new Date())}`)
  ).json();
};

export const refetchUserData = async (userId: string) => {
  return await (await fetch(`/api/users/${userId}`)).json();
};

export const fetchWeeklyWords = async () => {
  const today = yyyymmdd(new Date());
  return await (await fetch(`/api/words/weekly/${today}`)).json();
};

export const fetchGithubCode = async (code: string) => {
  return await (
    await fetch(`/api/users/login/github/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
  ).json();
};

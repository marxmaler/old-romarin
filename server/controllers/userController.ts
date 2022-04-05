import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import Word from "../models/Word";

export const postLogin = async (req: Request, res: Response) => {
  const {
    data: { email, password },
  } = req.body;

  const user = await User.findOne({ email, socialOnly: false });
  // const rusRevOnce = await Word.count({
  //   language: "Русский",
  //   regRev: { $size: 3 },
  // });
  // const rusRevTwice = await Word.count({
  //   language: "Русский",
  //   regRev: { $size: 2 },
  // });
  // const rusRevThreeTimes = await Word.count({
  //   language: "Русский",
  //   regRev: { $size: 2 },
  // });
  // console.log(rusRevOnce, rusRevTwice, rusRevThreeTimes);
  // if (user) {
  //   user.stat.En.twice = 13;
  //   user.stat.En.threeTimes = 34;
  //   user.stat.Es.once = 10;
  //   user.stat.Es.twice = 4;
  //   user.stat.Es.threeTimes = 16;
  // user.stat.Ru.once = rusRevOnce;
  // user.stat.Ru.twice = rusRevTwice;
  // user.stat.Ru.threeTimes = rusRevThreeTimes;
  //   user.save();
  //   console.log(user);
  // }

  if (!user) {
    return res.sendStatus(404);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.sendStatus(400);
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.status(200).send({ user });
};

export const getLogout = async (req: Request, res: Response) => {
  req.session.destroy(() => {
    return res.sendStatus(200);
  });
};

export const postJoin = async (req: Request, res: Response) => {
  const {
    data: { email, password, name },
  } = req.body;

  const emailExist = await User.exists({ email });
  if (emailExist) {
    return res.sendStatus(400);
  }

  const newUser = await User.create({
    email,
    name,
    password,
  });
  console.log(newUser);
  return res.sendStatus(200);
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.sendStatus(404);
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.status(200).send({ user });
};

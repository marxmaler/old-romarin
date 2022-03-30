import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const postLogin = async (req: Request, res: Response) => {
  const {
    data: { email, password },
  } = req.body;

  const user = await User.findOne({ email, socialOnly: false });
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

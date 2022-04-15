import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { URLSearchParams } from "url";
import fetch from "node-fetch";

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

export const getGithubLogin = (req: Request, res: Response) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT + "", //전부 String으로 바꿔줘야 URLSearchParams에서 안막힘
    scope: "read:user user:email",
    allow_signup: false + "", //전부 String으로 바꿔줘야 URLSearchParams에서 안막힘
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.status(200).send({ finalUrl });
};

interface IEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}
interface ITokenData {
  access_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
  error_uri?: string;
}
interface IUserData {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    private_repos: number;
    collaborators: number;
  };
}
export const postGithubAuthLogin = async (req: Request, res: Response) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT + "",
    client_secret: process.env.GH_SECRET + "",
    code: req.body.code + "",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenData = (await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json()) as ITokenData;

  if ("access_token" in tokenData) {
    const { access_token } = tokenData;
    const apiUrl = "https://api.github.com/user";
    const userData = (await (
      await fetch(apiUrl, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json()) as IUserData;
    const emailData = (await (
      await fetch(`${apiUrl}/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json()) as IEmail[];

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.sendStatus(400);
    }

    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        name: userData.name,
        password: "",
        joinedWithSocial: true,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    console.log(user);
    return res.status(200).send({ user });
  } else {
    return res.sendStatus(400);
  }
};

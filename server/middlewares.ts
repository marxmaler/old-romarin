import { NextFunction, Request, Response } from "express";

export const mustLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.sendStatus(400);
  }
};

export const mustNotLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.sendStatus(400);
  }
};

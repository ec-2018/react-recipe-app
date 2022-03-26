import { Request, Response } from "express";
import User from "../models/user.model";

export function checkToken(req: Request, res: Response) {
  if (!req.user) return;

  res.status(200).send(req.user);
}
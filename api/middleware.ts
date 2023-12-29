import { useAuth } from "@/stores/auth";
import { NextApiRequest, NextApiResponse } from "next";

export const isAuthenticated = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => async (req: NextApiRequest, res: NextApiResponse) => {
  const { isAuth } = useAuth.getState();
  const token = req.cookies?.token

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  return handler(req, res);
};
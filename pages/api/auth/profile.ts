import {verify} from 'jsonwebtoken';
import type {NextApiRequest, NextApiResponse} from 'next';
import {name_cokie, secret} from './utils/GeneralUtils';

export type User = {
  name: string;
  email: string;
};

export default function profileHandler(req: NextApiRequest, res: NextApiResponse<User>) {
  try {
    const token = req.cookies[name_cokie] || '';
    const user: any = verify(token, secret);
    res.status(200).json({name: user['username'], email: user['email']});
  } catch (error) {
    res.status(401);
  }
}

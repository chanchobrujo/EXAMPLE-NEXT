import {verify} from 'jsonwebtoken';
import type {NextApiRequest, NextApiResponse} from 'next';

export type User = {
  name: string;
  email: string;
};

export default function profileHandler(req: NextApiRequest, res: NextApiResponse<User>) {
  const token = req.cookies['my-token'] || '';
  const user: any = verify(token, 'secret');
  res.status(200).json({name: user['username'], email: user['email']});
}

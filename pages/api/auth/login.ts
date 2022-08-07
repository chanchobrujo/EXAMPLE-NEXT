import {serialize} from 'cookie';
import jwt from 'jsonwebtoken';
import type {NextApiRequest, NextApiResponse} from 'next';

export type Data = {
  message: string;
};

export default function loginHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const request: Object = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    email: req.body['email'],
    username: 'chancho',
  };
  const token: string = jwt.sign(request, 'secret');
  const serialized: string = serialize('my-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: '/',
  });
  res.setHeader('Set-Cookie', serialized);
  res.status(200).json({message: 'Acccess successfully'});
}

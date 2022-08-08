import jwt from 'jsonwebtoken';
import type {NextApiRequest, NextApiResponse} from 'next';
import {builderSerializeExpired, builderTokenSign, expired_val, secret} from './utils/GeneralUtils';

export type MessagerResponse = {
  message: string;
};

export default function loginHandler(req: NextApiRequest, res: NextApiResponse<MessagerResponse>) {
  const token: string = jwt.sign(builderTokenSign(req), secret);
  res.setHeader('Set-Cookie', builderSerializeExpired(token, expired_val));
  res.status(200).json({message: 'Acccess successfully'});
}

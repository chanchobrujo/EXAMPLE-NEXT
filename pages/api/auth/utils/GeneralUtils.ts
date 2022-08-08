import {NextApiRequest} from 'next';
import {CookieSerializeOptions, serialize} from 'cookie';

export const secret: string = 'secret';
export const name_cokie: string = 'my-token';
export const expired_val: number = 60 * 60 * 24 * 30;

export const builderTokenSign = (req: NextApiRequest): Object => {
  const request: Object = {
    exp: Math.floor(Date.now() / 1000) + expired_val,
    email: req.body['email'],
    username: 'chancho',
  };
  return request;
};

export const builderSerializeExpired = (token: string, expired: number): string => {
  const isZero: boolean = expired == 0;
  const body: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: isZero ? expired : 1000 * expired,
    path: '/',
  };
  return serialize(name_cokie, token, body);
};

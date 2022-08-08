import {verify} from 'jsonwebtoken';
import {NextApiRequest, NextApiResponse} from 'next';

import {MessagerResponse} from './login';
import {builderSerializeExpired, name_cokie, secret} from './utils/GeneralUtils';

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse<MessagerResponse>) {
  try {
    const token = req.cookies[name_cokie] || '';
    verify(token, secret);
    res.setHeader('Set-Cookie', builderSerializeExpired('', 0));
    res.status(200).json({message: 'Logout successfully'});
  } catch (error) {
    res.status(401).json({message: 'Sessión invalid'});
  }
}

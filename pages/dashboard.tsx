import axios from 'axios';
import {NextPage} from 'next';
import {useEffect, useState} from 'react';

import {User} from './api/auth/profile';
import {MessagerResponse} from './api/auth/login';
import {NextRouter, useRouter} from 'next/router';

const dashboard: NextPage = () => {
  const router: NextRouter = useRouter();
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
  });

  const fetchData = async () => {
    const response = await axios.get<User>('/api/auth/profile');
    return response.data;
  };

  const logOut = async () => {
    try {
      await axios.post<MessagerResponse>('/api/auth/logout');
    } catch (error) {}
    router.push('/login');
  };

  useEffect(() => {
    fetchData()
      .then(setUser)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      dashboard GA
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
      <button onClick={logOut}>Cerrar sesión</button>
    </div>
  );
};

export default dashboard;

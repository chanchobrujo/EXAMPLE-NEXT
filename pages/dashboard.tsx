import axios from 'axios';
import {NextPage} from 'next';
import {useEffect, useState} from 'react';
import {User} from './api/auth/profile';

const dashboard: NextPage = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
  });

  const fetchData = async () => {
    const response = await axios.get<User>('/api/auth/profile');
    return response.data;
  };

  useEffect(() => {
    fetchData()
      .then(setUser)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      dashboard
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
    </div>
  );
};

export default dashboard;

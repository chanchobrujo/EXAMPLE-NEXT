import axios from 'axios';
import {NextPage} from 'next';
import React, {useState, FormEvent} from 'react';
import {NextRouter, useRouter} from 'next/router';

import {MessagerResponse} from './api/auth/login';

const Login: NextPage = () => {
  const router: NextRouter = useRouter();
  const [credentials, setCredentials] = useState({email: '', password: '******'});

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post<MessagerResponse>('/api/auth/login', credentials);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name='email' type='email' onChange={handleChange} placeholder='Correo electrónico' />
        <input name='password' type='password' onChange={handleChange} placeholder='Contraseña' />
        <button type='submit'>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;

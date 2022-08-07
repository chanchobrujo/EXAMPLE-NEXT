import {NextPage} from 'next';
import axios from 'axios';
import React, {useState, FormEvent} from 'react';
import {Data} from './api/auth/login';

const Login: NextPage = () => {
  const [credentials, setCredentials] = useState({email: '', password: '******'});

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post<Data>('/api/auth/login', credentials);
    console.log(response);
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

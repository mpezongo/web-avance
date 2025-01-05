import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/login', {
        username:email,
        password,
      }, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(res.data));
      console.log(res);
      navigate('/products');
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-100">
      <div className="w-[400px] bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">Login</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-gray-600">
          Don’t have an account?{' '}
          <a
            href="/signup"
            className="text-blue-800 hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

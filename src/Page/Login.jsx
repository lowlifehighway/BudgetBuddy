import api from '../api/axios';
import { useState } from 'react';
import { Eye, EyeSlash, Lock1, LoginCurve } from 'iconsax-reactjs';
import { MdOutlineMail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('users/login', userLogin);

      setMessage(res.data.message);
      console.log(message);
      navigate('/app');
      // Optionally store user info in local state or context
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
      console.log(message);
    }
  };

  return (
    <div className="gradient h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 text-lg mx-auto p-8 w-fit border-[rgba(0,0,0,0.1)] border-2 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full backdrop-blur-2xl border-[rgba(0,0,0,0.1)] border-2 mb-8">
            <LoginCurve size={64} />
          </div>
          <h2 className="text-3xl font-medium">Login with email</h2>
          <p>Welcome back, pick up right where you left off</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-2"
        >
          <label className="signup-login-label">
            <MdOutlineMail size={24} />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={userLogin.email}
              className="signup-login-input"
              onChange={handleChange}
            />
          </label>

          <label className="signup-login-label">
            <Lock1 />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter password"
              value={userLogin.password}
              className="signup-login-input"
              onChange={handleChange}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? <Eye /> : <EyeSlash />}
            </div>
          </label>

          <a className="text-sm text-right">forgot password?</a>

          <button
            type="submit"
            className="bg-gray-200 rounded-lg  w-sm  px-5 py-3 text-center cursor-pointer font-medium border-2 border-transparent hover:shadow-lg hover:border-[rgba(0,0,0,0.1)] hover:bg-transparent ease-out duration-300"
          >
            Login
          </button>
          <span className="text-center ">
            don't have an account?{' '}
            <span className="underline">
              <Link to={'/signup'}>signup</Link>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}
export default Login;

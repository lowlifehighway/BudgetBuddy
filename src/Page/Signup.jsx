import api from '../api/axios';
import { useState } from 'react';
import { Eye, EyeSlash, Lock1, LoginCurve, Profile } from 'iconsax-reactjs';
import { MdOutlineMail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Handles input updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const newUserData = async (e) => {
    e.preventDefault();

    if (newUser.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Send new user data to backend
      await api.post('users/signup', newUser);

      navigate('/app');
      // Reset the form
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
      });
      setConfirmPassword('');
      console.log('User added successfully!');
    } catch (err) {
      console.error('Error adding user:', err.message);
      console.log('Failed to add user');
    }
  };

  return (
    <div className="gradient h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 text-lg mx-auto p-8 w-fit border-[rgba(0,0,0,0.1)] border-2 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full backdrop-blur-2xl border-[rgba(0,0,0,0.1)] border-2 mb-8">
            <LoginCurve size={64} />
          </div>
          <h2 className="text-3xl font-medium">Create an account</h2>
          <p>Let's get you set up with a new account.</p>
        </div>
        <form onSubmit={newUserData} noValidate className="flex flex-col gap-2">
          <label className="signup-login-label">
            <Profile />
            <input
              name="first_name"
              type="text"
              required
              placeholder="First Name"
              value={newUser.first_name}
              className="signup-login-input"
              onChange={handleChange}
            />
          </label>
          <label className="signup-login-label">
            <Profile />
            <input
              name="last_name"
              type="text"
              required
              placeholder="Last Name"
              value={newUser.last_name}
              className="signup-login-input"
              onChange={handleChange}
            />
          </label>

          <label className="signup-login-label">
            <MdOutlineMail size={24} />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={newUser.email}
              className="signup-login-input"
              onChange={handleChange}
            />
          </label>
          <label className="signup-login-label">
            <MdOutlineMail size={24} />
            <input
              name="phone_number"
              type="phone"
              required
              placeholder="Phone Number"
              value={newUser.phone_number}
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
              value={newUser.password}
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

          <label className="signup-login-label">
            <Lock1 />
            <input
              name="confirm_password"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              placeholder="Repeat password"
              value={confirmPassword}
              className="signup-login-input"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer"
            >
              {showConfirmPassword ? <Eye /> : <EyeSlash />}
            </div>
          </label>

          <button
            type="submit"
            className="bg-gray-200 rounded-lg  w-sm  px-5 py-3 text-center cursor-pointer font-medium border-2 border-transparent hover:shadow-lg hover:border-[rgba(0,0,0,0.1)] hover:bg-transparent ease-out duration-300"
          >
            Get Started
          </button>
          <span className="text-center ">
            already have an account?{' '}
            <span className="underline">
              <Link to={'/login'}>login</Link>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}
export default SignUp;

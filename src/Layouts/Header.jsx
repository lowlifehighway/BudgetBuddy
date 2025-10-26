import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
function Header({ headerRef, username }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = async () => {
    try {
      // await api.get('/users/profile');
      await api.get('/users/auth');
      navigate('/app');
    } catch (err) {
      console.error('Authentication check failed:', err);
      navigate('/login');
    }
  };
  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full py-4 px-6 bg-primary text-white rounded-b-4xl flex justify-between font-medium items-center z-1"
    >
      <a onClick={handleClick}>Budget Buddy</a>
      <nav className="flex gap-8">
        <a className="header-nav-a">Payment List</a>
        <a className="header-nav-a">Assets</a>
        <a className="header-nav-a">Plan</a>
        <a className="header-nav-a">Coupons</a>
        <a className="header-nav-a">Blog</a>
      </nav>
      <div
        className=""
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <a>{username && `Hello, ${username}!`}</a>
        <div
          className={`absolute flex flex-col bg-primary right-0 transition-all duration-300 overflow-hidden ${
            showMenu ? 'h-40 pt-6 visible' : 'h-0 invisible'
          }`}
        >
          <a className="px-12 py-4 hover:bg-primary-shade"> Settings</a>
          <a
            className="px-12 py-4 hover:bg-primary-shade"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </header>
  );
}
export default Header;

import { useRoutes } from 'react-router-dom';
import './index.css';
import Home from './Page/Homepage.jsx';
import SignUp from './Page/Signup.jsx';
import LogIn from './Page/Login.jsx';
import App from './Page/App.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

function AppRoutes() {
  const routes = [
    ...['', '/', '/home'].map((home) => {
      return { path: home, element: <Home /> };
    }),
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
    },
    { path: '/signup', element: <SignUp /> },
    { path: '/login', element: <LogIn /> },
  ];

  return useRoutes(routes);
}
export default AppRoutes;

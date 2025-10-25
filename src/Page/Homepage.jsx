import Header from '../Layouts/Header.jsx';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Header />
      <main className="h-screen gradient">
        <div className="max-w-240 flex flex-col mx-auto h-full justify-center items-center cursor-default">
          <h1 className="text-8xl text-white px-10 font-extrabold text-center">
            Welcome to Your <br />
            Budget Buddy!
          </h1>
          <p className="text-black opacity-50 pt-4 text-3xl font-medium text-center">
            Your personal finance companion to help you track expenses, manage
            budgets, and achieve your financial goals with ease.
          </p>
          <ul className="flex gap-10 text-black text-2xl font-semibold pt-10">
            <Link to={`/signup`}>
              <li
                className="bg-white px-6 py-2 rounded-full border-2 border-transparent hover:border-black hover:bg-transparent ease-out duration-300 cursor-pointer"
                onClick={() => {}}
              >
                Sign Up
              </li>
            </Link>
            <Link to={`/login`}>
              <li
                className="bg-white px-6 py-2 rounded-full border-2 border-transparent hover:border-black hover:bg-transparent ease-out duration-300 cursor-pointer"
                onClick={() => {}}
              >
                Log In
              </li>
            </Link>
          </ul>
        </div>
      </main>
    </>
  );
}
export default Home;

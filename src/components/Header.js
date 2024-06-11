import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <header className="bg-yellow-400 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src="https://i.imgur.com/Ie2gl65.png" alt="CurryCanvas Logo" className="h-28 mr-5" />
          </Link>
          <h1 className="text-3xl font-bold text-yellow-800">CurryCanvas</h1>
        </div>
        <nav className="mt-4">
          <ul className="flex">
            <li className="mr-4">
              <Link to="/" className="text-yellow-800 hover:text-yellow-600 transition duration-300">Home</Link>
            </li>
            <li className="mr-4">
              <Link to="/recipes" className="text-yellow-800 hover:text-yellow-600 transition duration-300">Recipes</Link>
            </li>
            <li>
              {user ? (
                <Link to="/profile" className="text-yellow-800 hover:text-yellow-600 transition duration-300">My Profile</Link>
              ) : (
                <div className="flex items-center">
                  <Link to="/login" className="text-yellow-800 hover:text-yellow-600 mr-2 transition duration-300">Login</Link>
                  <Link to="/register" className="text-yellow-800 hover:text-yellow-600 transition duration-300">Register</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

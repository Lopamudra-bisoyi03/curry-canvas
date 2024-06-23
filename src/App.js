import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import RecipesList from './pages/RecipesList';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const token = localStorage.getItem('token');
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      if (token && Date.now() > tokenExpiry) {
        fetch('http://localhost:5000/refresh-token', {
          method: 'POST',
          credentials: 'include', 
        })
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('tokenExpiry', Date.now() + 30 * 60 * 1000);
          })
          .catch(error => {
            console.error('Token refresh error:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
            localStorage.removeItem('user');
            setUser(null);
          });
      }
    }, 15 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <Router>
      <div>
        <Header user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipesList />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/recipeform" element={<RecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

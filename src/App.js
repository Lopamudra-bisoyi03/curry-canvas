import React, { useState } from 'react';
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

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Header user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipesList />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/recipeform" element={<RecipeForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

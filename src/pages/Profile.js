import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDishes = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://localhost:5000/api/recipes/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user dishes');
      }

      const data = await response.json();
      setDishes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user dishes:', error);
      setError('Failed to fetch user dishes. Please try again later.');
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUserDishes();
    }
  }, [user, navigate, fetchUserDishes]);

  const handleOpenForm = () => {
    navigate('/recipeform');
  };

  const handleDishClick = (dishId) => {
    navigate(`/recipe/${dishId}`);
  };

  const handleDeleteDish = async (dishId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://localhost:5000/api/recipes/${dishId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the dish');
      }

      setDishes(dishes.filter((dish) => dish.id !== dishId));
    } catch (error) {
      console.error('Error deleting dish:', error);
      setError('Failed to delete dish. Please try again later.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name } = user;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <p>Name: {name}</p>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Your Dishes</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : dishes.length === 0 ? (
          <div>No dishes found.</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {dishes.map((dish) => (
              <div key={dish.id} className="dish-card">
                <img
                  src={dish.photo}
                  alt={dish.name}
                  className="dish-photo rounded-lg"
                  onClick={() => handleDishClick(dish.id)}
                />
                <p className="dish-name">{dish.name}</p>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                  onClick={() => handleDeleteDish(dish.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-8">
        <button
          className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpenForm}
        >
          Cook Up your own Storm
        </button>
      </div>
    </div>
  );
};

export default Profile;

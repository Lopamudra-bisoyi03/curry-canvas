import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUserDishes(); 
    }
  }, [user, navigate]);

  const fetchUserDishes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipes'); 
      if (!response.ok) {
        throw new Error('Failed to fetch user dishes');
      }
      const data = await response.json();
      setDishes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user dishes:', error);
      setLoading(false);
    }
  };

  const handleOpenForm = () => {
    navigate('/recipeform'); 
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
        ) : (
          <ul>
            {dishes.map((dish) => (
              <li key={dish.id}>{dish.name}</li>
            ))}
          </ul>
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

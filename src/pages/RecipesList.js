import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import recipes from '../data/recipes';

const RecipesList = () => {
  const [filter, setFilter] = useState('all');

  const filteredRecipes = recipes.filter((recipe) => {
    if (filter === 'all') return true;
    return filter === 'veg' ? recipe.isVeg : !recipe.isVeg;
  });

  const getCircleColor = (isVeg) => {
    return isVeg ? 'bg-green-500' : 'bg-red-500';
  };

  const renderRecipeCards = (recipes) => {
    return recipes.map((recipe) => (
      <div key={recipe.id} className="border rounded-lg overflow-hidden shadow-lg">
        <Link to={`/recipe/${recipe.id}`}>
          <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold flex items-center">
              <span className={`${getCircleColor(recipe.isVeg)} inline-block w-3 h-3 rounded-full mr-2`}></span>
              {recipe.name}
            </h2>
            <p>Posted by: User {recipe.id}</p> 
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Recipes</h1>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="all">All</option>
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderRecipeCards(filteredRecipes)}
      </div>
    </div>
  );
};

export default RecipesList;

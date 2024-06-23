// src/components/Recipe.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import recipes from '../data/recipes';

const Recipe = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return <div className="container mx-auto p-4 text-center text-red-500">Recipe not found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-4 text-center">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5 space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Steps</h2>
        <ol className="list-decimal pl-5 space-y-1">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Category: {recipe.category}</h2>
        <h2 className="text-2xl font-bold mb-2">Posted by: {recipe.user}</h2> 
      </div>
    </div>
  );
};

export default Recipe;

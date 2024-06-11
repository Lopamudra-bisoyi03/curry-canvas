import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: [''],
    steps: [''],
    photo: null,
  });

  const [submitted, setSubmitted] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleIngredientChange = (e, index) => {
    const ingredients = [...recipeData.ingredients];
    ingredients[index] = e.target.value;
    setRecipeData({ ...recipeData, ingredients });
  };

  const handleStepChange = (e, index) => {
    const steps = [...recipeData.steps];
    steps[index] = e.target.value;
    setRecipeData({ ...recipeData, steps });
  };

  const handlePhotoChange = (e) => {
    setRecipeData({ ...recipeData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipeData.name || recipeData.ingredients.length === 0 || recipeData.steps.length === 0) {
      setErrorMessage('Please fill in all required fields (name, ingredients, and steps).');
      return;
    }

    setLoading(true); 
    setErrorMessage(''); 

    const formData = new FormData();
    formData.append('name', recipeData.name);
    formData.append('ingredients', JSON.stringify(recipeData.ingredients));
    formData.append('steps', JSON.stringify(recipeData.steps));
    formData.append('photo', recipeData.photo);

    try {
      const response = await axios.post('/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Recipe submitted:', response.data);
      setSubmitted(true);
      setRecipeData({ name: '', ingredients: [''], steps: [''], photo: null });
    } catch (error) {
      console.error('Error submitting recipe:', error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to submit recipe. Please try again.');
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleAddIngredient = () => {
    setRecipeData({ ...recipeData, ingredients: [...recipeData.ingredients, ''] });
  };

  const handleAddStep = () => {
    setRecipeData({ ...recipeData, steps: [...recipeData.steps, ''] });
  };

  const renderSuccessMessage = () => {
    return (
      <div className="text-green-600 text-center mt-4">
        Your recipe is submitted!
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Recipe Name:
          <input
            type="text"
            name="name"
            value={recipeData.name}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
          />
        </label>
        <div>
          <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
          {recipeData.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              placeholder={`Ingredient ${index + 1}`}
              onChange={(e) => handleIngredientChange(e, index)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
            />
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md focus:outline-none"
          >
            Add Ingredient
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Steps:</h3>
          {recipeData.steps.map((step, index) => (
            <textarea
              key={index}
              value={step}
              placeholder={`Step ${index + 1}`}
              onChange={(e) => handleStepChange(e, index)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
            />
          ))}
          <button
            type="button"
            onClick={handleAddStep}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md focus:outline-none"
          >
            Add Step
          </button>
        </div>
        <label className="block mb-2 mt-4">
          Photo:
          <input
            type="file"
            onChange={handlePhotoChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
          />
        </label>
        {errorMessage && <div className="text-red-600 text-center mt-4">{errorMessage}</div>}
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-orange-500 text-white rounded-md focus:outline-none"
          disabled={loading} 
        >
          {loading ? 'Submitting...' : 'Submit Recipe'}
        </button>
      </form>
      {submitted && renderSuccessMessage()}
    </div>
  );
};

export default RecipeForm;

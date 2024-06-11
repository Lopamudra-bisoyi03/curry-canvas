import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-cover bg-center min-h-screen" style={{ background: "rgba(255, 255, 255, 0.7)" }}>
      <div className="container mx-auto p-4">
        <div className="relative mb-8">
          <img src="https://cdn.pixabay.com/photo/2021/02/28/09/38/food-6056720_960_720.jpg" alt="Indian Food Banner" className="w-full h-56 object-cover rounded-lg shadow-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-white mb-4">Welcome to Curry Canvas</h1>
            <p className="text-lg font-semibold text-white text-center max-w-md px-4">
              "Embark on culinary escapades with CurryCanvas - where every dish is a masterpiece!"
            </p>
          </div>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg mb-8 flex items-center">
          <img src="https://cdn.pixabay.com/photo/2020/02/19/05/10/doodle-4861309_640.jpg" alt="Doodle Spices" className="w-24 h-24 mr-4" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Why We Love Indian Food</h2>
            <ul className="list-disc pl-8 text-lg">
              <li>Rich in spices and flavors that are unique and complex.</li>
              <li>Amazing variety of vegetarian and non-vegetarian dishes.</li>
              <li>Deep-rooted cultural and historical significance.</li>
              <li>Perfect balance of health and taste.</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow-lg mb-8 flex items-center">
          <div className="mr-6">
            <h2 className="text-2xl font-bold mb-2">Fun Facts About Indian Cuisine</h2>
            <p className="text-lg">
              Did you know that Indian food has six different tastes: sweet, sour, salty, bitter, pungent, and astringent? This balance of flavors is what makes Indian cuisine so unique and enjoyable.
            </p>
          </div>
          <img src="https://cdn.pixabay.com/photo/2020/09/09/09/00/cooking-5557053_1280.jpg" alt="Doodle Chef" className="w-24 h-24 mr-4" />
        </div>

        <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex items-center">
          <img src="https://cdn.pixabay.com/photo/2015/04/29/19/33/cookbook-746005_960_720.jpg" alt="Doodle Recipe Book" className="w-24 h-24 mr-4" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Get Started with Our Recipes</h2>
            <p className="text-lg mb-4">
              Ready to dive into the world of Indian cooking? Head over to our <Link to="/recipes" className="text-blue-600 underline">Recipes</Link> section and find the perfect dish to make today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';

import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import AddRecipeButton from './components/AddRecipeButton';
import './App.css';

function App() {
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [recipes, setRecipes] = useState(['recipe']);

  async function fetchData() {
      const rawRes = await fetch('/api/recipes')
      const response = await rawRes.json();
      setRecipes(response)
  }

  useEffect(() => {
      fetchData();
  }, []);

  const clickRecipe = function(recipeId) {
    setActiveRecipe(recipeId);
  };

  return (
    <div className="App">
      {!activeRecipe && 
        <RecipeList clickRecipe={clickRecipe} recipes={recipes}/>
      }
      {activeRecipe && 
        <Recipe id={activeRecipe} recipe={recipes.filter(recipe => recipe._id === activeRecipe)} />
      }
      {!activeRecipe &&
        <AddRecipeButton reloadRecipes={fetchData} />
      }
    </div>
  );
}

export default App;

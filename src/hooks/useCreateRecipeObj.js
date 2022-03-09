import { useEffect, useState } from 'react'

const useCreateRecipeObj = (recipesResponse) => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    recipeObj()
  }, [recipesResponse])

  const recipeObj = () => {
    const recipe = recipesResponse?.results.map((recipe) => {
      const nutrients = recipe.nutrition.nutrients.filter(
        (nutrient) =>
          nutrient.name === 'Calories' ||
          nutrient.name === 'Fat' ||
          nutrient.name === 'Sugar'
      )

      const objNutrients = nutrients.reduce(
        (acc, curr) => ((acc[curr.name] = curr), acc),
        {}
      )

      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        healthScore: recipe.healthScore,
        readyInMinutes: recipe.readyInMinutes,
        nutrients: objNutrients,
      }
    })

    setRecipes(recipe)
  }

  return recipes
}

export default useCreateRecipeObj

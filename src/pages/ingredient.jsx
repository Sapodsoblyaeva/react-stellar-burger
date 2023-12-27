import { useDispatch, useSelector } from 'react-redux'
import IngredientsDetails from '../components/ingredients-details/ingredients-details'
import { ingredient } from '../services/ingredient-сard/selectors'
import { useLocation } from 'react-router-dom'
import { allIngredients } from '../services/ingredients/selectors'
import { useEffect, useState } from 'react'
import { loadIngredients } from '../services/ingredients/action'

export const IngredientPage = () => {
  
  
//     const { ingredients } = useSelector(allIngredients)

//     const id = location.pathname.split('/').slice(2).join()
  
//     const card = ingredients.find((item) => item._id === id)

//   const { loading, error } = useSelector(allIngredients)


//   if (loading) {
//     return <h2>Loading..</h2>
//   }

//   if (!loading && error) {
//     return <h2>Something's gone wrong...</h2>
//   }

// const location = useLocation()
// console.log(location)

  return (
    <IngredientsDetails  /> 
  )
}

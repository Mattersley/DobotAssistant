import { useContext, useState } from 'react'
import AddNewButtons from '../../Layout/AddNewButtons/AddNewButtons'
import AddRecipeModal from './AddRecipeModal/AddRecipeModal'
import { MakeContext } from '../../../context/MakeContext/makeContext'
import RecipeCard from './RecipeCard/RecipeCard'

const Recipes = () => {
  const { deleteRecipe, recipes, refreshRecipes } = useContext(MakeContext)
  const [openModal, setOpenModal] = useState(false)

  const deleteRecipeWithRefresh = (recipeName: string) => {
    deleteRecipe(recipeName)
    refreshRecipes()
    refreshRecipes()
  }

  return (
    <>
      <div className="mt-20">
        <AddNewButtons refresh={refreshRecipes} setOpenNewModal={setOpenModal} title="Add New Recipe" top="auto" />
      </div>
      <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-6 mt-12 sm:mt-10 m-0">
        {openModal ? <AddRecipeModal open={openModal} setOpen={setOpenModal} /> : null}
        {recipes !== undefined && Object.entries(recipes).map((recipe) => (
          <RecipeCard
            key={recipe[0]}
            deleteRecipe={deleteRecipeWithRefresh}
            recipe={recipe}
          />
        ))}
      </div>
    </>
  )
}

export default Recipes

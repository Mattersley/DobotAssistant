import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { RecipeType } from '../Recipes.types'
import CardDropdown from '../../../Inventory/InventoryCard/Dropdown/Dropdown'

interface RecipeCardPropTypes {
    deleteRecipe: (item: string) => void,
    recipe: [string, RecipeType]
}

const RecipeCard = ({ deleteRecipe, recipe }: RecipeCardPropTypes) => {
  const name = recipe[0]
  const {
    directions, ingredients, productsMadeWithRecipe, recipeYield,
  } = recipe[1]

  const handleDelete = () => {
    deleteRecipe(name)
  }

  return (
    <div className="relative col-span-1 shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-auto m-3">
      <div className="absolute right-3 top-2">
        <CardDropdown handleDelete={handleDelete} type="recipe" />
      </div>
      <div className="flex flex-col justify-between mb-4">
        <p className="font-medium text-2xl text-donutPurple mb-2">{ name }</p>

        <div className="flex flex-row sm:flex-col lg:flex-row">
          <small className="font-bold mx-auto sm:mx-0 lg:mx-auto">
            Yield:
            {' '}
            <span className="font-normal">{recipeYield}</span>
          </small>
          <div className="flex flex-col justify-between mx-auto sm:mx-0 lg:mx-auto">
            <small className="font-bold">Makes part of: </small>
            {Object.values(productsMadeWithRecipe).map((product) => <small key={product} className="ml-2">{product}</small>)}
          </div>
        </div>
        <small className="font-bold mx-auto sm:mx-0 lg:mx-auto mt-4">
          Directions:
          {' '}
          <span className="font-normal">{directions}</span>
        </small>

        <div className="border border-t-1 border-gray-200 my-3 w-4/5 mx-auto" />
        <p className="w-4/5 mx-auto font-bold text-donutPink">Ingredients</p>
        <div className="w-full flex flex-col justify-center">
          {Object.entries(ingredients).map((ingredient) => {
            const { amount, amountUnits } = ingredient[1]
            return (
              <div key={ingredient[0]} className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <p className="col-span-1 font-bold text-right">{ingredient[0]}</p>
                <p className="col-span-1">{`${amount} ${amountUnits}`}</p>
              </div>
            )
          })}
        </div>
      </div>
      <button
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-donutPink hover:bg-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
      >
        Make It
        <ChevronDoubleRightIcon className="ml-2 w-5 h-5" />
      </button>
    </div>
  )
}

export default RecipeCard

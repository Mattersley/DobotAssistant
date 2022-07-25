import {
  CheckIcon, PlusIcon, XIcon,
} from '@heroicons/react/solid'
import { useState } from 'react'
import Tooltip from '../../../Layout/Tooltip/Tooltip'

interface CategoriesPropTypes {
    addOrRemoveCategory: (addOrRemove: string, category: string) => void,
    categories: string[]
}

const Categories = ({ addOrRemoveCategory, categories }: CategoriesPropTypes) => {
  const [editCategory, setEditCategory] = useState(false)
  const [UICategories, setUICategories] = useState(categories)
  const [values, setValues] = useState('')

  const handleChange = (event: { target: { value: string } }) => {
    setValues(event.target.value)
  }

  const handleCategoryChange = (addOrRemove: string, category: string) => {
    addOrRemoveCategory(addOrRemove, category)
    let newArray
    if (addOrRemove === 'remove') {
      const index = UICategories.sort().findIndex((item) => item === category)
      newArray = UICategories.sort().splice(index, 1)
    } else if (addOrRemove === 'add') {
      newArray = [category, ...categories]
    }
    setUICategories(newArray as string[])
  }

  const handleSubmit = () => {
    handleCategoryChange('add', values)
    setEditCategory(false)
  }

  return (
    <>
      {Object.values(UICategories).map((category) => (
        <button
          key={category}
          className="group px-2 py-1 mb-2 flex justify-center items-center text-xs rounded-md font-semibold text-white bg-donutPink hover:bg-red-100"
          onClick={() => handleCategoryChange('remove', category)}
          type="button"
        >
          <XIcon aria-hidden="true" className="opacity-0 group-hover:opacity-100 absolute text-center h-3.5 w-4 text-red-700" />
          <p className="opacity-100 group-hover:opacity-0">{category.toUpperCase()}</p>
        </button>
      ))}
      {editCategory
        ? (
          <div
            className="flex focus:ring-donutPink focus:border-donutPink text-donutPink border-donutGradientPink rounded-md w-full"
          >
            <input
              className="placeholder:text-donutPink focus:ring-donutPink focus:border-donutPink block w-full h-6 text-sm text-donutPink border-donutGradientPink rounded-md"
              id="new-category"
              name="new-category"
              onChange={handleChange}
              placeholder="New category"
              type="text"
            />
            <button
              className="ml-2 w-7 inline-flex items-center  rounded-l-md border border-r-0 border-red-500 bg-red-100 text-gray-900 text-sm dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              onClick={() => {
                setEditCategory(false)
                setValues('')
              }}
              title="Cancel"
              type="button"
            >
              <XIcon aria-hidden="true" className="h-3.5 w-4 text-red-700" />
            </button>
            <button
              className="inline-flex items-center px-3 rounded-r-md border-l-0 border border-green-500 bg-green-100 text-gray-900 text-sm dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              onClick={() => handleSubmit()}
              title="Create new category"
              type="button"
            >
              <CheckIcon aria-hidden="true" className="h-3.5 w-4 text-green-700" />
            </button>

          </div>
        )
        : (
          <Tooltip content="Add new category" placement="bottom">
            <button
              className="cursor-pointer px-2 py-1 flex items-center text-xs rounded-md font-semibold hover:text-white text-donutPink text-white border border-dashed border-donutGradientPink hover:border-transparent hover:bg-donutPink"
              onClick={() => {
                setEditCategory(true)
              }}
              type="button"
            >
              <PlusIcon aria-hidden="true" className="h-3.5 w-4 text-donutGradientPink" />
            </button>
          </Tooltip>
        )}
    </>
  )
}
export default Categories

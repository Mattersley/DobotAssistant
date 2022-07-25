import { PlusIcon, TrashIcon } from '@heroicons/react/solid'
import {
  Dispatch, SetStateAction, useState,
} from 'react'
import { Placement } from 'tippy.js'
import ItemListBox from '../ItemListBox/ItemListBox'
import FormInput from '../Input/FormInput/FormInput'
import Tooltip from '../Tooltip/Tooltip'

interface DynamicInputsTypes {
  props: {
    addButtonTooltipMessage: string,
    formTitle: string,
    handleChange: (event: {target: {name: string, value: string}}) => void,
    inputGroupSetup: {
      [name: string]: {
        dropdownList?: string[],
        placeholder?: string,
        tooltipPlacement?: Placement,
        tooltipText?: string,
        type: 'text' | 'number' | 'dropdown' | string,
        value?: string,
      },
    }
  }
}

const DynamicInputs = ({
  addButtonTooltipMessage, formTitle, handleChange, inputGroupSetup,
}: DynamicInputsTypes['props']) => {
  const [inputCount, setInputCount]: [number, Dispatch<SetStateAction<number>>] = useState(2)
  const [runningCount, setRunningCount] = useState(2)

  const setupInputGroup = (count: number) => {
    const obj: DynamicInputsTypes['props']['inputGroupSetup'] = {}
    Object.entries(inputGroupSetup).map((input) => Object.assign(obj, { [`${input[0]} ${count}`]: input[1] }))
    return obj
  }

  const [inputGroups, setInputGroups] = useState(() => {
    const array = []
    array.push(setupInputGroup(1))
    return array
  })

  const handleAddInputGroup = () => {
    setInputCount(() => inputCount + 1)
    setRunningCount(() => runningCount + 1)
    const array = inputGroups
    array.push(setupInputGroup(runningCount))
    setInputGroups(array)
  }

  const handleRemoveInputGroup = (key: number) => {
    const newArray = inputGroups
    newArray.sort().splice(key, 1)
    setInputGroups(newArray)
    setInputCount(() => inputCount - 1)
  }

  return (
    <>
      <div className="flex justify-between col-span-6 border-b-2 border-donutPink pb-2 mt-6">
        <label className="col-span-1 pb-1 justify-between" htmlFor="ingredientAddButton">{formTitle}</label>
        <Tooltip content={addButtonTooltipMessage} placement="left">
          <button
            className="h-8 w-8 p-1 text-green-700"
            id="ingredientAddButton"
            onClick={handleAddInputGroup}
            type="button"
          >
            <PlusIcon />
          </button>
        </Tooltip>
      </div>
      {inputGroups.map((inputGroup, i) => (
        <div key={i} className="align-bottom items-end col-span-6 grid grid-cols-7 gap-2 lg:gap-6 w-full overflow-visible mt-6">
          {Object.entries(inputGroup).map((input) => {
            const {
              placeholder, tooltipPlacement, tooltipText, type,
            } = input[1]
            if (type === 'dropdown' && input[1].dropdownList) {
              return (
                <div key={input[0]} className="col-span-6 sm:col-span-2 w-full">
                  <ItemListBox
                    handleChange={handleChange}
                    listItems={Object.values(input[1].dropdownList)}
                    placeholder={placeholder !== undefined ? placeholder : ''}
                    title={input[0]}
                  />
                </div>
              )
            }
            return (
              <FormInput
                key={input[0]}
                className="col-span-6 sm:col-span-2"
                handleChange={handleChange}
                inputType={type}
                title={input[0]}
                tooltipPlacement={tooltipPlacement}
                tooltipText={tooltipText}
              />
            )
          })}
          <button
            className="col-span-1 border border-red-700 mx-2 rounded h-9 w-9 p-2 text-red-700 hover:text-white hover:bg-red-700"
            onClick={() => handleRemoveInputGroup(i)}
            type="button"
          >
            <TrashIcon />
          </button>
        </div>
      ))}
    </>
  )
}

export default DynamicInputs

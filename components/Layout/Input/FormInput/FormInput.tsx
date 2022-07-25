import { Placement } from 'tippy.js'
import Tooltip from '../../Tooltip/Tooltip'
import { camelize } from '../../../../shared/helper'

export interface FormInputPropTypes {
    className?: string,
    handleChange: (event: {target: {name: string, value: string}}) => void,
    inputType: 'text' | 'textbox' | 'number' | 'checkbox' | 'button' | 'range' | 'radio' | 'password' | 'file' | 'email' | 'color' | 'date' | string,
    title: string,
    tooltipText?: string | undefined,
    tooltipPlacement?: Placement
}

const FormInput = ({
  className, handleChange, inputType, title, tooltipText, tooltipPlacement,
}: FormInputPropTypes) => {
  const returnInput = () => {
    if (inputType === 'textbox') {
      return (
        <textarea
          autoComplete={camelize(title)}
          className="mt-1 focus:ring-donutPurple focus:border-donutPurple block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          id={camelize(title)}
          name={camelize(title)}
          onChange={handleChange}
        />
      )
    }
    return (
      <input
        autoComplete={camelize(title)}
        className="mt-1 focus:ring-donutPurple focus:border-donutPurple block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        id={camelize(title)}
        name={camelize(title)}
        onChange={handleChange}
        type={inputType}
      />
    )
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700" htmlFor={camelize(title)}>
        {title.replace('Supplier', '')}
      </label>
      {tooltipText && tooltipPlacement ? (
        <Tooltip content={tooltipText} placement={tooltipPlacement}>
          {returnInput()}
        </Tooltip>
      ) : returnInput()}
    </div>
  )
}

FormInput.defaultProps = {
  className: 'col-span-6 sm:col-span-2',
  tooltipText: undefined,
  tooltipPlacement: undefined,
}

export default FormInput

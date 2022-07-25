import { AddInventorySuccessPropTypes } from '../AddInventory.types'

const AddInventorySuccess = ({ setOpen, setPage, setSuccess }: AddInventorySuccessPropTypes) => {
  const handleCancel = () => {
    setOpen(false)
    setPage(0)
    setSuccess(false)
  }

  return (
    <div className="ml-auto">
      <button
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-donutPink hover:bg-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleCancel}
        type="button"
      >
        Go Back
      </button>
    </div>
  )
}
export default AddInventorySuccess

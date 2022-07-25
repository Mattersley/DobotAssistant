import { IconRefresh } from '../Layout/Menu/Menu.svg'
import { IconRoute } from '../../pages/deliver/deliver.svg'
import { OrderContextProps } from '../../context/OrderContext/orderContext.types'

interface GetRouteButtonProps{
  routeInfo: OrderContextProps['routeInfo'],
  setSwitch: (bool: boolean) => void
}

const GetRouteButton = ({ routeInfo, setSwitch }: GetRouteButtonProps) => {
  const handleGetRoute = () => {
    setSwitch(true)
  }

  return (
    <button
      className="mt-6 ml-auto mr-6 shadow-lg h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-donutPink hover:bg-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-donutPurple"
      onClick={handleGetRoute}
      type="button"
    >
      {routeInfo ? (
        <>
          <p className="mr-2">Refresh Route</p>
          <IconRefresh />
        </>
      ) : (
        <>
          <p className="mr-2">Get Route</p>
          <IconRoute />
        </>
      )}
    </button>
  )
}

export default GetRouteButton

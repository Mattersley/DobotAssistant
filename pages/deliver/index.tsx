import { useContext } from 'react'
import { OrderContext } from '../../context/OrderContext/orderContext'
import { DeliveryDateContext } from '../../context/DeliveryDateContext/deliveryDateContext'
import GetRouteButton from '../../components/Deliver/GetRouteButton'
import DeliveryInformation from '../../components/Deliver/DeliveryInformation'
import DeliverySteps from '../../components/Deliver/DeliverySteps'
import Map from '../../components/Deliver/Map/Map'

const Deliver = () => {
  const { ordersByDeliveryDate, setGetCoordinatesAndOptimisation, routeInfo } = useContext(OrderContext)
  const { nextDeliveryDateFromMaster } = useContext(DeliveryDateContext)

  return (
    <div className="h-full mt-1">
      <GetRouteButton routeInfo={routeInfo} setSwitch={setGetCoordinatesAndOptimisation} />
      <div className="flex flex-col md:flex-row h-full w-full">
        <div className="w-full md:w-1/3">
          <DeliveryInformation nextDeliveryDateFromMaster={nextDeliveryDateFromMaster} routeInfo={routeInfo} />
          <DeliverySteps nextDeliveryDateFromMaster={nextDeliveryDateFromMaster} ordersByDeliveryDate={ordersByDeliveryDate} routeInfo={routeInfo} />
        </div>
        <div className="w-full h-screen md:h-full md:w-2/3 mr-6">
          <Map />
        </div>
      </div>
    </div>
  )
}

export default Deliver

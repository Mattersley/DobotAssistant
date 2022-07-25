import { useContext } from 'react'
import { OrderContext } from '../context/OrderContext/orderContext'
import ProcessCard from '../components/Dashboard/ProcessCard/ProcessCard'
import OrderStatsBar from '../components/Orders/StatsBar/OrderStatsBar'
import { DeliveryDateContext } from '../context/DeliveryDateContext/deliveryDateContext'
import OrderChart from '../components/Dashboard/OrderChart/OrderChart'

const Homepage = () => {
  const { ordersForNextDeliveryDay, routeInfo } = useContext(OrderContext)
  const { nextDeliveryDateFromMaster } = useContext(DeliveryDateContext)

  return (
    <div className="grid grid-cols-10 grid-rows-10 gap-2 w-full h-full m-6">
      <div className="col-span-5 lg:col-span-2 row-span-6">
        <ProcessCard ordersForNextDeliveryDay={ordersForNextDeliveryDay} />
      </div>
      <div className="col-span-4 row-span-1">
        <OrderStatsBar
          dashboard
          nextDeliveryDateFromMaster={nextDeliveryDateFromMaster}
          orders={ordersForNextDeliveryDay}
          routeInfo={routeInfo}
        />
      </div>
      <div className="col-span-9 sm:col-span-5 col-start-1 sm:col-start-3 row-span-5 row-start-7 lg:row-start-2">
        <OrderChart />
      </div>
    </div>
  )
}

export default Homepage

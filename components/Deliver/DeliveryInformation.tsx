import { format } from 'date-fns'
import { OrderContextProps } from '../../context/OrderContext/orderContext.types'

interface DeliveryInformationPropTypes {
  routeInfo: OrderContextProps['routeInfo']
  nextDeliveryDateFromMaster: Date | undefined
}

const DeliveryInformation = ({ routeInfo, nextDeliveryDateFromMaster }: DeliveryInformationPropTypes) => (
  <div>
    {routeInfo?.[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')] && Object.values(routeInfo[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')].trips).map((trip) => (
      <div key={trip && `${trip.geometry}${trip.distance}`} className="m-6 text-donutPurple flex flex-row space-x-5">
        <p className="font-bold">{format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')}</p>
        <p>
          Stops:
          {' '}
          {trip && Object.keys(trip.legs).length}
        </p>
        <p>
          {trip && Math.round(trip.distance / 1000)}
          {' '}
          km
        </p>
        <p>
          {trip && Math.round(trip.duration / 60)}
          {' '}
          minutes
        </p>
      </div>
    ))}
  </div>
)

export default DeliveryInformation

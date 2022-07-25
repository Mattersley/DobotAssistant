import { useContext } from 'react'
import ical from 'ical-generator'
import { OrderContext } from '../context/OrderContext/orderContext'

const useCalendarCreator = () => {
  const { ordersForNextDeliveryDay } = useContext(OrderContext)

  const calendar = ical({ name: 'Donut Order Calendar', description: 'Order information' })

  ordersForNextDeliveryDay?.forEach((order) => {
    const {
      id, billing, shipping, customer_note: customerNote,
    } = order
    const { email, phone } = billing
    const {
      first_name: firstName, last_name: lastName, address_1: addressLine1, address_2: addressLine2, city, postcode,
    } = shipping
    const orderDeliveryDate = Object.values(order.meta_data).filter((el) => el.key === 'Delivery Date')[0].value

    calendar.createEvent({
      id,
      allDay: true,
      start: orderDeliveryDate,
      end: orderDeliveryDate,
      summary: `Tel: ${phone}, email: ${email}, notes: ${customerNote}`,
      description: `${firstName} ${lastName}`,
      location: `${addressLine1} ${addressLine2} ${city} ${postcode}`,
    })
  })

  return {
    calendar,
  }
}

export default useCalendarCreator

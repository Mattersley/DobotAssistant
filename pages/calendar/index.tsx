import useCalendarCreator from '../../hooks/useCalendar'

const Calendar = () => {
  const { calendar } = useCalendarCreator()

  return (
    <p>Calendar</p>

  )
}

export default Calendar

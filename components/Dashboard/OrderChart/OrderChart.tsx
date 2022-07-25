import Chart, { ChartItem } from 'chart.js/auto'
import React, { useEffect, useRef } from 'react'
import {
  format, previousSaturday, previousWednesday, sub,
} from 'date-fns'

const labels = [
  format(previousWednesday(sub(Date.now(), { days: 28 })), 'd MMMM'),
  format(previousSaturday(sub(Date.now(), { days: 28 })), 'd MMMM'),
  format(previousWednesday(sub(Date.now(), { days: 21 })), 'd MMMM'),
  format(previousSaturday(sub(Date.now(), { days: 21 })), 'd MMMM'),
  format(previousWednesday(sub(Date.now(), { days: 14 })), 'd MMMM'),
  format(previousSaturday(sub(Date.now(), { days: 14 })), 'd MMMM'),
  format(previousWednesday(sub(Date.now(), { days: 7 })), 'd MMMM'),
  format(previousSaturday(sub(Date.now(), { days: 7 })), 'd MMMM'),
  format(previousWednesday(Date.now()), 'd MMMM'),
  format(previousSaturday(Date.now()), 'd MMMM'),
]

let width: number
let height: number
let gradient: { addColorStop: (arg0: number, arg1: any) => void }
// eslint-disable-next-line no-shadow
function getGradient(ctx: { createLinearGradient: (arg0: number, arg1: any, arg2: number, arg3: any) => { addColorStop: (arg0: number, arg1: any) => void } }, chartArea: { right: number; left: number; bottom: number; top: number }) {
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(10, chartArea.top, 10, chartArea.bottom)
    gradient.addColorStop(0, 'rgba(255,230,250,1)')
    gradient.addColorStop(1, 'rgba(204,153,204,1)')
  }

  return gradient
}

const data = {
  labels,
  datasets: [{
    backgroundColor(context: { chart: never }) {
      const { chart } = context
      const { ctx, chartArea } = chart

      if (!chartArea) {
        // This case happens on initial chart load
        return
      }
      return getGradient(ctx, chartArea)
    },
    borderRadius: 4,
    data: [21, 19, 27, 13, 15, 33, 32, 23, 23, 19],
  }],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
}

const OrderChart = () => {
  const chartRef = useRef<HTMLCanvasElement>()

  useEffect(() => {
    const myChartRef: ChartItem = chartRef.current?.getContext('2d')
    const chart = new Chart(myChartRef, {
      data,
      options,
      plugins: [],
      type: 'bar',
    });
    (() => chart)()
    return () => chart.destroy()
  }, [])

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg ">
      <p className="text-center font-mono text-donutPurple">Completed Orders</p>
      <canvas id="flavourChart" ref={chartRef} />
    </div>
  )
}

export default OrderChart

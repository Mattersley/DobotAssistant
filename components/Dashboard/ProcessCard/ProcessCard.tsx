import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/outline'
import {
  IconDeliver, IconMake, IconOrders, IconPack,
} from '../../Layout/Menu/Menu.svg'
import { Order } from '../../Orders/Order.types'

interface ProcessCardPropTypes {
  ordersForNextDeliveryDay: Order[] | undefined
}

const ProcessCard = ({ ordersForNextDeliveryDay }: ProcessCardPropTypes) => (
  <div className="h-full flex flex-col align-middle items-center justify-between shadow-lg rounded-xl bg-white dark:bg-gray-700">
    <div className="flex flex-col h-full pt-12">

      <div className="flex flex-row w-full items-center justify-between px-10">
        <Link href="/orders">
          <div className="cursor-pointer transform hover:scale-105 relative w-12 h-12 rounded-3xl bg-donutPink shadow-lg">
            <div className="flex flex-col align-middle items-center justify-between text-white absolute w-6 h-6 rounded-3xl bg-red-500 shadow-lg left-8 bottom-7">
              {ordersForNextDeliveryDay && Object.keys(ordersForNextDeliveryDay).length}
            </div>
            <div className="text-white m-3"><IconOrders /></div>
          </div>
        </Link>
        <p className="font-mono text-gray-400 text-left">Orders</p>
      </div>

      <div className="ml-16 self-start border border-gray-100 border-dotted border-r-4 border-l-0 w-0 h-full" />

      <div className="flex flex-row w-full items-center justify-between px-10">
        <Link href="/make">
          <div className="cursor-pointer transform hover:scale-105 relative w-12 h-12 rounded-3xl bg-donutPink shadow-lg">
            <div className="text-white m-3"><IconMake /></div>
          </div>
        </Link>
        <p className="font-mono text-gray-400 text-left">Make</p>
      </div>

      <div className="ml-16 self-start border border-gray-100 border-dotted border-r-4 border-l-0 w-0 h-full" />

      <div className="flex flex-row w-full items-center justify-between px-10">
        <Link href="/pack">
          <div className="cursor-pointer transform hover:scale-105 relative w-12 h-12 rounded-3xl bg-donutPink shadow-lg">
            <div className="text-white m-3"><IconPack /></div>
          </div>
        </Link>
        <p className="font-mono text-gray-400 text-left">Pack</p>
      </div>

      <div className="ml-16 self-start border border-gray-100 border-dotted border-r-4 border-l-0 w-0 h-full" />

      <div className="flex flex-row w-full items-center justify-between px-10">
        <Link href="/deliver">
          <div className="cursor-pointer transform hover:scale-105 relative w-12 h-12 rounded-3xl bg-donutPink shadow-lg">
            <div className="text-white m-3"><IconDeliver /></div>
          </div>
        </Link>
        <p className="font-mono text-gray-400 text-left">Deliver</p>
      </div>

      <div className="ml-16 self-start border border-gray-100 border-dotted border-r-4 border-l-0 w-0 h-full" />

      <div className="flex flex-row w-full items-center justify-between px-10">
        <div className="cursor-pointer transform hover:scale-105 relative w-12 h-12 rounded-3xl border-green-700 bg-green-600 opacity-70 shadow-lg">
          <div className="text-white m-3"><CheckIcon /></div>
        </div>
        <p className="font-mono text-gray-400 text-left">Complete</p>
      </div>

      <div className="self-start text-left m-10">
        <p className="font-mono text-gray-500 tinyText">Completed Sales this Month:</p>
        <p className="text-donutPurple font-bold text-2xl">$5,300</p>
        <p className="font-mono mt-1 text-blue-500 underline tinyText">Learn More</p>
      </div>
    </div>
  </div>
)

export default ProcessCard

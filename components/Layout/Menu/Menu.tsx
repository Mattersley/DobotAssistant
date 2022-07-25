import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  IconAnalytics,
  IconCalendar,
  IconDeliver, IconHelp,
  IconHome, IconInventory, IconMake, IconOrders, IconPack, IconProfile, IconSettings,
} from './Menu.svg'
import { MenuPropTypes } from '../MobileMenu/MobileMenu'

const Menu = ({ close, open }: MenuPropTypes) => {
  const router = useRouter()

  return (
    <button className="p-0 m-0 w-screen sm:w-full border-0" onClick={() => close && close()} type="button">
      <ul className="flex flex-col z-50">
        <li className="w-full">
          <Link href="/">
            <div
              className={`${router.pathname === '/'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'} 
              cursor-pointer flex flex-row items-center h-14 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconHome />
              </span>
              <span className="ml-3">Dashboard</span>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link href="/orders">
            <div
              className={`${router.pathname === '/orders'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-14 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/orders'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconOrders />
              </span>
              <span className="ml-3">Orders</span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/inventory">
            <div
              className={`${router.pathname === '/inventory'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
                cursor-pointer flex flex-row items-center h-14 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/inventory'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconInventory />
              </span>
              <span className="ml-3">Inventory</span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/make">
            <div
              className={`${router.pathname === '/make'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-14 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/make'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconMake />
              </span>
              <span className="ml-3">Make</span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/pack">
            <div
              className={`${router.pathname === '/pack'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-14 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/pack'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconPack />
              </span>
              <span className="ml-3">Pack</span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/deliver">
            <div
              className={`${router.pathname === '/deliver'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-14 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/deliver'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconDeliver />
              </span>
              <span className="ml-3">Deliver</span>
            </div>
          </Link>
        </li>

        <li className={open ? 'border border-t-1 border-gray-200 opacity-100 my-3 w-4/5 mx-auto' : 'border border-t-1 border-gray-200 opacity-0 sm:opacity-100 my-3 w-4/5 mx-auto'} />

        <li className="my-px">
          <Link href="/analytics">
            <div
              className={`${router.pathname === '/analytics'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-10 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/analytics'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconAnalytics />
              </span>
              <span className="ml-3">Analytics</span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/calendar">
            <div
              className={`${router.pathname === '/calendar'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-10 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/calendar'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconCalendar />
              </span>
              <span className="ml-3">Calendar</span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/products">
            <div
              className={`${router.pathname === '/products'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-10 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/products'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconPack />
              </span>
              <span className="ml-3">Products</span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/admin/profile">
            <div
              className={`${router.pathname === '/admin/profile'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-10 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/admin/profile'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconProfile />
              </span>
              <span className="ml-3">Profile</span>
              <span
                className="hidden sm:block flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 py-1 rounded-full ml-auto"
              >
                10
              </span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/admin/help">
            <div
              className={`${router.pathname === '/admin/help'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-10 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/admin/help'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconHelp />
              </span>
              <span className="ml-3">Help Center</span>
            </div>
          </Link>
        </li>
        <li className="my-px">
          <Link href="/admin/settings">
            <div
              className={`${router.pathname === '/admin/settings'
                ? 'border-l-8 border-donutPurple bg-gradient-to-r from-donutGradientPink bg-opacity-50 text-donutPurple'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}
              cursor-pointer flex flex-row items-center h-10 w-full px-3`}
            >
              <span
                className={`${router.pathname === '/admin/settings'
                  ? 'text-donutPurple'
                  : 'text-gray-400'}
                flex items-center justify-center text-lg`}
              >
                <IconSettings />
              </span>
              <span className="ml-3">Settings</span>
            </div>
          </Link>
        </li>
      </ul>
    </button>
  )
}

export default Menu

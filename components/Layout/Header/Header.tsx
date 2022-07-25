import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  BellIcon, ChatIcon, MenuIcon, SearchIcon, XIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'

import { DobotAssistantLogo } from '../../Auth/LoginForm.svg'
import { UserContext } from '../../../context/UserContext/userContext'
import DeliveryDayDropdown from './DeliveryDayDropdown/DeliveryDayDropdown'
import MobileMenu from '../MobileMenu/MobileMenu'
import Tooltip from '../Tooltip/Tooltip'

const Header = () => {
  const { user, signOutUser } = useContext(UserContext)

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="border-b-2 bg-white fixed w-screen z-50">
      <Disclosure as="nav" className="z-50">
        {({ open }) => (
          <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center align-middle justify-between w-full h-16">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="z-50 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-400 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon aria-hidden="true" className="block h-6 w-6" />
                  ) : (
                    <MenuIcon aria-hidden="true" className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
                <MobileMenu open={open} />
              </div>
              <div className="ml-10 flex-1 flex md:items-center justify-between sm:justify-center md:items-stretch md:justify-start">
                <div className="flex-shrink-0 flex">
                  <DobotAssistantLogo className="" height="100%" width="50%" />
                </div>
                <Tooltip content="Search" placement="bottom">
                  <button
                    className="absolute left-48 w-10 p-1 rounded-full text-gray-400 hover:text-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    type="button"
                  >
                    <span className="sr-only">Search</span>
                    <SearchIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </Tooltip>
              </div>
              <div className="absolute right-12 mr-2 md:mr-0 w-10 md:w-auto md:relative md:flex flex-row">
                <p className="self-center hidden lg:inline text-donutPurple font-bold mr-2">Delivery Date:</p>
                <DeliveryDayDropdown />
              </div>
              <div className="absolute inset-y-0 right-0 flex flex-row items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  className="hidden md:inline p-1 rounded-full text-gray-400 hover:text-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  type="button"
                >
                  <span className="sr-only">Chats</span>
                  <ChatIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                <button
                  className="hidden md:inline p-1 rounded-full text-gray-400 hover:text-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  type="button"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <div className="flex flex-row align-middle justify-center">
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-donutPurple focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        className="h-8 w-8 rounded-full"
                        src="images/ProfilePlaceholder.png"
                      />
                    </Menu.Button>
                    <small className="hidden md:inline my-auto mx-3">{user && user.email}</small>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            <Link href="/admin/profile">Your Profile</Link>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            <Link href="/admin/settings">Settings</Link>
                          </div>

                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={signOutUser}
                            onKeyDown={signOutUser}
                            role="button"
                            tabIndex={0}
                          >
                            <p>Sign out</p>
                          </div>

                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </div>
  )
}

export default Header

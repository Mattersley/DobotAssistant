import { Disclosure } from '@headlessui/react'
import Menu from '../Menu/Menu'

export interface MenuPropTypes {
    close?: () => void,
    open?: boolean
}

const MobileMenu = ({ open }: MenuPropTypes) => (
  <Disclosure.Panel className="sm:hidden">
    {({ close }) => (
      <div className="absolute left-0 top-16 w-screen h-screen -ml-2 m-0 bg-white align-top">
        <Menu close={close} open={open} />
      </div>
    )}
  </Disclosure.Panel>
)

MobileMenu.defaultProps = {
  close: null,
  open: false,
}

export default MobileMenu

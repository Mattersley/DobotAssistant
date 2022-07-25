import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'

import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'

import { UserContext } from '../../context/UserContext/userContext'
import { OrderProvider } from '../../context/OrderContext/orderContext'
import { InventoryProvider } from '../../context/InventoryContext/inventoryContext'
import { DeliveryDateProvider } from '../../context/DeliveryDateContext/deliveryDateContext'
import { ProductProvider } from '../../context/ProductContext/productContext'
import { MakeProvider } from '../../context/MakeContext/makeContext'
import usePush from '../../hooks/usePush'

interface LayoutPropTypes {
    children: React.ReactElement,
}

const Layout = ({ children }: LayoutPropTypes) => {
  const push = usePush()
  const { user } = useContext(UserContext)

  const loginOrChildren = () => {
    if (!user) {
      push('/').then()
    } return children
  }

  return (
    <div>
      {user
        ? (
          <div className="fixed w-screen h-screen sm:h-full">
            <Toaster position="bottom-right" />
            <div className="absolute bottom-0 right-0 p-8 w-screen h-full bg-gradient-to-r from-donutGradientPink to-donutGradientGreen z-0" />
            <Sidebar />
            <DeliveryDateProvider>
              <OrderProvider>
                <ProductProvider>
                  <>
                    <InventoryProvider>
                      <MakeProvider>
                        <main
                          className="pb-36 w-full md:w-mainWidth main absolute top-16 md:left-64 h-full flex flex-col transition-all duration-150 ease-in overflow-scroll"
                        >
                          {children}
                        </main>
                      </MakeProvider>
                    </InventoryProvider>
                    <Header />
                  </>
                </ProductProvider>
              </OrderProvider>
            </DeliveryDateProvider>
          </div>
        ) : loginOrChildren()}
    </div>
  )
}

export default Layout

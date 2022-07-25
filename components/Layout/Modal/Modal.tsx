import React, { ReactElement } from 'react'
import { PlusIcon } from '@heroicons/react/solid'

interface ModalPropTypes {
    children: ReactElement,
    modalTitle: string,
    mainSubtitle: string,
    childSubtitle: string,
    submitSuccess: boolean,
    showModal: boolean,
    setShowModal: (show: boolean) => void,
}

const Modal = ({
  children, modalTitle, mainSubtitle, childSubtitle, submitSuccess, showModal, setShowModal,
}: ModalPropTypes): JSX.Element | null => {
  if (showModal) {
    return (
      <div className="overflow-y-scroll fixed inset-0 mx-auto" style={{ zIndex: 100 }}>
        <div className="block flex justify-start items-start p-0 px-4 pt-4 m-0 h-screen text-center">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"
            role="dialog"
            style={{ zIndex: 99 }}
          >
            <button
              className="w-screen h-screen border-none cursor-default z-40"
              id="modalClose"
              onClick={() => setShowModal(false)}
              onKeyDown={() => setShowModal(false)}
              type="button"
            >
              <label className="hidden z-40" htmlFor="modalClose">Close Modal</label>
            </button>
          </div>
          <div
            className="z-50 inline-block overflow-hidden mx-auto w-screen text-left align-top bg-white rounded-lg shadow-xl transition-all transform sm:my-0 sm:align-top sm:max-w-lg sm:w-auto"
            style={{ zIndex: 100 }}
          >
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className="flex flex-shrink-0 justify-center items-center mx-auto w-12 h-12 bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                >
                  <PlusIcon aria-hidden="true" className="w-6 h-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="mt-2 text-xl font-medium leading-6 text-green-600">
                    {modalTitle}
                  </h3>
                  <div className="mt-6">
                    <div className="mt-10 ml-0 sm:mt-0 sm:ml-8">
                      <div className="md:grid md:grid-cols-5 md:gap-6">
                        <div className="md:col-span-1">
                          <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-donutPurple">
                              {mainSubtitle}
                            </h3>
                            <p className="mt-1 text-sm text-donutPink">{childSubtitle}</p>
                          </div>
                        </div>
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!submitSuccess && (
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  className="inline-flex justify-center px-4 py-2 w-full text-base font-medium text-white bg-red-600 rounded-md border border-transparent shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default Modal

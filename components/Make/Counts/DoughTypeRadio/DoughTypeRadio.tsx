import { StarIcon } from '@heroicons/react/solid'
import { useContext } from 'react'
import { MakeContext } from '../../../../context/MakeContext/makeContext'
import Tooltip from '../../../Layout/Tooltip/Tooltip'
import { IconRefresh } from '../../../Layout/Menu/Menu.svg'

interface DoughTypeRadioPropTypes {
    withBackdrop?: boolean
}

const DoughTypeRadio = ({ withBackdrop }: DoughTypeRadioPropTypes) => {
  const { featureDonutName, featureDoughType, setFeatureDoughType } = useContext(MakeContext)

  return (
    <>
      {withBackdrop ? <div className="fixed absolute top-0 right-0 w-screen h-screen bg-gray-500 opacity-50 z-40" /> : null}
      <div className={withBackdrop ? 'absolute top-1/4 sm:right-1/4 flex-row justify-center w-auto sm:w-2/3 h-auto z-50 my-auto' : 'flex flex-row justify-center md:justify-start w-full mt-20 md:mt-0 h-auto'}>
        {featureDoughType === 'Please select a feature dough type above' ? (
          <div className="mx-10 flex flex-col xl:flex-row p-5 shadow bg-white rounded-xl h-full align-middle items-center justify-center">
            <div className="w-10 h-10 rounded-3xl text-white bg-yellow-300 p-1.5"><StarIcon /></div>
            <div className="xl:ml-3">
              <p className="text-center xl:text-left">{featureDonutName ? `Feature Dough Type for ${featureDonutName}` : 'Feature Dough Type'}</p>
              <input
                className="mx-2 text-donutPurple active:bg-donutPurple active:text-donutPurple focus:ring-donutPurple focus:bg-donutPurple focus:text-donutPurple"
                id="dough1"
                name="Dough"
                onChange={() => setFeatureDoughType('dough1')}
                type="radio"
                value="dough1"
              />
              <label className="mr-2 text-sm" htmlFor="dough1">Dough1 Donut</label>
              <input
                className="mr-2 text-donutPurple active:bg-donutPurple active:text-donutPurple focus:ring-donutPurple focus:bg-donutPurple focus:text-donutPurple"
                id="dough2"
                name="Dough"
                onChange={() => setFeatureDoughType('dough2')}
                type="radio"
                value="dough2"
              />
              <label className="mr-2 text-sm" htmlFor="dough2">Dough2 Donut</label>
              <input
                className="mr-2 text-donutPurple active:bg-donutPurple active:text-donutPurple focus:ring-donutPurple focus:bg-donutPurple focus:text-donutPurple"
                id="other"
                name="Dough"
                onChange={() => setFeatureDoughType('other')}
                type="radio"
              />
              <label className="text-sm" htmlFor="other">Other</label>
            </div>
          </div>
        ) : (
          <Tooltip content="Change feature donut dough type" placement="bottom">
            <button
              className="absolute top-20 left-0 ml-4 text-donutPurple"
              onClick={() => setFeatureDoughType('Please select a feature dough type above')}
              type="button"
            >
              <IconRefresh />
            </button>
          </Tooltip>
        )}
      </div>
    </>
  )
}

DoughTypeRadio.defaultProps = {
  withBackdrop: false,
}

export default DoughTypeRadio

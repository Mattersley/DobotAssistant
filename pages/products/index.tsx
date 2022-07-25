import { useContext } from 'react'
import Image from 'next/image'
import { BanIcon, CheckIcon } from '@heroicons/react/solid'
import { ProductContext } from '../../context/ProductContext/productContext'
import Tooltip from '../../components/Layout/Tooltip/Tooltip'

const Products = () => {
  const { products } = useContext(ProductContext)

  return (
    <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-3 ">
      {products !== undefined && Object.entries(products).sort().map((product) => {
        const {
          description, id, images, name, sku, status, total_sales: totalSales,
        } = product[1]
        return (
          <div key={id} className="relative text-center col-span-1 shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-auto m-3">
            <Tooltip content={status === 'draft' ? 'Not in use' : 'In Use'} placement="left">
              <button className={`${status === 'publish' ? 'bg-green-100' : 'bg-red-100'} cursor-default absolute top-6 right-6 border p-1 border-gray-200 rounded-full`} type="button">
                {status === 'publish' ? <CheckIcon className="w-6 h-6 text-green-700" /> : <BanIcon className="w-6 h-6 text-red-700" />}
              </button>
            </Tooltip>
            {images[0] ? <Image height={200} layout="intrinsic" src={images[0].src} width={200} /> : <div className="mt-52" />}
            <p className="font-bold text-lg text-donutPurple">{name.replace('</br>', ' ')}</p>
            <p className="tinyText font-bold">{sku}</p>
            <p className="mt-2 tinyText">{description.replace('<p>', '').replace('</p>', '').replace('<p><span style="color: #ff0000;"><strong>', '').replace('</strong></span></p>', '')}</p>
            <p className="mt-2 text-xs">{`Total Sales: ${totalSales}`}</p>
          </div>
        )
      })}
    </div>
  )
}
export default Products

import useProductImage from '../../../../../hooks/useProductImage'

interface DonutCardPropTypes {
    productDetails: {
        name: string,
        quantity: number,
    }
}

const DonutCard = ({ productDetails }: DonutCardPropTypes) => {
  const { productImage } = useProductImage(productDetails.name)

  return (
    <div
      key={productDetails.name}
      className="flex flex-row align-middle items-center justify-between p-4 m-4 rounded-xl bg-white shadow"
    >
      <p className="text-donutPurple text-xl font-extrabold mx-4">{productDetails.quantity}</p>
      <p className="text-sm">{productDetails.name.replace('</br>', ' ')}</p>
      <div className="w-16">{productImage}</div>
    </div>
  )
}

export default DonutCard

import DonutCard from './DonutCard/DonutCard'
import { ProductType } from '../Counts'

interface DonutTotalsPropTypes {
    products: ProductType[] | undefined
}

const DonutTotals = ({ products }: DonutTotalsPropTypes): JSX.Element => (
  <div className="h-auto py-8 sm:pt-8 sm:pb-20">
    <h2 className="font-bold text-donutPurple mx-5">Donut Counts:</h2>
    <div className="h-auto">
      {products !== undefined && products.map((product) => (
        <DonutCard key={product.name} productDetails={product} />
      ))}
    </div>
  </div>
)

export default DonutTotals

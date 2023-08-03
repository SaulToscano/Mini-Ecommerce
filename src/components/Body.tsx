import { useState, useEffect } from 'react'
import Header from "./Header"
import LeftBar from "./LeftBar"
import Product from "./Product"
import {ProductType} from '../interfaces/types'

export default function () {
  const [productData, setProductData] = useState<ProductType>([])

  useEffect(() => {
    async function allData() {
      const data:ProductType = await fetch('https://fakestoreapi.com/products').then(res => res.json())
      setProductData(data?.map(product => product))
    }

    allData();
  }, [])

  return(
    <div>
      <Header />
      <LeftBar />
      <Product products={productData} />
    </div>
  )
}
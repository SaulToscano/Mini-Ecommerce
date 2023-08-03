import { useState, useEffect } from 'react'
import Header from "./Header"
import LeftBar from "./LeftBar"
import Product from "./Product"
import {ProductType} from '../interfaces/types'

import { Route, Routes } from 'react-router-dom';

export default function () {
  const [productData, setProductData] = useState<ProductType>([])
  const [searchInput, setSearchInput] = useState('')
  const [filterProducts, setFilterProducts] = useState<ProductType>([])
  const [category, setCategory] = useState('All')
  const [filterByCategory, setFilterByCategory] = useState<ProductType>([])

  async function allData() {
    const data:ProductType = await fetch('https://fakestoreapi.com/products').then(res => res.json())
    setProductData(data?.map(product => product))
  }

  useEffect(() => {
    allData();
  }, [])

  useEffect(() => {
    if (searchInput) {
      const aux = productData.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()))
      setFilterProducts([...aux])
    }
  }, [searchInput])

  useEffect(() => {
    const aux = productData.filter(product => product.category === category)
    setFilterByCategory([...aux])
  }, [category])

  const handleSetSearchInput = (e: any) => {
    setSearchInput(e.target.value)
  }

  const handleSetCategory = (category: any) => {
    setCategory(category)
  }

  return(
    <div>
      <Header searchInput={searchInput} searchHandle={handleSetSearchInput}/>
      <LeftBar categoryHandle={handleSetCategory} />
      <Routes>
        <Route path='/Mini-Ecommerce' element={<Product products={searchInput ? filterProducts : category !== 'All' ? filterByCategory : productData} />}/>
      </Routes>
    </div>
  )
}
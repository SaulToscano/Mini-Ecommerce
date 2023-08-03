import { useState, useEffect } from 'react'
import { categorieType } from '../interfaces/types'
import { Button } from '@mantine/core';

export default function ({categoryHandle}: any) {
  const [categories, setCategories] = useState<categorieType>([])

  useEffect(() => {
    async function callData() {
      const data:categorieType = await fetch('https://fakestoreapi.com/products/categories').then(res => res.json())
      setCategories(data.map(categorie => categorie))
    }
    callData()
  }, [])

  return (
    <div id="LeftBar_Main_Div">
      <Button key={'All'} onClick={() => categoryHandle('All')} color="gray" compact style={{width: '150px'}}>All</Button>
      {categories.map(categorie => <Button key={categorie} onClick={() => categoryHandle(categorie)} color="gray" compact style={{width: '150px'}}>{categorie}</Button>)}
    </div>
  )
}
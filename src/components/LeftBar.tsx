import { useState, useEffect } from 'react'
import { categorieType } from '../interfaces/types'
import { Button } from '@mantine/core';

export default function () {
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
      {categories.map(categorie => <Button key={categorie} color="gray" compact style={{width: '150px'}}>{categorie}</Button>)}
    </div>
  )
}
import { ProductArrayInterface } from '../interfaces/interface'
import { Card, Image, Text, Badge, Button, Group, Rating } from '@mantine/core';
import { useDispatch } from "react-redux";
import { AddProduct } from "../redux/productsReducer"
import { reduxProductType } from '../interfaces/types';

export default function ({ products }: ProductArrayInterface) {
  const dispatch = useDispatch();

  const handleClick = (product: reduxProductType) => {
    dispatch(AddProduct({...product}))
  }
  
  return (
    <div id='Products_Main_Div'>
      {products?.map(product => {
        return (
          <Card key={product?.title} shadow="sm" padding="lg" radius="md" withBorder style={{width: '20rem'}}>
            <Card.Section>
              <Image
                src={product?.image}
                height={200}
                alt="Norway"
              />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Rating readOnly={true} defaultValue={product?.rating?.rate} fractions={2}/>
              <Badge variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>{product?.category}</Badge>
              <Text style={{height: '3rem', overflow: 'hidden'}} weight={500}>{product?.title}</Text>
            </Group>

            <Text style={{height: '10rem', overflow: 'auto'}} size="sm" color="dimmed">
              {product?.description}
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => handleClick(product)}>
              Add product to cart
            </Button>
          </Card>
        )
      })}
    </div>
  )
}
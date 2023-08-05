import { Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { RemoveProduct } from "../redux/productsReducer"
import { IconShoppingCart, IconTrash } from '@tabler/icons-react';
import { reduxProduct, reduxProductType } from '../interfaces/types';
import Paypal from "./Paypal";

export default function () {
  const dispatch = useDispatch();
  const productsCart: reduxProduct[] = useSelector((state: any) => state.products.cartProducts)
  const [opened, { open, close }] = useDisclosure(false);

  const handleRemoveProduct = (product: reduxProductType) => {
    dispatch(RemoveProduct({ ...product }))
  }

  return (
    <>
      <Drawer opened={opened} onClose={close}>
        <div id='Cart_Card_Wrapper'>
          {productsCart.map((product) => {

            return (
              <div id='Product_Cart_Card' key={`cart-${product.product.title}`}>
                <img src={product.product.image} alt="" />
                <div className='Cart_Card_Details'>
                  <span>{product.product.title}</span>
                  <span>Price: {product.product.price} Qty: {product.qty}</span>
                </div>
                <Button onClick={() => handleRemoveProduct(product.product)}><IconTrash /></Button>
              </div>
            )
          })}
        </div>
        {
          productsCart.length > 0 ? <div id='Cart_Payment_Main_Div'>
            <span>Note: Not a real paypal purchase, its sandbox mode of paypal</span>
            <Paypal cartProducts={productsCart} />
          </div> : ''
        }
      </Drawer>

      <Button onClick={open} color="violet" size="xs" ><IconShoppingCart /></Button>
    </>
  );
}
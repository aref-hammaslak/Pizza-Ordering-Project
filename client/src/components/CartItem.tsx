import React from 'react'
import { CartItemType } from '../pages/Cart'
import AdjustOrderQuantity from './AdjustOrderQuantity'
type CartItemProps = {
  itemDetails: CartItemType
}
const CartItem = (props:CartItemProps) => {
  const {itemDetails } = props;
  return (
    <div  className='flex gap-4 border-b py-4'>
      <div className='   '>
        <img className='rounded-full w-24 h-24  object-cover '  src={itemDetails.img} alt="pizza imgeg" />
      </div>
      <div className='flex justify-between py-2 flex-1'>
        <div className='flex pt-2 flex-col justify-between'>
          <h3 className='font-bold'>
            {itemDetails.name}
          </h3>
          <span className='text-sm'>
            {itemDetails.size}
          </span>
        </div>
        <div className='flex flex-col justify-between items-center '>
          <div className='shadow-sm'>
            <AdjustOrderQuantity orderId={itemDetails.id} />
          </div>
          
          <span>
            ${itemDetails.Price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
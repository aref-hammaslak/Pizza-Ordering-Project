import React from 'react'
import { CartItemType } from '../pages/Cart'
import AdjustOrderQuantity from './AdjustOrderQuantity'
import BlureImage from './BlureImage'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
type CartItemProps = {
  itemDetails: CartItemType,
  refetchOrders:(options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
}
const CartItem = (props:CartItemProps) => {
  const {itemDetails , refetchOrders } = props;
  return (
    <div  className='flex last:border-none gap-4 border-b py-4'>
      <div className='w-24 h-24 overflow-hidden  rounded-full '>
        <BlureImage blureHash={itemDetails.blurHash} image={itemDetails.image} imageAlt={itemDetails.name} />
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
            <AdjustOrderQuantity itemDetails={itemDetails} refetchOrders={refetchOrders} orderId={itemDetails.id} quntity={itemDetails.quantity} />
          </div>
          
          <span>
            ${(+itemDetails.price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
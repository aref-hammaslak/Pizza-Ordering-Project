import React, { useContext } from "react";
import ModalBackground from "../components/ModalBackground";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { ovrallStatContext, OverallState } from './Route';
type CartPropsType = {
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCartOpen: boolean;
};

export type CartItemType ={
  id: number,
  name: string,
  img: string,
  quantity: number,
  Price: number,
  size: 'small'| 'medium'| 'large'

}

const Cart = () => {
  const {overallState, setOverallState} = useContext(ovrallStatContext);

  const cartItems : CartItemType[] = [{
    id: 1,
    name: '<<Name>>',
    img: 'https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg',
    quantity: 1,
    size: 'medium',
    Price: 0,

  },]
  const total: number = 120;
  return (
    <>
      <div className=" ">
        <div
          className={`${overallState.isCartOpen ? "" : "hidden"}`}
          onClick={(e) => {
            setOverallState({
              ...overallState,
              isCartOpen: false,
            });
          }}
        >
          <ModalBackground>
            <div></div>
          </ModalBackground>
        </div>

        <div
          className={`w-[400px] transition-transform z-20 duration-500 fixed top-0 bottom-0 right-0 bg-white 
        ${overallState.isCartOpen ? "" : "translate-x-full"}`}
        >
          <div className=" text-4xl bg-primary-dark  right-0 w-[400px] origin-left ">
            <FontAwesomeIcon
            onClick={() => setOverallState({
              ...overallState,
               isCartOpen: false
            })}
            className="hover:animate-spin p-5 text-white" icon={faXmark} />
          </div>
          <div className="flex flex-col px-4 ">

            {
              cartItems.map( (item) => {
                return (
                  <CartItem itemDetails={item}/>
                )})
            }
            
          </div>
          <div className="fixed bottom-0  border-t flex items-center justify-between  w-[400px] ">
            <div className="flex flex-col p-4">
                <h3 className="font-bold text-xl">
                Total: 
              </h3>
              <span className="font-semibold ">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button isLinked={false} styles="mr-4 !bg-primary-dark hover:text-white md:!px-8 text-white" name="Check out  "/>
            
          </div>

        </div>
      </div>
    </>
  );
};

export default Cart;

import React, { useContext , useEffect } from "react";
import ModalBackground from "../components/ModalBackground";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { ovrallStatContext, OverallState } from "../App";
import {
  useOrderWithId,
  useOrders,
  usePizzaWithId,
  useSizeWithId,
} from "../hooks/useRequests";
import { useQuery } from "@tanstack/react-query";
import {useRef} from 'react';
import { useNavigate } from "react-router-dom";

type CartPropsType = {
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCartOpen: boolean;
};

export type CartItemType = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size: string;
  blurHash: string;
 
};

const Cart = () => {
  const { overallState, setOverallState } = useContext(ovrallStatContext);

  let cartItems: CartItemType[] = [];
  const navigate = useNavigate();

  const cartItemsContainerRef = useRef<HTMLDivElement>(null);
  
  const [vhSize, setVhSize] = useState<number>(document.body.scrollHeight);
  useEffect(() => {
    
      setVhSize(document.body.scrollHeight);
      
      
    
  },[overallState]);

  const ordersQueryFunc = async () => {
    let orders;
    try {
      orders = await useOrders();

      orders = orders.map(async (order: any) => {
        const pizza = await usePizzaWithId(+order.type);
        const size = await useSizeWithId(+order.size);

        return {
          id: order.id,
          name: pizza.name,
          image: pizza.image,
          quantity: order.quantity,
          price: order.price,
          size: size.name,
          blurHash: pizza.blur_hash,
          date: new Date(order.date_added),
        };
      });
    } catch (error: any) {
      console.log(error);
      // if ( error.response.status === 403) {
      //   localStorage.removeItem("userInfo");
      //   navigate("/login");
      // }
    }

    for (let i = 0; i < orders.length; i++) {
      orders[i] = await orders[i];
    }
    return orders;
  };

  const { data, isLoading, isSuccess, error, refetch } = useQuery({
    queryKey: ["cartItems"],
    queryFn: ordersQueryFunc,
  });

  if (data?.length > 0) {
    cartItems = data;
  }

  if (error) {
    console.log(error);
  }

  const total: number = cartItems.reduce((total, item) => total + +item.price, 0);

  useEffect(() => {
    cartItemsContainerRef.current?.scroll(0,1000);
    refetch();
  },[overallState]);


  return (
    <>
      
        <div
          style={{ height: `${vhSize}px`}}
          className={`${
            overallState.isCartOpen ? "" : "hidden"
          }   fixed   bottom-0 inset-x-0 top-0 z-20 `}
          onClick={(e) => {
            setOverallState({
              ...overallState,
              isCartOpen: false,
            });
            
          }}
        >


        </div>

        <div
          className={`w-[400px] transition-transform  z-40 duration-500 fixed top-0 bottom-0 right-0 bg-white 
        ${overallState.isCartOpen ? "" : "translate-x-full"}`}
        >
          <div className=" text-4xl bg-primary-dark  right-0 w-[400px] origin-left ">
            <FontAwesomeIcon
              onClick={() =>{
                 setOverallState({
                  ...overallState,
                  isCartOpen: false,
                })
                document.body.classList.remove('overflow-hidden');
              }}
              className="hover:animate-spin p-[22px] text-white"
              icon={faXmark}
            />
          </div>
          <div ref={cartItemsContainerRef} className="flex   flex-col px-4 overflow-auto h-[550px] ">
            {isLoading && <div>Loading...</div>}
            {isSuccess &&
              cartItems.map((item: CartItemType, index) => {
                return <CartItem refetchOrders={refetch} itemDetails={item} />;
              })}
          </div>
          <div className=" bottom-0 fixed  bg-white  border-t flex items-center justify-between  w-[400px] ">
            <div className="flex flex-col p-4">
              <h3 className="font-bold text-xl">Total:</h3>
              <span className="font-semibold ">${total.toFixed(2)}</span>
            </div>
            <Button
              isLinked={false}
              styles="mr-4 !bg-primary-dark hover:text-white md:!px-8 text-white"
              name="Check out  "
            />
          </div>
        </div>
      
    </>
  );
};

export default Cart;

import React, { useContext } from "react";
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
};

const Cart = () => {
  const { overallState, setOverallState } = useContext(ovrallStatContext);

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const ordersQueryFunc = async () => {
    const orders = await useOrders();
    orders.map(async (order: any) => {
      const pizza = await usePizzaWithId(order.type);
      const size = await useSizeWithId(order.size);
      return {
        id: order.id,
        name: pizza.name,
        image: pizza.image,
        quantity: order.quantity,
        price: order.price,
        size: size.name,
        date: new Date(order.date_added),
      };
    });
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["cartItems"],
    queryFn: ordersQueryFunc,
  });
  if (data) {
    setCartItems(data);
  }

  const total: number = 120;
  console.log(overallState);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <div className=" ">
          <div
            className={`${
              overallState.isCartOpen ? "" : "hidden"
            } absolute inset-x-0 top-0 bottom-0`}
            onClick={(e) => {
              setOverallState({
                ...overallState,
                isCartOpen: false,
              });
              console.log(overallState);
            }}
          ></div>

          <div
            className={`w-[400px] transition-transform z-20 duration-500 fixed top-0 bottom-0 right-0 bg-white 
        ${overallState.isCartOpen ? "" : "translate-x-full"}`}
          >
            <div className=" text-4xl bg-primary-dark  right-0 w-[400px] origin-left ">
              <FontAwesomeIcon
                onClick={() =>
                  setOverallState({
                    ...overallState,
                    isCartOpen: false,
                  })
                }
                className="hover:animate-spin p-[22px] text-white"
                icon={faXmark}
              />
            </div>
            <div className="flex flex-col px-4 ">
              {cartItems.map((item: CartItemType) => {
                return <CartItem itemDetails={item} />;
              })}
            </div>
            <div className="fixed bottom-0  border-t flex items-center justify-between  w-[400px] ">
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
        </div>
      )}
    </>
  );
};

export default Cart;

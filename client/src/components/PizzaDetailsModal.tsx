import React, { useContext, useEffect } from "react";
import Button from "./Button";
import { useState } from "react";
import ModalBackground from "./ModalBackground";
import { useNavigate } from "react-router-dom";
import AdjustOrderQuantity from "./AdjustOrderQuantity";
import { API_URL, useOrderExtras, usePizzas, usePostOrder } from "../hooks/useRequests";
import SelectionDorpDown from "./SelectionDorpDown";
import ExtraToppingsSelector from './ExtraToppingsSelector';
import { QueryKey, useQuery } from '@tanstack/react-query';
import axios from "axios";
import { ovrallStatContext, OverallState } from '../pages/Route';

type pizzaDetailsModalType = {
  pizzaId: number;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

export type OrderedPizza = {
  notes: string;
  crust: number;
  extra_topping: number[];
  type: number;
  size: number;
  quantity: number;
  owner: number;
};

type Size = {
  id: number;
  name: string;
  ratio: number;
};

export type Toppings = {
  id: number;
  name: string;
  cost: number;
  notes: string;
};

type Crust = {
  id: number;
  name: string;
  cost: number;
  notes: string;
};

const PizzaDetailsModal = (props: pizzaDetailsModalType) => {

   const navigate = useNavigate();
   

  //get selected pizza based on the ID 
  const pizza = usePizzas().Pizzas.data.filter(
    (pizza: { id: number }) => +pizza.id == props.pizzaId
  )[0];

 const { isSuccess: isSucPizzas, isLoading: isLodPizzas } = usePizzas().Pizzas;

  const [orderExtras, setOrderExtras] = useState<{
    toppings: Toppings[];
    crusts: Crust[];
    sizes: Size[];
  }>();

  



  const orderExtrasQuery = useOrderExtras();
  const { isSuccess: isSucOrdExt } = orderExtrasQuery;

  
  const {setOverallState, overallState} = useContext(ovrallStatContext);
 

  const [orderedPizza, setOrderedPizza] = useState<OrderedPizza>({
    notes: "",
    size: 1,
    quantity: 1,
    crust: 1,
    extra_topping: [1],
    type: props.pizzaId,
    owner: 0,
  });


  

  useEffect(() => {
    const getOrderExtras = async () => {
      const response = orderExtrasQuery.data;
      if (!response) return;
      const sizes = await response.sizes();
      const toppings = await response.toppings();
      const crusts = await response.crusts();
      setOrderExtras({
        sizes: sizes as Size[],
        toppings: toppings as Toppings[],
        crusts: crusts as Crust[],
      });
    };

    getOrderExtras();

  }, [isSucOrdExt]);

  const postOrder = async (order:OrderedPizza) => {
    order.owner = JSON.parse(localStorage.getItem('userInfo') as string).user.id;
    const response = await axios.post<OrderedPizza>(`${API_URL}/orders`, order);
    console.log(order);
    return response.data;
  }

  const onSubmitHandler = async (e:any) => {

    e.preventDefault();

    if(!localStorage.getItem('userInfo')) return navigate('/login');

    
    const response = await  postOrder(orderedPizza);
    if (response) {
      props.setModalState(false);
      setTimeout(() => {
        setOverallState({
        ...overallState,
        isCartOpen: true,
      })
      }, 300);
      
    }
    
  }

  return (
    <ModalBackground setModalState={props.setModalState}>
      {isLodPizzas && <div>loding...</div>}

      {isSucPizzas && (
        <div className=" absolute top-12 left-1/2 !-translate-x-1/2  ">
          <div
          onClick={(e) => e.stopPropagation()}
          className="bg-primary-mellow  max-w-[500px]  p-8 shadow-md rounded md:max-h-[600px] origin-center transition-transform   scrollbarmax-h-[400px] fade-forward overflow-auto"
        >
          <form action="" onSubmit={onSubmitHandler}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col  items-center gap-2">
                <img
                  src={pizza.image}
                  alt=""
                  className="max-w-[400px] object-cover rounded "
                />
                <div className="flex  flex-col gap-2">
                  <h1 className="text-2xl text-center font-bold">
                    {pizza.name}
                  </h1>
                  <h1 className="text-xl text-center font-bold">
                    Price: ${pizza.cost}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Description:</h1>
                <p className="text-sm">{pizza.notes}</p>
              </div>

              <div className="flex justify-between ">
                <div className="flex items-center">
                  <label className=" font-bold items-center mr-2">Size:</label>
                  <select
                    className="p-2  outline-none rounded text-sm"
                    onChange={(e) => {
                      setOrderedPizza({
                        ...orderedPizza,
                        size: +e.target.value,
                      });
                    }}
                  >
                    {orderExtras?.sizes.map((size) => (
                      <option
                        className="active:bg-primary-dark  rounded-none"
                        key={size.name}
                        value={size.id}
                      >
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <AdjustOrderQuantity orderdPizza={orderedPizza} setOrderdPizz={setOrderedPizza}  />
                </div>
              </div>
              
              <div className="flex justify-between ">
                <div className="flex items-center">
                  <label className=" font-bold items-center mr-2">Crust:</label>
                  <select
                    className="p-2  outline-none rounded text-sm"
                    onChange={(e) => {
                      setOrderedPizza({
                        ...orderedPizza,
                        crust: +e.target.value,
                      });
                    }}
                  >
                    {orderExtras?.crusts.map((crust) => (
                      <option
                        className="active:bg-primary-dark  rounded-none"
                        key={crust.name}
                        value={crust.id}
                      >
                        {crust.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                      <ExtraToppingsSelector toppings={orderExtras?.toppings} orderedPizza={orderedPizza} setToppings={setOrderedPizza}  name="Toppings" />
                </div>
              </div>
            

              <div>
                <textarea
                  value={orderedPizza?.notes}
                  className="resize-none p-2 rounded focus:outline-primary-dark overflow-y-auto"
                  onChange={(e) =>
                    setOrderedPizza({ ...orderedPizza, notes: e.target.value })
                  }
                  placeholder="Type something..."
                  rows={3} // Specify the number of visible text lines
                  cols={50} // Specify the number of visible text columns
                />
              </div>

              <button type="submit">
                <Button
                  styles="hover:text-primary-dark  hover:-translate-y-2 transition-all duration-200  lg:text-lg text-white focus:-translate-y-1  bg-primary-dark"
                  name="Add to Cart"
                  isLinked={false}
                />
              </button>
            </div>
          </form>
        </div>
        </div>
        
      )}
    </ModalBackground>
  );
};

export { PizzaDetailsModal };

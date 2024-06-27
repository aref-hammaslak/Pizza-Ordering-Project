import React, { useContext, useEffect } from "react";
import Button from "./Button";
import { useState } from "react";
import ModalBackground from "./ModalBackground";
import { useNavigate } from "react-router-dom";
import AdjustOrderQuantity from "./AdjustOrderQuantity";
import {
  API_URL,
  useOrderExtras,
  usePizzas,
} from "../hooks/useRequests";
import ExtraToppingsSelector from "./ExtraToppingsSelector";
import axios from "axios";
import { ovrallStatContext, OverallState } from "../App";
import BlureImage from "./BlureImage";
import { PizzaPreviwType } from "../pages/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
  const pizza: PizzaPreviwType = usePizzas().Pizzas.data.filter(
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

  const { setOverallState, overallState } = useContext(ovrallStatContext);

  const [orderedPizza, setOrderedPizza] = useState<OrderedPizza>({
    notes: "",
    size: 1,
    quantity: 1,
    crust: 1,
    extra_topping: [1],
    type: props.pizzaId,
    owner: 0,
  });

  const [price, setPrice] = useState(pizza.cost);

  useEffect(() => {
    const calculetePrice = () => {
      const typeCost = +pizza.cost;
      const crust = orderExtras?.crusts.filter(
        (c) => c.id === orderedPizza.crust
      )[0];
      const crustPrice = (crust && +crust.cost) || 0;
      const size = orderExtras?.sizes.filter(
        (s) => s.id === orderedPizza.size
      )[0];
      const sizeRetio = (size && +size.ratio) || 1;
      const toppings = orderExtras?.toppings.filter((t) =>
        orderedPizza.extra_topping.includes(t.id)
      );
      const toppinsCost =
        (toppings &&
          +toppings.reduce((accu, topping) => {
            return accu + +topping.cost;
          }, 0)) ||
        0;

      const totalPrice =
        (typeCost + crustPrice + toppinsCost) *
        sizeRetio *
        orderedPizza.quantity;
      setPrice(totalPrice);
    };

    calculetePrice();
  }, [orderedPizza]);

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

  const postOrder = async (order: OrderedPizza) => {
    try {
      order.owner = JSON.parse(
        localStorage.getItem("userInfo") as string
      ).user.id;
      const response = await axios.post<OrderedPizza>(
        `${API_URL}/orders`,
        order
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 403) {
        localStorage.removeItem("userInfo");
        document.body.classList.remove("overflow-hidden");
        navigate("/login");
      }
    }
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!localStorage.getItem("userInfo")) {
      document.body.classList.remove("overflow-hidden");
      return navigate("/login");
    }

    const response = await postOrder(orderedPizza);
    if (response) {
      props.setModalState(false);
      setTimeout(() => {
        setOverallState({
          ...overallState,
          isCartOpen: true,
        });
      }, 300);
    }
  };

  return (
    <ModalBackground setModalState={props.setModalState}>
      {isLodPizzas && <div>loding...</div>}

      {isSucPizzas && (
        <div className=" absolute top-12 left-1/2 !-translate-x-1/2 overflow-auto">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primary-mellow  w-[100vw]  p-8 shadow-md rounded md:h-[90vh] origin-center transition-transform   scrollbarmax-h-[400px] fade-forward md:overflow-auto overflow-auto h-[100vh] pb-16 md:w-[500px]"
          >
            <div onClick={() => {
              props.setModalState(false);
              document.body.classList.remove('overflow-hidden');
            }} className="flex justify-end mb-3">
              <FontAwesomeIcon className="w-8 h-8 " icon={faXmark} />
            </div>

            <form action="" onSubmit={onSubmitHandler}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="md:h-[300px] h-[200px]   rounded overflow-hidden w-full relative ">
                    <BlureImage
                      blureHash={pizza.blur_hash}
                      image={pizza.image}
                      imageAlt={pizza.name}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-center">
                      {pizza.name}
                    </h1>
                    <h1 className="text-xl font-bold text-center">
                      Price: ${(+price).toFixed(2)}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">Description:</h1>
                  <p className="text-sm">{pizza.notes}</p>
                </div>

                <div className="flex justify-between ">
                  <div className="flex items-center">
                    <label className="items-center mr-2 font-bold ">
                      Size:
                    </label>
                    <select
                      className="p-2 text-sm rounded outline-none"
                      onChange={(e) => {
                        setOrderedPizza({
                          ...orderedPizza,
                          size: +e.target.value,
                        });
                      }}
                    >
                      {orderExtras?.sizes.map((size) => (
                        <option
                          className="rounded-none active:bg-primary-dark"
                          key={size.name}
                          value={size.id}
                        >
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <AdjustOrderQuantity
                      orderdPizza={orderedPizza}
                      setOrderdPizz={setOrderedPizza}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between md:flex-row ">
                  <div className="flex items-center">
                    <label className="items-center mr-2 font-bold ">
                      Crust:
                    </label>
                    <select
                      className="p-2 text-sm rounded outline-none"
                      onChange={(e) => {
                        setOrderedPizza({
                          ...orderedPizza,
                          crust: +e.target.value,
                        });
                      }}
                    >
                      {orderExtras?.crusts.map((crust) => (
                        <option
                          className="rounded-none active:bg-primary-dark"
                          key={crust.name}
                          value={crust.id}
                        >
                          <span className="text-nowrap">{crust.name}</span>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <ExtraToppingsSelector
                      toppings={orderExtras?.toppings}
                      orderedPizza={orderedPizza}
                      setToppings={setOrderedPizza}
                      name="Toppings"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    value={orderedPizza?.notes}
                    className="resize-none p-2 rounded focus:outline-primary-dark overflow-y-auto w-[100%]"
                    onChange={(e) =>
                      setOrderedPizza({
                        ...orderedPizza,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Type something..."
                    rows={3} // Specify the number of visible text lines
                     // Specify the number of visible text columns
                  />
                </div>

                <button
                  onClick={() =>
                    document.body.classList.remove("overflow-hidden")
                  }
                  type="submit"
                >
                  <Button
                    styles=" hover:text-black  hover:-translate-y-2 transition-all duration-200  lg:text-lg text-black focus:-translate-y-1  bg-primary-dark"
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

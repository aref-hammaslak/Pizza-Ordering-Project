import React, { useEffect } from "react";
import Button from "./Button";
import {useState} from 'react';
import ModalBackground from './ModalBackground';
type pizzaDetailsModalType = {
  pizzaId: number;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};
const PizzaDetailsModal = (props: pizzaDetailsModalType) => {
  const pizza = {
    id: props.pizzaId,
    name: "<NAME>",
    price: 100,
    image:
      "https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg",
    description: "This is the description of the pizza",
  };

  type OrderedPizza = {
    id: number,
    note: string,
    size: string,
    price: number,

  }


  
  const [orderedPizza , setOrderedPizza] = useState<OrderedPizza>({
    id: 0,
    note: "",
    size: "",
    price: 0,
  });
  
  return (
    <ModalBackground setModalState={props.setModalState}>
            <div
        onClick={(e) => e.stopPropagation()}
        className="bg-primary-mellow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 shadow-md rounded md:max-h-[600px] scr max-h-[400px] overflow-auto"
      >
        <form action="">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col  items-center gap-2">
              <img
                src={pizza.image}
                alt=""
                className="max-w-[400px] object-cover "
              />
              <div className="flex  flex-col gap-2">
                <h1 className="text-2xl text-center font-bold">{pizza.name}</h1>
                <h1 className="text-xl text-center font-bold">Price: ${pizza.price.toFixed(2)}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">Description:</h1>
              <p className="text-sm">{pizza.description}</p>
            </div>

            <div className="felx gap-4 ">
              
                <label className=" font-bold items-center mr-2">
                  Size:
                </label>
                <select
                  className="p-2  outline-none rounded text-sm"
                  onChange={(e) => {
                    setOrderedPizza({...orderedPizza, size: e.target.value});
                  }}
                >
                  {
                    ["Small", "Medium", "Large"].map((size) => (
                      <option  className="active:bg-primary-dark  rounded-none" key={size} value={size}>
                        {size}
                      </option>
                    ))
                  }
              
                </select>
             
            </div>
            <div>
              <textarea
                value={orderedPizza?.note}
                className="resize-none p-2 rounded focus:outline-primary-dark overflow-y-auto"
                onChange={(e) =>  setOrderedPizza({...orderedPizza , note: e.target.value})}
                placeholder="Type something..."
                rows={4} // Specify the number of visible text lines
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
    </ModalBackground>
    

    
  );
};

export { PizzaDetailsModal };

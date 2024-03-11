import React, { createContext, useState } from "react";

import FilltringBar from "../components/FilltringBar";
import PizzaPreview from "../components/PizzaPreview";

type FilteringOptionsType = {
  selectedCatagories: string[];
  selectedToppings: string[];
  serchedTerm: string;
  isAscending: boolean;
};
type FilteringContextType = {
  filteringOptions: FilteringOptionsType;
  setFilteringOptions: React.Dispatch<
    React.SetStateAction<FilteringOptionsType>
  >;
};

export type PizzaPreviwType = {
  id: number;
  name: string;
  price: number;
  image: string;
}



  export const FilteringContext = createContext<FilteringContextType>(null as never);


  const Menu = () => {
  const [filteringOptions, setFilteringOptions] =
    useState<FilteringOptionsType>({
      selectedCatagories: [],
      selectedToppings: [],
      serchedTerm: "",
      isAscending: true,
    });
  const pizzas: PizzaPreviwType[] = [{
    id: 1,
    name: "pizza paste",
    price: 100,
    image: "https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg",
  },
  {
    id: 1,
    name: "pizza paste",
    price: 100,
    image: "https://img.freepik.com/premium-photo/delicious-huge-pizza-cut-half-ai-generation_199743-18251.jpg?size=626&ext=jpg",
  },
  {
    id: 1,
    name: "pizza paste",
    price: 100,
    image: "https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg",
  }
]

  return (
    <div>
      <FilteringContext.Provider
        value={
          { filteringOptions, setFilteringOptions } 
        }
      >
        <FilltringBar
          catagories={["Vegetarian", "Meat Lovers", "Specialty"]}
          toppings={["Mushrooms", "Pepperoni", "Olives"]}
        />
      </FilteringContext.Provider>

      <div className="grid justify-center lg:grid-cols-3 md:grid-cols-2   gap-20 max-w-[1100px] p-4 m-auto mt-20 lg:px-12 md:px-8 px-0 sm:px-4 ">
        {
          pizzas.map((pizza: PizzaPreviwType) => {
            return (
              <PizzaPreview pizza = {pizza}/>
            )
          })
        }
      </div>
    </div>
   
  );
};

export default Menu;

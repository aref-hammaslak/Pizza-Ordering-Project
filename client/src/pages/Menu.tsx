import React, { createContext, useState } from "react";

import FilltringBar from "../components/FilltringBar";
import PizzaPreview from "../components/PizzaPreview";
import { PizzaDetailsModal } from "../components/PizzaDetailsModal";
import { usePizzas } from "../hooks/useRequests";

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
  cost: number;
  notes: string;
  image: string;
};

export const FilteringContext = createContext<FilteringContextType>(
  null as never
);

const Menu = () => {
  const [filteringOptions, setFilteringOptions] =
    useState<FilteringOptionsType>({
      selectedCatagories: [],
      selectedToppings: [],
      serchedTerm: "",
      isAscending: true,
    });

  const [clickedPizzaId, setClickedPizzaId] = useState<number>(0);
  const [IsModalOpen, setIsModalOpen] = useState<boolean>(true);
  const pizzas: PizzaPreviwType[] = usePizzas().Pizzas.data;
  console.log(pizzas);
  const { isLoading, isSuccess } = usePizzas().Pizzas;

  return (
    <div className="">
      <FilteringContext.Provider
        value={{ filteringOptions, setFilteringOptions }}
      >
        <FilltringBar
          catagories={["Vegetarian", "Meat Lovers", "Specialty"]}
          toppings={["Mushrooms", "Pepperoni", "Olives"]}
        />
      </FilteringContext.Provider>

      {isSuccess && (
        <div className="grid justify-center lg:grid-cols-3 md:grid-cols-2   gap-20 max-w-[1100px] p-4 m-auto mt-20 lg:px-12 md:px-8 px-0 sm:px-4 ">
          {pizzas.map((pizza: PizzaPreviwType) => {
            return (
              <PizzaPreview
                setModalState={setIsModalOpen}
                setPizzaId={setClickedPizzaId}
                pizza={pizza}
              />
            );
          })}
        </div>
      )}
      {isLoading && <div>Loading...</div>}

      {IsModalOpen && clickedPizzaId !== 0 && (
        <PizzaDetailsModal
          pizzaId={clickedPizzaId}
          setModalState={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Menu;

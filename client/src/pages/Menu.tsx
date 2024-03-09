import React, { createContext, useState } from "react";

import FilltringBar from "../components/FilltringBar";

type FilteringOptionsType = {
  selectedCatagories: string[];
  selectedToppings: string[];
  serchedValue: string;
  filteringOrder: string;
};
type FilteringContextType = {
  filteringOptions: FilteringOptionsType;
  setFilteringOptions: React.Dispatch<
    React.SetStateAction<FilteringOptionsType>
  >;
};

const Menu = () => {
  const FilteringContext = createContext<FilteringContextType>(null as never);

  const [filteringOptions, setFilteringOptions] =
    useState<FilteringOptionsType>({
      selectedCatagories: [],
      selectedToppings: [],
      serchedValue: "",
      filteringOrder: "ascending",
    });

  return (
    <div>
      <FilteringContext.Provider
        value={
          { filteringOptions, setFilteringOptions } as FilteringContextType
        }
      >
        <FilltringBar
          catagories={["Vegetarian", "Meat Lovers", "Specialty"]}
          toppings={["Mushrooms", "Pepperoni", "Olives"]}
        />
      </FilteringContext.Provider>
    </div>
  );
};

export default Menu;

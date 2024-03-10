import React, { createContext, useState } from "react";

import FilltringBar from "../components/FilltringBar";

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

  export const FilteringContext = createContext<FilteringContextType>(null as never);


  const Menu = () => {
  const [filteringOptions, setFilteringOptions] =
    useState<FilteringOptionsType>({
      selectedCatagories: [],
      selectedToppings: [],
      serchedTerm: "",
      isAscending: true,
    });
    console.log(filteringOptions);

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

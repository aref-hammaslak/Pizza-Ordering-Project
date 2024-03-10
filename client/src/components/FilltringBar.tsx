import React, { useContext } from "react";
import SelectionDorpDown from "./SelectionDorpDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faArrowDownShortWide,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FilteringContext } from "../pages/Menu";

type filteringProps = {
  catagories: string[];
  toppings: string[];
};

const FilltringBar = (props: filteringProps) => {
  const categories = props.catagories;
  const toppings = props.toppings;
  const [isAscending, setIsAscending] = useState(true);
  const {filteringOptions, setFilteringOptions} = useContext(FilteringContext);
  return (
    <div className="bg-primary-mellow">
      <div className="max-w-[1200px] m-auto bg-primary-mellow flex justify-between   ">
        <div className="flex gap-2 ">
          <div
            className="flex items-center "
            onClick={() => {
              setIsAscending((n) => !n);
              setFilteringOptions({
                ...filteringOptions,
                 isAscending:!filteringOptions.isAscending
              })
            }}
          >
            {isAscending && (
              <FontAwesomeIcon
                className="text-xl text-gray-700 p-4"
                icon={faArrowUpWideShort}
              />
            )}
            {!isAscending && (
              <FontAwesomeIcon
                className="text-xl text-gray-700 p-4"
                icon={faArrowDownShortWide}
              />
            )}
          </div>

          <SelectionDorpDown name={"Categories"} items={categories} />
          <SelectionDorpDown name={"Toppings"} items={toppings} />
        </div>
        <div className="p-4 text-gray-700 relative  ">
          <div className="absolute translate-x-2
          translate-y-2">
            <FontAwesomeIcon icon={faSearch}/>
          </div>
          <input
            className="pl-8 p-2 rounded-full font-roboto w-[280px]"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setFilteringOptions({
             ...filteringOptions,
                serchedTerm: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilltringBar;

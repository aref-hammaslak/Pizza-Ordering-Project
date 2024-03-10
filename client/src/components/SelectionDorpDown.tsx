import React, { useContext, useState } from "react";
import { FilteringContext } from "../pages/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleDown } from "@fortawesome/free-solid-svg-icons";

const SelectionDorpDown = (props: { name: string; items: string[] }) => {
  const { name, items } = props;
  const { filteringOptions, setFilteringOptions } =
    useContext(FilteringContext);

  const [isHovered, setIsHovered] = useState(false);
  const optionType =
    name === "Catagories" ? "selectedCatagories" : "selectedToppings";

  const onChangeHandler = (e: any) => {
    const optType = filteringOptions[optionType];
    if (optType.includes(e.target.value)) {
      setFilteringOptions({
        ...filteringOptions,
        [optionType]: optType.filter((item) => item !== e.target.value),
      });
    } else {
      setFilteringOptions({
        ...filteringOptions,
        [optionType]: [...optType, e.target.value],
      });
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-4 flex items-center"

    >
    <label className="text-gray-700 flex items-center gap-1">
        {name}
        <div className="translate-y-[2px]">
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        
      </label>
      <ul 
        className={`flex flex-col absolute rounded bg-primary-mellow rounded-t-none  top-full left-0 w-auto ${
          isHovered? "block" : "hidden"
        }`}
        onChange={() => {}}>
        {items.map((item) => (
          <li className="flex hover:bg-primary-light gap-2 items-center px-2 py-2 " key={item}>
            <span>{item}</span>
            
            <input
              type="checkbox"
              value={item}
              checked={filteringOptions[optionType].includes(item)}
              onChange={onChangeHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectionDorpDown;

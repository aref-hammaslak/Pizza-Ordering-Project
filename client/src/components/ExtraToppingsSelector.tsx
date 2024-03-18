import React, { useContext, useState } from "react";
import { FilteringContext } from "../pages/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Toppings, OrderedPizza } from "./PizzaDetailsModal";

type PropsType = {
  name: string;
  orderedPizza: OrderedPizza;
  setToppings: React.Dispatch<React.SetStateAction<OrderedPizza>>;
  toppings: Toppings[] | undefined;
};

const ExtraToppingsSelector = (props: PropsType) => {
  const { name, orderedPizza, setToppings, toppings } = props;

  const [isHovered, setIsHovered] = useState(false);

  const onChangeHandler = (e: any) => {
    console.log(e.target.value);

    if (orderedPizza.extra_topping.includes(+e.target.value)) {
      setToppings({
        ...orderedPizza,
        extra_topping: orderedPizza.extra_topping.filter(
          (item) => item !== +e.target.value
        ),
      });
    } else {
      console.log(orderedPizza.extra_topping);
      setToppings({
        ...orderedPizza,
        extra_topping: [...orderedPizza.extra_topping, +e.target.value],
      });
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-4 flex items-center"
    >
      <label className="font-bold flex items-center gap-4 pl-2">
        {name}
        <div className="translate-y-[2px]">
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </label>
      <ul
        className={`flex flex-col h-[150px] overflow-y-scroll shadow shadow-mellow absolute rounded z-20 bg-primary-mellow    top-full left-0 w-auto ${
          isHovered ? "block" : "hidden"
        }`}
        onChange={() => {}}
      >
        {toppings?.map((topping) => (
          <label
            className="flex hover:bg-primary-light  px-3 py-2 gap-4  "
            key={topping.name}
          >
            <input
              className="px-2  checked: w-4 h-4"
              type="checkbox"
              value={topping.id}
              name=""
              checked={orderedPizza.extra_topping.includes(topping.id)}
              onChange={onChangeHandler}
            />
            <span>{topping.name}</span>
          </label>
        ))}
      </ul>
    </div>
  );
};

export default ExtraToppingsSelector;

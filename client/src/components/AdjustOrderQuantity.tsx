import React, { useEffect, useState } from "react";
import { OrderedPizza } from "./PizzaDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

type AdjustOrderQuantityType = {
  orderId?: number;
  setOrderdPizz?: React.Dispatch<React.SetStateAction<OrderedPizza>>;
  orderdPizza?: OrderedPizza;
};

const AdjustOrderQuantity = (props: AdjustOrderQuantityType) => {
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    if (props.setOrderdPizz && props.orderdPizza) {
      props.setOrderdPizz({
        ...props.orderdPizza,
         quantity: orderQuantity,
      });
    }
  }, [props.orderdPizza]);

  return (
    <div className="flex py-2 bg-white cursor-pointer rounded">
      <div
        onClick={(e) => {
          if(orderQuantity === 1) return;
          setOrderQuantity((n) => n - 1);
        }}
        className="px-2 border-r text-primary-dark "
      >
        {orderQuantity === 1 ? (
          <FontAwesomeIcon icon={faTrash} />
        ) : (
          <FontAwesomeIcon icon={faMinus} />
        )}
      </div>
      <span className="px-2 text-[17px]">{orderQuantity}</span>

      <div className="px-2 border-l text-primary-dark">
        <FontAwesomeIcon onClick={() => setOrderQuantity(n => n+1)} icon={faPlus} />
      </div>
    </div>
  );
};

export default AdjustOrderQuantity;

import React, { useEffect, useState } from "react";
import { OrderedPizza } from "./PizzaDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, useOrderWithId } from "../hooks/useRequests";
import { CartItemType } from "../pages/Cart";

type AdjustOrderQuantityType = {
  orderId?: number;
  setOrderdPizz?: React.Dispatch<React.SetStateAction<OrderedPizza>>;
  orderdPizza?: OrderedPizza;
  quntity?: number;
  refetchOrders?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  itemDetails?: CartItemType;
};

const AdjustOrderQuantity = (props: AdjustOrderQuantityType) => {
  const [orderQuantity, setOrderQuantity] = useState(props.quntity || 1);

  useEffect(() => {
    if (props.setOrderdPizz && props.orderdPizza) {
      props.setOrderdPizz({
        ...props.orderdPizza,
        quantity: orderQuantity,
      });
    }
  }, [orderQuantity]);

  async function handleOrderDelete() {
    if (props.setOrderdPizz && props.orderdPizza) return;
    try {
      const response = await axios.delete(`${API_URL}/orders/${props.orderId}`);
      if (response.status === 204 && props.refetchOrders) {
        console.log("Orders deleted successfully");
        await props.refetchOrders();
      }
    } catch (error) {}
  }

  async function handleOrderQuantityAdjust() {
    if (props.setOrderdPizz && props.orderdPizza , !props.orderId) return;

    try {
      const order = await useOrderWithId(props.orderId);
      const response = await axios.put(`${API_URL}/orders/${props.orderId}`, {
        ...order,
        quantity: orderQuantity,
      });
      
    } catch (error) {}
  }

  return (
    <div className="flex py-2 bg-white cursor-pointer rounded">
      <div
        onClick={async (e) => {
          if (orderQuantity === 1) return;
          setOrderQuantity((n) => n - 1);
          await handleOrderQuantityAdjust();
        }}
        className="px-2 border-r text-primary-dark "
      >
        {orderQuantity === 1 ? (
          <FontAwesomeIcon onClick={handleOrderDelete} icon={faTrash} />
        ) : (
          <FontAwesomeIcon
            icon={faMinus}
          />
        )}
      </div>
      <span className="px-2 text-[17px]">{orderQuantity}</span>

      <div className="px-2 border-l text-primary-dark">
        <FontAwesomeIcon
          onClick={async () => {
            setOrderQuantity((n) => n + 1);
            await handleOrderQuantityAdjust();
          }}
          icon={faPlus}
        />
      </div>
    </div>
  );
};

export default AdjustOrderQuantity;

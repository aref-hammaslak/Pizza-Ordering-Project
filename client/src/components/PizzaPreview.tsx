import React from "react";
import { PizzaPreviwType } from "../pages/Menu";
import Button from "./Button";
import BlureImage from "./BlureImage";

type PizzaPreviewProps = {
  pizza: PizzaPreviwType;
  setPizzaId: React.Dispatch<React.SetStateAction<number>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

const PizzaPreview = (props: PizzaPreviewProps) => {
  const { pizza } = props;
  return (
    <div
      onClick={() => {props.setPizzaId(pizza.id);  props.setModalState(true)} }
      key={pizza.id}
      className="md:max-w-[450px] cursor-pointer sm:max-w-[375px] max-w-[330px] flex flex-col  gap-4 bg-primary-mellow rounded overflow-hidden pb-4 shadow-2xl    hover:!-translate-y-1 !duration-300 transition-transform "
    >
      <div className="h-[200px] overflow-hidden w-full bg-center object-cover relative min-w-[350px]">
       <BlureImage blureHash={pizza.blur_hash} image={pizza.image} imageAlt={pizza.name}/> 
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 justify-between">
          <h3 className="text-xl font-bold text-center">{pizza.name}</h3>
          <h3 className="text-xl font-semibold text-center">${pizza.cost}</h3>
          <Button isLinked={false} name="Order now" styles={"text-white !bg-primary-dark hover:text-primary-dark hover:!bg-white transition-color hover:outline hover:outline-primary-dark"} />
        </div>
      </div>
    </div>
  );
};

export default PizzaPreview;

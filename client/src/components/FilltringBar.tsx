import React from 'react'
import SelectionDorpDown from './SelectionDorpDown';

type filteringProps = {
  catagories: string[],
  toppings: string[],
}

const FilltringBar = (props: filteringProps) => {
  const categories = props.catagories;
  const toppings = props.toppings;
  return (
    <div>
      <div>
        <SelectionDorpDown name={'Categories'} items= {categories}/>
        <SelectionDorpDown name={'toppings'} items= {toppings}/>       
      </div>
    </div>
  )
}

export default FilltringBar
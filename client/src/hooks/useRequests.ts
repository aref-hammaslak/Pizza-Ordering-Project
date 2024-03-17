import axios from 'axios';
import  {useQuery , QueryKey} from '@tanstack/react-query';

const API_URL = 'http://localhost:8000/api';

const usePizzas = (pizzaID:(number)= 0) => {


  
  const getPizzas = async () => {
    const response = await axios.get(`${API_URL}/pizzas`);

    return response.data;
  }

  // const getPizzaWithID = async () => {
  //   const response = await axios.get(`${API_URL}/pizzas/${pizzaID}`);
    
  //   return response.data;
  // }

  const Pizzas = useQuery({
    queryKey: 'pizzas' as unknown as QueryKey,
    queryFn: getPizzas,
  });

  // const Pizza = useQuery({
  //   queryKey: ['pizza', pizzaID] as unknown as QueryKey,
  //   queryFn: getPizzaWithID,
  // })

  

  return{
    Pizzas,
    
  }

  
}

const useOrders = () => {

  const getSizes = async () => {
    const response = await axios.get(`${API_URL}/sizes`);
    return response.data;
  }

  const getToppings = async () => {
    const response = await axios.get(`${API_URL}/toppings`);
    return  await response.data;
  }

  const getCrusts = async () => {
    
    const response = await axios.get(`${API_URL}/crusts`);
    return  response.data;
  }

  const getOrderExtras = async () => {
    const datas = await Promise.all([ getSizes, getToppings, getCrusts]);
    return {
      sizes: await datas[0],
      toppings: await datas[1],
      crusts: await datas[2],
    }
  }

  const orderExtras = useQuery({
    queryKey: 'orderExtras' as unknown as QueryKey,
    queryFn:  getOrderExtras,
  })


  return {
    orderExtras,
  }
  
}



export {
  usePizzas,
  useOrders,
}
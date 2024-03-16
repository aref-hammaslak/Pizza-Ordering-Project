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



export {
  usePizzas,
}
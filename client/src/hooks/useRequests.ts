import axios from 'axios';
import  {useQuery , QueryKey} from '@tanstack/react-query';
import { OrderedPizza } from '../components/PizzaDetailsModal';

export const API_URL = 'http://localhost:8000/api';

const USER_INFO = {
  "token": "ecc53b3e82bfff0c0c52211421801d92b29fbf4f",
  "user": {
      "id": 26,
      "username": "aref",
      "first_name": "aref",
      "last_name": "hammaslak",
      "email": "aref@gmial.com"
  }
}

axios.interceptors.request.use((config) => {
  if (!localStorage.getItem('userInfo'))  return config;

  const token =  JSON.parse(localStorage.getItem('userInfo') as string).token;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});


const usePizzas = (pizzaID:(number)= 0) => {

  const getPizzas = async () => {
    const response = await axios.get(`${API_URL}/pizzas`);

    return response.data;
  }
  const Pizzas = useQuery({
    queryKey: ['pizzas' as unknown as QueryKey],
    queryFn: getPizzas,
  });

  return{
    Pizzas,
    
  }

  
}

const useOrderExtras = ( ) => {

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
    queryKey: ['orderExtras' as unknown as QueryKey],
    queryFn:  getOrderExtras,
  })


  


  return orderExtras;
   
  
}

const usePostOrder = async (order:OrderedPizza) => {

  const postOrder = async () => {
    order.owner = JSON.parse(localStorage.getItem('userInfo') as string).user.id;
    const response = await axios.post<OrderedPizza>(`${API_URL}/orders`, order);
    console.log(response.data);
    return response.data;
  }

  // const postResponse = useQuery({
  //   queryKey: ['postResponse' as unknown as QueryKey],
  //   queryFn:  postOrder,
  // })

  return postOrder;
}

const useOrders = async () => {

  const getOrders= async () => {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  }
  return useQuery({
    queryKey: ['orders' as unknown as QueryKey],
    queryFn: getOrders,
  })
}



export {
  usePizzas,
  useOrderExtras,
  usePostOrder,
  useOrders,
}
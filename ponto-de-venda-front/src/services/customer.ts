import { Customer } from "@/types/type";
import axios from "axios";

export const getCustomers = async () => {
  const response = await axios.get("http://localhost:3000/clientes");
  return response.data;
}



export const createCustomer = async (customer: Customer) => {
  return await axios.post("http://localhost:3000/clientes", customer);
}
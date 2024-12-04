import { Customer, Products } from "@/types/type";
import axios from "axios";


export const getCustomers = async () => {
  const response = await axios.get("http://localhost:3000/clientes");
  return response.data;
}

export const getProducts = async () => {
  const response = await axios.get("http://localhost:3000/produtos");
  return response.data;
}

export const createCustomer = async (customer: Customer) => {
  return await axios.post("http://localhost:3000/clientes", customer);
}


export const createProduct = async (product: Products) => { 
  return await axios.post("http://localhost:3000/produtos", product)
}
import { Products } from "@/types/type";
import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get("http://localhost:3000/produtos");
  return response.data;
}

export const createProduct = async (product: Products) => { 
  return await axios.post("http://localhost:3000/produtos", product)
}
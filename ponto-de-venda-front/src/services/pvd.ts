import { Pdv } from "@/types/type";
import axios from "axios";


export const getPdvs = async () => {
  const response = await axios.get("http://localhost:3000/pdv");
  return response.data;
}

export const createPdv = async (pdv: Pdv) => {
  return await axios.post("http://localhost:3000/pdv", pdv)
}
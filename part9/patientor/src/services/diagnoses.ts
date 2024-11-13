import axios from "axios";
import { Diagnosis } from "../types";

const URL = 'http://localhost:3001/api/diagnoses';

const getAll = async (): Promise<Diagnosis[]> => {
  try {
    const response = await axios.get<Diagnosis[]>(URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getAll,
};
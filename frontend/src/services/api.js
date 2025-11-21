import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const fetchTurns = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/json`);
    return Array.isArray(res.data) ? res.data : Object.values(res.data);
  } catch (error) {
    console.error("Error fetching turns:", error);
    throw error;
  }
};

export const fetchOptions = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/options`);
    return res.data;
  } catch (error) {
    console.error("Error fetching options:", error);
    throw error;
  }
};

export const runEvaluation = async (payload) => {
  try {
    const res = await axios.post(`${BASE_URL}/run-evaluation`, payload);
    return res.data;
  } catch (error) {
    console.error("Error running evaluation:", error);
    throw error;
  }
};

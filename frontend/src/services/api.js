import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// export const fetchTurns = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/json`);
//     return Array.isArray(res.data) ? res.data : Object.values(res.data);
//   } catch (error) {
//     console.error("Error fetching turns:", error);
//     throw error;
//   }
// };

// export const fetchTurns = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/turns`);
//     return Array.isArray(res.data) ? res.data : Object.values(res.data);
//   } catch (error) {
//     console.error("Error fetching turns:", error);
//     throw error;
//   }
// };

export async function fetchResultFiles() {
  const res = await fetch(`${BASE_URL}/result_files`);
  return res.json();
}

export async function fetchResultFile(filename) {
  const res = await fetch(`${BASE_URL}/results/${filename}`);
  return res.json();
}

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

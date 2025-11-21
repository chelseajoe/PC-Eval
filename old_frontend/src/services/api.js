// import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000";

// export const fetchTurns = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/json`);
//     return Array.isArray(res.data) ? res.data : Object.values(res.data);
//   } catch (error) {
//     console.error("Error fetching turns:", error);
//     throw error;
//   }
// };

// export const fetchOptions = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/options`);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching options:", error);
//     throw error;
//   }
// };

// export const runEvaluation = async (payload) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/run-evaluation`, payload);
//     return res.data;
//   } catch (error) {
//     console.error("Error running evaluation:", error);
//     throw error;
//   }
// };



import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// Axios instance (optional, could be useful if you add headers later)
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Fetch all turns from the backend
export const fetchTurns = async () => {
  try {
    const res = await api.get("/json");
    // Ensure consistent return type as an array
    return Array.isArray(res.data) ? res.data : Object.values(res.data);
  } catch (error) {
    console.error("Error fetching turns:", error);
    throw error;
  }
};

// Fetch evaluation options (e.g., rubric categories, max scores)
export const fetchOptions = async () => {
  try {
    const res = await api.get("/options");
    return res.data;
  } catch (error) {
    console.error("Error fetching options:", error);
    throw error;
  }
};

// // Run evaluation for a given payload
// export const runEvaluation = async (payload) => {
//   try {
//     const res = await api.post("/run-evaluation", payload);
//     return res.data;
//   } catch (error) {
//     console.error("Error running evaluation:", error);
//     throw error;
//   }
// };


// Run evaluation for multiple turns
export const runEvaluation = async (turns) => {
  try {
    // Payload could be the array of turns
    const res = await api.post("/run-full-evaluation", { turns });
    // Return evaluation results for all turns
    return res.data;
  } catch (error) {
    console.error("Error running full evaluation:", error);
    throw error;
  }
};
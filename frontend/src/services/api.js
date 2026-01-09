// BACKEND VERSION (Requires Backend Server)

// import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000";


// export async function fetchResultFiles() {
//   const res = await fetch(`${BASE_URL}/result_files`);
//   return res.json();
// }

// export async function fetchResultFile(filename) {
//   const res = await fetch(`${BASE_URL}/results/${filename}`);
//   return res.json();
// }

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


// Static version github pages compatible

// FRONTEND-ONLY API (GitHub Pages Compatible)
// Reads JSON files from /public/results/

// No BASE_URL needed — served statically
const RESULTS_BASE = '/PC-Eval/results';
const OPTIONS_FILE = '/PC-Eval/options.json';

// -----------------------------
// Fetch list of result filenames from turn by turn evaluations 
// -----------------------------
export async function fetchResultFiles() {
  try {
    const res = await fetch(`${RESULTS_BASE}/evaluation_files.json`);
    const data = await res.json();
    console.log("Fetched result file list:", data);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching result file list:", err);
    return [];
  }
}

// -----------------------------
// Fetch list of result filenames from prosody evaluations
// -----------------------------
export async function fetchProsodyFiles() {
  try {
    const res = await fetch(`${RESULTS_BASE}/prosody_files.json`);
    const data = await res.json();
    console.log("Fetched result file list:", data);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching result file list:", err);
    return [];
  }
}

// -----------------------------
// Fetch individual result JSON
// -----------------------------
export async function fetchResultFile(filename) {
  try {
    const res = await fetch(`${RESULTS_BASE}/${filename}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(`Error fetching result file ${filename}:`, err);
    return [];
  }
}

// -----------------------------
// Options (Static as well)
// -----------------------------
export async function fetchOptions() {
  try {
    const res = await fetch(OPTIONS_FILE);
    const data = await res.json();
    return data || {};
  } catch (err) {
    console.error("Error fetching options:", err);
    return {};
  }
}

// Dummy function (backend removed)
export const runEvaluation = async () => {
  throw new Error("runEvaluation is not available on GitHub Pages.");
};

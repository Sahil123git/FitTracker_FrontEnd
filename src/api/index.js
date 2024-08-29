import axios from "axios";

const API = axios.create({
  // baseURL: "https://fitnesstrack-vtv1.onrender.com/api/",
  baseURL: "http://localhost:8080/api/",
});

export const UserSignUp = async (data) => API.post("/auth/signup", data);
export const UserSignIn = async (data) => API.post("/auth/signin", data);
export const getUserDetails = async (token, id) =>
  API.get(`/user/${id}`, {
    headers: { Authorization: token },
  });
export const getDashboardDetails = async (token) =>
  API.get("/dashboard", {
    headers: { Authorization: token },
  });
export const getWorkouts = async (token, date) =>
  await API.get(`/workout${date}`, {
    headers: { Authorization: token },
  });
export const addWorkout = async (token, data) =>
  await API.post(`/workout`, data, {
    headers: { Authorization: token },
  });
export const editWorkout = async (token, data) =>
  await API.put("/workout", data, { headers: { Authorization: token } });
export const workoutDelete = async (token, id) =>
  await API.delete(`/workout/${id}`, { headers: { Authorization: token } });

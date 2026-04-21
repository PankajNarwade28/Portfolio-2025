import api from "./axiosInstance";

// GET all education
export const getEducation = async () => {
  const res = await api.get("/education");
  return res.data;
};
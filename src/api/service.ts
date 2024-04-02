import axiosI from "./axios";

// getAllProducts
export const getAllProducts = async () => {
  return await axiosI.get("/products");
};

// getProductById
export const getProductById = async (id: string | string[]) => {
  return await axiosI.get(`/products/${id}`);
};

import { https } from "./config";

export const caphe = {
  getProducts: () => {
    return https.get("/product");
  },

  getCategories: () => {
    return https.get("/category");
  },

  createProduct: (data: any) => {
    return https.post("/product/create-product", data);
  },

  postLogin: (data: any) => {
    return https.post("/auth/login", data);
  },

  postRegister: (data: any) => {
    return https.post("/user/register", data);
  },

  getLoginGoogle: () => {
    return https.post("/app/google");
  },

  getCart: async (userId: String) => {
    return await https.get(`/cart/${userId}`);
  },

  addToCart: async (userId: String, productId: String, quantity: number) => {
    return await https.post("/cart/add", { userId, productId, quantity });
    },
  
  removeFromCart: async (userId: String, productId: String) => {
    return await https.post("/cart/remove", { userId, productId });
  }
};

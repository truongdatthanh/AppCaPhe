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

  getCart: (userId: string) => {
    return https.get("/cart/" + userId);  
  },

  addToCart: async (userId: String, productId: String, quantity: number) => {
    return await https.post("/cart/add", { userId, productId, quantity });
  },

  removeFromCart: async (userId: String, productId: String) => {
    return await https.delete(`/cart/remove/${userId}/${productId}`);
  },

  clearCart: async (userId: String) => {
    return await https.delete(`/cart/clear/${userId}`);
  },

  getProductByNames: (name: string) => {
    return https.get("/product/get-product-by-name/" + name);
  },

  getProductById: ( id: string ) =>
  {
    return https.get( "/product/get-product-by-id/" + id );
  },

  updateStatusCart: ( userId: string, status: boolean ) =>
  {
    return https.patch( `/cart/update-status/${userId}`, {status} );
  },

  createPurchased: ( data: any ) =>
  {
    return https.post( "/purchased/create", data );
  },

  getCartByUserId: ( userId: string ) =>
  {
    return https.get( `/cart/get-cart/${userId}` );
  },
  getUserById: ( userId: string ) =>
  {
    return https.get( `/user/${userId}` );
  },
  getEditUser: ( userId: string, data: any ) =>
  {
    return https.patch( `/user/edit/${userId}`, data );
  },
  loginWithGoogle ()
  {
    return https.get( "/auth/google/login" );
  },
  patchChangePassword: ( userId: string, oldPassword: string, newPassword: string ) =>
  {
    return https.patch( `/user/change-password/${userId}`, {oldPassword, newPassword} );
  }
};

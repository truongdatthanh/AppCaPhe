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
}
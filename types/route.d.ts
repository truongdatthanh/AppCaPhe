export type RootStackParamList = {
  home: { name: string } | undefined;
  home2: undefined;
  about: undefined;
  login: undefined;
  register: undefined;
  profile: undefined;
  detail: ProductDetail;
  cart: CartItem;
};

type CartItem = {
  userId: string;
  productId: string;
  productName: string;
  price: number;
};

type ProductDetail = {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: string;
};


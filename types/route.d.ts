export type RootStackParamList = {
  main: undefined;
  home: { name: string } | undefined;
  home1: undefined;
  home2: undefined;
  about: undefined;
  login: undefined;
  register: undefined;
  profile: undefined;
  detail: ProductDetail;
  cart: CartItem;
  checkout: undefined;
  search: undefined;
  product: undefined;
  completed: undefined;
  other: undefined;
  other1: undefined;
  setting: undefined;
  setting1: undefined;
  changePassword: undefined;
  policies: undefined;
};

type CartItem = {
  userId: string;
  productId: string;
};

type ProductDetail = {
  _id: string;
};

declare module "*.jpg";

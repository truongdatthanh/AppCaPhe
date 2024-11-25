type RootStackParamList = {
  home: { name: string } | undefined;
  about: undefined;
  login: undefined;
  register: undefined;
  profile: undefined;
  detail: { _id: string; name: string; image: string; description: string; price: number; categoryId: string } | undefined;
  cart: { _id: string; name: string; image: string; description: string; price: number; categoryId: string } | undefined;
};

declare module "*.jpg";

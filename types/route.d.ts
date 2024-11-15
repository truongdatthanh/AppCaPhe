type RootStackParamList = {
    home: undefined;
    about:  undefined;
    login: undefined;
    register: undefined;
    profile: undefined;
    detail: {id: number, name: string, category: string} ;
    cart: {id: number, name: string, category: string} ;
};

declare module "*.jpg"
import { Location } from "react-router-dom";

export enum MainNavIconTypes {
    Burger = 'burger',
    List = 'list',
    Profile = 'profile',
}

export enum FormInfoTypes {
    Success = 'success',
    Error = 'error',
}

export enum ConstructorItemFixedTypes {
    Top = 'top',
    Bottom = 'bottom',
}

export enum ConstructorItemEmptyTypes {
    Top = 'top',
    Bottom = 'bottom',
    List = 'list',
}

export enum OrderStatusTypes {
    Created = 'created', 
    Pending = 'pending',
    Done = 'done',
}


export type TMainNavItem = {
    iconType: MainNavIconTypes;
    href: string;
    txt: string;
}

export type TUseLocation = {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: { 
        background ?: Location;
        from ?: Location; //TUseLocation
        resetPassword ?: boolean;
    } | null
}

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
  }

export type TConstructorIngredient = TIngredient & {
    uuid: string;
}

export type TUserUpdateData = {
    name?: string;
    email?: string;
    password?: string;
};

export type TUser = {
    name: string;
    email: string;
    password?: string;
}

export type TIngredientMoveData = {
    from: number;
    to: number;
}

export type TOrder = {
    number: number;
}

export type TResetPasswordForm = {
    password: string;
    emailCode: string;
}

export type TRegisterForm = {
    password: string;
    email: string;
    name: string;
}

export type TLoginForm = {
    password: string;
    email: string;
}

export type TOrderData = {
    ingredients: string[];
    _id: string;
    name: string;
    status: OrderStatusTypes;
    number: number;
    createdAt: string;
    updatedAt: string;
    owner?: string; //?
    _v?: number;
}
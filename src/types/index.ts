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
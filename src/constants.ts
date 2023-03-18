import { OrderStatusTypes, TOrderData } from "./types";

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const ENDPOINT_INGREDIENTS = '/ingredients'
export const ENDPOINT_MAKE_ORDER = '/orders'
export const ENDPOINT_LOGIN = '/auth/login'
export const ENDPOINT_REGISTER = '/auth/register'
export const ENDPOINT_PASSWORD_FORGOT = '/password-reset'
export const ENDPOINT_PASSWORD_RESET = '/password-reset/reset'
export const ENDPOINT_USER = '/auth/user'
export const ENDPOINT_LOGOUT = '/auth/logout'
export const ENDPOINT_TOKEN_REFRESH = '/auth/token'
export const ENDPOINT_ORDER = '/orders'

export const ORDER_DONE_STATUS = 'Выполнен';
export const ORDER_PENDING_STATUS = 'Готовится';
export const ORDER_CREATED_STATUS = 'Создан';


export const orders: TOrderData[] = [
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c9",
      ],
      _id: "123",
      name: "burger 23234",
      status: OrderStatusTypes.Done,
      number: 334242432,
      createdAt: "2022-06-23T14:43:22.587Z",
      updatedAt: "2022-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
      ],
      _id: "456",
      name: "Interstellarburger",
      status: OrderStatusTypes.Done,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "12312312321",
      name: "Interstellarburger",
      status: OrderStatusTypes.Done,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      name: "Interstellarburger",
      status: OrderStatusTypes.Done,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      name: "Interstellarburger",
      status: OrderStatusTypes.Done,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      name: "Interstellarburger",
      status: OrderStatusTypes.Done,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      name: "Interstellarburger",
      status: OrderStatusTypes.Done,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      name: "Interstellarburger",
      status: OrderStatusTypes.Done,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      name: "Interstellarburger",
      status: OrderStatusTypes.Done,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      name: "Interstellarburger",
      status: OrderStatusTypes.Pending,
      number: 4234324,
      createdAt: "2022-12-23T14:43:22.587Z",
      updatedAt: "2022-12-23T14:43:22.603Z"
    },
  ];
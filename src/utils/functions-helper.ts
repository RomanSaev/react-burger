import { TConstructorIngredient } from "../types";

export const getTotalBurgerPrice = (bun: TConstructorIngredient | null, fillingIngredients: TConstructorIngredient[]) => {
    let resultPrice = 0;
    if (bun) {
        resultPrice += bun.price * 2;
        resultPrice += fillingIngredients.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.price
        }, 0)
    }
    return resultPrice;
}

type TCookieProps = {
  expires?: number | string | Date;
  path?: string;
  [propKey: string]: any;
}

export function setCookie(name: string, value: string, props?: TCookieProps) {
  props = {
    path: '/',  //задаем корневой адрес для cookies
    ...props
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;

  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  
  document.cookie = updatedCookie;
} 
  
export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

export function deleteCookie(name: string) {
  // Находим куку по ключу token, удаляем её значение, 
  // устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
  setCookie(name, '', { expires: -1 });
} 

export const saveTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

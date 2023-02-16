import jsCookie from "js-cookie";

interface Cookie {
  key: string;
  value: string;
}

export const getCookie = (key: string) => jsCookie.get(key);

export const setCookie = ({ key, value }: Cookie) => jsCookie.set(key, value);

export const removeCookie = (key: string) => jsCookie.remove(key);

const BASE = "https://www.supremenewyork.com";
const SHOP_BASE = `${BASE}/shop`;
export const MOBILE_URL = `${BASE}/mobile`;
export const PRODUCTS_URL = `${SHOP_BASE}.json`;
export const PRODUCT_DETAILS_URL = (id:string) => `${SHOP_BASE}/${id}.json`;
export const ADD_TO_CART_URL = (id:string )=> `${SHOP_BASE}/${id}/add.json`;
const CHECKOUT_BASE = `${BASE}/checkout`;
export const CHECKOUT_URL = `${CHECKOUT_BASE}.json`;

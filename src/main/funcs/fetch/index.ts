const {
  PRODUCT_DETAILS_URL,
  PRODUCTS_URL
} = require("../../utils/links");

import HttpCilent from '../../http/index';

export async function fetchProductsByCategory (
  http:HttpCilent,
  category:string
) {
  const resp = await http.get(PRODUCTS_URL);  
  return resp.products_and_categories[category];
};

export async function fetchProductStylesID(
  http:HttpCilent,
  id:string
){
  const resp = await http.get(PRODUCT_DETAILS_URL(id));
  return resp.styles;
};

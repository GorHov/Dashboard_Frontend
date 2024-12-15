import { createStore } from "effector";
import { fetchUserProductsFx, fetchProductByIdFx } from "./effects";
import { logoutFx } from "../auth/effects";
import { createEvent } from "effector";

export const clearProductData = createEvent();

export const $products = createStore<Array<{
  id: number;
  name: string;
  description: string;
  price: number;
}>>([])
  .on(fetchUserProductsFx.doneData, (_, products) => products)
  .reset(logoutFx);

  export const $product = createStore<{
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    discountPrice?: string;
  } | null>(null)
    .on(fetchProductByIdFx.doneData, (_, product) => product)
    .reset(logoutFx)
    .reset(clearProductData);
  
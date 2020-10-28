import { createShopMutation } from "./createShop.mutation";
import { updateShopMutation } from "./updateShop.muation";
import {deleteShopMutation} from './deleteShop.mutation'
export const shopMutations = {
    ...createShopMutation,
    ...updateShopMutation,
    ...deleteShopMutation
}
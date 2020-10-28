import { createShopMutation } from "./createShop.mutation";
import { updateShopMutation } from "./updateShop.muation";

export const shopMutations = {
    ...createShopMutation,
    ...updateShopMutation
}
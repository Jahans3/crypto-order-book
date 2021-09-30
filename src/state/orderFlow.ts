import { atom } from "recoil";
import { ATOM_KEY } from "../constants";

export const orderFlow = atom({
  key: ATOM_KEY.ORDER_FLOW,
  default: [],
});

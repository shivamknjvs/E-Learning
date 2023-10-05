import { atom } from "recoil";

export const isUserState = atom({
  key: "isUserState",
  default: {
    isUser: localStorage.getItem("isUser") || false,
  },
});

import { atom } from "recoil";
import { ATOM_KEY, NOTIFICATION_STATUS } from "../constants";

export const notificationStatusAtom = atom<"visible" | "hidden">({
  key: ATOM_KEY.NOTIFICATION_STATUS,
  default: NOTIFICATION_STATUS.HIDDEN,
});

export const notificationUptimeAtom = atom<number>({
  key: ATOM_KEY.NOTIFICATION_UPTIME,
  default: 2500,
});

export const notificationMessageAtom = atom<string>({
  key: ATOM_KEY.NOTIFICATION_MESSAGE,
  default: "",
});

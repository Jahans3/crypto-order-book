import { MOBILE_BREAKPOINT } from "./constants";

export function getIsMobile(): boolean {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

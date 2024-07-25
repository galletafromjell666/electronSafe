import { api } from "./preload";
export {};

declare global {
  interface Window {
    electron: any;
    api: typeof api;
  }
}

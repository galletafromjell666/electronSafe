import { api } from ".";
export {};

declare global {
  interface Window {
    electron: any;
    api: typeof api;
  }
}

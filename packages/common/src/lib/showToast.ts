import { useToastStore } from "../stores/useToastStore";
import { IToast, ToastType } from "../types";

export const showToast = (type: ToastType, message: string, desc?: string) => {
  useToastStore.getState().add({ type, message, desc });
};

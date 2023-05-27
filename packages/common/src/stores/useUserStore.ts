import { create } from "zustand";
import { UserType } from "../types";

const userKey = "User@HVEFX";

interface UserState {
  user: UserType | undefined;
  loadUser: () => void;
  setUser: (x: UserType) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: undefined,
  loadUser: async () => {
    try {
      const data = JSON.parse(localStorage.getItem(userKey) || "");

      set(data);
    } catch {}
  },
  setUser: async (user) => {
    set({ user });

    try {
      localStorage.setItem(userKey, JSON.stringify(user));
    } catch {}
  },
  logout: async () => {
    set({ user: undefined });

    try {
      localStorage.removeItem(userKey);
    } catch {}
  },
}));

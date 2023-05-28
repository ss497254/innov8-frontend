import { create } from "zustand";
import { showToast } from "../lib/showToast";
import { UserType } from "../types";
import { Rfetch } from "../utils";

const userKey = "User@HVEFX";

interface UserState {
  user: UserType | undefined;
  loadUser: () => void;
  setUser: (x: UserType) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: undefined,
  loadUser: () => {
    try {
      const user = JSON.parse(localStorage.getItem(userKey) || "") as UserType;

      if (user && user.role) {
        set({ user });
        Rfetch<UserType>(`/${user.role}/me`)
          .then((res) => {
            get().setUser(res.data);
          })
          .catch(() => {
            showToast("error", "Session expired", "Please login again");
            set({ user: undefined });
          });
      }
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

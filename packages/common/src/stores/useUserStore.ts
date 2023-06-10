import { create } from "zustand";
import { isServer } from "../lib";
import { showToast } from "../lib/showToast";
import { UserType } from "../types";
import { Cfetch } from "../utils";

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
    if (isServer) return;

    try {
      const user = JSON.parse(localStorage.getItem(userKey) || "") as UserType;

      if (user && user.role) {
        set({ user });
        Cfetch<UserType>(`/${user.role}/me`)
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
    const { user } = get();
    if (!user) return;

    Cfetch(`/${user.role}/logout`)
      .then((res) => {
        showToast("error", "Logout Successful", res.message);
      })
      .catch((e) => {
        showToast("error", "Please try again", e.message);
      });

    set({ user: undefined });
    try {
      localStorage.removeItem(userKey);
    } catch {}
  },
}));

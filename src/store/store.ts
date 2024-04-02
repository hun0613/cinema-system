import { create } from "zustand";

interface ID {
  bears: number;
  setBear: (bears: number) => void;
}

export const useBearStore = create<ID>((set) => ({
  bears: 0,
  setBear: (bears) => {
    set((state) => ({ bears: bears }));
  },
}));

import { create } from "zustand";

export type AuthState = {
  // 로그인/회원가입 모드상태
  authState: string;
  setAuthState: (el: string) => void;
  // 인증모달 활성화 여부
  modalState: boolean;
  setModalState: (el: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  // 로그인(signIn) / 회원가입(signUp) 상태
  authState: "signIn",
  setAuthState: (el) => {
    set((state) => ({ authState: el }));
  },

  // 인증 모달 활성화 여부
  modalState: false,
  setModalState: (el) => {
    set((state) => ({ modalState: el }));
  },
}));

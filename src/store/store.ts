import { create } from "zustand";
import { ReservationData, ReservationNavState, movieData } from "./types";

export const useMovieStore = create<movieData>((set) => ({
  // server db
  db: null,
  setDb: (el) => {
    set((state) => ({ db: el }));
  },
}));

export const useReservationStore = create<ReservationData>((set) => ({
  // 극장이름
  theater: "",
  setTeather: (el) => {
    set((state) => ({ theater: el }));
  },

  // 극장 ID
  theaterId: 0,
  setTheaterId: (el) => {
    set((state) => ({ theaterId: el }));
  },

  // 날짜
  date: `${new Date().getFullYear()}${new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1}${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}`,
  setDate: (el) => {
    set((state) => ({ date: el }));
  },

  // 시간
  time: "",
  setTime: (el) => {
    set((state) => ({ time: el }));
  },

  // 상영관 이름
  room: "",
  setRoom: (el) => {
    set((state) => ({ room: el }));
  },

  // 상영관 ID
  roomId: 0,
  setRoomId: (el) => {
    set((state) => ({ roomId: el }));
  },

  // 인원수
  headCnt: 0,
  setHeadCnt: (el) => {
    set((state) => ({ headCnt: el }));
  },

  // 좌석
  seat: ["A01", "A05"],
  setSeat: (el) => {
    set((state) => ({ seat: el }));
  },

  // 선택한 상영관의 좌석 현황
  seatState: [""],
  setSeatState: (el) => {
    set((state) => ({ seatState: el }));
  },
}));

export const useReservationNavStore = create<ReservationNavState>((set) => ({
  // navigation 상태
  navState: 1,
  setNavState: (el) => {
    set((state) => ({ navState: el }));
  },
}));

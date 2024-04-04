export interface ReservationData {
  // 극장이름
  theater: string;
  setTeather: (el: string) => void;

  // 극장 ID
  theaterId: number;
  setTheaterId: (el: number) => void;

  // 날짜
  date: string;
  setDate: (el: string) => void;

  // 시간
  time: string;
  setTime: (el: string) => void;

  // 상영관 이름
  room: string;
  setRoom: (el: string) => void;

  // 상영관 ID
  roomId: number;
  setRoomId: (el: number) => void;

  // 인원수
  headCnt: number;
  setHeadCnt: (el: number) => void;

  // 좌석
  seat: string[];
  setSeat: (el: string[]) => void;

  // 선택한 상영관의 좌석 현황
  seatState: string[];
  setSeatState: (el: string[]) => void;
}

export interface ReservationNavState {
  // navigation 상태
  navState: number;
  setNavState: (el: number) => void;
}

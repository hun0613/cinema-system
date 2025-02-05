import { UseSuspenseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { header } from '..';

export type SeatLayoutType = {
  row: string[]; // 상영관 행 정보
  col: string[]; // 상영관 열 정보
  sp: number[]; // 좌석간 간격 시작지점 (배열 인덱스 기준 (0 ~))
  ep: number[]; // 좌석간 간격 종료지점 (배열 인덱스 기준 (0 ~))
  seat_state: string[];
};

export const getFetchRoomQuery = (
  theaterId: number,
  roomId: number,
  date: string,
  time: string,
): UseSuspenseQueryOptions<SeatLayoutType, unknown> => {
  return {
    queryKey: ['room', theaterId, roomId, date, time],
    queryFn: async () => {
      const res = await axios.get(`/book/api/room?theater_id=${theaterId}&room_id=${roomId}&date=${date}&time=${time}`, {
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
          ...header,
        },
      });
      return res.data[0];
    },
  };
};

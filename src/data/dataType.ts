export interface movieType {
  id: number; // id
  title: string; // 제목
  summary: string; // 줄거리
  rating: number; // 평점
  reservation_rate: number; // 예매율
  release_date: string; // 개봉일시
  classification: number; // 상영여부
  background_img: string; // 배경이미지
  poster_img: string; // 포스터이미지
}

export interface DateType {
  date: string; // 날짜 (YYYYMMDD);
  week: string; // 요일 (월 ~ 일);
  holiday_yn: string; // 공휴일 여부 (Y/N);
}

export interface MovieTimeType {
  theater_id: number; // 극장ID
  room_id: number; // 상영관ID
  movie_id: number; // 영화ID
  date: string; // 날짜 (YYYYMMDD)
  time: string; // 상영시간 (HH:MM)
  seat_state: string[]; // 좌석 예매 현황 (['A03', 'B04'])
}

type Room = {
  room_id: number;
  room_nm: string; // 상영관 이름
};

export interface TheaterType {
  theater_id: number;
  name: string; // 극장 이름
  position: string; // 극장 위치
  latitude: number; // 위도
  longitude: number; // 경도
  room: Room[]; // 상영관 정보
}

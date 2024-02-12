enum MovieClassification {
  Expected = 0,
  InProgress = 1,
  End = 2,
}

interface movieType {
  id: number;
  title: string;
  summary: string;
  rating: number;
  reservation_rate: number;
  classification: MovieClassification;
  background_img: string;
  poster_img: string;
}

export const movieData: movieType[] = [
  {
    id: 1,
    title: "서울의 봄",
    summary: `1979년 12월 12일, 수도 서울 군사반란 발생 그날, 대한민국의 운명이
    바뀌었다 대한민국을 뒤흔든 10월 26일 이후, 서울에 새로운 바람이
    불어온 것도 잠시 12월 12일, 보안사령관 전두광이 반란을 일으키고 군
    내 사조직을 총동원하여 최전선의 전방부대까지 서울로 불러들인다.
    권력에 눈이 먼 전두광의 반란군과 이에 맞선 수도경비사령관 이태신을
    비롯한 진압군 사이, 일촉즉발의 9시간이 흘러가는데… 목숨을 건 두
    세력의 팽팽한 대립 오늘 밤, 대한민국 수도에서 가장 치열한 전쟁이
    펼쳐진다!`,
    rating: 8.7,
    reservation_rate: 43,
    classification: MovieClassification.InProgress,
    background_img: "/images/bg_서울의봄.jpeg",
    poster_img: "/images/pt_서울의봄.webp",
  },
  {
    id: 2,
    title: "괴물",
    summary: `“우리 동네에는 괴물이 산다”
    싱글맘 사오리(안도 사쿠라)는 아들 미나토(쿠로카와 소야)의 행동에서 이상 기운을 감지한다.
    용기를 내 찾아간 학교에서 상담을 진행한 날 이후
    선생님과 학생들의 분위기가 심상치 않게 흐르기 시작하고.
     
    “괴물은 누구인가?”
    한편 사오리는 친구들로부터 따돌림을 당하고 있는 미나토의 친구 요리(히이라기 히나타)의 존재를 알게 되고
    자신이 아는 아들의 모습과 사람들이 아는 아들의 모습이 다르다는 사실을 어렴풋이 깨닫는데…
    태풍이 몰아치던 어느 날, 아무도 몰랐던 진실이 드러난다.`,
    rating: 9.2,
    reservation_rate: 27,
    classification: MovieClassification.InProgress,
    background_img: "/images/bg_괴물.jpeg",
    poster_img: "/images/pt_괴물.jpeg",
  },
  {
    id: 3,
    title: "도그데이즈",
    summary: `깔끔한 성격의 계획형 싱글남 ‘민상’(유해진).
    영끌까지 모아 산 건물을 개똥밭으로 만드는 세입자 수의사 ‘진영’(김서형) 때문에 매일 머리가 아프다.
    오늘도 ‘진영’과 티격태격하던 ‘민상’은 동물병원에서 한 성격하는 할머니를 만나는데,
    다름 아닌 세계적 건축가 ‘민서’(윤여정)!
    진행 중인 프로젝트를 위해 ‘민서’의 도움이 절실한 ‘민상’은 ‘민서’에게 잘 보이기 위해
    ‘진영’과 그녀의 반려견 ‘차장님’을 공략하기 시작한다.
    
    갑자기 길에서 쓰러지게 되며 유일한 가족인 반려견 ‘완다’를 잃어 버리고만 ‘민서’.
    동네에 살고 있는 케이팝 작곡가 ‘선용’(정성화)과 ‘정아’(김윤진) 가족이 완다를 보살피고 있다는 사실을 모르는 ‘민서’는
    자신을 구해준 MZ 배달 라이더 ‘진우’(탕준상)와 함께 완다를 찾아 나선다.
    
    한편 ‘선용’의 후배인 밴드 리더 ‘현’(이현우)은 자리를 비운 여친의 반려견 ‘스팅’을 돌보던 중
    스팅의 대디를 자청하며 나타난 여친의 전남친 ‘다니엘’(다니엘 헤니)의 등장에 기가 막힐 따름인데…!
    
    특별한 단짝 덕분에 엮이게 된 이들의
    기분 좋은 갓생 스토리가 시작된다!`,
    rating: 9.2,
    reservation_rate: 27,
    classification: MovieClassification.InProgress,
    background_img: "/images/bg_도그데이즈.jpeg",
    poster_img: "/images/pt_도그데이즈.jpeg",
  },
];

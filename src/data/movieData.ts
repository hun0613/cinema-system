export enum MovieClassification {
  Expected = 0,
  InProgress = 1,
  End = 2,
}

export interface movieType {
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
  {
    id: 4,
    title: "윙카",
    summary: `세상에서 가장 달콤한 여정
    좋은 일은 모두 꿈에서부터 시작된다!
    
    마법사이자 초콜릿 메이커 ‘윌리 웡카’의 꿈은 디저트의 성지, ‘달콤 백화점’에 자신만의 초콜릿 가게를 여는 것.
    가진 것이라고는 낡은 모자 가득한 꿈과 단돈 12소버린 뿐이지만 특별한 마법의 초콜릿으로 사람들을 사로잡을 자신이 있다. 
    
    하지만 먹을 것도, 잠잘 곳도, 의지할 사람도 없는 상황 속에서 낡은 여인숙에 머물게 된 ‘웡카’는
    ‘스크러빗 부인’과 ‘블리처’의 계략에 빠져 눈더미처럼 불어난 숙박비로 인해 순식간에 빚더미에 오른다.
    게다가 밤마다 초콜릿을 훔쳐가는 작은 도둑 ‘움파 룸파’의 등장과 ‘달콤 백화점’을 독점한 초콜릿 카르텔의 강력한 견제까지.
    세계 최고의 초콜릿 메이커가 되는 길은 험난하기만 한데…`,
    rating: 9.5,
    reservation_rate: 10.1,
    classification: MovieClassification.InProgress,
    background_img: "/images/bg_윙카.jpeg",
    poster_img: "/images/pt_윙카.jpeg",
  },
  {
    id: 5,
    title: "아기상어 극장판-사이렌 스톤의 비밀",
    summary: `대도시 미끈매끈 시티로 이사한 아기상어 ‘올리’!

    최고의 단짝 ‘윌리엄’과 헤어져야 한다는 슬픔도 잠시,
    뉴욕처럼 반짝이는 화려한 풍경과 멋진 음악에 설렌다.
    벨루가 아이돌 ‘엔하이픈’, 상어 팝스타 ‘샤키L’,
    그리고 최고의 스타 불가사리 ‘스타리아나’까지!
    
    어느 날 ‘올리’는 ‘스타리아나’의 인기 비결,
    ‘사이렌 스톤’의 숨겨진 비밀과
    ‘스타리아나’의 거대한 음모를 알게 되는데…
    
    아기상어, 스톤의 저주에 맞서 바다를 지켜라!
    `,
    rating: 9.1,
    reservation_rate: 3.7,
    classification: MovieClassification.InProgress,
    background_img: "/images/bg_아기상어.jpeg",
    poster_img: "/images/pt_아기상어.jpeg",
  },
  {
    id: 6,
    title: "데드맨",
    summary: `목숨값 단돈 500만원! 이름값 1000억?
    이름에 살고, 이름에 죽는다!
     
    인생 벼랑 끝, 살기 위해 이름까지 팔게 된 ‘이만재’.
    누구도 믿을 수 없는 바지사장 세계에서 탁월한 계산 능력 하나로 가늘고 길게 버텨온 그가 큰 거 한방 터뜨릴 절호의 기회를 잡는다.
    그러나 그에게 돌아온 것은 1천억 횡령 누명과 자신의 사망 기사!
     
    살아있지만 죽은 사람, 즉 ‘데드맨’이 되어 영문도 모른 채 중국의 사설감옥에 끌려간 ‘이만재’.
    정치 컨설턴트 ‘심여사’가 그의 앞에 나타나 목숨값을 담보로 위험한 제안을 하고,
    ‘이만재’ 때문에 아버지가 죽었다고 주장하는 ‘공희주’가 등장하면서
    1천억짜리 설계판의 배후를 찾기 위해 의기투합한 세 사람의 추적이 시작되는데…
    `,
    rating: 7.8,
    reservation_rate: 2.7,
    classification: MovieClassification.InProgress,
    background_img: "/images/bg_데드맨.jpeg",
    poster_img: "/images/pt_데드맨.jpeg",
  },
  {
    id: 7,
    title: "외계+인 2부",
    summary: `반드시 돌아가야 한다. 모두를 지키기 위해

    인간의 몸속에 가둬진 외계인 죄수의 탈옥을 막으려다 과거에 갇혀버린 ‘이안’(김태리)은
    우여곡절 끝에 시간의 문을 열 수 있는 ‘신검’을 되찾고, ‘썬더’(김우빈)를 찾아 자신이 떠나온 미래로 돌아가려고 한다.
    한편 이안을 위기의 순간마다 도와주는 ‘무륵’(류준열)은 자신의 몸속에 느껴지는 이상한 존재에 혼란을 느낀다.
    그런 ‘무륵’ 속에 요괴가 있다고 의심하는 삼각산 두 신선 ‘흑설’(염정아)과 ‘청운’(조우진),
    소문 속 신검을 빼앗아 눈을 뜨려는 맹인 검객 ‘능파’(진선규),
    신검을 차지하려는 ‘자장’(김의성)까지 ‘이안’과 ‘무륵’을 쫓기 시작한다.
    
    한편 현대에서는,
    탈옥한 외계인 죄수 ‘설계자’가 폭발 시킨 외계물질 ‘하바’로 인해 수많은 사람들이 죽고,
    우연히 외계인을 목격한 ‘민개인’(이하늬)은 이 사건을 파헤치기 시작한다.
    
    모든 하바가 폭발하기까지 남은 시간은 단 48분,
    시간의 문을 열고 무륵, 썬더, 두 신선과 함께 현재로 돌아온 이안.
    마침내 모든 비밀이 밝혀진다!
    `,
    rating: 8.8,
    reservation_rate: 10.7,
    classification: MovieClassification.InProgress,
    background_img: "/images/bg_외계인.jpeg",
    poster_img: "/images/pt_외계인.jpeg",
  },
  {
    id: 8,
    title: "소풍",
    summary: `60년 만에 찾아간 고향, 16살의 추억을 만났다
    요즘 들어 돌아가신 엄마가 자꾸 꿈에 보이는 은심(나문희).
    마침 절친이자 사돈 지간인 금순(김영옥)이 연락도 없이 불쑥 찾아오자,  은심은 금순과 함께 고향 남해로 떠나기로 한다. 
    그곳에서 우연히 자신을 짝사랑하던 태호(박근형)를 만나며 잊고 지낸 추억을 하나둘씩 떠올리게 되는데… 
    
    “다음에 다시 태어나도 네 친구 할 끼야”
    
    한 편의 시가 되는 우정, 
    어쩌면 마지막 소풍이 시작된다. 
    `,
    rating: 9.5,
    reservation_rate: 2.7,
    classification: MovieClassification.InProgress,
    background_img: "/images/bg_소풍.jpeg",
    poster_img: "/images/pt_소풍.jpeg",
  },
];

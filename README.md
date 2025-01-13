## 🍿 영화예매시스템
![영화예매시스템 목업](https://github.com/hun0613/cinema-system/assets/106587166/b7e7e39c-bec7-4e0f-86c0-1adb965f5b2c)

### 📌 프로젝트 소개
프론트엔드 측면에서 사용자와의 인터렉션이 많이 발생되고, 복잡한 비즈니스 로직을 가지고 있는 시스템 개발에 도전해보고 싶었습니다. <br />
영화예매사이트는 영화 정보를 제공해주기도 하지만 극장선택, 날짜, 상영관, 좌석 선택 등 사용자가 직접적으로 선택해야하는 정보들이 많고, 이를 위한 컴포넌트들은 많은 생각을 하며 개발해야되는 컴포넌트들이라 생각되었습니다.

위와 같은 이유로 영화예매사이트를 개발해보았습니다.

2025년 1월 기준, 컴포넌트 구조개선을 위해 코드리팩토링 진행중 입니다.
---
### 📌 기능 소개
우선, next.js의 layout 컴포넌트를 활용하여, 모든 페이지의 상단에 동일 헤더가 랜더링되도록 구현하였습니다. <br /><br />
#### 1️⃣ 현재 상영작 캐러셀 컴포넌트
![캐러셀](https://github.com/hun0613/cinema-system/assets/106587166/701eec8f-7067-4c75-b483-467aac695740)

첫 페이지의 상단에는 현재 상영중인 영화의 스틸샷과 포스터, 그리고 영화 내용이 10초의 간격으로 전환되며 보여줍니다.<br />
하단의 동그란 버튼을 클릭하여 해당 순서의 영화 정보를 랜더링 시킬 수 있습니다.<br />
예매하기 버튼을 통해 예매페이지로 이동할 수 있습니다.

동적인 움직임을 주기위해 컨텐츠가 변경 될때마다 스틸컷은 줌 아웃이 되도록, 영화 정보와 포스터는 위로 떠오르듯 transform, scale, transition 속성을 활용하여 애니메이션을 구현하였습니다.
<br /><br />
#### 2️⃣ 현재상영작, 상영종료작, 개봉예정작 별 영화 조회 및 검색
![contentArea](https://github.com/hun0613/cinema-system/assets/106587166/6f51cc8f-50e4-450d-8d60-e16f282d3bc9)

영화 데이터는 현재 상영작, 상영 종료작, 개봉 예정작으로 분류되며 현재 상영장일 경우 평점과 예매율이, 상영 종료작일 경우 평점과 상영종료 텍스트가, 개봉 예정작은 평점과 개봉까지 남은 디데이가 표시됩니다. <br/>
각 영화데이터는 mysql database에 저장되어 있으며, 
```javascript
 export interface movieType {
   id: number; // id
   title: string; // 제목
   summary: string; // 줄거리
   rating: number; // 평점
   reservation_rate: number; // 예매율
   release_date: string; // 개봉일시
   classification: number; // 상영여부 (1: 현재상영작, 2: 상영종료작, 3: 개봉예정작)
   background_img: string; // 배경이미지 url
   poster_img: string; // 포스터이미지 url
 }
```
형식으로 되어있습니다. <br />

반응형을 고려하여 구현하였기때문에, 화면 사이즈가 줄어들면 컨텐츠가 가로 4개씩 정렬되던 것이 2개로 줄어들고, 영화분류 네비게이션도 기존 버튼식에서 선택 분류만 표시되고, 나머지는 클릭 시 내려오는 모달을 통해 선택하도록 구현하였습니다. <br/>

각 카드 컴포넌트를 호버 시 이미지가 살짝 확대되는 애니메이션과 함께 상세보기, 예매하기 버튼이 랜더링되고, 상세보기 클릭 시 영화 정보가 담겨있는 모달이 랜더링됩니다.
<br /><br />
#### 3️⃣ 예매하기 페이지 - 영화관 선택
![극장](https://github.com/hun0613/cinema-system/assets/106587166/452b3bc8-918d-46ae-a5fe-9c2342ee724b)

예매하기 버튼을 통해 예매 페이지로 라우팅되면, 일단 상단에 포스터와 영화 평점, 예매율 정보가 표시됩니다.

예매 첫번째 단계는 극장선택이고 좌측에는 극장리스트, 우측에는 해당 영화관 위치를 표시해 줄 카카오 맵이 랜더링됩니다. <br />
반응형을 고려하여, 모바일의 경우에는 극장리스트가 상단으로, 지도는 하단으로 배치되어 레이아웃 깨짐을 방지하였습니다.

카카오맵 api를 사용했고, 영화관 리스트의 각 영화관의 위도와 좌표를 db로 관리하여, 카카오맵에 고정핀으로 표시해두었습니다.<br />
영화관을 선택하면 카카오맵은 선택한 영화관의 위치로 이동하게 됩니다.<br /><br />
#### 4️⃣ 날짜 선택 및 상영관, 상영시간 선택
![날짜](https://github.com/hun0613/cinema-system/assets/106587166/b07365e6-7963-4ecc-ba52-af152b9c14fe)

예매 두번째 단계는 날짜 선택 및 상영관, 상영시간 선택입니다.<br />
마찬가지로 데스크탑일 경우에는 좌측에 날짜 리스트, 우측에 상영시간표가 랜더링되고, 모바일의 경우 상단에 날짜 리스트, 하단에 상영시간표가 랜더링 됩니다.

날짜리스트는 현재날짜를 기준으로 2주뒤 날짜까지 db에서 가져오게 되는데, db는
```javascript
 export interface DateType {
   date: string; // 날짜 (YYYYMMDD);
   week: string; // 요일 (월 ~ 일);
   holiday_yn: string; // 공휴일 여부 (Y/N);
 }
```
위와 같은 형태로 저장되어 있습니다. <br />
요일에 따라 토, 일은 색깔을 다르게 랜더링되며, 공휴일 여부에 대한 정보를 통해 공휴일일 경우 빨간색 처리를 해주었습니다.

날짜를 선택하면, 해당 날짜와 선택한 영화, 선택한 영화관 id를 파라미터로 보내 그에 해당하는 상영시간표를 가져오게됩니다. <br /><br />

#### 5️⃣ 관람인원 수 선택 및 좌석 선택
![좌석](https://github.com/hun0613/cinema-system/assets/106587166/6fe156ea-4214-4af6-abda-b9b345f59771)

예매 마지막 단계는 관람인원 수 및 좌석 선택입니다. <br />
우선, 선택한 상영관과 상영시간에 따른 좌석 정보를 db에서 가져오게 되고, 선택한 상영관 id와 일치하는 상영관 구조 정보를 상영관 공통 컴포넌트의 props로 전달하여 상영관을 랜더링 시킵니다.

관람인원을 선택하게 되면, 좌석 정보에 따른 예약완료 석과 예매가능 석을 표시해주고, 관람인원에 맞게 좌석을 선택하게됩니다.

좌석선택은 다음과 같은 요구사항을 따릅니다.

> 1. 인원 수가 2명 이상일 경우, 한번에 2자리씩 선택한다. <br />
> 2. 좌석 선택이 진행되고 잔여 선택 석이 1개라면 다시 1자리만 선택된다.  <br />
> 3. 2자리 씩 선택할 때, 선택한 좌석 우측좌석이 함께 선택된다. <br />
> 4. 만약, 우측 좌석이 예매된 자리거나 없는 자리 일때는 좌측 좌석이 선택된다. <br />
> 5. 만약, 좌측 좌석도 예매된 자리거나 없는 자리 일 경우에는 한자리만 선택된다. <br />
> 6. 선택한 좌석을 클릭하면 선택 취소된다. <br />
> 7. 선택 취소할 경우 한자리 씩 취소된다. <br />
> 8. 좌석이 선택된 상태에서 인원수를 변경하면, 선택된 좌석은 모두 초기화 된다.

반응형을 고려하여 모바일 사이즈로 줄어들 시 폰트 사이즈와 컴포넌트 사이즈가 일부 작아지지만, 상영관 컴포넌트는 overflow-auto를 적용하여 원래 사이즈를 유지한 채, 보이지 않는 영역은 스크롤로 이동하도록 구현하였습니다.

#### 6️⃣ 예매 완료
![예약](https://github.com/hun0613/cinema-system/assets/106587166/d9c5ad53-34d0-4cdf-9470-188495df9e85)

모든 예매 절차를 완료하면 아래 예매하기 버튼이 활성화되고, 예매하기 버튼 클릭 시 선택한 좌석정보는 db에 반영되게 됩니다. <br />
그리고 Ticket 모달이 랜더링되면서 모든 예매 절차가 완료되게 됩니다.

---
### 📌 적용 기술 스택
#### 📎 Next.js (v.14.1.0)
영화예매시스템은 사용자들에게 많이 노출되어야하는 시스템입니다. <br />
그렇기때문에, SEO를 우선적으로 고려해야했고, 클라이언트에 빈 html을 보내주고 순차적으로 javascript 코드를 보내주는 React보단, 서버 단에서 html을 완성시켜 클라이언트로 보내주는 Next.js가 적절하다고 생각했습니다. <br />

또한, Next.js의 Image 태그는 자동으로 이미지 최적화를 시켜줍니다. <br />
영화 포스터, 스틸컷 등 많은 이미지가 랜더링되어야하는 서비스이기 때문에, Next.js의 Image 태그를 통해 이미지 최적화를 적용시키는 것이 적절하였습니다.

#### 📎 TypeScript
사실, 이전 회사에서 javascript로 프로젝트를 진행할 때, 런타임에러에 대한 이슈를 많이 경험했었습니다. <br />
map이나 filter같은 javascript 내장 함수를 사용할 때, 데이터 fetching에 대한 타이밍 때문에 예기치않은 null값이나 undefined 때문에 런타임에러가 발생한 일이 많았었죠. <br />
타입스크립트를 사용하면, 모든 props나 변수에 대해 적절한 타입을 설정하기 때문에, 예기치않은 다른 타입이 들어와도 코딩과정에서 잘못됨을 인지하고 수정할 수 있다는 장점이 있기 때문에 추후, 버그를 줄이고 안정성을 확보할 수 있겠다고 생각하여 타입스크립트를 사용하여 개발하였습니다.

#### 📎 Tailwind CSS (v.3.3.0)
반응형 앱 구현이 목표였기 때문에, 별도의 media query를 사용하지 않고도, tailwind config 파일에 각 디바이스 별 스크린 사이즈를 지정해줌으로써 간편하고 빠르게 반응형을 구현할 수 있다는 장점이 이번 프로젝트와 가장 적절하다고 생각했습니다.

#### 📎 Next.js Route Handlers
next.js 공식문서를 읽어보다가 next.js를 풀스택 프레임워크처럼 사용할 수 있다는 것을 알 수 있었습니다. <br />
별도의 백엔드 서버를 구축하지 않아도 자체적으로 api를 핸들링하도록 구현할 수 있다는 것이 가장 큰 장점으로 다가왔습니다. <br />
그리고, api 요청에 대한 api 주소도 next.js direct routing처럼 폴더명으로 지정할 수 있고, node.js처럼 javascript 문법을 기반으로 백엔드를 구축할 수 있다는 점이 가장 큰 매력점으로 느껴졌습니다.

#### 📎 MySQL (v.8.1.0)
처음에는 사이드 프로젝트이기 때문에, dummy data를 사용하여 구현하고자 했지만, 상영시간표의 경우 굉장히 많은 row가 발생가게 되고 이것을 하나하나 더미 데이터로 만들기에는 많은 한계가 있었습니다. <br />
전 회사에서 풀스택 개발자로 일했기 때문에 sql문법에 대해서는 어느정도 익숙해진 상황이었기 때문에 MySQL db를 사용하는데 큰 문제는 없다고 생각했습니다. <br />
그리고, 데이터가 고정되어있는 것이 아니라 시간이 경과됨에 따라 상영시간표를 계속 업데이트를 시켜줘야 했기때문에 db를 사용하는 것이 맞다고 생각해서 MySQL을 사용했습니다.

#### 📎 AWS RDS
Next.js Route Handler를 사용해서 별도의 백엔드 인스턴스를 구축하지 않기 때문에 DB를 AWS의 RDS를 통해 배포하여 사용할 필요가 있었습니다.
AWS의 프리티어를 적용하면 무료로 1년간 사용할 수 있기 때문에 RDS를 사용하여 DB를 배포하기로 결정했습니다.

#### 📎 Vercel
Vercel은 Next.js의 제조사인 만큼, Next.js 프로젝트의 배포가 정말 간편하다는 장점이 있었습니다. <br />
또한, 자동으로 repository에 push가 발생하면 자동 배포되는 ci/cd도 제공해주기 때문에, 추후 2차 개발 또는 버그이슈가 발생했을 때, 빠르게 대응할 수 있다는 점이 가장 큰 장점으로 다가왔습니다. <br />
그리고 빌드과정에서와 런타임 상황에서의 로그를 실시간으로 제공해주기 때문에 그 점도, 시스템을 유지보수 해나가는데 또는 버그의 원인을 분석할 때 정말 간편한 점이고 생각했습니다.


## 🍿 영화예매시스템
![영화예매시스템 목업](https://github.com/hun0613/cinema-system/assets/106587166/b7e7e39c-bec7-4e0f-86c0-1adb965f5b2c)

### 📌 프로젝트 소개
프론트엔드 측면에서 사용자와의 인터렉션이 많이 발생되고, 복잡한 비즈니스 로직을 가지고 있는 시스템 개발에 도전해보고 싶었습니다. <br />
영화예매사이트는 영화 정보를 제공해주기도 하지만 극장선택, 날짜, 상영관, 좌석 선택 등 사용자가 직접적으로 선택해야하는 정보들이 많고, 이를 위한 컴포넌트들은 많은 생각을 하며 개발해야되는 컴포넌트들이라 생각되었습니다.

위와 같은 이유로 영화예매사이트를 개발해보았습니다.
현재 1차완성단계인 <b>영화리스트 및 영화정보 보여주기, 검색기능, 극장선택, 날짜선택, 상영관 및 시간 선택, 좌석 선택, 예매하기 기능 </b>이 구현 완료된 상황이고, 앞으로도 계속 더 심화적인 기능을 추가구현하여 디벨롭시켜나갈 계획입니다.

### 📌 기능 소개
우선, next.js의 layout 컴포넌트를 활용하여, 모든 페이지의 상단에 동일 헤더가 랜더링되도록 구현하였습니다. <br /><br />
![캐러셀](https://github.com/hun0613/cinema-system/assets/106587166/701eec8f-7067-4c75-b483-467aac695740)

첫 페이지의 상단에는 현재 상영중인 영화의 스틸샷과 포스터, 그리고 영화 내용이 10초의 간격으로 전환되며 보여줍니다.<br />
하단의 동그란 버튼을 클릭하여 해당 순서의 영화 정보를 랜더링 시킬 수 있습니다.<br />
예매하기 버튼을 통해 예매페이지로 이동할 수 있습니다.

동적인 움직임을 주기위해 컨텐츠가 변경 될때마다 스틸컷은 줌 아웃이 되도록, 영화 정보와 포스터는 위로 떠오르듯 transform, scale, transition 속성을 활용하여 애니메이션을 구현하였습니다.
<br /><br />
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
![극장](https://github.com/hun0613/cinema-system/assets/106587166/452b3bc8-918d-46ae-a5fe-9c2342ee724b)

예매하기 버튼을 통해 예매 페이지로 라우팅되면, 일단 상단에 포스터와 영화 평점, 예매율 정보가 표시됩니다.

예매 첫번째 단계는 극장선택이고 좌측에는 극장리스트, 우측에는 해당 영화관 위치를 표시해 줄 카카오 맵이 랜더링됩니다. <br />
반응형을 고려하여, 모바일의 경우에는 극장리스트가 상단으로, 지도는 하단으로 배치되어 레이아웃 깨짐을 방지하였습니다.

카카오맵 api를 사용했고, 영화관 리스트의 각 영화관의 위도와 좌표를 db로 관리하여, 카카오맵에 고정핀으로 표시해두었습니다.<br />
영화관을 선택하면 카카오맵은 선택한 영화관의 위치로 이동하게 됩니다.

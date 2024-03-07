import { TheaterType } from "@/data/dataType";
import { useEffect, useState } from "react";
import TheaterItem from "./TheaterItem";
interface Props {
  theaterId: number; // 영화관 ID
  setTheaterId: React.Dispatch<React.SetStateAction<number>>; // 영화관 ID 변경함수;
  theater: string; // 영화관 이름
  setTheater: React.Dispatch<React.SetStateAction<string>>; // 영화관 이름 변경함수;
  navState: number; // nav 상태
  resetState: (nav: number) => void; // 상태 초기화 함수
}

// script kakao 객체 사용을 위한 window객체 선언
declare global {
  interface Window {
    kakao: any;
  }
}

const TheaterComp = ({
  theaterId,
  setTheaterId,
  theater,
  setTheater,
  navState,
  resetState,
}: Props) => {
  // 영화관 서버 데이터
  const [theaterDb, setTheaterDb] = useState<TheaterType[] | null>(null);
  // 선택한 영화관 위도
  const [latitude, setLatitude] = useState<number>(37.402038);
  // 선택한 영화관 경도
  const [longitude, setLongitude] = useState<number>(127.108667);

  useEffect(() => {
    // 첫 랜더링 시 theater data fetch
    if (!theaterDb) {
      fetch(`${process.env.NEXT_PUBLIC_API}/book/api/theater`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setTheaterDb(res2);
          // 영화관이 선택된 상태에서 랜더링 될 때 선택된 데이터로 위도, 경도 정의
          if (
            theaterId !== 0 &&
            latitude === 37.402038 &&
            longitude === 127.108667
          ) {
            setLatitude(
              res2.filter((el: TheaterType) => el.theater_id === theaterId)[0]
                .latitude,
            );
            setLongitude(
              res2.filter((el: TheaterType) => el.theater_id === theaterId)[0]
                .longitude,
            );
          }
        });
    }

    // kakao map
    // 스크립트에 kakao 스크립트 할당
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    // 페이지 로드 시 kakao map 발생 함수 실행
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        let map = new window.kakao.maps.Map(container, options);

        // 마커를 표시할 위치와 title 객체 배열입니다
        let positions = theaterDb
          ? theaterDb.map((theaterInfo: TheaterType, idx: number) => {
              return {
                title: theaterInfo.name,
                latlng: new window.kakao.maps.LatLng(
                  theaterInfo.latitude,
                  theaterInfo.longitude,
                ),
              };
            })
          : [
              {
                title: "카카오",
                latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
              },
            ];

        // 마커 이미지의 이미지 주소입니다
        let imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (let i = 0; i < positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          let imageSize = new window.kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다
          let markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
          );

          // 마커를 생성합니다
          let marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });
        }
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, [latitude]);

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center rounded-xl p-3 tablet:h-full tablet:flex-row tablet:p-5">
      {/* 영화관 리스트 */}
      <div className="mb-3 mr-0 flex h-fit w-full flex-row items-center justify-start overflow-x-auto overflow-y-auto tablet:mb-0 tablet:mr-5 tablet:h-full tablet:w-[30%] tablet:flex-col tablet:overflow-y-auto tablet:py-0">
        {/* 데이터 fetching... */}
        {!theaterDb ? (
          <div className="flex h-full w-full flex-col items-center justify-center font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
            데이터 가져오는중...🤔
          </div>
        ) : null}
        {/* 데이터가 존재하지 않을 경우 */}
        {theaterDb?.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
            상영중인 영화관이 없어요...😱
          </div>
        ) : null}
        {/* 데이터가 존재할 경우 */}
        {theaterDb?.map((theaterData: TheaterType, idx: number) => {
          return (
            <TheaterItem
              key={`${theaterData.theater_id}+idx`}
              id={theaterData.theater_id}
              name={theaterData.name}
              position={theaterData.position}
              latitude={theaterData.latitude}
              setLatitude={setLatitude}
              longitude={theaterData.longitude}
              setLongitude={setLongitude}
              theaterId={theaterId}
              setTheaterId={setTheaterId}
              theater={theater}
              setTheater={setTheater}
              navState={navState}
              resetState={resetState}
            />
          );
        })}
      </div>
      {/* Kakao Map Area */}
      <div className="flex aspect-square w-full flex-col items-center justify-center rounded-xl tablet:h-full tablet:w-[70%]">
        <div
          id="map"
          className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/10"
        ></div>
      </div>
    </div>
  );
};

export default TheaterComp;

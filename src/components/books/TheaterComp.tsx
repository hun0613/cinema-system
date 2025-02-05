import { getFetchTheatersQuery, TheaterType } from '@/actions/theaters/useFetchTheatersAction';

import { mergeClassNames } from '@/utils/domUtil';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import TheaterItemComp from './TheaterItemComp';

// script kakao 객체 사용을 위한 window객체 선언
declare global {
  interface Window {
    kakao: any;
  }
}

export type TheaterOptionType = {
  currentTheaterId?: number;
  onChangeTheater: (theaterId: number) => void;
};

export type TheaterCompProps = {
  theaterOption: TheaterOptionType;
} & JSX.IntrinsicElements['div'];

const TheaterComp: React.FC<TheaterCompProps> = (props) => {
  const { theaterOption } = props;

  const [{ data: theaters }] = useSuspenseQueries({
    queries: [getFetchTheatersQuery()],
  });
  // 선택한 영화관 위도
  const [latitude, setLatitude] = useState<number>(37.402038);
  // 선택한 영화관 경도
  const [longitude, setLongitude] = useState<number>(127.108667);

  useEffect(() => {
    // kakao map
    // 스크립트에 kakao 스크립트 할당
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    // 페이지 로드 시 kakao map 발생 함수 실행
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById('map');
        let options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        let map = new window.kakao.maps.Map(container, options);

        // 마커를 표시할 위치와 title 객체 배열입니다
        let positions = theaters.map((theaterInfo: TheaterType, idx: number) => {
          return {
            title: theaterInfo.name,
            latlng: new window.kakao.maps.LatLng(theaterInfo.latitude, theaterInfo.longitude),
          };
        });

        // 마커 이미지의 이미지 주소입니다
        let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

        for (let i = 0; i < positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          let imageSize = new window.kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다
          let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

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

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, [latitude]);

  return (
    <div
      className={mergeClassNames(
        'flex h-fit w-full flex-col items-center justify-center rounded-xl p-3',
        'tablet:h-full tablet:flex-row tablet:p-5',
      )}
    >
      {/* 영화관 리스트 */}
      <div
        className={mergeClassNames(
          'mb-3 mr-0 flex h-fit w-full flex-row items-center justify-start overflow-x-auto overflow-y-auto',
          'tablet:mb-0 tablet:mr-5 tablet:h-full tablet:w-[30%] tablet:flex-col tablet:overflow-y-auto tablet:py-0',
        )}
      >
        {/* 데이터가 존재하지 않을 경우 */}
        {theaters.length === 0 && (
          <div className='flex h-full w-full flex-col items-center justify-center font-NMSNeo2 text-xs text-fontColor tablet:text-sm'>
            상영중인 영화관이 없어요...😱
          </div>
        )}
        {/* 데이터가 존재할 경우 */}
        {theaters.map((theaterData: TheaterType, idx: number) => {
          return (
            <TheaterItemComp
              key={`${theaterData.theater_id}+${idx}`}
              theater={theaterData}
              theaterOption={theaterOption}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          );
        })}
      </div>
      {/* Kakao Map Area */}
      <div className='flex aspect-square w-full flex-col items-center justify-center rounded-xl tablet:h-full tablet:w-[70%]'>
        <div id='map' className='flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/10'></div>
      </div>
    </div>
  );
};

export default TheaterComp;

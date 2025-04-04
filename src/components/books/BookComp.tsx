'use client';
import useUpdateSeatAction from '@/actions/movies/useUpdateSeatAction';
import ButtonAtom, { BUTTON_COLOR, SIZE } from '@/atomics/buttons/ButtonAtom';
import { BOOK_STEP } from '@/enums/books/bookEnum';
import { mergeClassNames } from '@/utils/domUtil';
import { useRouter } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import BookStepNavigationComp from './BookStepNavigationComp';
import ScheduleAndRoomComp from './ScheduleAndRoomComp';
import SeatComp from './SeatComp';
import TheaterComp from './TheaterComp';
import TicketComp from './TicketComp';

export type BookCompProps = {
  movieId: number;
} & JSX.IntrinsicElements['div'];

export type BookPayloadType = {
  theaterId?: number;
  roomId?: number;
  movieId: number;
  date: string;
  time?: string;
  headCount: number;
  seatState: string[];
  seat: string[];
};

const BookComp: React.FC<BookCompProps> = (props) => {
  const { movieId } = props;

  const router = useRouter();

  const { mutateAsync: updateSeat } = useUpdateSeatAction();

  const [bookStep, setBookStep] = useState<BOOK_STEP>(BOOK_STEP.THEATER);

  const initBookPayload: BookPayloadType = {
    theaterId: undefined,
    roomId: undefined,
    movieId: movieId,
    date: `${new Date().getFullYear()}${new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}`,
    time: undefined,
    headCount: 0,
    seatState: [],
    seat: [],
  };

  const [bookPayload, setBookPayload] = useState<BookPayloadType>(initBookPayload);

  const completeTheaterStep = useMemo(() => !!bookPayload.theaterId, [bookPayload]);
  const completeScheduleAndRoomStep = useMemo(() => !!bookPayload.date && !!bookPayload.roomId && !!bookPayload.time, [bookPayload]);
  const completeHeadAndSeatStep = useMemo(
    () => !!bookPayload.seat.length && bookPayload.seat.length === bookPayload.headCount,
    [bookPayload],
  );

  const shouldActiveNextButton = useMemo(() => {
    switch (bookStep) {
      case BOOK_STEP.THEATER:
        return completeTheaterStep ? true : false;
      case BOOK_STEP.SCHEDULE_AND_ROOM:
        return completeScheduleAndRoomStep ? true : false;
      default:
        return false;
    }
  }, [completeTheaterStep, completeScheduleAndRoomStep, completeHeadAndSeatStep, bookStep]);
  const shouldActiveBookButton = completeTheaterStep && completeScheduleAndRoomStep && completeHeadAndSeatStep;

  const [ticketModalState, setTicketModalState] = useState<boolean>(false);
  const [bookId, setBookId] = useState<number>(0);

  const handleCloseTicketModal = () => {
    setTicketModalState(false);
    router.push(`/`);
  };

  const handleClickPrev = () => {
    switch (bookStep) {
      case BOOK_STEP.THEATER:
        break;
      case BOOK_STEP.SCHEDULE_AND_ROOM:
        setBookStep(BOOK_STEP.THEATER);
        break;
      case BOOK_STEP.HEAD_AND_SEAT:
        setBookStep(BOOK_STEP.SCHEDULE_AND_ROOM);
        break;
      default:
        break;
    }
  };

  const handleCLickNext = () => {
    switch (bookStep) {
      case BOOK_STEP.THEATER:
        setBookStep(BOOK_STEP.SCHEDULE_AND_ROOM);
        break;
      case BOOK_STEP.SCHEDULE_AND_ROOM:
        setBookStep(BOOK_STEP.HEAD_AND_SEAT);
        break;
      case BOOK_STEP.HEAD_AND_SEAT:
        break;
      default:
        break;
    }
  };

  const handleChangeTheater = (theaterId: number) => {
    setBookPayload({
      ...initBookPayload,
      theaterId,
    });
  };

  const handleChangeDate = (date: string) => {
    setBookPayload({
      ...initBookPayload,
      theaterId: bookPayload.theaterId,
      date,
    });
  };

  const handleChangeRoomAndTime = (roomId: number, time: string) => {
    setBookPayload({
      ...initBookPayload,
      theaterId: bookPayload.theaterId,
      date: bookPayload.date,
      roomId,
      time,
    });
  };

  const handleChangeSeat = (seat: string[]) => {
    setBookPayload({
      ...bookPayload,
      seat,
    });
  };

  const handleChangeHeadCount = (headCount: number, seatState: string[]) => {
    setBookPayload({
      ...initBookPayload,
      theaterId: bookPayload.theaterId,
      date: bookPayload.date,
      roomId: bookPayload.roomId,
      time: bookPayload.time,
      headCount,
      seatState,
    });
  };

  const handleChangeStep = (step: BOOK_STEP) => {
    setBookStep(step);
  };

  const handleClickBook = async () => {
    const body = {
      theater_id: bookPayload.theaterId || 0,
      room_id: bookPayload.roomId || 0,
      movie_id: bookPayload.movieId,
      date: bookPayload.date,
      time: bookPayload.time || '',
      selectSeat: bookPayload.seat,
      seat: [...bookPayload.seat, ...bookPayload.seatState],
    };

    const updateSeatReturnValue = await updateSeat(body);
    setBookId(updateSeatReturnValue.bookId);
    setTicketModalState(true);
  };

  return (
    <>
      <ToastContainer />
      {ticketModalState && <TicketComp bookId={bookId} onCloseModal={handleCloseTicketModal} />}

      <div className='flex h-full w-full flex-col items-center justify-start'>
        {/* navigation */}
        <BookStepNavigationComp
          currentBookStep={bookStep}
          onChangeStep={handleChangeStep}
          bookStepStates={{
            completeHeadAndSeatStep,
            completeScheduleAndRoomStep,
            completeTheaterStep,
          }}
        />
        {/* Reservation Area */}
        <div className='mb-5 flex h-fit w-[90%] flex-col items-center justify-center rounded-xl border border-borderColor tablet:h-[calc(100vh/1.8)]'>
          <Suspense fallback={<></>}>
            {bookStep === BOOK_STEP.THEATER && (
              <TheaterComp theaterOption={{ currentTheaterId: bookPayload.theaterId, onChangeTheater: handleChangeTheater }} />
            )}
            {bookStep === BOOK_STEP.SCHEDULE_AND_ROOM && (
              <ScheduleAndRoomComp
                scheduleAndRoomOption={{
                  currentBookPayload: {
                    ...bookPayload,
                    theaterId: !!bookPayload.theaterId ? bookPayload.theaterId : 0,
                  },
                  onChangeDate: handleChangeDate,
                  onChangeRoomAndTime: handleChangeRoomAndTime,
                }}
              />
            )}
            {bookStep === BOOK_STEP.HEAD_AND_SEAT && (
              <SeatComp
                seatOption={{
                  currentBookPayload: {
                    ...bookPayload,
                    theaterId: !!bookPayload.theaterId ? bookPayload.theaterId : 0,
                    roomId: !!bookPayload.roomId ? bookPayload.roomId : 0,
                    time: !!bookPayload.time ? bookPayload.time : '',
                    seat: !!bookPayload.seat ? bookPayload.seat : [],
                  },
                  onChangeSeat: handleChangeSeat,
                  onChangeHeadCount: handleChangeHeadCount,
                }}
              />
            )}
          </Suspense>
        </div>

        {/* btn */}
        <div className='mb-24 mt-5 flex h-fit w-full flex-col items-center justify-center gap-3 mobile:flex-row'>
          {bookStep !== BOOK_STEP.THEATER && (
            <ButtonAtom
              onClick={handleClickPrev}
              size={SIZE.SMALL}
              color={BUTTON_COLOR.GRAY}
              className={mergeClassNames('w-1/2', 'tablet:w-1/5')}
            >
              이전
            </ButtonAtom>
          )}

          {/* nav가 1일 경우 극장정보가 비어있으면 비활성화 / nav가 2일 경우 극장정보, 날짜, 상영관, 시간이 비어있으면 비활성화 */}
          {bookStep !== BOOK_STEP.HEAD_AND_SEAT && (
            <ButtonAtom
              disabled={!shouldActiveNextButton}
              onClick={handleCLickNext}
              size={SIZE.SMALL}
              className={mergeClassNames('w-1/2', 'tablet:w-1/5')}
            >
              다음
            </ButtonAtom>
          )}

          {/* nav가 3일 경우, 모든 정보가 입력되어있지 않으면 비활성화 */}
          {bookStep === BOOK_STEP.HEAD_AND_SEAT && (
            <ButtonAtom
              disabled={!shouldActiveBookButton}
              onClick={handleClickBook}
              size={SIZE.SMALL}
              className={mergeClassNames('w-1/2', 'tablet:w-1/5')}
            >
              예매하기
            </ButtonAtom>
          )}
        </div>
      </div>
    </>
  );
};

export default BookComp;
